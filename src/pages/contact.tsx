import React, {useState} from 'react';
import Layout from '@theme/Layout';

const SCRIPT_URL = '/api/contact';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type ApiResponse = {
  ok?: boolean;
  error?: string;
};

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setStatus('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(formData).toString(),
      });

      let result: ApiResponse = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || result.ok !== true) {
        throw new Error(result.error || `Ошибка отправки: ${response.status}`);
      }

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setStatus('Спасибо! Ваше сообщение получено.');
    } catch (error) {
      console.error(error);
      setStatus('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Contact" description="Contact form">
      <main style={{maxWidth: 720, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>Contact</h1>

        <p>Заполните форму, чтобы отправить сообщение.</p>

        <form onSubmit={handleSubmit} style={{display: 'grid', gap: '1rem'}}>
          <label>
            Имя
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
              }}
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
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
              }}
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
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

        {status && <p style={{marginTop: '1rem'}}>{status}</p>}
      </main>
    </Layout>
  );
}