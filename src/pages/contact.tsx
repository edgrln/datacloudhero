import React, {useState} from 'react';
import Layout from '@theme/Layout';

const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setFormData({name: '', email: '', message: ''});
      setStatus('Сообщение отправлено. Проверьте таблицу.');
    } catch (error) {
      console.error(error);
      setStatus('Ошибка отправки. Проверьте URL Apps Script и настройки доступа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Contact" description="Contact form for Google Sheets submission">
      <main style={{maxWidth: 720, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>Contact</h1>
        <p>Заполните форму, чтобы отправить данные в Google Таблицу через Apps Script.</p>

        <form onSubmit={handleSubmit} style={{display: 'grid', gap: '1rem'}}>
          <label>
            Имя
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}
            />
          </label>

          <label>
            Сообщение
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
              style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}
            />
          </label>

          <button type="submit" disabled={loading} style={{padding: '0.75rem 1.25rem', fontSize: '1rem'}}>
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

        {status && <p style={{marginTop: '1rem'}}>{status}</p>}

        <p style={{marginTop: '1.5rem', color: '#666'}}>
          Замените <code>SCRIPT_URL</code> на URL своего Apps Script и убедитесь, что скрипт развернут как веб-приложение.
        </p>
      </main>
    </Layout>
  );
}
