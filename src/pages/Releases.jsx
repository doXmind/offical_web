import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink } from 'lucide-react';
import SEO from '../components/seo/SEO';
import CTASection from '../components/ui/cta-section';
import { ReleaseCard } from '../components/releases';
import releasesData from '../data/releases.json';

const Releases = () => {
  const { releases } = releasesData;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO path="/releases" />

      {/* Hero Section */}
      <section className="px-6 py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm text-white font-medium">Releases</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-6">
              What's New
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Stay updated with the latest features, improvements, and fixes in doXmind.
            </p>
            <a
              href="https://beta.doxmind.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all"
            >
              <Rocket className="w-5 h-5" />
              Try Latest Version
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative pl-8 border-l border-white/10">
            <div className="space-y-8">
              {releases.map((release, index) => (
                <ReleaseCard
                  key={release.version}
                  release={release}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Try the Latest Features?"
        description="Experience all the new improvements in doXmind today."
        primaryButtonText="Launch doXmind"
        primaryButtonHref="https://beta.doxmind.com/"
        primaryButtonExternal={true}
        secondaryButtonText="View Guide"
        secondaryButtonHref="/guide"
      />
    </div>
  );
};

export default Releases;
