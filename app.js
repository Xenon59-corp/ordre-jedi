import { navigation, starterPages, features } from './data.js';

// Copie de secours publique du document Google Sheets "Registre Jedi".
// Les données Google Sheets sont rechargées en direct quand c'est possible.
// Si la requête échoue, l'interface indique qu'il s'agit de cette copie figée.
const registreSnapshot = {
  "savedOn": "2026-11-02",
  "effectifs": [
    [
      "Arligan Zey",
      "Maître Jedi",
      "Gardien",
      "Présent",
      "0",
      "Non",
      "",
      "Oui",
      "Général BOS"
    ],
    [
      "Link",
      "Maître Jedi",
      "Sentinelle",
      "Présent",
      "0",
      "Non",
      "",
      "Oui",
      "Co-Gérant Sentinelle"
    ],
    [
      "Xona Stolen",
      "Maître Jedi",
      "Gardien / Maitre d'arme",
      "Présent",
      "0",
      "Non",
      "",
      "Oui",
      "Gérant Gardien / CMD 212th"
    ],
    [
      "Exilias",
      "Chevalier Jedi",
      "N/A",
      "Présent",
      "0",
      "Oui",
      "2026-10-29",
      "Oui",
      ""
    ],
    [
      "Kaelis",
      "Chevalier Jedi",
      "Consulaire / Soigneur",
      "Présent",
      "0",
      "Non",
      "",
      "Oui",
      ""
    ],
    [
      "Nox",
      "Chevalier Jedi",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      ""
    ],
    [
      "Oolae Ven",
      "Chevalier Jedi",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      ""
    ],
    [
      "Zey",
      "Chevalier Jedi",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      ""
    ],
    [
      "Anigan",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      "Oelae Ven"
    ],
    [
      "Corvan Ash",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      ""
    ],
    [
      "Kaelen Va'rek",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      "Exilias"
    ],
    [
      "Leï Lithe",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      "Arligan Zey"
    ],
    [
      "Lelouch Ruby",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      "Arligan Zey"
    ],
    [
      "Ozzy",
      "Padawan",
      "N/A",
      "Présent",
      "0",
      "Non",
      "",
      "Non",
      "Exilias"
    ],
    [
      "Rylen Va'rek",
      "Padawan",
      "N/A",
      "En Mission",
      "0",
      "Non",
      "",
      "Non",
      ""
    ],
    [
      "Total / Synthèse de l'Ordre",
      "15 Membres",
      "-",
      "14 Présents",
      "0",
      "1 / 15 à jour",
      "-",
      "2 / 5 Chevaliers",
      "Enregistrements certifiés par les Archives"
    ]
  ],
  "formes": [
    [
      "Padawan",
      "",
      "",
      ""
    ],
    [
      "Padawan",
      "Shi-Cho",
      "Détermination",
      "Actif"
    ],
    [
      "Chevalier",
      "",
      "",
      ""
    ],
    [
      "Chevalier",
      "Défensif",
      "—",
      "Actif"
    ],
    [
      "Chevalier",
      "Soresu Basic",
      "Lus-Ma",
      "Actif"
    ],
    [
      "Chevalier",
      "Djem-So",
      "Forme V",
      "Actif"
    ],
    [
      "Chevalier",
      "Yong-Li",
      "—",
      "Actif"
    ],
    [
      "Consulaire",
      "",
      "",
      ""
    ],
    [
      "Consulaire",
      "Crescent",
      "—",
      "Actif"
    ],
    [
      "Consulaire",
      "Shien Djem So",
      "Shien So (V)",
      "Actif"
    ],
    [
      "Consulaire",
      "Suma",
      "—",
      "Actif"
    ],
    [
      "Consulaire",
      "Shien Advenced",
      "Shien So (V)",
      "Actif"
    ],
    [
      "Gardien",
      "",
      "",
      ""
    ],
    [
      "Gardien",
      "Ataru Basic",
      "Agile",
      "Actif"
    ],
    [
      "Gardien",
      "Soresu Advenced",
      "Lus-Ma",
      "Actif"
    ],
    [
      "Gardien",
      "Blade Dancer",
      "—",
      "Actif"
    ],
    [
      "Gardien",
      "Visigoth",
      "—",
      "Actif"
    ],
    [
      "Gardien",
      "Niman",
      "Forme VI",
      "Actif"
    ],
    [
      "Gardien",
      "Master Soresu",
      "Lus-Ma",
      "Actif"
    ],
    [
      "Gardien",
      "Warrior",
      "—",
      "Actif"
    ],
    [
      "Gardien",
      "Vader",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "",
      "",
      ""
    ],
    [
      "Sentinelle",
      "Jar'Kai",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Basic Makashi",
      "Agressive",
      "Actif"
    ],
    [
      "Sentinelle",
      "Agile Dual",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Suma",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Lus Mas Dual",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Su-Ma Dual",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Dual Warrior",
      "—",
      "Actif"
    ],
    [
      "Sentinelle",
      "Butterfly",
      "—",
      "Actif"
    ],
    [
      "Conseil",
      "",
      "",
      ""
    ],
    [
      "Conseil",
      "Visigoth Dual",
      "—",
      "Actif"
    ],
    [
      "Haut Conseil",
      "",
      "",
      ""
    ],
    [
      "Haut Conseil",
      "Visigoth Dual Suprême",
      "—",
      "Actif"
    ],
    [
      "Non Utilisée",
      "",
      "",
      ""
    ],
    [
      "Non Utilisée",
      "Freak",
      "Palpatine",
      "Non utilisée"
    ],
    [
      "Non Utilisée",
      "Contention",
      "—",
      "Non utilisée"
    ],
    [
      "Non Utilisée",
      "Fast Style",
      "—",
      "Non utilisée"
    ],
    [
      "Non Utilisée",
      "Juggernaut",
      "Dual possible",
      "Non utilisée"
    ],
    [
      "Non Utilisée",
      "Vaapad",
      "Windu",
      "Non utilisée"
    ],
    [
      "Non Utilisée",
      "Versatile",
      "—",
      "Non utilisée"
    ]
  ]
};


const ID = '1F3U-G3sCwwC9fYtstQaAujrga7v2WMOqQDuceB-RrBg';
const ORIGINAL = 'https://docs.google.com/spreadsheets/d/' + ID + '/edit';
const columns = {
 effectifs: ['Nom du membre','Rang','Spécialisation','Présence','Absences','Cours récent','Dernier cours','Accompli','Notes / Affectation'],
 formes: ['Rang / Catégorie','Forme de combat','Variante / Spécification','Statut / Quota']
};
let activeTab='effectifs';
let records={effectifs:registreSnapshot.effectifs,formes:registreSnapshot.formes};
let fresh={effectifs:false,formes:false};
let loadPromise=null;
const esc=x=>String(x??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

function tableMarkup(tab) {
 const data=records[tab]||[];
 const rowHtml=row=>'<tr>'+columns[tab].map((_,i)=>'<td>'+esc(row[i]||'—')+'</td>').join('')+'</tr>';
 let rows='';
 if(tab==='effectifs'){
  // Déduit les groupes de la colonne "Rang" du Google Sheet, sans changer son ordre interne.
  const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const members=data.filter(row=>String(row[0]||'').trim() && !norm(row[0]).startsWith('total /'));
  const summaries=data.filter(row=>norm(row[0]).startsWith('total /'));
  const groups=[
   {id:'maitres',title:'MAÎTRES JEDI',test:rank=>rank.includes('maitre')},
   {id:'chevaliers',title:'CHEVALIERS JEDI',test:rank=>rank.includes('chevalier')},
   {id:'padawans',title:'PADAWANS',test:rank=>rank.includes('padawan')}
  ];
  const grouped=groups.map(group=>({...group,members:members.filter(row=>group.test(norm(row[1])))}));
  const unclassified=members.filter(row=>!groups.some(group=>group.test(norm(row[1]))));
  if(unclassified.length) grouped.push({id:'autres',title:'AUTRES GRADES',members:unclassified});
  rows=grouped.map(group=>{
   const count=group.members.length;
   const header='<tr class="registre-grade-heading grade-'+group.id+'"><th scope="rowgroup" colspan="'+columns[tab].length+'"><span class="registre-grade-title">'+esc(group.title)+'</span><span class="registre-grade-count">'+count+' membre'+(count>1?'s':'')+'</span></th></tr>';
   return header+(count?group.members.map(rowHtml).join(''):'<tr class="registre-empty"><td colspan="'+columns[tab].length+'">Aucun membre dans ce grade</td></tr>');
  }).join('');
  rows+=summaries.map(row=>'<tr class="registre-summary">'+columns[tab].map((_,i)=>'<td>'+esc(row[i]||'—')+'</td>').join('')+'</tr>').join('');
 }else{
  rows=data.map(row=>{
   if(row[0] && !row[1]) return '<tr class="registre-section-row"><th colspan="4">'+esc(row[0])+'</th></tr>';
   return rowHtml(row);
  }).join('');
 }
 return '<div class="registre-table-scroll"><table class="registre-table"><thead><tr>'+columns[tab].map(c=>'<th scope="col">'+esc(c)+'</th>').join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function paint() {
 const root=document.querySelector('#registre-data');
 if(!root)return;
 root.innerHTML=tableMarkup(activeTab);
 document.querySelectorAll('[data-action="registre-tab"]').forEach(button=>{
  const selected=button.dataset.tab===activeTab;
  button.classList.toggle('active',selected);
  button.setAttribute('aria-selected',String(selected));
 });
 const status=document.querySelector('#registre-status');
 if(status){
  status.textContent=fresh[activeTab]?
   '✓ Données actualisées depuis Google Sheets. Ouvre le document original pour modifier les informations.' :
   'Copie de secours du 2 novembre 2026 : les données peuvent avoir changé. Ouvre le Google Sheet pour consulter la dernière version.';
  status.dataset.fresh=String(Boolean(fresh[activeTab]));
 }
}
function selectRegistreTab(tab) {
 if(!columns[tab])return;
 activeTab=tab;
 paint();
}
function renderRegistrePanel() {
 return `<section class="sheet-live" aria-label="Registre Jedi">
  <div class="sheet-live-toolbar">
   <div><div class="sheet-live-eyebrow">◇ ARCHIVES DE L'ORDRE · GOOGLE SHEETS</div>
     <h2>Registre Jedi</h2>
     <p>Effectifs et formes de combat issus du document officiel. Le tableau est lisible directement dans les archives.</p>
   </div>
   <a class="sheet-live-open" href="${esc(ORIGINAL)}" target="_blank" rel="noopener noreferrer">OUVRIR LE REGISTRE ORIGINAL ↗</a>
  </div>
  <div class="registre-tabs" role="tablist" aria-label="Sections du Registre Jedi">
   <button type="button" role="tab" data-action="registre-tab" data-tab="effectifs" aria-selected="${activeTab==='effectifs'}" class="${activeTab==='effectifs'?'active':''}">⚔ EFFECTIFS JEDI</button>
   <button type="button" role="tab" data-action="registre-tab" data-tab="formes" aria-selected="${activeTab==='formes'}" class="${activeTab==='formes'?'active':''}">◇ FORMES DE COMBAT</button>
  </div>
  <div id="registre-data">${tableMarkup(activeTab)}</div>
  <p class="registre-status" id="registre-status" data-fresh="${fresh[activeTab]}">${fresh[activeTab]?'✓ Données actualisées depuis Google Sheets.':'Copie de secours du 2 novembre 2026. Le Google Sheet original reste la source à jour.'}</p>
  <p class="sheet-live-note">La lecture est publique selon les autorisations de partage du document Google. Le site ne modifie jamais la feuille originale.</p>
 </section>`;
}
async function fetchLive(gid,range,width,header){
 const url='https://docs.google.com/spreadsheets/d/'+ID+'/gviz/tq?gid='+gid+'&range='+encodeURIComponent(range)+'&tqx=out%3Ajson';
 const response=await fetch(url,{cache:'no-store',mode:'cors'});
 if(!response.ok)throw new Error('HTTP '+response.status);
 const raw=await response.text();
 const left=raw.indexOf('{'),right=raw.lastIndexOf('}');
 if(left<0||right<=left)throw new Error('Format Google Sheets non reconnu');
 const parsed=JSON.parse(raw.slice(left,right+1));
 if(parsed.status==='error')throw new Error('Google Sheets a refusé la requête');
 const rowCells=parsed.table?.rows;
 if(!Array.isArray(rowCells))throw new Error('Réponse sans lignes');
 const data=rowCells.map(row=>Array.from({length:width},(_,i)=>{
  const cell=row.c?.[i];
  return cell ? String(cell.f ?? cell.v ?? '').trim() : '';
 })).filter(row=>row.some(Boolean)&&row[0]!==header);
 if(data.length<2)throw new Error('Données incomplètes');
 return data;
}
function refreshRegistre(){
 if(loadPromise)return loadPromise;
 loadPromise=Promise.allSettled([
  fetchLive(0,'B8:J75',9,'Nom du Membre'),
  fetchLive(111220201,'B4:E100',4,'Rang / Catégorie')
 ]).then(results=>{
  for(const [i,key] of ['effectifs','formes'].entries()){
   if(results[i].status==='fulfilled'){records[key]=results[i].value;fresh[key]=true;}
   else console.info('Registre Jedi : recours à la copie intégrée pour',key,results[i].reason);
  }
  paint();
 }).finally(()=>{loadPromise=null;});
 return loadPromise;
}


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
// Source Google Sheets existante, partagée en lecture via Google Drive.
const REGISTRE_JEDI_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1F3U-G3sCwwC9fYtstQaAujrga7v2WMOqQDuceB-RrBg/edit?usp=drivesdk';
const REGISTRE_JEDI_PREVIEW_URL = 'https://docs.google.com/spreadsheets/d/1F3U-G3sCwwC9fYtstQaAujrga7v2WMOqQDuceB-RrBg/preview';
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
function getNav(){return navigation.map(([slug,icon,label,tag])=>`<a class="nav-link ${(slug===selected||(selected==='manuel-padawan'&&slug==='connaissances'))?'active':''}" href="#${slug}" ${slug===selected?'aria-current="page"':''}><span class="nav-icon">${icon}</span><span>${safe(label)}</span>${tag==='RÉSERVÉ'?'<span class="nav-lock">⌁</span>':''}</a>`).join('')+(isAdmin()?'<a href="#administration" class="nav-link admin-nav-link '+(selected==='administration'?'active':'')+'" '+(selected==='administration'?'aria-current="page"':'')+'><span class="nav-icon">⚙</span><span>Administration</span></a>':'');}
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
function effectifsSheetEmbed(){return renderRegistrePanel();}
const padawanChapters = [{"id":"histoire","icon":"◷","title":"Histoire de l’Ordre","tag":"De Tython à la République","kind":"story","lead":"L’histoire de l’Ordre débute sur Tython, avant son implantation sur Ossus puis au cœur de la République galactique.","items":[["L’Appel de Tython","Origines de l’Ordre","Sur Tython, les premiers adeptes ont appris à distinguer l’Ashla, associée à la lumière, du Bogan, associé aux ténèbres. Cette opposition a marqué les Guerres de la Force et les débuts des traditions Jedi."],["Ossus et les archives","Le foyer du savoir","Les Jedi ont développé leur enseignement sur Ossus. La catastrophe liée à la supernova Cron a conduit à préserver une partie de ses connaissances et à les transférer vers Coruscant."],["L’Ordre et la République","Millénaires de conflits","La République est devenue l’alliée majeure des Jedi. Le Temple de Coruscant a notamment connu le saccage mené par Dark Malgus, tandis que les luttes contre les Sith ont profondément façonné l’Ordre."]]},{"id":"lieux","icon":"⌂","title":"Les Lieux Emblématiques","tag":"Les trois grands foyers de l'Ordre","kind":"places","items":[["Le Temple de Coruscant","LIEU I · Centre de l’Ordre","Siège du Conseil et des grandes institutions Jedi, reconnaissable à ses cinq tours. Il abrite notamment les espaces de méditation, de formation et de conservation des archives.",["Conseil Jedi","Cinq tours"]],["La Bibliothèque d’Ossus","LIEU II · Transmission du savoir","Ancien centre intellectuel majeur, enrichi par Odan-Urr et sa Chambre des Antiquités. Ses holocrons constituent un héritage essentiel de l’histoire Jedi.",["Holocrons","Chambre des Antiquités"]],["Le Temple de Tython","LIEU III · Berceau originel","Site historique des premières traditions Jedi. Redécouvert à l’époque de Satele Shan, il demeure un lieu de mémoire et d’enseignement.",["Tython","Satele Shan"]]]},{"id":"code","icon":"✦","title":"Le Code Jedi","tag":"Les cinq principes fondateurs","kind":"precepts","lead":"Les deux formulations du Code Jedi sont reproduites ci-dessous avec leurs mots et leur ponctuation.","items":["Il n'y a pas d'émotion, il y a la paix.","Il n'y a pas d'ignorance, il y a la connaissance.","Il n'y a pas de passion, il y a la sérénité.","Il n'y a pas de chaos, il y a l'harmonie.","Il n'y a pas de mort, il y a la Force."],"foot":"Le Code Jedi sert de référence éthique au Padawan. Son apprentissage doit se traduire par des actes, et non par une simple récitation.","alternative":["Émotion et pourtant, paix,","Ignorance et pourtant, savoir","Passion et pourtant sérénité.","Chaos et pourtant, Harmonie.","Mort et pourtant, la Force."]},{"id":"piliers","icon":"◇","title":"Les Trois Piliers du Jedi","tag":"Fondements de l’apprentissage","kind":"pillars","items":[["La Force","PILIER I · Contrôle","Étudier la présence de la Force dans les êtres vivants, exercer son contrôle et développer ses capacités de perception, de protection et de soin.",["Tutaminis","Curato Salva","Altus Sopor"]],["La Connaissance","PILIER II · Savoir","Consulter les archives et holocrons, étudier l’histoire et les enseignements, puis transmettre ses découvertes avec discernement.",["Archives","Holocrons","Enseignement"]],["L’Autodiscipline","PILIER III · Pratique","Cultiver une méditation régulière, apprendre à contrôler ses réactions et développer une maîtrise responsable du sabre laser.",["Méditation du Vide","Méditation mobile","Méditation ascendante"]]],"foot":"Le Côté Obscur exploite notamment la peur, la colère et le désir de domination. Un Padawan apprend à les reconnaître sans les laisser guider ses choix."},{"id":"conduite","icon":"⚖","title":"Principes et Ligne de Conduite","tag":"La responsabilité d’un Jedi","kind":"columns","items":[["Principes Jedi","La paix et la protection",["Défendre la paix et rendre justice avec mesure.","N’employer une force létale qu’en dernier recours.","Considérer son sabre comme un symbole de responsabilité.","Respecter les devoirs et restrictions de l’Ordre, dont son engagement au célibat dans ce cadre RP.","Traiter les autres avec dignité, quelles que soient leurs origines.","Secourir les personnes vulnérables et agir avec ses alliés en période de crise."]],["Ligne de conduite","Sagesse au quotidien",["Privilégier le dialogue, l’honneur et la diplomatie.","Éviter de dégainer son sabre sans nécessité réelle.","Faire preuve d’impartialité envers toutes les espèces.","Partager ses connaissances avec les plus jeunes.","Écouter les Jedi expérimentés et demander conseil en cas de doute.","Respecter les lieux sacrés, la méditation et la sérénité."]]]},{"id":"hierarchie","icon":"♙","title":"La Hiérarchie de l’Ordre","tag":"De l’Initié au Grand Maître","kind":"ranks","items":[["Grand Maître","Dirige le Haut Conseil et incarne la sagesse de l’Ordre ; la fonction revient à un seul titulaire."],["Maître de l’Ordre","Assiste le Grand Maître et assure la direction en son absence, selon l’organisation du Conseil."],["Membre du Haut Conseil","Maître reconnu appelé à participer aux décisions fondamentales de l’Ordre ; le Haut Conseil compte traditionnellement douze sièges."],["Membre d’un Conseil Jedi","Maître siégeant dans l’un des Conseils chargés de l’enseignement et de la direction de l’Ordre."],["Maître Jedi","Jedi expérimenté, reconnu pour ses connaissances, son jugement et son aptitude à guider les autres."],["Chevalier Jedi","Ancien Padawan ayant réussi ses épreuves, pouvant servir la République de façon autonome."],["Padawan Jedi","Apprenti formé auprès d’un Chevalier ou d’un Maître, sous la supervision de l’Ordre."],["Initié Jedi","Jeune élève découvrant la Force et les fondements de l’apprentissage Jedi."]]},{"id":"sabre","icon":"⚔","title":"Le Sabre Laser","tag":"Construction et quête visionnaire","kind":"story","lead":"Construire son premier sabre est une étape majeure de la formation du Padawan.","items":[["La quête du cristal","Grottes d’Ilum","Lors d’une quête guidée par la Force, l’apprenti recherche un cristal kyber lui correspondant. Cette expérience marque son cheminement personnel."],["L’assemblage du sabre","Précision et concentration","Le manche rassemble la cellule d’alimentation, les lentilles, les composants d’activation et le cristal de focalisation. L’assemblage demande patience et attention aux moindres alignements."],["La réalisation","Un lien entre Jedi et cristal","Le Padawan ajuste les composants avec la Force afin de créer une arme stable. Un sabre défectueux peut mettre son porteur en danger : la précipitation n’a pas sa place dans ce rituel."]]},{"id":"cristaux","icon":"✧","title":"Les Couleurs de Cristaux","tag":"Symboles et conditions d’utilisation RP","kind":"crystals","lead":"Ces associations correspondent aux conventions du manuel RP de référence ; elles ne constituent pas des règles universelles de tout l’univers Star Wars.","items":[["Vert","Primaire","Sagesse, diplomatie et réflexion ; souvent associé aux Consulaires.","#4bd77d"],["Bleu","Primaire","Courage, défense d’autrui et engagement chevaleresque.","#4c91ff"],["Jaune","Primaire","Curiosité, vigilance et investigation ; souvent associé aux Sentinelles.","#ecd852"],["Blanc","Accord et rituel","Pureté retrouvée après purification d’un cristal corrompu.","#eff8ff"],["Gris","Accord du Conseil","Maîtrise de soi et recherche d’équilibre selon les conventions RP.","#99a8b3"],["Argenté","Accord du Conseil","Neutralité et dévouement à la stabilité de la galaxie.","#c8d6e2"],["Doré","Accord du Conseil","Savoir approfondi, érudition et maîtrise exceptionnelle.","#e1b65d"],["Violet","Accord du Conseil","Voie particulière et maniement non conventionnel de la Force.","#9863ed"],["Orange","Accord du Conseil","Stratégie, discrétion et sens du compromis.","#f4a34c"],["Rose","Accord du Conseil","Harmonie, diplomatie et liens affectifs.","#f08cb9"],["Cyan","Accord du Conseil","Sérénité, assistance et vocation de guérisseur.","#5de3e7"],["Rouge","Interdit","Associé aux Sith et à la corruption des cristaux par le Côté Obscur.","#ef5661"],["Noir","Non obtenable","Référence à la rare lame noire, distincte des cristaux usuels.","#25313a"]]},{"id":"formes","icon":"⚔","title":"Les Formes de Combat","tag":"Douze approches décrites dans le manuel","kind":"forms","items":[["I · Shii-Cho","Fondamentaux","Enseigne les premières parades et attaques, base de la formation au sabre."],["II · Makashi","Duel","Recherche précision, économie du geste et maîtrise du face-à-face."],["III · Soresu","Défense","Privilégie la protection, notamment face aux tirs de blaster."],["IV · Ataru","Agilité","Utilise la mobilité et les acrobaties pour des assauts rapides."],["V · Shien / Djem So","Contre-attaque","Transforme la pression adverse en riposte énergique."],["VI · Niman","Équilibre","Combine les techniques du sabre et l’emploi de la Force."],["VII · Juyo","Intensité","Enchaîne des attaques imprévisibles et requiert un grand contrôle intérieur."],["VIII · Sokan","Terrain","Variante mobile exploitant l’environnement et les angles d’approche."],["IX · Shien So","Patience","Conserve une attitude de garde et prépare la contre-attaque."],["X · Jar’Kai","Deux sabres","Maniement d’une lame dans chaque main, sous réserve de formation RP."],["XI · Zez’Kai","Double lame","Techniques de rotation et de portée avec un sabre à deux lames."],["XII · Tràkata","Feintes","Usage tactique de l’activation de la lame et de la Force."]],"foot":"L’autorisation d’utiliser les techniques spéciales en RP dépend du règlement et des formations validées par le Conseil Jedi."},{"id":"sens","icon":"◉","title":"Les Pouvoirs des Sens","tag":"Perception et discernement","kind":"powers","items":[["Détection de vie","Prima Vitae","Ressentir la présence d’êtres vivants et reconnaître leurs traces dans la Force."],["Sens de Force","Tactus Otium","Percevoir les liens énergétiques et les perturbations liées à certains lieux ou événements."],["Exacerbation des sens","Vue · Ouïe · Odorat","Accroître temporairement les capacités sensorielles de l’espèce du Jedi."],["Postcognition","Tai Vordrax","Rechercher des impressions d’événements passés attachées à un objet ou à un endroit."],["Télépathie projective","Sens et altération","Transmettre une pensée, un message ou une émotion au moyen de la Force."]]},{"id":"institutions","icon":"◇","title":"Institutions Alliées et Ennemies","tag":"L’Ordre au sein de la galaxie","kind":"columns","items":[["Institutions alliées","Soutiens de la paix",["La République galactique : autorité politique que les Jedi servent et conseillent.","La Grande Armée de la République : partenaire des Jedi dans le cadre de la Guerre des Clones."]],["Adversaires de l’Ordre","Menaces pendant la guerre",["L’Ordre Sith : voie tournée vers la domination et le Côté Obscur.","La Confédération des Systèmes Indépendants : adversaire militaire de la République durant la Guerre des Clones.","Des agents tels qu’Asajj Ventress peuvent lier les opérations séparatistes à l’influence des Sith."]]]},{"id":"figures","icon":"✦","title":"Figures Emblématiques","tag":"Personnalités de l’histoire galactique","kind":"figures","items":[["Satele Shan","Maître Jedi","Personnalité de l’Ancienne République, associée à la résurgence de Tython."],["Odan-Urr","Érudit Jedi","Figure majeure de la transmission des traditions et de la bibliothèque d’Ossus."],["Yoda","Grand Maître Jedi","Guide de l’Ordre et membre éminent du Haut Conseil."],["Sheev Palpatine","Chancelier Suprême","Dirigeant politique de la République pendant la Guerre des Clones."],["Dark Bane","Seigneur Sith","Fondateur de la Règle des Deux dans la tradition Sith."],["Dark Malgus","Seigneur Sith","Acteur majeur du sac du Temple Jedi de Coruscant."],["Dark Marr","Conseil Noir Sith","Sith de l’Ancienne République, connu pour ses alliances tactiques face à des menaces communes."]]},{"id":"armee","icon":"▤","title":"La Grande Armée de la République","tag":"Régiments et commandements Jedi","kind":"regiments","items":[["104e Bataillon · Wolfpack","Plo Koon · Commandant Wolffe","Polyvalence, opérations de soutien et ravitaillement."],["212e Bataillon d’attaque","Obi-Wan Kenobi · Commandant Cody","Unité d’assaut opérant au plus près du front."],["327e Corps Stellaire","Aayla Secura · Commandant Bly","Engagements difficiles et opérations de terrain."],["501e Bataillon d’attaque","Anakin Skywalker · Ahsoka Tano · Rex","Formation d’assaut très mobile de la République."],["21e Corps Nova","Ki-Adi-Mundi · Commandant Bacara","Assauts spécialisés, notamment en environnement froid."],["41e Légion d’Élite","Luminara Unduli · Commandant Gree","Reconnaissance et combat en territoires hostiles."],["Shock Troopers","Commandant Fox","Police militaire, maintien de l’ordre et sécurité."],["408e Corps Cosmique","Commandement attribué selon le RP","Actions terrestres et aériennes polyvalentes."],["Brigade des Opérations Spéciales","B.O.S.","Missions confidentielles soumises à une chaîne de commandement particulière."]]},{"id":"adoubement","icon":"✧","title":"La Cérémonie d’Adoubement","tag":"Épreuves, serment et accession au rang de Chevalier","kind":"story","items":[["Le Conseil et la nomination","Le passage au rang de Chevalier","Après validation des épreuves, le Conseil accueille le Padawan lors d’une cérémonie solennelle. Les sabres allumés éclairent la salle et symbolisent la reconnaissance de l’Ordre."],["La tresse et le serment","Un nouveau devoir","La tresse du Padawan peut être coupée par la lame d’un Maître. Le nouveau Chevalier affirme alors son engagement envers la paix, l’Ordre et la protection des personnes vulnérables."],["Si les épreuves échouent","Poursuivre la formation","Le Conseil peut refuser l’élévation et demander un nouvel apprentissage. Une nouvelle évaluation demeure envisageable selon les délais et les règles du serveur ; d’autres voies de service existent dans l’Ordre."]],"foot":"Les délais, conditions de présentation et sanctions applicables sont ceux du règlement officiel du serveur, qui prévaut sur la description historique du manuel."}];

function manualItemCard(item, idx, kind){
 const [name,meta,desc,tags,swatch]=item;
 const special=kind==='crystals';
 return `<article class="pd-card ${kind==='story'?'pd-card-story':''} ${special?'pd-crystal':''}">
  ${special?`<span class="pd-swatch" style="--swatch:${safe(swatch||'#6fd4d1')}" aria-hidden="true"></span>`:''}
  <span class="pd-card-index">${String(idx+1).padStart(2,'0')}</span>
  <div class="pd-card-tag">${safe(meta||'ARCHIVES JEDI')}</div>
  <h3>${safe(name)}</h3>
  <p>${safe(desc||'')}</p>
  ${Array.isArray(tags)&&tags.length?`<div class="pd-tags">${tags.map(t=>`<span>${safe(t)}</span>`).join('')}</div>`:''}
 </article>`;
}

function renderPadawanChapter(section, idx){
 let inner='';
 if(section.kind==='precepts'){
  const verses=lines=>'<div class="pd-precepts">'+lines.map(line=>'<div class="pd-precept"><p><em>'+safe(line)+'</em></p></div>').join('')+'</div>';
  inner='<div class="pd-code-versions"><div class="pd-code-version"><h3>Code Jedi — Odan-Urr</h3>'+verses(section.items)+'</div>'+
   '<div class="pd-code-version pd-code-alternative"><h3>Autre formulation du Code Jedi</h3>'+verses(section.alternative||[])+'</div></div>';
 } else if(section.kind==='ranks'){
  inner='<div class="pd-ranks">'+section.items.map((item,i)=>`<div class="pd-rank"><span class="pd-rank-num">${String(i+1).padStart(2,'0')}</span><div><h3>${safe(item[0])}</h3><p>${safe(item[1])}</p></div></div>`).join('')+'</div>';
 } else if(section.kind==='columns'){
  inner='<div class="pd-grid pd-two">'+section.items.map((item,i)=>`<article class="pd-card pd-list-card"><span class="pd-card-tag">${safe(item[1])}</span><h3>${safe(item[0])}</h3><ul>${item[2].map(t=>'<li>'+safe(t)+'</li>').join('')}</ul></article>`).join('')+'</div>';
 } else if(section.kind==='crystals'){
  inner='<div class="pd-table-wrap"><table class="pd-color-table"><thead><tr><th>Couleur</th><th>Accès RP</th><th>Signification</th></tr></thead><tbody>'+section.items.map(item=>`<tr><td><span class="pd-crystal-name"><i style="--swatch:${safe(item[3])}"></i>${safe(item[0])}</span></td><td><span class="pd-permit">${safe(item[1])}</span></td><td>${safe(item[2])}</td></tr>`).join('')+'</tbody></table></div>';
 } else {
  const cls=section.kind==='places'||section.kind==='pillars'?'pd-three':section.kind==='story'?'pd-story-grid':'pd-three';
  inner='<div class="pd-grid '+cls+'">'+section.items.map((item,i)=>manualItemCard(item,i,section.kind)).join('')+'</div>';
 }
 return `<section class="pd-chapter" id="pd-${safe(section.id)}" aria-labelledby="pd-title-${idx}">
 <div class="pd-chapter-head">
  <span class="pd-chapter-icon">${safe(section.icon)}</span>
  <div><span class="pd-chapter-overline">CHAPITRE ${String(idx+1).padStart(2,'0')} · ${safe(section.tag)}</span><h2 id="pd-title-${idx}">${safe(section.title)}</h2></div>
 </div>
 ${section.lead?'<p class="pd-lead">'+safe(section.lead)+'</p>':''}
 ${inner}
 ${section.foot?'<div class="pd-note">'+safe(section.foot)+'</div>':''}
 </section>`;
}

function renderPadawanManual(){
 const menus=padawanChapters.map((section,i)=>`<button type="button" data-action="padawan-jump" data-section="pd-${safe(section.id)}"><span>${String(i+1).padStart(2,'0')}</span>${safe(section.title)}</button>`).join('');
 return `<div class="pd-manual">
  <div class="pd-topnav"><a href="#connaissances">‹ Retour aux connaissances Jedi</a><span>ARCHIVES / CONNAISSANCES / MANUEL</span></div>
  <header class="pd-hero">
   <div class="pd-hero-symbol" aria-hidden="true">✧</div>
   <span class="pd-kicker">ENSEIGNEMENTS FONDAMENTAUX · ORDRE JEDI</span>
   <h1>Manuel du <em>Padawan</em></h1>
   <p>De la naissance de l’Ordre à l’adoubement d’un Chevalier, explorez les savoirs fondamentaux et la discipline du futur Jedi.</p>
   <div class="pd-hero-author">D’après le manuel de référence présenté par Maître Luminara Unduli et Maître Mérisée Varsin</div>
   <div class="pd-hero-stats"><span>14 CHAPITRES</span><span>3 PILIERS</span><span>1 VOIE : LA FORCE</span></div>
  </header>
  <section class="pd-intro"><span>III</span><p>Le manuel de référence situe les origines de l’Ordre plus de vingt millénaires avant le traité de Coruscant. Sa formation repose sur trois principes complémentaires : comprendre la Force, cultiver la connaissance et exercer l’autodiscipline.</p></section>
  <div class="pd-toc">
   <div><span class="pd-kicker">SOMMAIRE DES ARCHIVES</span><h2>Parcours du Padawan</h2></div>
   <div class="pd-toc-grid">${menus}</div>
  </div>
  <div class="pd-chapters">${padawanChapters.map(renderPadawanChapter).join('')}</div>
  <div class="pd-end"><span>✧</span><p>Un Jedi n'achève jamais véritablement son apprentissage.</p>
  <a href="#connaissances">Retour à la bibliothèque</a>
  <a href="https://kayuto69.github.io/Ordre-Jedi-Site/#manuel-padawan" target="_blank" rel="noopener noreferrer">Manuel RP de référence ↗</a></div>
 </div>`;
}

function renderConnaissancesHub(){
 return `<section class="pd-library-entry" aria-label="Sous-catégorie Manuel du Padawan">
  <div class="pd-library-text"><span class="pd-kicker">BIBLIOTHÈQUE / FORMATION JEDI</span><h2>Manuel du Padawan</h2><p>Un parcours illustré en chapitres : histoire, Code Jedi, trois piliers, maîtrise du sabre, Force, hiérarchie et épreuves.</p></div>
  <a href="#manuel-padawan" class="pd-library-link">OUVRIR LE MANUEL <span aria-hidden="true">→</span></a>
 </section>`;
}

function pageView(page){
 if(!page){return `<section class="simple-state"><span class="state-mark">⌕</span><h1>Document introuvable</h1><p>Cette page n’est pas disponible dans les archives auxquelles vous avez accès.</p><a class="primary-btn" href="#accueil">RETOUR À L’ACCUEIL</a></section>`;}
 if(page.slug==='manuel-padawan')return renderPadawanManual();
 const editAllowed=canEdit() && (page.visibility!=='council'||canReadCouncil());
 return `<div class="page-banner"><div class="banner-top"><span class="eyebrow">ORDRE JEDI / ${safe(page.eyebrow||'ARCHIVES')}</span><span class="visibility ${page.visibility==='council'?'gold':''}">${page.visibility==='council'?'◈':'◉'} ${safe((labels[page.visibility]||page.visibility).toUpperCase())}</span></div><h1>${safe(page.title)}</h1><p>${safe(page.summary)}</p><div class="banner-meta"><span>✦ DOCUMENT DES ARCHIVES</span>${page.updated_at?`<span>ACTUALISÉ LE ${safe(formatDate(page.updated_at)).toUpperCase()}</span>`:''}${editAllowed?`<button class="small-outline" data-action="edit-page" data-slug="${safe(page.slug)}">✎ MODIFIER LE DOCUMENT</button>`:''}</div></div><article class="archive-document"><div class="article-edge"></div><div class="doc-heading"><span>HOLONET / ARCHIVES DE CORUSCANT</span><span>RÉF. ${safe(page.slug.toUpperCase())}</span></div>${page.slug==='connaissances'?renderConnaissancesHub():''}<div class="markdown">${parseMarkdown(page.content)}</div>${page.slug==='effectifs'?effectifsSheetEmbed():''}<div class="article-bottom">✦ &nbsp; QUE LA FORCE SOIT AVEC VOUS &nbsp; ✦</div></article>`;
}
function lockedView(){return `<section class="simple-state locked"><span class="state-mark">◇</span><div class="eyebrow">NIVEAU DE SÉCURITÉ : CONSEIL JEDI</div><h1>Archives classifiées</h1><p>Cette section est réservée aux membres autorisés du Haut Conseil Jedi. La consultation requiert une identification GitHub et une autorisation accordée par l’administration.</p>${configured?(user?'<div class="note-block">Compte connecté, mais autorisation de niveau Conseil absente.</div>':'<button class="primary-btn" data-action="login">S’IDENTIFIER AVEC GITHUB ↗</button>'):'<div class="note-block">Configuration de l’authentification requise pour activer cet espace.</div>'}</section>`;}
function adminView(){
 if(!isAdmin())return lockedView();
 return `<div class="page-banner"><div class="banner-top"><span class="eyebrow">ADMINISTRATION / SÉCURITÉ</span><span class="visibility gold">◆ ADMINISTRATEUR</span></div><h1>Gestion des accès</h1><p>Accordez l’accès aux membres de l’Ordre à partir de leur identifiant GitHub. Seuls les comptes présents dans cette liste peuvent consulter les archives réservées.</p></div><section class="management"><div class="management-head"><div><div class="eyebrow">CONTRÔLE DES IDENTITÉS</div><h2>Comptes autorisés</h2></div><button class="primary-btn" data-action="add-member">+ AUTORISER UN COMPTE</button></div><div class="member-table-wrap"><table class="member-table"><thead><tr><th>COMPTE GITHUB</th><th>IDENTIFIANT</th><th>RÔLE</th><th>ÉTAT</th><th>GESTION</th></tr></thead><tbody>${members.map(m=>`<tr><td><strong>@${safe(m.github_username)}</strong></td><td>${safe(m.github_user_id)}</td><td><span class="role-tag">${safe(roleNames[m.role]||m.role)}</span></td><td><span class="state-chip ${m.active?'ok':'off'}">${m.active?'ACTIF':'SUSPENDU'}</span></td><td><button class="table-action" data-action="edit-member" data-github-id="${safe(m.github_user_id)}">MODIFIER</button></td></tr>`).join('')||'<tr><td colspan="5">Aucun compte autorisé</td></tr>'}</tbody></table></div><div class="note-block"><strong>Important :</strong> une connexion GitHub ne donne aucun droit automatiquement. Le contrôle d’accès est aussi appliqué dans Supabase, indépendamment de l’interface.</div></section>`;
}
function render(){
 selected=hashPage(); const currentNav=navigation.find(a=>a[0]===selected);
 q('#breadcrumb').textContent=selected==='accueil'?'ACCUEIL':selected==='administration'?'ADMINISTRATION':(selected==='manuel-padawan'?'MANUEL DU PADAWAN':currentNav?.[2].toUpperCase())||'ARCHIVES';
 renderNav();renderAuth();
 if(selected==='accueil'){q('#app').innerHTML=showHero();return;}
 if(selected==='administration'){q('#app').innerHTML=adminView();return;}
 if(selected==='archives-conseil'&&!canReadCouncil()){q('#app').innerHTML=lockedView();return;}
 q('#app').innerHTML=pageView(pages.find(p=>p.slug===selected));
 if(selected==='effectifs')refreshRegistre();
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
 if(action==='padawan-jump')document.getElementById(button.dataset.section)?.scrollIntoView({behavior:'smooth',block:'start'});
 if(action==='registre-tab')selectRegistreTab(button.dataset.tab);
 if(action==='login')await signIn();
 if(action==='logout')await signOut();
 if(action==='edit-page')pageEditor(button.dataset.slug);
 if(action==='add-member')memberEditor(null);
 if(action==='edit-member')memberEditor(button.dataset.githubId);
 if(action==='close-modal')closeModal();
});
function setNavigationOpen(open){
 q('#sidebar').classList.toggle('open',open);
 q('#mobile-menu').setAttribute('aria-expanded',String(open));
 q('#mobile-menu').setAttribute('aria-label',open?'Masquer la navigation':'Afficher la navigation');
}
q('#mobile-menu').addEventListener('click',()=>setNavigationOpen(!q('#sidebar').classList.contains('open')));
q('#main-nav').addEventListener('click',e=>{if(e.target.closest('a'))setNavigationOpen(false);});
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
