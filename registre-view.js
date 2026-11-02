import { registreSnapshot } from './registre.js';

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
 const rows=data.map(row=>{
  if(tab==='formes' && row[0] && !row[1]) return '<tr class="registre-section-row"><th colspan="4">'+esc(row[0])+'</th></tr>';
  return '<tr class="'+(tab==='effectifs' && row[0]?.startsWith('Total /')?'registre-summary':'')+'">'+columns[tab].map((_,i)=>'<td>'+esc(row[i]||'—')+'</td>').join('')+'</tr>';
 }).join('');
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
export function selectRegistreTab(tab) {
 if(!columns[tab])return;
 activeTab=tab;
 paint();
}
export function renderRegistrePanel() {
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
export function refreshRegistre(){
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
