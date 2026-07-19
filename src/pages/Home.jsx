import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Download,
  File,
  FileSpreadsheet,
  FileText,
  Folder,
  HardDrive,
  ShieldCheck,
  WifiOff,
} from 'lucide-react'
import SEO from '../components/seo/SEO.jsx'

const MAC_DOWNLOAD_URL =
  'https://github.com/doXmind/releases/releases/latest/download/doXmind-mac-arm64.dmg'
const RELEASES_URL = 'https://github.com/doXmind/releases/releases/latest'

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

function Brand({ compact = false }) {
  return (
    <span className={compact ? 'brand brand-compact' : 'brand'}>
      <img src="/doxmind-app-icon.png" alt="" />
      <span>doXmind</span>
    </span>
  )
}

function DesktopPreview() {
  return (
    <div className="desktop-preview" aria-label="Preview of the doXmind desktop editor">
      <div className="window-chrome">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <div className="window-title">Project Plan.md — doXmind</div>
        <div className="window-local"><span /> Local</div>
      </div>

      <div className="window-body">
        <aside className="file-rail">
          <div className="rail-heading"><Folder size={14} /> Studio</div>
          <div className="file-row is-active"><FileText size={14} /> Project Plan.md</div>
          <div className="file-row"><File size={14} /> Research.pdf</div>
          <div className="file-row"><FileSpreadsheet size={14} /> Budget.xlsx</div>
          <div className="folder-row"><span>›</span> Archive</div>
          <div className="rail-path">~/Documents/Studio</div>
        </aside>

        <main className="document-canvas">
          <div className="document-toolbar">
            <span>H1</span><b>B</b><em>I</em><span>Link</span><span>Table</span><span>Diagram</span>
          </div>
          <article className="paper-sheet">
            <div className="document-kicker">PRODUCT BRIEF · JUL 2026</div>
            <h3>A calmer place for serious documents.</h3>
            <p>
              Keep the files you already own. Write Markdown, annotate PDFs, and work through
              spreadsheets without moving anything into somebody else’s cloud.
            </p>
            <div className="callout-line">
              <span>01</span>
              <div><strong>Files first</strong><small>Portable originals stay readable everywhere.</small></div>
            </div>
            <div className="callout-line">
              <span>02</span>
              <div><strong>Lossless editing</strong><small>Rich editor state lives beside your document.</small></div>
            </div>
            <div className="code-note">~/Documents/Studio/Project Plan.md</div>
          </article>
        </main>
      </div>
    </div>
  )
}

function FormatCard({ icon: Icon, title, copy, detail }) {
  return (
    <article className="format-card">
      <div className="format-icon"><Icon size={24} strokeWidth={1.5} /></div>
      <h3>{title}</h3>
      <p>{copy}</p>
      <div className="format-detail">{detail}</div>
    </article>
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
        <a className="brand-link" href="/" aria-label="doXmind home"><Brand compact /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#workspace">Product</a>
          <a href="#local-first">Local by design</a>
          <a href="https://docs.doxmind.com" target="_blank" rel="noreferrer">Docs</a>
        </nav>
        <a className="header-download" href="#download">Download</a>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-atmosphere" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.09 }}
          >
            <motion.img
              className="hero-app-icon"
              src="/doxmind-app-icon.png"
              alt="doXmind desktop app icon"
              variants={reveal}
              transition={{ duration: 0.5 }}
            />
            <motion.h1 variants={reveal} transition={{ duration: 0.55, ease: 'easeOut' }}>
              doXmind
            </motion.h1>
            <motion.p className="hero-lede" variants={reveal} transition={{ duration: 0.55 }}>
              Your documents, on your computer.
            </motion.p>
            <motion.p className="hero-description" variants={reveal} transition={{ duration: 0.55 }}>
              A fully local desktop IDE for Markdown, PDF, and Excel.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal} transition={{ duration: 0.5 }}>
              <a className="button button-primary" href={MAC_DOWNLOAD_URL} data-testid="mac-download">
                <Download size={17} /> Download for macOS
              </a>
            </motion.div>
            <motion.div className="hero-meta" variants={reveal} transition={{ duration: 0.5 }}>
              Apple silicon · No account required
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-preview"
            initial={{ opacity: 0, y: 44, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <DesktopPreview />
          </motion.div>
        </section>

        <div className="format-ribbon" aria-label="Supported document formats">
          <span>Markdown</span><i />
          <span>PDF</span><i />
          <span>Excel</span><i />
          <span>Local by design</span>
        </div>

        <section className="workspace-section" id="workspace">
          <div className="section-heading">
            <div className="section-label">One workspace</div>
            <h2>The documents you use.<br />In one focused desktop app.</h2>
            <p>Open real files from disk and work with tools designed for each format.</p>
          </div>
          <div className="format-grid">
            <FormatCard
              icon={FileText}
              title="Markdown"
              copy="Write in a rich editor while keeping a portable .md file on disk."
              detail="Math · Mermaid · Tables · Callouts"
            />
            <FormatCard
              icon={File}
              title="PDF"
              copy="Read, annotate, and organize PDFs in a surface built for long documents."
              detail="Annotations · Blocks · Export"
            />
            <FormatCard
              icon={FileSpreadsheet}
              title="Excel"
              copy="Edit real workbooks with formulas, filters, formatting, and structural tools."
              detail=".xlsx · Formulas · Autofill · Filters"
            />
          </div>
        </section>

        <section className="local-section" id="local-first">
          <div className="local-copy">
            <div className="section-label section-label-dark">Local by design</div>
            <h2>Your filesystem is<br />the source of truth.</h2>
            <p>
              doXmind is a desktop tool, not a web service inside a window. Your documents stay
              where you put them and remain available without an account or internet connection.
            </p>
          </div>
          <div className="principle-list">
            <div className="principle"><HardDrive /><div><strong>Your disk is canonical</strong><span>Original files remain in your folders.</span></div></div>
            <div className="principle"><WifiOff /><div><strong>Offline is normal</strong><span>Editing never depends on a network round trip.</span></div></div>
            <div className="principle"><ShieldCheck /><div><strong>Private by architecture</strong><span>No login, cloud sync, telemetry, or AI runtime.</span></div></div>
          </div>
        </section>

        <section className="download-section" id="download">
          <img className="download-app-icon" src="/doxmind-app-icon.png" alt="" />
          <div className="section-label">Download</div>
          <h2>Start with the files<br />already on your Mac.</h2>
          <p className="download-lede">Install doXmind and open a folder. There is no sign-up flow in between.</p>

          <div className="download-grid">
            <article className="download-card is-available">
              <div>
                <div className="availability"><i /> Available now</div>
                <h3>macOS</h3>
                <p>For Apple silicon Macs</p>
              </div>
              <a className="button button-primary button-wide" href={MAC_DOWNLOAD_URL}>
                <Download size={17} /> Download .dmg
              </a>
              <div className="download-foot">
                <span>Latest stable release</span>
                <a href={RELEASES_URL} target="_blank" rel="noreferrer">Release notes <ArrowUpRight size={13} /></a>
              </div>
            </article>

            <article className="download-card is-upcoming">
              <div>
                <div className="availability">Coming soon</div>
                <h3>Windows</h3>
                <p>Windows 10 and later · x64</p>
              </div>
              <button className="button button-disabled button-wide" disabled>Installer in progress</button>
              <div className="download-foot"><span>Signing and update delivery are being finalized.</span></div>
            </article>
          </div>
          <p className="download-note">Intel Mac and Linux builds are not currently offered.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div><Brand /><p>A fully local desktop IDE for the documents you already own.</p></div>
        <div className="footer-links">
          <a href="https://docs.doxmind.com" target="_blank" rel="noreferrer">Documentation</a>
          <a href="https://github.com/doXmind/releases" target="_blank" rel="noreferrer">Releases</a>
          <a href="#local-first">Privacy</a>
        </div>
        <div className="copyright">© 2026 doXmind</div>
      </footer>
    </div>
  )
}

export default Home
