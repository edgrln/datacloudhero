import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const BLOG = {
  link: '/',
  label: 'Blog',
};

const GA_MEASUREMENT_ID = 'G-23MF8B8LYG';

const config: Config = {
  title: 'blog.datacloudhero.com - Data and AI engineering blog',
  // tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  // future: {
  //   v4: true, // Improve compatibility with the upcoming Docusaurus v4
  // },

  // Set the production url of your site here
  url: 'https://blog.datacloudhero.com',

  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];

        window.gtag = function gtag() {
          window.dataLayer.push(arguments);
        };

        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
        });

        window.gtag('js', new Date());

        window.gtag('config', '${GA_MEASUREMENT_ID}', {
          send_page_view: false,
        });

        try {
          const consent = localStorage.getItem('gtm_consent');

          if (consent === 'true') {
            window.gtag('consent', 'update', {
              analytics_storage: 'granted',
            });
          }
        } catch (error) {
          console.warn('Unable to read GA consent from localStorage:', error);
        }
      `,
    },
  ],

  scripts: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
      async: true,
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          onInlineTags: 'warn',
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          routeBasePath: BLOG.link,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'datacloudhero.com',
        src: 'img/logo.svg',
        href: 'https://datacloudhero.com',
        target: '_self',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          to: BLOG.link,
          label: BLOG.label,
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: BLOG.label,
              to: BLOG.link,
            },
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/edgrln/datacloudhero',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Cookie Policy',
              to: '/cookies',
            },
            {
            html: '<button type="button" class="footer__link-item cookie-settings-btn">Cookie settings</button>',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} datacloudhero.com`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;