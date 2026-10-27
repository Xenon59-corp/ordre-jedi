import { navigation, starterPages, features } from './data.js';

const q = (s, root=document) => root.querySelector(s);
const qa = (s, root=document) => Array.from(root.querySelectorAll(s));
const safe = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const config = window.JEDI_CONFIG || {};
const configured = Boolean(config.supabaseUrl && config.supabaseAnonKey);
let db = null;
let pages = [...starterPages];
let members = [];
let user = null;
let access = null;
let selected = 'accueil';
let busy = false;
const labels = {public:'Public',member:'Membres',council:'Conseil'};
const roleNames = {admin:'Administrateur',conseil:'Conseil Jedi',editor:'Rédacteur',member:'Membre'};
const canEdit = () => Boolean(access && ['admin','conseil','editor'].includes(access.role) && access.active);
const isAdmin = () => Boolean(access && access.role==='admin' && access.active);
const canReadCouncil = () => Boolean(access && ['admin','conseil'].includes(access.role) && access.active);

function toast(msg, type='info') {
 const el=q('#toast'); el.textContent=msg; el.dataset.type=type;el.classList.add('show');
 clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),4200);
}
function formatDate(date){try{return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'long',year:'numeric'}).format(new Date(date));}catch{return '—';}}
function hashPage(){return decodeURIComponent(location.hash.replace(/^#/,''))||'accueil';}
function navigate(slug){location.hash=slug;}
function parseMarkdown(content=''){
 // Never render raw HTML from database content. Escape before basic Markdown decorations.
 const inline = s => safe(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
 const lines=String(content).replace(/\r/g,'').split('\n');
 let out='',list=false,quote=false,paragraph=[];
 const closeP=()=>{if(paragraph.length){out+=`<p>${paragraph.map(inline).join('<br>')}</p>`;paragraph=[];}};
 const closeL=()=>{if(list){out+='</ul>';list=false;}};
 const closeQ=()=>{if(quote){out+='</blockquote>';quote=false;}};
 for(const line of lines){const t=line.trim();
  if(!t){closeP();closeL();closeQ();continue;}
  const head=t.match(/^(#{1,3})\s+(.+)$/);
  if(head){closeP();closeL();closeQ();const n=Math.min(head[1].length,4);out+=`<h${n}>${inline(head[2])}</h${n}>`;continue;}
  if(/^[-*]\s+/.test(t)){closeP();closeQ();if(!list){out+='<ul>';list=true;}out+=`<li>${inline(t.replace(/^[-*]\s+/,''))}</li>`;continue;}
  if(t.startsWith('>')){closeP();closeL();if(!quote){out+='<blockquote>';quote=true;}out+=`<p>${inline(t.replace(/^>\s?/,''))}</p>`;continue;}
  closeL();closeQ();paragraph.push(t);
 }
 closeP();closeL();closeQ();return out;
}
function getNav(){return navigation.map(([slug,icon,label,tag])=>`<a class="nav-link ${slug===selected?'active':''}" href="#${slug}" ${slug===selected?'aria-current="page"':''}><span class="nav-icon">${icon}</span><span>${safe(label)}</span>${tag==='RÉSERVÉ'?'<span class="nav-lock">⌁</span>':''}</a>`).join('')+(isAdmin()?'<div class="side-caption admin-caption">ADMINISTRATION</div><a href="#administration" class="nav-link '+(selected==='administration'?'active':'')+'"><span class="nav-icon">⚙</span><span>Gestion des accès</span></a>':'');}
function renderNav(){q('#main-nav').innerHTML=getNav();}
function renderAuth(){
 const root=q('#auth-controls');
 if(!configured){root.innerHTML='<span class="preview-pill">APERÇU LOCAL</span>';return;}
 if(!user){root.innerHTML='<button class="auth-button" data-action="login"><span class="github-sign">◈</span> Connexion GitHub</button>';return;}
 const login=user.user_metadata?.user_name||user.user_metadata?.preferred_username||user.email||'Utilisateur';
 root.innerHTML=`<div class="profile"><span class="avatar">${safe(String(login).slice(0,1)).toUpperCase()}</span><div class="profile-text"><b>${safe(login)}</b><small>${safe(access?.active?roleNames[access.role]||'Membre':'En attente d’autorisation')}</small></div><button data-action="logout" class="ghost-mini" title="Se déconnecter">↪</button></div>`;
}
function showHero(){
 return `<div class="home-hero"><div class="hero-copy"><div class="small-upper"><span class="mini-line"></span> ARCHIVES DU HAUT CONSEIL JEDI <span class="mini-line"></span></div><div class="hero-pre">DEPUIS MILLE GÉNÉRATIONS</div><h1>L’Ordre <em>Jedi</em></h1><div class="hero-sub">GARDIENS DE LA PAIX · SERVITEURS DE LA RÉPUBLIQUE</div><p>« Le savoir éclaire notre voie. La Force guide nos pas. » Accédez aux règlements, aux enseignements et aux archives de l’Ordre au cœur de la Guerre des Clones.</p><div class="hero-actions"><a class="primary-btn" href="#reglement">CONSULTER LE RÈGLEMENT <span>↗</span></a><a class="secondary-btn" href="#connaissances">EXPLORER LES ARCHIVES <span>→</span></a></div></div><div class="hero-emblem" aria-hidden="true"><div class="orb outer-orb"></div><div class="orb inner-orb"></div><div class="halo h1"></div><div class="halo h2"></div><svg viewBox="0 0 250 300"><defs><linearGradient id="saber" x1="0" x2="1"><stop stop-color="#8bddeb"/><stop offset="1" stop-color="#d7bd7b"/></linearGradient></defs><path d="M125 16L213 69V174L125 281L37 174V69Z" fill="none" stroke="url(#saber)" stroke-width="2"/><path d="M125 37V264M39 93L125 154L211 93M38 173L125 154L212 173" stroke="#77e8f4" stroke-opacity=".72" fill="none" stroke-width="2"/><path d="M125 92L155 137L125 194L95 137Z" stroke="#d6b873" fill="none" stroke-width="2"/><circle cx="125" cy="155" r="18" fill="#0a243e" stroke="#d6b873" stroke-width="2"/><circle cx="125" cy="155" r="8" fill="#a5f8ff"/></svg><span class="emblem-title">ARCHIVES • CORUSCANT</span></div></div>
 <section class="home-section"><div class="section-heading"><div><div class="eyebrow"><span>01</span> / DÉCOUVRIR L’ORDRE</div><h2>Les piliers de notre héritage</h2></div><span class="heading-decoration">✧</span></div><div class="feature-grid">${features.map(f=>`<a class="feature-card" href="#${f.to}"><span class="feature-icon">${f.icon}</span><small>${f.tag}</small><h3>${f.title}</h3><p>${f.description}</p><span class="feature-next">CONSULTER <b>↗</b></span></a>`).join('')}</div></section>
 <section class="bottom-grid"><div class="code-panel"><div class="eyebrow">02 / DOCTRINE</div><h2>Le Code Jedi</h2><p>Il n’y a pas d’émotion, il y a la paix.<br>Il n’y a pas d’ignorance, il y a la connaissance.<br>Il n’y a pas de passion, il y a la sérénité.<br>Il n’y a pas de chaos, il y a l’harmonie.<br>Il n’y a pas de mort, il y a la Force.</p><span>— ENSEIGNEMENTS DE L’ORDRE</span></div><div class="path-panel"><div class="eyebrow">03 / PROGRESSION</div><h2>La voie du Jedi</h2><div class="rank-track">${['Initié','Padawan','Chevalier','Chevalier accompli','Maître'].map((s,i)=>`<div class="rank"><i>${String(i+1).padStart(2,'0')}</i>${s}</div>`).join('')}</div><a href="#titres">DÉCOUVRIR LA HIÉRARCHIE <span>→</span></a></div></section>`;
}
function pageView(page){
 if(!page){return `<section class="simple-state"><span class="state-mark">⌕</span><h1>Document introuvable</h1><p>Cette page n’est pas disponible dans les archives auxquelles vous avez accès.</p><a class="primary-btn" href="#accueil">RETOUR À L’ACCUEIL</a></section>`;}
 const editAllowed=canEdit() && (page.visibility!=='council'||canReadCouncil());
 return `<div class="page-banner"><div class="banner-top"><span class="eyebrow">ORDRE JEDI / ${safe(page.eyebrow||'ARCHIVES')}</span><span class="visibility ${page.visibility==='council'?'gold':''}">${page.visibility==='council'?'◈':'◉'} ${safe((labels[page.visibility]||page.visibility).toUpperCase())}</span></div><h1>${safe(page.title)}</h1><p>${safe(page.summary)}</p><div class="banner-meta"><span>✦ DOCUMENT DES ARCHIVES</span>${page.updated_at?`<span>ACTUALISÉ LE ${safe(formatDate(page.updated_at)).toUpperCase()}</span>`:''}${editAllowed?`<button class="small-outline" data-action="edit-page" data-slug="${safe(page.slug)}">✎ MODIFIER LE DOCUMENT</button>`:''}</div></div><article class="archive-document"><div class="article-edge"></div><div class="doc-heading"><span>HOLONET / ARCHIVES DE CORUSCANT</span><span>RÉF. ${safe(page.slug.toUpperCase())}</span></div><div class="markdown">${parseMarkdown(page.content)}</div><div class="article-bottom">✦ &nbsp; QUE LA FORCE SOIT AVEC VOUS &nbsp; ✦</div></article>`;
}
function lockedView(){return `<section class="simple-state locked"><span class="state-mark">◇</span><div class="eyebrow">NIVEAU DE SÉCURITÉ : CONSEIL JEDI</div><h1>Archives classifiées</h1><p>Cette section est réservée aux membres autorisés du Haut Conseil Jedi. La consultation requiert une identification GitHub et une autorisation accordée par l’administration.</p>${configured?(user?'<div class="note-block">Compte connecté, mais autorisation de niveau Conseil absente.</div>':'<button class="primary-btn" data-action="login">S’IDENTIFIER AVEC GITHUB ↗</button>'):'<div class="note-block">Configuration de l’authentification requise pour activer cet espace.</div>'}</section>`;}
function adminView(){
 if(!isAdmin())return lockedView();
 return `<div class="page-banner"><div class="banner-top"><span class="eyebrow">ADMINISTRATION / SÉCURITÉ</span><span class="visibility gold">◆ ADMINISTRATEUR</span></div><h1>Gestion des accès</h1><p>Accordez l’accès aux membres de l’Ordre à partir de leur identifiant GitHub. Seuls les comptes présents dans cette liste peuvent consulter les archives réservées.</p></div><section class="management"><div class="management-head"><div><div class="eyebrow">CONTRÔLE DES IDENTITÉS</div><h2>Comptes autorisés</h2></div><button class="primary-btn" data-action="add-member">+ AUTORISER UN COMPTE</button></div><div class="member-table-wrap"><table class="member-table"><thead><tr><th>COMPTE GITHUB</th><th>IDENTIFIANT</th><th>RÔLE</th><th>ÉTAT</th><th>GESTION</th></tr></thead><tbody>${members.map(m=>`<tr><td><strong>@${safe(m.github_username)}</strong></td><td>${safe(m.github_user_id)}</td><td><span class="role-tag">${safe(roleNames[m.role]||m.role)}</span></td><td><span class="state-chip ${m.active?'ok':'off'}">${m.active?'ACTIF':'SUSPENDU'}</span></td><td><button class="table-action" data-action="edit-member" data-github-id="${safe(m.github_user_id)}">MODIFIER</button></td></tr>`).join('')||'<tr><td colspan="5">Aucun compte autorisé</td></tr>'}</tbody></table></div><div class="note-block"><strong>Important :</strong> une connexion GitHub ne donne aucun droit automatiquement. Le contrôle d’accès est aussi appliqué dans Supabase, indépendamment de l’interface.</div></section>`;
}
function render(){
 selected=hashPage(); const currentNav=navigation.find(a=>a[0]===selected);
 q('#breadcrumb').textContent=selected==='accueil'?'ACCUEIL':selected==='administration'?'ADMINISTRATION':currentNav?.[2].toUpperCase()||'ARCHIVES';
 renderNav();renderAuth();
 if(selected==='accueil'){q('#app').innerHTML=showHero();return;}
 if(selected==='administration'){q('#app').innerHTML=adminView();return;}
 if(selected==='archives-conseil'&&!canReadCouncil()){q('#app').innerHTML=lockedView();return;}
 q('#app').innerHTML=pageView(pages.find(p=>p.slug===selected));
}
async function reload(){
 if(!db){pages=[...starterPages];members=[];access=null;render();return;}
 try{
  if(user){const {data,error}=await db.rpc('my_access');if(error)throw error;access=Array.isArray(data)?data[0]||null:data||null;}
  else access=null;
  const {data:p,error:e}=await db.from('pages').select('*').order('sort_order');
  if(e)throw e;
  pages=p||[];
  if(isAdmin()){const {data:m,error:me}=await db.from('members').select('*').order('github_username');if(me)throw me;members=m||[];}
  else members=[];
 }catch(err){console.error('Erreur accès aux archives:',err);pages=starterPages.filter(p=>p.visibility==='public');members=[];toast('Impossible de charger la base. Vérifie les règles SQL et ta configuration.','error');}
 render();
}
async function signIn(){if(!db){toast('Renseigne d’abord config.js et configure Supabase.','error');return;}const {error}=await db.auth.signInWithOAuth({provider:'github',options:{redirectTo:location.origin+location.pathname}});if(error)toast(error.message,'error');}
async function signOut(){if(!db)return;const {error}=await db.auth.signOut();if(error)toast(error.message,'error');else{user=null;access=null;await reload();toast('Vous avez été déconnecté.');}}
const modal=q('#modal');
function showModal(html){modal.innerHTML=html;modal.showModal();}
function closeModal(){modal.close();modal.innerHTML='';}
function pageEditor(slug){
 const page=pages.find(p=>p.slug===slug);if(!page||!canEdit()||(page.visibility==='council'&&!canReadCouncil()))return;
 showModal(`<form id="editor-form" class="modal-form"><div class="modal-header"><div><span class="eyebrow">GESTION DES ARCHIVES</span><h2 id="modal-title">Modifier le document</h2></div><button type="button" data-action="close-modal" class="close-button" aria-label="Fermer">×</button></div><label>Titre<input name="title" required maxlength="120" value="${safe(page.title)}"></label><label>Résumé<input name="summary" maxlength="280" value="${safe(page.summary)}"></label><label>Rubrique<input name="eyebrow" maxlength="80" value="${safe(page.eyebrow||'')}"></label><label>Visibilité<select name="visibility"><option value="public" ${page.visibility==='public'?'selected':''}>Public</option><option value="member" ${page.visibility==='member'?'selected':''}>Membres connectés et autorisés</option>${canReadCouncil()?`<option value="council" ${page.visibility==='council'?'selected':''}>Conseil Jedi uniquement</option>`:''}</select></label><label>Texte du document (Markdown : ## titres, ### sous-titres, **gras**, - liste)<textarea name="content" rows="15" required>${safe(page.content)}</textarea></label><div class="modal-actions"><button type="button" class="secondary-btn" data-action="close-modal">ANNULER</button><button type="submit" class="primary-btn">ENREGISTRER</button></div></form>`);
 q('#editor-form').addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;busy=true;const form=new FormData(e.currentTarget);
  const payload={title:String(form.get('title')).trim(),summary:String(form.get('summary')).trim(),eyebrow:String(form.get('eyebrow')).trim(),content:String(form.get('content')),visibility:String(form.get('visibility'))};
  const {error}=await db.from('pages').update({...payload,updated_by:user.id}).eq('slug',slug);busy=false;
  if(error){toast('Échec : '+error.message,'error');return;}closeModal();await reload();toast('Document enregistré.','success');
 });
}
function memberEditor(id){
 if(!isAdmin())return;
 const old=id?members.find(m=>m.github_user_id===id):null;
 showModal(`<form id="member-form" class="modal-form"><div class="modal-header"><div><span class="eyebrow">AUTORISATIONS D’ACCÈS</span><h2 id="modal-title">${old?'Modifier un membre':'Autoriser un compte'}</h2></div><button type="button" data-action="close-modal" class="close-button" aria-label="Fermer">×</button></div>${old?`<p>Compte GitHub : <strong>@${safe(old.github_username)}</strong> (ID ${safe(old.github_user_id)})</p>`:`<label>Pseudonyme GitHub<input name="username" placeholder="Exemple : MonCompteGithub" autocomplete="off" required></label><p class="modal-help">Le site recherchera l’identifiant permanent du compte sur GitHub. Un compte non autorisé ne peut lire aucun document privé.</p>`}<label>Rôle<select name="role">${Object.entries(roleNames).map(([v,name])=>`<option value="${v}" ${(old?.role||'member')===v?'selected':''}>${name}</option>`).join('')}</select></label><label class="check-row"><input type="checkbox" name="active" ${old?.active!==false?'checked':''}> Accès actif</label><div class="modal-actions"><button class="secondary-btn" type="button" data-action="close-modal">ANNULER</button><button class="primary-btn" type="submit">ENREGISTRER L’ACCÈS</button></div></form>`);
 q('#member-form').addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;busy=true;
  const f=new FormData(e.currentTarget);let userId=old?.github_user_id,login=old?.github_username;
  if(!old){
   const entered=String(f.get('username')).trim().replace(/^@/,'');
   try{const res=await fetch('https://api.github.com/users/'+encodeURIComponent(entered),{headers:{Accept:'application/vnd.github+json'}});if(!res.ok)throw Error(res.status===404?'Compte GitHub introuvable.':'GitHub indisponible (ou limite de requêtes).');const profile=await res.json();if(profile.type!=='User')throw Error('Seuls les comptes GitHub personnels sont acceptés.');userId=String(profile.id);login=profile.login;}
   catch(err){busy=false;toast(err.message,'error');return;}
  }
  const payload={github_user_id:userId,github_username:login,role:String(f.get('role')),active:f.has('active')};
  const {error}=await db.from('members').upsert(payload,{onConflict:'github_user_id'});busy=false;
  if(error){toast('Accès non enregistré : '+error.message,'error');return;}
  closeModal();await reload();toast(`Autorisations mises à jour pour @${login}.`,'success');
 });
}
document.addEventListener('click',async e=>{
 const button=e.target.closest('[data-action]');if(!button)return;
 const action=button.dataset.action;
 if(action==='login')await signIn();
 if(action==='logout')await signOut();
 if(action==='edit-page')pageEditor(button.dataset.slug);
 if(action==='add-member')memberEditor(null);
 if(action==='edit-member')memberEditor(button.dataset.githubId);
 if(action==='close-modal')closeModal();
});
q('#mobile-menu').addEventListener('click',()=>q('#sidebar').classList.toggle('open'));
q('#main-nav').addEventListener('click',e=>{if(e.target.closest('a'))q('#sidebar').classList.remove('open');});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'smooth'});});
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
async function init(){
 if(configured){
  try{
   const {createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
   db=createClient(config.supabaseUrl,config.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
   const {data:{session},error}=await db.auth.getSession();if(error)throw error;user=session?.user||null;
   db.auth.onAuthStateChange((_event,newSession)=>{const prev=user?.id;user=newSession?.user||null;if(prev!==user?.id)queueMicrotask(()=>reload());});
  }catch(err){console.error(err);toast('Connexion Supabase impossible : vérifie la configuration.','error');}
 }
 await reload();
}
init();
