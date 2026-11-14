// Minimal service worker: it only exists so browsers treat the site as an installable app.
// It does not cache anything, so pages and prices are always the live ones.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {
  // No respondWith(): every request goes straight to the network.
});
