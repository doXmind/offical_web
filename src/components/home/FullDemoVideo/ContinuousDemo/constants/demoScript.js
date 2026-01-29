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
 * 6. AI Semantic Search - search document with relevance scores
 * 7. Text Review for grammar/clarity with hover popup
 * 8. Show Mindmap/Outline view of the essay structure
 *
 * Timeline (~88 seconds total):
 * 0-6s:     Create document, type title
 * 6-14s:    Write first sentence + AI Autocomplete
 * 14-22s:   Quick Edit on the paragraph
 * 22-30s:   Upload multiple files to Knowledge Base (1.5x speed)
 * 30-52s:   AI writes complete essay with TODO plan execution (2x speed)
 * 54-58s:   AI Semantic Search - type query, show results with relevance %
 * 58-68s:   Text Review - analyze, show 5 suggestions, hover popup, accept all
 * 68-88s:   Mindmap/Outline view (sidebar outline → mindmap center)
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

  // ==================== PHASE 4: Upload to Knowledge Base (22-26s, 2x speed - compressed) ====================
  { time: 22000, type: 'setPhase', value: 'Knowledge Base' },

  // Click + button to show attach menu
  { time: 22200, type: 'showAttachMenu', value: true },
  { time: 22600, type: 'showAttachMenu', value: false },

  // Batch 1: First two files upload simultaneously (faster)
  { time: 22700, type: 'showKBUpload', value: true },
  { time: 22700, type: 'setKBProgress', value: 50 },
  { time: 22900, type: 'setKBProgress', value: 100 },
  { time: 23100, type: 'addKBFile', value: { name: 'WHO-AI-Healthcare-2026.pdf', sections: 156, type: 'pdf', status: 'indexed' } },
  { time: 23200, type: 'addKBFile', value: { name: 'Nature-Medicine-AI-Review.docx', sections: 89, type: 'docx', status: 'indexed' } },

  // Batch 2: Last two files
  { time: 23400, type: 'setKBProgress', value: 50 },
  { time: 23600, type: 'setKBProgress', value: 100 },
  { time: 23800, type: 'addKBFile', value: { name: 'Healthcare-AI-Trends-2026.pptx', sections: 45, type: 'pptx', status: 'indexed' } },
  { time: 23900, type: 'addKBFile', value: { name: 'FDA-AI-Medical-Devices-2026.pdf', sections: 72, type: 'pdf', status: 'indexed' } },

  { time: 24200, type: 'showKBUpload', value: false },
  { time: 24300, type: 'setPhase', value: '362 sections indexed' },

  // Transition to AI Chat
  { time: 25500, type: 'setPhase', value: 'AI Chat' },

  // ==================== PHASE 5: AI Writes Complete Essay with TODO Plan (26-54s) ====================
  // Enable web search toggle
  { time: 26300, type: 'setWebSearchEnabled', value: true },

  // User asks for complete essay directly
  { time: 26800, type: 'setChatInput', value: 'Write a comprehensive 3000-word academic essay on AI in healthcare. Cover diagnostic imaging, drug discovery, regulatory challenges, and ethical considerations. Use APA 7th edition citations and integrate data from my uploaded research materials.' },
  { time: 26900, type: 'setChatTyping', value: true },

  { time: 27300, type: 'sendChatMessage', value: 'Write a comprehensive 3000-word academic essay on AI in healthcare. Cover diagnostic imaging, drug discovery, regulatory challenges, and ethical considerations. Use APA 7th edition citations and integrate data from my uploaded research materials.' },

  // AI starts processing - show TODO plan first
  { time: 27800, type: 'aiThinking', value: true },
  { time: 28300, type: 'setPhase', value: 'Planning...' },

  // Show TODO plan (compressed timing)
  { time: 28800, type: 'showTodoPlan', value: [
    { id: 1, text: 'Read essay writing skill instructions', status: 'pending' },
    { id: 2, text: 'Search knowledge base for AI diagnostics', status: 'pending' },
    { id: 3, text: 'Search knowledge base for drug discovery', status: 'pending' },
    { id: 4, text: 'Search knowledge base for FDA regulations', status: 'pending' },
    { id: 5, text: 'Web search for latest 2026 statistics', status: 'pending' },
    { id: 6, text: 'Generate essay with APA citations', status: 'pending' },
  ]},

  // Execute TODO items - COMPRESSED timing (each step 500ms instead of 650ms)
  // Step 1: Read skill instructions
  { time: 29800, type: 'updateTodoStatus', value: { id: 1, status: 'in_progress' } },
  { time: 29800, type: 'addChatTool', value: { name: 'read_skill_instructions', status: 'running' } },
  { time: 29950, type: 'setPhase', value: 'Reading skill instructions...' },
  { time: 30350, type: 'updateChatTool', index: 0, value: { status: 'completed' } },
  { time: 30350, type: 'updateTodoStatus', value: { id: 1, status: 'completed', result: 'Argumentative essay template loaded' } },

  // Step 2: Search KB for diagnostics
  { time: 30500, type: 'updateTodoStatus', value: { id: 2, status: 'in_progress', preview: '96.2% sensitivity in breast cancer detection...' } },
  { time: 30500, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'AI diagnostic imaging radiology' } },
  { time: 30650, type: 'setPhase', value: 'Searching KB: diagnostics...' },
  { time: 31150, type: 'updateChatTool', index: 1, value: { status: 'completed' } },
  { time: 31150, type: 'updateTodoStatus', value: { id: 2, status: 'completed', result: 'Found 12 relevant sections on AI diagnostics' } },

  // Step 3: Search KB for drug discovery
  { time: 31300, type: 'updateTodoStatus', value: { id: 3, status: 'in_progress', preview: 'AlphaFold3 predicts protein-ligand interactions...' } },
  { time: 31300, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'AI drug discovery pharmaceutical' } },
  { time: 31450, type: 'setPhase', value: 'Searching KB: drug discovery...' },
  { time: 31950, type: 'updateChatTool', index: 2, value: { status: 'completed' } },
  { time: 31950, type: 'updateTodoStatus', value: { id: 3, status: 'completed', result: 'Found 8 sections on AI drug discovery' } },

  // Step 4: Search KB for FDA regulations
  { time: 32100, type: 'updateTodoStatus', value: { id: 4, status: 'in_progress', preview: 'FDA has authorized 1,247 AI/ML-enabled devices...' } },
  { time: 32100, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running', query: 'FDA AI medical devices regulations' } },
  { time: 32250, type: 'setPhase', value: 'Searching KB: FDA regulations...' },
  { time: 32750, type: 'updateChatTool', index: 3, value: { status: 'completed' } },
  { time: 32750, type: 'updateTodoStatus', value: { id: 4, status: 'completed', result: 'Found 6 sections on FDA regulations' } },

  // Step 5: Web search for latest statistics
  { time: 32900, type: 'updateTodoStatus', value: { id: 5, status: 'in_progress', preview: '84.7% of healthcare institutions use AI...' } },
  { time: 32900, type: 'addChatTool', value: { name: 'web_search', status: 'running', query: 'AI healthcare statistics 2026' } },
  { time: 33050, type: 'setPhase', value: 'Web searching: 2026 stats...' },
  { time: 33750, type: 'updateChatTool', index: 4, value: { status: 'completed' } },
  { time: 33750, type: 'updateTodoStatus', value: { id: 5, status: 'completed', result: 'Found latest WHO and McKinsey data' } },

  // Step 6: Generate essay
  { time: 33900, type: 'updateTodoStatus', value: { id: 6, status: 'in_progress' } },
  { time: 33900, type: 'addChatTool', value: { name: 'str_replace_editor', status: 'running' } },
  { time: 34050, type: 'setPhase', value: 'Writing essay...' },
  { time: 35500, type: 'updateChatTool', index: 5, value: { status: 'completed' } },
  { time: 35500, type: 'updateTodoStatus', value: { id: 6, status: 'completed', result: '3,247 words with 8 APA citations' } },

  // Clear tools and hide TODO plan
  { time: 35700, type: 'clearChatTools', value: true },
  { time: 35700, type: 'hideTodoPlan', value: true },

  // Show full essay in diff mode
  { time: 36500, type: 'setPhase', value: 'Review Essay' },
  { time: 36500, type: 'showDiffMode', value: true },
  { time: 37000, type: 'setDiffContent', value: {
    type: 'inline_inserts',
    changes: [
      // Section 1: Introduction (following Argumentative Essay Template)
      { afterParagraph: 0, type: 'insert', text: '## 1. Introduction\n\n*Hook:* In the time it takes to read this sentence, an AI system somewhere in the world has just diagnosed a case of diabetic retinopathy, identified a potential drug candidate, and flagged an anomaly in a patient\'s CT scan. This is not science fiction—it is the current reality of healthcare in 2026.\n\n*Context:* The integration of artificial intelligence into healthcare represents an unprecedented paradigm shift in the history of medicine. According to the World Health Organization\'s 2026 Global AI Health Report, 84.7% of healthcare institutions across 156 countries have implemented or are actively piloting AI-driven diagnostic and clinical decision support systems (WHO, 2026). This rapid adoption trajectory, accelerating from merely 23% in 2020, reflects both technological maturation and mounting evidence of clinical efficacy. McKinsey Global Institute estimates the potential annual value of AI applications in healthcare at $210 billion by 2028, with the majority derived from clinical operations and drug development optimization (McKinsey, 2026).\n\n*Thesis Statement:* Although concerns about algorithmic bias, data privacy, and regulatory uncertainty persist, artificial intelligence should be embraced as a transformative force in healthcare because it demonstrably improves diagnostic accuracy, accelerates drug discovery, and enhances patient outcomes when implemented with appropriate oversight and ethical frameworks.' },

      // Section 2: Body Paragraph 1 - Diagnostic Applications (Strongest Argument)
      { afterParagraph: 0, type: 'insert', text: '## 2. AI-Powered Diagnostics: Surpassing Human Limitations\n\n**Topic Sentence:** The most compelling evidence for AI adoption in healthcare lies in its demonstrated ability to match or exceed human diagnostic performance across multiple specialties.\n\n### 2.1 Diagnostic Imaging & Radiology\n\nThe U.S. Food and Drug Administration has authorized 1,247 AI/ML-enabled medical devices as of January 2026, with radiological applications comprising 72.3% of all approvals—demonstrating both technical feasibility and clinical utility (FDA, 2026). Deep learning models have achieved diagnostic performance that meets or exceeds board-certified radiologists across multiple imaging modalities:\n\n- **Mammography**: Google Health\'s AI demonstrated 96.2% sensitivity in breast cancer detection, reducing false negatives by 11.7% compared to human radiologists (McKinney et al., 2026)\n- **Chest CT Analysis**: Viz.ai\'s FDA-cleared algorithm identifies large vessel occlusions within 45 seconds, enabling faster stroke intervention and improved patient outcomes\n- **Retinal Imaging**: IDx-DR achieved 98.1% sensitivity for diabetic retinopathy detection, now deployed in over 3,000 primary care clinics nationwide\n- **Pathology**: PathAI\'s algorithms demonstrate 99.7% accuracy in identifying metastatic breast cancer in lymph node biopsies\n\n**Explanation:** These statistics are not merely impressive numbers—they translate directly into lives saved. An 11.7% reduction in false negatives means thousands of cancers caught earlier, when treatment is most effective. The 45-second stroke detection represents the difference between full recovery and permanent disability for countless patients.\n\n**Transition:** While diagnostic imaging represents AI\'s most visible success in healthcare, perhaps its most transformative potential lies in revolutionizing how we discover and develop new treatments.' },

      // Section 3: Body Paragraph 2 - Drug Discovery
      { afterParagraph: 0, type: 'insert', text: '## 3. Accelerating Drug Discovery: From Decades to Months\n\n**Topic Sentence:** AI is fundamentally reshaping the pharmaceutical industry by compressing drug development timelines that traditionally span 10-15 years into mere months, while substantially decreasing failure rates.\n\n### 3.1 Protein Structure Prediction\n\nDeepMind\'s AlphaFold3, building on its Nobel Prize-winning predecessor, now predicts protein-ligand interactions with 89% accuracy—enabling researchers to design drugs that precisely fit their molecular targets (Hassabis et al., 2026). The AlphaFold Protein Structure Database has expanded to include over 250 million predicted structures, accelerating research across nearly every therapeutic area.\n\n### 3.2 AI-Designed Drug Candidates\n\nNotable milestones in AI-driven drug discovery include:\n\n- **Insilico Medicine\'s ISM001-055**: Now in Phase II trials, this fully AI-designed drug for idiopathic pulmonary fibrosis has shown promising efficacy with minimal side effects\n- **Recursion Pharmaceuticals**: Using AI to screen billions of chemical compounds, now has 4 programs in clinical trials for rare diseases\n- **Isomorphic Labs (Google DeepMind)**: Partnered with Eli Lilly and Novartis in $3B deals to co-develop AI-discovered drugs\n\n**Evidence:** Industry analysts project AI-discovered drugs will comprise 45% of new molecular entities by 2030. The economic implications are staggering: reducing drug development costs from an average of $2.6 billion to under $400 million per approved drug (Deloitte, 2026).\n\n**Explanation:** This acceleration matters because patients with life-threatening diseases cannot wait a decade for treatments. Every year saved in drug development represents hope for millions of patients with currently untreatable conditions.\n\n**Transition:** However, the rapid advancement of AI in healthcare has outpaced regulatory frameworks, creating a complex landscape that requires careful navigation.' },

      // Section 4: Body Paragraph 3 - Counterargument (Regulatory & Ethical Challenges)
      { afterParagraph: 0, type: 'insert', text: '## 4. Addressing the Counterargument: Regulatory and Ethical Challenges\n\n**Acknowledging Opposition:** Critics rightfully argue that AI in healthcare poses significant risks, including algorithmic bias that could exacerbate health disparities, lack of transparency in decision-making, and inadequate regulatory oversight for rapidly evolving systems.\n\n### 4.1 The Bias Problem\n\nA 2026 JAMA meta-analysis found that while progress has been made, dermatological AI systems still exhibited 12.3% lower sensitivity for darker skin tones—a troubling finding that could perpetuate existing healthcare inequities (Adamson & Smith, 2026). However, this represents a significant improvement from the 18.4% gap documented in 2024, demonstrating that bias mitigation efforts are working.\n\n### 4.2 Regulatory Frameworks Now Active\n\nThese challenges are being actively addressed through established regulatory frameworks:\n\n- **FDA GMLP Guidelines**: The FDA\'s Good Machine Learning Practice framework, updated in 2026, now requires pre-market bias testing across 12 demographic subgroups\n- **European Union AI Act**: Now fully enforced since January 2025, this legislation classifies medical AI as "high-risk," with 847 healthcare AI products certified compliant\n- **WHO Ethics Framework**: Adopted by 142 member nations, establishing global standards for AI transparency and accountability\n- **HIPAA-AI Amendment**: Enacted in 2026, specifically addressing AI-related data governance, model training consent, and patient privacy\n\n### 4.3 Industry Self-Regulation\n\nLeading healthcare AI companies have voluntarily implemented:\n\n- **Diverse Training Data Requirements**: NIH BRIDGE2AI initiative has curated datasets with demographic parity across 28 subgroups\n- **Algorithmic Auditing**: Coalition for Health AI (CHAI) standards now adopted by 73% of healthcare AI vendors\n- **Explainable AI (XAI)**: FDA-mandated interpretability requirements for all diagnostic AI systems\n\n**Refutation:** While these concerns are valid, they argue for better implementation rather than abandonment of AI. The alternative—continuing to rely solely on human judgment—ignores the documented limitations and biases inherent in human decision-making, which AI can help mitigate when properly designed.\n\n**Transition:** Looking beyond current challenges, the trajectory of AI in healthcare points toward even more transformative possibilities.' },

      // Section 5: Future Directions
      { afterParagraph: 0, type: 'insert', text: '## 5. Future Directions: The Next Frontier\n\n### 5.1 Foundation Models in Medicine\n\nFoundation models trained on multimodal medical data are now deployed in clinical settings. Google\'s Med-Gemini and OpenAI\'s GPT-Medical have achieved expert-level performance across medical licensing examinations and are being piloted as clinical decision support tools in 200+ hospitals (Singhal et al., 2026). Microsoft\'s Azure Health Bot, powered by GPT-4-medical, handles 15 million patient interactions monthly.\n\n### 5.2 Federated Learning at Scale\n\nFederated learning architectures have moved beyond pilots to production deployments. The National Health AI Consortium, comprising 340 US hospitals, now trains collaborative models without centralizing patient data. Early results show 23% improvement in rare disease detection compared to single-institution models.\n\n### 5.3 Personalized Medicine at Scale\n\nThe convergence of AI with genomics, proteomics, and real-world evidence enables truly personalized treatment recommendations. Current implementations demonstrate:\n\n- 41% improvement in cancer treatment selection accuracy\n- 35% reduction in adverse drug reactions through AI-powered pharmacogenomics\n- 52% faster identification of optimal treatment protocols for rare diseases\n- 28% decrease in hospital readmissions through predictive patient monitoring' },

      // Section 6: Conclusion
      { afterParagraph: 0, type: 'insert', text: '## 6. Conclusion\n\n**Restated Thesis:** The evidence overwhelmingly supports the responsible adoption of artificial intelligence in healthcare. While legitimate concerns about bias, privacy, and regulation must be addressed, the demonstrable benefits—improved diagnostic accuracy, accelerated drug discovery, and enhanced patient outcomes—are too significant to ignore.\n\n**Summary of Arguments:** AI systems have proven capable of matching or exceeding human performance in diagnostic imaging, with tangible impacts on cancer detection and stroke intervention. The transformation of drug discovery from decade-long processes to months-long endeavors promises hope for millions of patients. Meanwhile, established regulatory frameworks and industry self-regulation are providing robust guardrails for ethical implementation.\n\n**Broader Implications:** The question is no longer whether AI will transform healthcare, but how we ensure this transformation benefits all patients equitably. Healthcare systems that fail to embrace AI risk falling behind, ultimately to the detriment of the patients they serve.\n\n**Call to Action:** Policymakers, healthcare institutions, and AI developers must collaborate to ensure that the AI revolution in healthcare leaves no patient behind. This requires sustained investment in diverse training data, rigorous bias testing, transparent deployment practices, and continuous monitoring of real-world outcomes.\n\n---\n\n## References\n\nAdamson, A. S., & Smith, A. (2026). Progress and challenges in algorithmic fairness for dermatological AI. *JAMA Dermatology, 162*(1), 45-52.\n\nDeloitte. (2026). *AI in pharmaceutical R&D: The $75 billion opportunity*. Deloitte Center for Health Solutions.\n\nFDA. (2026). *Artificial intelligence and machine learning (AI/ML)-enabled medical devices: 2026 update*. U.S. Food & Drug Administration.\n\nHassabis, D., et al. (2026). AlphaFold3: Accurate prediction of protein-ligand interactions. *Nature, 612*, 493-500.\n\nMcKinney, S. M., et al. (2026). Five-year follow-up of AI-assisted breast cancer screening. *Nature Medicine, 32*(2), 178-186.\n\nMcKinsey Global Institute. (2026). *The $210 billion AI healthcare opportunity*. McKinsey & Company.\n\nSinghal, K., et al. (2026). Med-Gemini: A multimodal foundation model for clinical practice. *Nature, 628*, 259-267.\n\nWHO. (2026). *Global standards for AI in healthcare: Implementation report*. World Health Organization.\n\n---\n\n*Word Count: 3,247*' },
    ]
  }},

  // AI completion message
  { time: 37500, type: 'addAIResponse', value: 'I\'ve written a comprehensive **3,247-word** argumentative essay following your template structure. The essay includes:\n\n• **Introduction** with hook, context, and thesis statement\n• **Body paragraphs** with topic sentences, evidence, and analysis\n• **Counterargument** addressing ethical concerns\n• **Conclusion** with call to action\n• **8 APA 7th edition citations** from your uploaded sources\n\nPlease review the changes in the editor.' },
  { time: 38000, type: 'aiThinking', value: false },

  // Accept essay - ULTRA COMPRESSED: Quick review and accept
  { time: 39500, type: 'acceptDiffChange', index: 0 },
  { time: 39800, type: 'showDiffMode', value: false },
  { time: 39800, type: 'clearDiffContent', value: true },
  { time: 40000, type: 'setPhase', value: 'Essay Generated' },
  { time: 40000, type: 'applyFullEssay', value: true },

  // Show stats popup - Quick display (1s)
  { time: 40100, type: 'showStats', value: {
    words: 3247,
    citations: 8,
    sources: 4,
    time: 12
  }},
  { time: 41100, type: 'hideStats', value: true },

  // Set outline items - essay structure
  { time: 42000, type: 'setOutlineItems', value: [
    { id: 'title', label: 'The Transformative Impact...', level: 0 },
    { id: 'intro', label: '1. Introduction', level: 1 },
    { id: 'diagnostics', label: '2. AI-Powered Diagnostics', level: 1 },
    { id: 'imaging', label: '2.1 Diagnostic Imaging', level: 2 },
    { id: 'drug', label: '3. Drug Discovery', level: 1 },
    { id: 'counter', label: '4. Counterargument', level: 1 },
    { id: 'future', label: '5. Future Directions', level: 1 },
    { id: 'conclusion', label: '6. Conclusion', level: 1 },
  ]},

  // ==================== PHASE 6: AI Semantic Search (43-47s) - COMPRESSED ====================
  { time: 43000, type: 'setPhase', value: 'AI Search' },

  // Open AI Search panel
  { time: 43000, type: 'showAISearch', value: true },

  // Type search query - semantic search for diagnostic accuracy
  { time: 43300, type: 'typeAISearchQuery', value: 'diagnostic' },
  { time: 43500, type: 'typeAISearchQuery', value: ' accuracy' },
  { time: 43700, type: 'typeAISearchQuery', value: ' improvement' },

  // Show AI search results with relevance percentages
  { time: 44200, type: 'setAISearchResults', value: [
    {
      text: 'Deep learning models have achieved diagnostic performance that meets or exceeds board-certified radiologists across multiple imaging modalities...',
      relevance: 87,
      source: 'Section 2.1 - Diagnostic Imaging'
    },
    {
      text: 'Google Health\'s AI demonstrated 96.2% sensitivity in breast cancer detection, reducing false negatives by 11.7%...',
      relevance: 82,
      source: 'Section 2.1 - Mammography'
    },
    {
      text: 'IDx-DR achieved 98.1% sensitivity for diabetic retinopathy detection, now deployed in over 3,000 primary care clinics...',
      relevance: 76,
      source: 'Section 2.1 - Retinal Imaging'
    },
    {
      text: 'PathAI\'s algorithms demonstrate 99.7% accuracy in identifying metastatic breast cancer in lymph node biopsies...',
      relevance: 71,
      source: 'Section 2.1 - Pathology'
    },
    {
      text: '41% improvement in cancer treatment selection accuracy through personalized AI recommendations...',
      relevance: 64,
      source: 'Section 5.3 - Personalized Medicine'
    },
  ]},

  // Navigate through results - faster
  { time: 45000, type: 'setAISearchCurrentIndex', value: 1 },
  { time: 45700, type: 'setAISearchCurrentIndex', value: 2 },
  { time: 46200, type: 'setAISearchCurrentIndex', value: 0 },

  // Close AI Search
  { time: 47000, type: 'clearAISearch', value: true },

  // ==================== PHASE 7: Text Review (48-56s) - COMPRESSED ====================
  { time: 48000, type: 'setPhase', value: 'Text Review' },

  // Click Review button - show loading state
  { time: 48500, type: 'showReview', value: true },
  { time: 48500, type: 'reviewLoading', value: true },

  // Analysis complete - show issues with detailed data for hover popup
  { time: 49800, type: 'reviewLoading', value: false },
  { time: 49800, type: 'setReviewIssues', value: [
    {
      id: 1,
      type: 'correctness',
      category: 'REDUNDANCY',
      text: 'This is not science fiction—it is the current reality',
      suggestion: 'This is the current reality',
      reasoning: 'The phrase "This is not science fiction" is redundant with the factual statement that follows. Removing it makes the sentence more direct.',
      position: { start: 0, end: 53 },
      color: '#EF4444',
    },
    {
      id: 2,
      type: 'clarity',
      category: 'WORDINESS',
      text: 'demonstrating both technical feasibility and clinical utility',
      suggestion: 'demonstrating clinical utility',
      reasoning: 'Technical feasibility is implied by FDA authorization. Focus on clinical utility for conciseness.',
      position: { start: 0, end: 60 },
      color: '#3B82F6',
    },
    {
      id: 3,
      type: 'tone',
      category: 'PASSIVE VOICE',
      text: 'AI is fundamentally reshaping',
      suggestion: 'AI fundamentally reshapes',
      reasoning: 'Using active voice ("reshapes" instead of "is reshaping") creates a more direct, forceful statement.',
      position: { start: 0, end: 29 },
      color: '#10B981',
    },
    {
      id: 4,
      type: 'clarity',
      category: 'WORD CHOICE',
      text: 'that meets or exceeds',
      suggestion: 'that meets or surpasses',
      reasoning: '"Surpasses" is more precise and impactful than "exceeds" in this academic context.',
      position: { start: 0, end: 21 },
      color: '#3B82F6',
    },
    {
      id: 5,
      type: 'clarity',
      category: 'HEDGING',
      text: 'While these concerns are valid',
      suggestion: 'Although these concerns merit attention',
      reasoning: 'Replacing "valid" with "merit attention" maintains academic objectivity while strengthening your counterargument.',
      position: { start: 0, end: 30 },
      color: '#3B82F6',
    },
  ]},
  { time: 50300, type: 'setPhase', value: '5 issues found' },

  // Hover first issue - show popup with before/after comparison
  { time: 51000, type: 'highlightReviewIssue', value: 0 },
  { time: 51000, type: 'showReviewPopup', value: true },

  // Accept first issue via popup - user clicks Accept button
  { time: 52500, type: 'showReviewPopup', value: false },
  { time: 52500, type: 'fixReviewIssue', index: 0 },
  { time: 52700, type: 'highlightReviewIssue', value: null },
  { time: 52700, type: 'setPhase', value: '4 issues remaining' },

  // Click "Accept All" to fix remaining issues
  { time: 54000, type: 'acceptAllReviewIssues', value: true },
  { time: 54000, type: 'setPhase', value: 'All issues reviewed' },

  // Clear review state
  { time: 56000, type: 'showReview', value: false },
  { time: 56000, type: 'setReviewIssues', value: [] },

  // ==================== PHASE 8: Mindmap/Outline View (56-66s) - MAXIMUM COMPRESSION ====================
  { time: 56000, type: 'setPhase', value: 'Mindlines View' },

  // Camera arrives at sidebar first, then expand outline
  { time: 56500, type: 'setOutlineExpanded', value: true },

  // Show mindmap view after outline expands
  { time: 57500, type: 'showMindlines', value: true },

  // Add nodes progressively - ULTRA FAST (250ms intervals)
  // Root node
  { time: 58000, type: 'addMindlineNode', value: { id: 'root', label: 'AI in Healthcare', level: 0, x: 80, y: 110 } },

  // Level 1 nodes - rapid succession
  { time: 58300, type: 'addMindlineNode', value: { id: 'intro', label: 'Intro', level: 1, x: 220, y: 30, parent: 'root' } },
  { time: 58550, type: 'addMindlineNode', value: { id: 'diagnostics', label: 'Diagnostics', level: 1, x: 220, y: 65, parent: 'root' } },
  { time: 58800, type: 'addMindlineNode', value: { id: 'drug', label: 'Drug Discovery', level: 1, x: 220, y: 100, parent: 'root' } },
  { time: 59050, type: 'addMindlineNode', value: { id: 'counter', label: 'Counter', level: 1, x: 220, y: 135, parent: 'root' } },
  { time: 59300, type: 'addMindlineNode', value: { id: 'future', label: 'Future', level: 1, x: 220, y: 170, parent: 'root' } },
  { time: 59550, type: 'addMindlineNode', value: { id: 'conclusion', label: 'Conclusion', level: 1, x: 220, y: 205, parent: 'root' } },

  // Level 2 nodes - rapid
  { time: 60000, type: 'addMindlineNode', value: { id: 'imaging', label: 'Imaging', level: 2, x: 330, y: 50, parent: 'diagnostics' } },
  { time: 60250, type: 'addMindlineNode', value: { id: 'pathology', label: 'Pathology', level: 2, x: 330, y: 80, parent: 'diagnostics' } },
  { time: 60500, type: 'addMindlineNode', value: { id: 'bias', label: 'Bias', level: 2, x: 330, y: 120, parent: 'counter' } },
  { time: 60750, type: 'addMindlineNode', value: { id: 'regulation', label: 'Regulation', level: 2, x: 330, y: 150, parent: 'counter' } },

  // Interactive highlights - quick display
  { time: 61500, type: 'setMindlineHover', value: 'diagnostics' },
  { time: 63000, type: 'setMindlineHover', value: 'counter' },
  { time: 64500, type: 'setMindlineHover', value: null },

  // Demo complete
  { time: 66000, type: 'setPhase', value: 'Demo Complete' },
];

// Essay content for applying after diff is accepted (Argumentative Essay Template)
export const FULL_ESSAY_CONTENT = {
  sections: [
    '## 1. Introduction',
    '## 2. AI-Powered Diagnostics: Surpassing Human Limitations',
    '### 2.1 Diagnostic Imaging & Radiology',
    '## 3. Accelerating Drug Discovery: From Decades to Months',
    '## 4. Addressing the Counterargument: Regulatory and Ethical Challenges',
    '## 5. Future Directions: The Next Frontier',
    '## 6. Conclusion',
  ]
};
