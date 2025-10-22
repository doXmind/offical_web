import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Users } from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const Pricing = () => {
  const features = [
    'Complete AI writing assistant',
    'Unlimited documents',
    'All export formats (PDF, DOCX, HTML, etc.)',
    'Advanced content features (charts, math, code)',
    'Data analysis capabilities',
    'Full version control and history',
    'Local-first privacy',
    'No usage limits',
    'Regular updates and improvements',
    'Community support'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/10 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm text-primary font-medium">Beta Testing - Open to Everyone</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              Free Beta Access
            </h1>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto mb-8">
              Join our beta testing program and get full access to all features.
              Completely free during beta period.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="relative px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative p-12 border border-white/10 rounded-lg bg-black overflow-hidden">
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                {/* Beta Badge */}
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Beta Tester Access
                  </span>
                </div>

                {/* Price */}
                <div className="text-center mb-12">
                  <div className="text-7xl font-extralight mb-4">$0</div>
                  <p className="text-gray-500">Free for all beta testers</p>
                  <p className="text-sm text-gray-600 mt-2">Enjoy full access during beta period</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-12">
                  <h3 className="text-xl font-light mb-6 text-center">Full feature access for testers:</h3>
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-gray-400"
                    >
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  href="https://beta.doxmind.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Join Beta Testing Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Beta Section */}
      <section className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Why Join Our Beta?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be part of shaping the future of AI-powered writing. As a beta tester,
              you get early access to all features and direct influence on development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Early Access',
                description: 'Get access to cutting-edge features before official release. Test the latest AI capabilities first.'
              },
              {
                title: 'Shape the Product',
                description: 'Your feedback directly influences our roadmap. Help us build what you need.'
              },
              {
                title: 'Free Beta Access',
                description: 'Full access to all features during beta period. No credit card required.'
              },
              {
                title: 'Direct Support',
                description: 'Connect directly with developers. Get priority support and quick bug fixes.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <h3 className="text-xl font-light mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Pricing;
