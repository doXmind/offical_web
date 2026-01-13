import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight,
  Edit3, Wand2,
  Type, Zap, MessageSquare,
  Clock, Search, CheckCircle,
  Languages, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/ui/cta-section';

// Hero Section Component
const HeroSection = () => {
  const [demoText, setDemoText] = useState('');
  const fullDemoText = "Transform your ideas into compelling content with AI-powered suggestions...";

  useEffect(() => {
    if (demoText.length < fullDemoText.length) {
      const timeout = setTimeout(() => {
        setDemoText(fullDemoText.slice(0, demoText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDemoText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [demoText, fullDemoText]);

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
          A Markdown editor with AI autocomplete, quick edit commands, and chat assistant.
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

        {/* Demo Editor */}
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
                      {demoText.length > 0 && demoText.length < fullDemoText.length && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>AI autocomplete suggestion...</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 pt-4 border-t border-white/5">
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                      <Wand2 className="w-4 h-4" />
                      <span>Quick Edit</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>AI Chat</span>
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
      icon: Zap,
      title: 'Quick Edit',
      description: 'Select text and instantly fix grammar, improve, simplify, expand, or translate',
      highlight: 'One-click AI edits'
    },
    {
      icon: Sparkles,
      title: 'AI Autocomplete',
      description: 'Get smart suggestions as you type. Press Tab to accept.',
      highlight: 'Like GitHub Copilot'
    },
    {
      icon: MessageSquare,
      title: 'AI Chat',
      description: 'Chat with Claude AI about your document. Ask questions or request edits.',
      highlight: 'Powered by Claude'
    },
    {
      icon: FileText,
      title: 'Markdown Editor',
      description: 'Full Markdown support with formatting toolbar, code blocks, and tables',
      highlight: 'TipTap-based editor'
    },
    {
      icon: Clock,
      title: 'Version History',
      description: 'Track all changes with automatic snapshots. Restore any previous version.',
      highlight: 'Never lose work'
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
            Core Features
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need for AI-assisted writing
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
                <p className="text-xs text-gray-400">{feature.highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Quick Edit Commands Section
const QuickEditSection = () => {
  const commands = [
    { name: 'Fix Grammar', icon: CheckCircle, desc: 'Correct spelling and grammar errors' },
    { name: 'Improve', icon: Sparkles, desc: 'Enhance writing quality and clarity' },
    { name: 'Simplify', icon: Type, desc: 'Use simpler language' },
    { name: 'Expand', icon: Edit3, desc: 'Add more detail' },
    { name: 'Shorten', icon: Zap, desc: 'Make text concise' },
    { name: 'Translate', icon: Languages, desc: 'English/Chinese translation' }
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extralight mb-4">
            Quick Edit Commands
          </h2>
          <p className="text-lg text-gray-500">
            Select any text and transform it instantly with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {commands.map((cmd, index) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <cmd.icon className="w-5 h-5 text-white" />
                <span className="font-medium">{cmd.name}</span>
              </div>
              <p className="text-sm text-gray-500">{cmd.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500">
            Also supports: Change Tone (Professional/Casual)
          </p>
        </motion.div>
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
      <QuickEditSection />
      <BetaCTASection />
      <CTASection />
    </div>
  );
};

export default Home;
