/**
 * AuraTest Service Worker
 * Gestisce la cache per il funzionamento OFFLINE completo.
 * Strategia: Cache First per assets statici, Network First per domande.
 */

const CACHE_NAME = 'auratest-v4';

// File da mettere in cache al momento dell'installazione
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './questions.json',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  // Google Fonts (se connesso la prima volta)
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap'
];

// ===== INSTALL: metti tutto in cache =====
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Precaching assets...');
      // Caching parallelo, non blocca su errori di singole risorse
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Cache miss:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE: pulisci vecchie cache =====
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH: Strategia Cache First (con fallback Network) =====
self.addEventListener('fetch', event => {
  // Solo richieste GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Serve dalla cache, aggiorna in background
        const networkUpdate = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache =>
              cache.put(event.request, networkResponse.clone())
            );
          }
          return networkResponse;
        }).catch(() => {});

        return cachedResponse; // ritorna subito la cache
      }

      // Non in cache: prova la rete
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || !networkResponse.ok) return networkResponse;

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, responseClone)
        );
        return networkResponse;
      }).catch(() => {
        // Offline e non in cache: restituisce la pagina principale
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
