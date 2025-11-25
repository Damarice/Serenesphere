// Service Worker for caching and offline support
const CACHE_NAME = 'serenesephere-v3'; // Updated version to force refresh
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/footer.css',
  '/css/category-section.css',
  '/css/image-optimization.css',
  '/js/main.js',
  '/js/performance.js',
  '/assets/logos/Serenesephere 2D logo PNG.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache install error:', err))
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip caching for WordPress, .html files (to allow redirects), and non-GET requests
  if (event.request.url.includes('/wp/') || 
      event.request.url.includes('/wp-admin/') || 
      event.request.url.includes('/wp-content/') ||
      event.request.url.endsWith('.html') ||
      event.request.method !== 'GET') {
    return; // Let browser handle it normally
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request with redirect mode set to follow
        const fetchRequest = new Request(event.request, {
          redirect: 'follow'
        });
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response (allow redirects)
          if (!response || (response.status !== 200 && response.status !== 301 && response.status !== 302)) {
            return response;
          }
          
          // Only cache successful responses (200)
          if (response.status === 200 && response.type === 'basic' && event.request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});
