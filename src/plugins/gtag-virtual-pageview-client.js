import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // Функция для отправки виртуального просмотра
  window.trackVirtualPageView = function trackVirtualPageView() {
    const hasConsent = 
      window.CookieConsent?.acceptedCategory('analytics') || 
      window.__gtmLoaded;

    if (!hasConsent || !window.gtag) {
      return;
    }

    // Небольшая задержка для корректного обновления DOM и title
    setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
  };

  // Слушайте изменение маршрута
  window.addEventListener('popstate', window.trackVirtualPageView);
}

export default function gtmVirtualPageView(props) {
  const location = useLocation();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM && window.trackVirtualPageView) {
      window.trackVirtualPageView();
    }
  }, [location.pathname]);

  return null;
}