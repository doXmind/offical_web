// Demo content for Mock Editor scenes

export const SCENE_DURATION = 8000; // 8 seconds per scene

export const ANIMATION_CONFIG = {
  typewriter: {
    charDelay: 30,
    wordDelay: 50,
  },
  streaming: {
    chunkDelay: 20,
  },
  transition: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  },
  selection: {
    duration: 0.3,
  },
  mindmap: {
    nodeDelay: 0.15,
    lineDrawDuration: 0.4,
  },
};

export const AI_CHAT_CONTENT = {
  userMessage: "Help me improve this paragraph to sound more professional",
  aiResponse: "I'll enhance the paragraph with more formal language and clearer structure...",
  originalText: "Writing is hard. Many people struggle to express their ideas clearly.",
  improvedText: "Effective writing requires deliberate practice. Many individuals encounter challenges articulating their ideas with precision.",
};

export const QUICK_EDIT_CONTENT = {
  text: "The meeting was very good and everyone was happy about it.",
  improvedText: "The meeting proved highly productive, and all participants expressed satisfaction with the outcomes.",
  commands: [
    { name: 'Fix Grammar', icon: 'CheckCircle' },
    { name: 'Improve', icon: 'Sparkles' },
    { name: 'Simplify', icon: 'Type' },
    { name: 'Expand', icon: 'Edit3' },
    { name: 'Shorten', icon: 'Zap' },
    { name: 'Translate', icon: 'Languages' },
  ],
};

export const MINDMAP_CONTENT = {
  nodes: [
    { id: 'root', label: 'AI Writing Guide', level: 0 },
    { id: 'intro', label: 'Introduction', level: 1, parent: 'root' },
    { id: 'features', label: 'Key Features', level: 1, parent: 'root' },
    { id: 'quick-edit', label: 'Quick Edit', level: 2, parent: 'features' },
    { id: 'ai-chat', label: 'AI Chat', level: 2, parent: 'features' },
    { id: 'getting-started', label: 'Getting Started', level: 1, parent: 'root' },
  ],
};

export const AUTOCOMPLETE_CONTENT = {
  typedText: "Today I want to talk about ",
  suggestion: "the importance of clear communication in modern workplaces.",
  continuedText: "Clear communication helps teams collaborate effectively.",
};

export const SIDEBAR_FILES = [
  { name: 'AI Writing Guide.md', active: true },
  { name: 'Project Notes.md', active: false },
  { name: 'Meeting Summary.md', active: false },
];
