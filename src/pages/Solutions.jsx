import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Microscope, 
  Brain, 
  PenTool,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const Solutions = () => {
  const solutions = [
    {
      id: 'enterprise-reporting',
      title: 'Enterprise Reporting',
      description: 'Transform data chaos into clarity with AI-powered reporting that delivers insights 800% faster',
      icon: BarChart3,
      features: [
        'Real-time data processing',
        'Automated insights generation',
        'Custom dashboard creation',
        'Predictive analytics'
      ],
      stats: {
        primary: '800%',
        label: 'Faster Reporting'
      }
    },
    {
      id: 'research-management',
      title: 'Research Management',
      description: 'Navigate vast knowledge landscapes with AI that accelerates discovery by 10x',
      icon: Microscope,
      features: [
        'Intelligent literature review',
        'Citation network mapping',
        'Automated summarization',
        'Cross-reference analysis'
      ],
      stats: {
        primary: '10x',
        label: 'Faster Research'
      }
    },
    {
      id: 'knowledge-base',
      title: 'Knowledge Base',
      description: 'Build a living repository that learns, grows, and delivers instant answers',
      icon: Brain,
      features: [
        'Semantic search engine',
        'Auto-categorization',
        'Version control system',
        'Smart recommendations'
      ],
      stats: {
        primary: '90%',
        label: 'Faster Access'
      }
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description: 'Scale your content operations with AI that maintains your unique voice',
      icon: PenTool,
      features: [
        'Multi-format generation',
        'Brand voice consistency',
        'SEO optimization',
        'Performance analytics'
      ],
      stats: {
        primary: '5x',
        label: 'Content Output'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Clean Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 mb-8"
            >
              <Sparkles className="w-3 h-3" />
              <span className="text-xs uppercase tracking-wider">Solutions</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              Transform your workflow
            </h1>
            
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Four powerful solutions working together to revolutionize how you handle documents, research, and content creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative h-full">
                  {/* Card */}
                  <div className="relative h-full p-8 md:p-10 border border-white/10 rounded-lg transition-all duration-500 hover:border-white/30 bg-black">
                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-[-1px] rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded border border-white/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-white/40">
                        <solution.icon className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-light mb-3">{solution.title}</h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 mb-8 leading-relaxed">
                        {solution.description}
                      </p>

                      {/* Stats */}
                      <div className="mb-8">
                        <div className="text-4xl font-extralight mb-1">
                          {solution.stats.primary}
                        </div>
                        <div className="text-sm text-gray-600 uppercase tracking-wider">
                          {solution.stats.label}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {solution.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-1 h-1 rounded-full bg-white/30" />
                            <span className="group-hover:text-gray-400 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      >
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">
              Trusted by forward-thinking teams
            </h2>
            <p className="text-gray-600">
              Measurable impact across every metric that matters
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { value: '10M+', label: 'Documents Processed' },
              { value: '50K+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extralight mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Find Your Perfect Solution"
        subtitle="Let our experts help you choose the right plan for your team's unique needs"
        primaryButtonText="Contact Sales"
        secondaryButtonText="Compare Plans"
        footerText="Get personalized recommendations • Expert consultation included"
        showBorder={false}
      />
    </div>
  );
};

export default Solutions;