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
        buttonWrapperClasses="dch-cookie-actions"
        buttonClasses="dch-cookie-btn dch-cookie-btn-primary"
        declineButtonClasses="dch-cookie-btn dch-cookie-btn-secondary"
        style={{
          position: 'fixed',
          right: '1rem',
          bottom: '1rem',
          left: 'auto',
          width: '420px',
          maxWidth: 'calc(100vw - 2rem)',
          display: 'block',
          padding: 0,
          margin: 0,
          background: '#ffffff',
          color: '#2c2f31',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 2, 0.3)',
          overflow: 'hidden',
          zIndex: 2147483647,
        }}
        contentStyle={{
          margin: 0,
          padding: '1.25rem 1.5rem 1rem',
          display: 'block',
          flex: 'none',
        }}
        buttonWrapperStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
          margin: 0,
          padding: '1rem 1.5rem 1.25rem',
          borderTop: '1px solid #f0f4f7',
          background: '#ffffff',
        }}
        buttonStyle={{
          width: '100%',
          minHeight: '46px',
          margin: 0,
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: '1px solid #30363c',
          background: '#30363c',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: 1.2,
          cursor: 'pointer',
        }}
        declineButtonStyle={{
          width: '100%',
          minHeight: '46px',
          margin: 0,
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: '1px solid #30363c',
          background: '#30363c',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: 1.2,
          cursor: 'pointer',
        }}
      >
        <div className="dch-cookie-title">We use cookies</div>

        <div className="dch-cookie-description">
          We use cookies to measure website usage and improve our marketing.
          You can accept all cookies, reject optional cookies, or customize your
          choices.
        </div>

        <button
          type="button"
          className="dch-cookie-customize"
          onClick={() => {
            window.location.href = '/cookies';
          }}
        >
          Customize
        </button>
      </CookieConsent>

      {children}
    </>
  );
}