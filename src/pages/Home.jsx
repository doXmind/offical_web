import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple, GithubLogo, Check } from '@phosphor-icons/react'
import SEO from '../components/seo/SEO.jsx'

const MAC_DOWNLOAD_URL =
  'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg'
const RELEASES_URL = 'https://github.com/doXmind/releases/releases/latest'
const GITHUB_URL = 'https://github.com/doXmind'
const DOCS_URL = 'https://docs.doxmind.com'
const LATEST_VERSION = '1.8.3'

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
  return (
    <div className="frame">
      <img src={src} width="1400" height="900" alt={alt} loading="lazy" />
    </div>
  )
}

const LOCAL_POINTS = [
  { k: 'No account', v: 'Open and go', d: 'No sign-up, no login, no identity. Launch and start writing.' },
  { k: 'No cloud sync', v: 'Nothing uploads', d: 'Your files never leave the machine. There is no remote sync service.' },
  { k: 'No telemetry', v: 'Nothing watches', d: 'No analytics and no tracking. Your work stays private and available offline.' },
  { k: 'Source of truth', v: 'Your filesystem', d: 'Portable Markdown Pages and ordinary attachments on disk — yours to keep and move.' },
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
              A fully local, Markdown-native knowledge workspace.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            >
              <a className="btn btn-lg btn-ink" href={MAC_DOWNLOAD_URL} data-testid="mac-download">
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
            <ProductShot
              src="/doxmind-overview.png"
              alt="The doXmind workspace showing a Markdown Page with spreadsheet and PDF Attachments"
            />
          </motion.div>
        </section>

        {/* ─────────────  Positioning strip  ───────────── */}
        <section className="strip">
          <Reveal>
            <span className="eyebrow"><span className="dot" /> Local by design</span>
          </Reveal>
          <Reveal delay={0.05} as="h2">
            One editing surface: the Markdown Page.
          </Reveal>
          <Reveal delay={0.1} as="p">
            Write Pages in a rich editor. Keep PDF, spreadsheet and HTML files as
            read-only Attachments in the same folder you already control.
          </Reveal>
        </section>

        {/* ─────────────  Capability sections  ───────────── */}
        <section className="features" id="product" aria-label="What doXmind does">
          <div className="feature">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">01 · Page</span></Reveal>
              <Reveal delay={0.05} as="h3">Rich writing, portable source.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  Write through semantic Blocks while a portable <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.md</code> file
                  stays in your own folder. Every edit maps back to canonical Markdown, so the Page remains useful in
                  any Markdown tool, even without doXmind.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> Semantic inline editing for emphasis, links, wiki links, code and local images</li>
                  <li><Check size={16} weight="bold" /> Quiet hover controls, a searchable Block menu and a floating text-selection toolbar</li>
                  <li><Check size={16} weight="bold" /> Contiguous multi-Block actions with hierarchy-safe nested-list movement</li>
                  <li><Check size={16} weight="bold" /> KaTeX math, Mermaid diagrams, tables, callouts, task lists and highlighted code</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot src="/doxmind-editor.png" alt="A Markdown Page open in the doXmind rich editor" />
            </Reveal>
          </div>

          <div className="feature feature-reverse">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">02 · Your folder</span></Reveal>
              <Reveal delay={0.05} as="h3">A knowledge base you can leave with.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  Open a real folder and create Pages directly beside the files you already manage. Ordinary Markdown
                  links remain visible in the source instead of becoming relationships trapped in a cloud database.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> Real folders and filenames stay authoritative</li>
                  <li><Check size={16} weight="bold" /> Pages stay readable in Obsidian, VS Code, Git and other Markdown tools</li>
                  <li><Check size={16} weight="bold" /> Portable links are the foundation for the knowledge layer ahead</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot
                src="/doxmind-overview.png"
                alt="A local folder in doXmind with one Markdown Page and two read-only Attachments"
              />
            </Reveal>
          </div>

          <div className="feature">
            <div className="feature-copy">
              <Reveal><span className="eyebrow">03 · Attachments</span></Reveal>
              <Reveal delay={0.05} as="h3">Reference files without rewriting them.</Reveal>
              <Reveal delay={0.1}>
                <p>
                  PDF, spreadsheet and HTML files can live in the workspace as read-only Attachments. Open them in the
                  system app or reveal them in Finder without turning doXmind into a second office suite.
                </p>
                <ul className="feature-points">
                  <li><Check size={16} weight="bold" /> The original Attachment is never silently rewritten</li>
                  <li><Check size={16} weight="bold" /> Open Externally and Reveal keep file ownership clear</li>
                  <li><Check size={16} weight="bold" /> Legacy PDF and Excel evidence stays preserved; eligible cases can use an explicit, unverified recovery attempt</li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="feature-visual">
              <ProductShot
                src="/doxmind-editor.png"
                alt="A doXmind Page documenting how PDF and spreadsheet files remain read-only Attachments"
              />
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
                doXmind has no account, no cloud sync, no telemetry, and no AI runtime. The desktop app works directly
                with the files in your own folders, which remain the source of truth.
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
            <p>Download doXmind for macOS and start writing local Markdown Pages — no account, no cloud, no catch.</p>
            <div className="download-cta">
              <a className="btn btn-lg btn-ink" href={MAC_DOWNLOAD_URL} data-testid="mac-download">
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
            <p>A fully local, Markdown-native knowledge workspace. Your filesystem is the source of truth.</p>
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
              <a href={MAC_DOWNLOAD_URL} data-testid="mac-download">Download</a>
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
