const CACHE_NAME = 'shima-grows-up-v2';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

// Perbaikan: dulu strategi cache-first membuat app yang sudah ter-install tidak pernah
// mengambil versi index.html/sw.js terbaru dari server selama masih ada di cache. Sekarang
// pakai NETWORK-FIRST untuk file inti (index.html, manifest, sw sendiri) — selalu coba ambil
// versi terbaru dulu, cache cuma dipakai sebagai cadangan saat benar-benar offline.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) return; // fonts, Chart.js, Firebase SDK, Google embeds, Anthropic API — biarkan network yang urus

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((resp) => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});

// Izinkan halaman minta service worker baru langsung aktif (dipakai tombol Refresh manual).
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// Tap notifikasi -> fokus/buka app.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      const existing = clientsArr.find((c) => c.url.includes('index.html'));
      if (existing) return existing.focus();
      return self.clients.openWindow('./index.html');
    })
  );
});

/*
  CATATAN JUJUR:
  Network-first membuat app selalu mengambil kode terbaru saat ada koneksi internet (jadi
  update dari GitHub langsung kepakai begitu app dibuka ulang / di-refresh), dan tetap bisa
  jalan offline dari cache saat tidak ada koneksi. Ini TIDAK sama dengan push notification
  server — notifikasi terjadwal tetap hanya bunyi selama app terbuka (foreground/background
  yang belum di-suspend OS), karena itu butuh push server (di luar cakupan situs statis
  GitHub Pages).
*/
