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
            {/* Beta Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-primary font-medium">Beta Testing Now Open</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              Transform your workflow
            </h1>

            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Join our beta program and explore powerful solutions for documents, research, and content creation.
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
                id={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="scroll-mt-24"
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
                      <a
                        href="https://beta.doxmind.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      >
                        <span className="text-sm">Try it now</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
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

export default Solutions;