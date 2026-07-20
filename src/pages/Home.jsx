import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple, GithubLogo, Check } from '@phosphor-icons/react'
import SEO from '../components/seo/SEO.jsx'

const MAC_DOWNLOAD_URL =
  'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg'
const RELEASES_URL = 'https://github.com/doXmind/releases/releases/latest'
const GITHUB_URL = 'https://github.com/doXmind'
const DOCS_URL = 'https://docs.doxmind.com'
const LATEST_VERSION = '1.7.8'

function Brand() {
  return (
    <span className="brand">
      <img src="/doxmind-app-icon.png" alt="" width="27" height="27" />
      <span>doXmind</span>
    </span>
  )
}

/* A section that rises and fades in the first time it enters the viewport. */
function Reveal({ children, className = '', delay = 0, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function ProductShot({ src, alt }) {
  const retina = src.replace(/\.png$/, '@2x.png')
  return (
    <div className="frame">
      <img src={src} srcSet={`${src} 1x, ${retina} 2x`} width="1400" height="900" alt={alt} loading="lazy" />
    </div>
  )
}

const LOCAL_POINTS = [
  { k: 'No account', v: 'Open and go', d: 'No sign-up, no login, no identity. Launch and start writing.' },
  { k: 'No cloud sync', v: 'Nothing uploads', d: 'Your files never leave the machine. There is no server to leave to.' },
  { k: 'No telemetry', v: 'Nothing watches', d: 'No analytics, no tracking, no phone-home. Fully offline.' },
  { k: 'Source of truth', v: 'Your filesystem', d: 'Portable .md, .xlsx and .pdf on disk — yours to keep and move.' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const canonicalPath =
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/+$/, '') === '/download'
      ? '/download'
      : '/'

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
        <a className="brand-link" href="/" aria-label="doXmind home"><Brand /></a>
        <div className="header-actions">
          <a className="header-ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GithubLogo size={16} weight="fill" /> GitHub
          </a>
          <a className="btn btn-sm btn-ink" href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download</a>
        </div>
      </header>

      <main id="main">
        {/* ─────────────  Hero  ───────────── */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-sky" aria-hidden="true" />
          <div className="hero-inner">
            <motion.img
              className="hero-icon"
              src="/doxmind-app-icon.png"
              alt="doXmind app icon"
              width="84"
              height="84"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            >
              doXmind
            </motion.h1>
            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            >
              Your documents, on your computer.
            </motion.p>
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              A fully local desktop IDE for Markdown, PDF, and Excel.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            >
              <a className="btn btn-lg btn-ink" href={MAC_DOWNLOAD_URL}>
                <DownloadSimple size={18} weight="bold" /> Download for macOS
              </a>
            </motion.div>
            <motion.p
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              Apple silicon · Free · No account required
            </motion.p>
          </div>

          <motion.div
            className="hero-shot"
            initial={{ opacity: 0, y: 56, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductShot src="/doxmind-editor.png" alt="A Markdown document open in the doXmind editor" />
          </motion.div>
        </section>

        {/* ─────────────  Positioning strip  ───────────── */}
        <section className="strip">
          <Reveal>
            <span className="eyebrow"><span className="dot" /> Local by design</span>
          </Reveal>
          <Reveal delay={0.05} as="h2">
            One editor for the documents you work in every day.
          </Reveal>
          <Reveal delay={0.1} as="p">
            Markdown, PDF and Excel — each a first-class citizen, each still a portable
            file in a folder you control.
          </Reveal>
        </section>

        {/* ─────────────  Capability sections  ───────────── */}
        <section className="features" id="product" aria-label="What doXmind does">
          <div className="feature">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">01 · Markdown</span></Reveal>
              <Reveal delay={0.05} as="h3">Markdown without lock-in.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  Write in a rich editor while a portable <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.md</code> file
                  stays in your own folder. Math, Mermaid, tables, callouts and code — all in a focused desktop workflow.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> KaTeX math, Mermaid diagrams, tables, callouts, task lists and highlighted code</li>
                  <li><Check size={16} weight="bold" /> Slash commands, drag handles, and a Notion-style bubble menu</li>
                  <li><Check size={16} weight="bold" /> Untouched blocks round-trip byte-for-byte; a hidden sidecar holds the rest</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot src="/doxmind-editor.png" alt="A Markdown project edited in doXmind" />
            </Reveal>
          </div>

          <div className="feature feature-reverse">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">02 · PDF</span></Reveal>
              <Reveal delay={0.05} as="h3">PDFs stay original.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  Read, annotate and organize long documents without replacing the source PDF. doXmind keeps its editing
                  state beside the file — not on a remote server.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> Block-based annotation and edit surface</li>
                  <li><Check size={16} weight="bold" /> The original PDF is never overwritten</li>
                  <li><Check size={16} weight="bold" /> Editor state lives in a same-name hidden sidecar</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot src="/doxmind-pdf.png" alt="A PDF open in the doXmind annotation workspace" />
            </Reveal>
          </div>

          <div className="feature">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">03 · Excel</span></Reveal>
              <Reveal delay={0.05} as="h3">Real workbooks, locally.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  Edit <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.xlsx</code> and{' '}
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.csv</code> with formulas, filters,
                  autofill, formatting and structural tools. Your workbook stays the source of truth on disk.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> A real formula engine, not a viewer</li>
                  <li><Check size={16} weight="bold" /> Row and column operations, filters and autofill</li>
                  <li><Check size={16} weight="bold" /> CSV opens in the same grid and exports back to .xlsx</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot src="/doxmind-excel.png" alt="An Excel workbook open in the doXmind spreadsheet editor" />
            </Reveal>
          </div>
        </section>

        {/* ─────────────  Local-first dark section  ───────────── */}
        <section className="local" id="local-first" aria-labelledby="local-title">
          <div className="local-glow" aria-hidden="true" />
          <div className="local-inner">
            <Reveal><span className="eyebrow"><span className="dot" /> Privacy is the architecture</span></Reveal>
            <Reveal delay={0.06} as="h2" id="local-title">
              Built local. Runs offline. Nothing leaves your disk.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="local-lede">
                doXmind has no account, no cloud sync, no telemetry, and no AI runtime. It is a desktop app and a localhost
                helper — the files in your own folders are the whole product.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="local-grid">
                {LOCAL_POINTS.map((p) => (
                  <div className="local-cell" key={p.k}>
                    <div className="k">{p.k}</div>
                    <div className="v">{p.v}</div>
                    <div className="d">{p.d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────  Download  ───────────── */}
        <section className="download" id="download">
          <Reveal className="download-inner">
            <div className="download-sky" aria-hidden="true" />
            <img className="download-icon" src="/doxmind-app-icon.png" alt="" width="56" height="56" />
            <h2>Keep your documents yours.</h2>
            <p>Download doXmind for macOS and start editing in seconds — no account, no cloud, no catch.</p>
            <div className="download-cta">
              <a className="btn btn-lg btn-ink" href={MAC_DOWNLOAD_URL}>
                <DownloadSimple size={18} weight="bold" /> Download for macOS
              </a>
            </div>
            <div className="download-meta">
              <span>Apple silicon · v{LATEST_VERSION}</span>
              <span className="sep">·</span>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer">Release notes <ArrowUpRight size={12} weight="bold" style={{ display: 'inline', verticalAlign: '-1px' }} /></a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ─────────────  Footer  ───────────── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" aria-label="doXmind home"><Brand /></a>
            <p>A fully local desktop IDE for Markdown, PDF and Excel. Your filesystem is the source of truth.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-col">
              <span className="h">Product</span>
              <a href="#product">Features</a>
              <a href="#local-first">Local by design</a>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer">Releases</a>
            </div>
            <div className="footer-col">
              <span className="h">Resources</span>
              <a href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
              <a href={MAC_DOWNLOAD_URL}>Download</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 doXmind</span>
          <span>Built local · Runs offline</span>
        </div>
      </footer>
    </div>
  )
}
