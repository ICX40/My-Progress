self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (event) => {
    // ملف أساسي بيخلي المتصفح يقبل تنزيل التطبيق
});