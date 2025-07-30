import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight,
  Edit3, BarChart3, Wand2, RefreshCw,
  Type, Brain, Shield, Zap, Package, Layers,
  MessageSquare, Building, Database, PenTool,
  Users, FileText
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
          AI-powered intelligent document creation platform that helps you analyze data, 
          generate content, and collaborate efficiently—all in one powerful solution.
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
                  <span className="text-xs text-gray-600">DocMindLLM Editor</span>
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
      title: 'Smart Editor',
      description: 'AI-powered writing assistant with real-time suggestions',
      highlight: 'Write 5x faster'
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      description: 'Transform complex data into clear insights automatically',
      highlight: 'Process in seconds'
    },
    {
      icon: Layers,
      title: 'Multi-format',
      description: 'Support for documents, spreadsheets, and presentations',
      highlight: '20+ file types'
    },
    {
      icon: MessageSquare,
      title: 'AI Assistant',
      description: 'Chat with your documents to extract information',
      highlight: 'Context-aware'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Real-time teamwork with version control',
      highlight: 'Unlimited users'
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
    { task: 'Document Creation', before: '2 hours', after: '15 minutes' },
    { task: 'Data Analysis', before: '4 hours', after: '10 minutes' },
    { task: 'Report Generation', before: '1 day', after: '30 minutes' },
    { task: 'Content Review', before: '3 hours', after: '20 minutes' }
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
            Save Time, Increase Efficiency
          </h2>
          <p className="text-lg text-gray-500">
            See how DocMindLLM transforms your workflow
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
                <th className="text-left py-4 px-6 font-normal text-gray-400">Task</th>
                <th className="text-center py-4 px-6 font-normal text-gray-400">Traditional Method</th>
                <th className="text-center py-4 px-6 font-normal text-gray-400">With DocMindLLM</th>
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
            Average time saved: <span className="text-primary">85%</span>
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
      title: 'Advanced AI Models',
      description: 'Powered by state-of-the-art language models'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and data protection'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and efficiency'
    },
    {
      icon: Package,
      title: 'Easy Integration',
      description: 'Works with your existing tools'
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
            Built with Advanced Technology
          </h2>
          <p className="text-lg text-gray-500">
            Enterprise-grade infrastructure for reliability and performance
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


// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <SolutionsSection />
      <TechAdvantagesSection />
      <CTASection />
    </div>
  );
};

export default Home;