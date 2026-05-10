import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('[GTM] Client module loaded');
  
  window.trackVirtualPageView = function trackVirtualPageView() {
    console.log('[GTM] trackVirtualPageView called');
    console.log('[GTM] Has consent:', window.CookieConsent?.acceptedCategory('analytics'));
    console.log('[GTM] Has gtag:', !!window.gtag);
    console.log('[GTM] GTM loaded:', window.__gtmLoaded);

    const hasConsent = 
      window.CookieConsent?.acceptedCategory('analytics') || 
      window.__gtmLoaded;

    if (!hasConsent) {
      console.log('[GTM] No consent or GTM not loaded, skipping');
      return;
    }

    if (!window.gtag) {
      console.log('[GTM] window.gtag not available');
      return;
    }

    setTimeout(() => {
      console.log('[GTM] Sending page_view event', {
        page_path: window.location.pathname,
        page_title: document.title,
      });

      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
  };

  window.addEventListener('popstate', window.trackVirtualPageView);
}

export default function gtmVirtualPageView(props) {
  const location = useLocation();

  useEffect(() => {
    console.log('[GTM] Route changed to:', location.pathname);
    
    if (ExecutionEnvironment.canUseDOM && window.trackVirtualPageView) {
      window.trackVirtualPageView();
    }
  }, [location.pathname]);

  return null;
}