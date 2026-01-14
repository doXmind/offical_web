import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight,
  MessageSquare, Zap, BookOpen,
  GitCompare, SpellCheck, Map,
  Type, Brain, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/ui/cta-section';
import MockEditorShowcase from '../components/home/MockEditorShowcase';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Beta Now Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight tracking-tight mb-6"
        >
          <span className="text-white">AI-Powered</span>
          <br />
          <span className="text-white">Writing Assistant</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 mb-8 max-w-3xl mx-auto"
        >
          A Markdown editor with AI autocomplete, intelligent editing, and chat assistant.
          Write better, faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://beta.doxmind.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Try doXmind
          </motion.a>
          <Link
            to="/guide"
            className="inline-flex items-center px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            View User Guide
          </Link>
        </motion.div>

        {/* Mock Editor Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <MockEditorShowcase />
        </motion.div>
      </div>
    </section>
  );
};

// Features Section Component - Updated with all features
const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Chat with Claude AI to edit your document. AI reads, understands, and modifies your content directly.',
      highlight: 'Powered by Claude',
      color: 'from-blue-500/20 to-transparent'
    },
    {
      icon: Zap,
      title: 'Quick Edit',
      description: 'Select text and instantly improve, simplify, expand, translate, or fix grammar with one click.',
      highlight: 'One-click transforms',
      color: 'from-yellow-500/20 to-transparent'
    },
    {
      icon: GitCompare,
      title: 'Diff Review',
      description: 'Review AI-suggested changes with inline diff view. Accept or reject each change individually.',
      highlight: 'Granular control',
      color: 'from-green-500/20 to-transparent'
    },
    {
      icon: SpellCheck,
      title: 'Text Review',
      description: 'Grammarly-like analysis with color-coded suggestions for grammar, clarity, and style improvements.',
      highlight: 'Writing quality',
      color: 'from-purple-500/20 to-transparent'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Upload PDFs, DOCX, or PPTX files. AI can search and reference your documents when answering.',
      highlight: 'RAG-powered',
      color: 'from-red-500/20 to-transparent'
    },
    {
      icon: Type,
      title: 'AI Autocomplete',
      description: 'Get intelligent suggestions as you type. Press Tab to accept and keep writing seamlessly.',
      highlight: 'Like GitHub Copilot',
      color: 'from-cyan-500/20 to-transparent'
    },
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
            Powerful AI Features
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Every tool you need for AI-assisted writing, from quick edits to deep document understanding
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative h-full p-6 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center mb-4 group-hover:border-white/40 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-light mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 px-2 py-1 bg-white/5 rounded-full">
                  {feature.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Write in Markdown',
      description: 'Use our clean, distraction-free editor with full Markdown support including tables, code blocks, and LaTeX.',
      icon: FileText
    },
    {
      number: '02',
      title: 'Get AI Assistance',
      description: 'AI autocomplete suggests as you type. Select text for quick edits. Open chat for complex requests.',
      icon: Brain
    },
    {
      number: '03',
      title: 'Review & Accept',
      description: 'Review AI suggestions with diff view. Accept changes you like, reject ones you don\'t. Stay in control.',
      icon: GitCompare
    },
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
            How It Works
          </h2>
          <p className="text-lg text-gray-500">
            Simple workflow, powerful results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-white/20 to-white/5" />
              )}

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 mb-4 relative">
                  <step.icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-xs font-medium rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Beta CTA Section
const BetaCTASection = () => {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-sm text-gray-400">Beta Available Now</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Try doXmind Today
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Start writing with AI assistance. No installation required.
          </p>
        </motion.div>

        <motion.a
          href="https://beta.doxmind.com/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all text-lg"
        >
          <Sparkles className="w-6 h-6" />
          Launch App
          <ArrowRight className="w-5 h-5" />
        </motion.a>
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
      <HowItWorksSection />
      <BetaCTASection />
      <CTASection />
    </div>
  );
};

export default Home;
