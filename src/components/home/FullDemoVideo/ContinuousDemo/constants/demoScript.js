/**
 * Demo Script - Timeline of actions for the continuous demo
 *
 * Story: Writing a complete academic essay on "AI in Healthcare"
 *
 * NEW FLOW - Full Essay Writing Experience with Agent TODO:
 * 1. User creates document, writes title and first sentence
 * 2. AI Autocomplete suggests completion (ghost text)
 * 3. Quick Edit - improve the first paragraph
 * 4. User uploads multiple PDFs/PPTX to Knowledge Base
 * 5. User asks AI to write complete essay
 *    - AI shows TODO plan first
 *    - Executes step by step: read skills → search KB (multiple) → web search → write
 *    - Shows diff review
 * 6. Text Review for grammar/clarity
 * 7. Show Mindmap/Outline view of the essay structure
 *
 * Timeline (~85 seconds total):
 * 0-6s:     Create document, type title
 * 6-14s:    Write first sentence + AI Autocomplete
 * 14-22s:   Quick Edit on the paragraph
 * 22-30s:   Upload multiple files to Knowledge Base (1.5x speed)
 * 30-58s:   AI writes complete essay with TODO plan execution (1.5x speed)
 * 61-72s:   Text Review - analyze, show 6 suggestions, accept first + accept all
 * 74-85s:   Mindmap/Outline view
 */

export const DEMO_SCRIPT = [
  // ==================== PHASE 1: Create Document (0-6s) ====================
  { time: 0, type: 'setPhase', value: 'Creating document...' },
  { time: 500, type: 'showCreateModal', value: true },

  // Type filename
  { time: 1000, type: 'typeModalInput', value: 'A' },
  { time: 1100, type: 'typeModalInput', value: 'I' },
  { time: 1200, type: 'typeModalInput', value: ' ' },
  { time: 1300, type: 'typeModalInput', value: 'H' },
  { time: 1400, type: 'typeModalInput', value: 'e' },
  { time: 1500, type: 'typeModalInput', value: 'a' },
  { time: 1600, type: 'typeModalInput', value: 'l' },
  { time: 1700, type: 'typeModalInput', value: 't' },
  { time: 1800, type: 'typeModalInput', value: 'h' },
  { time: 1900, type: 'typeModalInput', value: 'c' },
  { time: 2000, type: 'typeModalInput', value: 'a' },
  { time: 2100, type: 'typeModalInput', value: 'r' },
  { time: 2200, type: 'typeModalInput', value: 'e' },

  // Create file
  { time: 3500, type: 'createFile', id: 'essay', name: 'AI Healthcare Essay.md' },

  // Type title
  { time: 4500, type: 'typeTitle', value: 'The Transformative Impact of Artificial Intelligence on Modern Healthcare Systems' },
  { time: 5500, type: 'highlightToolbar', value: ['h1'] },
  { time: 5800, type: 'activateToolbar', value: ['h1'] },

  // ==================== PHASE 2: First Sentence + Autocomplete (6-14s) ====================
  { time: 6000, type: 'setPhase', value: 'Writing...' },
  { time: 6000, type: 'activateToolbar', value: [] },
  { time: 6500, type: 'addParagraph', value: '' },
  { time: 7000, type: 'typeParagraph', value: 'Artificial intelligence represents one of the most significant technological' },

  // AI Autocomplete appears
  { time: 9000, type: 'setPhase', value: 'AI Autocomplete' },
  { time: 9000, type: 'showAutocomplete', value: true },
  { time: 9500, type: 'showGhostText', value: ' advancements in the 21st century, with the potential to fundamentally reshape how healthcare is delivered, diagnosed, and managed across the globe.' },
  { time: 11000, type: 'showTabHint', value: true },

  // Accept autocomplete
  { time: 13000, type: 'acceptGhostText', value: true },
  { time: 13500, type: 'showAutocomplete', value: false },

  // ==================== PHASE 3: Quick Edit (14-22s) ====================
  { time: 14000, type: 'setPhase', value: 'Quick Edit' },

  // Select the ENTIRE first paragraph for quick edit
  // Full paragraph (225 chars): "Artificial intelligence represents one of the most significant technological advancements in the 21st century, with the potential to fundamentally reshape how healthcare is delivered, diagnosed, and managed across the globe."
  { time: 14500, type: 'setSelection', value: { paragraphIndex: 0, start: 0, end: 225 } },

  // Show quick edit menu
  { time: 15000, type: 'showQuickEdit', value: true },

  // Hover over "Improve" option
  { time: 16000, type: 'hoverQuickEdit', value: 'improve' },

  // Click improve - hide menu and show loading
  { time: 17500, type: 'showQuickEdit', value: false },
  { time: 17500, type: 'quickEditLoading', value: true },

  // Show improved result - genuinely improved version with stronger language and better flow
  { time: 20000, type: 'quickEditResult', value: {
    paragraphIndex: 0,
    original: "Artificial intelligence represents one of the most significant technological advancements in the 21st century, with the potential to fundamentally reshape how healthcare is delivered, diagnosed, and managed across the globe.",
    text: "Artificial intelligence has emerged as the defining technological revolution of the 21st century, wielding unprecedented potential to transform healthcare delivery, enhance diagnostic precision, and revolutionize patient management on a global scale."
  }},

  // Apply the improved text to the document (persist the change)
  { time: 21500, type: 'applyQuickEditResult', value: {
    paragraphIndex: 0,
    text: "Artificial intelligence has emerged as the defining technological revolution of the 21st century, wielding unprecedented potential to transform healthcare delivery, enhance diagnostic precision, and revolutionize patient management on a global scale."
  }},

  // ==================== PHASE 4: Upload to Knowledge Base (22-30s, 1.5x speed) ====================
  { time: 22000, type: 'setPhase', value: 'Knowledge Base' },

  // Click + button to show attach menu
  { time: 22300, type: 'showAttachMenu', value: true },
  { time: 23000, type: 'showAttachMenu', value: false },

  // First file upload - WHO Report PDF
  { time: 23300, type: 'showKBUpload', value: true },
  { time: 23300, type: 'setKBProgress', value: 30 },
  { time: 23500, type: 'setKBProgress', value: 70 },
  { time: 23700, type: 'setKBProgress', value: 100 },
  { time: 24000, type: 'addKBFile', value: { name: 'WHO-AI-Healthcare-2024.pdf', sections: 156, type: 'pdf', status: 'indexed' } },

  // Second file upload - Research Paper
  { time: 24300, type: 'setKBProgress', value: 40 },
  { time: 24500, type: 'setKBProgress', value: 80 },
  { time: 24700, type: 'setKBProgress', value: 100 },
  { time: 25000, type: 'addKBFile', value: { name: 'Nature-Medicine-AI-Review.pdf', sections: 89, type: 'pdf', status: 'indexed' } },

  // Third file upload - Presentation
  { time: 25300, type: 'setKBProgress', value: 50 },
  { time: 25500, type: 'setKBProgress', value: 100 },
  { time: 25800, type: 'addKBFile', value: { name: 'Healthcare-AI-Trends-2024.pptx', sections: 45, type: 'pptx', status: 'indexed' } },

  // Fourth file upload - Guidelines
  { time: 26100, type: 'setKBProgress', value: 60 },
  { time: 26300, type: 'setKBProgress', value: 100 },
  { time: 26600, type: 'addKBFile', value: { name: 'FDA-AI-Medical-Devices.pdf', sections: 72, type: 'pdf', status: 'indexed' } },

  { time: 27000, type: 'showKBUpload', value: false },
  { time: 27300, type: 'setPhase', value: '362 sections indexed' },

  // Small pause before chat
  { time: 29300, type: 'setPhase', value: 'AI Chat' },

  // ==================== PHASE 5: AI Writes Complete Essay with TODO Plan (30-58s) ====================
  // Enable web search toggle
  { time: 30300, type: 'setWebSearchEnabled', value: true },

  // User asks for complete essay directly
  { time: 30800, type: 'setChatInput', value: 'Write a comprehensive 3000-word academic essay on AI in healthcare. Cover diagnostic imaging, drug discovery, regulatory challenges, and ethical considerations. Use APA 7th edition citations and integrate data from my uploaded research materials.' },
  { time: 30900, type: 'setChatTyping', value: true },

  { time: 33300, type: 'sendChatMessage', value: 'Write a comprehensive 3000-word academic essay on AI in healthcare. Cover diagnostic imaging, drug discovery, regulatory challenges, and ethical considerations. Use APA 7th edition citations and integrate data from my uploaded research materials.' },

  // AI starts processing - show TODO plan first
  { time: 33800, type: 'aiThinking', value: true },
  { time: 34300, type: 'setPhase', value: 'Planning...' },

  // Show TODO plan (1.5x speed)
  { time: 34800, type: 'showTodoPlan', value: [
    { id: 1, text: 'Read essay writing skill instructions', status: 'pending' },
    { id: 2, text: 'Search knowledge base for AI diagnostics', status: 'pending' },
    { id: 3, text: 'Search knowledge base for drug discovery', status: 'pending' },
    { id: 4, text: 'Search knowledge base for FDA regulations', status: 'pending' },
    { id: 5, text: 'Web search for latest 2024 statistics', status: 'pending' },
    { id: 6, text: 'Generate essay with APA citations', status: 'pending' },
  ]},

  // Execute TODO items one by one (1.5x speed)
  // Step 1: Read skill instructions
  { time: 35800, type: 'updateTodoStatus', value: { id: 1, status: 'in_progress' } },
  { time: 35800, type: 'addChatTool', value: { name: 'read_skill_instructions', status: 'running' } },
  { time: 36100, type: 'setPhase', value: 'Reading skill instructions...' },
  { time: 37100, type: 'updateChatTool', index: 0, value: { status: 'completed' } },
  { time: 37100, type: 'updateTodoStatus', value: { id: 1, status: 'completed' } },

  // Step 2: Search KB for diagnostics
  { time: 37500, type: 'updateTodoStatus', value: { id: 2, status: 'in_progress' } },
  { time: 37500, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'AI diagnostic imaging radiology' } },
  { time: 37800, type: 'setPhase', value: 'Searching KB: diagnostics...' },
  { time: 39100, type: 'updateChatTool', index: 1, value: { status: 'completed' } },
  { time: 39100, type: 'updateTodoStatus', value: { id: 2, status: 'completed' } },

  // Step 3: Search KB for drug discovery
  { time: 39500, type: 'updateTodoStatus', value: { id: 3, status: 'in_progress' } },
  { time: 39500, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'AI drug discovery pharmaceutical' } },
  { time: 39800, type: 'setPhase', value: 'Searching KB: drug discovery...' },
  { time: 41100, type: 'updateChatTool', index: 2, value: { status: 'completed' } },
  { time: 41100, type: 'updateTodoStatus', value: { id: 3, status: 'completed' } },

  // Step 4: Search KB for FDA regulations
  { time: 41500, type: 'updateTodoStatus', value: { id: 4, status: 'in_progress' } },
  { time: 41500, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'FDA AI medical devices regulations' } },
  { time: 41800, type: 'setPhase', value: 'Searching KB: FDA regulations...' },
  { time: 43100, type: 'updateChatTool', index: 3, value: { status: 'completed' } },
  { time: 43100, type: 'updateTodoStatus', value: { id: 4, status: 'completed' } },

  // Step 5: Web search for latest statistics
  { time: 43500, type: 'updateTodoStatus', value: { id: 5, status: 'in_progress' } },
  { time: 43500, type: 'addChatTool', value: { name: 'web_search', status: 'running', query: 'AI healthcare statistics 2024' } },
  { time: 43800, type: 'setPhase', value: 'Web searching: 2024 stats...' },
  { time: 45500, type: 'updateChatTool', index: 4, value: { status: 'completed' } },
  { time: 45500, type: 'updateTodoStatus', value: { id: 5, status: 'completed' } },

  // Step 6: Generate essay
  { time: 45800, type: 'updateTodoStatus', value: { id: 6, status: 'in_progress' } },
  { time: 45800, type: 'addChatTool', value: { name: 'str_replace_editor', status: 'running' } },
  { time: 46100, type: 'setPhase', value: 'Writing essay...' },
  { time: 49100, type: 'updateChatTool', index: 5, value: { status: 'completed' } },
  { time: 49100, type: 'updateTodoStatus', value: { id: 6, status: 'completed' } },

  // Clear tools and hide TODO plan
  { time: 49500, type: 'clearChatTools', value: true },
  { time: 49500, type: 'hideTodoPlan', value: true },

  // Show full essay in diff mode
  { time: 50000, type: 'setPhase', value: 'Review Essay' },
  { time: 50000, type: 'showDiffMode', value: true },
  { time: 50500, type: 'setDiffContent', value: {
    type: 'inline_inserts',
    changes: [
      // Insert after paragraph 0 (intro)
      { afterParagraph: 0, type: 'insert', text: '## 1. Introduction & Background\n\nThe integration of artificial intelligence into healthcare represents an unprecedented paradigm shift in the history of medicine. According to the World Health Organization\'s 2024 Global AI Health Report, 78.3% of healthcare institutions across 142 countries have implemented or are piloting AI-driven diagnostic and clinical decision support systems (WHO, 2024). This rapid adoption trajectory, accelerating from merely 23% in 2020, reflects both technological maturation and mounting evidence of clinical efficacy.\n\nMcKinsey Global Institute estimates the potential annual value of AI applications in healthcare at $150 billion by 2026, with the majority derived from clinical operations and drug development optimization (McKinsey, 2024).' },

      { afterParagraph: 0, type: 'insert', text: '## 2. Current AI Applications in Healthcare\n\n### 2.1 Diagnostic Imaging & Radiology\n\nThe U.S. Food and Drug Administration has authorized 692 AI/ML-enabled medical devices as of January 2024, with radiological applications comprising 75.8% of all approvals—a testament to both technical feasibility and demonstrable clinical utility (FDA, 2024).\n\nDeep learning models have achieved diagnostic performance that meets or exceeds board-certified radiologists:\n\n- **Mammography**: Google Health\'s AI demonstrated 94.5% sensitivity in breast cancer detection\n- **Chest CT Analysis**: Viz.ai identifies vessel occlusions within 60 seconds\n- **Retinal Imaging**: IDx-DR achieved 97.4% sensitivity for diabetic retinopathy' },

      { afterParagraph: 0, type: 'insert', text: '### 2.2 Drug Discovery & Development\n\nAI reduces drug development timelines by 40-60% while substantially decreasing failure rates. DeepMind\'s AlphaFold2 was recognized with the 2024 Nobel Prize in Chemistry for solving the protein folding problem.\n\nNotable milestones include Insilico Medicine\'s AI-designed drug ISM001-055 completing Phase I trials in record time. Industry analysts project AI-discovered drugs will comprise 30% of new molecular entities by 2028.' },

      { afterParagraph: 0, type: 'insert', text: '## 3. Regulatory Landscape & Challenges\n\nThe FDA\'s 2024 guidance on Predetermined Change Control Plans (PCCPs) establishes a landmark precedent for adaptive AI systems. The European Union\'s AI Act, effective January 2025, classifies medical AI as "high-risk."\n\nKey regulatory developments:\n- **FDA GMLP**: 10 guiding principles for AI/ML lifecycle management\n- **WHO Ethics Framework**: Six core principles including transparency and accountability\n- **HIPAA-AI Addendum**: Proposed 2025 guidelines for AI-specific data governance' },

      { afterParagraph: 0, type: 'insert', text: '## 4. Ethical Considerations\n\nAlgorithmic bias remains critical—a 2024 JAMA meta-analysis found dermatological AI exhibited 18.4% lower sensitivity for darker skin tones.\n\nAddressing inequities requires:\n- **Data Diversification**: NIH BRIDGE2AI initiative mandating representative datasets\n- **Algorithmic Auditing**: Regular bias assessments using standardized fairness metrics\n- **Interpretability**: FDA emphasis on explainable AI (XAI) for clinical decisions' },

      { afterParagraph: 0, type: 'insert', text: '## 5. Future Directions & Conclusions\n\nFoundation models trained on multimodal medical data demonstrate potential for generalist medical AI assistants. Google\'s Med-PaLM 2 achieved expert-level performance across medical benchmarks.\n\nFederated learning addresses privacy concerns by enabling model training without centralizing patient data. Mayo Clinic and Cleveland Clinic deployments demonstrate HIPAA-compliant collaborative AI development.\n\n**References**\n- FDA. (2024). AI/ML-Enabled Medical Devices. U.S. Food & Drug Administration.\n- McKinney et al. (2024). AI system for breast cancer screening. Nature Medicine.\n- WHO. (2024). Ethics and Governance of AI for Health.\n\n*Word Count: 2,847*' },
    ]
  }},

  // AI completion message
  { time: 51000, type: 'addAIResponse', value: 'I\'ve written a comprehensive 2,847-word essay covering all requested topics with APA 7th edition citations. The essay integrates data from your uploaded WHO report, Nature Medicine review, and FDA guidelines.\n\nPlease review the changes in the editor.' },
  { time: 51500, type: 'aiThinking', value: false },

  // Accept essay
  { time: 57000, type: 'acceptDiffChange', index: 0 },
  { time: 57500, type: 'showDiffMode', value: false },
  { time: 57500, type: 'clearDiffContent', value: true },
  { time: 58000, type: 'setPhase', value: 'Essay Generated' },
  { time: 58000, type: 'applyFullEssay', value: true },

  // Set outline items (collapsed initially) - essay structure
  { time: 58000, type: 'setOutlineItems', value: [
    { id: 'title', label: 'The Transformative Impact...', level: 0 },
    { id: 'intro', label: '1. Introduction & Background', level: 1 },
    { id: 'apps', label: '2. Current AI Applications', level: 1 },
    { id: 'imaging', label: '2.1 Diagnostic Imaging', level: 2 },
    { id: 'drug', label: '2.2 Drug Discovery', level: 2 },
    { id: 'reg', label: '3. Regulatory Landscape', level: 1 },
    { id: 'ethics', label: '4. Ethical Considerations', level: 1 },
    { id: 'future', label: '5. Future Directions', level: 1 },
  ]},

  // ==================== PHASE 6: Text Review (61-72s) ====================
  { time: 61000, type: 'setPhase', value: 'Text Review' },

  // Click Review button - show loading state
  { time: 61500, type: 'showReview', value: true },
  { time: 61500, type: 'reviewLoading', value: true },

  // Analysis complete - show issues
  { time: 63500, type: 'reviewLoading', value: false },
  { time: 63500, type: 'setReviewIssues', value: [
    {
      id: 1,
      type: 'grammar',
      text: 'unprecedented paradigm shift',
      suggestion: 'an unprecedented paradigm shift',
      position: { start: 74, end: 99 },
      color: '#EF4444',
    },
    {
      id: 2,
      type: 'clarity',
      text: 'piloting',
      suggestion: 'actively piloting',
      position: { start: 270, end: 278 },
      color: '#3B82F6',
    },
    {
      id: 3,
      type: 'style',
      text: 'a testament to',
      suggestion: 'demonstrating',
      position: { start: 450, end: 464 },
      color: '#8B5CF6',
    },
    {
      id: 4,
      type: 'grammar',
      text: 'that meets or exceeds',
      suggestion: 'that meets or surpasses',
      position: { start: 580, end: 601 },
      color: '#EF4444',
    },
    {
      id: 5,
      type: 'tone',
      text: 'substantially decreasing',
      suggestion: 'significantly reducing',
      position: { start: 720, end: 744 },
      color: '#F59E0B',
    },
    {
      id: 6,
      type: 'clarity',
      text: 'remains critical',
      suggestion: 'remains a critical concern',
      position: { start: 890, end: 906 },
      color: '#3B82F6',
    },
  ]},
  { time: 64000, type: 'setPhase', value: '6 issues found' },

  // Click first issue - highlight it
  { time: 65500, type: 'highlightReviewIssue', value: 0 },

  // Accept first issue individually
  { time: 67000, type: 'fixReviewIssue', index: 0 },
  { time: 67000, type: 'setPhase', value: '5 issues remaining' },

  // Click "Accept All" to fix remaining issues
  { time: 69000, type: 'acceptAllReviewIssues', value: true },
  { time: 69000, type: 'setPhase', value: 'All issues reviewed' },

  // Clear review state
  { time: 71500, type: 'showReview', value: false },
  { time: 71500, type: 'setReviewIssues', value: [] },

  // ==================== PHASE 7: Mindmap/Outline View (74-85s) ====================
  { time: 74000, type: 'setPhase', value: 'Mindlines View' },

  // Expand outline in sidebar
  { time: 74000, type: 'setOutlineExpanded', value: true },

  // Show mindmap view
  { time: 74500, type: 'showMindlines', value: true },

  // Add nodes progressively to build the mindmap
  // Clean horizontal tree layout - root at left, branches extend right

  // Root node - left side
  { time: 75000, type: 'addMindlineNode', value: { id: 'root', label: 'AI in Healthcare', level: 0, x: 80, y: 110 } },

  // Level 1 nodes - vertical stack on the right of root
  { time: 75500, type: 'addMindlineNode', value: { id: 'intro', label: 'Intro', level: 1, x: 220, y: 35, parent: 'root' } },
  { time: 76000, type: 'addMindlineNode', value: { id: 'applications', label: 'Apps', level: 1, x: 220, y: 75, parent: 'root' } },
  { time: 76500, type: 'addMindlineNode', value: { id: 'regulatory', label: 'Regulatory', level: 1, x: 220, y: 115, parent: 'root' } },
  { time: 77000, type: 'addMindlineNode', value: { id: 'ethics', label: 'Ethics', level: 1, x: 220, y: 155, parent: 'root' } },
  { time: 77500, type: 'addMindlineNode', value: { id: 'future', label: 'Future', level: 1, x: 220, y: 195, parent: 'root' } },

  // Level 2 nodes - to the right of their parents
  { time: 78500, type: 'addMindlineNode', value: { id: 'diagnostics', label: 'Imaging', level: 2, x: 330, y: 60, parent: 'applications' } },
  { time: 79000, type: 'addMindlineNode', value: { id: 'drug', label: 'Drugs', level: 2, x: 330, y: 90, parent: 'applications' } },
  { time: 79500, type: 'addMindlineNode', value: { id: 'fda', label: 'FDA', level: 2, x: 330, y: 115, parent: 'regulatory' } },
  { time: 80000, type: 'addMindlineNode', value: { id: 'bias', label: 'Bias', level: 2, x: 330, y: 155, parent: 'ethics' } },

  // Highlight interaction - hover on applications
  { time: 82000, type: 'setMindlineHover', value: 'applications' },

  // Final state
  { time: 85000, type: 'setMindlineHover', value: null },
  { time: 85500, type: 'setPhase', value: 'Demo Complete' },
];

// Essay content for applying after diff is accepted
export const FULL_ESSAY_CONTENT = {
  sections: [
    '## 1. Introduction & Background',
    '## 2. Current AI Applications in Healthcare',
    '### 2.1 Diagnostic Imaging & Radiology',
    '### 2.2 Drug Discovery & Development',
    '## 3. Regulatory Landscape & Challenges',
    '## 4. Ethical Considerations',
    '## 5. Future Directions & Conclusions',
  ]
};
