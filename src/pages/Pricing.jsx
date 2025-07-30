import React, { useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const Pricing = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Read the current header height from the global CSS variable
  const getHeaderOffset = () => {
    const value = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height')
    );
    return isNaN(value) ? 0 : value;
  };

  // Update header height when it changes
  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      setHeaderHeight(getHeaderOffset());
    };

    updateHeaderHeight();
    
    // Listen for changes to the CSS variable
    const observer = new MutationObserver(updateHeaderHeight);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  const pricingTiers = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for trying out DocMindLLM',
      features: [
        '10 documents per month',
        'Basic AI writing assistant',
        'Standard template library',
        'Community support',
        'Basic export options'
      ],
      cta: 'Try Free'
    },
    {
      name: 'Plus',
      price: 19,
      period: '/month',
      description: 'For professionals and creators',
      recommended: true,
      features: [
        '100 documents per month',
        'Full AI feature suite',
        'Advanced templates & styles',
        'Priority email support',
        'All export formats',
        'Custom branding'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Pro/Team',
      price: 49,
      period: '/month/user',
      description: 'For teams that need more',
      features: [
        'Unlimited documents',
        'Team collaboration tools',
        'API access',
        'Advanced analytics',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee'
      ],
      cta: 'Contact Sales'
    }
  ];

  const featureCategories = [
    {
      name: 'Basic Features',
      features: [
        { name: 'Documents per month', free: '10', plus: '100', pro: 'Unlimited' },
        { name: 'AI Writing Assistant', free: 'Basic', plus: 'Advanced', pro: 'Advanced' },
        { name: 'Template Library', free: 'Standard', plus: 'Premium', pro: 'Premium + Custom' },
        { name: 'Export Formats', free: 'PDF, DOCX', plus: 'All formats', pro: 'All formats' }
      ]
    },
    {
      name: 'AI Features',
      features: [
        { name: 'Smart Editor', free: false, plus: true, pro: true },
        { name: 'Data Analysis Engine', free: false, plus: true, pro: true },
        { name: 'Multi-modal Processing', free: false, plus: true, pro: true },
        { name: 'Custom AI Training', free: false, plus: false, pro: true }
      ]
    },
    {
      name: 'Collaboration',
      features: [
        { name: 'Users', free: '1', plus: '1', pro: 'Unlimited' },
        { name: 'Real-time Collaboration', free: false, plus: false, pro: true },
        { name: 'Permission Management', free: false, plus: false, pro: true },
        { name: 'Version Control', free: false, plus: true, pro: true }
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { name: 'API Access', free: false, plus: false, pro: true },
        { name: 'Custom Integrations', free: false, plus: false, pro: true },
        { name: 'White Label Options', free: false, plus: false, pro: true },
        { name: 'Analytics Dashboard', free: false, plus: 'Basic', pro: 'Advanced' }
      ]
    },
    {
      name: 'Support & Security',
      features: [
        { name: 'Support', free: 'Community', plus: 'Email (24h)', pro: 'Priority (1h)' },
        { name: 'Data Encryption', free: true, plus: true, pro: true },
        { name: 'Compliance Certs', free: false, plus: false, pro: true },
        { name: 'SLA Guarantee', free: false, plus: false, pro: '99.9%' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I choose the right plan?',
      answer: 'Start with Free to explore basic features. Choose Plus if you need advanced AI capabilities and more documents. Pro/Team is ideal for collaborative work and unlimited usage.'
    },
    {
      question: 'Can I upgrade or downgrade anytime?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.'
    },
    {
      question: 'How does team billing work?',
      answer: 'Pro/Team requires a minimum of 3 users. You\'re billed per user monthly or yearly, and you can add or remove team members anytime.'
    },
    {
      question: 'What happens if I exceed my document limit?',
      answer: 'You\'ll receive a notification when approaching your limit. You can upgrade your plan or wait for the next billing cycle for your quota to reset.'
    },
    {
      question: 'Is there a yearly discount?',
      answer: 'Yes! Save 20% with annual billing. That\'s 2.4 months free compared to monthly pricing.'
    },
    {
      question: 'What\'s your refund policy?',
      answer: 'We offer a 30-day money-back guarantee for Plus and Pro plans. No questions asked.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always flexible to scale up or down.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Pricing Cards */}
      <section className="relative px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative h-full p-8 border border-white/10 rounded-lg transition-all duration-300 hover:border-white/30 bg-black overflow-hidden flex flex-col">
                  {/* Subtle gradient background for recommended */}
                  {tier.recommended && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                  )}
                  {/* Content with z-index to stay above gradient */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Tier Name with icon */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-light">{tier.name}</h3>
                      {tier.recommended && (
                        <Star className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-6">{tier.description}</p>
                    
                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-extralight">
                        ${tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-gray-500 text-sm ml-2">{tier.period}</span>
                      )}
                    </div>
                    
                    {/* Features - flex-grow to push button down */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button - always at bottom */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-lg font-medium transition-all border border-white/20 hover:bg-white/5"
                    >
                      {tier.cta}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Compare features
            </h2>
            <p className="text-gray-600">
              See all features across our plans
            </p>
          </motion.div>

          <div className="relative -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible">
            <table className="w-full min-w-[640px] md:min-w-0">
              <thead 
                className="md:sticky z-30 transition-all duration-300"
                style={{ top: `${headerHeight}px` }}
              >
                <tr className="bg-black shadow-[0_1px_0_0_rgba(255,255,255,0.1),0_4px_6px_-4px_rgba(0,0,0,0.5)]">
                  <th className="text-left py-4 px-4 font-normal bg-black"></th>
                  <th className="text-center py-4 px-4 font-medium text-white bg-black">Free</th>
                  <th className="text-center py-4 px-4 font-medium text-white bg-black">Plus</th>
                  <th className="text-center py-4 px-4 font-medium text-white bg-black">Pro/Team</th>
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category, categoryIdx) => (
                  <React.Fragment key={categoryIdx}>
                    <tr>
                      <td colSpan={4} className="pt-8 pb-4">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {category.name}
                        </h3>
                      </td>
                    </tr>
                    {category.features.map((feature, featureIdx) => (
                      <tr key={featureIdx} className="border-b border-white/5">
                        <td className="py-4 px-4 text-sm text-gray-400">{feature.name}</td>
                        <td className="py-4 px-4 text-center">
                          {typeof feature.free === 'boolean' ? (
                            feature.free ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-700 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-400">{feature.free}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof feature.plus === 'boolean' ? (
                            feature.plus ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-700 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-400">{feature.plus}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? (
                              <Check className="w-4 h-4 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-700 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-400">{feature.pro}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start justify-between py-6 border-b border-white/5 group-hover:border-white/10 transition-colors">
                    <h3 className="text-lg font-light pr-8 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className="mt-1">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors" />
                      )}
                    </div>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="py-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Start Your Journey Today"
        subtitle="Choose any plan and upgrade anytime as your needs grow"
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Talk to Sales"
        footerText="30-day money back guarantee • No hidden fees • Cancel anytime"
        showBorder={false}
        padding="p-16"
      />

    </div>
  );
};

export default Pricing;