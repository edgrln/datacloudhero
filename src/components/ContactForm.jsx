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
      formData.append('recaptchaToken', 'test');

      const response = await fetch('https://script.google.com/macros/s/AKfycbx_UJYtrVQLNOb9I09PHyqSY802ncBFIBpCaPWVXIF4xTrYkD-W1Nczztp5B6hcSI8s/useweb', {
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
      <div style={{marginBottom: '15px'}}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your name" 
          required
          style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc'}}
        />
      </div>
      
      <div style={{marginBottom: '15px'}}>
        <input 
          type="email" 
          name="email" 
          placeholder="your@email.com" 
          required
          style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc'}}
        />
      </div>

      <div style={{marginBottom: '15px'}}>
        <textarea 
          name="message" 
          placeholder="Your message..." 
          required
          rows="5"
          style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit'}}
        />
      </div>

      {message && <p style={{color: 'red', marginBottom: '15px'}}>{message}</p>}

      <button 
        type="submit" 
        disabled={loading}
        style={{padding: '10px 20px', background: '#1bab53', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}