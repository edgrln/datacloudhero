import React, { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData(e.target);

      const response = await fetch('https://script.google.com/macros/s/AKfycbznw_we3pyLH9nAGfzgE_nk8qlsJQ9Z8uk5huQOOvCDvRVoLkoje9rG2GROrgXEHkui/useweb', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setMessage(result.message);
      
      if (result.success) {
        e.target.reset();
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto'}}>
      <input type="text" name="name" placeholder="Your name" required style={{width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc'}} />
      <input type="email" name="email" placeholder="your@email.com" required style={{width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc'}} />
      <textarea name="message" placeholder="Your message..." required rows="5" style={{width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc'}} />
      {message && <p style={{marginBottom: '15px', color: '#d32f2f'}}>{message}</p>}
      <button type="submit" disabled={loading} style={{padding: '10px 20px', background: '#1bab53', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}