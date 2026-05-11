import React, {useEffect} from 'react';
import CookieConsent from 'react-cookie-consent';

const GA_MEASUREMENT_ID = 'G-23MF8B8LYG';

function hasAnalyticsConsent() {
  try {
    return localStorage.getItem('gtm_consent') === 'true';
  } catch {
    return false;
  }
}

function grantAnalyticsConsent() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

function denyAnalyticsConsent() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
  });
}

function sendCurrentPageViewOnce() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const currentUrl =
    window.location.pathname + window.location.search + window.location.hash;

  window.__gaPageViewsSent = window.__gaPageViewsSent || {};

  if (window.__gaPageViewsSent[currentUrl]) {
    return;
  }

  window.__gaPageViewsSent[currentUrl] = true;

  window.gtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
}

export default function Root({children}) {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      grantAnalyticsConsent();

      // Отправляем page_view при прямом заходе на страницу,
      // например https://blog.datacloudhero.com/
      sendCurrentPageViewOnce();
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('gtm_consent', 'true');
    } catch {
      // ignore
    }

    grantAnalyticsConsent();

    // Отправляем текущую страницу сразу после первого согласия.
    sendCurrentPageViewOnce();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('gtm_consent', 'false');
    } catch {
      // ignore
    }

    denyAnalyticsConsent();
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Согласиться"
        declineButtonText="Отклонить"
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        style={{background: '#667eea'}}
        buttonStyle={{background: '#fff', color: '#667eea'}}
      >
        🍪 Мы используем cookies и аналитику
      </CookieConsent>

      {children}
    </>
  );
}