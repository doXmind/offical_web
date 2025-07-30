import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export const ExpandableCard = ({
  card,
  layout = false,
  onClick,
  selected,
  index,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={() => onClick(card)}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden cursor-pointer rounded-2xl",
        "bg-gradient-to-b from-gray-900/90 to-gray-900/50",
        "border border-gray-800 backdrop-blur-sm",
        "hover:border-gray-700 transition-all duration-300",
        selected?.id === card.id && "ring-1 ring-primary/30",
        card.className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-4"
        >
          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-light text-white">{card.title}</h3>
                <p className="text-gray-400 mt-1">{card.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extralight text-primary">
                {card.keyMetric}
              </div>
              <div className="text-sm text-gray-500 mt-1">efficiency gain</div>
            </div>
          </div>

          {/* Preview Content */}
          {!selected && (
            <p className="text-gray-400 leading-relaxed">{card.description}</p>
          )}

          {/* Expand Indicator */}
          <div className="flex items-center text-gray-500 text-sm">
            <span>Click to explore</span>
            <motion.svg
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary/10 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export const ExpandableCardContent = ({ card, onClose }) => {
  return (
    <motion.div
      layoutId={`card-${card.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-3xl border border-gray-800 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4 mb-8">
          <div className="p-4 bg-gray-800 rounded-xl">
            <card.icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-light text-white mb-2">{card.title}</h2>
            <p className="text-xl text-gray-400">{card.tagline}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Pain Points */}
          <section>
            <h3 className="text-xl font-light text-gray-300 mb-4">
              Common Challenges
            </h3>
            <div className="grid gap-3">
              {card.painPoints.map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-400">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow */}
          <section>
            <h3 className="text-xl font-light text-gray-300 mb-4">
              How It Works
            </h3>
            <div className="space-y-4">
              {card.workflow.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-light mr-4 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-400 pt-2">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-xl font-light text-gray-300 mb-6">
              Key Benefits
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {card.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="text-3xl font-extralight text-primary mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-sm text-gray-500">{benefit.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Scenarios */}
          <section>
            <h3 className="text-xl font-light text-gray-300 mb-4">
              Real-World Applications
            </h3>
            <div className="grid gap-4">
              {card.scenarios.map((scenario, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm"
                >
                  <h4 className="font-medium text-white mb-2">
                    {scenario.title}
                  </h4>
                  <p className="text-gray-400">{scenario.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};