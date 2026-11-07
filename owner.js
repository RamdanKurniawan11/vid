const ownerRoleParam=new URLSearchParams(location.search).get('demoRole');
let savedOwnerRole='';
try{savedOwnerRole=sessionStorage.getItem('villaDamarDemoRole')||localStorage.getItem('villaDamarDemoRole')||'';}catch{}
if(ownerRoleParam==='owner'){try{sessionStorage.setItem('villaDamarDemoRole','owner');localStorage.setItem('villaDamarDemoRole','owner');}catch{}}
if((ownerRoleParam||savedOwnerRole)!=='owner'){
  window.location.replace('login.html');
}else{
const ownerVillas=[
  {key:'ningrum',name:'Villa Ningrum No. 01',folder:'ningrum-1',image:'assets/ningrum-1/bg.png',rate:1300000,capacity:2,bedrooms:1,color:'ningrum'},
  {key:'wulan',name:'Villa Wulan No. 01',folder:'wulan-1',image:'assets/wulan-1/bg.png',rate:2700000,capacity:4,bedrooms:2,color:'wulan'}
];
const ownerBookings=[
  {id:'OWN-001',guest:'Nadia Putri',villa:'ningrum',startOffset:1,nights:2,guests:'2 dewasa',channel:'Agoda',gross:2600000,fixed:['laundry','gasMelon','galon','pengelola','amenities'],manual:{water:30000,electricity:45000,shower:15000},other:[{name:'Parkir tambahan',amount:20000}]},
  {id:'OWN-002',guest:'Arif Pratama',villa:'wulan',startOffset:4,nights:3,guests:'4 dewasa',channel:'Website',gross:8100000,fixed:['laundry','gasPortable','galon','pengelola','amenities','breakfast'],manual:{water:40000,electricity:90000,float:100000,shower:20000},other:[]},
  {id:'OWN-003',guest:'Maya Lestari',villa:'ningrum',startOffset:8,nights:2,guests:'2 dewasa, 1 anak',channel:'Booking.com',gross:2800000,fixed:['laundry','gasMelon','pengelola','breakfast'],manual:{water:25000,electricity:35000},other:[]},
  {id:'OWN-004',guest:'Bima Saputra',villa:'wulan',startOffset:12,nights:2,guests:'3 dewasa',channel:'WhatsApp',gross:5400000,fixed:['laundry','galon','pengelola','amenities'],manual:{electricity:65000,shower:25000},other:[{name:'Dekorasi kamar',amount:150000}]},
  {id:'OWN-005',guest:'Sinta Rahma',villa:'ningrum',startOffset:17,nights:3,guests:'2 dewasa',channel:'Traveloka',gross:3900000,fixed:['laundry','gasPortable','galon','pengelola','amenities'],manual:{water:20000,electricity:50000},other:[]},
  {id:'OWN-006',guest:'Dimas Hadi',villa:'wulan',startOffset:23,nights:2,guests:'5 dewasa',channel:'Website',gross:5400000,fixed:['laundry','gasMelon','galon','pengelola','amenities','breakfast'],manual:{water:35000,electricity:80000,float:50000},other:[]}
];
const ownerFixedRates=[['laundry','Laundry',75000],['gasMelon','Gas melon',25000],['gasPortable','Gas portable',25000],['galon','Galon',20000],['pengelola','Pengelola',50000],['amenities','Amenities',55000],['breakfast','Breakfast',50000]];
const formatMoney=value=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
const today=new Date();today.setHours(0,0,0,0);
const addDays=(date,count)=>{const result=new Date(date);result.setDate(result.getDate()+count);return result;};
const fmtDate=date=>new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'short',year:'numeric'}).format(date);
const fmtMonth=date=>new Intl.DateTimeFormat('id-ID',{month:'long',year:'numeric'}).format(date);
const dateRange=booking=>`${fmtDate(addDays(today,booking.startOffset))} – ${fmtDate(addDays(today,booking.startOffset+booking.nights))}`;
const getVilla=key=>ownerVillas.find(villa=>villa.key===key);
const fixedItems=booking=>ownerFixedRates.filter(([key])=>booking.fixed.includes(key)).map(([,label,amount])=>({label,amount}));
const expenseItems=booking=>[...fixedItems(booking),...Object.entries(booking.manual||{}).filter(([,amount])=>amount>0).map(([key,amount])=>({label:({water:'Air PAM',electricity:'Listrik',float:'Pelampung',shower:'Shower'})[key],amount})),...(booking.other||[]).filter(item=>item.amount>0).map(item=>({label:item.name,amount:item.amount}))];
const expenseTotal=booking=>expenseItems(booking).reduce((sum,item)=>sum+item.amount,0);
const bookingNet=booking=>booking.gross-expenseTotal(booking);
const bookingDate=booking=>addDays(today,booking.startOffset);
const channelGroup=channel=>channel==='Website'?'Website langsung':['Booking.com','Agoda','Traveloka','Tiket.com'].includes(channel)?'Marketplace':'WhatsApp admin';
const getCurrentMonthBookings=()=>ownerBookings.filter(booking=>bookingDate(booking).getMonth()===today.getMonth()&&bookingDate(booking).getFullYear()===today.getFullYear());
const totalFor=bookings=>bookings.reduce((sum,booking)=>sum+booking.gross,0);
const totalExpenses=bookings=>bookings.reduce((sum,booking)=>sum+expenseTotal(booking),0);
let ownerView='overview';
let calendarMonth=new Date(today.getFullYear(),today.getMonth(),1);
let activeReportFilter=null;
const localISO=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const displayISO=value=>fmtDate(new Date(`${value}T00:00:00`));
const bookingISO=booking=>localISO(bookingDate(booking));
function filteredReportBookings(){
  if(!activeReportFilter)return ownerBookings;
  return ownerBookings.filter(booking=>{
    const date=bookingISO(booking);
    const villaMatch=activeReportFilter.villa==='all'||booking.villa===activeReportFilter.villa;
    const group=channelGroup(booking.channel);
    const sourceMatch=activeReportFilter.source==='all'||activeReportFilter.source===group||activeReportFilter.source===booking.channel;
    return date>=activeReportFilter.start&&date<=activeReportFilter.end&&villaMatch&&sourceMatch;
  });
}

const ownerContent=document.getElementById('owner-content');
document.getElementById('owner-today').textContent=`◷  ${new Intl.DateTimeFormat('id-ID',{weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(today)}`;

function demoBanner(){return `<div class="demo-banner owner-demo"><i class="demo-dot"></i><span><b>Mode demo:</b> semua data booking, pendapatan, dan pengeluaran di portal ini adalah simulasi untuk dua villa contoh.</span></div>`;}
function ownerStat(label,value,foot,iconText,net=false){return `<article class="stat-card owner-stat-card ${net?'net-card':''}"><div class="stat-top"><span>${label}</span><i class="stat-icon">${iconText}</i></div><div class="stat-value">${value}</div><div class="stat-foot">${foot}</div></article>`;}

function renderOverview(){
  const monthBookings=getCurrentMonthBookings();
  const revenue=totalFor(monthBookings),costs=totalExpenses(monthBookings),net=revenue-costs;
  const allNights=monthBookings.reduce((sum,booking)=>sum+booking.nights,0);
  const daysInMonth=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
  const occupancy=Math.min(100,Math.round(allNights/(ownerVillas.length*daysInMonth)*100));
  const channels=['Website langsung','Marketplace','WhatsApp admin'];
  const channelCounts=channels.map(channel=>monthBookings.filter(booking=>channelGroup(booking.channel)===channel).length);
  const totalBookings=channelCounts.reduce((sum,count)=>sum+count,0)||1;
  let offset=0;
  const channelColors=['#f2783f','#6a70b1','#4c9c7e'];
  const stops=channelCounts.map((count,index)=>{const start=offset/totalBookings*100;offset+=count;return `${channelColors[index]} ${start}% ${offset/totalBookings*100}%`;}).join(', ');
  const sourceLegend=channels.map((channel,index)=>`<div class="source-item"><i class="source-dot" style="background:${channelColors[index]}"></i><span>${channel}${channel==='Marketplace'?`<small class="source-share">${['Agoda','Booking.com','Traveloka','Tiket.com'].filter(site=>monthBookings.some(booking=>booking.channel===site)).join(', ')||'OTA'}</small>`:''}</span><strong>${channelCounts[index]}</strong></div>`).join('');
  return `${demoBanner()}<section class="owner-welcome"><div><h2>Ringkasan kepemilikan</h2><p>Pantau performa dua villa Anda dalam satu tempat.</p></div><div class="owner-unit-pills"><span>Villa Ningrum No. 01</span><span>Villa Wulan No. 01</span></div></section><section class="stats-grid owner-stats">${ownerStat('Pendapatan kotor',formatMoney(revenue),`${monthBookings.length} booking bulan ini`,'↗')}${ownerStat('Total pengeluaran',formatMoney(costs),'Biaya per booking dan operasional','−')}${ownerStat('Pendapatan bersih',formatMoney(net),'Pendapatan kotor dikurangi pengeluaran','✓',true)}${ownerStat('Okupansi gabungan',`${occupancy}%`,`${allNights} malam terpesan bulan ini`,'◌')}</section><div class="owner-dashboard-grid"><section class="owner-panel"><div class="owner-panel-head"><div><h3>Sumber booking</h3><p>Perbandingan asal pemesanan bulan ini</p></div></div><div class="source-layout"><div class="source-donut" style="background:conic-gradient(${stops||'#e8e7ef 0 100%'})"><div><strong>${monthBookings.length}</strong><small>booking</small></div></div><div class="source-legend">${sourceLegend}</div></div></section><section class="owner-panel"><div class="owner-panel-head"><div><h3>Performa villa</h3><p>Pendapatan dan biaya per unit</p></div><a href="#reports" class="detail-link" data-owner-view="reports">Lihat laporan</a></div><div class="villa-income-list">${ownerVillas.map(villa=>{const rows=monthBookings.filter(booking=>booking.villa===villa.key);const income=totalFor(rows),expense=totalExpenses(rows);return `<div class="villa-income-row"><div><strong>${villa.name}</strong><span>${rows.length} booking · ${rows.reduce((n,row)=>n+row.nights,0)} malam</span></div><div><b>${formatMoney(income)}</b><small>Biaya ${formatMoney(expense)}</small></div></div>`;}).join('')}</div></section></div><section class="owner-panel report-mini"><div class="owner-panel-head"><div><h3>Ringkasan pendapatan bersih</h3><p>Periode ${fmtMonth(today)}</p></div><a href="#reports" class="btn" data-owner-view="reports">Buka laporan →</a></div><div class="report-summary"><div><span>Pendapatan kotor</span><strong>${formatMoney(revenue)}</strong></div><div><span>Total pengeluaran</span><strong>${formatMoney(costs)}</strong></div><div class="net"><span>Pendapatan bersih</span><strong>${formatMoney(net)}</strong></div></div></section><section class="owner-panel"><div class="owner-panel-head"><div><h3>Jadwal terdekat</h3><p>Jadwal menginap untuk villa Anda</p></div><a href="#calendar" class="btn" data-owner-view="calendar">Buka kalender →</a></div><div class="owner-upcoming">${monthBookings.slice(0,4).map(booking=>`<button class="upcoming-row" type="button" data-owner-detail="${booking.id}"><span class="upcoming-date">${fmtDate(bookingDate(booking))}</span><span><strong>${booking.guest}</strong><small>${getVilla(booking.villa).name} · ${booking.nights} malam</small></span><span class="upcoming-source">${booking.channel}</span></button>`).join('')}</div></section>`;
}

function renderCalendar(){
  const monthFirst=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1);
  const start=new Date(monthFirst);const mondayOffset=(start.getDay()+6)%7;start.setDate(start.getDate()-mondayOffset);
  const days=Array.from({length:42},(_,index)=>addDays(start,index));
  const filter=document.getElementById('calendar-villa-filter')?.value||'all';
  const weeks=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  const cells=days.map(day=>{
    const key=`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    const events=ownerBookings.filter(booking=>{
      const villaMatch=filter==='all'||booking.villa===filter;
      const diff=Math.round((day-bookingDate(booking))/86400000);
      return villaMatch&&diff>=0&&diff<booking.nights;
    });
    return `<div class="calendar-day ${day.getMonth()!==calendarMonth.getMonth()?'is-outside':''} ${day.toDateString()===today.toDateString()?'is-today':''}"><div class="calendar-date"><span>${day.getDate()}</span>${day.toDateString()===today.toDateString()?'<i class="today-dot"></i>':''}</div>${events.map((booking,index)=>`<button class="calendar-event ${booking.villa==='wulan'?'wulan':''}" type="button" data-owner-detail="${booking.id}" title="${booking.guest} · ${getVilla(booking.villa).name}">${Math.round((day-bookingDate(booking))/86400000)===0?'Check-in · ':''}${booking.guest.split(' ')[0]}</button>`).join('')}</div>`;
  }).join('');
  return `${demoBanner()}<section class="owner-welcome"><div><h2>Kalender villa</h2><p>Lihat jadwal menginap untuk kedua villa milik Anda.</p></div><label class="calendar-filter-label">Villa <select class="control" id="calendar-villa-filter"><option value="all">Semua villa</option>${ownerVillas.map(villa=>`<option value="${villa.key}">${villa.name}</option>`).join('')}</select></label></section><section class="owner-panel"><div class="owner-panel-head"><div><h3>Jadwal menginap</h3><p>Data reservasi dummy · klik jadwal untuk rincian booking</p></div><div class="owner-calendar-toolbar"><button class="calendar-arrow" type="button" data-month-step="-1" aria-label="Bulan sebelumnya">‹</button><strong>${fmtMonth(calendarMonth)}</strong><button class="calendar-arrow" type="button" data-month-step="1" aria-label="Bulan berikutnya">›</button></div></div><div class="calendar-grid">${weeks.map(day=>`<div class="calendar-weekday">${day}</div>`).join('')}${cells}</div><div class="calendar-legend"><span><i></i>Villa Ningrum No. 01</span><span><i></i>Villa Wulan No. 01</span></div></section>`;
}

function renderReports(){
  const rows=filteredReportBookings();
  const revenue=totalFor(rows),costs=totalExpenses(rows),net=revenue-costs;
  const ownerShare=Math.round(net*.7),managerShare=net-ownerShare;
  const breakdown=new Map();rows.forEach(booking=>expenseItems(booking).forEach(item=>breakdown.set(item.label,(breakdown.get(item.label)||0)+item.amount)));
  const filterDescription=activeReportFilter?`${displayISO(activeReportFilter.start)} s.d. ${displayISO(activeReportFilter.end)} · ${activeReportFilter.villa==='all'?'Semua villa':getVilla(activeReportFilter.villa).name} · ${activeReportFilter.source==='all'?'Semua sumber':activeReportFilter.source}`:'Semua data booking dummy';
  return `${demoBanner()}<section class="owner-welcome"><div><h2>Laporan keuangan</h2><p>Rincian pendapatan, pengeluaran, dan pembagian hasil untuk reservasi.</p></div><div class="owner-report-actions"><button class="btn btn-primary" type="button" data-generate-report>Generate report</button><button class="btn" type="button" data-export-report ${rows.length?'':'disabled'}>Unduh CSV</button></div></section><section class="owner-panel report-filter-summary"><div><span>Filter laporan</span><strong>${filterDescription}</strong><small>Rentang tanggal berdasarkan tanggal check-in.</small></div></section><section class="owner-panel"><div class="report-summary owner-share-summary"><div><span>Pendapatan kotor</span><strong>${formatMoney(revenue)}</strong></div><div><span>Total pengeluaran</span><strong>${formatMoney(costs)}</strong></div><div class="net"><span>Pendapatan bersih</span><strong>${formatMoney(net)}</strong></div><div class="share-owner"><span>Bagian owner · 70%</span><strong>${formatMoney(ownerShare)}</strong></div><div class="share-manager"><span>Bagian pengelola · 30%</span><strong>${formatMoney(managerShare)}</strong></div></div><p class="share-note">Bagi hasil dihitung dari pendapatan bersih setelah dikurangi pengeluaran.</p></section><div class="owner-dashboard-grid report-lower-grid"><section class="owner-panel"><div class="owner-panel-head"><div><h3>Rincian pengeluaran</h3><p>Akumulasi biaya untuk ${rows.length} booking yang cocok.</p></div></div>${breakdown.size?`<div class="expense-breakdown">${[...breakdown].map(([label,amount])=>`<div><span>${label}</span><strong>${formatMoney(amount)}</strong></div>`).join('')}</div>`:'<p class="report-empty">Belum ada pengeluaran pada filter laporan ini.</p>'}</section><section class="owner-panel"><div class="owner-panel-head"><div><h3>Ringkasan pembagian hasil</h3><p>Perhitungan porsi dari pendapatan bersih.</p></div></div><div class="share-visual"><div><span>Owner</span><strong>70%</strong><small>${formatMoney(ownerShare)}</small><i style="width:70%"></i></div><div><span>Pengelola Villa Istana Damar</span><strong>30%</strong><small>${formatMoney(managerShare)}</small><i style="width:30%"></i></div></div></section></div><section class="owner-panel"><div class="owner-panel-head"><div><h3>Detail biaya per tamu</h3><p>Daftar booking sesuai rentang tanggal, villa, dan sumber yang dipilih.</p></div></div><div class="owner-report-table"><table><thead><tr><th>Tanggal check-in</th><th>Tamu</th><th>Villa</th><th>Sumber</th><th>Pendapatan kotor</th><th>Pengeluaran</th><th>Pendapatan bersih</th><th>Rincian</th></tr></thead><tbody>${rows.length?rows.map(booking=>`<tr><td>${fmtDate(bookingDate(booking))}</td><td><strong>${booking.guest}</strong><span class="subtext">${booking.id}</span></td><td>${getVilla(booking.villa).name}</td><td>${booking.channel}</td><td>${formatMoney(booking.gross)}</td><td>${formatMoney(expenseTotal(booking))}</td><td><strong>${formatMoney(bookingNet(booking))}</strong></td><td><button class="detail-link" type="button" data-owner-detail="${booking.id}">Detail biaya</button></td></tr>`).join(''):'<tr><td class="report-empty" colspan="8">Tidak ada booking yang cocok dengan pilihan filter.</td></tr>'}</tbody></table></div></section>`;
}

function renderMyVillas(){
  return `${demoBanner()}<section class="owner-welcome"><div><h2>Villa saya</h2><p>Portofolio villa yang terdaftar di akun owner Andi Saputra.</p></div></section><div class="owner-villas-grid">${ownerVillas.map(villa=>{const rows=getCurrentMonthBookings().filter(booking=>booking.villa===villa.key);return `<article class="owner-villa-card"><div class="owner-villa-image"><img src="${villa.image}" alt="${villa.name}" loading="lazy"><span>Dimiliki oleh Andi Saputra</span></div><div class="owner-villa-info"><h3>${villa.name}</h3><p>${villa.bedrooms} kamar · Maks. ${villa.capacity} tamu · tarif mulai ${formatMoney(villa.rate)}/malam</p><div class="owner-villa-stats"><div><span>Booking bulan ini</span><strong>${rows.length} reservasi</strong></div><div><span>Pendapatan kotor</span><strong>${formatMoney(totalFor(rows))}</strong></div><div><span>Pendapatan bersih</span><strong>${formatMoney(totalFor(rows)-totalExpenses(rows))}</strong></div></div></div></article>`;}).join('')}</div>`;
}

const ownerViews={overview:{title:'Ringkasan owner',render:renderOverview},calendar:{title:'Kalender villa',render:renderCalendar},reports:{title:'Laporan keuangan',render:renderReports},villas:{title:'Villa saya',render:renderMyVillas}};
function renderOwnerView(){
  document.getElementById('owner-page-title').textContent=ownerViews[ownerView].title;
  ownerContent.innerHTML=ownerViews[ownerView].render();
  document.querySelectorAll('[data-owner-view]').forEach(link=>link.classList.toggle('active',link.dataset.ownerView===ownerView));
  document.body.classList.remove('menu-open');
}

function showBookingDetails(bookingId){
  const booking=ownerBookings.find(item=>item.id===bookingId);if(!booking)return;
  const villa=getVilla(booking.villa),items=expenseItems(booking);
  const root=document.getElementById('owner-dialog-root');
  root.innerHTML=`<div class="owner-modal-backdrop" data-owner-close><section class="owner-detail-modal" role="dialog" aria-modal="true" aria-labelledby="owner-detail-title"><header><div><h2 id="owner-detail-title">${booking.guest}</h2><p>${booking.id} · ${villa.name} · ${booking.channel}</p><p>${dateRange(booking)} · ${booking.guests}</p></div><button class="modal-x" type="button" data-owner-close aria-label="Tutup">×</button></header><div class="owner-expense-list"><div class="owner-expense-line"><strong>Rincian pengeluaran</strong><strong>Nominal</strong></div>${items.map(item=>`<div class="owner-expense-line"><span>${item.label}</span><strong>${formatMoney(item.amount)}</strong></div>`).join('')}</div><div class="owner-detail-totals"><div><span>Pendapatan kotor</span><strong>${formatMoney(booking.gross)}</strong></div><div><span>Total pengeluaran</span><strong>${formatMoney(expenseTotal(booking))}</strong></div><div class="net"><span>Pendapatan bersih</span><strong>${formatMoney(bookingNet(booking))}</strong></div></div><p class="owner-footnote">Rincian dan angka di atas merupakan data simulasi.</p></section></div>`;
}

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-owner-view]');
  if(nav){event.preventDefault();ownerView=nav.dataset.ownerView;history.replaceState(null,'',`#${ownerView}`);renderOwnerView();return;}
  const detail=event.target.closest('[data-owner-detail]');
  if(detail){showBookingDetails(detail.dataset.ownerDetail);return;}
  const step=event.target.closest('[data-month-step]');
  if(step){calendarMonth=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+Number(step.dataset.monthStep),1);renderOwnerView();return;}
  if(event.target.closest('[data-generate-report]'))showReportGenerator();
  if(event.target.closest('[data-export-report]'))exportOwnerReport();
  if(event.target.matches('[data-report-result-close]')){activeReportFilter=null;document.getElementById('owner-dialog-root').replaceChildren();renderOwnerView();}
});
ownerContent.addEventListener('change',event=>{
  if(event.target.id==='calendar-villa-filter'){const value=event.target.value;renderOwnerView();const select=document.getElementById('calendar-villa-filter');select.value=value;}
});
document.addEventListener('click',event=>{
  if(event.target.closest('[data-menu-toggle]'))document.body.classList.toggle('menu-open');
  if(event.target.closest('[data-close-menu]')||event.target.closest('.side-nav a'))document.body.classList.remove('menu-open');
  if(event.target.closest('[data-owner-logout]')){try{sessionStorage.removeItem('villaDamarDemoRole');localStorage.removeItem('villaDamarDemoRole');}catch{}}
  if(event.target.matches('[data-owner-close]'))document.getElementById('owner-dialog-root').replaceChildren();
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const hadReport=document.querySelector('.generated-report-modal');document.getElementById('owner-dialog-root').replaceChildren();if(hadReport){activeReportFilter=null;renderOwnerView();}}});

function showReportGenerator(){
  const monthEnd=new Date(today.getFullYear(),today.getMonth()+1,0);
  const root=document.getElementById('owner-dialog-root');
  root.innerHTML=`<div class="owner-modal-backdrop" data-owner-close><section class="owner-detail-modal report-generator" role="dialog" aria-modal="true" aria-labelledby="report-generator-title"><header><div><p class="eyebrow">Laporan owner</p><h2 id="report-generator-title">Generate report</h2><p>Pilih periode dan data yang ingin disertakan.</p></div><button class="modal-x" type="button" data-owner-close aria-label="Tutup">×</button></header><form id="report-generator-form" class="report-generator-form"><label>Dari tanggal<input type="date" name="start" value="${localISO(today)}" required></label><label>Sampai tanggal<input type="date" name="end" value="${localISO(monthEnd)}" required></label><label>Villa<select name="villa"><option value="all">Semua villa saya</option>${ownerVillas.map(villa=>`<option value="${villa.key}">${villa.name}</option>`).join('')}</select></label><label>Sumber booking<select name="source"><option value="all">Semua sumber</option><option value="Website langsung">Website</option><option value="Marketplace">Marketplace (semua OTA)</option><option value="Booking.com">Booking.com</option><option value="Agoda">Agoda</option><option value="Traveloka">Traveloka</option><option value="Tiket.com">Tiket.com</option><option value="WhatsApp admin">WhatsApp admin</option></select></label><p class="report-form-error" id="report-form-error" role="alert"></p><div class="report-generator-actions"><button class="btn" type="button" data-owner-close>Batal</button><button class="btn btn-primary" type="submit">Generate report</button></div></form></section></div>`;
  root.querySelector('[name="start"]').focus();
}

function showGeneratedReport(){
  const rows=filteredReportBookings();
  const revenue=totalFor(rows),costs=totalExpenses(rows),net=revenue-costs;
  const ownerShare=Math.round(net*.7),managerShare=net-ownerShare;
  const breakdown=new Map();
  rows.forEach(booking=>expenseItems(booking).forEach(item=>breakdown.set(item.label,(breakdown.get(item.label)||0)+item.amount)));
  const filter=activeReportFilter;
  const period=`${displayISO(filter.start)} – ${displayISO(filter.end)}`;
  const villaName=filter.villa==='all'?'Semua villa':getVilla(filter.villa).name;
  const sourceName=filter.source==='all'?'Semua sumber':filter.source;
  const root=document.getElementById('owner-dialog-root');
  root.innerHTML=`<div class="owner-modal-backdrop report-result-backdrop" data-report-result-close><section class="owner-detail-modal generated-report-modal" role="dialog" aria-modal="true" aria-labelledby="generated-report-title"><header><div><p class="eyebrow">Laporan keuangan · Mode demo</p><h2 id="generated-report-title">Hasil report</h2><p>${period} · ${villaName} · ${sourceName}</p></div><button class="modal-x" type="button" data-report-result-close aria-label="Tutup">×</button></header><div class="generated-report-summary"><div><span>Pendapatan kotor</span><strong>${formatMoney(revenue)}</strong></div><div><span>Total pengeluaran</span><strong>${formatMoney(costs)}</strong></div><div><span>Pendapatan bersih</span><strong>${formatMoney(net)}</strong></div><div class="owner-share-value"><span>Bagian owner · 70%</span><strong>${formatMoney(ownerShare)}</strong></div><div class="manager-share-value"><span>Bagian pengelola · 30%</span><strong>${formatMoney(managerShare)}</strong></div></div><p class="generated-report-note">Bagi hasil dihitung dari pendapatan bersih setelah dikurangi seluruh pengeluaran. Periode laporan mengikuti tanggal check-in.</p><div class="generated-report-grid"><section class="generated-report-section"><h3>Rincian pengeluaran</h3><p>Akumulasi biaya dari ${rows.length} booking.</p>${breakdown.size?`<div class="expense-breakdown">${[...breakdown].map(([label,amount])=>`<div><span>${label}</span><strong>${formatMoney(amount)}</strong></div>`).join('')}</div>`:'<div class="report-empty">Tidak ada pengeluaran pada pilihan ini.</div>'}</section><section class="generated-report-section"><h3>Pembagian hasil</h3><p>Porsi owner dan pengelola.</p><div class="share-visual"><div><span>Owner</span><strong>70%</strong><small>${formatMoney(ownerShare)}</small><i style="width:70%"></i></div><div><span>Pengelola Villa Istana Damar</span><strong>30%</strong><small>${formatMoney(managerShare)}</small><i style="width:30%"></i></div></div></section></div><section class="generated-report-section generated-bookings"><div class="generated-bookings-head"><div><h3>Booking dalam laporan</h3><p>${rows.length} booking cocok dengan pilihan laporan.</p></div></div><div class="owner-report-table"><table><thead><tr><th>Check-in</th><th>Tamu</th><th>Villa</th><th>Sumber</th><th>Pendapatan</th><th>Biaya</th><th>Bersih</th></tr></thead><tbody>${rows.length?rows.map(booking=>`<tr><td>${fmtDate(bookingDate(booking))}</td><td><strong>${booking.guest}</strong><span class="subtext">${booking.id}</span></td><td>${getVilla(booking.villa).name}</td><td>${booking.channel}</td><td>${formatMoney(booking.gross)}</td><td>${formatMoney(expenseTotal(booking))}</td><td><strong>${formatMoney(bookingNet(booking))}</strong></td></tr>`).join(''):'<tr><td class="report-empty" colspan="7">Tidak ada booking yang cocok dengan rentang tanggal, villa, dan sumber ini.</td></tr>'}</tbody></table></div></section><footer class="generated-report-actions"><span>Data contoh · disimpan hanya untuk demo</span><div><button class="btn" type="button" data-report-result-close>Tutup</button><button class="btn btn-primary" type="button" data-export-report ${rows.length?'':'disabled'}>Unduh CSV</button></div></footer></section></div>`;
}

document.addEventListener('submit',event=>{
  if(event.target.id!=='report-generator-form')return;
  event.preventDefault();
  const form=event.target,data=new FormData(form);
  if(data.get('end')<data.get('start')){form.querySelector('.report-form-error').textContent='Tanggal akhir harus sama atau setelah tanggal awal.';return;}
  activeReportFilter={start:data.get('start'),end:data.get('end'),villa:data.get('villa'),source:data.get('source')};
  showGeneratedReport();
});

function exportOwnerReport(){
  const rows=filteredReportBookings();
  const escape=value=>`"${String(value).replaceAll('"','""')}"`;
  const csv=[['Tanggal','ID Booking','Tamu','Villa','Sumber','Pendapatan kotor','Pengeluaran','Pendapatan bersih','Bagian owner 70%','Bagian pengelola 30%'],...rows.map(booking=>{const net=bookingNet(booking);return [fmtDate(bookingDate(booking)),booking.id,booking.guest,getVilla(booking.villa).name,booking.channel,booking.gross,expenseTotal(booking),net,Math.round(net*.7),net-Math.round(net*.7)];})].map(row=>row.map(escape).join(',')).join('\n');
  const link=document.createElement('a');link.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));link.download='laporan-owner-villa-istana-damar.csv';link.click();URL.revokeObjectURL(link.href);
}

const initialHash=location.hash.slice(1);
if(ownerViews[initialHash])ownerView=initialHash;
renderOwnerView();
}
