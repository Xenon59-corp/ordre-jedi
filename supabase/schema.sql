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
-- Initialisation des pages publiques : collez les contenus définitifs dans le portail
-- ou remplacez ces textes dans le SQL Editor une fois le site configuré.
insert into public.pages (slug,title,eyebrow,summary,content,visibility,sort_order) values
('reglement','Règlement Jedi','CODE DE CONDUITE','Discipline et obligations des membres de l’Ordre','## Règlement général\n\nLe règlement complet (articles 1.1 à 1.20) est consultable en mode aperçu du site. Ce contenu est modifiable par un rédacteur autorisé.','public',1),
('effectifs','Effectifs de l’Ordre','REGISTRE JEDI','Registre des membres et spécialisations','## Effectifs\n\nRegistre en préparation.','public',2),
('titres','Titres et grades','HIÉRARCHIE','Initiés, Padawans, Chevaliers et Maîtres','## Les titres de l’Ordre\n\nInitiés, Padawans, Chevaliers, Chevaliers accomplis, Maîtres.','public',3),
('sanctions','Sanctions Jedi','DISCIPLINE','Sanctions et responsabilités','## Sanctions\n\nS1 à S10 : échelle disciplinaire.','public',4),
('formation','Formation Jedi','ENSEIGNEMENT','Cours et formations','## Formation\n\nLa voie du Padawan.','public',5),
('connaissances','Connaissances Jedi','ARCHIVES','Traditions et enseignements','## Connaissances\n\nIl n’y a pas d’ignorance, il y a la connaissance.','public',6),
('archives-conseil','Archives du Haut Conseil','ACCÈS RESTREINT','Documents réservés au Conseil','## Archives classifiées\n\nSection confidentielle du Conseil Jedi.','council',7)
on conflict (slug) do nothing;
-- Premier administrateur : exécutez séparément dans SQL Editor :
-- insert into public.members(github_user_id,github_username,role,active)
-- values('202104697','Xenon59-corp','admin',true)
-- on conflict(github_user_id) do update set role='admin', active=true;
