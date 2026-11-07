const adminRoleParam=new URLSearchParams(location.search).get('demoRole');
let savedAdminRole='';
try{savedAdminRole=sessionStorage.getItem('villaDamarDemoRole')||localStorage.getItem('villaDamarDemoRole')||'';}catch{}
if(adminRoleParam==='admin'){try{sessionStorage.setItem('villaDamarDemoRole','admin');localStorage.setItem('villaDamarDemoRole','admin');}catch{}}
if((adminRoleParam||savedAdminRole)!=='admin'){
  window.location.replace('login.html');
}else{
const adminState = {
  bookings: [
    { code: 'VID-26041', guest: 'Nadia Putri', phone: '0812 •••• 4721', villa: 'Villa Ningrum No 01', dates: [4, 6], guests: '2 dewasa', total: 2600000, status: 'Dikonfirmasi', channel: 'Website' },
    { code: 'VID-26042', guest: 'Arif Pratama', phone: '0857 •••• 9012', villa: 'Villa Wulan No 01', dates: [5, 7], guests: '4 dewasa', total: 5400000, status: 'Menunggu', channel: 'WhatsApp' },
    { code: 'VID-26043', guest: 'Maya Lestari', phone: '0813 •••• 1184', villa: 'Villa Ningrum No 02', dates: [7, 9], guests: '2 dewasa, 1 anak', total: 2800000, status: 'Dikonfirmasi', channel: 'Agoda' },
    { code: 'VID-26044', guest: 'Bima Saputra', phone: '0821 •••• 3340', villa: 'Villa Damar Suite', dates: [8, 10], guests: '3 dewasa', total: 3200000, status: 'Check-in', channel: 'Booking.com' },
    { code: 'VID-26045', guest: 'Sinta Rahma', phone: '0878 •••• 2231', villa: 'Villa Ningrum No 01', dates: [11, 13], guests: '2 dewasa', total: 2600000, status: 'Menunggu', channel: 'Traveloka' },
    { code: 'VID-26046', guest: 'Dimas Hadi', phone: '0819 •••• 7085', villa: 'Villa Wulan No 01', dates: [12, 15], guests: '5 dewasa', total: 8100000, status: 'Dikonfirmasi', channel: 'Website' },
    { code: 'VID-26047', guest: 'Rani Kusuma', phone: '0812 •••• 6690', villa: 'Villa Ningrum No 02', dates: [14, 16], guests: '2 dewasa', total: 2800000, status: 'Selesai', channel: 'Tiket.com' },
    { code: 'VID-26048', guest: 'Fajar Ramadhan', phone: '0852 •••• 4207', villa: 'Villa Damar Suite', dates: [17, 19], guests: '4 dewasa', total: 6400000, status: 'Dibatalkan', channel: 'WhatsApp' }
  ],
  villas: [
    { name: 'Villa Ningrum No 01', folder: 'ningrum-1', image: 'assets/ningrum-1/bg.png', capacity: '2 tamu', bedrooms: '1 kamar tidur', rate: 1300000, available: true },
    { name: 'Villa Wulan No 01', folder: 'wulan-1', image: 'assets/wulan-1/bg.png', capacity: '4 tamu', bedrooms: '2 kamar tidur', rate: 2700000, available: true },
    { name: 'Villa Ningrum No 02', folder: 'ningrum-2', image: 'assets/ningrum-2/bg.png', capacity: '2 tamu', bedrooms: '1 kamar tidur', rate: 1400000, available: false },
    { name: 'Villa Wulan No 02', folder: 'wulan-2', image: 'assets/wulan-2/bg.png', capacity: '4 tamu', bedrooms: '2 kamar tidur', rate: 2900000, available: true },
    { name: 'Villa Ningrum No 03', folder: 'ningrum-3', image: 'assets/ningrum-3/bg.png', capacity: '2 tamu', bedrooms: '1 kamar tidur', rate: 1500000, available: true },
    { name: 'Villa Wulan No 03', folder: 'wulan-3', image: 'assets/wulan-3/bg.png', capacity: '4 tamu', bedrooms: '2 kamar tidur', rate: 3100000, available: true }
  ],
  reviews: [
    { name: 'Nadia P.', villa: 'Villa Ningrum No 01', text: 'Villanya bersih dan suasananya nyaman untuk beristirahat bersama keluarga.', rating: 5, source: 'Website', date: '12 Okt 2026', visible: true },
    { name: 'Arif P.', villa: 'Villa Wulan No 01', text: 'Kolam renang dan fasilitasnya menyenangkan. Kami ingin kembali lagi.', rating: 5, source: 'Google', date: '08 Okt 2026', visible: true },
    { name: 'Maya L.', villa: 'Villa Ningrum No 02', text: 'Pelayanan ramah dan proses check-in terasa mudah.', rating: 4, source: 'Traveloka', date: '03 Okt 2026', visible: false }
  ]
};

const money = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
const dateFromToday = offset => { const date = new Date(); date.setDate(date.getDate() + offset); return date; };
const shortDate = date => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date);
const rangeDate = (from, to) => `${shortDate(dateFromToday(from))} – ${shortDate(dateFromToday(to))}`;
const statusClass = status => ({ 'Dikonfirmasi':'confirmed', 'Menunggu':'pending', 'Check-in':'arriving', 'Selesai':'completed', 'Dibatalkan':'cancelled', 'Tersedia':'available', 'Perawatan':'blocked', 'Tayang':'published', 'Disembunyikan':'blocked' }[status] || 'pending');
const statusBadge = status => `<span class="status status-${statusClass(status)}">${status}</span>`;
const expenseStorageKey = 'villa-istana-damar-demo-expenses';
const readExpenseData = () => { try { return JSON.parse(localStorage.getItem(expenseStorageKey) || '{}'); } catch { return {}; } };
let expenseData = readExpenseData();
const fixedExpenseRates = [
  { key:'laundry', label:'Laundry', amount:75000 },
  { key:'gasMelon', label:'Gas melon', amount:25000 },
  { key:'gasPortable', label:'Gas portable', amount:25000 },
  { key:'galon', label:'Galon', amount:20000 },
  { key:'pengelola', label:'Pengelola', amount:50000 },
  { key:'amenities', label:'Amenities', amount:55000 },
  { key:'breakfast', label:'Breakfast', amount:50000 }
];
const icon = name => ({
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  calendar:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  home:'<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/></svg>',
  users:'<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>'
})[name];

function shellNav(page) {
  const links = [['dashboard','admin.html','Ringkasan','grid'],['bookings','admin-bookings.html','Pemesanan','calendar'],['villas','admin-villas.html','Villa','home'],['guests','admin-guests.html','Tamu','users'],['reviews','admin-reviews.html','Ulasan','star']];
  return `<div class="mobile-scrim" data-close-menu></div><aside class="sidebar"><a class="brand" href="admin.html?demoRole=admin"><img src="logo.png" alt=""><span>Villa Istana Damar<small>ADMIN PANEL</small></span></a><div class="nav-label">Menu utama</div><nav class="side-nav">${links.map(([id,url,label,ico])=>`<a href="${url}?demoRole=admin" class="${page===id?'active':''}">${icon(ico)}<span>${label}</span>${id==='bookings'?'<span class="nav-count">8</span>':''}</a>`).join('')}</nav><div class="sidebar-bottom"><a class="side-nav" href="index.html"><span style="padding:10px 12px;color:#d9d7e6;font-size:12px">↗ Kembali ke website</span></a><a class="logout-link" href="login.html?loggedOut=1" data-logout>↪ Keluar</a><div class="admin-profile"><span class="avatar">AD</span><span><strong>Admin Damar</strong><small>Administrator</small></span></div></div></aside>`;
}

function topbar(title) {
  return `<header class="topbar"><div class="topbar-left"><button class="menu-toggle" type="button" aria-label="Buka menu" data-menu-toggle>☰</button><div><p class="crumb">Villa Istana Damar / Admin</p><h1>${title}</h1></div></div><div class="top-actions"><span class="today-pill">◷ &nbsp;${new Intl.DateTimeFormat('id-ID',{weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(new Date())}</span><span class="user-chip"><span class="avatar">AD</span><span>Admin</span></span></div></header>`;
}

function bookingRows(rows, actions=false) {
  return rows.map(b=>`<tr><td><strong>${b.code}</strong></td><td><strong>${b.guest}</strong><span class="subtext">${b.phone}</span></td><td>${b.villa}</td><td>${rangeDate(...b.dates)}</td><td>${b.guests}</td><td>${money(b.total)}</td><td>${actions?`<select class="action-select" data-booking-status="${b.code}" aria-label="Ubah status ${b.code}">${['Menunggu','Dikonfirmasi','Check-in','Selesai','Dibatalkan'].map(s=>`<option ${b.status===s?'selected':''}>${s}</option>`).join('')}</select>`:statusBadge(b.status)}</td><td>${b.channel}</td></tr>`).join('');
}

function tableBlock(rows, actions=false) {
  return `<div class="table-wrap"><table><thead><tr><th>ID booking</th><th>Tamu</th><th>Villa</th><th>Tanggal</th><th>Jumlah tamu</th><th>Total</th><th>Status</th><th>Channel</th></tr></thead><tbody>${bookingRows(rows,actions)||'<tr><td class="empty" colspan="8">Tidak ada pemesanan yang cocok.</td></tr>'}</tbody></table></div>`;
}

function renderDashboard() {
  const confirmed=adminState.bookings.filter(b=>['Dikonfirmasi','Check-in'].includes(b.status)).length;
  const revenue=adminState.bookings.filter(b=>!['Dibatalkan'].includes(b.status)).reduce((sum,b)=>sum+b.total,0);
  const bars=[42,58,49,76,63,87,71,92,67,80,58,96];
  return `<div class="welcome"><div><h2>Selamat datang, Admin 👋</h2><p>Berikut ringkasan operasional Villa Istana Damar.</p></div><div class="welcome-actions"><a class="btn" href="admin-villas.html?demoRole=admin">Lihat villa</a><a class="btn btn-primary" href="admin-bookings.html?demoRole=admin">+ Booking baru</a></div></div>
  <section class="stats-grid"><article class="stat-card"><div class="stat-top"><span>Total pemesanan</span><i class="stat-icon">▦</i></div><div class="stat-value">${adminState.bookings.length}</div><div class="stat-foot"><span class="positive">+12%</span> dari bulan lalu</div></article><article class="stat-card"><div class="stat-top"><span>Check-in mendatang</span><i class="stat-icon">⌂</i></div><div class="stat-value">${confirmed}</div><div class="stat-foot">Dalam 7 hari ke depan</div></article><article class="stat-card"><div class="stat-top"><span>Estimasi pendapatan</span><i class="stat-icon">↗</i></div><div class="stat-value" style="font-size:clamp(20px,2.2vw,27px)">${money(revenue)}</div><div class="stat-foot"><span class="positive">+8,4%</span> dari bulan lalu</div></article><article class="stat-card"><div class="stat-top"><span>Rata-rata okupansi</span><i class="stat-icon">◌</i></div><div class="stat-value">78%</div><div class="stat-foot">Dari 6 unit villa</div></article></section>
  <div class="dashboard-grid"><section class="panel"><div class="panel-head"><div><h3>Ringkasan pemesanan</h3><p>Tren pemesanan dalam 12 bulan terakhir</p></div><select class="period-select" aria-label="Periode grafik"><option>12 bulan</option><option>6 bulan</option></select></div><div class="chart">${bars.map((n,i)=>`<div class="chart-col"><span class="chart-bars" style="height:${n}%" title="${n} booking"></span><span class="chart-label">${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][i]}</span></div>`).join('')}</div><div class="legend"><span><i></i>Pemesanan</span><span><i></i>Tingkat okupansi</span></div></section><section class="panel"><div class="panel-head"><div><h3>Okupansi per villa</h3><p>Perkiraan bulan ini</p></div><a class="btn" href="admin-villas.html?demoRole=admin">Kelola</a></div><div class="occupancy">${adminState.villas.slice(0,4).map((v,i)=>`<div class="occupancy-row"><span>${v.name.replace('Villa ','')}</span><div class="progress"><i style="width:${[82,68,54,91][i]}%"></i></div><b>${[82,68,54,91][i]}%</b></div>`).join('')}<div class="quick-note"><strong>Catatan operasional</strong>2 tamu dijadwalkan check-in hari ini. Pastikan persiapan villa selesai sebelum waktu kedatangan.</div></div></section></div>
  <section class="panel table-panel"><div class="panel-head"><div><h3>Pemesanan terbaru</h3><p>Aktivitas booking terbaru dari semua channel</p></div><a class="btn" href="admin-bookings.html?demoRole=admin">Semua pemesanan →</a></div>${tableBlock(adminState.bookings.slice(0,5))}</section>`;
}

function renderBookings() {
  return `<div class="page-heading"><div><h2>Semua pemesanan</h2><p>Lihat, cari, dan perbarui status booking tamu.</p></div><button class="btn btn-primary" type="button" data-add-booking>+ Tambah booking</button></div><section class="panel bookings-panel"><div class="table-tools"><label class="search-box">${icon('search')}<input id="booking-search" type="search" placeholder="Cari nama, ID, atau villa..."></label><select class="control" id="booking-filter" aria-label="Filter status"><option value="">Semua status</option>${['Menunggu','Dikonfirmasi','Check-in','Selesai','Dibatalkan'].map(s=>`<option>${s}</option>`).join('')}</select><select class="control" id="channel-filter" aria-label="Filter channel"><option value="">Semua channel</option>${[...new Set(adminState.bookings.map(b=>b.channel))].map(s=>`<option>${s}</option>`).join('')}</select></div><div id="bookings-table">${tableBlock(adminState.bookings,true)}</div></section>`;
}

function renderVillas() {
  return `<div class="page-heading"><div><h2>Daftar villa</h2><p>Kelola status ketersediaan dan informasi unit.</p></div><button class="btn btn-primary" type="button" data-demo-notice>+ Tambah villa</button></div><div class="villa-grid">${adminState.villas.map((v,i)=>`<article class="villa-card"><div class="villa-photo"><img src="${v.image}" alt="Foto ${v.name}" loading="lazy">${statusBadge(v.available?'Tersedia':'Perawatan')}</div><div class="villa-info"><h3>${v.name}</h3><p>${v.capacity} · ${v.bedrooms}</p><div class="villa-meta"><span>Tarif mulai</span><strong>${money(v.rate)} / malam</strong></div><button class="btn villa-toggle ${v.available?'':'btn-accent'}" type="button" data-villa-toggle="${i}">${v.available?'Tandai perawatan':'Aktifkan kembali'}</button></div></article>`).join('')}</div>`;
}

function renderGuests() {
  const guestRows=adminState.bookings.map(b=>`<tr><td><span class="guest-avatar">${b.guest.split(' ').map(n=>n[0]).slice(0,2).join('')}</span><strong>${b.guest}</strong></td><td>${b.phone}</td><td>${b.code}</td><td>${b.villa}</td><td>${rangeDate(...b.dates)}</td><td>${b.guests}</td><td>${statusBadge(b.status)}</td><td><button class="btn btn-small" type="button" data-guest-detail="${b.code}">Detail biaya</button></td></tr>`).join('');
  return `<div class="page-heading"><div><h2>Data tamu</h2><p>Daftar tamu dari data pemesanan (contoh).</p></div><button class="btn" type="button" data-demo-notice>Unduh data</button></div><section class="panel bookings-panel"><div class="table-tools"><label class="search-box">${icon('search')}<input id="guest-search" type="search" placeholder="Cari nama, nomor, atau ID booking..."></label></div><div class="table-wrap"><table><thead><tr><th>Nama tamu</th><th>WhatsApp</th><th>Booking terakhir</th><th>Villa</th><th>Tanggal menginap</th><th>Jumlah tamu</th><th>Status</th><th>Pengeluaran</th></tr></thead><tbody id="guest-rows">${guestRows}</tbody></table></div></section>`;
}

function renderReviews() {
  return `<div class="page-heading"><div><h2>Ulasan tamu</h2><p>Contoh tampilan moderasi ulasan. Seluruh data di halaman ini adalah dummy.</p></div><select class="control" id="review-filter"><option value="">Semua ulasan</option><option value="visible">Tayang</option><option value="hidden">Disembunyikan</option></select></div><div class="review-grid" id="review-grid">${reviewCards()}</div>`;
}

function showExpenseDialog(bookingCode){
  const booking=adminState.bookings.find(b=>b.code===bookingCode);
  if(!booking)return;
  const saved=expenseData[bookingCode]||{fixed:{},manual:{},others:[]};
  const modal=document.createElement('div');
  modal.className='modal-backdrop expense-backdrop';
  modal.innerHTML=`<section class="modal-card expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title"><div class="expense-head"><div><p class="eyebrow">Detail tamu · ${booking.code}</p><h2 id="expense-title">${booking.guest}</h2><p>${booking.villa} · ${rangeDate(...booking.dates)} · ${booking.channel}</p></div><button class="modal-x" type="button" data-modal-close aria-label="Tutup">×</button></div><form id="guest-expense-form" data-booking="${booking.code}"><div class="expense-summary"><div><span>Pendapatan booking</span><strong data-gross>${money(booking.total)}</strong></div><div><span>Total pengeluaran</span><strong data-expense-total>Rp0</strong></div><div class="net"><span>Pendapatan bersih</span><strong data-net-total>${money(booking.total)}</strong></div></div><section class="expense-section"><div class="expense-section-head"><div><h3>Biaya tetap</h3><p>Centang jika digunakan. Harga mengikuti daftar biaya.</p></div></div><div class="fixed-expenses">${fixedExpenseRates.map(item=>`<label class="fixed-expense"><input type="checkbox" name="${item.key}" value="${item.amount}" ${saved.fixed?.[item.key]?'checked':''}><span>${item.label}</span><b>${money(item.amount)}</b></label>`).join('')}</div></section><section class="expense-section"><div class="expense-section-head"><div><h3>Pengeluaran manual</h3><p>Isi nominal sesuai penggunaan untuk tamu ini.</p></div></div><div class="manual-expenses">${[['water','Air PAM'],['electricity','Listrik'],['float','Pelampung'],['shower','Shower']].map(([key,label])=>`<label>${label}<div class="currency-input"><span>Rp</span><input type="number" name="${key}" min="0" step="1000" placeholder="0" value="${saved.manual?.[key]||''}"></div></label>`).join('')}</div></section><section class="expense-section"><div class="expense-section-head"><div><h3>Pengeluaran lainnya</h3><p>Tambahkan biaya lain jika ada.</p></div><button class="btn" type="button" data-add-expense>+ Tambah biaya</button></div><div class="other-expenses">${(saved.others||[]).map(row=>expenseRow(row.name,row.amount)).join('')}</div></section><div class="expense-actions"><span class="expense-saved-note">Perhitungan diperbarui otomatis.</span><div><button class="btn" type="button" data-modal-close>Tutup</button><button class="btn btn-primary" type="submit">Simpan pengeluaran</button></div></div></form></section>`;
  modal.addEventListener('click',event=>{if(event.target===modal)modal.remove();});
  document.body.append(modal);
  updateExpenseTotals();
}

function expenseRow(name='',amount=''){
  return `<div class="other-expense-row"><input type="text" name="other_name" placeholder="Nama biaya" value="${String(name).replaceAll('"','&quot;')}"><div class="currency-input"><span>Rp</span><input type="number" name="other_amount" min="0" step="1000" placeholder="0" value="${amount||''}"></div><button class="remove-expense" type="button" data-remove-expense aria-label="Hapus biaya">×</button></div>`;
}

function addOtherExpenseRow(){
  const list=document.querySelector('.other-expenses');
  if(list){list.insertAdjacentHTML('beforeend',expenseRow());list.lastElementChild.querySelector('[name="other_name"]').focus();}
}

function updateExpenseTotals(){
  const form=document.getElementById('guest-expense-form');
  if(!form)return;
  let total=0;
  fixedExpenseRates.forEach(item=>{if(form.elements.namedItem(item.key)?.checked)total+=item.amount;});
  ['water','electricity','float','shower'].forEach(key=>{total+=Number(form.elements.namedItem(key)?.value||0);});
  form.querySelectorAll('.other-expense-row [name="other_amount"]').forEach(input=>{total+=Number(input.value||0);});
  const booking=adminState.bookings.find(b=>b.code===form.dataset.booking);
  form.querySelector('[data-expense-total]').textContent=money(total);
  form.querySelector('[data-net-total]').textContent=money((booking?.total||0)-total);
}

function reviewCards() {
  return adminState.reviews.map((review,i)=>`<article class="review-card" data-review-card data-visible="${review.visible}"><div class="review-stars" aria-label="${review.rating} dari 5 bintang">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div><blockquote>“${review.text}”</blockquote><div class="review-meta"><span><strong>${review.name}</strong><small>${review.villa} · ${review.source} · ${review.date}</small></span>${statusBadge(review.visible?'Tayang':'Disembunyikan')}</div><button class="btn villa-toggle" type="button" data-review-toggle="${i}">${review.visible?'Sembunyikan':'Tampilkan'} ulasan</button></article>`).join('');
}

const page=document.body.dataset.page;
const titles={dashboard:'Dashboard',bookings:'Pemesanan',villas:'Kelola villa',guests:'Data tamu',reviews:'Ulasan'};
const views={dashboard:renderDashboard,bookings:renderBookings,villas:renderVillas,guests:renderGuests,reviews:renderReviews};
const demoBanner='<div class="demo-banner"><i class="demo-dot"></i><span><b>Mode demo:</b> seluruh data bersifat simulasi; data pengeluaran tersimpan lokal di browser ini, fitur lainnya bersifat sementara.</span></div>';
document.querySelector('.admin-app').innerHTML=shellNav(page)+`<main class="main">${topbar(titles[page]||'Admin')}<div class="page-content">${demoBanner}${(views[page]||renderDashboard)()}</div></main>`;

document.addEventListener('click',event=>{
  if(event.target.closest('[data-menu-toggle]'))document.body.classList.toggle('menu-open');
  if(event.target.closest('[data-close-menu]')||event.target.closest('.side-nav a'))document.body.classList.remove('menu-open');
  const villaButton=event.target.closest('[data-villa-toggle]');
  if(villaButton){const villa=adminState.villas[Number(villaButton.dataset.villaToggle)];villa.available=!villa.available;document.querySelector('.page-content').innerHTML=`${demoBanner}${renderVillas()}`;}
  const reviewButton=event.target.closest('[data-review-toggle]');
  if(reviewButton){adminState.reviews[Number(reviewButton.dataset.reviewToggle)].visible=!adminState.reviews[Number(reviewButton.dataset.reviewToggle)].visible;document.getElementById('review-grid').innerHTML=reviewCards();applyReviewFilter();}
  if(event.target.closest('[data-demo-notice]'))window.alert('Fitur ini hanya contoh antarmuka. Data belum terhubung ke sistem penyimpanan.');
  if(event.target.closest('[data-add-booking]'))showBookingDialog();
  if(event.target.closest('[data-logout]')){try{sessionStorage.removeItem('villaDamarDemoRole');localStorage.removeItem('villaDamarDemoRole');}catch{}}
  const guestDetail=event.target.closest('[data-guest-detail]');
  if(guestDetail)showExpenseDialog(guestDetail.dataset.guestDetail);
  if(event.target.closest('[data-modal-close]'))document.querySelector('.modal-backdrop')?.remove();
  if(event.target.closest('[data-add-expense]'))addOtherExpenseRow();
  const removeExpense=event.target.closest('[data-remove-expense]');
  if(removeExpense){removeExpense.closest('.other-expense-row').remove();updateExpenseTotals();}
});

document.addEventListener('input',event=>{
  if(event.target.closest('#guest-expense-form'))updateExpenseTotals();
});
document.addEventListener('change',event=>{
  if(event.target.closest('#guest-expense-form'))updateExpenseTotals();
});

function showBookingDialog(){
  const modal=document.createElement('div');
  modal.className='modal-backdrop';
  modal.innerHTML=`<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="new-booking-title"><h2 id="new-booking-title">Tambah booking</h2><p>Masukkan booking contoh. Data hanya tersimpan sementara di halaman ini.</p><form class="modal-form" id="new-booking-form"><label class="wide">Nama tamu<input name="guest" required placeholder="Nama lengkap"></label><label>Villa<select name="villa">${adminState.villas.map(v=>`<option>${v.name}</option>`).join('')}</select></label><label>Jumlah tamu<input name="guests" type="number" min="1" value="2" required></label><label>Channel<select name="channel"><option>Website</option><option>WhatsApp</option><option>Booking.com</option><option>Agoda</option><option>Traveloka</option><option>Tiket.com</option></select></label><label>Total harga (Rp)<input name="total" type="number" min="0" value="1300000" required></label><div class="modal-actions wide"><button class="btn" type="button" data-modal-close>Batal</button><button class="btn btn-primary" type="submit">Simpan booking</button></div></form></section>`;
  modal.addEventListener('click',event=>{if(event.target===modal)modal.remove();});
  document.body.append(modal);
  modal.querySelector('[name="guest"]').focus();
}

document.addEventListener('submit',event=>{
  if(event.target.id==='guest-expense-form'){
    event.preventDefault();
    const form=event.target;
    const fixed={};fixedExpenseRates.forEach(item=>fixed[item.key]=form.elements.namedItem(item.key).checked);
    const manual={};['water','electricity','float','shower'].forEach(key=>manual[key]=Number(form.elements.namedItem(key).value||0));
    const others=[...form.querySelectorAll('.other-expense-row')].map(row=>({name:row.querySelector('[name="other_name"]').value.trim(),amount:Number(row.querySelector('[name="other_amount"]').value||0)})).filter(row=>row.name||row.amount);
    expenseData[form.dataset.booking]={fixed,manual,others};
    localStorage.setItem(expenseStorageKey,JSON.stringify(expenseData));
    document.querySelector('.expense-backdrop')?.remove();
    document.querySelector('.page-content').innerHTML=`${demoBanner}${renderGuests()}`;
    return;
  }
  if(event.target.id!=='new-booking-form')return;
  event.preventDefault();
  const data=new FormData(event.target);
  const id=`VID-${String(Date.now()).slice(-5)}`;
  adminState.bookings.unshift({code:id,guest:data.get('guest'),phone:'Belum ditambahkan',villa:data.get('villa'),dates:[2,4],guests:`${data.get('guests')} tamu`,total:Number(data.get('total')),status:'Menunggu',channel:data.get('channel')});
  document.querySelector('.modal-backdrop').remove();
  document.querySelector('.page-content').innerHTML=`${demoBanner}${renderBookings()}`;
});

document.addEventListener('change',event=>{
  const bookingCode=event.target.dataset.bookingStatus;
  if(bookingCode){const booking=adminState.bookings.find(b=>b.code===bookingCode);booking.status=event.target.value;document.getElementById('bookings-table').innerHTML=tableBlock(filteredBookings(),true);}
  if(event.target.id==='booking-filter'||event.target.id==='channel-filter')document.getElementById('bookings-table').innerHTML=tableBlock(filteredBookings(),true);
  if(event.target.id==='review-filter')applyReviewFilter();
});

function filteredBookings(){
  const term=(document.getElementById('booking-search')?.value||'').toLowerCase();
  const status=document.getElementById('booking-filter')?.value||'';
  const channel=document.getElementById('channel-filter')?.value||'';
  return adminState.bookings.filter(b=>(!term||`${b.code} ${b.guest} ${b.villa}`.toLowerCase().includes(term))&&(!status||b.status===status)&&(!channel||b.channel===channel));
}
document.addEventListener('input',event=>{
  if(event.target.id==='booking-search')document.getElementById('bookings-table').innerHTML=tableBlock(filteredBookings(),true);
  if(event.target.id==='guest-search'){const value=event.target.value.toLowerCase();document.querySelectorAll('#guest-rows tr').forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(value));}
});
function applyReviewFilter(){
  const filter=document.getElementById('review-filter')?.value||'';
  document.querySelectorAll('[data-review-card]').forEach(card=>card.hidden=filter==='visible'&&card.dataset.visible!=='true'||filter==='hidden'&&card.dataset.visible!=='false');
}
}
