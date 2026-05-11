import React, {useEffect} from 'react';
import CookieConsent, {Cookies} from 'react-cookie-consent';

const GA_MEASUREMENT_ID = 'G-23MF8B8LYG';

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
    const consentValue = Cookies.get('gtm_consent');

    if (consentValue === 'true') {
      grantAnalyticsConsent();
      sendCurrentPageViewOnce();
    }

    if (consentValue === 'false') {
      denyAnalyticsConsent();
    }
  }, []);

  const handleAccept = () => {
    grantAnalyticsConsent();
    sendCurrentPageViewOnce();
  };

  const handleDecline = () => {
    denyAnalyticsConsent();
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        cookieName="gtm_consent"
        buttonText="Accept all"
        declineButtonText="Reject all"
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        expires={180}
        sameSite="lax"
        overlay={false}
        containerClasses="dch-cookie-consent"
        contentClasses="dch-cookie-content"
        buttonClasses="dch-cookie-btn dch-cookie-btn-primary"
        declineButtonClasses="dch-cookie-btn dch-cookie-btn-secondary"
        style={{}}
        buttonStyle={{}}
        declineButtonStyle={{}}
      >
        <div className="dch-cookie-title">We use cookies</div>
        <div className="dch-cookie-description">
          We use cookies to measure website usage and improve our marketing.
          You can accept all cookies or reject optional cookies.
        </div>
      </CookieConsent>

      {children}
    </>
  );
}