import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://doxmind.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const seoConfig = {
  '/': {
    title: 'doXmind - AI-Native Desktop Editor for Data Analysis',
    description: 'Transform your data workflow with doXmind\'s AI-powered desktop editor. Features multi-agent system, interactive visualizations, and automated data analysis.',
    keywords: 'AI editor, desktop editor, data analysis, data visualization, multi-agent AI, document editor, productivity tool',
  },
  '/features': {
    title: 'Features - doXmind AI Editor',
    description: 'Explore doXmind\'s powerful features: multi-agent AI system, real-time collaboration, interactive charts, automated data analysis, and seamless document editing.',
    keywords: 'AI features, multi-agent system, data visualization, real-time collaboration, document editing, automated analysis',
  },
  '/solutions': {
    title: 'Solutions - doXmind for Every Industry',
    description: 'Discover how doXmind transforms workflows across industries. From research to business analytics, our AI-powered editor adapts to your needs.',
    keywords: 'AI solutions, business analytics, research tools, data workflow, industry solutions, enterprise AI',
  },
  '/pricing': {
    title: 'Pricing - doXmind Plans & Pricing',
    description: 'Choose the perfect doXmind plan for your needs. From free personal use to enterprise solutions, find pricing that scales with your workflow.',
    keywords: 'pricing, plans, subscription, free tier, enterprise, AI editor pricing',
  },
  '/guide': {
    title: 'User Guide - Getting Started with doXmind',
    description: 'Learn how to use doXmind effectively. Step-by-step tutorials, tips, and best practices for maximizing your AI-powered editing experience.',
    keywords: 'user guide, tutorial, documentation, getting started, how to use, tips and tricks',
  },
  '/demo': {
    title: 'Demo - Try doXmind AI Editor',
    description: 'Experience doXmind in action. Interactive demo showcasing AI-powered document editing, data visualization, and multi-agent capabilities.',
    keywords: 'demo, try free, interactive demo, AI editor demo, product demo',
  },
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

// Page-specific breadcrumb schemas
const getBreadcrumbSchema = (path) => {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
  ];

  if (path !== '/') {
    const pageName = seoConfig[path]?.title.split(' - ')[0] || 'Page';
    breadcrumbItems.push({
      name: pageName,
      url: `${SITE_URL}${path}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export default function SEO({ path = '/' }) {
  const config = seoConfig[path] || seoConfig['/'];
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
  const breadcrumbSchema = getBreadcrumbSchema(path);

  // Combine all structured data
  const structuredData = path === '/'
    ? [organizationSchema, websiteSchema, softwareSchema, breadcrumbSchema]
    : [breadcrumbSchema];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{config.title}</title>
      <meta name="title" content={config.title} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
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
