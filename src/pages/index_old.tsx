import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

type RssPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<RssPost[]>([]);

  useEffect(() => {
    async function loadRss() {
      const res = await fetch('/blog/rss.xml');
      const text = await res.text();

      const xml = new window.DOMParser().parseFromString(text, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item')).slice(0, 3);

      const parsed: RssPost[] = items.map((item) => {
        const rawDescription =
          item.querySelector('description')?.textContent ?? '';

        // чистим пробелы и переносы
        const description = rawDescription.trim();

        return {
          title: item.querySelector('title')?.textContent ?? '',
          link: item.querySelector('link')?.textContent ?? '',
          pubDate: item.querySelector('pubDate')?.textContent ?? '',
          description,
        };
      });

      setPosts(parsed);
    }

    loadRss();
  }, []);

  return (
    <Layout title="Main">
      <main style={{padding: '2rem 0'}}>
        <section style={{maxWidth: 800, margin: '0 auto'}}>
          <h1>Main</h1>

          <h2 style={{marginTop: '2rem'}}>Latests posts</h2>

          {posts.length === 0 && <p>Uploading posts…</p>}

          <ul style={{listStyle: 'none', padding: 0}}>
            {posts.map((post) => (
              <li key={post.link} style={{marginBottom: '1.5rem'}}>
                <h3 style={{margin: 0}}>
                  <Link to={post.link}>{post.title}</Link>
                </h3>

                {post.pubDate && (
                  <div style={{fontSize: '0.85rem', opacity: 0.7}}>
                    {new Date(post.pubDate).toLocaleDateString('ru-RU')}
                  </div>
                )}

                {post.description && post.description !== '' && (
                  <p style={{marginTop: '0.3rem'}}>
                    {post.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}