const CACHE_NAME = 'elite-islamic-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
    clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});