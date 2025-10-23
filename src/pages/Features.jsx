import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  BarChart3,
  Layers,
  MessageSquare,
  Users,
  Shield,
  Lock,
  CheckCircle,
  Code,
  Webhook,
  Plug,
  Server,
  Database,
  Globe,
  Sparkles,
  Brain,
  Eye,
  Zap,
  Wand2,
  FileType,
  Boxes,
  Timer,
  Package,
  TrendingUp,
  GitBranch,
  Table2,
  Sigma,
  Bot,
  Cpu,
  HardDrive,
  Wrench,
  Monitor,
  Palette,
  FlaskConical,
  Save
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { CardSpotlight } from '../components/ui/CardSpotlight';
import InteractiveDemoViewer from '../components/ui/InteractiveDemoViewer';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { cn } from '../core/utils';
import CTASection from '../components/ui/cta-section';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navRef = React.useRef(null);
  const [navHeight, setNavHeight] = useState(48);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const updateNavHeight = () => {
      const h = navRef.current.getBoundingClientRect().height;
      setNavHeight(h);
    };

    updateNavHeight();

    const ro = new ResizeObserver(updateNavHeight);
    ro.observe(navRef.current);

    return () => ro.disconnect();
  }, []);

  const features = [
    {
      id: 'smarteditor',
      icon: FileText,
      title: 'AI-Native Editor',
      subtitle: 'TipTap v3 with Intelligent Features',
      description: 'Professional rich-text editor powered by TipTap 3.0 with GitHub Copilot-style autocomplete, quick edit commands, and Notion-like block manipulation.',
      gradient: 'from-blue-500 to-cyan-500',
      demoMedia: { type: 'gif', src: '/auto-complete.gif' },
      stats: [
        { label: 'Autocomplete', value: 'Gemini 2.0', icon: Zap },
        { label: 'Quick Edit', value: '10+ Actions', icon: Wand2 },
        { label: 'Formats', value: 'MD/PDF/DOCX', icon: FileType },
        { label: 'Blocks', value: '15+ Types', icon: Boxes }
      ],
      keyFeatures: [
        'Context-aware autocomplete with 150-300ms smart trigger detection',
        'Quick edit: fix grammar, improve quality, change tone, translate',
        'Drag handles for block reordering with type conversion menu',
        'Collapsible headings, resizable images, LaTeX math rendering'
      ]
    },
    {
      id: 'datainsight',
      icon: BarChart3,
      title: 'Data Analysis Sub-Agent',
      subtitle: 'Python-Powered CSV/Excel Analysis',
      description: 'Specialized sub-agent using pandas and numpy for automated data analysis. Execute Python code, generate statistical insights, and create visualizations from natural language queries.',
      gradient: 'from-purple-500 to-pink-500',
      demoMedia: { type: 'video', src: '/data-analysis.mp4' },
      stats: [
        { label: 'Runtime', value: 'pandas/numpy', icon: Package },
        { label: 'Timeout', value: '30 seconds', icon: Timer },
        { label: 'Formats', value: 'CSV/XLSX', icon: TrendingUp },
        { label: 'Tools', value: '2 Core', icon: Wrench }
      ],
      keyFeatures: [
        'Python code execution with pandas/numpy pre-imported',
        'Statistical analysis: descriptive stats, correlations, distributions',
        'Data aggregations, transformations, and pivot tables',
        'Handles missing values and data cleaning automatically'
      ]
    },
    {
      id: 'multimodal',
      icon: Layers,
      title: 'Interactive Visualizations',
      subtitle: 'ECharts, Mermaid, Excel Tables & Math',
      description: 'Rich content blocks beyond traditional markdown: interactive charts with ECharts, flow diagrams with Mermaid, Excel-style spreadsheets with jSpreadsheet, and LaTeX math with KaTeX.',
      gradient: 'from-green-500 to-emerald-500',
      demoMedia: { type: 'gif', src: '/visualization.gif' },
      stats: [
        { label: 'Charts', value: 'ECharts 5.6', icon: TrendingUp },
        { label: 'Diagrams', value: 'Mermaid', icon: GitBranch },
        { label: 'Tables', value: 'jSpreadsheet', icon: Table2 },
        { label: 'Math', value: 'KaTeX', icon: Sigma }
      ],
      keyFeatures: [
        'ECharts: bar, line, pie, scatter plots with JSON configuration',
        'Mermaid: flowcharts, sequence diagrams, class diagrams, Gantt charts',
        'Excel-like tables: cell editing, row/column operations, copy/paste',
        'LaTeX inline/block math with live rendering and click-to-edit'
      ]
    },
    {
      id: 'assistant',
      icon: MessageSquare,
      title: 'Multi-Agent System',
      subtitle: 'Main Orchestrator with Sub-Agents',
      description: 'Main agent powered by Grok-4 with 11 core tools, intelligently delegating to specialized data analysis and web research sub-agents. Supports 200K token working window with context compaction.',
      gradient: 'from-orange-500 to-red-500',
      demoMedia: { type: 'video', src: '/select-edit-quick-edit.mp4' },
      stats: [
        { label: 'Model', value: 'Grok-4-fast', icon: Bot },
        { label: 'Premium', value: 'Grok-4', icon: Sparkles },
        { label: 'Context', value: '200K tokens', icon: HardDrive },
        { label: 'Tools', value: '11 Core', icon: Wrench }
      ],
      keyFeatures: [
        'Main agent: read_file, edit_file, glob, search, analyze_document_structure',
        'Sub-agents: data analysis (Python), web research (DuckDuckGo/Serper)',
        'Context compaction at 80% (160K tokens) with structured note-taking',
        'Streaming responses with SSE, tool execution tracking, error recovery'
      ]
    },
    {
      id: 'teamspace',
      icon: Users,
      title: 'Workspace Management',
      subtitle: 'Isolated Project Environments',
      description: 'Create separate workspaces for different projects with independent file management, conversation history, and context memory. Built on Tauri for native desktop performance.',
      gradient: 'from-indigo-500 to-purple-500',
      demoMedia: null,
      stats: [
        { label: 'Framework', value: 'Tauri 2.x', icon: Monitor },
        { label: 'Frontend', value: 'Vue 3.5', icon: Palette },
        { label: 'Backend', value: 'Flask', icon: FlaskConical },
        { label: 'Auto-save', value: '2s debounce', icon: Save }
      ],
      keyFeatures: [
        'Isolated workspaces: separate documents, files, chat history per workspace',
        'File management: upload PDF/DOCX/PPTX/CSV/XLSX, organize in folders',
        'Export: DOCX, PDF, Markdown with format preservation',
        'Settings: theme (light/dark/system), i18n (EN/ZH), agent mode control'
      ]
    }
  ];

  const integrations = [
    { name: 'OpenRouter', icon: Brain, status: 'active' },
    { name: 'x.ai (Grok)', icon: Sparkles, status: 'active' },
    { name: 'Google Gemini', icon: Globe, status: 'active' },
    { name: 'DuckDuckGo', icon: Globe, status: 'active' },
    { name: 'Serper API', icon: Globe, status: 'active' },
    { name: 'GitHub', icon: Code, status: 'planned' }
  ];

  const getHeaderOffset = () => {
    const value = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height')
    );
    return isNaN(value) ? 0 : value;
  };

  useLayoutEffect(() => {
    setHeaderHeight(getHeaderOffset());
  }, []);

  const scrollToFeature = (index) => {
    const element = document.getElementById(`feature-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveFeature(index);
    }
  };

  useEffect(() => {
    const ratios = new Array(features.length).fill(0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-idx');
          if (idxAttr == null) return;
          ratios[Number(idxAttr)] = entry.intersectionRatio;
        });
        let maxIdx = activeFeature;
        let maxRatio = 0;
        ratios.forEach((r, i) => {
          if (r > maxRatio && r > 0.2) {
            maxRatio = r;
            maxIdx = i;
          }
        });
        if (maxIdx !== activeFeature) {
          setActiveFeature(maxIdx);
        }
      },
      {
        root: null,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: `-${headerHeight + navHeight + 100}px 0px -40% 0px`,
      }
    );

    features.forEach((_, idx) => {
      const el = document.getElementById(`feature-${idx}`);
      if (el) {
        el.setAttribute('data-idx', idx.toString());
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [features.length, headerHeight, navHeight, activeFeature]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Feature Showcase */}
      <section id="features-section" className="px-4 py-24 scroll-mt-32">
        {/* Intro Title */}
        <div className="relative z-10 text-left max-w-7xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Features that empower teams
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl"
          >
            Discover the tools that make doXmind the most powerful AI document platform
          </motion.p>
        </div>

        {/* Sticky navigation */}
        <div
          className="sticky z-40 max-w-7xl mx-auto flex justify-start mb-24 transition-all duration-300"
          style={{ top: 'var(--nav-offset)', transition: 'top 0.3s ease-in-out' }}
        >
          <nav
            ref={navRef}
            aria-label="Feature navigation"
            className="flex gap-8 whitespace-nowrap overflow-x-auto px-8 py-3 md:px-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
          >
            {features.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => scrollToFeature(idx)}
                className={cn(
                  "text-base md:text-lg transition-colors",
                  activeFeature === idx
                    ? "text-primary font-semibold"
                    : "text-gray-400 hover:text-white"
                )}
                aria-current={activeFeature === idx ? "page" : undefined}
              >
                {f.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                id={`feature-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
                style={{ scrollMarginTop: `${headerHeight + navHeight + 48}px` }}
              >
                {/* Alternating Layout Grid */}
                <div className={cn(
                  "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                  isEven ? "" : "lg:grid-flow-dense"
                )}>

                  {/* Content Section */}
                  <div className={cn(
                    "space-y-8",
                    isEven ? "lg:order-1" : "lg:order-2"
                  )}>
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={cn(
                        "inline-flex items-center gap-3 p-3 rounded-2xl mb-4",
                        "bg-gradient-to-br backdrop-blur-md border border-white/10",
                        feature.gradient
                      )}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">{feature.title}</h2>
                      <p className="text-lg text-primary">{feature.subtitle}</p>
                    </motion.div>

                    {/* Overview */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-semibold mb-3">Overview</h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>

                    {/* Key Features */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                      <div className="space-y-3">
                        {feature.keyFeatures.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3 group"
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Stats - Horizontal mini cards */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {feature.stats.map((stat, idx) => {
                        const IconComponent = stat.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{
                              scale: 1.05,
                              borderColor: 'rgba(99, 102, 241, 0.3)',
                              boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)'
                            }}
                            className="relative p-4 bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden group"
                          >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                              {/* Icon */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                  <IconComponent className="w-4 h-4 text-primary" />
                                </div>
                              </div>

                              {/* Value */}
                              <div className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                {stat.value}
                              </div>

                              {/* Label */}
                              <div className="text-xs text-gray-500 leading-tight">
                                {stat.label}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Demo Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative",
                      isEven ? "lg:order-2" : "lg:order-1"
                    )}
                  >
                    <InteractiveDemoViewer
                      media={feature.demoMedia}
                      title={`${feature.title} Demo`}
                      className="min-h-[400px] lg:min-h-[500px]"
                      enableZoom={true}
                      autoPlay={true}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Integration Showcase with Bento Grid */}
      <section id="integration-section" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-400">
              Connect with your favorite tools and services
            </p>
          </motion.div>

          <BentoGrid>
            <BentoGridItem
              className="md:col-span-2 bg-gray-900 border-gray-800"
              title="API First Design"
              description="RESTful APIs with comprehensive documentation for seamless integration"
              header={
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-lg">
                  <Code className="w-12 h-12 text-primary" />
                </div>
              }
            />
            <BentoGridItem
              className="bg-gray-900 border-gray-800"
              title="Real-time Webhooks"
              description="Get instant notifications for document updates and AI completions"
              header={
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <Webhook className="w-12 h-12 text-purple-400" />
                </div>
              }
            />
            <BentoGridItem
              className="bg-gray-900 border-gray-800"
              title="Native SDKs"
              description="JavaScript and Python SDKs in development"
              header={
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg">
                  <Plug className="w-12 h-12 text-orange-400" />
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-2 bg-gray-900 border-gray-800"
              title="Enterprise Ready"
              description="SSO, SAML, and custom deployment options for enterprise teams"
              header={
                <div className="flex items-center justify-center h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg">
                  <Server className="w-12 h-12 text-indigo-400" />
                </div>
              }
            />
          </BentoGrid>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className={cn(
                  "w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center",
                  integration.status === 'active'
                    ? "bg-gray-800"
                    : "bg-gray-900 border border-gray-800 border-dashed"
                )}>
                  <integration.icon className={cn(
                    "w-8 h-8",
                    integration.status === 'active' ? "text-white" : "text-gray-600"
                  )} />
                </div>
                <p className={cn(
                  "text-sm font-medium",
                  integration.status === 'active' ? "text-white" : "text-gray-500"
                )}>
                  {integration.name}
                </p>
                {integration.status === 'planned' && (
                  <p className="text-xs text-gray-600 mt-1">Planned</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section with Spotlight Cards */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-400">
              Your data is protected with industry-leading security measures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lock,
                title: 'Local-First Architecture',
                items: ['Desktop app with local data', 'SQLite database', 'Optional cloud sync']
              },
              {
                icon: Shield,
                title: 'Workspace Isolation',
                items: ['Separate workspaces per project', 'Independent file systems', 'Path validation enforced']
              },
              {
                icon: Database,
                title: 'Data Management',
                items: ['Local file storage', 'Execution history tracking', 'Version control support']
              },
              {
                icon: Eye,
                title: 'Privacy Controls',
                items: ['API key stored locally', 'No telemetry by default', 'Full data privacy control']
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardSpotlight className="h-full">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardSpotlight>
              </motion.div>
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
