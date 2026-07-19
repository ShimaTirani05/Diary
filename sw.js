const CACHE_NAME = 'shima-grows-up-v1';
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

// Cache-first for app shell, network-first fallback for everything else (Google Forms/Sheets embeds, Chart.js, fonts stay live from network).
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return resp;
        }).catch(() => cached);
      })
    );
  }
  // Cross-origin (fonts, Chart.js CDN, Google embeds, Anthropic API) — just let the network handle it.
});

// Tap on a notification focuses/opens the app.
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
  Service worker ini membuat app bisa di-install dan bekerja offline (cache-first untuk file
  inti). Ia TIDAK bisa membangunkan notifikasi terjadwal saat aplikasi benar-benar tertutup —
  itu butuh push server (mis. Firebase Cloud Messaging) yang mengirim sinyal dari luar,
  di luar cakupan situs statis GitHub Pages. Notifikasi 07:00 / 20:30 di app ini akan bunyi
  selama app terbuka (foreground atau background tab/PWA yang belum di-suspend oleh OS).
*/
