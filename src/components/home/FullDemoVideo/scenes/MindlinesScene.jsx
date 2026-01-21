import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, List } from 'lucide-react';
import { DemoHeader } from '../components';
import { MINDLINES_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

// Level indicators matching doxmind-mini outline view
const getLevelIndicator = (level) => {
  switch (level) {
    case 0: return '●'; // H1: solid circle
    case 1: return '○'; // H2: empty circle
    case 2: return '◦'; // H3: small dot
    default: return '·';
  }
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
    // Adjusted positions for the scene
    const positions = {
      root: { x: 150, y: 50 },
      intro: { x: 50, y: 120 },
      features: { x: 150, y: 120 },
      advanced: { x: 250, y: 120 },
      autocomplete: { x: 120, y: 180 },
      chat: { x: 180, y: 180 },
      new: { x: 320, y: 120 },
    };
    return positions[node.id] || { x: 150, y: 150 };
  };

  const renderConnection = (fromId, toId) => {
    const fromNode = nodes.find(n => n.id === fromId);
    const toNode = nodes.find(n => n.id === toId);
    if (!fromNode || !toNode) return null;

    const from = getNodePosition(fromNode);
    const to = getNodePosition(toNode);

    return (
      <motion.line
        key={`${fromId}-${toId}`}
        x1={from.x}
        y1={from.y + 15}
        x2={to.x}
        y2={to.y - 5}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
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

              const sizeByLevel = {
                0: 'px-3 py-1.5 text-xs font-medium',
                1: 'px-2.5 py-1 text-[10px]',
                2: 'px-2 py-0.5 text-[9px]',
              };

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute rounded-lg border transition-colors ${sizeByLevel[node.level]} ${
                    isNew
                      ? 'bg-green-500/20 border-green-500/50 text-green-300'
                      : isHovered
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : node.level === 0
                      ? 'bg-blue-500/10 border-blue-500/30 text-white'
                      : node.level === 1
                      ? 'bg-white/5 border-white/15 text-gray-300'
                      : 'bg-white/[0.02] border-white/10 text-gray-400'
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
