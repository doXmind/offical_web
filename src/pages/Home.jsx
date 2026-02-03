import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { EmbeddedEditor } from '../components/home/EmbeddedEditor';
import { DemoContainer } from '../components/home/FullDemoVideo/components';
import {
  AIChatScene,
  DiffReviewScene,
  QuickEditScene,
  TextReviewScene,
} from '../components/home/FullDemoVideo/scenes';

// Feature showcase container - pure black/white style
const FeatureShowcase = ({ children, className = '' }) => (
  <div className={`relative rounded-2xl overflow-hidden border border-white/[0.08] ${className}`}>
    {children}
  </div>
);

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-8 pt-24 pb-16 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto text-center z-10 w-full">
        {/* Product Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10">
            <img src="/logo.svg" alt="doXmind" className="w-10 h-10" />
          </div>
        </motion.div>

        {/* Product Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(3rem,10vw,6rem)] font-semibold tracking-tight leading-[1] mb-6 text-white"
        >
          doXmind
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto"
        >
          Try with Beta now available, or enjoy full AI writing features for free for a limited time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
        >
          <a
            href="https://beta.doxmind.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-all duration-200 min-w-[180px]"
          >
            Try doXmind
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/guide"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base text-white/80 font-medium rounded-full border border-white/20 hover:bg-white/[0.04] hover:border-white/30 transition-all duration-200 min-w-[180px]"
          >
            User Guide
          </Link>
        </motion.div>

        {/* Hero Demo - Embedded Editor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <EmbeddedEditor />
        </motion.div>
      </div>
    </section>
  );
};

// Feature Section with text + mock GUI
const FeatureSection = ({
  title,
  description,
  children,
  reverse = false,
  badge,
}) => {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={reverse ? 'lg:order-2' : ''}
          >
            {badge && (
              <span className="inline-block text-xs font-medium text-white/60 mb-4 uppercase tracking-wider">
                {badge}
              </span>
            )}
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg">
              {description}
            </p>
          </motion.div>

          {/* Mock GUI */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            <FeatureShowcase>
              {children}
            </FeatureShowcase>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Polished mock previews for platform cards
const EditorMockPreview = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    {/* Floating editor window */}
    <div className="w-full max-w-[280px] bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="flex-1 text-center text-[9px] text-white/40">Project Brief.md</span>
      </div>
      {/* Editor content */}
      <div className="p-4 space-y-3">
        <h3 className="text-[11px] font-semibold text-white">Project Overview</h3>
        <p className="text-[9px] text-white/50 leading-relaxed">
          This document outlines the key objectives and milestones for Q4 2024.
        </p>
        <div className="pt-2">
          <h4 className="text-[10px] font-medium text-white/80 mb-1">Key Goals</h4>
          <ul className="text-[9px] text-white/40 space-y-1">
            <li>• Launch beta version</li>
            <li>• Reach 1000 users</li>
            <li>• Improve AI accuracy</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const DiffMockPreview = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    {/* Floating diff window */}
    <div className="w-full max-w-[280px] bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Review banner */}
      <div className="flex items-center justify-between px-3 py-2 bg-amber-500/10 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[9px] text-amber-300 font-medium">2 changes pending</span>
        </div>
        <div className="flex gap-1">
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">Accept All</span>
        </div>
      </div>
      {/* Diff content */}
      <div className="p-4 space-y-3">
        <p className="text-[9px] text-white/60 leading-relaxed">
          The project showed{' '}
          <span className="bg-red-500/20 text-red-300 line-through px-0.5">good</span>{' '}
          <span className="bg-green-500/20 text-green-300 px-0.5">exceptional</span>{' '}
          results while identifying{' '}
          <span className="bg-red-500/20 text-red-300 line-through px-0.5">some</span>{' '}
          <span className="bg-green-500/20 text-green-300 px-0.5">key</span>{' '}
          areas for improvement.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-[8px] text-green-400">+2 improved</span>
          <span className="text-[8px] text-red-400">-2 removed</span>
        </div>
      </div>
    </div>
  </div>
);

const ChatMockPreview = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    {/* Floating chat window */}
    <div className="w-full max-w-[280px] bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-[8px]">✦</span>
        </div>
        <span className="text-[9px] text-white/60 font-medium">AI Assistant</span>
      </div>
      {/* Chat messages */}
      <div className="p-3 space-y-2">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[180px] px-2.5 py-1.5 rounded-lg bg-white/10 text-[9px] text-white/80">
            Make this introduction more engaging
          </div>
        </div>
        {/* AI response */}
        <div className="flex justify-start">
          <div className="max-w-[200px] px-2.5 py-1.5 rounded-lg bg-white/5 text-[9px] text-white/60">
            Done! I've enhanced the opening with a stronger hook and clearer value proposition.
          </div>
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 mt-3 px-2 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="flex-1 text-[8px] text-white/30">Ask AI anything...</span>
          <div className="w-5 h-5 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  </div>
);

// Platform Cards Section
const PlatformSection = () => {
  const platforms = [
    {
      title: 'Start in the Web Editor',
      description: 'Full-featured writing experience with AI assistance, right in your browser.',
      cta: 'Try doXmind',
      ctaHref: 'https://beta.doxmind.com/',
      external: true,
      preview: <EditorMockPreview />,
    },
    {
      title: 'Review AI suggestions',
      description: 'Accept or reject changes with inline diff view. Full control over your content.',
      cta: 'Learn more',
      ctaHref: '/features',
      external: false,
      preview: <DiffMockPreview />,
    },
    {
      title: 'Chat with your documents',
      description: 'AI reads, understands, and modifies your content directly through conversation.',
      cta: 'User Guide',
      ctaHref: '/guide',
      external: false,
      preview: <ChatMockPreview />,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-tight mb-4">
            The same AI everywhere you write
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Use doXmind across web, desktop, and mobile—all connected by your account.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              {/* Card Preview */}
              <div className="relative aspect-[4/3] bg-gradient-to-b from-white/[0.03] to-transparent">
                {platform.preview}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{platform.title}</h3>
                <p className="text-sm text-white/44 mb-4 leading-relaxed">
                  {platform.description}
                </p>

                {/* CTA Button */}
                {platform.external ? (
                  <a
                    href={platform.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-full border border-white/20 hover:bg-white/[0.04] transition-all"
                  >
                    {platform.cta}
                  </a>
                ) : (
                  <Link
                    to={platform.ctaHref}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-full border border-white/20 hover:bg-white/[0.04] transition-all"
                  >
                    {platform.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const CTASection = () => {
  return (
    <section className="relative py-32 md:py-40 px-5 md:px-8 overflow-hidden border-t border-white/[0.06]">
      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight mb-4 leading-tight">
            Try doXmind today
          </h2>
          <p className="text-lg text-white/50 mb-10">
            Try with Beta now available, or enjoy full AI writing features for free for a limited time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://beta.doxmind.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Try doXmind
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/guide"
              className="inline-flex items-center justify-center px-8 py-4 text-base text-white/80 font-medium rounded-full border border-white/20 hover:bg-white/[0.04] transition-all duration-200"
            >
              User Guide
            </Link>
          </div>
        </motion.div>
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

      {/* Feature: AI Chat */}
      <FeatureSection
        badge="AI Chat"
        title="Built to drive real writing work"
        description="From routine edits to your hardest writing tasks, doXmind reliably completes work end to end—drafting content, improving style, fixing grammar, and more—powered by Claude's frontier language models."
      >
        <DemoContainer showControls={false} showWindowBar={true}>
          <AIChatScene isActive={true} />
        </DemoContainer>
      </FeatureSection>

      {/* Feature: Diff Review */}
      <FeatureSection
        badge="Diff Review"
        title="Designed for granular control"
        description="Review AI-suggested changes with inline diff view. Accept or reject each change individually—so you stay in control and your content ships with confidence."
        reverse={true}
      >
        <DemoContainer showControls={false} showWindowBar={true}>
          <DiffReviewScene isActive={true} />
        </DemoContainer>
      </FeatureSection>

      {/* Feature: Quick Edit */}
      <FeatureSection
        badge="Quick Edit"
        title="One-click transformations"
        description="Select text and instantly improve, simplify, expand, translate, or fix grammar. Quick Edit gives you fast access to common AI actions without leaving your writing flow."
      >
        <DemoContainer showControls={false} showWindowBar={true}>
          <QuickEditScene isActive={true} />
        </DemoContainer>
      </FeatureSection>

      {/* Feature: Text Review */}
      <FeatureSection
        badge="Text Review"
        title="Writing quality analysis"
        description="Grammarly-like analysis with color-coded suggestions for grammar, clarity, and style improvements. Get comprehensive feedback on your writing quality."
        reverse={true}
      >
        <DemoContainer showControls={false} showWindowBar={true}>
          <TextReviewScene isActive={true} />
        </DemoContainer>
      </FeatureSection>

      {/* Platform Cards */}
      <PlatformSection />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
};

export default Home;
