import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://doxmind.com'
const DOWNLOAD_URL = `${SITE_URL}/download`
const IMAGE_URL = `${SITE_URL}/og-image.png`
const APP_ICON_URL = `${SITE_URL}/doxmind-app-icon.png`

const title = 'doXmind — Local Desktop IDE for Markdown, PDF & Excel'
const description =
  'A fully local desktop IDE for Markdown, PDF, and Excel. No account, cloud sync, telemetry, or AI runtime.'

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'doXmind',
    url: SITE_URL,
    logo: APP_ICON_URL,
    sameAs: ['https://github.com/doXmind'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'doXmind',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'macOS',
    description,
    downloadUrl: DOWNLOAD_URL,
    featureList: [
      'Rich Markdown editing with portable files',
      'PDF annotation and document tools',
      'Excel workbook editing',
      'Fully local filesystem storage',
      'Offline desktop operation',
    ],
  },
]

export default function SEO({ path = '/' }) {
  const canonicalUrl = path === '/download' ? DOWNLOAD_URL : SITE_URL

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="local document editor, desktop markdown editor, PDF editor, Excel editor, offline document IDE" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={IMAGE_URL} />
      <meta property="og:site_name" content="doXmind" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE_URL} />

      {structuredData.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  )
}
