# Activer la connexion GitHub — Portail Jedi

Site : https://xenon59-corp.github.io/ordre-jedi/
Dépôt : https://github.com/Xenon59-corp/ordre-jedi

**Ne commitez jamais de secret OAuth, de clé Supabase service_role/secret ou de token GitHub.**

## 1. Créer ou sélectionner votre projet Supabase

Ouvrez https://supabase.com/dashboard et créez un projet (plan gratuit possible).
Dans **SQL Editor**, exécutez entièrement le fichier [supabase/schema.sql](supabase/schema.sql) présent dans ce dépôt. Ce script crée les tables `pages` et `members`, les règles Row Level Security (RLS) et les pages initiales.

Dans **Authentication → URL Configuration** :
- **Site URL** : `https://xenon59-corp.github.io/ordre-jedi/`
- **Redirect URLs** : `https://xenon59-corp.github.io/ordre-jedi/`

## 2. Créer l'application GitHub OAuth

Dans Supabase, ouvrez **Authentication → Sign In / Providers → GitHub** et copiez la **Callback URL**, de la forme :
`https://VOTRE-PROJET.supabase.co/auth/v1/callback`

Sur https://github.com/settings/developers, allez à **OAuth Apps → New OAuth App** :
- **Application name** : `Archives de l'Ordre Jedi`
- **Homepage URL** : `https://xenon59-corp.github.io/ordre-jedi/`
- **Application description** : `Connexion au portail de l'Ordre Jedi`
- **Authorization callback URL** : **la Callback URL Supabase**, pas l'URL Pages.
- Ne pas activer Device Flow.

Créez l'application et récupérez **Client ID** et **Client Secret**. Dans **Supabase → Authentication → Sign In / Providers → GitHub**, activez GitHub, entrez ces deux valeurs **directement dans Supabase** puis enregistrez. Ne copiez pas le secret dans GitHub, dans ce dépôt ou dans une conversation.

## 3. Relier le site au projet Supabase

Dans Supabase → **Project Settings → Data API / API Keys** (les libellés peuvent varier), copiez :
- Project URL, de la forme `https://VOTRE-PROJET.supabase.co`
- **Publishable key** `sb_publishable_...` (ou ancienne clé `anon`).

Dans `config.js`, renseignez :

```js
window.JEDI_CONFIG = {
  supabaseUrl: 'https://VOTRE-PROJET.supabase.co',
  supabaseAnonKey: 'sb_publishable_VOTRE_CLE_PUBLIQUE'
};
```

**Seule la clé publique publishable/anon peut être présente dans le JavaScript du navigateur.** Les règles RLS de la base protègent les données. GitHub Actions publie automatiquement le site lors de la modification de `main`.

## 4. Autoriser le premier administrateur

Dans Supabase **SQL Editor**, exécutez :

```sql
insert into public.members (github_user_id, github_username, role, active)
values ('202104697', 'Xenon59-corp', 'admin', true)
on conflict (github_user_id)
do update set github_username='Xenon59-corp', role='admin', active=true;
```

Cet ID est celui du compte GitHub propriétaire, distinct du pseudonyme qui peut changer.

## 5. Tester le portail

1. Ouvrez https://xenon59-corp.github.io/ordre-jedi/ en navigation privée.
2. Cliquez sur **Connexion GitHub**.
3. Acceptez la connexion sur GitHub, puis retournez sur le site.
4. Connecté avec `Xenon59-corp`, vous devez voir le rôle **Administrateur**, puis **Gestion des accès**.
5. Essayez un compte GitHub non invité : il peut s'authentifier, **mais ne doit voir aucune archive privée**. La liste des membres autorisés est contrôlée côté Supabase par RLS.
6. Si un document `archives-conseil` est visible sans connexion, **arrêtez et vérifiez les politiques de la base avant d'ajouter des données réelles**.

## Modèle de permissions

- `member` : lire les pages publiques et membres.
- `editor` : éditer les pages publiques et membres.
- `conseil` : lire et éditer aussi les pages Conseil.
- `admin` : tous les droits précédents et gestion des comptes autorisés.

L'interface d'administration accepte le pseudo GitHub et enregistre son **ID GitHub immuable**. Un compte peut se connecter via GitHub sans figurer sur la liste autorisée : il ne reçoit alors **aucun accès aux pages privées**.

## Liens officiels

- https://supabase.com/docs/guides/auth/social-login/auth-github
- https://supabase.com/docs/guides/auth/redirect-urls
