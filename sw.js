// Service Worker untuk SPMB PWA
// CATATAN: naikkan versi (vN) setiap kali ingin memaksa pembersihan cache lama
// di browser pengguna setelah deploy. 'activate' akan menghapus cache versi lama.
const CACHE_NAME = 'spmb-v3';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: hapus semua cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first untuk aset same-origin; cache hanya sebagai fallback offline.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Biarkan SEMUA permintaan lintas-domain langsung ke jaringan tanpa di-cache:
  // gambar (wsrv.nl / r2.dev), font, dll. Ini mencegah gambar/aset basi tersaji
  // dari cache lama — penyebab "hanya 1 gambar carousel yang tampil".
  if (url.origin !== self.location.origin) return;

  // API calls: network only (jangan cache data dinamis)
  if (url.pathname.startsWith('/api')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
  );
});
