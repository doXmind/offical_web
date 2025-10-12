import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight,
  Edit3, BarChart3, Wand2, RefreshCw,
  Type, Brain, Shield, Zap, Package, Layers,
  MessageSquare, Building, Database, PenTool,
  Users, FileText, Download, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/ui/cta-section';

// Hero Section Component
const HeroSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [demoText, setDemoText] = useState('');
  const fullDemoText = "Transform your ideas into compelling content with AI-powered suggestions...";

  useEffect(() => {
    if (isTyping && demoText.length < fullDemoText.length) {
      const timeout = setTimeout(() => {
        setDemoText(fullDemoText.slice(0, demoText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, demoText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight tracking-tight mb-6"
        >
          <span className="text-white">Transform Every Idea into</span>
          <br />
          <span className="text-white">Professional Content</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 mb-8 max-w-3xl mx-auto"
        >
          AI-powered desktop editor that helps you write, analyze data,
          and create professional documents with ease.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsTyping(true)}
            className="px-8 py-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
          >
            Try It Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Simplified Demo Editor */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="border border-white/10 rounded-lg bg-black">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-white/20 rounded-full" />
                    <div className="w-3 h-3 border border-white/20 rounded-full" />
                    <div className="w-3 h-3 border border-white/20 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-600">doXmind Editor</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Type className="w-5 h-5 text-gray-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-400 text-left">
                        {demoText}
                        <span className="animate-pulse">|</span>
                      </p>
                      {isTyping && demoText.length > 20 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>AI is generating suggestions...</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 pt-4 border-t border-white/5">
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                      <Wand2 className="w-4 h-4" />
                      <span>Auto-complete</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      <span>Rewrite</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      <span>Analyze</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: Edit3,
      title: 'Smart Writing',
      description: 'AI helps you write better with auto-complete and instant improvements',
      highlight: 'Write faster & better'
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      description: 'Analyze your data files and generate insights automatically',
      highlight: 'No coding needed'
    },
    {
      icon: Layers,
      title: 'Rich Content',
      description: 'Add charts, diagrams, tables, and formulas to your documents',
      highlight: 'Professional results'
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Chat with AI to help you research, analyze, and create content',
      highlight: 'Always ready to help'
    },
    {
      icon: Users,
      title: 'Organized Workspace',
      description: 'Keep different projects separate with dedicated workspaces',
      highlight: 'Stay organized'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Comprehensive AI-Powered Features
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to create, analyze, and collaborate efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
                <div className="w-10 h-10 rounded border border-white/20 flex items-center justify-center mb-4 group-hover:border-white/40 transition-colors">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{feature.description}</p>
                <p className="text-xs text-gray-600">{feature.highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Comparison Section Component
const ComparisonSection = () => {
  const comparisonData = [
    { task: 'AI Autocomplete', before: 'Manual typing', after: 'Context-aware suggestions' },
    { task: 'Data Analysis', before: 'Python scripting', after: 'Natural language queries' },
    { task: 'Chart Creation', before: 'Manual ECharts config', after: 'AI-generated JSON' },
    { task: 'Document Editing', before: 'Full rewrites', after: 'Line-level precision edits' }
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            AI-Enhanced Workflow
          </h2>
          <p className="text-lg text-gray-500">
            See how doXmind enhances your document workflow
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-lg border border-white/10"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 font-normal text-gray-400">Feature</th>
                <th className="text-center py-4 px-6 font-normal text-gray-400">Traditional Editors</th>
                <th className="text-center py-4 px-6 font-normal text-gray-400">doXmind</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5"
                >
                  <td className="py-4 px-6">{item.task}</td>
                  <td className="py-4 px-6 text-center text-gray-500">{item.before}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-primary">{item.after}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-2xl font-extralight">
            <span className="text-primary">Powerful • Fast • Secure</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Solutions Section Component
const SolutionsSection = () => {
  const solutions = [
    {
      icon: Building,
      title: 'Enterprise Reporting',
      description: 'Automate complex reports and dashboards with AI-driven insights',
      link: '/solutions#enterprise-reporting'
    },
    {
      icon: FileText,
      title: 'Research Management',
      description: 'Organize and analyze research data with intelligent categorization',
      link: '/solutions#research-management'
    },
    {
      icon: Database,
      title: 'Knowledge Base',
      description: 'Build searchable repositories with automatic tagging and indexing',
      link: '/solutions#knowledge-base'
    },
    {
      icon: PenTool,
      title: 'Content Creation',
      description: 'Generate high-quality content with AI assistance and templates',
      link: '/solutions#content-creation'
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Solutions for Every Team
          </h2>
          <p className="text-lg text-gray-500">
            Tailored solutions for different industries and use cases
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={solution.link} className="block group">
                <div className="h-full p-6 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded border border-white/20 flex items-center justify-center mb-4 group-hover:border-white/40 transition-colors">
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-light mb-2">{solution.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{solution.description}</p>
                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-400 transition-colors">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Advantages Section Component
const TechAdvantagesSection = () => {
  const advantages = [
    {
      icon: Brain,
      title: 'Intelligent AI',
      description: 'Advanced AI that understands your content and helps you work smarter'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your computer, giving you complete control'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Native desktop app built for speed and performance'
    },
    {
      icon: Package,
      title: 'Open Source',
      description: 'Free and open source software you can trust'
    }
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-gray-500">
            Professional-grade architecture for desktop performance and flexibility
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                <advantage.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light mb-2">{advantage.title}</h3>
              <p className="text-sm text-gray-500">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Download Section Component
const DownloadSection = () => {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Download doXmind Desktop
          </h2>
          <p className="text-lg text-gray-500">
            Available for Windows • macOS and Linux coming soon
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Windows x64 Installer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="h-full p-8 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300 bg-black">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-lg border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <Monitor className="w-7 h-7" />
                </div>
                <span className="text-xs text-gray-600 px-3 py-1 border border-white/10 rounded-full">
                  Windows-x64
                </span>
              </div>
              <h3 className="text-xl font-light mb-2">Windows Installer</h3>
              <p className="text-sm text-gray-500 mb-6">
                Fast and easy installation for Windows 64-bit systems
              </p>
              <div className="space-y-2 mb-6 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Version 0.0.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Windows 10/11 (x64)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Quick installation</span>
                </div>
              </div>
              <a
                href="https://doxmind.s3.amazonaws.com/doXmind_0.0.1_x64-setup.exe"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Windows-x64
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600">
            System Requirements: Windows 10/11 (x64) • 4GB RAM • 500MB disk space
          </p>
          <p className="text-xs text-gray-700 mt-2">
            View all releases on{' '}
            <a
              href="https://github.com/DocMind-AI-Native-Editor/Desktop/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <DownloadSection />
      <FeaturesSection />
      <ComparisonSection />
      <SolutionsSection />
      <TechAdvantagesSection />
      <CTASection />
    </div>
  );
};

export default Home;