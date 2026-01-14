import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Zap,
  Clock,
  Sparkles,
  CheckCircle,
  Languages,
  Minimize2,
  Expand,
  Type,
  Database,
  CheckSquare,
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';
import { MockEditorContainer } from '../components/home/MockEditorShowcase/components';
import {
  QuickEditScene,
  AIChatScene,
  AutocompleteScene,
  KnowledgeBaseScene,
  TextReviewScene,
  DiffAcceptScene,
} from '../components/home/MockEditorShowcase/scenes';

// Map feature IDs to their corresponding scene components
const featureSceneMap = {
  'quick-edit': QuickEditScene,
  'ai-chat': AIChatScene,
  'autocomplete': AutocompleteScene,
  'knowledge-base': KnowledgeBaseScene,
  'text-review': TextReviewScene,
  'version-history': DiffAcceptScene,
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState({});
  const featureRefs = useRef({});

  const mainFeatures = [
    {
      id: 'quick-edit',
      icon: Zap,
      title: 'Quick Edit',
      subtitle: 'AI-Powered Text Transformation',
      description: 'Select any text and instantly transform it with AI. Fix grammar, improve quality, translate to 6 languages, change tone, and more with a single click.',
      commands: [
        { name: 'Fix Grammar', icon: CheckCircle, desc: 'Correct spelling and grammar errors' },
        { name: 'Improve', icon: Sparkles, desc: 'Enhance writing quality and clarity' },
        { name: 'Simplify', icon: Type, desc: 'Make text easier to understand' },
        { name: 'Expand', icon: Expand, desc: 'Add more detail and depth' },
        { name: 'Shorten', icon: Minimize2, desc: 'Reduce length while keeping meaning' },
        { name: 'Translate', icon: Languages, desc: 'English, Chinese, Japanese, French, German, Spanish' }
      ],
      additionalInfo: '4 tone options: Professional, Casual, Friendly, Confident'
    },
    {
      id: 'ai-chat',
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      subtitle: 'Conversational AI for Writing',
      description: 'Chat with Claude AI about your document. Ask questions, request edits, or get help with writing tasks. AI can view, edit, and insert content directly—like Cursor for writing.',
      highlights: [
        'Streaming responses in real-time',
        '@ mention files for context',
        'Extended Thinking shows AI reasoning',
        'Image upload support (up to 10 images, 5MB each)',
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
      id: 'knowledge-base',
      icon: Database,
      title: 'Knowledge Base',
      subtitle: 'AI-Powered Document Intelligence',
      description: 'Upload PDF, Word, and PowerPoint files as reference materials. AI automatically indexes content for semantic search, making your writing well-informed.',
      highlights: [
        'Supports PDF, DOCX, PPTX formats',
        'Up to 50MB per file',
        'Automatic vectorization and semantic search',
        'Reference knowledge base in AI chat'
      ]
    },
    {
      id: 'text-review',
      icon: CheckSquare,
      title: 'AI Text Review',
      subtitle: 'Grammarly-Style Writing Analysis',
      description: 'Intelligent text review that analyzes your writing across four dimensions: correctness, clarity, tone, and engagement. Real-time highlighting with replacement suggestions.',
      reviewCategories: [
        { name: 'Correctness', color: '#EF4444', desc: 'Grammar, spelling, punctuation' },
        { name: 'Clarity', color: '#3B82F6', desc: 'Conciseness, readability' },
        { name: 'Tone', color: '#8B5CF6', desc: 'Formality, politeness' },
        { name: 'Engagement', color: '#22C55E', desc: 'Vocabulary variety, expressiveness' }
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

  // Set up IntersectionObserver to detect which features are visible
  useEffect(() => {
    const observers = {};

    mainFeatures.forEach((feature) => {
      const element = featureRefs.current[feature.id];
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleFeatures(prev => ({
            ...prev,
            [feature.id]: entry.isIntersecting
          }));
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers[feature.id] = observer;
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

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
          {mainFeatures.map((feature, index) => {
            const SceneComponent = featureSceneMap[feature.id];
            return (
            <motion.div
              key={feature.id}
              id={feature.id}
              ref={el => featureRefs.current[feature.id] = el}
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
                    <>
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
                      {feature.additionalInfo && (
                        <p className="mt-4 text-sm text-gray-500">{feature.additionalInfo}</p>
                      )}
                    </>
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

                  {/* Review Categories */}
                  {feature.reviewCategories && (
                    <div className="grid grid-cols-2 gap-3">
                      {feature.reviewCategories.map((category) => (
                        <div
                          key={category.name}
                          className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                          <p className="text-xs text-gray-500">{category.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Visual */}
                <div className="relative">
                  {SceneComponent ? (
                    <MockEditorContainer>
                      <SceneComponent isActive={visibleFeatures[feature.id]} />
                    </MockEditorContainer>
                  ) : (
                    <div className="border border-white/10 rounded-lg bg-white/5 p-8 aspect-video flex items-center justify-center">
                      <feature.icon className="w-24 h-24 text-white/10" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Built with Modern Technology</h2>
            <p className="text-gray-500">A thoughtfully designed architecture for seamless AI-powered writing</p>
          </div>

          {/* Architecture Diagram */}
          <div className="relative">
            {/* Connection Lines - SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
                <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
              {/* Horizontal line connecting frontend layer */}
              <line x1="15%" y1="80" x2="85%" y2="80" stroke="url(#lineGradient)" strokeWidth="1" />
              {/* Vertical lines to middle layer */}
              <line x1="25%" y1="100" x2="25%" y2="180" stroke="url(#verticalGradient)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="100" x2="50%" y2="180" stroke="url(#verticalGradient)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="75%" y1="100" x2="75%" y2="180" stroke="url(#verticalGradient)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Horizontal line in API layer */}
              <line x1="20%" y1="280" x2="80%" y2="280" stroke="url(#lineGradient)" strokeWidth="1" />
              {/* Vertical lines to AI layer */}
              <line x1="35%" y1="300" x2="35%" y2="380" stroke="url(#verticalGradient)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="65%" y1="300" x2="65%" y2="380" stroke="url(#verticalGradient)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            <div className="relative z-10 space-y-8">
              {/* Layer 1: Frontend */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 text-center">Frontend Layer</div>
                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                    className="p-5 border border-white/10 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-sm"
                  >
                    <div className="text-xs text-blue-400 mb-1">React 19</div>
                    <div className="font-medium text-sm">Next.js 15</div>
                    <div className="text-[10px] text-gray-500 mt-1">Server Components</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                    className="p-5 border border-white/10 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-sm"
                  >
                    <div className="text-xs text-purple-400 mb-1">Editor</div>
                    <div className="font-medium text-sm">TipTap 3</div>
                    <div className="text-[10px] text-gray-500 mt-1">WYSIWYG + Markdown</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                    className="p-5 border border-white/10 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-sm"
                  >
                    <div className="text-xs text-green-400 mb-1">Animation</div>
                    <div className="font-medium text-sm">Framer Motion</div>
                    <div className="text-[10px] text-gray-500 mt-1">Fluid Interactions</div>
                  </motion.div>
                </div>
              </div>

              {/* Layer 2: API Gateway */}
              <div className="pt-8">
                <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 text-center">API Layer</div>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                    className="px-12 py-5 border border-white/10 rounded-xl bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
                  >
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-xs text-yellow-400 mb-1">Backend</div>
                        <div className="font-medium text-sm">FastAPI</div>
                        <div className="text-[10px] text-gray-500 mt-1">Async Python</div>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="text-center">
                        <div className="text-xs text-orange-400 mb-1">Streaming</div>
                        <div className="font-medium text-sm">SSE</div>
                        <div className="text-[10px] text-gray-500 mt-1">Real-time Updates</div>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="text-center">
                        <div className="text-xs text-cyan-400 mb-1">Storage</div>
                        <div className="font-medium text-sm">PostgreSQL</div>
                        <div className="text-[10px] text-gray-500 mt-1">Document Store</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Layer 3: AI & Intelligence */}
              <div className="pt-8">
                <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-3 text-center">AI Layer</div>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(139,92,246,0.5)' }}
                    className="p-5 border border-purple-500/20 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-transparent relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="text-xs text-purple-400 mb-1">LLM</div>
                      <div className="font-medium">Claude AI</div>
                      <div className="text-[10px] text-gray-500 mt-1">Anthropic · 200K Context</div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-0.5 bg-purple-500/20 rounded text-[9px] text-purple-300">Extended Thinking</span>
                        <span className="px-2 py-0.5 bg-purple-500/20 rounded text-[9px] text-purple-300">Tool Use</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(34,197,94,0.5)' }}
                    className="p-5 border border-green-500/20 rounded-xl bg-gradient-to-br from-green-500/10 via-transparent to-transparent relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="text-xs text-green-400 mb-1">RAG Pipeline</div>
                      <div className="font-medium">Knowledge Base</div>
                      <div className="text-[10px] text-gray-500 mt-1">Chroma · LangGraph</div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-0.5 bg-green-500/20 rounded text-[9px] text-green-300">Vector Search</span>
                        <span className="px-2 py-0.5 bg-green-500/20 rounded text-[9px] text-green-300">Semantic Index</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating particles/dots for visual effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Features;
