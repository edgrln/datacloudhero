import React, {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
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

function sendPageView() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    send_to: GA_MEASUREMENT_ID,
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
}

export default function Root({children}) {
  const location = useLocation();
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    setAnalyticsAllowed(hasAnalyticsConsent());
  }, []);

  useEffect(() => {
    if (!analyticsAllowed) {
      return;
    }

    grantAnalyticsConsent();
    sendPageView();
  }, [analyticsAllowed, location.pathname, location.search]);

  const handleAccept = () => {
    try {
      localStorage.setItem('gtm_consent', 'true');
    } catch {
      // ignore
    }

    grantAnalyticsConsent();
    setAnalyticsAllowed(true);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('gtm_consent', 'false');
    } catch {
      // ignore
    }

    denyAnalyticsConsent();
    setAnalyticsAllowed(false);
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