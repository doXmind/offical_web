// Animation timing configuration
export const ANIMATION_CONFIG = {
  typewriter: { charDelay: 30, wordDelay: 50 },
  streaming: { chunkDelay: 20, chunkSize: 3 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  selection: { duration: 0.3 },
  fade: { duration: 0.2 },
};

// Scene 1: File Creation
export const FILE_CREATION_CONTENT = {
  newFileName: 'My Project Plan',
  modalTitle: 'Create New File',
  initialFiles: [],
};

// Scene 2: Rich Editor
export const RICH_EDITOR_CONTENT = {
  title: 'Introduction',
  paragraph: 'Welcome to doXmind, the AI-powered writing studio that helps you write better, faster.',
  bulletItems: [
    'AI-powered writing assistance',
    'Smart suggestions and autocomplete',
    'Seamless collaboration tools',
  ],
  codeBlock: 'const greeting = "Hello, doXmind!";',
};

// Scene 3: Autocomplete
export const AUTOCOMPLETE_CONTENT = {
  typedText: 'Today I want to discuss',
  suggestion: ' the importance of clear communication in modern workplaces. Effective communication leads to better collaboration and productivity.',
  tabHint: 'Press Tab to accept',
};

// Scene 4: Quick Edit
export const QUICK_EDIT_CONTENT = {
  originalText: 'The meeting was good and we talked about many things that were important for the project success.',
  selectedText: 'good and we talked about many things that were important',
  improvedText: 'productive and addressed key strategic priorities essential',
  commands: [
    { id: 'grammar', label: 'Fix Grammar', icon: 'CheckCircle' },
    { id: 'improve', label: 'Improve', icon: 'Sparkles' },
    { id: 'simplify', label: 'Simplify', icon: 'FileText' },
    { id: 'expand', label: 'Expand', icon: 'ArrowUp' },
    { id: 'shorten', label: 'Shorten', icon: 'ArrowDown' },
    { id: 'tone', label: 'Change Tone', icon: 'MessageSquare' },
    { id: 'translate', label: 'Translate', icon: 'Languages' },
  ],
};

// Scene 5: AI Chat
export const AI_CHAT_CONTENT = {
  userMessage: 'Please improve the introduction paragraph to be more engaging.',
  userContext: {
    type: 'selection',
    text: 'This document describes the project plan and its objectives for the upcoming quarter.',
  },
  originalText: 'This document describes the project plan and its objectives for the upcoming quarter.',
  improvedText: 'This comprehensive project blueprint outlines our strategic objectives and actionable milestones for the upcoming quarter, setting the stage for transformative growth.',
  aiResponse: `I've enhanced your introduction. Here's what I changed:

### Key Improvements

- **Stronger opening** with "comprehensive blueprint"
- Added **strategic language** to convey importance
- Included *actionable milestones* for clarity

The new version creates a more professional tone.`,
  tools: [
    { name: 'view_document', status: 'completed' },
    { name: 'str_replace_editor', status: 'completed' },
  ],
};

// Scene 6: Knowledge Base
export const KNOWLEDGE_BASE_CONTENT = {
  fileName: 'Q4-Strategy.pdf',
  fileSize: '2.4 MB',
  sectionsIndexed: 24,
  userQuestion: 'What are the key revenue targets for Q4?',
  aiResponse: `Based on your **Q4 Strategy** document:

### Revenue Targets
- **$2.5M** in new subscriptions
- **15%** growth in enterprise accounts
- **$800K** from upsells

### Key Milestones
1. Launch enterprise tier by Oct 15
2. Complete API v2 by Nov 1`,
};

// Scene 7: Text Review
export const TEXT_REVIEW_CONTENT = {
  textWithIssues: [
    { text: 'The team have', issue: 'grammar', suggestion: 'has' },
    { text: 'very unique', issue: 'clarity', suggestion: 'unique' },
    { text: 'basically', issue: 'tone', suggestion: 'fundamentally' },
  ],
  fullText: 'The team have made very unique progress. They basically completed all milestones ahead of schedule.',
  correctedText: 'The team has made unique progress. They fundamentally completed all milestones ahead of schedule.',
  issueCount: 3,
};

// Scene 8: Diff Review
export const DIFF_REVIEW_CONTENT = {
  changes: [
    {
      type: 'delete',
      text: 'good progress',
    },
    {
      type: 'insert',
      text: 'exceptional progress',
    },
    {
      type: 'delete',
      text: 'some challenges',
    },
    {
      type: 'insert',
      text: 'strategic opportunities',
    },
  ],
  originalLine: 'The project showed good progress despite some challenges.',
  newLine: 'The project showed exceptional progress while identifying strategic opportunities.',
};

// Scene 9: Mobile Experience
export const MOBILE_CONTENT = {
  gestures: [
    { direction: 'right', action: 'Open sidebar' },
    { direction: 'left', action: 'Open outline' },
    { direction: 'up', action: 'AI panel' },
  ],
  bottomNavItems: ['Files', 'Edit', 'AI', 'More'],
};

// Scene 10: Mindlines
export const MINDLINES_CONTENT = {
  nodes: [
    { id: 'root', label: 'AI Writing Guide', level: 0, x: 200, y: 100 },
    { id: 'intro', label: 'Introduction', level: 1, x: 100, y: 180, parent: 'root' },
    { id: 'features', label: 'Key Features', level: 1, x: 200, y: 180, parent: 'root' },
    { id: 'advanced', label: 'Advanced Tips', level: 1, x: 300, y: 180, parent: 'root' },
    { id: 'autocomplete', label: 'Autocomplete', level: 2, x: 150, y: 250, parent: 'features' },
    { id: 'chat', label: 'AI Chat', level: 2, x: 250, y: 250, parent: 'features' },
  ],
  outlineItems: [
    { id: 'root', label: 'AI Writing Guide', level: 0, isExpanded: true },
    { id: 'intro', label: 'Introduction', level: 1 },
    { id: 'features', label: 'Key Features', level: 1, isExpanded: true },
    { id: 'autocomplete', label: 'Autocomplete', level: 2 },
    { id: 'chat', label: 'AI Chat', level: 2 },
    { id: 'advanced', label: 'Advanced Tips', level: 1 },
  ],
  newNode: { id: 'new', label: 'Best Practices', level: 1, x: 400, y: 180, parent: 'root' },
};

// Common UI content
export const UI_CONTENT = {
  files: [
    { id: 'welcome', name: 'Welcome.md' },
    { id: 'project', name: 'My Project Plan.md' },
    { id: 'notes', name: 'Notes.md' },
  ],
};
