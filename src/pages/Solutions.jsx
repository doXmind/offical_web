import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  GraduationCap,
  Briefcase,
  PenTool,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import CTASection from '../components/ui/cta-section';

const Solutions = () => {
  const solutions = [
    {
      id: 'professional-writing',
      title: 'Professional Writing',
      description: 'Create polished business documents, reports, and proposals with AI assistance that helps you maintain a professional tone.',
      icon: Briefcase,
      features: [
        'Quick Edit to improve writing quality',
        'Tone adjustment for professional context',
        'Grammar and spelling correction',
        'Real-time AI suggestions'
      ]
    },
    {
      id: 'academic-research',
      title: 'Academic Research',
      description: 'Write research papers, literature reviews, and academic content with AI-powered assistance for clarity and structure.',
      icon: GraduationCap,
      features: [
        'Expand ideas with more detail',
        'Simplify complex explanations',
        'Multi-language translation support',
        'Version history for drafts'
      ]
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description: 'Produce blog posts, articles, and marketing content efficiently with AI that helps maintain your unique voice.',
      icon: PenTool,
      features: [
        'AI autocomplete while writing',
        'Quick Edit for instant improvements',
        'Change tone to match audience',
        'Shorten or expand content as needed'
      ]
    },
    {
      id: 'documentation',
      title: 'Technical Documentation',
      description: 'Write clear technical documentation with Markdown support, code blocks, and AI assistance for technical writing.',
      icon: FileText,
      features: [
        'Full Markdown editor support',
        'Syntax-highlighted code blocks',
        'Tables and structured content',
        'Export to multiple formats'
      ]
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs uppercase tracking-wider text-white font-medium">Beta Testing Now Open</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
              Solutions for Every Writer
            </h1>

            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
              Whether you're writing for business, academia, or creative projects, doXmind helps you produce better content.
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
