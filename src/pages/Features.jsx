import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Zap,
  Clock,
  Sparkles,
  CheckCircle,
  Languages,
  Minimize2,
  Expand,
  Type,
  Code,
  Table,
  List,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const mainFeatures = [
    {
      id: 'quick-edit',
      icon: Zap,
      title: 'Quick Edit',
      subtitle: 'AI-Powered Text Transformation',
      description: 'Select any text and instantly transform it with AI. Fix grammar, improve quality, translate, change tone, and more with a single click.',
      commands: [
        { name: 'Fix Grammar', icon: CheckCircle, desc: 'Correct spelling and grammar errors' },
        { name: 'Improve', icon: Sparkles, desc: 'Enhance writing quality and clarity' },
        { name: 'Simplify', icon: Type, desc: 'Make text easier to understand' },
        { name: 'Expand', icon: Expand, desc: 'Add more detail and depth' },
        { name: 'Shorten', icon: Minimize2, desc: 'Reduce length while keeping meaning' },
        { name: 'Translate', icon: Languages, desc: 'Convert to English, Chinese, Japanese, and more' }
      ]
    },
    {
      id: 'ai-chat',
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      subtitle: 'Conversational AI for Writing',
      description: 'Chat with AI about your document. Ask questions, request edits, or get help with writing tasks. AI can view, edit, and insert content directly.',
      highlights: [
        'Streaming responses in real-time',
        '@ mention files for context',
        'Extended Thinking shows AI reasoning',
        'Direct document editing capabilities'
      ]
    },
    {
      id: 'autocomplete',
      icon: Sparkles,
      title: 'AI Autocomplete',
      subtitle: 'Smart Writing Suggestions',
      description: 'Get intelligent text suggestions as you write. Similar to GitHub Copilot, but for writing. Press Tab to accept suggestions.',
      highlights: [
        'Context-aware suggestions',
        'Adapts to your writing style',
        'Tab to accept, keep typing to dismiss',
        'Works across all document types'
      ]
    },
    {
      id: 'editor',
      icon: FileText,
      title: 'Rich Markdown Editor',
      subtitle: 'Full-Featured Writing Environment',
      description: 'A powerful TipTap-based editor with complete Markdown support, formatting toolbar, and real-time preview.',
      editorFeatures: [
        { name: 'Formatting', icon: Type, desc: 'Bold, italic, headings, lists' },
        { name: 'Code Blocks', icon: Code, desc: 'Syntax highlighting for all languages' },
        { name: 'Tables', icon: Table, desc: 'Easy table creation and editing' },
        { name: 'Lists', icon: List, desc: 'Bullet, numbered, and task lists' },
        { name: 'Search', icon: Search, desc: 'Find and replace across document' },
        { name: 'Theme', icon: Sun, desc: 'Light and dark mode support' }
      ]
    },
    {
      id: 'version-history',
      icon: Clock,
      title: 'Version History',
      subtitle: 'Never Lose Your Work',
      description: 'Automatic version snapshots with diff view. See exactly what changed and restore any previous version with one click.',
      highlights: [
        'Automatic version snapshots',
        'Visual diff comparison',
        'One-click version restore',
        'Track all document changes'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-white font-medium">Features</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              AI-Powered Writing Tools
            </h1>

            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Everything you need to write better, faster. Powered by Claude AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Navigation */}
      <section className="sticky top-16 z-40 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {mainFeatures.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveFeature(index);
                  document.getElementById(feature.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeFeature === index
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{feature.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-32">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-32"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg border border-white/30 bg-white/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">{feature.subtitle}</span>
                  </div>

                  <h2 className="text-4xl font-light mb-4">{feature.title}</h2>
                  <p className="text-gray-400 text-lg mb-8">{feature.description}</p>

                  {/* Quick Edit Commands */}
                  {feature.commands && (
                    <div className="grid grid-cols-2 gap-3">
                      {feature.commands.map((cmd) => (
                        <div
                          key={cmd.name}
                          className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <cmd.icon className="w-4 h-4 text-white" />
                            <span className="font-medium text-sm">{cmd.name}</span>
                          </div>
                          <p className="text-xs text-gray-500">{cmd.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  {feature.highlights && (
                    <ul className="space-y-3">
                      {feature.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span className="text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Editor Features */}
                  {feature.editorFeatures && (
                    <div className="grid grid-cols-2 gap-3">
                      {feature.editorFeatures.map((item) => (
                        <div
                          key={item.name}
                          className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="w-4 h-4 text-white" />
                            <span className="font-medium text-sm">{item.name}</span>
                          </div>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className="border border-white/10 rounded-lg bg-white/5 p-8 aspect-video flex items-center justify-center">
                    <feature.icon className="w-24 h-24 text-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">Built with Modern Technology</h2>
            <p className="text-gray-500">Powered by the latest in AI and web development</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Claude AI', desc: 'Anthropic' },
              { name: 'Next.js 15', desc: 'React Framework' },
              { name: 'TipTap', desc: 'Rich Text Editor' },
              { name: 'FastAPI', desc: 'Python Backend' }
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-6 border border-white/10 rounded-lg text-center hover:border-white/20 transition-colors"
              >
                <div className="font-medium mb-1">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Features;
