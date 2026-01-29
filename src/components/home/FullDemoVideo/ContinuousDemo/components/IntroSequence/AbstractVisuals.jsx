import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * AbstractVisuals - AI-themed cinematic intro
 *
 * Combines:
 * - Neural network nodes & connections
 * - AI typing effect (like ChatGPT)
 * - Data/code flow matrix style
 *
 * Timeline (11 seconds):
 * 0-3s: Neural network forms, nodes light up
 * 3-6s: Data streams flow, code rain effect
 * 6-9s: AI typing generates text
 * 9-11s: Everything converges for brand reveal
 */

const WHITE = '#ffffff';
const GRAY = '#6b7280';
const LIGHT_GRAY = '#9ca3af';

// Neural network nodes
const generateNodes = () => {
  const nodes = [];
  const cols = 8;
  const rows = 5;
  for (let i = 0; i < cols * rows; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    nodes.push({
      id: i,
      x: (col - cols / 2 + 0.5) * 90,
      y: (row - rows / 2 + 0.5) * 70,
      delay: Math.random() * 0.5,
      connections: [], // Will be filled below
    });
  }
  // Create connections (each node connects to 2-3 nearby nodes)
  nodes.forEach((node, i) => {
    const nearby = nodes.filter((n, j) => {
      if (i === j) return false;
      const dist = Math.sqrt((n.x - node.x) ** 2 + (n.y - node.y) ** 2);
      return dist < 120;
    });
    node.connections = nearby.slice(0, 2 + Math.floor(Math.random() * 2)).map(n => n.id);
  });
  return nodes;
};

// Data stream columns
const generateDataStreams = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i - count / 2) * 50 + Math.random() * 20,
    chars: Array.from({ length: 15 }, () =>
      Math.random() > 0.5 ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) : String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ),
    speed: 0.5 + Math.random() * 0.5,
    delay: Math.random() * 2,
  }));
};

// AI typing text sequences
const AI_TEXTS = [
  { text: "Analyzing context...", x: -180, y: -80, delay: 0 },
  { text: "Generating ideas...", x: 100, y: -40, delay: 0.8 },
  { text: "Writing content...", x: -120, y: 60, delay: 1.6 },
  { text: "AI Ready", x: 0, y: 0, delay: 2.4, large: true },
];

const AbstractVisuals = ({ progress = 0, currentTime = 0 }) => {
  const nodes = useMemo(() => generateNodes(), []);
  const dataStreams = useMemo(() => generateDataStreams(20), []);

  // Phase calculations (11 seconds total)
  const phase1 = Math.min(1, progress / 0.27);      // 0-3s: neural network
  const phase2 = Math.max(0, Math.min(1, (progress - 0.27) / 0.27));  // 3-6s: data streams
  const phase3 = Math.max(0, Math.min(1, (progress - 0.54) / 0.27));  // 6-9s: AI typing
  const phase4 = Math.max(0, Math.min(1, (progress - 0.81) / 0.19));  // 9-11s: converge

  // Convergence
  const convergeScale = 1 - phase4 * 0.2;
  const convergeOpacity = 1 - phase4 * 0.6;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Neural Network Layer */}
      <svg
        className="absolute"
        style={{
          width: '100%',
          height: '100%',
          opacity: convergeOpacity,
          transform: `scale(${convergeScale})`,
        }}
        viewBox="-400 -200 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes[targetId];
            const connectionProgress = Math.max(0, Math.min(1, (phase1 - node.delay) / 0.5));
            const pulsePhase = (currentTime / 1000 + node.id * 0.1) % 2;
            const isPulsing = pulsePhase < 0.3 && phase1 > 0.5;

            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={node.x + (target.x - node.x) * connectionProgress}
                y2={node.y + (target.y - node.y) * connectionProgress}
                stroke={isPulsing ? WHITE : GRAY}
                strokeWidth={isPulsing ? 1.5 : 0.5}
                opacity={connectionProgress * 0.4}
                style={{ filter: isPulsing ? 'url(#glow)' : 'none' }}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => {
          const nodeProgress = Math.max(0, Math.min(1, (phase1 - node.delay) / 0.3));
          const pulsePhase = (currentTime / 800 + node.id * 0.15) % 2;
          const isActive = pulsePhase < 0.2 && phase1 > 0.3;

          return (
            <g key={node.id}>
              {/* Node glow */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={12}
                  fill={WHITE}
                  opacity={0.2}
                  style={{ filter: 'blur(4px)' }}
                />
              )}
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 4 : 3}
                fill={isActive ? WHITE : LIGHT_GRAY}
                opacity={nodeProgress}
                style={{ filter: isActive ? 'url(#glow)' : 'none' }}
              />
            </g>
          );
        })}
      </svg>

      {/* Data Streams / Code Rain */}
      {phase2 > 0 && (
        <div
          className="absolute inset-0 flex justify-center items-center overflow-hidden"
          style={{ opacity: phase2 * convergeOpacity * 0.6 }}
        >
          {dataStreams.map((stream) => {
            const streamProgress = Math.max(0, (phase2 - stream.delay * 0.3) / 0.7);
            const yOffset = ((currentTime / 50) * stream.speed) % 400 - 200;

            return (
              <div
                key={stream.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(50% + ${stream.x}px)`,
                  top: yOffset,
                  opacity: streamProgress,
                }}
              >
                {stream.chars.map((char, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs"
                    style={{
                      color: i === 0 ? WHITE : GRAY,
                      opacity: 1 - i * 0.06,
                      textShadow: i === 0 ? `0 0 8px ${WHITE}` : 'none',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* AI Typing Effect */}
      {phase3 > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          {AI_TEXTS.map((item, index) => {
            const textProgress = Math.max(0, Math.min(1, (phase3 - item.delay / 3) / 0.3));
            const visibleChars = Math.floor(item.text.length * textProgress);
            const isTyping = textProgress > 0 && textProgress < 1;
            const isComplete = textProgress >= 1;

            // Hide non-"AI Ready" texts during convergence
            if (!item.large && phase4 > 0.3) return null;

            return (
              <motion.div
                key={index}
                className="absolute flex items-center"
                style={{
                  left: `calc(50% + ${item.x * convergeScale}px)`,
                  top: `calc(50% + ${item.y * convergeScale}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: textProgress > 0 ? (item.large ? 1 : convergeOpacity) : 0,
                  scale: item.large && phase4 > 0 ? 1 + phase4 * 0.5 : 1,
                }}
              >
                {/* AI indicator dot */}
                {!item.large && (
                  <motion.div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: isComplete ? WHITE : GRAY }}
                    animate={isTyping ? { opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}

                {/* Text */}
                <span
                  className={`font-mono ${item.large ? 'text-4xl font-bold' : 'text-sm'}`}
                  style={{
                    color: WHITE,
                    textShadow: item.large ? `0 0 20px ${WHITE}` : `0 0 10px rgba(255,255,255,0.5)`,
                  }}
                >
                  {item.text.substring(0, visibleChars)}
                </span>

                {/* Cursor */}
                {isTyping && (
                  <motion.span
                    className="inline-block w-0.5 h-4 ml-0.5"
                    style={{ backgroundColor: WHITE }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Floating AI particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 150 + Math.sin(i * 0.5) * 50;
          const x = Math.cos(angle + currentTime / 2000) * radius;
          const y = Math.sin(angle + currentTime / 2000) * radius * 0.6;
          const particleOpacity = phase1 > 0.5 ? 0.3 * convergeOpacity : 0;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: WHITE,
                left: `calc(50% + ${x * convergeScale}px)`,
                top: `calc(50% + ${y * convergeScale}px)`,
                opacity: particleOpacity,
                boxShadow: `0 0 4px ${WHITE}`,
              }}
            />
          );
        })}
      </div>

      {/* Center focus ring */}
      {phase3 > 0.5 && (
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: 100 + phase4 * 50,
            height: 100 + phase4 * 50,
            borderColor: WHITE,
            opacity: 0.2 * convergeOpacity,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </div>
  );
};

export default AbstractVisuals;
