// firebase-messaging-sw.js
// Service Worker لإشعارات By Lubna

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDBo7Y74T5ELQ1UCSNm9TyE7PajuwtJTpA",
  authDomain: "bylubna-f31a4.firebaseapp.com",
  databaseURL: "https://bylubna-f31a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bylubna-f31a4",
  storageBucket: "bylubna-f31a4.firebasestorage.app",
  messagingSenderId: "331210998611",
  appId: "1:331210998611:web:e1c639a66036242fa917a6"
});

const messaging = firebase.messaging();

// إشعارات الخلفية (التطبيق مغلق أو في الخلفية)
messaging.onBackgroundMessage(payload => {
  console.log('[SW] إشعار خلفي:', payload);
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'By Lubna', {
    body: body || '',
    icon: icon || '/bylubna/icons/icon-192.png',
    badge: '/bylubna/icons/icon-192.png',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200],
    tag: payload.data?.tag || 'bylubna',
    data: payload.data || {}
  });
});

// عند الضغط على الإشعار — يفتح التطبيق
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/bylubna/by-lubna-system_V6_0.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      const match = cs.find(c => c.url.includes('bylubna'));
      if (match) return match.focus();
      return clients.openWindow(url);
    })
  );
});
