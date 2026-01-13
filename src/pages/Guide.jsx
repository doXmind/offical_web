import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Book, Edit, MessageSquare, Clock, Keyboard, Layout, Zap,
  ChevronRight, ExternalLink, ChevronDown, ChevronUp,
  Sparkles, Code, Type, List, Table, Image, Search,
  PanelLeft, PanelRight, Sun, Moon, ArrowRight
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';
import FeatureCard from '../components/guide/FeatureCard';
import ShortcutTable from '../components/guide/ShortcutTable';
import QuickEditCommands from '../components/guide/QuickEditCommands';

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
        {Icon && <Icon className="w-6 h-6 text-white" />}
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
                    ? 'text-white font-medium'
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
    { id: 'interface', title: 'Interface Overview' },
    { id: 'editor', title: 'Rich Markdown Editor' },
    { id: 'quick-edit', title: 'Quick Edit' },
    { id: 'ai-chat', title: 'AI Chat Assistant' },
    { id: 'autocomplete', title: 'AI Autocomplete' },
    { id: 'version-history', title: 'Version History' },
    { id: 'shortcuts', title: 'Keyboard Shortcuts' }
  ];

  const formattingShortcuts = [
    { action: 'Bold', keys: 'Ctrl+B' },
    { action: 'Italic', keys: 'Ctrl+I' },
    { action: 'Underline', keys: 'Ctrl+U' },
    { action: 'Inline Code', keys: 'Ctrl+E' },
    { action: 'Heading 1-6', keys: 'Ctrl+Alt+1-6' },
    { action: 'Bullet List', keys: 'Ctrl+Shift+8' },
    { action: 'Numbered List', keys: 'Ctrl+Shift+7' }
  ];

  const generalShortcuts = [
    { action: 'Save', keys: 'Ctrl+S', description: 'Save current document' },
    { action: 'Undo', keys: 'Ctrl+Z', description: 'Undo last action' },
    { action: 'Redo', keys: 'Ctrl+Y', description: 'Redo last action' },
    { action: 'Find', keys: 'Ctrl+F', description: 'Open search in document' },
    { action: 'Select All', keys: 'Ctrl+A', description: 'Select all content' }
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
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm text-white font-medium">User Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-6">
              doXmind User Guide
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Learn how to use doXmind's AI-powered writing features to enhance your productivity
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://beta.doxmind.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Try doXmind
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#introduction"
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
          <div className="max-w-4xl">
            {/* Introduction */}
            <GuideSection id="introduction" title="Introduction" icon={Book}>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-light mb-4">What is doXmind?</h3>
                <p className="text-gray-400 mb-6">
                  doXmind is an AI-powered writing assistant that helps you write better, faster.
                  It combines a powerful Markdown editor with intelligent AI features to enhance
                  your writing workflow.
                </p>

                <h4 className="text-xl font-light mb-3">Key Features</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Rich Markdown Editor:</strong> Full-featured editor with formatting, code blocks, tables, and more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Quick Edit:</strong> Select text and instantly improve, fix grammar, translate, or change tone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">AI Chat Assistant:</strong> Have conversations with AI about your document</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Smart Autocomplete:</strong> Get AI suggestions as you type, accept with Tab</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Version History:</strong> Track changes and restore previous versions anytime</span>
                  </li>
                </ul>
              </div>
            </GuideSection>

            {/* Interface Overview */}
            <GuideSection id="interface" title="Interface Overview" icon={Layout}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  The doXmind interface is organized into three main areas for efficient writing:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <FeatureCard icon={PanelLeft} title="Left Sidebar">
                    <p className="text-sm text-gray-400 mt-2">
                      Manage your files and search across documents. Create new files or open existing ones.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={Edit} title="Center Editor">
                    <p className="text-sm text-gray-400 mt-2">
                      The main writing area with full Markdown support and formatting toolbar.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={PanelRight} title="Right Panel">
                    <p className="text-sm text-gray-400 mt-2">
                      AI chat assistant panel. Open it by clicking the chat icon in the header.
                    </p>
                  </FeatureCard>
                </div>

                <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                  <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-white" />
                    <Moon className="w-5 h-5 text-white" />
                    Theme Toggle
                  </h4>
                  <p className="text-gray-400">
                    Switch between light and dark mode using the theme toggle in the header.
                    Your preference is saved automatically.
                  </p>
                </div>
              </div>
            </GuideSection>

            {/* Rich Markdown Editor */}
            <GuideSection id="editor" title="Rich Markdown Editor" icon={Edit}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  doXmind provides a powerful editor with full Markdown support and real-time preview.
                </p>

                <h4 className="text-xl font-light mb-3">Text Formatting</h4>
                <ShortcutTable shortcuts={formattingShortcuts} className="mb-8" />

                <h4 className="text-xl font-light mb-3 mt-8">Content Types</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <FeatureCard icon={Type} title="Headings">
                    <p className="text-sm text-gray-400 mt-2">
                      Six levels of headings (H1-H6) for organizing your content structure.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={List} title="Lists">
                    <p className="text-sm text-gray-400 mt-2">
                      Bullet lists, numbered lists, and interactive task lists with checkboxes.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={Code} title="Code Blocks">
                    <p className="text-sm text-gray-400 mt-2">
                      Syntax-highlighted code blocks. Type <code className="px-1 bg-white/10 rounded">```language</code> and press Enter.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={Table} title="Tables">
                    <p className="text-sm text-gray-400 mt-2">
                      Create and edit tables with an easy-to-use table editor.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={Image} title="Images">
                    <p className="text-sm text-gray-400 mt-2">
                      Insert images by pasting URLs or dragging files into the editor.
                    </p>
                  </FeatureCard>

                  <FeatureCard icon={Search} title="Search & Replace">
                    <p className="text-sm text-gray-400 mt-2">
                      Find and replace text across your document with Ctrl+F.
                    </p>
                  </FeatureCard>
                </div>
              </div>
            </GuideSection>

            {/* Quick Edit - Core Feature */}
            <GuideSection id="quick-edit" title="Quick Edit" icon={Zap}>
              <div className="prose prose-invert max-w-none">
                <div className="p-6 border border-white/30 bg-white/5 rounded-lg mb-6">
                  <h3 className="text-2xl font-light mb-3 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-white" />
                    AI-Powered Text Editing
                  </h3>
                  <p className="text-gray-400">
                    Quick Edit is one of doXmind's most powerful features. Select any text and
                    instantly transform it with AI assistance.
                  </p>
                </div>

                <h4 className="text-xl font-light mb-4">How to Use</h4>
                <ol className="space-y-3 text-gray-400 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">1</span>
                    <span>Select the text you want to edit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">2</span>
                    <span>Right-click or use the floating menu to choose a Quick Edit command</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">3</span>
                    <span>Review the AI-generated result in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">4</span>
                    <span>Accept to apply changes or dismiss to keep the original</span>
                  </li>
                </ol>

                <h4 className="text-xl font-light mb-4">Available Commands</h4>
                <QuickEditCommands />
              </div>
            </GuideSection>

            {/* AI Chat Assistant */}
            <GuideSection id="ai-chat" title="AI Chat Assistant" icon={MessageSquare}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  Chat with AI about your document, ask questions, or request help with writing tasks.
                </p>

                <div className="space-y-4 mb-8">
                  <FeatureCard title="Opening the Chat Panel">
                    <p className="text-sm text-gray-400 mt-2">
                      Click the chat icon in the top-right corner of the header to open the AI chat panel.
                      The panel slides in from the right side.
                    </p>
                  </FeatureCard>

                  <FeatureCard title="Streaming Responses">
                    <p className="text-sm text-gray-400 mt-2">
                      AI responses appear in real-time as they're generated, so you can start reading
                      immediately without waiting for the full response.
                    </p>
                  </FeatureCard>

                  <FeatureCard title="@ Mention Files">
                    <p className="text-sm text-gray-400 mt-2">
                      Type <code className="px-1 bg-white/10 rounded">@</code> followed by a filename to include
                      that file's content as context for the AI. This helps the AI understand your project.
                    </p>
                  </FeatureCard>

                  <FeatureCard title="Extended Thinking">
                    <p className="text-sm text-gray-400 mt-2">
                      For complex requests, the AI shows its reasoning process. Expand the "Thinking" section
                      to see how the AI approached your question.
                    </p>
                  </FeatureCard>
                </div>

                <h4 className="text-xl font-light mb-3">What the AI Can Do</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                    View and analyze your document content
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                    Make direct edits to your text
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                    Insert new content at specific locations
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                    Search and find content in your document
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                    Answer questions about your writing
                  </li>
                </ul>
              </div>
            </GuideSection>

            {/* AI Autocomplete */}
            <GuideSection id="autocomplete" title="AI Autocomplete" icon={Sparkles}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  Get intelligent text suggestions as you write, similar to GitHub Copilot for code.
                </p>

                <div className="p-6 border border-white/10 rounded-lg bg-white/5 mb-6">
                  <h4 className="text-lg font-medium mb-3">How It Works</h4>
                  <ol className="space-y-3 text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">1</span>
                      <span>As you type, AI analyzes your context and generates suggestions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">2</span>
                      <span>Suggestions appear as faded text after your cursor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">3</span>
                      <span>Press <kbd className="px-2 py-1 bg-white/5 rounded text-white">Tab</kbd> to accept the suggestion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-sm flex items-center justify-center">4</span>
                      <span>Keep typing to dismiss and continue writing</span>
                    </li>
                  </ol>
                </div>

                <p className="text-sm text-gray-500">
                  Autocomplete suggestions are context-aware and adapt to your writing style and the content of your document.
                </p>
              </div>
            </GuideSection>

            {/* Version History */}
            <GuideSection id="version-history" title="Version History" icon={Clock}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  Never lose your work. doXmind automatically saves versions of your document as you write.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <FeatureCard title="Automatic Snapshots">
                    <p className="text-sm text-gray-400 mt-2">
                      Your document is automatically saved at regular intervals and when significant changes are made.
                    </p>
                  </FeatureCard>

                  <FeatureCard title="Diff View">
                    <p className="text-sm text-gray-400 mt-2">
                      See exactly what changed between versions. Added text is highlighted in green, removed text in red.
                    </p>
                  </FeatureCard>
                </div>

                <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                  <h4 className="text-lg font-medium mb-3">Restoring a Version</h4>
                  <ol className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span>
                      Open the version history panel from the sidebar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span>
                      Browse through previous versions by date and time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span>
                      Preview the changes using the diff view
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2"></span>
                      Click "Restore" to revert to that version
                    </li>
                  </ol>
                </div>
              </div>
            </GuideSection>

            {/* Keyboard Shortcuts */}
            <GuideSection id="shortcuts" title="Keyboard Shortcuts" icon={Keyboard}>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">
                  Speed up your workflow with these essential keyboard shortcuts.
                </p>

                <h4 className="text-xl font-light mb-3">General</h4>
                <ShortcutTable shortcuts={generalShortcuts} className="mb-8" />

                <h4 className="text-xl font-light mb-3">Formatting</h4>
                <ShortcutTable shortcuts={formattingShortcuts} />

                <div className="mt-8 p-6 border border-white/20 bg-white/5 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-white" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-gray-400">
                    Use Quick Edit shortcuts for the fastest workflow: select text, then use the context menu
                    to apply AI transformations instantly without leaving the keyboard.
                  </p>
                </div>
              </div>
            </GuideSection>
          </div>

          {/* Table of Contents */}
          <TableOfContents sections={sections} />
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Writing?"
        description="Experience the power of AI-assisted writing with doXmind."
        primaryButtonText="Try doXmind Now"
        primaryButtonHref="https://beta.doxmind.com/"
        primaryButtonExternal={true}
        secondaryButtonText="Back to Top"
        secondaryButtonHref="#"
      />
    </div>
  );
};

export default Guide;
