import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight,
  MessageSquare, Zap, BookOpen,
  GitCompare, SpellCheck, Map,
  Type, Brain, FileText, Database, CheckSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
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
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-20">
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-white/30 bg-white/10 rounded-full mb-4 md:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          <span className="text-xs md:text-sm text-white font-medium">Beta Now Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-wider md:tracking-widest uppercase mb-3 md:mb-6"
        >
          <span className="text-white">Think. Write. Publish.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base md:text-xl text-gray-400 mb-5 md:mb-8 max-w-3xl mx-auto tracking-wide"
        >
          The AI editor that reasons with you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-row items-center justify-center gap-2 md:gap-4"
        >
          <motion.a
            href="https://beta.doxmind.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-8 py-2.5 md:py-4 bg-white text-black text-sm md:text-base font-medium rounded-lg hover:bg-gray-200 transition-all"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            Try doXmind
          </motion.a>
          <Link
            to="/guide"
            className="inline-flex items-center px-4 md:px-8 py-2.5 md:py-4 text-sm md:text-base border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            User Guide
          </Link>
        </motion.div>

        {/* Mock Editor Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 md:mt-20"
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
    <section ref={sectionRef} className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-extralight mb-2 md:mb-4">
            Powerful AI Features
          </h2>
          <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
            Every tool you need for AI-assisted writing
          </p>
        </motion.div>

        {/* Two-column layout: Feature list + Mock video */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Left: Feature selector list */}
          <div className="space-y-2 md:space-y-3 order-2 lg:order-1">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left group relative transition-all duration-300 ${
                  activeFeature === index ? 'scale-[1.01] md:scale-[1.02]' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-lg md:rounded-xl transition-opacity duration-500 ${
                  activeFeature === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                <div className={`relative p-3 md:p-5 border rounded-lg md:rounded-xl transition-all duration-300 ${
                  activeFeature === index
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 hover:border-white/20 bg-black/50'
                }`}>
                  <div className="flex items-start gap-2.5 md:gap-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                      activeFeature === index
                        ? 'border-white/40 bg-white/10'
                        : 'border-white/20 group-hover:border-white/30'
                    }`}>
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                        <h3 className="text-sm md:text-lg font-light">{feature.title}</h3>
                        <span className={`hidden sm:inline text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                          activeFeature === index
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-gray-500'
                        }`}>
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-1 md:line-clamp-2">{feature.description}</p>
                    </div>
                    {activeFeature === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white flex-shrink-0 mt-2 md:mt-3"
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
              className="pt-2 md:pt-4"
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-500 hover:text-white transition-colors"
              >
                View all features
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Mock video showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 order-1 lg:order-2"
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
            <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-white w-4 md:w-6'
                      : 'bg-white/30 hover:bg-white/50 w-1.5 md:w-2'
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
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-extralight mb-2 md:mb-4">
            How It Works
          </h2>
          <p className="text-sm md:text-lg text-gray-500">
            Simple workflow, powerful results
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-3 md:gap-8 mb-8 md:mb-12">
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
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 mb-2 md:mb-4 relative">
                  <step.icon className="w-4 h-4 md:w-7 md:h-7 text-white" />
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-white text-black text-[10px] md:text-xs font-medium rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xs md:text-lg font-medium mb-1 md:mb-2">{step.title}</h3>
                <p className="hidden md:block text-sm text-gray-500 leading-relaxed">{step.description}</p>
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
          <div className="inline-flex flex-row items-center gap-3 md:gap-4 p-3 md:p-6 border border-white/10 rounded-xl md:rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-white text-sm md:text-base font-medium">Want to learn more?</p>
                <p className="text-xs md:text-sm text-gray-400">Explore our User Guide</p>
              </div>
            </div>
            <Link
              to="/guide"
              className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-black text-xs md:text-base font-medium rounded-lg hover:bg-gray-200 transition-all"
            >
              Read Guide
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
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
    <section className="py-12 md:py-24 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-full mb-4 md:mb-6">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
            </span>
            <span className="text-xs md:text-sm text-gray-400">Beta Available Now</span>
          </div>

          <h2 className="text-2xl md:text-5xl font-extralight mb-2 md:mb-4">
            Try doXmind Today
          </h2>
          <p className="text-sm md:text-lg text-gray-500 mb-5 md:mb-8">
            Start writing with AI. No installation required.
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
          className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all text-sm md:text-lg"
        >
          <Sparkles className="w-4 h-4 md:w-6 md:h-6" />
          Launch App
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.a>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO path="/" />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BetaCTASection />
      <CTASection />
    </div>
  );
};

export default Home;
