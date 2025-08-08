// Service Worker for Al Faris Business Website
// Professional caching strategy for static assets

const CACHE_NAME = 'alfaris-website-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/our-services-page.html',
  '/legal-services-page.html',
  '/government-transactions-page.html',
  '/packages-page.html',
  '/faq-page.html',
  '/vision-page.html',
  '/licenses-page.html',
  '/zakat-tax-page.html',
  '/privacy-policy-page.html',
  '/terms-of-service-page.html',
  '/css/common.css',
  '/js/common.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});