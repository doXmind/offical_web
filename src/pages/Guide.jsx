import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Book, FileText, Edit, MessageSquare, FolderOpen, Clock, FileDown, Settings,
  Layout, Zap, ChevronRight, ExternalLink, ChevronDown, ChevronUp, Search,
  Command, Keyboard, AlertCircle, ArrowRight, Sparkles, Database, Code
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const GuideSection = ({ id, title, icon: Icon, children, level = 1 }) => {
  const [isOpen, setIsOpen] = useState(level === 1);

  const HeadingTag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
  const headingClasses = level === 1
    ? 'text-3xl md:text-4xl font-light mb-6'
    : level === 2
    ? 'text-2xl font-light mb-4'
    : 'text-xl font-light mb-3';

  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left group mb-4"
      >
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <HeadingTag className={headingClasses}>{title}</HeadingTag>
        {level === 1 && (
          <span className="ml-auto">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            )}
          </span>
        )}
      </button>
      {(isOpen || level > 1) && (
        <motion.div
          initial={level === 1 ? { opacity: 0, height: 0 } : { opacity: 1 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          {children}
        </motion.div>
      )}
    </section>
  );
};

const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="border-l border-white/10 pl-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`text-sm transition-colors block py-1 ${
                  activeSection === section.id
                    ? 'text-primary font-medium'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const Guide = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'document-editing', title: 'Document Editing' },
    { id: 'ai-features', title: 'AI Features' },
    { id: 'file-management', title: 'File & Workspace Management' },
    { id: 'chat-management', title: 'Chat & Conversation' },
    { id: 'version-control', title: 'Version Control' },
    { id: 'export', title: 'Export Features' },
    { id: 'settings', title: 'Settings' },
    { id: 'navigation', title: 'Interface Navigation' },
    { id: 'advanced', title: 'Advanced Features' },
    { id: 'shortcuts', title: 'Shortcuts & Tips' },
    { id: 'troubleshooting', title: 'Troubleshooting' }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="px-6 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/10 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm text-primary font-medium">Beta User Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-6">
              doXmind User Guide
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Complete guide for beta testers - Everything you need to know about using doXmind
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://beta.doxmind.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Join Beta Testing
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#getting-started"
                className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
              >
                Read Guide
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <div className="max-w-4xl">
            {/* Introduction */}
            <GuideSection id="introduction" title="Introduction" icon={Book}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">What is doXmind?</h3>
                <p className="text-gray-400 mb-4">
                  doXmind is a powerful local AI-powered writing and document editing platform that combines
                  the functionality of modern rich-text editors with advanced AI assistant capabilities. It allows
                  you to create, edit, and manage documents in a local environment while leveraging AI technology
                  to boost your writing efficiency.
                </p>

                <h4 className="text-xl font-light mb-3 mt-8">Core Features</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Smart Document Editor:</strong> TipTap-based rich-text editor with Markdown and multiple format support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">AI Writing Assistant:</strong> Real-time AI chat, smart editing suggestions, and auto-completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Multi-format Support:</strong> Native Markdown support, import/export PDF, DOCX, HTML, and more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Version Control:</strong> Complete document history and change tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Advanced Content:</strong> Support for math formulas, charts, flowcharts, code blocks, tables, and more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Local-first:</strong> All data stored locally to protect your privacy and security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Workspace Management:</strong> Complete workspace system for organizing multiple documents and projects</span>
                  </li>
                </ul>
              </div>
            </GuideSection>

            {/* Getting Started */}
            <GuideSection id="getting-started" title="Getting Started" icon={Sparkles}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Welcome Page</h3>
                <p className="text-gray-400 mb-6">
                  When you first open doXmind, you'll see the Welcome Page with several key areas:
                </p>

                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      Search Bar
                    </h4>
                    <p className="text-gray-400">
                      Located at the top center - quickly search all your documents by title
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Create New Documents
                    </h4>
                    <p className="text-gray-400 mb-3">Choose from:</p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Blank document - Start writing immediately
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Templates - Brochure, Project proposal, Business letter, Resume, Letter
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-primary" />
                      Import Existing Files
                    </h4>
                    <p className="text-gray-400 mb-3">Click "Open" dropdown menu:</p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Open file</strong> (Ctrl+O) - Import single files
                          <p className="text-sm mt-1">Supported: .pdf, .md, .markdown, .docx, .pptx, .csv, .xlsx</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Open folder</strong> (Ctrl+Shift+O) - Import entire folders
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Drag & Drop</strong> - Simply drag files or folders into the window
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Document Editing */}
            <GuideSection id="document-editing" title="Document Editing Features" icon={Edit}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Rich-Text Editor</h3>
                <p className="text-gray-400 mb-6">
                  doXmind provides a powerful rich-text editor with support for various formatting options:
                </p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Feature</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Toolbar</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Shortcut</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Bold</td>
                        <td className="px-4 py-3 text-gray-400">B</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+B</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Italic</td>
                        <td className="px-4 py-3 text-gray-400">I</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+I</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Underline</td>
                        <td className="px-4 py-3 text-gray-400">U</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+U</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Code</td>
                        <td className="px-4 py-3 text-gray-400">&lt;&gt;</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+E</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Heading 1-6</td>
                        <td className="px-4 py-3 text-gray-400">H1-H6</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Alt+1-6</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Bullet List</td>
                        <td className="px-4 py-3 text-gray-400">•</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Shift+8</code></td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-gray-300">Numbered List</td>
                        <td className="px-4 py-3 text-gray-400">1.</td>
                        <td className="px-4 py-3"><code className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Shift+7</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xl font-light mb-3 mt-8">Advanced Content Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <Code className="w-6 h-6 text-primary mb-3" />
                    <h5 className="text-lg font-medium mb-2">Code Blocks</h5>
                    <p className="text-sm text-gray-400">
                      Click <code className="px-2 py-1 bg-white/5 rounded">&lt;/&gt;</code> or type <code className="px-2 py-1 bg-white/5 rounded">```language</code> + Enter
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Supports syntax highlighting for JavaScript, Python, Java, and more
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <span className="text-2xl mb-3 block text-primary">∑</span>
                    <h5 className="text-lg font-medium mb-2">Math Formulas (LaTeX)</h5>
                    <p className="text-sm text-gray-400">
                      Inline: <code className="px-2 py-1 bg-white/5 rounded">$E = mc^2$</code>
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Block: <code className="px-2 py-1 bg-white/5 rounded">$$formula$$</code>
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <Database className="w-6 h-6 text-primary mb-3" />
                    <h5 className="text-lg font-medium mb-2">Flowcharts & Diagrams</h5>
                    <p className="text-sm text-gray-400">
                      Use Mermaid to create flowcharts, sequence diagrams, Gantt charts, and more
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h5 className="text-lg font-medium mb-2">Interactive Charts</h5>
                    <p className="text-sm text-gray-400">
                      Insert ECharts for line charts, bar charts, pie charts with interactive zooming and tooltips
                    </p>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* AI Features */}
            <GuideSection id="ai-features" title="AI Features" icon={MessageSquare}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">AI Chat Assistant</h3>
                <p className="text-gray-400 mb-6">
                  doXmind includes a powerful AI assistant that supports real-time conversations and document editing.
                </p>

                <div className="p-6 border border-white/10 rounded-lg bg-white/5 mb-6">
                  <h4 className="text-lg font-medium mb-3">Opening the Chat Panel</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Click the chat icon in the top right corner
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      The chat panel slides in from the right with conversation history, input box, and command modes
                    </li>
                  </ul>
                </div>

                <h4 className="text-xl font-light mb-3">AI Command Modes</h4>
                <div className="space-y-4">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Ask Mode</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-gray-400">Question & Answer</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Ask AI for explanations, suggestions, or information. AI won't modify your document.
                    </p>
                    <p className="text-xs text-gray-500">
                      Examples: "Explain quantum computing basics", "Recommend three books on machine learning"
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Edit Mode</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-gray-400">Direct Editing</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Let AI directly edit your document content with highlighted changes you can accept or reject.
                    </p>
                    <p className="text-xs text-gray-500">
                      Examples: "Make this paragraph more professional", "Fix grammar errors", "Rewrite this more concisely"
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Write Mode</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-gray-400">Content Generation</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Have AI help you write new content from scratch.
                    </p>
                    <p className="text-xs text-gray-500">
                      Examples: "Write an introduction about company values", "Create a project plan outline"
                    </p>
                  </div>
                </div>

                <h4 className="text-xl font-light mb-3 mt-8">AI Auto-completion</h4>
                <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                  <p className="text-gray-400 mb-3">
                    AI suggests text based on context as you write. Suggestions appear semi-transparently.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Press <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Tab</kbd> to accept suggestions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Continue typing to ignore suggestions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Toggle on/off from the navigation bar AI icon
                    </li>
                  </ul>
                </div>
              </div>
            </GuideSection>

            {/* File Management */}
            <GuideSection id="file-management" title="File & Workspace Management" icon={FolderOpen}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Workspace Concept</h3>
                <p className="text-gray-400 mb-6">
                  A Workspace is a container for organizing documents and files in doXmind:
                </p>
                <ul className="space-y-2 text-gray-400 mb-8">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    Each workspace contains multiple documents and files
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    Workspaces have independent conversation history
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    Automatically created when you create a document or import files
                  </li>
                </ul>

                <h4 className="text-xl font-light mb-3">Supported File Formats</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Data Files</h5>
                    <p className="text-sm text-gray-300">CSV, JSON, Parquet, TSV, XLS/XLSX, XML</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Writing Files</h5>
                    <p className="text-sm text-gray-300">MD, Markdown</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Document Files</h5>
                    <p className="text-sm text-gray-300">PDF, DOCX, PPTX (auto-converted to Markdown)</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Other</h5>
                    <p className="text-sm text-gray-300">Images (PNG, JPG, GIF, SVG), Code files, TXT</p>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-primary/20 bg-primary/5 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Automatic File Conversion
                  </h4>
                  <p className="text-sm text-gray-400">
                    When you upload PDF, DOCX, or PPTX files, doXmind automatically extracts text content
                    and converts it to editable Markdown format. Both the original file and converted .md file are saved.
                  </p>
                </div>
              </div>
            </GuideSection>

            {/* Chat Management */}
            <GuideSection id="chat-management" title="Chat & Conversation Management" icon={MessageSquare}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Managing Conversations</h3>

                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Starting New Conversations</h4>
                    <p className="text-gray-400 mb-3">
                      Click "New Chat" or the trash icon at the top of the chat panel to clear current conversation
                      and start fresh.
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Loading History</h4>
                    <p className="text-gray-400 mb-3">
                      Click "History" or the clock icon to view all past conversations for the current workspace.
                      Click any conversation to load it and continue the discussion.
                    </p>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Message Operations</h4>
                    <p className="text-gray-400 mb-3">
                      Each AI message has several action options:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <strong className="text-white">Copy</strong> - Copy message text to clipboard
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <strong className="text-white">Save to Document</strong> - Insert AI content directly into your document
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <strong className="text-white">Retry</strong> - Regenerate the AI response if unsatisfied
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <strong className="text-white">Add to Context</strong> - Pin messages for AI to reference in future responses
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Version Control */}
            <GuideSection id="version-control" title="Version Control & History" icon={Clock}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Execution History</h3>
                <p className="text-gray-400 mb-6">
                  doXmind records all AI modifications to your documents, allowing you to track changes and restore
                  previous versions.
                </p>

                <div className="p-6 border border-white/10 rounded-lg bg-white/5 mb-6">
                  <h4 className="text-lg font-medium mb-3">Viewing History</h4>
                  <p className="text-gray-400 mb-3">
                    Access via Workbench sidebar → History tab or Chat panel → History icon
                  </p>
                  <p className="text-sm text-gray-400">
                    Each record shows execution time, operation type, affected files, file change statistics
                    (added/deleted lines), and AI response summary.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">View Changes (Diff)</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Click "View Changes" to see VS Code-style diff comparison:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">+</span>
                        Green lines = Added
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">-</span>
                        Red lines = Deleted
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gray-500">•</span>
                        Gray lines = Unchanged context
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Restore & Reapply</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      <strong className="text-white">Restore:</strong> Revert files to state before execution
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong className="text-white">Reapply:</strong> Re-apply changes after restoring, allowing
                      you to switch between versions
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-6 border border-amber-500/20 bg-amber-500/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-amber-500 font-medium mb-1">Important Note</h5>
                      <p className="text-sm text-gray-400">
                        Restore operations will overwrite current content. Always review the diff before restoring.
                        The restored state creates a new checkpoint you can revert if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Export */}
            <GuideSection id="export" title="Export Features" icon={FileDown}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Exporting Documents</h3>
                <p className="text-gray-400 mb-6">
                  Export your documents in multiple formats from Navigation bar → Export button
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">Markdown (.md)</h5>
                    <p className="text-xs text-gray-400">Native format, preserves all Markdown markup, ideal for version control</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">HTML (.html)</h5>
                    <p className="text-xs text-gray-400">Web format with styles, can be opened in browsers</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">PDF (.pdf)</h5>
                    <p className="text-xs text-gray-400">Portable format, perfect for printing and sharing with full layout</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">Word (.docx)</h5>
                    <p className="text-xs text-gray-400">Microsoft Word format, editable in Word, great compatibility</p>
                  </div>
                  <div className="p-4 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">Plain Text (.txt)</h5>
                    <p className="text-xs text-gray-400">Pure text with all formatting removed, smallest file size</p>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-white/10 rounded-lg bg-white/5">
                  <h4 className="text-lg font-medium mb-3">Batch Export</h4>
                  <p className="text-gray-400">
                    Export all documents in a workspace at once: Workspace menu → "Export All" → Select format
                    and folder → All documents export in the same format
                  </p>
                </div>
              </div>
            </GuideSection>

            {/* Settings */}
            <GuideSection id="settings" title="Settings & Configuration" icon={Settings}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Application Settings</h3>
                <p className="text-gray-400 mb-6">
                  Access settings via the gear icon in the top right corner
                </p>

                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">General Settings</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Language:</strong> Choose interface language (English, Chinese, etc.)
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Auto-save:</strong> Enable/disable and set interval (seconds)
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Workspace Folder Path:</strong> Set local storage location for workspace files
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Appearance</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Theme:</strong> Light, Dark, or System (follows OS)
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Font:</strong> Editor font family, size, and line height
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-white">Interface Density:</strong> Compact, Normal, or Comfortable spacing
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">AI Model Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-white mb-2">Agent Mode:</p>
                        <ul className="space-y-2 text-sm text-gray-400 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                            <div>
                              <strong className="text-white">Default (Fast):</strong> Quick responses for daily conversations and simple edits
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                            <div>
                              <strong className="text-white">Max (Maximum Reasoning):</strong> Deep thinking for complex problems and long-form writing
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-2">Model Parameters:</p>
                        <ul className="space-y-2 text-sm text-gray-400 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                            <div>
                              <strong className="text-white">Temperature:</strong> Low (0.0-0.5) = deterministic; High (0.5-1.0) = creative
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                            <div>
                              <strong className="text-white">Max Tokens:</strong> Maximum length of single response
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Navigation */}
            <GuideSection id="navigation" title="Interface Navigation" icon={Layout}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Main Interface Layout</h3>
                <p className="text-gray-400 mb-6">
                  doXmind's interface is divided into key areas for efficient workflow:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3">Navigation Bar (Top)</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Logo and document title (click to rename)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Auto-save status indicator
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Document switcher dropdown
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        AI toggle, Save, Export, More menu
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Chat panel toggle and Settings
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3">Workbench Sidebar (Left)</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                        <div>
                          <strong className="text-white">Documents tab:</strong> List of all workspace documents
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                        <div>
                          <strong className="text-white">Files tab:</strong> Browse all workspace files (Writing, Data, Other)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                        <div>
                          <strong className="text-white">History tab:</strong> View execution history and file changes
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                        <div>
                          <strong className="text-white">Document Outline:</strong> Auto-extracted headings with quick jump navigation
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3">Editor Area (Center)</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Toolbar with formatting tools
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Bubble menu (appears on text selection)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Floating menu (trigger with / for quick commands)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Drag handles for reordering blocks
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                    <h4 className="text-lg font-medium mb-3">Chat Panel (Right)</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Conversation history with user/AI messages
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Command mode selector (Ask/Edit/Write)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Context display (attached data and selected text)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Input box with attachment button
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Advanced Features */}
            <GuideSection id="advanced" title="Advanced Features" icon={Zap}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Powerful Capabilities</h3>

                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Streaming AI Responses</h4>
                    <p className="text-gray-400 mb-3">
                      doXmind uses Server-Sent Events (SSE) for real-time streaming responses:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        Real-time feedback with word-by-word display
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        Lower latency for faster perceived speed
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        Interruptible - stop generation at any time
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Tool Calling System</h4>
                    <p className="text-gray-400 mb-3">
                      AI can call tools to enhance capabilities:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 border border-white/5 rounded bg-white/5">
                        <strong className="text-white">File Operations:</strong>
                        <span className="text-gray-400"> Read/write workspace files</span>
                      </div>
                      <div className="p-3 border border-white/5 rounded bg-white/5">
                        <strong className="text-white">Search:</strong>
                        <span className="text-gray-400"> Search within documents</span>
                      </div>
                      <div className="p-3 border border-white/5 rounded bg-white/5">
                        <strong className="text-white">Code Execution:</strong>
                        <span className="text-gray-400"> Run code snippets (if enabled)</span>
                      </div>
                      <div className="p-3 border border-white/5 rounded bg-white/5">
                        <strong className="text-white">Calculations:</strong>
                        <span className="text-gray-400"> Execute mathematical calculations</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Heading Collapse & Drag-Drop</h4>
                    <p className="text-gray-400 mb-3">
                      Organize your document efficiently:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Collapse sections:</strong> Click ▼/▶ icon next to headings
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Drag paragraphs:</strong> Use ⋮⋮ handle to reorder blocks
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                        <div>
                          <strong className="text-white">Shortcuts:</strong> Ctrl+Shift+[ to collapse, Ctrl+Shift+] to expand
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Multi-Document Editing</h4>
                    <p className="text-gray-400 mb-3">
                      Manage multiple documents within the same workspace:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        Create new documents from sidebar + button or document switcher
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        Switch between documents via dropdown or sidebar clicks
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        All documents share the same workspace context and files
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Shortcuts & Tips */}
            <GuideSection id="shortcuts" title="Shortcuts & Productivity Tips" icon={Keyboard}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Essential Keyboard Shortcuts</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-medium mb-3">General</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Save document</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+S</kbd>
                      </div>
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Open file</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+O</kbd>
                      </div>
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Open folder</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Shift+O</kbd>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3">Editing</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Undo</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Z</kbd>
                      </div>
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Redo</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+Y</kbd>
                      </div>
                      <div className="flex justify-between items-center p-2 border border-white/5 rounded">
                        <span className="text-gray-400">Find</span>
                        <kbd className="px-2 py-1 bg-white/5 rounded text-primary">Ctrl+F</kbd>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-light mb-3">Productivity Tips</h4>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-primary pl-6">
                    <h5 className="text-base font-medium mb-2">Tip 1: Use Slash Commands</h5>
                    <p className="text-sm text-gray-400">
                      Type <kbd className="px-2 py-1 bg-white/5 rounded text-primary">/</kbd> on an empty line to quickly insert content:
                      /h1-h6 for headings, /code for code blocks, /table for tables, /math for formulas
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary pl-6">
                    <h5 className="text-base font-medium mb-2">Tip 2: Markdown Shortcuts</h5>
                    <p className="text-sm text-gray-400">
                      Use native Markdown: # for headings, - or * for bullets, 1. for numbers, &gt; for quotes, ``` for code blocks
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary pl-6">
                    <h5 className="text-base font-medium mb-2">Tip 3: Batch Text Selection</h5>
                    <p className="text-sm text-gray-400">
                      Select multiple text sections and add them all to selection, then switch to Edit mode to have AI process them together
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary pl-6">
                    <h5 className="text-base font-medium mb-2">Tip 4: Use @ Mentions</h5>
                    <p className="text-sm text-gray-400">
                      Type @ in chat to reference other documents, uploaded files, or selected text as context for AI
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary pl-6">
                    <h5 className="text-base font-medium mb-2">Tip 5: Leverage Version History</h5>
                    <p className="text-sm text-gray-400">
                      Don't be afraid to experiment with AI edits - you can always restore previous versions. Compare different versions to see what works best.
                    </p>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Troubleshooting */}
            <GuideSection id="troubleshooting" title="Troubleshooting" icon={AlertCircle}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">Common Issues & Solutions</h3>

                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Document Won't Save
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">Symptoms: Save button unresponsive or shows error</p>
                    <p className="text-sm text-gray-400 mb-2">Possible causes:</p>
                    <ul className="space-y-1 text-sm text-gray-400 ml-4">
                      <li>• Network connection issues (if using remote server)</li>
                      <li>• File permission problems</li>
                      <li>• Insufficient disk space</li>
                    </ul>
                    <p className="text-sm text-gray-400 mt-3">Solutions:</p>
                    <ol className="space-y-1 text-sm text-gray-400 ml-4">
                      <li>1. Check auto-save status indicator</li>
                      <li>2. Manually click Save button</li>
                      <li>3. Verify workspace folder permissions</li>
                      <li>4. Check available disk space</li>
                      <li>5. Restart application</li>
                    </ol>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Slow or Timeout AI Responses
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">Symptoms: Long wait times or timeout errors</p>
                    <p className="text-sm text-gray-400 mb-2">Solutions:</p>
                    <ol className="space-y-1 text-sm text-gray-400 ml-4">
                      <li>1. Check network connection</li>
                      <li>2. Switch from Max to Default mode</li>
                      <li>3. Simplify your question</li>
                      <li>4. Reduce number of attached files</li>
                      <li>5. Retry sending the message</li>
                    </ol>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      File Upload Failed
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">Symptoms: No response after drag-drop or upload error</p>
                    <p className="text-sm text-gray-400 mb-2">Solutions:</p>
                    <ol className="space-y-1 text-sm text-gray-400 ml-4">
                      <li>1. Verify file format is supported</li>
                      <li>2. Check file size (recommended &lt; 50MB)</li>
                      <li>3. Try using "Open File" button instead of drag-drop</li>
                      <li>4. Upload large batches in smaller groups</li>
                      <li>5. Check browser console for error details</li>
                    </ol>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Document Formatting Issues
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">Symptoms: Incorrect formatting or editor lag</p>
                    <p className="text-sm text-gray-400 mb-2">Solutions:</p>
                    <ol className="space-y-1 text-sm text-gray-400 ml-4">
                      <li>1. Refresh page (Ctrl+R)</li>
                      <li>2. Clear browser cache</li>
                      <li>3. Split large documents into smaller ones</li>
                      <li>4. Simplify complex formatting</li>
                      <li>5. Update to latest browser version</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-primary/20 bg-primary/5 rounded-lg">
                  <h4 className="text-lg font-medium mb-3">Performance Optimization Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Regularly clean up old conversation history and execution logs
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Keep individual documents under 100KB
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Limit number of simultaneously open documents
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Disable AI auto-completion if not needed
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      Use local disk for workspace (not network drive)
                    </li>
                  </ul>
                </div>

                <div className="mt-8 p-6 border border-white/10 rounded-lg bg-white/5">
                  <h4 className="text-lg font-medium mb-3">Data Backup Recommendations</h4>
                  <p className="text-gray-400 mb-4">
                    doXmind data is stored locally. Protect your work with regular backups:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                      <div>
                        <strong className="text-white">Find workspace folder:</strong> Settings → General → Workspace Folder Path
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                      <div>
                        <strong className="text-white">Manual backup:</strong> Copy entire folder to safe location
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                      <div>
                        <strong className="text-white">Cloud sync:</strong> Use OneDrive, Google Drive, or similar services
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                      <div>
                        <strong className="text-white">Export important documents:</strong> Regularly export critical docs as PDF/DOCX
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </GuideSection>

            {/* Get Started CTA */}
            <div className="mt-16 p-8 border border-white/10 rounded-lg bg-gradient-to-br from-primary/5 to-transparent text-center">
              <h2 className="text-3xl font-light mb-4">Join Beta Testing Now</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Become a beta tester and help shape the future of AI-powered writing
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://beta.doxmind.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Join Beta Testing
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/"
                  className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          <div className="hidden lg:block">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default Guide;
