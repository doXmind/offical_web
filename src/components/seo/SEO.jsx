import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://doxmind.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const LOCALE_MAP = {
  en: 'en_US',
  zh: 'zh_CN',
  fr: 'fr_FR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  es: 'es_ES',
};

const SEO_KEY_MAP = {
  '/': 'home',
  '/about': 'about',
  '/guide': 'guide',
  '/changelog': 'changelog',
  '/cookies-privacy': 'cookiesPrivacy',
};

// JSON-LD Structured Data for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'doXmind',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: 'AI-Native Desktop Editor for Data Analysis and Document Creation',
  sameAs: [
    'https://twitter.com/doxmind',
    'https://github.com/doxmind',
  ],
};

// JSON-LD Structured Data for WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'doXmind',
  url: SITE_URL,
  description: 'AI-powered desktop editor with multi-agent system, interactive visualizations, and automated data analysis.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// JSON-LD Structured Data for SoftwareApplication
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'doXmind',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Windows, macOS, Linux, Web',
  description: 'AI-native desktop editor with multi-agent system for data analysis and document creation.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free during beta period',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
  featureList: [
    'AI Chat Assistant powered by Claude',
    'Quick Edit with one-click AI transformations',
    'AI Autocomplete while writing',
    'Knowledge Base with RAG semantic search',
    'Full Markdown editor support',
    'Version history with diff view',
    'Multi-language translation',
    'Export to PDF, DOCX, Markdown',
  ],
};

export default function SEO({ path = '/' }) {
  const { t, i18n } = useTranslation('common');

  const seoKey = SEO_KEY_MAP[path];
  const title = seoKey ? t(`seo.${seoKey}.title`) : t('seo.home.title');
  const description = seoKey ? t(`seo.${seoKey}.description`) : t('seo.home.description');
  const keywords = seoKey ? t(`seo.${seoKey}.keywords`) : t('seo.home.keywords');

  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
  const ogLocale = LOCALE_MAP[i18n.language] || 'en_US';

  // Page-specific breadcrumb schema
  const breadcrumbItems = [{ name: 'Home', url: SITE_URL }];
  if (path !== '/') {
    const pageName = title.split(' - ')[0] || 'Page';
    breadcrumbItems.push({ name: pageName, url: `${SITE_URL}${path}` });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  // Combine all structured data
  const structuredData = path === '/'
    ? [organizationSchema, websiteSchema, softwareSchema, breadcrumbSchema]
    : [breadcrumbSchema];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* JSON-LD Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
}
