import React from 'react';

type Feature = {
  title: string;
  text: string;
};

export default function Features() {
  const features: Feature[] = [
    {
      title: '🚀 Быстро',
      text: 'Моментальная загрузка и оптимизация Docusaurus.',
    },
    {
      title: '⚛️ React',
      text: 'Используй любые UI-библиотеки и компоненты.',
    },
    {
      title: '📚 Документация',
      text: 'Идеально подходит для проектов с доками.',
    },
  ];

  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #ddd',
              maxWidth: '280px',
            }}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
