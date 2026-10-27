-- À exécuter dans le SQL Editor de Supabase (une fois).
create table if not exists public.members (
 github_user_id text primary key,
 github_username text not null,
 role text not null default 'member' check (role in ('admin','conseil','editor','member')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table if not exists public.pages (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique, title text not null, eyebrow text not null default 'ARCHIVES',
 summary text not null default '', content text not null default '',
 visibility text not null default 'public' check (visibility in ('public','member','council')),
 sort_order integer not null default 100,
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null
);
create or replace function public.current_github_id() returns text
language sql stable security definer set search_path = ''
as $$ select i.provider_id::text from auth.identities i
where i.user_id=(select auth.uid()) and i.provider='github'
order by i.last_sign_in_at desc nulls last limit 1 $$;
create or replace function public.current_member_role() returns text
language sql stable security definer set search_path = ''
as $$ select m.role from public.members m
where m.github_user_id=(select public.current_github_id()) and m.active=true limit 1 $$;
create or replace function public.my_access() returns setof public.members
language sql stable security definer set search_path = ''
as $$ select m.* from public.members m
where m.github_user_id=(select public.current_github_id()) limit 1 $$;
revoke all on function public.current_github_id() from public;
revoke all on function public.current_member_role() from public;
revoke all on function public.my_access() from public;
grant execute on function public.current_github_id() to authenticated;
grant execute on function public.current_member_role() to authenticated, anon;
grant execute on function public.my_access() to authenticated;
alter table public.members enable row level security;
alter table public.pages enable row level security;
revoke all on public.members from anon, authenticated;
revoke all on public.pages from anon, authenticated;
grant select, insert, update, delete on public.members to authenticated;
grant select on public.pages to anon;
grant select, insert, update, delete on public.pages to authenticated;
drop policy if exists members_select on public.members;
create policy members_select on public.members for select to authenticated
using (github_user_id=(select public.current_github_id()) or (select public.current_member_role())='admin');
drop policy if exists members_insert on public.members;
create policy members_insert on public.members for insert to authenticated
with check ((select public.current_member_role())='admin');
drop policy if exists members_update on public.members;
create policy members_update on public.members for update to authenticated
using ((select public.current_member_role())='admin')
with check ((select public.current_member_role())='admin');
drop policy if exists members_delete on public.members;
create policy members_delete on public.members for delete to authenticated
using ((select public.current_member_role())='admin');
drop policy if exists pages_select on public.pages;
create policy pages_select on public.pages for select to anon, authenticated
using (visibility='public'
or (visibility='member' and (select public.current_member_role()) is not null)
or (visibility='council' and (select public.current_member_role()) in ('admin','conseil')));
drop policy if exists pages_insert on public.pages;
create policy pages_insert on public.pages for insert to authenticated
with check ((select public.current_member_role()) in ('admin','conseil','editor')
and (visibility<>'council' or (select public.current_member_role()) in ('admin','conseil')));
drop policy if exists pages_update on public.pages;
create policy pages_update on public.pages for update to authenticated
using ((select public.current_member_role()) in ('admin','conseil','editor')
and (visibility<>'council' or (select public.current_member_role()) in ('admin','conseil')))
with check ((select public.current_member_role()) in ('admin','conseil','editor')
and (visibility<>'council' or (select public.current_member_role()) in ('admin','conseil')));
drop policy if exists pages_delete on public.pages;
create policy pages_delete on public.pages for delete to authenticated
using ((select public.current_member_role()) in ('admin','conseil','editor')
and (visibility<>'council' or (select public.current_member_role()) in ('admin','conseil')));
create or replace function public.touch_page_updated_at() returns trigger
language plpgsql set search_path = ''
as $$ begin new.updated_at=now(); return new; end $$;
drop trigger if exists pages_touch on public.pages;
create trigger pages_touch before update on public.pages for each row execute function public.touch_page_updated_at();
-- Documents publics initiaux, synchronisés avec le mode de démonstration.
insert into public.pages (slug,title,eyebrow,summary,content,visibility,sort_order) values
('reglement','Règlement Jedi','CODE DE CONDUITE','Les règles fondamentales de l’Ordre Jedi, la discipline du Temple et les obligations de ses membres.','## SECTION I — RÈGLEMENT GÉNÉRAL DE L’ORDRE JEDI

### Article 1.1 — Accès des Padawans à la base républicaine
En situation de Code Blanc, les Padawans ne sont pas autorisés à se rendre sur la base républicaine sans être accompagnés d’un Chevalier ou d’un Maître Jedi.

### Article 1.2 — Accès des membres du Conseil et des Jedi régimentaires
Les membres du Conseil Jedi et les Jedi affectés à un régiment disposent d’une autorisation permanente d’accès à la base républicaine. Ils doivent néanmoins signaler leur entrée et leur sortie.

### Article 1.3 — Équivalence hiérarchique
Les membres du Conseil Jedi disposent d’une autorité équivalente à celle des Commandants Maréchaux. Le Maître de l’Ordre (MDO) possède une équivalence hiérarchique correspondant aux grades d’Amiral ou de Vice-Amiral, conformément à la hiérarchie en vigueur.

### Article 1.4 — Respect entre Jedi et militaires
Les Jedi doivent respecter les soldats clones et le personnel de la République. Ce respect est réciproque. Tout manquement peut être sanctionné par la Shocktrooper, les Gardes du Temple ou le Conseil Jedi, selon leurs compétences.

### Article 1.5 — Intervention en Code Rouge
Lors d’une attaque de la base républicaine, les Jedi sont autorisés à participer à sa défense. Après le débriefing, ils doivent regagner immédiatement le Temple Jedi, sauf instruction contraire.

### Article 1.6 — Autorités habilitées à délivrer des autorisations
Les autorisations valables sont celles délivrées par les officiers clones ou les membres de la Marine républicaine à partir du grade d’Enseigne.

### Article 1.7 — Utilisation de la Force en Code Blanc
En Code Blanc, l’utilisation des pouvoirs de la Force est interdite au sein du Temple Jedi et de la base républicaine, quelle que soit la nature du pouvoir.

### Article 1.8 — Accession au rang de Chevalier Jedi accompli
Pour accéder au rang de Chevalier accompli, un Chevalier doit avoir formé un Padawan durant au moins deux semaines et l’avoir accompagné jusqu’à sa réussite au Conseil de Chevalier.

### Article 1.9 — Prérogatives du Conseil Jedi
Le Conseil Jedi peut retirer une spécialisation, imposer une nouvelle évaluation, prononcer une rétrogradation ou retirer les fonctions de Commandant Jedi (CMDJ) ou de Général Jedi (GNL) en cas de manquement.

### Article 1.10 — Déplacements au sein du Temple
Il est interdit de courir dans les couloirs et espaces communs du Temple Jedi. Les salles d’entraînement font exception.

### Article 1.11 — Port et utilisation des armes
Il est interdit de dégainer ou d’utiliser une arme dans le Temple Jedi, sauf dans les salles d’entraînement.

### Article 1.12 — Accès à la salle des Holocrons
L’accès à la salle des Holocrons est réservé aux membres du Conseil Jedi.

### Article 1.13 — Préservation de la paix au Temple
Il est interdit de provoquer un conflit armé ou de faire couler le sang dans le Temple, sauf situation d’extrême nécessité impliquant notamment la protection de vies.

### Article 1.14 — Convocations du Conseil Jedi
Tout Jedi convoqué par le Conseil doit fixer une date de comparution dans un délai d’une semaine et s’y présenter, sauf justification valable.

### Article 1.15 — Échec à l’évaluation de Chevalier
Un Padawan qui échoue à son Conseil de Chevalier doit attendre au minimum une semaine avant une nouvelle tentative.

### Article 1.16 — Conditions d’admission au Conseil de Chevalier
Pour présenter son évaluation, le Padawan doit justifier de **deux semaines de formation**, de **deux rapports validés** et de **l’accord de son Maître**.

### Article 1.17 — Autorité des décisions du Conseil Jedi
Les décisions du Conseil Jedi doivent être respectées. Toute insubordination, contestation irrespectueuse ou refus d’appliquer une décision peut entraîner une sanction supplémentaire.

### Article 1.18 — Présence des Padawans lors des Codes Marron
Les Padawans peuvent se rendre seuls à la base pour un Code Marron et les réunions HG associées. À l’issue de la réunion de fin de mission, ils doivent demander l’autorisation de quitter la base puis regagner le Temple.

### Article 1.19 — Obligation de recherche d’un Maître Jedi
Tout Padawan dispose de deux semaines après sa nomination pour trouver un Maître. En cas d’impossibilité, il doit en justifier les raisons, sous peine de réaffectation dans un corps Jedi.

### Article 1.20 — Posture et respect hiérarchique
Il est interdit de croiser les bras en présence d’un supérieur hiérarchique. Un manquement entraîne une **sanction S1**, qui peut être prononcée par un Chevalier accompli au minimum.

> Cette section constitue la version de travail du règlement, à faire approuver par le Conseil avant publication officielle.','public',1),
('effectifs','Effectifs de l’Ordre','REGISTRE JEDI','Un registre destiné aux grades, aux spécialisations, aux maîtres et aux apprentis.','## Registre de l’Ordre

Les effectifs recensent les membres de l’Ordre Jedi et leur progression.

### Informations à renseigner
- Nom du Jedi et grade actuel
- Spécialisation : Consulaire, Gardien ou Sentinelle
- Maître et Padawan affectés
- Formes de combat et pouvoirs de Force validés
- Affectation régimentaire éventuelle

> Cette première version présente la structure du registre. Un tableau d’effectifs éditable pourra être ajouté ensuite.','public',2),
('titres','Titres et grades','HIÉRARCHIE DE L’ORDRE','Les différents rangs et responsabilités qui jalonnent la voie d’un Jedi.','## Progression au sein de l’Ordre

### Initié
Découvre la Force et reçoit les premiers enseignements.

### Padawan
Suit une formation sous la responsabilité d’un Maître Jedi.

### Chevalier Jedi
Accomplit ses missions de façon autonome et protège la République.

### Chevalier Jedi accompli
A mené à bien la formation d’un Padawan jusqu’à son accession au rang de Chevalier.

### Maître Jedi
Guide l’Ordre par sa sagesse, son expérience et sa maîtrise de la Force.

### Conseil Jedi
Assure la direction de l’Ordre et veille au respect de ses principes.','public',3),
('sanctions','Sanctions Jedi','DISCIPLINE ET JUSTICE','Des sanctions graduées destinées à préserver la discipline et la sérénité de l’Ordre.','## Échelle disciplinaire

- **S1** — 10 minutes de méditation en cellule
- **S2** — 20 minutes de méditation en cellule
- **S3** — 25 minutes de méditation en cellule
- **S4** — 30 minutes de méditation en cellule
- **S5** — 60 minutes de méditation en cellule
- **S6** — Comparution devant le Conseil de la Réconciliation et isolement
- **S7** — Suspension temporaire des accès à la base et aux missions
- **S8** — Réunion du Conseil Jedi pour décision disciplinaire
- **S9** — Reformation complète sur décision du Conseil
- **S10** — Exclusion définitive de l’Ordre Jedi

> Chaque sanction doit être enregistrée dans le canal prévu à cet effet.','public',4),
('formation','Formation Jedi','TRANSMISSION DU SAVOIR','Le parcours d’apprentissage des Initiés, Padawans et futurs Chevaliers.','## La voie du Padawan

### Fondamentaux
- Le Code Jedi et les devoirs de l’Ordre
- La Force vivante et la Force unificatrice
- La diplomatie, la médiation et la maîtrise des émotions
- Le maniement responsable du sabre laser

### Évaluation de passage
La présentation au Conseil de Chevalier exige un minimum de deux semaines de formation, deux rapports et l’accord du Maître.

### Spécialisations
- **Consulaire** — savoir, diplomatie et maîtrise de la Force
- **Gardien** — défense et techniques de combat
- **Sentinelle** — équilibre entre enquête, savoir et combat','public',5),
('connaissances','Connaissances Jedi','ARCHIVES DU TEMPLE','Traditions, histoire et fondements philosophiques de l’Ordre.','## Le Code Jedi

> Il n’y a pas d’émotion, il y a la paix.\nIl n’y a pas d’ignorance, il y a la connaissance.\nIl n’y a pas de passion, il y a la sérénité.\nIl n’y a pas de chaos, il y a l’harmonie.\nIl n’y a pas de mort, il y a la Force.

## Les piliers de l’Ordre

### Paix
Privilégier la négociation et la protection des vies.

### Connaissance
Étudier l’histoire, la Force et les traditions de l’Ordre.

### Sérénité
Agir avec discernement, sans se laisser submerger par ses émotions.

### Devoir
Servir la République et défendre ceux qui ne peuvent se défendre seuls.','public',6),
('archives-conseil','Archives du Haut Conseil','ACCÈS RESTREINT','Documents réservés au Conseil','## Archives classifiées

Section confidentielle du Conseil Jedi.','council',7)
on conflict (slug) do nothing;
-- Premier administrateur : exécutez séparément dans SQL Editor :
-- insert into public.members(github_user_id,github_username,role,active)
-- values('202104697','Xenon59-corp','admin',true)
-- on conflict(github_user_id) do update set role='admin', active=true;
