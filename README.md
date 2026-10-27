# Ordre Jedi — Portail d'archives RP

Site statique inspiré du style Star Wars / Temple Jedi, prêt pour GitHub Pages, avec connexion GitHub et contrôle des autorisations côté base de données (Supabase).

## Fonctionnalités

- Accueil holographique, menu latéral responsive, règlement (section I / 20 articles), effectifs, titres, sanctions, formations, connaissances.
- Archives classifiées réservées au Conseil Jedi.
- OAuth GitHub via Supabase Auth.
- Autorisations par **ID GitHub immuable** (ne repose pas sur le pseudo seul).
- Administration des accès par l'admin (GitHub username résolu vers ID via l'API publique).
- Édition et sauvegarde des pages dans Supabase (markdown simple : titres, listes, gras, citations).
- Rôles : `admin`, `conseil`, `editor`, `member`; permissions vérifiées par **Row Level Security (RLS)**.
- Fonctionne en mode **aperçu** sans configuration de serveur : le contenu public initial est alors affiché sans connexion.

## 1. Dépôt et publication GitHub Pages

Dépôt : `Xenon59-corp/ordre-jedi`. Dans **Settings → Pages**, sélectionnez **Deploy from a branch**, `main`, `/(root)`. Le dépôt est actuellement privé : l'accès à Pages dépend de votre plan et des réglages GitHub. S'il faut le rendre public, aucun document confidentiel ne doit se trouver dans les fichiers du site.

Adresse attendue une fois Pages activé : `https://xenon59-corp.github.io/ordre-jedi/`.

## 2. Créer la base Supabase

1. Créez un projet sur https://supabase.com/dashboard.
2. Ouvrez **SQL Editor** et exécutez tout le fichier `supabase/schema.sql`.
3. Dans **Project Settings → API / API Keys** (l'intitulé peut varier), copiez l'URL du projet et la clé **publishable** / **anon**.
4. Complétez `config.js` : `supabaseUrl` et `supabaseAnonKey`.

La clé publique n'est pas un secret; les permissions sont appliquées par RLS. Ne mettez jamais de clé `service_role` ou `secret` dans `config.js`.

## 3. Configurer l'authentification GitHub OAuth

1. Dans Supabase, ouvrez **Authentication → Providers → GitHub** et récupérez la **Callback URL** (ex. `https://PROJECT-REF.supabase.co/auth/v1/callback`).
2. Sur GitHub, allez dans **Settings → Developer settings → OAuth Apps → New OAuth App**.
3. **Homepage URL** : l'URL complète du site GitHub Pages.
4. **Authorization callback URL** : l'URL de callback **Supabase**, pas l'URL GitHub Pages.
5. Copiez le **Client ID** et le **Client Secret** dans Supabase **Authentication → Providers → GitHub**. **Ne publiez pas le secret dans le dépôt**.
6. Dans Supabase **Authentication → URL Configuration**, mettez le site GitHub Pages en `Site URL`, et ajoutez son URL complète (avec `/` final) dans les `Redirect URLs`.

## 4. Autoriser le premier administrateur

**Important** : la connexion GitHub seule n'accorde aucun droit privé. Initialisez le premier administrateur depuis Supabase → SQL Editor. Utilisez l'identifiant permanent GitHub du compte propriétaire, récupéré par `https://api.github.com/users/VOTRE_PSEUDO` (champ `id`).

Pour le compte GitHub lié à cette conversation, l'exemple est :

```sql
insert into public.members (github_user_id, github_username, role, active)
values ('202104697', 'Xenon59-corp', 'admin', true)
on conflict (github_user_id)
do update set role='admin', github_username='Xenon59-corp', active=true;
```

Connectez-vous ensuite sur le site via **Connexion GitHub**. La rubrique **Gestion des accès** apparaîtra automatiquement.

### Rôles

| Rôle | Pages publiques | Pages « membres » | Pages « conseil » | Modifier les textes | Gérer les accès |
| --- | --- | --- | --- | --- | --- |
| Visiteur | Oui | Non | Non | Non | Non |
| Membre | Oui | Oui | Non | Non | Non |
| Rédacteur | Oui | Oui | Non | Oui (hors conseil) | Non |
| Conseil Jedi | Oui | Oui | Oui | Oui | Non |
| Admin | Oui | Oui | Oui | Oui | Oui |

Un utilisateur non inscrit dans `members` peut se connecter à GitHub mais n'obtiendra **aucun accès aux contenus privés**.

## 5. Modifier le règlement / inviter des membres

- Ouvrez **Règlement** ; si votre rôle permet l'édition, cliquez sur **Modifier le document**.
- Rédigez le contenu en Markdown simple, puis enregistrez : il est sauvegardé dans Supabase sans repasser par GitHub.
- Ouvrez **Gestion des accès** pour ajouter le pseudo GitHub d'un membre et lui attribuer le rôle souhaité. Le programme retrouve son ID GitHub permanent via l'API publique de GitHub.

## 6. Lancer l'aperçu en local (optionnel)

Servez le dossier depuis un serveur HTTP local (les modules JavaScript ne fonctionnent pas correctement sur `file://`). Par exemple :

```sh
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000/`. Pour tester OAuth en local, ajoutez explicitement `http://localhost:8000/` aux `Redirect URLs` dans Supabase.

## Sécurité et limites de cette première version

- L'accès privé est vérifié dans la **base PostgreSQL** via des identifiants GitHub validés par Supabase Auth, pas simplement masqué en CSS ou en JavaScript.
- `data.js` ne contient que du contenu de démonstration **public**. Le document classifié de démonstration est créé uniquement par le script SQL.
- Les rapports privés ne doivent **jamais** être stockés dans le dépôt GitHub Pages, même si le dépôt est privé : le site publié reste public.
- Le mode d'édition gère le **contenu des pages existantes**; création/suppression de rubriques, gestion des effectifs structurés, pièces jointes et historique complet ne sont pas encore inclus.
- Les textes fournis sont une base RP éditable; la conformité exacte du règlement final doit être validée par les responsables de votre serveur.
- Le bouton de connexion dépend de Supabase + d'une OAuth App GitHub configurée par vous. Le projet livré ne contient **aucun secret** et n'est pas déjà hébergé ou connecté à un service externe.

## Arborescence

```
index.html        Interface principale
styles.css        Design du portail
app.js            Navigation, login, gestion et éditeur
config.js         Configuration publique Supabase
 data.js          Textes de démonstration publics
favicon.svg       Icône
.nojekyll         Désactive Jekyll pour GitHub Pages
supabase/schema.sql  SQL de création, sécurité RLS et données de départ
README.md         Ce guide
```