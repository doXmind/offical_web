import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MockSidebar } from '../components';
import { MINDMAP_CONTENT } from '../constants/demoContent';

const MindlinesScene = ({ isActive = true }) => {
  const [visibleNodes, setVisibleNodes] = useState(0);
  const [showNewNode, setShowNewNode] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setVisibleNodes(0);
      setShowNewNode(false);
      return;
    }

    setVisibleNodes(0);
    setShowNewNode(false);

    // Reveal nodes one by one
    const nodeTimers = MINDMAP_CONTENT.nodes.map((_, index) =>
      setTimeout(() => setVisibleNodes(index + 1), 400 + index * 400)
    );

    // Add new node
    const newNodeTimer = setTimeout(() => setShowNewNode(true), 6000);

    return () => {
      nodeTimers.forEach(clearTimeout);
      clearTimeout(newNodeTimer);
    };
  }, [isActive]);

  const nodes = MINDMAP_CONTENT.nodes;

  const getNodePosition = (node, index) => {
    const positions = {
      root: { x: 180, y: 100 },
      intro: { x: 60, y: 50 },
      features: { x: 60, y: 100 },
      'quick-edit': { x: 0, y: 80 },
      'ai-chat': { x: 0, y: 120 },
      'getting-started': { x: 60, y: 150 },
    };
    return positions[node.id] || { x: 100, y: 50 + index * 40 };
  };

  const getConnections = () => {
    return nodes
      .filter((node) => node.parent)
      .map((node) => {
        const parentNode = nodes.find((n) => n.id === node.parent);
        if (!parentNode) return null;
        const from = getNodePosition(parentNode, nodes.indexOf(parentNode));
        const to = getNodePosition(node, nodes.indexOf(node));
        return { from, to, id: `${parentNode.id}-${node.id}` };
      })
      .filter(Boolean);
  };

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

      <div className="flex-1 flex bg-black">
        {/* Document outline */}
        <div className="w-40 border-r border-white/10 p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">
            Outline
          </div>
          <div className="space-y-1">
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className={`
                  flex items-center gap-1 text-[10px] transition-opacity duration-200
                  ${node.level === 0 ? 'text-white font-medium' : 'text-gray-500'}
                  ${node.level === 2 ? 'pl-4' : node.level === 1 ? 'pl-2' : ''}
                  ${index < visibleNodes ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {node.level < 2 && (
                  <ChevronRight className="w-2.5 h-2.5 text-gray-600" />
                )}
                <span>{node.label}</span>
              </div>
            ))}
            {/* New node */}
            {showNewNode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 text-[10px] text-white font-medium pl-2"
              >
                <ChevronRight className="w-2.5 h-2.5 text-gray-600" />
                <span>Conclusion</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mindmap visualization */}
        <div className="flex-1 relative overflow-hidden bg-white/[0.01]">
          <div className="absolute inset-0 p-4">
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {getConnections().map((conn) => {
                const nodeIndex = nodes.findIndex(
                  (n) => n.id === conn.id.split('-')[1]
                );
                if (nodeIndex >= visibleNodes || nodeIndex < 0) return null;

                return (
                  <line
                    key={conn.id}
                    x1={conn.from.x + 40}
                    y1={conn.from.y + 10}
                    x2={conn.to.x + 40}
                    y2={conn.to.y + 10}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* New node connection */}
              {showNewNode && (
                <line
                  x1={220}
                  y1={110}
                  x2={100}
                  y2={190}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => {
              if (index >= visibleNodes) return null;
              const pos = getNodePosition(node, index);
              const sizes = {
                0: 'px-3 py-1.5 text-xs font-medium',
                1: 'px-2.5 py-1 text-xs',
                2: 'px-2 py-0.5 text-[10px]',
              };

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ left: pos.x, top: pos.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`
                      ${sizes[node.level] || sizes[2]}
                      ${node.level === 0 ? 'bg-white/10 border-white/40' : 'bg-white/5 border-white/20'}
                      border rounded text-white whitespace-nowrap
                    `}
                  >
                    {node.label}
                  </div>
                </motion.div>
              );
            })}

            {/* New node */}
            {showNewNode && (
              <motion.div
                className="absolute"
                style={{ left: 60, top: 190 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="px-2.5 py-1 text-xs bg-white/10 border border-white/40 rounded text-white">
                  Conclusion
                </div>
              </motion.div>
            )}
          </div>

          {/* Minimap indicator */}
          <div className="absolute bottom-3 right-3 w-16 h-12 border border-white/10 rounded bg-white/5">
            <div className="absolute top-1 left-1 w-4 h-3 border border-white/30 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindlinesScene;
