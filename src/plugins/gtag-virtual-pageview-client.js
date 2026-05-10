import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('[GTM] Client module loaded');

  // Функция отправки page view
  function trackPageView() {
    console.log('[GTM] trackPageView called');
    console.log('[GTM] pathname:', window.location.pathname);
    console.log('[GTM] gtag available:', !!window.gtag);
    console.log('[GTM] analyticsGranted:', window.CookieConsent?.acceptedCategory('analytics'));

    if (!window.gtag) {
      console.log('[GTM] gtag not available yet');
      return;
    }

    if (!window.CookieConsent?.acceptedCategory('analytics')) {
      console.log('[GTM] Analytics not consented');
      return;
    }

    console.log('[GTM] Sending page_view');
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  // Слушайте изменение маршрута через history
  let lastPath = window.location.pathname;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function(...args) {
    originalPushState.apply(window.history, args);
    lastPath = window.location.pathname;
    console.log('[GTM] pushState detected, new path:', lastPath);
    setTimeout(trackPageView, 100);
  };

  window.history.replaceState = function(...args) {
    originalReplaceState.apply(window.history, args);
    lastPath = window.location.pathname;
    console.log('[GTM] replaceState detected, new path:', lastPath);
    setTimeout(trackPageView, 100);
  };

  // Слушайте popstate (кнопка "назад")
  window.addEventListener('popstate', () => {
    console.log('[GTM] popstate detected');
    setTimeout(trackPageView, 100);
  });

  // Отправите первый page view при загрузке
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
  } else {
    setTimeout(trackPageView, 1000);
  }
}

export default null;