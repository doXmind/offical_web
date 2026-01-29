import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, List } from 'lucide-react';
import { DemoHeader } from '../components';
import { MINDLINES_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';
import { getConnectionPoint } from '../constants/nodeDimensions';

// Level indicators matching doxmind-mini outline view
const getLevelIndicator = (level) => {
  switch (level) {
    case 0: return '●'; // H1: solid circle
    case 1: return '○'; // H2: empty circle
    case 2: return '◦'; // H3: small dot
    default: return '·';
  }
};

// Connection line styling constants for modern minimal aesthetic
const CONNECTION_STYLE = {
  // Curve algorithm parameters
  baseTension: 0.5,      // Base curve tension (0.4 = loose, 0.6 = tight)
  maxDistance: 300,      // Distance at which tension starts adapting
  tensionFalloff: 0.2,   // How much tension reduces for long connections

  // Visual styling
  rootStrokeWidth: 1.8,       // Stroke width for root connections (level 0)
  defaultStrokeWidth: 1.5,    // Stroke width for other connections
  rootOpacity: 0.18,          // Opacity for root connections
  defaultOpacity: 0.15,       // Opacity for other connections
  glowOpacity: 0.08,          // Opacity for the glow layer

  // Glow effect
  glowBlur: 3,                // Blur radius for glow (px)
  glowWidthOffset: 2,         // Extra width for glow layer

  // Animation
  animationDuration: 0.6,     // Path drawing duration (seconds)
  animationEasing: [0.22, 1, 0.36, 1],  // Smooth ease-out curve
};

const MindlinesScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [visibleConnections, setVisibleConnections] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [newNodeVisible, setNewNodeVisible] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Root node appears
  // 2: Level 1 nodes appear
  // 3: Connections draw
  // 4: Level 2 nodes appear
  // 5: Add new heading in outline
  // 6: New node appears in mindmap
  // 7: Hover node, both highlight

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setVisibleNodes([]);
      setVisibleConnections([]);
      setHoveredNode(null);
      setNewNodeVisible(false);
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    // Reset
    setPhase(0);
    setVisibleNodes([]);
    setVisibleConnections([]);
    setHoveredNode(null);
    setNewNodeVisible(false);

    // Root node
    addTimeout(() => {
      setPhase(1);
      setVisibleNodes(['root']);
    }, 500);

    // Level 1 nodes
    addTimeout(() => {
      setPhase(2);
      setVisibleNodes(['root', 'intro', 'features', 'advanced']);
    }, 1200);

    // Connections
    addTimeout(() => {
      setPhase(3);
      setVisibleConnections(['root-intro', 'root-features', 'root-advanced']);
    }, 1800);

    // Level 2 nodes
    addTimeout(() => {
      setPhase(4);
      setVisibleNodes(['root', 'intro', 'features', 'advanced', 'autocomplete', 'chat']);
      setVisibleConnections([
        'root-intro', 'root-features', 'root-advanced',
        'features-autocomplete', 'features-chat'
      ]);
    }, 2500);

    // New node
    addTimeout(() => {
      setPhase(5);
    }, 4000);

    addTimeout(() => {
      setPhase(6);
      setNewNodeVisible(true);
      setVisibleNodes(['root', 'intro', 'features', 'advanced', 'autocomplete', 'chat', 'new']);
      setVisibleConnections([
        'root-intro', 'root-features', 'root-advanced',
        'features-autocomplete', 'features-chat', 'root-new'
      ]);
    }, 5000);

    // Hover
    addTimeout(() => {
      setPhase(7);
      setHoveredNode('features');
    }, 6000);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  const nodes = [...MINDLINES_CONTENT.nodes];
  if (newNodeVisible) {
    nodes.push(MINDLINES_CONTENT.newNode);
  }

  const outlineItems = [...MINDLINES_CONTENT.outlineItems];
  if (phase >= 5) {
    outlineItems.push({ id: 'new', label: 'Best Practices', level: 1, isNew: true });
  }

  const getNodePosition = (node) => {
    // Optimized hierarchical layout with generous spacing
    const positions = {
      root: { x: 320, y: 70 },          // Center top
      intro: { x: 140, y: 200 },        // Left branch
      features: { x: 320, y: 200 },     // Center branch
      advanced: { x: 500, y: 200 },     // Right branch
      autocomplete: { x: 260, y: 310 }, // Below features-left
      chat: { x: 380, y: 310 },         // Below features-right
      new: { x: 640, y: 200 },          // Far right (Best Practices)
    };
    return positions[node.id] || { x: 320, y: 200 };
  };

  const renderConnection = (fromId, toId) => {
    const fromNode = nodes.find(n => n.id === fromId);
    const toNode = nodes.find(n => n.id === toId);
    if (!fromNode || !toNode) return null;

    const from = getNodePosition(fromNode);
    const to = getNodePosition(toNode);

    // Calculate connection points (level-aware offsets)
    const startX = from.x;
    const startY = from.y + getConnectionPoint.start(fromNode.level);
    const endX = to.x;
    const endY = to.y + getConnectionPoint.end(toNode.level);

    // Enhanced curve algorithm with vertical-emphasis and adaptive tension
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Adaptive tension: gentler curves for long connections
    const distanceFactor = Math.min(distance / CONNECTION_STYLE.maxDistance, 1);
    const tension = CONNECTION_STYLE.baseTension * (1 - distanceFactor * CONNECTION_STYLE.tensionFalloff);

    // Vertical-emphasis control points for natural hierarchical flow
    const controlOffset = Math.abs(dy) * tension;
    const controlX1 = startX + dx * 0.25;  // 25% horizontal interpolation
    const controlY1 = startY + controlOffset;
    const controlX2 = startX + dx * 0.75;  // 75% horizontal interpolation
    const controlY2 = endY - controlOffset;

    const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

    // Level-based styling for visual hierarchy
    const isRootConnection = fromNode.level === 0;
    const strokeWidth = isRootConnection ? CONNECTION_STYLE.rootStrokeWidth : CONNECTION_STYLE.defaultStrokeWidth;
    const strokeOpacity = isRootConnection ? CONNECTION_STYLE.rootOpacity : CONNECTION_STYLE.defaultOpacity;

    return (
      <g key={`${fromId}-${toId}`}>
        {/* Glow layer for subtle depth */}
        <motion.path
          d={pathData}
          stroke={`rgba(255,255,255,${CONNECTION_STYLE.glowOpacity})`}
          strokeWidth={strokeWidth + CONNECTION_STYLE.glowWidthOffset}
          fill="none"
          style={{ filter: `blur(${CONNECTION_STYLE.glowBlur}px)` }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: CONNECTION_STYLE.animationDuration,
            ease: CONNECTION_STYLE.animationEasing
          }}
        />

        {/* Main line */}
        <motion.path
          d={pathData}
          stroke={`rgba(255,255,255,${strokeOpacity})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: CONNECTION_STYLE.animationDuration,
            ease: CONNECTION_STYLE.animationEasing
          }}
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="My Project Plan.md"
        isDirty={newNodeVisible}
        isSidebarOpen={true}
        isChatOpen={false}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Outline Panel */}
        <div className="w-40 md:w-48 border-r border-white/10 bg-white/[0.01] flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <List className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[11px] font-medium text-gray-400">Outline</span>
            </div>
            <FileText className="w-3.5 h-3.5 text-gray-600" />
          </div>

        <div className="flex-1 overflow-y-auto p-2">
          {outlineItems.map((item, idx) => {
            const isHovered = hoveredNode === item.id;
            return (
              <motion.div
                key={item.id}
                initial={item.isNew ? { opacity: 0, x: -10 } : false}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                }}
                transition={{ type: 'spring', ...ITEM_SPRING }}
                className={`flex items-center gap-1.5 py-1 px-1 rounded cursor-pointer transition-colors ${
                  isHovered ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'
                }`}
                style={{ paddingLeft: `${item.level * 12 + 4}px` }}
              >
                <span className={`text-[10px] ${
                  item.level === 0 ? 'text-blue-400' :
                  item.level === 1 ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {getLevelIndicator(item.level)}
                </span>
                <span className={`text-[10px] ${item.isNew ? 'text-green-400' : ''}`}>
                  {item.label}
                </span>
                {item.isNew && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', ...MOBILE_SPRINGS.BOUNCY }}
                    className="text-[8px] text-green-500 ml-1"
                  >
                    (new)
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mindmap Panel */}
      <div className="flex-1 flex flex-col">
        <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-400">Mindlines View</span>
        </div>

        <div className="flex-1 relative overflow-hidden">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full">
            {visibleConnections.map(conn => {
              const [fromId, toId] = conn.split('-');
              return renderConnection(fromId, toId);
            })}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.filter(node => visibleNodes.includes(node.id)).map((node) => {
              const pos = getNodePosition(node);
              const isHovered = hoveredNode === node.id;
              const isNew = node.id === 'new';

              // Node size classes by level
              // IMPORTANT: If you change these classes, update NODE_DIMENSIONS in constants/nodeDimensions.js
              const sizeByLevel = {
                0: 'px-4 py-2 text-sm font-semibold',
                1: 'px-3 py-1.5 text-xs font-medium',
                2: 'px-2.5 py-1 text-[10px]',
              };

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: isHovered
                      ? '0 0 24px rgba(59, 130, 246, 0.6), 0 4px 12px rgba(0, 0, 0, 0.3)'
                      : node.level === 0
                      ? '0 4px 16px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute rounded-lg border-2 transition-all duration-200 ${sizeByLevel[node.level]} ${
                    isNew
                      ? 'bg-green-500/25 border-green-400/60 text-green-200'
                      : isHovered
                      ? 'bg-blue-500/30 border-blue-400/70 text-blue-100'
                      : node.level === 0
                      ? 'bg-blue-500/20 border-blue-400/50 text-white'
                      : node.level === 1
                      ? 'bg-white/8 border-white/25 text-gray-200'
                      : 'bg-white/5 border-white/20 text-gray-300'
                  }`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {node.label}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Minimap indicator */}
          <div className="absolute bottom-3 right-3 w-16 h-12 bg-white/5 border border-white/10 rounded">
            <div className="absolute inset-1 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500/50 rounded-sm" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindlinesScene;
