/**
 * Animation Configuration Constants
 * Copied from doxmind-mini/src/lib/constants.ts for consistency
 */

// =============================================================================
// Spring Animation Configurations
// =============================================================================

/** Spring animation configurations for Mobile V2 */
export const MOBILE_SPRINGS = {
  /** Snappy spring for quick feedback (buttons) */
  SNAPPY: { stiffness: 400, damping: 25, mass: 0.5 },
  /** Smooth spring for panel transitions */
  SMOOTH: { stiffness: 300, damping: 30, mass: 0.8 },
  /** Gentle spring for overlays */
  GENTLE: { stiffness: 200, damping: 25, mass: 1 },
  /** Bouncy spring for playful effects */
  BOUNCY: { stiffness: 500, damping: 15, mass: 0.5 },
};

/** Quick Edit Menu spring configuration */
export const MENU_SPRING = { stiffness: 500, damping: 30, mass: 0.8 };

/** Menu item spring configuration */
export const ITEM_SPRING = { stiffness: 400, damping: 25 };

// =============================================================================
// Animation Durations
// =============================================================================

/** Animation durations in milliseconds */
export const ANIMATION_DURATION = {
  /** Fast animations (quick feedback) */
  FAST: 150,
  /** Normal animations (standard transitions) */
  NORMAL: 200,
  /** Slow animations (smooth transitions) */
  SLOW: 300,
  /** Transition animations (state changes) */
  TRANSITION: 350,
  /** Long animations (complex transitions) */
  LONG: 500,
};

// =============================================================================
// AI Panel States (Mobile)
// =============================================================================

/** AI Panel height states */
export const AI_PANEL_STATES = {
  CLOSED: "closed",
  PEEK: "peek",
  CHAT: "chat",
  FULL: "full",
};

// =============================================================================
// Mobile V2 Configuration
// =============================================================================

/** Mobile V2 dimensions and sizing */
export const MOBILE_V2 = {
  /** Navigation bar height */
  NAV_BAR_HEIGHT: 48,
  /** Floating action button size */
  FAB_SIZE: 56,
  /** Panel border radius */
  PANEL_BORDER_RADIUS: 20,
  /** Panel drag handle touch area height */
  PANEL_HANDLE_HEIGHT: 40,
  /** AI Panel - Peek mode height */
  AI_PEEK_HEIGHT: 100,
  /** AI Panel - Peek mode height with selection */
  AI_PEEK_HEIGHT_WITH_SELECTION: 180,
  /** AI Panel - Chat mode height ratio (70vh) */
  AI_CHAT_RATIO: 0.70,
  /** AI Panel - Full mode height ratio (90vh) */
  AI_FULL_RATIO: 0.90,
  /** Edge swipe detection zone width */
  EDGE_SWIPE_ZONE: 20,
  /** Minimum swipe distance to trigger action */
  MIN_SWIPE_DISTANCE: 50,
  /** Swipe velocity threshold (px/s) */
  SWIPE_VELOCITY_THRESHOLD: 300,
};

// =============================================================================
// Quick Edit Options
// =============================================================================

/** Quick Edit menu options matching doxmind-mini */
export const QUICK_EDIT_OPTIONS = [
  { id: 'grammar', label: 'Fix Grammar', iconName: 'CheckCircle' },
  { id: 'improve', label: 'Improve Writing', iconName: 'Sparkles' },
  { id: 'simplify', label: 'Simplify', iconName: 'FileText' },
  { id: 'expand', label: 'Make Longer', iconName: 'ArrowUpFromLine' },
  { id: 'shorten', label: 'Make Shorter', iconName: 'ArrowDownToLine' },
  {
    id: 'tone',
    label: 'Change Tone',
    iconName: 'MessageSquare',
    hasSubmenu: true,
    submenu: [
      { id: 'professional', label: 'Professional' },
      { id: 'casual', label: 'Casual' },
      { id: 'friendly', label: 'Friendly' },
      { id: 'confident', label: 'Confident' },
    ]
  },
  {
    id: 'translate',
    label: 'Translate',
    iconName: 'Languages',
    hasSubmenu: true,
    submenu: [
      { id: 'chinese', label: 'Chinese' },
      { id: 'english', label: 'English' },
      { id: 'spanish', label: 'Spanish' },
      { id: 'french', label: 'French' },
    ]
  },
];

// =============================================================================
// Mobile Quick Actions
// =============================================================================

/** Quick action buttons for mobile AI panel peek mode */
export const MOBILE_QUICK_ACTIONS = [
  { id: 'improve', label: 'Improve', iconName: 'Wand2' },
  { id: 'shorten', label: 'Shorten', iconName: 'Scissors' },
  { id: 'expand', label: 'Expand', iconName: 'Maximize2' },
  { id: 'fix', label: 'Fix', iconName: 'Check' },
  { id: 'translate', label: 'Translate', iconName: 'Languages' },
];
