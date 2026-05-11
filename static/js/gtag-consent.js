window.dataLayer = window.dataLayer || [];

window.gtag = function gtag() {
  window.dataLayer.push(arguments);
};

window.gtag('consent', 'default', {
  analytics_storage: 'denied',
});

window.gtag('js', new Date());

window.gtag('config', 'G-23MF8B8LYG', {
  send_page_view: false,
});

try {
  const consent = localStorage.getItem('gtm_consent');

  if (consent === 'true') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }
} catch (error) {
  console.warn('Unable to read GA consent from localStorage:', error);
}