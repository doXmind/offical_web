import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// Placeholder testimonials - replace with real data when available
const testimonials = [
  {
    id: 1,
    quote: "doXmind transformed how I write research papers. The AI understands context and suggests improvements that actually make sense.",
    author: "Sarah Chen",
    role: "PhD Researcher",
    avatar: null, // Will use initials
  },
  {
    id: 2,
    quote: "Finally, an AI editor that doesn't feel like fighting autocorrect. The diff review feature gives me complete control.",
    author: "Marcus Johnson",
    role: "Technical Writer",
    avatar: null,
  },
  {
    id: 3,
    quote: "The knowledge base integration is a game-changer. I can reference all my documents while writing - no more switching between apps.",
    author: "Emily Park",
    role: "Content Strategist",
    avatar: null,
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  // Generate initials from name
  const initials = testimonial.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative p-6 md:p-8 rounded-2xl border border-white/10 light:border-black/10 bg-white/[0.02] light:bg-black/[0.02] hover:bg-white/[0.04] light:hover:bg-black/[0.04] hover:border-white/20 light:hover:border-black/20 transition-all duration-300 group"
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      {/* Quote text */}
      <p className="text-sm md:text-base text-gray-300 light:text-gray-600 leading-relaxed mb-6 relative z-10">
        "{testimonial.quote}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/10 light:bg-black/10 border border-white/20 light:border-black/20 flex items-center justify-center">
            <span className="text-sm font-medium text-white/70 light:text-black/70">{initials}</span>
          </div>
        )}

        {/* Name and role */}
        <div>
          <p className="text-sm font-medium text-white light:text-gray-900">{testimonial.author}</p>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-extralight mb-3 md:mb-4">
            Loved by Writers
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
            Join thousands of writers who've transformed their workflow with AI-powered editing
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
