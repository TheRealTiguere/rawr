// Service Worker pour RAWRAGENCY
// Améliore les performances et permet la mise en cache

const CACHE_NAME = 'rawragency-v1';
const urlsToCache = [
  '/',
  '/logo-rawr.png',
  '/manifest.json'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la version en cache si disponible
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
