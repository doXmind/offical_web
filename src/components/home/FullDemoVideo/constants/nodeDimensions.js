/**
 * Node dimensions for Mindlines visualization
 * These values are derived from Tailwind classes applied to nodes in MindlinesScene.jsx
 */

/**
 * Calculate node height from Tailwind classes
 * Format: { py, fontSize, lineHeight }
 * @param {Object} params - Node size parameters
 * @param {number} params.py - Vertical padding in pixels (py-* class value)
 * @param {number} params.fontSize - Font size in pixels
 * @param {number} params.lineHeight - Line height multiplier (default 1.5)
 * @returns {number} Total node height in pixels
 */
const calculateNodeHeight = ({ py, fontSize, lineHeight = 1.5 }) => {
  const BORDER_WIDTH = 2; // border-2 class
  return (py * 2) + (fontSize * lineHeight) + (BORDER_WIDTH * 2);
};

/**
 * Node dimension configuration per hierarchy level
 *
 * IMPORTANT: These values must match the Tailwind classes in MindlinesScene.jsx:
 * - Level 0: 'px-4 py-2 text-sm font-semibold'
 * - Level 1: 'px-3 py-1.5 text-xs font-medium'
 * - Level 2: 'px-2.5 py-1 text-[10px]'
 *
 * When updating node styling, update both locations to maintain alignment.
 */
export const NODE_DIMENSIONS = {
  0: {
    // Root node: px-4 py-2 text-sm font-semibold
    paddingX: 16,    // px-4 = 16px
    paddingY: 8,     // py-2 = 8px
    fontSize: 14,    // text-sm = 14px
    lineHeight: 1.5,
    height: calculateNodeHeight({ py: 8, fontSize: 14 }), // ~41px
  },
  1: {
    // First level children: px-3 py-1.5 text-xs font-medium
    paddingX: 12,    // px-3 = 12px
    paddingY: 6,     // py-1.5 = 6px
    fontSize: 12,    // text-xs = 12px
    lineHeight: 1.5,
    height: calculateNodeHeight({ py: 6, fontSize: 12 }), // ~34px
  },
  2: {
    // Second level children: px-2.5 py-1 text-[10px]
    paddingX: 10,    // px-2.5 = 10px
    paddingY: 4,     // py-1 = 4px
    fontSize: 10,    // text-[10px] = 10px
    lineHeight: 1.5,
    height: calculateNodeHeight({ py: 4, fontSize: 10 }), // ~27px
  },
};

/**
 * Get vertical offset from node center to its edge
 *
 * Since nodes are positioned with transform: translate(-50%, -50%), their center
 * point is at the specified x,y coordinates. This function calculates the offset
 * from the center to the top or bottom edge.
 *
 * @param {number} level - Node level (0, 1, or 2)
 * @param {'top' | 'bottom'} edge - Which edge to calculate offset for
 * @returns {number} Offset in pixels (positive for bottom, negative for top)
 */
export const getNodeEdgeOffset = (level, edge) => {
  const halfHeight = NODE_DIMENSIONS[level].height / 2;
  return edge === 'bottom' ? halfHeight : -halfHeight;
};

/**
 * Get connection point offset for a node
 *
 * These functions return the vertical offset from a node's center point to
 * where connection lines should start or end.
 *
 * Usage in SVG path calculations:
 * - start: Add to parent node's y-coordinate for line starting point
 * - end: Add to child node's y-coordinate for line ending point
 *
 * @example
 * const startY = parentNode.y + getConnectionPoint.start(parentNode.level);
 * const endY = childNode.y + getConnectionPoint.end(childNode.level);
 */
export const getConnectionPoint = {
  /**
   * Get starting point offset (bottom of parent node)
   * @param {number} level - Parent node level
   * @returns {number} Positive offset from center to bottom edge
   */
  start: (level) => getNodeEdgeOffset(level, 'bottom'),

  /**
   * Get ending point offset (top of child node)
   * @param {number} level - Child node level
   * @returns {number} Negative offset from center to top edge
   */
  end: (level) => getNodeEdgeOffset(level, 'top'),
};
