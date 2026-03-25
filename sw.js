const CACHE_NAME = 'jianghui-pwa-v1';
const urlsToCache =[
  './',
  './index.html',
  './manifest.json'
];

// 安装 Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截网络请求，支持离线访问
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 如果缓存里有，就直接返回缓存；否则走网络请求
        return response || fetch(event.request);
      })
  );
});