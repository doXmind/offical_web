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
  Eye
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { CardSpotlight } from '../components/ui/CardSpotlight';
import { cn } from '../core/utils';
import CTASection from '../components/ui/cta-section';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navRef = React.useRef(null);
  const [navHeight, setNavHeight] = useState(48); // default estimate to avoid initial overlap

  // Measure nav height synchronously before paint for accuracy
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
      title: 'SmartEditor Pro',
      subtitle: 'AI-Powered Writing Experience',
      description: 'Transform your writing with intelligent suggestions, real-time collaboration, and advanced formatting tools.',
      gradient: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Response Time', value: '<200ms', width: '95%' },
        { label: 'AI Commands', value: '20+', width: '75%' },
        { label: 'File Support', value: '10+ formats', width: '85%' },
        { label: 'Concurrent Users', value: '100+', width: '90%' }
      ],
      keyFeatures: [
        'Real-time AI completion with context awareness',
        'Smart command system via "/" shortcuts',
        'Rich media support including tables, code blocks, and charts',
        'Block-level editing with drag-and-drop'
      ]
    },
    {
      id: 'datainsight',
      icon: BarChart3,
      title: 'DataInsight Engine',
      subtitle: 'Intelligent Data Analysis',
      description: 'Automatically analyze data, generate insights, and create stunning visualizations with AI assistance.',
      gradient: 'from-purple-500 to-pink-500',
      stats: [
        { label: 'Processing Speed', value: '1M rows/5s', width: '92%' },
        { label: 'Chart Types', value: '20+', width: '80%' },
        { label: 'Max File Size', value: '50MB', width: '70%' },
        { label: 'Concurrent Tasks', value: '50+', width: '85%' }
      ],
      keyFeatures: [
        'Automatic data type detection and validation',
        'AI-powered chart recommendations',
        'Interactive data exploration tools',
        'One-click report generation'
      ]
    },
    {
      id: 'multimodal',
      icon: Layers,
      title: 'MultiModal Processor',
      subtitle: 'Universal Content Handler',
      description: 'Process any content type - documents, images, data files - with intelligent extraction and conversion.',
      gradient: 'from-green-500 to-emerald-500',
      stats: [
        { label: 'PDF Speed', value: '10 pages/s', width: '88%' },
        { label: 'OCR Accuracy', value: '95%+', width: '95%' },
        { label: 'Batch Size', value: '100 files', width: '82%' },
        { label: 'Storage', value: '10GB Pro', width: '75%' }
      ],
      keyFeatures: [
        'Smart format conversion with layout preservation',
        'Batch processing with queue management',
        'Content extraction and summarization',
        'Version control with rollback support'
      ]
    },
    {
      id: 'assistant',
      icon: MessageSquare,
      title: 'AI Assistant',
      subtitle: 'Your Intelligent Partner',
      description: 'Context-aware AI assistant that understands your documents and helps with complex tasks.',
      gradient: 'from-orange-500 to-red-500',
      stats: [
        { label: 'Response Time', value: '<1s', width: '97%' },
        { label: 'Context Window', value: '32K tokens', width: '90%' },
        { label: 'Languages', value: '95+', width: '93%' },
        { label: 'Concurrent Chats', value: '1000+', width: '87%' }
      ],
      keyFeatures: [
        'Context-aware responses based on your documents',
        'Streaming responses for smooth interaction',
        'Tool integration for file operations',
        'Conversation history with search'
      ]
    },
    {
      id: 'teamspace',
      icon: Users,
      title: 'TeamSpace',
      subtitle: 'Collaborative Workspace',
      description: 'Secure workspaces for teams with real-time collaboration, version control, and permission management.',
      gradient: 'from-indigo-500 to-purple-500',
      stats: [
        { label: 'Space Switch', value: '<1s', width: '98%' },
        { label: 'File Indexing', value: '1000/s', width: '91%' },
        { label: 'Search Speed', value: '<500ms', width: '96%' },
        { label: 'Team Size', value: 'Unlimited', width: '100%' }
      ],
      keyFeatures: [
        'Isolated workspaces with complete data separation',
        'Real-time collaboration and presence',
        'Role-based access control',
        'Complete audit trail for compliance'
      ]
    }
  ];

  const integrations = [
    { name: 'OpenAI', icon: Brain, status: 'active' },
    { name: 'Anthropic', icon: Sparkles, status: 'active' },
    { name: 'Google AI', icon: Globe, status: 'active' },
    { name: 'Slack', icon: MessageSquare, status: 'coming' },
    { name: 'GitHub', icon: Code, status: 'coming' },
    { name: 'Notion', icon: Layers, status: 'coming' }
  ];

  // Read the current header height from the global CSS variable
  const getHeaderOffset = () => {
    const value = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height')
    );
    return isNaN(value) ? 0 : value;
  };

  // Read header height once (assume header is in default visible state)
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

  // IntersectionObserver to keep activeFeature in sync with viewport center
  useEffect(() => {
    const ratios = new Array(features.length).fill(0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-idx');
          if (idxAttr == null) return;
          ratios[Number(idxAttr)] = entry.intersectionRatio;
        });
        // Determine index with highest ratio over threshold
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
        rootMargin: `-${headerHeight + navHeight + 100}px 0px -40% 0px`, // account for header & navbar
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
      {/* Feature Showcase (includes intro) */}
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
            Discover the tools that make DocMindLLM the most powerful AI document platform
          </motion.p>
        </div>

        {/* Sticky navigation – visible only within the Feature Showcase section */}
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              id={`feature-${index}`}
              /* IntersectionObserver handles active feature */
              className="relative"
              style={{ scrollMarginTop: `${headerHeight + navHeight + 48}px` }}
            >
              {/* Content */}
              <div className="relative">
                {/* Section Header */}
                <div className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{feature.title}</h2>
                    <p className="text-lg text-gray-400">{feature.subtitle}</p>
                  </div>
                </div>
                
                {/* Feature Grid */}
                <div className="grid lg:grid-cols-12 gap-12">
                  {/* Description Section */}
                  <div className="lg:col-span-5">
                    <h3 className="text-xl font-semibold mb-4">Overview</h3>
                    <p className="text-base text-gray-300 mb-8 leading-relaxed">{feature.description}</p>
                    
                    <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                    <div className="space-y-3">
                      {feature.keyFeatures.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats Card */}
                  <div className="lg:col-span-3">
                    <CardSpotlight className="h-full">
                      <h4 className="text-lg font-semibold mb-4">Performance</h4>
                      <div className="space-y-4">
                        {feature.stats.map((stat, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-xs text-gray-400">{stat.label}</span>
                              <span className="text-sm font-bold text-primary">{stat.value}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: stat.width }}
                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                className="bg-gradient-to-r from-primary to-emerald-400 h-1.5 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardSpotlight>
                  </div>
                  
                  {/* Visual Demo Area */}
                  <div className="lg:col-span-4">
                    <CardSpotlight className="h-full min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <div className={cn(
                          "w-20 h-20 mx-auto mb-4 rounded-lg bg-gradient-to-br flex items-center justify-center",
                          feature.gradient
                        )}>
                          <feature.icon className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-sm text-gray-500">Interactive Demo</p>
                        <p className="text-xs text-gray-600 mt-1">Coming Soon</p>
                      </div>
                    </CardSpotlight>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
              description="JavaScript, Python, and more coming soon"
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
                {integration.status === 'coming' && (
                  <p className="text-xs text-gray-600 mt-1">Coming soon</p>
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
                title: 'End-to-End Encryption',
                items: ['TLS 1.3 in transit', 'AES-256 at rest', 'Zero-knowledge architecture']
              },
              {
                icon: Shield,
                title: 'Access Control',
                items: ['RBAC system', 'SSO/SAML support', 'API key management']
              },
              {
                icon: Database,
                title: 'Data Protection',
                items: ['Automated backups', 'Disaster recovery', 'Data residency options']
              },
              {
                icon: Eye,
                title: 'Compliance',
                items: ['SOC2 (planned)', 'GDPR ready', 'HIPAA compliant']
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
      <CTASection 
        title="Experience the Power of AI"
        subtitle="Start building smarter documents today with our advanced features"
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Request Demo"
        footerText="No setup required • Start in seconds • Cancel anytime"
        showBorder={false}
      />

    </div>
  );
};

export default Features;