import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';


import blogPostList from '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

import useGlobalData from '@docusaurus/useGlobalData';

const typedBlogPostList = blogPostList as BlogPostList;

// Описываем минимальный тип под этот JSON
type BlogPostList = {
  items: {
    title: string;
    permalink: string;
    date?: string;
    description?: string;
  }[];
};



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

  const latestPosts = typedBlogPostList.items.slice(0, 3); // последние 3 поста

  const globalData = useGlobalData();




  // const latest = posts.slice(0, 3);

  console.log(globalData)

  console.log(latestPosts)


  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


