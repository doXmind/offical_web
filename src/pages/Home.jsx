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
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

function Wordmark() {
  return (
    <span className="wordmark" aria-label="doXmind">
      <span>do</span><strong>X</strong><span>mind</span>
    </span>
  )
}

function DesktopPreview() {
  return (
    <div className="desktop-preview" aria-label="Preview of the doXmind desktop editor">
      <div className="window-chrome">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <div className="window-title">Project Plan.md — doXmind</div>
        <div className="window-mode">LOCAL</div>
      </div>

      <div className="window-body">
        <aside className="file-rail">
          <div className="rail-heading"><Folder size={13} /> Documents</div>
          <div className="file-row is-active"><FileText size={13} /> Project Plan.md</div>
          <div className="file-row"><File size={13} /> Research.pdf</div>
          <div className="file-row"><FileSpreadsheet size={13} /> Budget.xlsx</div>
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
              Keep the files you already own. Open Markdown, annotate PDFs, and work through
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
            <div className="sheet-rule" />
            <div className="code-note">$ open ~/Documents/Studio/Project\ Plan.md</div>
          </article>
        </main>
      </div>
    </div>
  )
}

function FormatCard({ icon: Icon, index, title, copy, detail }) {
  return (
    <article className="format-card">
      <div className="format-number">0{index}</div>
      <Icon size={24} strokeWidth={1.5} />
      <h3>{title}</h3>
      <p>{copy}</p>
      <div className="format-detail">{detail}</div>
    </article>
  )
}

function Home() {
  const canonicalPath = typeof window !== 'undefined' && window.location.pathname === '/download'
    ? '/download'
    : '/'

  return (
    <div className="site-shell">
      <SEO path={canonicalPath} />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand-link" href="/" aria-label="doXmind home"><Wordmark /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#workspace">Workspace</a>
          <a href="#local-first">Local by design</a>
          <a href="https://docs.doxmind.com" target="_blank" rel="noreferrer">Docs</a>
        </nav>
        <a className="header-download" href="#download">Download <ArrowDown size={14} /></a>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div className="eyebrow" variants={reveal} transition={{ duration: 0.45 }}>
              <span className="status-dot" /> Desktop documents, without the cloud
            </motion.div>
            <motion.h1 variants={reveal} transition={{ duration: 0.58, ease: 'easeOut' }}>
              Your documents.<br /><em>On your computer.</em>
            </motion.h1>
            <motion.p className="hero-lede" variants={reveal} transition={{ duration: 0.58 }}>
              A fully local desktop IDE for Markdown, PDF, and Excel. Open the files you
              already have, work with richer tools, and keep every byte on your disk.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal} transition={{ duration: 0.5 }}>
              <a className="button button-primary" href={MAC_DOWNLOAD_URL} data-testid="mac-download">
                <Download size={18} /> Download for macOS
              </a>
              <a className="text-link" href="#workspace">See the workspace <ArrowDown size={15} /></a>
            </motion.div>
            <motion.div className="hero-meta" variants={reveal} transition={{ duration: 0.5 }}>
              <span><Check size={13} /> Apple silicon</span>
              <span><Check size={13} /> No account</span>
              <span><Check size={13} /> Automatic updates</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-preview"
            initial={{ opacity: 0, y: 32, rotate: 0.8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <DesktopPreview />
          </motion.div>
        </section>

        <div className="path-ribbon" aria-label="Local storage path">
          <span className="path-label">SOURCE OF TRUTH</span>
          <span className="path-value">~/Documents/your-work/</span>
          <span className="path-state"><i /> SAVED LOCALLY</span>
        </div>

        <section className="workspace-section" id="workspace">
          <div className="section-heading">
            <div className="section-index">01 / YOUR WORKSPACE</div>
            <h2>Three formats.<br />One serious workspace.</h2>
            <p>No imports into a proprietary cloud. No browser tabs pretending to be files.</p>
          </div>
          <div className="format-grid">
            <FormatCard
              index="1"
              icon={FileText}
              title="Markdown"
              copy="Write with a rich block editor while preserving a portable .md file on disk."
              detail="Math · Mermaid · Tables · Callouts"
            />
            <FormatCard
              index="2"
              icon={File}
              title="PDF"
              copy="Read, annotate, and organize PDFs in a focused surface built for long documents."
              detail="Annotations · Blocks · Export"
            />
            <FormatCard
              index="3"
              icon={FileSpreadsheet}
              title="Excel"
              copy="Edit real workbooks with formulas, filters, formatting, and structural operations."
              detail=".xlsx · Formulas · Autofill · Filters"
            />
          </div>
        </section>

        <section className="local-section" id="local-first">
          <div className="local-copy">
            <div className="section-index section-index-light">02 / LOCAL BY DESIGN</div>
            <h2>There is no cloud<br />behind the curtain.</h2>
            <p>
              doXmind is a desktop tool, not a web service in a window. Your filesystem is the
              source of truth, and the app works without an account or internet connection.
            </p>
          </div>
          <div className="principle-list">
            <div className="principle"><HardDrive /><div><strong>Your disk is canonical</strong><span>Original files remain where you put them.</span></div></div>
            <div className="principle"><WifiOff /><div><strong>Offline is normal</strong><span>Editing does not depend on a network round trip.</span></div></div>
            <div className="principle"><ShieldCheck /><div><strong>Private by architecture</strong><span>No login, cloud sync, telemetry, or AI runtime.</span></div></div>
          </div>
          <div className="local-stamp" aria-hidden="true">100%<span>LOCAL</span></div>
        </section>

        <section className="download-section" id="download">
          <div className="download-intro">
            <div className="section-index">03 / DOWNLOAD</div>
            <h2>Bring your documents home.</h2>
            <p>Install doXmind and open a folder. No sign-up flow in between.</p>
          </div>

          <div className="download-grid">
            <article className="download-card is-available">
              <div>
                <div className="availability"><i /> AVAILABLE NOW</div>
                <h3>macOS</h3>
                <p>For Apple silicon Macs</p>
              </div>
              <a className="button button-primary button-wide" href={MAC_DOWNLOAD_URL}>
                <Download size={18} /> Download .dmg
              </a>
              <div className="download-foot">
                <span>Latest stable release</span>
                <a href={RELEASES_URL} target="_blank" rel="noreferrer">Release notes <ArrowUpRight size={13} /></a>
              </div>
            </article>

            <article className="download-card is-upcoming">
              <div>
                <div className="availability">COMING SOON</div>
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
        <div><Wordmark /><p>A local desktop IDE for the documents you already own.</p></div>
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
