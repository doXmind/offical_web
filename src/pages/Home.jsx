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
    label: '01 / Writing', title: 'Room for every thought.',
    description: 'Start with a sentence. Add a table, a task list or a link to another note. The searchable Block menu keeps the next step close, without getting in your way.',
    detail: 'Tables, lists, code, math and diagrams. All in Markdown.',
    image: 'insert', alt: 'The searchable Insert block menu in the doXmind 1.11.0 dark editor',
  },
  {
    label: '02 / Your folder', title: 'Your files. Your way.',
    description: 'Open a folder and make it your workspace. Shape your words with the floating text-selection toolbar, then take your Pages to any Markdown tool whenever you want.',
    detail: 'Ordinary files. Portable links. Nothing to export first.',
    image: 'writing', alt: 'A local Markdown folder and the floating text-formatting toolbar in doXmind 1.11.0',
  },
  {
    label: '03 / Reference files', title: 'Keep the context close.',
    description: 'Keep PDF, spreadsheet and HTML files beside your notes as read-only Attachments. Open them in their own apps or reveal them in Finder. Their original files stay untouched.',
    detail: 'Your notes and references, together in one place.',
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
            <h1 id="hero-title">Your ideas.<br />On your terms.</h1>
            <p className="hero-lede">A quiet workspace for Markdown, notes and the files that matter.</p>
            <a className="btn btn-lg" href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download for macOS</a>
            <p className="hero-meta">Apple silicon <span>·</span> Free <span>·</span> v{LATEST_VERSION}</p>
          </div>
          <div className="hero-shot content-width">
            <ProductShot src="/doxmind-1.11.0-workspace-wide.png" priority
              alt="doXmind 1.11.0 in dark mode with a local workspace, linked notes, a table and tasks" />
          </div>
        </section>
        <section className="intro content-width" aria-labelledby="intro-title">
          <Reveal>
            <span className="eyebrow">Local by design</span>
            <h2 id="intro-title">Everything stays yours.</h2>
            <p>Built local. Your notes, files and Markdown Pages live on your device, always. No accounts, no cloud, no distractions.</p>
          </Reveal>
        </section>
        <section className="features content-width" id="product" aria-label="What doXmind does">
          {FEATURES.map((feature, index) => (
            <div className={`feature ${index === 1 ? 'feature-reverse' : ''}`} key={feature.image}>
              <Reveal className="feature-copy">
                <span className="eyebrow">{feature.label}</span>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <p className="feature-detail">{feature.detail}</p>
              </Reveal>
              <Reveal className="feature-visual">
                <ProductShot src={`/doxmind-1.11.0-${feature.image}.png`} alt={feature.alt} />
              </Reveal>
            </div>
          ))}
        </section>
        <section className="local content-width" id="local-first" aria-labelledby="local-title">
          <Reveal className="local-intro">
            <span className="eyebrow">Made to be yours</span>
            <h2 id="local-title">A workspace.<br />Not another service.</h2>
            <p>A fully local, Markdown-native knowledge workspace. Ready when you are, even offline.</p>
          </Reveal>
          <div className="local-grid">
            <Reveal><h3>No account.</h3><p>Open a folder and start writing. No sign-up, no login.</p></Reveal>
            <Reveal><h3>No cloud.</h3><p>Your workspace stays on your computer. No cloud sync or telemetry.</p></Reveal>
            <Reveal><h3>No lock-in.</h3><p>Portable Markdown files you can read and edit with the tools you choose.</p></Reveal>
          </div>
        </section>
        <section className="download content-width" id="download" aria-labelledby="download-title">
          <Reveal className="download-inner">
            <img className="download-icon" src="/doxmind-app-icon.png" alt="" width="56" height="56" />
            <h2 id="download-title">Make room for your next idea.</h2>
            <p>Your documents, on your computer.</p>
            <a className="btn btn-lg" href={MAC_DOWNLOAD_URL} data-testid="mac-download"><DownloadSimple size={18} /> Download for macOS</a>
            <div className="download-meta"><span>Apple silicon · v{LATEST_VERSION}</span><a href={RELEASES_URL} target="_blank" rel="noreferrer">Release notes <ArrowUpRight size={13} /></a></div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer content-width">
        <div className="footer-top">
          <div className="footer-brand"><a href="/" aria-label="doXmind home"><Brand /></a><p>A quieter place for your ideas.</p></div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-col"><span className="eyebrow">Product</span><a href="#product">Features</a><a href="#local-first">Local by design</a><a href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download</a></div>
            <div className="footer-col"><span className="eyebrow">Resources</span><a href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a><a href={RELEASES_URL} target="_blank" rel="noreferrer">Releases</a></div>
          </nav>
        </div>
        <div className="footer-bottom"><span>© 2026 doXmind</span><span>Built local · Runs offline</span></div>
      </footer>
    </div>
  )
}
