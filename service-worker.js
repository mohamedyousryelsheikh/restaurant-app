var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.2";
var cacheName = "sw-demo";
var cache = cacheName + "-" + version;
var filesToCache = [
                    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/index.html',
    '/restaurant.html',
    '/restaurant.html?id=1',
    '/restaurant.html?id=2',
    '/restaurant.html?id=3',
    '/restaurant.html?id=4',
    '/restaurant.html?id=5',
    '/restaurant.html?id=6',
    '/restaurant.html?id=7',
    '/restaurant.html?id=8',
    '/restaurant.html?id=9',
    '/restaurant.html?id=10',
    '/css/styles.css',
    '/data/restaurants.json',
    './img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
                 ];

//Add event listener for install
self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing....');
    event.waitUntil(caches
                        .open(cache)//open this cache from caches and it will return a Promise
                        .then(function(cache) { //catch that promise
                            log('[ServiceWorker] Caching files');
                            cache.addAll(filesToCache);//add all required files to cache it also returns a Promise
                        })
                    ); 
});

//Add event listener for fetch
self.addEventListener("fetch", function(event) {
    //note that event.request.url gives URL of the request so you could also intercept the request and send a response based on your URL
    //e.g. you make want to send gif if anything in jpeg form is requested.
    event.respondWith(//it either takes a Response object as a parameter or a promise that resolves to a Response object
                        caches.match(event.request)//If there is a match in the cache of this request object
                            .then(function(response) {
                                if(response) {
                                    log("Fulfilling "+event.request.url+" from cache.");
                                    //returning response object
                                    return response;
                                } else {
                                    log(event.request.url+" not found in cache fetching from network.");
                                    //return promise that resolves to Response object
                                    return fetch(event.request);
                                }
                            })
                    );
});

self.addEventListener('activate', function(event) {
  log('[ServiceWorker] Activate');
  event.waitUntil(
                    caches.keys()//it will return all the keys in the cache as an array
                    .then(function(keyList) {
                            //run everything in parallel using Promise.all()
                            Promise.all(keyList.map(function(key) {
                                    if (key !== cacheName) {
                                        log('[ServiceWorker] Removing old cache ', key);
                                        //if key doesn`t matches with present key
                                        return caches.delete(key);
                                    }
                                })
                            );
                        })
                );
});



/*var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.2";
var cacheName = "sw-demo";
var cache = cacheName + "-" + version;
var filesToCache = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    './img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js',
    'https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

//Add event listener for install
self.addEventListener("install", function (event) {
    log('[ServiceWorker] Installing....');
    event.waitUntil(caches
        .open(cache)
        .then(function (cache) { 
            log('[ServiceWorker] Caching files');
            cache.addAll(filesToCache);
        })
    );
});

//Add event listener for fetch
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    log("Fulfilling " + event.request.url + " from cache.");
                    //returning response object
                    return response;
                } else {
                    log(event.request.url + " not found in cache fetching from network.");
                    //return promise that resolves to Response object
                    return fetch(event.request);
                }
            })
    );
});

self.addEventListener('activate', function (event) {
    log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys()//it will return all the keys in the cache as an array
            .then(function (keyList) {
                //run everything in parallel using Promise.all()
                Promise.all(keyList.map(function (key) {
                    if (key !== cacheName) {
                        log('[ServiceWorker] Removing old cache ', key);
                        //if key doesn`t matches with present key
                        return caches.delete(key);
                    }
                })
                );
            })
    );
});
*/