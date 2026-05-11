// src/theme/Root.jsx
import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import CookieConsent from 'react-cookie-consent';

export default function Root({children}) {
  const location = useLocation();

  // Отправляем виртуальный pageview в GTM при смене URL
  useEffect(() => {
    const consent = localStorage.getItem('gtm_consent') === 'true';
    
    if (consent && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]); // Срабатывает при каждой смене пути

  const handleAccept = () => {
    localStorage.setItem('gtm_consent', 'true');
    // Пушим событие в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_granted',
      });
    }
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Согласиться"
        declineButtonText="Отклонить"
        enableDeclineButton
        onAccept={handleAccept}
        style={{ background: '#667eea' }}
        buttonStyle={{ background: '#fff', color: '#667eea' }}
      >
        🍪 Мы используем cookies и аналитику
      </CookieConsent>
      {children}
    </>
  );
}