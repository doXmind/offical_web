import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import SEO from '../components/seo/SEO.jsx'

const MAC_DOWNLOAD_URL = 'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg'
const RELEASES_URL = 'https://github.com/doXmind/releases/releases/latest'
const GITHUB_URL = 'https://github.com/doXmind'
const DOCS_URL = 'https://docs.doxmind.com'
const LATEST_VERSION = '1.11.0'

function Brand() {
  return <span className="brand"><img src="/doxmind-app-icon.png" alt="" width="32" height="32" /><span>doXmind</span></span>
}

function Reveal({ children, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag className={`reveal ${className}`.trim()}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} {...rest}>
      {children}
    </Tag>
  )
}

function ProductShot({ src, alt, priority = false }) {
  return <div className="frame"><img src={src} width="1400" height={priority ? 700 : 900} alt={alt}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} /></div>
}

const FEATURES = [
  {
    title: 'Write naturally.',
    description: 'From a sentence to a table. Everything stays Markdown.',
    image: 'insert', alt: 'The searchable Insert block menu in the doXmind 1.11.0 dark editor',
  },
  {
    title: 'Keep it yours.',
    description: 'Local files. Linked notes. Open them with any Markdown app.',
    image: 'writing', alt: 'A local Markdown folder and the floating text-formatting toolbar in doXmind 1.11.0',
  },
  {
    title: 'Bring your references.',
    description: 'PDFs and spreadsheets beside your notes. Originals stay untouched.',
    image: 'attachment', alt: 'A read-only PDF attachment in doXmind 1.11.0 with Open externally and Reveal in Finder actions',
  },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const canonicalPath = typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/download' ? '/download' : '/'
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site-shell">
      <SEO path={canonicalPath} />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="header-inner">
          <a href="/" aria-label="doXmind home"><Brand /></a>
          <nav className="header-actions" aria-label="Main navigation">
            <a className="header-ghost" href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a>
            <a className="header-ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn btn-sm" href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download<span className="desktop-label"> for macOS</span></a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-inner content-width">
            <img className="hero-icon" src="/doxmind-app-icon.png" alt="" width="64" height="64" />
            <h1 id="hero-title">doXmind</h1>
            <p className="hero-lede">A local Markdown workspace.</p>
            <a className="btn btn-lg" href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download for macOS</a>
          </div>
          <div className="hero-shot content-width">
            <ProductShot src="/doxmind-1.11.0-workspace-wide.png" priority
              alt="doXmind 1.11.0 in dark mode with a local workspace, linked notes, a table and tasks" />
          </div>
        </section>
        <section className="features content-width" id="product" aria-label="What doXmind does">
          {FEATURES.map((feature, index) => (
            <div className={`feature ${index === 1 ? 'feature-reverse' : ''}`} key={feature.image}>
              <Reveal className="feature-copy">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </Reveal>
              <Reveal className="feature-visual">
                <ProductShot src={`/doxmind-1.11.0-${feature.image}.png`} alt={feature.alt} />
              </Reveal>
            </div>
          ))}
        </section>
        <section className="download content-width" id="download" aria-labelledby="download-title">
          <Reveal className="download-inner">
            <img className="download-icon" src="/doxmind-app-icon.png" alt="" width="56" height="56" />
            <h2 id="download-title">Start writing.</h2>
            <a className="btn btn-lg" href={MAC_DOWNLOAD_URL} data-testid="mac-download"><DownloadSimple size={18} /> Download for macOS</a>
            <div className="download-meta"><span>Apple silicon · v{LATEST_VERSION}</span><a href={RELEASES_URL} target="_blank" rel="noreferrer">Release notes <ArrowUpRight size={13} /></a></div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer content-width">
        <a href="/" aria-label="doXmind home"><Brand /></a>
        <nav className="footer-links" aria-label="Footer">
          <a href="#product">Features</a>
          <a href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <span className="copyright">© 2026 doXmind</span>
      </footer>
    </div>
  )
}
