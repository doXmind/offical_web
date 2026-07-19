import { motion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import SEO from '../components/seo/SEO.jsx'

const MAC_DOWNLOAD_URL =
  'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg'
const RELEASES_URL = 'https://github.com/doXmind/releases/releases/latest'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const storyReveal = {
  initial: { opacity: 0, y: 56 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

function Brand({ footer = false }) {
  return (
    <span className={footer ? 'brand brand-footer' : 'brand'}>
      <img src="/doxmind-app-icon.png" alt="" />
      <span>doXmind</span>
    </span>
  )
}

function ProductShot({ src, alt, hero = false }) {
  return (
    <div className={hero ? 'product-shot hero-product-shot' : 'product-shot'}>
      <img src={src} alt={alt} loading={hero ? 'eager' : 'lazy'} />
    </div>
  )
}

function Home() {
  const canonicalPath = typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/+$/, '') === '/download'
    ? '/download'
    : '/'

  return (
    <div className="site-shell">
      <SEO path={canonicalPath} />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand-link" href="/" aria-label="doXmind home"><Brand /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#local-first">Local by design</a>
          <a href="https://docs.doxmind.com" target="_blank" rel="noreferrer">Docs</a>
        </nav>
        <a className="header-download" href={MAC_DOWNLOAD_URL}>Download</a>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-background" src="/mineral-hero-bg.webp" alt="" />
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.04 }}
          >
            <motion.img
              className="hero-app-icon"
              src="/doxmind-app-icon.png"
              alt="doXmind desktop app icon"
              variants={reveal}
              transition={{ duration: 0.5 }}
            />
            <motion.h1 id="hero-title" variants={reveal} transition={{ duration: 0.58, ease: 'easeOut' }}>
              doXmind
            </motion.h1>
            <motion.p className="hero-lede" variants={reveal} transition={{ duration: 0.58 }}>
              Your documents, on your computer.
            </motion.p>
            <motion.p className="hero-description" variants={reveal} transition={{ duration: 0.58 }}>
              A fully local desktop IDE for Markdown, PDF, and Excel.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal} transition={{ duration: 0.5 }}>
              <a className="button button-primary" href={MAC_DOWNLOAD_URL} data-testid="mac-download">
                <DownloadSimple size={17} weight="bold" /> Download for macOS
              </a>
            </motion.div>
            <motion.p className="hero-meta" variants={reveal} transition={{ duration: 0.5 }}>
              Apple silicon · No account required
            </motion.p>
          </motion.div>

          <motion.div
            className="hero-preview"
            initial={{ opacity: 0, y: 54, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductShot
              hero
              src="/doxmind-editor.png"
              alt="Markdown document open in the doXmind desktop editor"
            />
          </motion.div>
        </section>

        <section className="product-story" id="product" aria-label="Product capabilities">
          <motion.article className="story-row story-row-image-first" {...storyReveal}>
            <ProductShot
              src="/doxmind-editor.png"
              alt="A Markdown project edited in doXmind"
            />
            <div className="story-copy">
              <span className="story-index">01 · Markdown</span>
              <h3>Markdown<br />without lock-in.</h3>
              <p>
                Write with a rich editor while a portable .md file stays in your own folder.
                Math, Mermaid, tables, and structured blocks remain part of a focused desktop workflow.
              </p>
            </div>
          </motion.article>

          <motion.article className="story-row story-row-copy-first" {...storyReveal}>
            <div className="story-copy">
              <span className="story-index">02 · PDF</span>
              <h3>PDFs stay<br />original.</h3>
              <p>
                Read, annotate, and organize long documents without replacing the source PDF.
                doXmind keeps its editing state beside the file—not on a remote server.
              </p>
            </div>
            <ProductShot
              src="/doxmind-pdf.png"
              alt="A PDF document open in the doXmind annotation workspace"
            />
          </motion.article>

          <motion.article className="story-row story-row-image-first" {...storyReveal}>
            <ProductShot
              src="/doxmind-excel.png"
              alt="An Excel workbook open in the doXmind spreadsheet editor"
            />
            <div className="story-copy">
              <span className="story-index">03 · Excel</span>
              <h3>Real workbooks,<br />locally.</h3>
              <p>
                Edit .xlsx files with formulas, filters, autofill, formatting, and structural tools.
                Your workbook remains the source of truth on disk.
              </p>
            </div>
          </motion.article>
        </section>

        <section className="download-section" id="download">
          <div className="download-panel" id="local-first">
            <img className="download-app-icon" src="/doxmind-app-icon.png" alt="" />
            <h2>Built local. Stays local.</h2>
            <p>No account, cloud sync, or telemetry. Your filesystem stays the source of truth.</p>
            <a className="button button-light" href={MAC_DOWNLOAD_URL}>
              <DownloadSimple size={17} weight="bold" /> Download for macOS
            </a>
            <div className="download-details">
              <span>Apple silicon · Latest stable release</span>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer">
                Release notes <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="/" aria-label="doXmind home"><Brand footer /></a>
        <p>A fully local desktop IDE for Markdown, PDF, and Excel.</p>
        <div className="footer-links">
          <a href="https://docs.doxmind.com" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://github.com/doXmind/releases" target="_blank" rel="noreferrer">Releases</a>
          <a href="#local-first">Privacy</a>
        </div>
        <span className="copyright">© 2026 doXmind</span>
      </footer>
    </div>
  )
}

export default Home
