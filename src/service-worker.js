
var cacheName = 'pwa-start';
var filesToCache = [
    '/',
    '/index.html',
    '/css/pwa-style.css',
    '/js/pwa-script.js'
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

/* Serve cached content when offline */
////////////////////////////////////////////
// network first strategy
////////////////////////////////////////////
self.addEventListener('fetch', function (e) {
    e.respondWith(
        fetch(e.request).catch(function () {
            return caches.match(e.request)
        })
    );
});