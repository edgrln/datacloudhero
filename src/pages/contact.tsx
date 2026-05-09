import React, {useState} from 'react';
import Layout from '@theme/Layout';

const CONTACT_API_URL = '/api/contact';

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState({
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
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setStatus('Thank you! Your message has been received.');
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Contact" description="Contact DataCloudHero">
      <main style={{maxWidth: 720, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>Contact</h1>

        <p>Have a question or want to get in touch? Send us a message.</p>

        <form onSubmit={handleSubmit} style={{display: 'grid', gap: '1rem'}}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
              }}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
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
            {loading ? 'Sending...' : 'Send message'}
          </button>
        </form>

        {status && <p style={{marginTop: '1rem'}}>{status}</p>}
      </main>
    </Layout>
  );
}