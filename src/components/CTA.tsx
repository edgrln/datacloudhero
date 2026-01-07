import React from 'react';

export default function CTA() {
  return (
    <section style={{ padding: '60px 0', textAlign: 'center' }}>
      <h2>Готов попробовать?</h2>
      <p>Разверни свой проект уже сегодня</p>

      <button
        style={{
          marginTop: '20px',
          padding: '14px 26px',
          fontSize: '18px',
          borderRadius: '10px',
          border: 'none',
          background: '#16a34a',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Перейти к установке
      </button>
    </section>
  );
}
