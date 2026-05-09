import React, {useState} from 'react';

const CONTACT_API_URL = '/api/contact';

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    margin: '3rem 0',
    padding: '1px',
    borderRadius: '28px',
    background:
      'linear-gradient(135deg, rgba(34,197,94,0.35), rgba(59,130,246,0.12), rgba(15,23,42,0.8))',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '28px',
    padding: '3rem 1.5rem',
    background:
      'linear-gradient(135deg, rgba(2,6,23,0.98), rgba(15,23,42,0.96))',
    color: '#fff',
    textAlign: 'center',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)',
    backgroundSize: '72px 72px',
    opacity: 0.55,
    pointerEvents: 'none',
  },
  glow: {
    position: 'absolute',
    left: '50%',
    top: '45%',
    width: '360px',
    height: '360px',
    transform: 'translate(-50%, -50%)',
    background: 'radial-gradient(circle, rgba(34,197,94,0.22), transparent 65%)',
    filter: 'blur(20px)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '720px',
    margin: '0 auto',
  },
  eyebrow: {
    marginBottom: '1rem',
    color: '#22c55e',
    fontFamily: 'monospace',
    fontSize: '1rem',
    letterSpacing: '0.04em',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(2rem, 5vw, 3.6rem)',
    lineHeight: 1.05,
    fontWeight: 800,
    color: '#fff',
  },
  description: {
    margin: '1.5rem auto 2rem',
    maxWidth: '640px',
    color: '#94a3b8',
    fontSize: '1.1rem',
    lineHeight: 1.7,
  },
  form: {
    display: 'grid',
    gap: '1rem',
    maxWidth: '560px',
    margin: '0 auto',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    border: '1px solid rgba(148,163,184,0.22)',
    borderRadius: '14px',
    padding: '0.9rem 1rem',
    background: 'rgba(15,23,42,0.78)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    minHeight: '140px',
    border: '1px solid rgba(148,163,184,0.22)',
    borderRadius: '14px',
    padding: '0.9rem 1rem',
    background: 'rgba(15,23,42,0.78)',
    color: '#fff',
    fontSize: '1rem',
    resize: 'vertical',
    outline: 'none',
  },
  button: {
    justifySelf: 'center',
    marginTop: '0.5rem',
    border: 0,
    borderRadius: '18px',
    padding: '1rem 2.5rem',
    background: '#16a34a',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 0 42px rgba(34,197,94,0.35)',
  },
  meta: {
    marginTop: '1.75rem',
    color: '#64748b',
    fontFamily: 'monospace',
    fontSize: '0.95rem',
  },
  status: {
    marginTop: '1rem',
    color: '#86efac',
    textAlign: 'center',
  },
};

export default function ArticleContactForm(): JSX.Element {
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
    <section style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.grid} />
        <div style={styles.glow} />

        <div style={styles.content}>
          <div style={styles.eyebrow}>Ready to start?</div>

          <h2 style={styles.title}>
            Let's build
            <br />
            something great
          </h2>

          <p style={styles.description}>
            Share your data platform challenge — pipelines, CI/CD, reliability,
            architecture, or cloud cost. You get a clear technical conversation,
            not a sales pitch.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <textarea
              name="message"
              placeholder="Tell us what you want to build or improve"
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending...' : 'Send message ✉'}
            </button>
          </form>

          {status && <p style={styles.status}>{status}</p>}

          <div style={styles.meta}>
            [email protected] · Selected advisory engagements · Remote across Europe
          </div>
        </div>
      </div>
    </section>
  );
}