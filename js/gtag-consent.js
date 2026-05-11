window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

gtag('consent', 'default', {
  analytics_storage: 'denied',
});

try {
  const consent = localStorage.getItem('gtm_consent');

  if (consent === 'true') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }
} catch (error) {
  console.warn('Unable to read GTM consent from localStorage:', error);
}