/**
 * Camera Presets - Configuration for virtual camera system
 *
 * This file defines focus areas, transition configurations, and the camera script
 * for creating professional zoom/pan effects in the demo.
 *
 * Design principle: Use ONLY origin + scale for positioning (no x/y offset)
 * This ensures the camera zooms directly into the target area without distortion.
 */

/**
 * Focus Areas - Predefined camera positions for different UI regions
 *
 * Layout reference (based on actual component widths):
 * - Sidebar: ~12% (w-36/w-44 = 144-176px @ 1200px)
 * - Editor: ~58% (flex-1)
 * - Chat Panel: ~15% (w-40/w-48 = 160-192px @ 1200px)
 * - Review Panel: ~15% (w-44 = 176px @ 1200px)
 *
 * Each preset defines:
 * - scale: Zoom level (1 = 100%, 2 = 200%)
 * - originX: Horizontal center of focus (0 = left, 1 = right)
 * - originY: Vertical center of focus (0 = top, 1 = bottom)
 */
export const FOCUS_AREAS = {
  // Full view - default perspective
  FULL_VIEW: {
    scale: 1,
    originX: 0.5,
    originY: 0.5,
  },

  // Left sidebar - file operations (focus on upper-left for file list)
  SIDEBAR: {
    scale: 1.5,
    originX: 0.03,
    originY: 0.30,
  },

  // Main editor area (center at ~40% from left)
  EDITOR: {
    scale: 1.4,
    originX: 0.38,
    originY: 0.50,
  },

  // Editor title and toolbar region (center at ~40%, upper area)
  EDITOR_HEADER: {
    scale: 1.4,
    originX: 0.38,
    originY: 0.32,
  },

  // Toolbar buttons (center at ~40%, top area)
  TOOLBAR: {
    scale: 1.5,
    originX: 0.38,
    originY: 0.18,
  },

  // AI Chat panel - right side (focus on upper-right for KB file list)
  CHAT_PANEL: {
    scale: 1.35,
    originX: 0.97,
    originY: 0.28,
  },

  // Chat input area (right side, bottom - show full input box)
  CHAT_INPUT: {
    scale: 1.4,
    originX: 0.97,
    originY: 0.90,
  },

  // Review panel (right side, shows both panel and editor issues)
  REVIEW_PANEL: {
    scale: 1.25,
    originX: 0.75,
    originY: 0.50,
  },

  // Mindmap view (focus on editor area where mindmap is rendered)
  MINDMAP: {
    scale: 1.2,
    originX: 0.42,
    originY: 0.50,
  },

  // Document center - for Quick Edit, selections (originY=0.42 to show menu below text)
  DOCUMENT_CENTER: {
    scale: 1.35,
    originX: 0.38,
    originY: 0.42,
  },

  // AI Search panel - upper center-right area to see search input and results
  AI_SEARCH: {
    scale: 1.35,
    originX: 0.55,
    originY: 0.12,
  },

  // Review panel - balanced view showing both editor and review panel (for Phase 7)
  REVIEW_BALANCED: {
    scale: 1.2,
    originX: 0.55,
    originY: 0.50,
  },

  // Editor wide view - less zoom for showing full diff content (for Phase 5)
  EDITOR_WIDE: {
    scale: 1.15,
    originX: 0.50,
    originY: 0.50,
  },

  // Sidebar outline section - focus on bottom outline area (for Phase 8)
  SIDEBAR_OUTLINE: {
    scale: 1.4,
    originX: 0.08,
    originY: 0.75,
  },

  // Mindmap center view - balanced view of mindmap visualization (for Phase 8)
  MINDMAP_CENTER: {
    scale: 1.25,
    originX: 0.42,
    originY: 0.50,
  },
};

/**
 * Camera Transitions - Animation configurations for camera movements
 * Optimized spring parameters for natural motion
 */
export const CAMERA_TRANSITIONS = {
  // Quick switch - for action-driven changes
  QUICK: {
    type: 'spring',
    stiffness: 280,
    damping: 28,
    mass: 0.6,
  },

  // Smooth movement - for narrative progression
  SMOOTH: {
    type: 'spring',
    stiffness: 120,
    damping: 22,
    mass: 0.9,
  },

  // Slow focus - for important moments
  SLOW: {
    type: 'spring',
    stiffness: 80,
    damping: 20,
    mass: 1.0,
  },

  // Linear transition - optimized for video export
  LINEAR: {
    type: 'tween',
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
  },

  // Instant - no animation
  INSTANT: {
    type: 'tween',
    duration: 0,
  },
};

/**
 * Camera Script - Timeline of camera movements synchronized with demo script
 *
 * Timing principle: Add 200ms buffer after transitions before camera changes
 *
 * Action types:
 * - setCamera: Change camera position (value: preset name or custom object)
 * - transition: Trigger overlay transition effect
 * - spotlight: Show/hide spotlight effect (value: config object or null)
 */
export const CAMERA_SCRIPT = [
  // ==================== PHASE 1: Create Document (0-6s) ====================
  // Opening: Focus on sidebar for file creation (stay here for entire phase)
  { time: 0, type: 'setCamera', value: 'SIDEBAR', transition: 'SLOW' },
  { time: 600, type: 'spotlight', value: { x: 3, y: 30, width: 20, height: 45 } },

  // File created at 3500ms - keep spotlight on sidebar to see file appear
  // Title is typed at 4500ms but camera stays on sidebar until phase ends
  { time: 5500, type: 'spotlight', value: null },

  // Transition to editor at end of Phase 1 (phase changes to "Writing..." at 6000ms)
  { time: 5800, type: 'transition', value: { type: 'CROSSFADE', duration: 400 } },
  { time: 6200, type: 'setCamera', value: 'EDITOR_HEADER', transition: 'SMOOTH' },

  // ==================== PHASE 2: AI Autocomplete (6-14s) ====================
  // Focus on document content (after transition completes + buffer)
  { time: 6400, type: 'setCamera', value: 'EDITOR', transition: 'SMOOTH' },

  // Ghost text appears - zoom in to text area
  { time: 9000, type: 'setCamera', value: 'DOCUMENT_CENTER', transition: 'SMOOTH' },
  { time: 9300, type: 'spotlight', value: { x: 38, y: 42, width: 45, height: 40 } },

  // ✅ FLASH REMOVED - Tab hint no longer uses flash transition

  // Accept autocomplete - zoom out slightly
  { time: 13000, type: 'spotlight', value: null },
  { time: 13200, type: 'setCamera', value: 'EDITOR', transition: 'SMOOTH' },

  // ==================== PHASE 3: Quick Edit (14-22s) ====================
  // 🎬 CINEMATIC IMPROVEMENT: Start moving towards DOCUMENT_CENTER before transition
  { time: 13800, type: 'setCamera', value: 'DOCUMENT_CENTER', transition: 'SMOOTH' },

  // Transition covers the movement
  { time: 14000, type: 'transition', value: { type: 'ZOOM_BLUR', duration: 450 } },

  // Camera arrives at DOCUMENT_CENTER as transition ends
  { time: 14500, type: 'spotlight', value: { x: 38, y: 42, width: 45, height: 45 } },

  // After improvement applied - start moving towards CHAT_PANEL
  { time: 21200, type: 'spotlight', value: null },
  { time: 21500, type: 'setCamera', value: 'CHAT_PANEL', transition: 'SMOOTH' },

  // ==================== PHASE 4: Knowledge Base (22-30s) ====================
  // 🎬 CINEMATIC IMPROVEMENT: Transition covers the final movement to CHAT_PANEL
  { time: 21800, type: 'transition', value: { type: 'CROSSFADE', duration: 400 } },

  // Camera arrives as transition ends
  { time: 22200, type: 'spotlight', value: { x: 97, y: 28, width: 18, height: 45 } },

  // Upload complete - immediate transition to Phase 5
  { time: 27000, type: 'spotlight', value: null },

  // ==================== PHASE 5: AI Essay Generation (28-42s) - COMPRESSED ====================
  // 🎬 MAJOR OPTIMIZATION: Reduced from 7 camera moves to 3, instant phase transition

  // Move 1: Quick transition to CHAT_INPUT (removed FULL_VIEW detour)
  { time: 27800, type: 'setCamera', value: 'CHAT_INPUT', transition: 'SMOOTH' },
  { time: 28000, type: 'transition', value: { type: 'CROSSFADE', duration: 400 } },
  // Camera arrives at input area - user types prompt

  // Move 2: Shift up to CHAT_PANEL to show TODO plan execution
  { time: 29500, type: 'setCamera', value: {
    scale: 1.25,
    originX: 0.97,
    originY: 0.45,
  }, transition: 'SMOOTH' },
  // Stay here for 8 seconds showing TODO plan execution (steps 1-6)

  // Move 3: Transition to EDITOR_WIDE for diff review
  { time: 37000, type: 'setCamera', value: 'EDITOR_WIDE', transition: 'SMOOTH' },
  { time: 37500, type: 'transition', value: { type: 'CROSSFADE', duration: 500 } },
  // Wide view shows full diff and statistics

  // ✅ COMPRESSED TIMING - Accept changes quickly, zoom out immediately
  { time: 42000, type: 'setCamera', value: 'FULL_VIEW', transition: 'SLOW' },

  // ==================== PHASE 6: AI Semantic Search (43-47s) - ULTRA COMPRESSED ====================
  // 🎬 INSTANT TRANSITION: Removed wait time
  { time: 42700, type: 'setCamera', value: 'AI_SEARCH', transition: 'SMOOTH' },
  { time: 43000, type: 'transition', value: { type: 'CROSSFADE', duration: 350 } },

  // Camera arrives at AI Search panel
  { time: 43400, type: 'spotlight', value: { x: 55, y: 12, width: 38, height: 50 } },

  // Close search - move to full view for review
  { time: 46500, type: 'spotlight', value: null },
  { time: 46800, type: 'setCamera', value: 'FULL_VIEW', transition: 'SMOOTH' },

  // ==================== PHASE 7: Text Review (48-56s) - ULTRA COMPRESSED ====================
  // 🎬 ULTRA-SIMPLIFIED: Stay in FULL_VIEW, no spotlight, no extra movements
  // Review appears → Show issues → Accept → Done

  // Stay in FULL_VIEW for entire review process
  // No transition overlay needed - review panel just appears in the UI
  // No spotlight - let the review panel's own UI draw attention
  // No camera movement - stable view throughout

  // (Review happens at 48000-56000ms in demoScript.js)
  // Camera stays completely still in FULL_VIEW

  // ==================== PHASE 8: Mindlines (56-66s) - MAXIMUM COMPRESSION ====================
  // 🎬 ABSOLUTE MINIMALISM: Quick smooth entry, lock in place
  // ✅ OPTIMIZED: Faster node animation, 10 second total duration

  // Quick smooth move to mindmap view - NO CROSSFADE FLASH
  { time: 56000, type: 'setCamera', value: 'MINDMAP', transition: 'SMOOTH' },

  // Camera arrives at mindmap - LOCK HERE for 10 seconds
  // Nodes animate in quickly (57500-60500ms = 3s)
  // Interactive highlights show relationships (61500-64500ms = 3s)
  // Demo ends at 66000ms - maximum efficiency
];
