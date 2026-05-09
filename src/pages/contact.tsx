import React from 'react';
import type {ReactElement} from 'react';
import Layout from '@theme/Layout';
import ContactForm from '@site/src/components/ContactForm';

export default function ContactPage(): ReactElement {
  return (
    <Layout title="Contact" description="Contact DataCloudHero">
      <main style={{maxWidth: 720, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>Contact</h1>

        <p>Have a question or want to get in touch? Send us a message.</p>

        <ContactForm />
      </main>
    </Layout>
  );
}
