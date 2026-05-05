import React, { useEffect } from 'react';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = await grecaptcha.execute('6LfPItssAAAAAO1KKeyise8qIfg9A4oShIMcbxUv', {action: 'submit'});
    formData.append('recaptchaToken', token);
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbx_UJYtrVQLNOb9I09PHyqSY802ncBFIBpCaPWVXIF4xTrYkD-W1Nczztp5B6hcSI8s/useweb', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto'}}>
      <input type="text" name="name" placeholder="Your name" required style={{width: '100%', padding: '10px', marginBottom: '10px'}} />
      <input type="email" name="email" placeholder="your@email.com" required style={{width: '100%', padding: '10px', marginBottom: '10px'}} />
      <textarea name="message" placeholder="Your message..." required rows="5" style={{width: '100%', padding: '10px', marginBottom: '10px'}} />
      <button type="submit" style={{padding: '10px 20px', background: '#1bab53', color: 'white'}}>Send</button>
    </form>
  );
}