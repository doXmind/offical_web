import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight,
  MessageSquare, Zap, BookOpen,
  GitCompare, SpellCheck, Map,
  Type, Brain, FileText, Database, CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/ui/cta-section';
import MockEditorShowcase from '../components/home/MockEditorShowcase';
import { MockEditorContainer } from '../components/home/MockEditorShowcase/components';
import {
  QuickEditScene,
  AIChatScene,
  AutocompleteScene,
  KnowledgeBaseScene,
  TextReviewScene,
  DiffAcceptScene,
} from '../components/home/MockEditorShowcase/scenes';

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
          className="text-5xl md:text-7xl font-bold tracking-widest uppercase mb-6"
        >
          <span className="text-white">Think. Write. Publish.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto tracking-wide"
        >
          The AI editor that reasons with you
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

// Feature scene map
const featureSceneMap = {
  'ai-chat': AIChatScene,
  'quick-edit': QuickEditScene,
  'diff-review': DiffAcceptScene,
  'text-review': TextReviewScene,
  'knowledge-base': KnowledgeBaseScene,
  'autocomplete': AutocompleteScene,
};

// Features Section Component - Interactive showcase with mock videos
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 'ai-chat',
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Chat with Claude AI to edit your document. AI reads, understands, and modifies your content directly.',
      highlight: 'Powered by Claude',
      color: 'from-blue-500/20 to-transparent'
    },
    {
      id: 'quick-edit',
      icon: Zap,
      title: 'Quick Edit',
      description: 'Select text and instantly improve, simplify, expand, translate, or fix grammar with one click.',
      highlight: 'One-click transforms',
      color: 'from-yellow-500/20 to-transparent'
    },
    {
      id: 'diff-review',
      icon: GitCompare,
      title: 'Diff Review',
      description: 'Review AI-suggested changes with inline diff view. Accept or reject each change individually.',
      highlight: 'Granular control',
      color: 'from-green-500/20 to-transparent'
    },
    {
      id: 'text-review',
      icon: CheckSquare,
      title: 'Text Review',
      description: 'Grammarly-like analysis with color-coded suggestions for grammar, clarity, and style improvements.',
      highlight: 'Writing quality',
      color: 'from-purple-500/20 to-transparent'
    },
    {
      id: 'knowledge-base',
      icon: Database,
      title: 'Knowledge Base',
      description: 'Upload PDFs, DOCX, or PPTX files. AI can search and reference your documents when answering.',
      highlight: 'RAG-powered',
      color: 'from-red-500/20 to-transparent'
    },
    {
      id: 'autocomplete',
      icon: Type,
      title: 'AI Autocomplete',
      description: 'Get intelligent suggestions as you type. Press Tab to accept and keep writing seamlessly.',
      highlight: 'Like GitHub Copilot',
      color: 'from-cyan-500/20 to-transparent'
    },
  ];

  // Intersection observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentFeature = features[activeFeature];
  const SceneComponent = featureSceneMap[currentFeature.id];

  return (
    <section ref={sectionRef} className="py-24 px-6">
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

        {/* Two-column layout: Feature list + Mock video */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Feature selector list */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left group relative transition-all duration-300 ${
                  activeFeature === index ? 'scale-[1.02]' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl transition-opacity duration-500 ${
                  activeFeature === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                <div className={`relative p-5 border rounded-xl transition-all duration-300 ${
                  activeFeature === index
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 hover:border-white/20 bg-black/50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeFeature === index
                        ? 'border-white/40 bg-white/10'
                        : 'border-white/20 group-hover:border-white/30'
                    }`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-light">{feature.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                          activeFeature === index
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-gray-500'
                        }`}>
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{feature.description}</p>
                    </div>
                    {activeFeature === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 mt-3"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}

            {/* View all features link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
              >
                View all features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Mock video showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <MockEditorContainer>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {SceneComponent && <SceneComponent isActive={isVisible} />}
                </motion.div>
              </AnimatePresence>
            </MockEditorContainer>

            {/* Feature indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`View ${feature.title}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section - Redesigned to guide users to User Guide
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Write in Markdown',
      description: 'Clean, distraction-free editor with full Markdown support.',
      icon: FileText,
      guideLink: '/guide#editor'
    },
    {
      number: '02',
      title: 'Get AI Assistance',
      description: 'AI autocomplete, quick edits, and chat for complex requests.',
      icon: Brain,
      guideLink: '/guide#ai-features'
    },
    {
      number: '03',
      title: 'Review & Accept',
      description: 'Review suggestions with diff view. Stay in control.',
      icon: GitCompare,
      guideLink: '/guide#diff-review'
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

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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

        {/* User Guide CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 border border-white/10 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Want to learn more?</p>
                <p className="text-sm text-gray-400">Explore our comprehensive User Guide</p>
              </div>
            </div>
            <Link
              to="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all"
            >
              Read the Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
      <HowItWorksSection />
      <BetaCTASection />
      <CTASection />
    </div>
  );
};

export default Home;
