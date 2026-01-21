import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import SEO from '../components/seo/SEO';
import ContinuousDemo from '../components/home/FullDemoVideo/ContinuousDemo';

const Demo = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO path="/demo" />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <img alt="doXmind Logo" className="h-8 w-8" src="/logo.svg" />
            <span className="text-xl tracking-tight">
              <span className="font-light">do</span>
              <span className="font-black">X</span>
              <span className="font-light">mind</span>
            </span>
          </div>

          <a
            href="https://beta.doxmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try Beta
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              See doXmind in Action
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Watch a complete workflow: writing an academic paper on "AI in Healthcare"
              using all of doXmind's AI-powered features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Play className="w-4 h-4" />
              <span>Continuous demo</span>
            </div>
            <span className="text-gray-700">•</span>
            <span className="text-sm text-gray-500">100 seconds</span>
            <span className="text-gray-700">•</span>
            <span className="text-sm text-gray-500">Complete essay workflow</span>
          </motion.div>
        </section>

        {/* Demo Video */}
        <section className="px-4">
          <ContinuousDemo />
        </section>

        {/* Timeline Features */}
        <section className="mt-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Demo Timeline</h2>
          <div className="space-y-3">
            {[
              { time: '0-6s', name: 'Create Document', desc: 'Start a new academic paper on AI in Healthcare' },
              { time: '6-14s', name: 'Write + Autocomplete', desc: 'Type first sentence, AI suggests completion' },
              { time: '14-26s', name: 'Knowledge Base', desc: 'Upload 4 files (WHO PDF, Nature Medicine, PPTX, FDA)' },
              { time: '26-50s', name: 'AI Essay Planning', desc: 'Activate essay skill → KB search → Web search → Outline' },
              { time: '50-58s', name: 'User Confirmation', desc: 'Provide word count, style, and focus preferences' },
              { time: '58-78s', name: 'Full Essay Generation', desc: 'AI writes 2,850-word essay with APA citations' },
              { time: '78-90s', name: 'Section Refinement', desc: 'Select section, ask AI to add 2024 statistics' },
              { time: '90-100s', name: 'Quick Edit', desc: 'Improve conclusion with one-click AI polish' },
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg"
              >
                <div className="text-xs text-blue-400 font-mono w-16 flex-shrink-0">{item.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="text-[11px] text-gray-500">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to try it yourself?</h2>
            <p className="text-gray-400 mb-6">
              Experience the future of AI-powered writing.
            </p>
            <a
              href="https://beta.doxmind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Start Writing with doXmind
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-sm text-gray-600">
          Think. Write. Publish. — doXmind
        </p>
      </footer>
    </div>
  );
};

export default Demo;
