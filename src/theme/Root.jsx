import React, {useEffect, useState} from 'react';
import CookieConsent, {Cookies} from 'react-cookie-consent';

const GA_MEASUREMENT_ID = 'G-23MF8B8LYG';

const COOKIE_DOMAIN =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'datacloudhero.com' ||
    window.location.hostname.endsWith('.datacloudhero.com'))
    ? '.datacloudhero.com'
    : undefined;

const COOKIE_NAME = 'gtm_consent';
const MARKETING_COOKIE_NAME = 'dch_marketing_consent';

function getCookieOptions() {
  return {
    expires: 180,
    sameSite: 'lax',
    secure:
      typeof window !== 'undefined' &&
      window.location.protocol === 'https:',
    domain: COOKIE_DOMAIN,
  };
}

function hasConsentChoice() {
  return (
    Cookies.get(COOKIE_NAME) !== undefined ||
    Cookies.get(MARKETING_COOKIE_NAME) !== undefined
  );
}

function getAnalyticsConsent() {
  return Cookies.get(COOKIE_NAME) === 'true';
}

function getMarketingConsent() {
  return Cookies.get(MARKETING_COOKIE_NAME) === 'true';
}

function updateGoogleConsent({analyticsGranted, marketingGranted}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',

    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',

    functionality_storage: 'granted',
    security_storage: 'granted',
    personalization_storage: 'denied',
  });

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: 'cookie_consent_update',
    analytics_consent: analyticsGranted ? 'granted' : 'denied',
    marketing_consent: marketingGranted ? 'granted' : 'denied',
  });
}

function saveConsent({analyticsGranted, marketingGranted}) {
  Cookies.set(
    COOKIE_NAME,
    analyticsGranted ? 'true' : 'false',
    getCookieOptions(),
  );

  Cookies.set(
    MARKETING_COOKIE_NAME,
    marketingGranted ? 'true' : 'false',
    getCookieOptions(),
  );

  updateGoogleConsent({
    analyticsGranted,
    marketingGranted,
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

function CookiePreferencesModal({
  isOpen,
  onClose,
  analyticsEnabled,
  marketingEnabled,
  setAnalyticsEnabled,
  setMarketingEnabled,
  onAcceptAll,
  onRejectAll,
  onSave,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="dch-cookie-modal-overlay">
      <div
        className="dch-cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dch-cookie-modal-title"
      >
        <div className="dch-cookie-modal-header">
          <h2 id="dch-cookie-modal-title">Cookie settings</h2>

          <button
            type="button"
            className="dch-cookie-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="dch-cookie-modal-body">
          <section className="dch-cookie-modal-intro">
            <h3>Cookie usage</h3>
            <p>
              We use cookies to keep the website working, measure traffic, and
              improve our advertising. You can change your choices at any time.
            </p>
          </section>

          <div className="dch-cookie-category">
            <div className="dch-cookie-category-left">
              <span className="dch-cookie-category-arrow">⌄</span>
              <strong>Strictly necessary cookies</strong>
            </div>

            <button
              type="button"
              className="dch-cookie-switch dch-cookie-switch-on dch-cookie-switch-readonly"
              disabled
              aria-label="Strictly necessary cookies enabled"
            >
              <span>✓</span>
            </button>
          </div>

          <div className="dch-cookie-category">
            <div className="dch-cookie-category-left">
              <span className="dch-cookie-category-arrow">⌄</span>
              <strong>Analytics cookies</strong>
            </div>

            <button
              type="button"
              className={
                analyticsEnabled
                  ? 'dch-cookie-switch dch-cookie-switch-on'
                  : 'dch-cookie-switch'
              }
              onClick={() => setAnalyticsEnabled((value) => !value)}
              aria-label="Toggle analytics cookies"
            >
              <span>{analyticsEnabled ? '✓' : '×'}</span>
            </button>
          </div>

          <div className="dch-cookie-category">
            <div className="dch-cookie-category-left">
              <span className="dch-cookie-category-arrow">⌄</span>
              <strong>Marketing cookies</strong>
            </div>

            <button
              type="button"
              className={
                marketingEnabled
                  ? 'dch-cookie-switch dch-cookie-switch-on'
                  : 'dch-cookie-switch'
              }
              onClick={() => setMarketingEnabled((value) => !value)}
              aria-label="Toggle marketing cookies"
            >
              <span>{marketingEnabled ? '✓' : '×'}</span>
            </button>
          </div>

          <section className="dch-cookie-more-info">
            <h3>More information</h3>
            <p>
              For more details, please read our Privacy Policy and Cookie Policy.
            </p>
          </section>
        </div>

        <div className="dch-cookie-modal-footer">
          <div className="dch-cookie-modal-footer-left">
            <button
              type="button"
              className="dch-cookie-modal-btn dch-cookie-modal-btn-primary"
              onClick={onAcceptAll}
            >
              Accept all
            </button>

            <button
              type="button"
              className="dch-cookie-modal-btn dch-cookie-modal-btn-primary"
              onClick={onRejectAll}
            >
              Reject all
            </button>
          </div>

          <button
            type="button"
            className="dch-cookie-modal-btn dch-cookie-modal-btn-secondary"
            onClick={onSave}
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Root({children}) {
  const [forceShowCookieBanner, setForceShowCookieBanner] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const openPreferences = () => {
    setAnalyticsEnabled(getAnalyticsConsent());
    setMarketingEnabled(getMarketingConsent());
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  const acceptAll = () => {
    saveConsent({
      analyticsGranted: true,
      marketingGranted: true,
    });

    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setForceShowCookieBanner(false);
    setIsPreferencesOpen(false);

    sendCurrentPageViewOnce();
  };

  const rejectAll = () => {
    saveConsent({
      analyticsGranted: false,
      marketingGranted: false,
    });

    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setForceShowCookieBanner(false);
    setIsPreferencesOpen(false);

    sendCurrentPageViewOnce();
  };

  const saveSettings = () => {
    saveConsent({
      analyticsGranted: analyticsEnabled,
      marketingGranted: marketingEnabled,
    });

    setForceShowCookieBanner(false);
    setIsPreferencesOpen(false);

    sendCurrentPageViewOnce();
  };

  useEffect(() => {
    const analyticsGranted = getAnalyticsConsent();
    const marketingGranted = getMarketingConsent();

    updateGoogleConsent({
      analyticsGranted,
      marketingGranted,
    });

    if (hasConsentChoice()) {
      sendCurrentPageViewOnce();
    }
  }, []);

  useEffect(() => {
    const openCookieSettings = (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const button = target.closest('.cookie-settings-btn');

      if (!button) {
        return;
      }

      event.preventDefault();
      openPreferences();
    };

    document.addEventListener('click', openCookieSettings);

    return () => {
      document.removeEventListener('click', openCookieSettings);
    };
  }, []);

  return (
    <>
      <CookieConsent
        location="bottom"
        visible={forceShowCookieBanner ? 'show' : 'byCookieValue'}
        cookieName={COOKIE_NAME}
        domain={COOKIE_DOMAIN}
        buttonText="Accept all"
        declineButtonText="Reject all"
        enableDeclineButton
        onAccept={acceptAll}
        onDecline={rejectAll}
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
          zIndex: 2147483646,
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
          onClick={openPreferences}
        >
          Customize
        </button>
      </CookieConsent>

      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={closePreferences}
        analyticsEnabled={analyticsEnabled}
        marketingEnabled={marketingEnabled}
        setAnalyticsEnabled={setAnalyticsEnabled}
        setMarketingEnabled={setMarketingEnabled}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onSave={saveSettings}
      />

      {children}
    </>
  );
}