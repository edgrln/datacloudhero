import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

import HomepageTopics from "../components/HomepageTopics";
import AuthorCard from "../components/AuthorCard";


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">

      <HomepageHeader />

      <main>

        {/* Секция с темами */}
        <HomepageTopics />

        {/* Карточка автора */}
        <div className="container" style={{marginTop: '2rem'}}>
          <AuthorCard
            name="Yangshun Tay"
            title="Ex-Meta Staff Engineer, Co-founder @metatext"
            description="15 лет в IT. Пишу про AI & Data Engineering, карьеру и рост инженеров."
            avatarUrl="https://avatars.githubusercontent.com/u/78014277?v=4"
            github="https://github.com/yangshun"
            linkedin="https://linkedin.com"
            twitter="https://twitter.com"
          />
        </div>

      </main>
    </Layout>
  );
}
