// Enhanced Service Worker for Al Faris Business Website
// Professional caching strategy with improved performance

const CACHE_NAME = 'alfaris-website-v2.0';
const STATIC_CACHE = 'alfaris-static-v2.0';
const DYNAMIC_CACHE = 'alfaris-dynamic-v2.0';

// Critical resources to cache immediately
const criticalUrlsToCache = [
  '/',
  '/index.html',
  '/css/common.css',
  '/js/common.js'
];

// All pages to cache
const allUrlsToCache = [
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
  '/js/common.js',
  '/robots.txt',
  '/sitemap.xml'
];

// Install event - cache critical resources first
self.addEventListener('install', function(event) {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources first
      caches.open(STATIC_CACHE).then(function(cache) {
        console.log('💾 Caching critical resources');
        return cache.addAll(criticalUrlsToCache);
      }),
      // Then cache all resources
      caches.open(CACHE_NAME).then(function(cache) {
        console.log('💾 Caching all resources');
        return cache.addAll(allUrlsToCache).catch(function(error) {
          console.warn('⚠️ Some resources failed to cache:', error);
          // Still proceed if some resources fail
          return Promise.resolve();
        });
      })
    ]).then(function() {
      console.log('✅ Service Worker installation complete');
      // Skip waiting to activate immediately
      return self.skipWaiting();
    })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (CDN, analytics, etc.)
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      // If we have a cached response, return it
      if (cachedResponse) {
        console.log('📦 Serving from cache:', event.request.url);
        return cachedResponse;
      }
      
      // Otherwise, fetch from network and cache it
      return fetch(event.request).then(function(networkResponse) {
        // Don't cache if response is not ok
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        // Clone the response
        const responseToCache = networkResponse.clone();
        
        // Add to dynamic cache
        caches.open(DYNAMIC_CACHE).then(function(cache) {
          console.log('💾 Adding to dynamic cache:', event.request.url);
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      }).catch(function(error) {
        console.error('❌ Network request failed:', error);
        
        // Return a custom offline page if available
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        
        return new Response('تعذر تحميل هذا المورد. يرجى التحقق من الاتصال بالإنترنت.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain; charset=utf-8'
          })
        });
      });
    })
  );
});

// Activate event - cleanup old caches and take control
self.addEventListener('activate', function(event) {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Cleanup old caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ]).then(function() {
      console.log('✅ Service Worker activated and ready');
    })
  );
});

// Message handling for manual cache updates
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_NAME
    });
  }
});

// Background sync for form submissions (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', function(event) {
    if (event.tag === 'background-contact-form') {
      console.log('🔄 Background sync: Processing contact form');
      // Handle background form submission
    }
  });
}