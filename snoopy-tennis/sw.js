const CACHE = 'snoopy-tennis-v7';
const ASSETS = ['./', 'index.html', 'manifest.json', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'assets/atlas.json', 'assets/bg.webp', 'assets/bird1.webp', 'assets/bird2.webp', 'assets/ch_ball.webp', 'assets/ch_idle.webp', 'assets/ch_pow.webp', 'assets/ch_toss.webp', 'assets/d0.png', 'assets/d1.png', 'assets/d2.png', 'assets/d3.png', 'assets/d4.png', 'assets/d5.png', 'assets/d6.png', 'assets/d7.png', 'assets/d8.png', 'assets/d9.png', 'assets/device.jpg', 'assets/h1.png', 'assets/lu_idle.webp', 'assets/lu_swing.webp', 'assets/lu_up.webp', 'assets/miss_txt.webp', 'assets/sn_bot_idle.webp', 'assets/sn_bot_swing.webp', 'assets/sn_bot_up.webp', 'assets/sn_mid_idle.webp', 'assets/sn_mid_swing.webp', 'assets/sn_mid_up.webp', 'assets/sn_top_idle.webp', 'assets/sn_top_swing.webp', 'assets/sn_top_up.webp'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html')))
  );
});
