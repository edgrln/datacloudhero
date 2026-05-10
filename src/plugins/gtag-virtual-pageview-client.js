import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('[GTM] Client module loaded');

  // Проверка согласия через dataLayer
  function hasAnalyticsConsent() {
    if (!window.dataLayer) return false;
    
    // Ищем последнее событие cookie_consent_update
    const consentEvent = window.dataLayer.find(
      item => item.event === 'cookie_consent_update'
    );
    
    if (consentEvent) {
      console.log('[GTM] Found consent event:', consentEvent);
      return consentEvent.analytics_consent === 'granted';
    }
    
    return false;
  }

  function trackPageView() {
    console.log('[GTM] trackPageView called');
    console.log('[GTM] pathname:', window.location.pathname);
    console.log('[GTM] gtag available:', !!window.gtag);
    console.log('[GTM] hasAnalyticsConsent:', hasAnalyticsConsent());

    if (!window.gtag) {
      console.log('[GTM] gtag not available');
      return;
    }

    if (!hasAnalyticsConsent()) {
      console.log('[GTM] Analytics not consented');
      return;
    }

    console.log('[GTM] ✓ Sending page_view');
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  // Перехват pushState/replaceState
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function(...args) {
    originalPushState.apply(window.history, args);
    console.log('[GTM] pushState detected');
    setTimeout(trackPageView, 100);
  };

  window.history.replaceState = function(...args) {
    originalReplaceState.apply(window.history, args);
    console.log('[GTM] replaceState detected');
    setTimeout(trackPageView, 100);
  };

  window.addEventListener('popstate', () => {
    console.log('[GTM] popstate detected');
    setTimeout(trackPageView, 100);
  });

  // Первый page view
  setTimeout(trackPageView, 2000);
}

export default null;