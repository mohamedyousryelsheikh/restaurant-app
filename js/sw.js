//self.importScripts('./dbhelper.js');
var CACHE_NAME = 'restaurant-cache-v1';
var urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'index.html',  
  'restaurant.html',
  'css/styles.css',
  'data/restaurants.json',  
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js',
  'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css'

];

self.addEventListener('install', function (event) {
    console.log("installing service worker");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
            console.log("service worker found");
          return response;
        }

        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {
    console.log("activating new service worker");
  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
