/**
 * Demo Script - Timeline of actions for the continuous demo
 *
 * Story: Writing a complete academic essay on "AI in Healthcare"
 *
 * NEW FLOW - Full Essay Writing Experience:
 * 1. User creates document, writes title and first sentence
 * 2. AI Autocomplete suggests completion (ghost text)
 * 3. User uploads multiple PDFs/PPTX to Knowledge Base
 * 4. User asks AI to write a template/outline
 * 5. AI activates essay-writing skill → searches KB → web search → writes outline
 * 6. AI confirms details with user
 * 7. User provides more context
 * 8. AI generates complete essay (long, professional content)
 * 9. User selects sections for Ask AI refinement
 * 10. User uses Quick Edit on specific text
 *
 * Timeline (100 seconds total for richer demo):
 * 0-6s:     Create document, type title
 * 6-14s:    Write first sentence + AI Autocomplete
 * 14-26s:   Upload multiple files to Knowledge Base
 * 26-50s:   Ask AI to write template → Skills + KB search + Web search → Outline
 * 50-58s:   AI asks for confirmation, user responds
 * 58-78s:   AI generates full essay (long content with diff review)
 * 78-90s:   User selects section, asks AI for refinement
 * 90-100s:  User uses Quick Edit on text
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
  { time: 6000, type: 'activateToolbar', value: [] }, // Clear H1 active state when moving to paragraph
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

  // ==================== PHASE 3: Upload to Knowledge Base (14-26s) ====================
  { time: 14000, type: 'setPhase', value: 'Knowledge Base' },

  // Click + button to show attach menu
  { time: 14500, type: 'showAttachMenu', value: true },
  { time: 15500, type: 'showAttachMenu', value: false },

  // First file upload - WHO Report PDF
  { time: 16000, type: 'showKBUpload', value: true },
  { time: 16000, type: 'setKBProgress', value: 30 },
  { time: 16300, type: 'setKBProgress', value: 70 },
  { time: 16600, type: 'setKBProgress', value: 100 },
  { time: 17000, type: 'addKBFile', value: { name: 'WHO-AI-Healthcare-2024.pdf', sections: 156, type: 'pdf', status: 'indexed' } },

  // Second file upload - Research Paper
  { time: 17500, type: 'setKBProgress', value: 40 },
  { time: 17800, type: 'setKBProgress', value: 80 },
  { time: 18100, type: 'setKBProgress', value: 100 },
  { time: 18500, type: 'addKBFile', value: { name: 'Nature-Medicine-AI-Review.pdf', sections: 89, type: 'pdf', status: 'indexed' } },

  // Third file upload - Presentation
  { time: 19000, type: 'setKBProgress', value: 50 },
  { time: 19300, type: 'setKBProgress', value: 100 },
  { time: 19700, type: 'addKBFile', value: { name: 'Healthcare-AI-Trends-2024.pptx', sections: 45, type: 'pptx', status: 'indexed' } },

  // Fourth file upload - Guidelines
  { time: 20200, type: 'setKBProgress', value: 60 },
  { time: 20500, type: 'setKBProgress', value: 100 },
  { time: 20900, type: 'addKBFile', value: { name: 'FDA-AI-Medical-Devices.pdf', sections: 72, type: 'pdf', status: 'indexed' } },

  { time: 21500, type: 'showKBUpload', value: false },
  { time: 22000, type: 'setPhase', value: '362 sections indexed' },

  // ==================== PHASE 4: Ask AI to Write Template (26-50s) ====================
  { time: 26000, type: 'setPhase', value: 'AI Chat' },

  // Enable web search toggle
  { time: 26200, type: 'setWebSearchEnabled', value: true },

  // User asks for template
  { time: 26500, type: 'setChatInput', value: 'Help me write a comprehensive academic essay on AI in healthcare. Create an outline with sections covering current applications, challenges, and future directions. Use the uploaded research materials.' },
  { time: 26600, type: 'setChatTyping', value: true },

  { time: 29000, type: 'sendChatMessage', value: 'Help me write a comprehensive academic essay on AI in healthcare. Create an outline with sections covering current applications, challenges, and future directions. Use the uploaded research materials.' },

  // AI starts processing - activates skill
  { time: 29500, type: 'aiThinking', value: true },
  { time: 30000, type: 'addChatTool', value: { name: 'read_skill_instructions', status: 'running' } },
  { time: 30500, type: 'setPhase', value: 'Activating essay skill...' },
  { time: 31500, type: 'updateChatTool', index: 0, value: { status: 'completed' } },

  // Search knowledge base
  { time: 32000, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running' } },
  { time: 32500, type: 'setPhase', value: 'Searching KB...' },
  { time: 34000, type: 'updateChatTool', index: 1, value: { status: 'completed' } },

  // Read KB documents
  { time: 34500, type: 'addChatTool', value: { name: 'read_kb_document', status: 'running' } },
  { time: 36500, type: 'updateChatTool', index: 2, value: { status: 'completed' } },

  // Web search for latest data
  { time: 37000, type: 'addChatTool', value: { name: 'web_search', status: 'running' } },
  { time: 37500, type: 'setPhase', value: 'Web search...' },
  { time: 39500, type: 'updateChatTool', index: 3, value: { status: 'completed' } },

  // View current document
  { time: 40000, type: 'addChatTool', value: { name: 'view_document', status: 'running' } },
  { time: 41000, type: 'updateChatTool', index: 4, value: { status: 'completed' } },

  // Insert outline
  { time: 41500, type: 'addChatTool', value: { name: 'insert_text', status: 'running' } },
  { time: 43500, type: 'updateChatTool', index: 5, value: { status: 'completed' } },

  // AI response with outline
  { time: 44000, type: 'clearChatTools', value: true },
  { time: 44000, type: 'aiThinking', value: false },
  { time: 44500, type: 'addAIResponse', value: 'I\'ve analyzed your uploaded materials and created a comprehensive essay outline. Based on the WHO report, Nature Medicine review, and FDA guidelines, I\'ve structured the essay into 5 main sections:\n\n**Proposed Outline:**\n1. Introduction & Background\n2. Current AI Applications in Healthcare\n3. Regulatory Landscape & Challenges\n4. Ethical Considerations\n5. Future Directions & Conclusions\n\nBefore I expand each section, could you tell me:\n• What is the target word count?\n• Any specific applications to emphasize?\n• Academic citation style preference (APA, MLA, Chicago)?' },

  // Show the outline in editor via diff (using str_replace format like real product)
  { time: 45000, type: 'setPhase', value: 'Review Outline' },
  { time: 45000, type: 'showDiffMode', value: true },
  { time: 45500, type: 'setDiffContent', value: {
    type: 'inline_inserts',
    changes: [
      { afterParagraph: 0, type: 'insert', text: '## 1. Introduction & Background\n- Evolution of AI in healthcare\n- Scope and significance of the transformation' },
      { afterParagraph: 0, type: 'insert', text: '## 2. Current AI Applications in Healthcare\n### 2.1 Diagnostic Imaging & Radiology\n### 2.2 Drug Discovery & Development' },
      { afterParagraph: 0, type: 'insert', text: '## 3. Regulatory Landscape & Challenges\n### 3.1 FDA Approval Pathways\n### 3.2 Data Privacy Concerns' },
      { afterParagraph: 0, type: 'insert', text: '## 4. Ethical Considerations\n### 4.1 Algorithmic Bias\n### 4.2 Transparency' },
      { afterParagraph: 0, type: 'insert', text: '## 5. Future Directions & Conclusions' },
    ]
  }},

  // Accept outline
  { time: 49000, type: 'acceptDiffChange', index: 0 },
  { time: 49500, type: 'showDiffMode', value: false },
  { time: 49500, type: 'clearDiffContent', value: true },
  { time: 49500, type: 'applyOutline', value: true },

  // ==================== PHASE 5: User Confirms Details (50-58s) ====================
  { time: 50000, type: 'setPhase', value: 'Confirming details' },

  // User responds with details
  { time: 51000, type: 'setChatInput', value: 'Target 3000 words. Emphasize diagnostic imaging and drug discovery. Use APA 7th edition. Focus on recent FDA approvals and WHO recommendations.' },
  { time: 51100, type: 'setChatTyping', value: true },

  { time: 54000, type: 'sendChatMessage', value: 'Target 3000 words. Emphasize diagnostic imaging and drug discovery. Use APA 7th edition. Focus on recent FDA approvals and WHO recommendations.' },

  // AI acknowledges
  { time: 54500, type: 'aiThinking', value: true },
  { time: 55000, type: 'addAIResponse', value: 'Perfect. I\'ll now write the complete essay with:\n• ~3000 words across all sections\n• Emphasis on diagnostic imaging and drug discovery\n• APA 7th edition citations\n• WHO and FDA data integration\n\nGenerating the full content now...' },
  { time: 55500, type: 'aiThinking', value: false },

  // ==================== PHASE 6: AI Generates Full Essay (58-78s) ====================
  { time: 58000, type: 'setPhase', value: 'Generating essay...' },
  { time: 58000, type: 'aiThinking', value: true },

  // Multiple tool calls for comprehensive writing
  { time: 58500, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running' } },
  { time: 60000, type: 'updateChatTool', index: 0, value: { status: 'completed' } },

  { time: 60500, type: 'addChatTool', value: { name: 'read_kb_document', status: 'running' } },
  { time: 62500, type: 'updateChatTool', index: 1, value: { status: 'completed' } },

  { time: 63000, type: 'addChatTool', value: { name: 'web_search', status: 'running' } },
  { time: 65000, type: 'updateChatTool', index: 2, value: { status: 'completed' } },

  { time: 65500, type: 'addChatTool', value: { name: 'str_replace_editor', status: 'running' } },
  { time: 68000, type: 'updateChatTool', index: 3, value: { status: 'completed' } },

  { time: 68500, type: 'clearChatTools', value: true },

  // Show full essay in diff mode - inline inserts after each section heading
  { time: 69000, type: 'setPhase', value: 'Review Essay' },
  { time: 69000, type: 'showDiffMode', value: true },
  { time: 69500, type: 'setDiffContent', value: {
    type: 'inline_inserts',
    changes: [
      // Document paragraphs after applyOutline:
      // 0: intro text | 1: ## 1. Introduction | 2: - Evolution | 3: - Scope
      // 4: ## 2. Current AI | 5: ### 2.1 Diagnostic | 6: ### 2.2 Drug
      // 7: ## 3. Regulatory | 8: ### 3.1 FDA | 9: ### 3.2 Data Privacy
      // 10: ## 4. Ethical | 11: ### 4.1 Algorithmic | 12: ### 4.2 Transparency
      // 13: ## 5. Future

      // Insert after "## 1. Introduction & Background" (paragraph 1)
      { afterParagraph: 1, type: 'insert', text: 'The integration of artificial intelligence into healthcare represents a paradigm shift unprecedented in the history of medicine. According to the World Health Organization\'s 2024 Global AI Health Report, 78.3% of healthcare institutions across 142 countries have implemented or are actively piloting AI-driven diagnostic and clinical decision support systems (WHO, 2024). This rapid adoption trajectory, accelerating from merely 23% in 2020, reflects both technological maturation and mounting evidence of clinical efficacy.\n\nThe convergence of exponential growth in computational power, the availability of large-scale medical datasets, and advances in deep learning architectures has created conditions uniquely favorable to AI development in healthcare. McKinsey Global Institute estimates the potential annual value of AI applications in healthcare at $150 billion by 2026, with the majority derived from clinical operations and drug development optimization (McKinsey, 2024).' },

      // Insert after "### 2.1 Diagnostic Imaging & Radiology" (paragraph 5)
      { afterParagraph: 5, type: 'insert', text: 'The U.S. Food and Drug Administration has authorized 692 AI/ML-enabled medical devices as of January 2024, with radiological applications comprising 75.8% of all approvals—a testament to both technical feasibility and demonstrable clinical utility in this domain (FDA, 2024).\n\nDeep learning models, particularly convolutional neural networks trained on datasets exceeding 500,000 annotated images, have achieved diagnostic performance that meets or exceeds board-certified radiologists across multiple modalities:\n\n- **Mammography**: Google Health\'s AI system demonstrated 94.5% sensitivity in breast cancer detection, reducing false positives by 5.7% and false negatives by 9.4% compared to standard clinical practice (McKinney et al., Nature Medicine, 2024)\n- **Chest CT Analysis**: Viz.ai\'s FDA-cleared algorithm identifies large vessel occlusions within 60 seconds, enabling "door-to-needle" times under 30 minutes in acute stroke care\n- **Retinal Imaging**: IDx-DR achieved 97.4% sensitivity for diabetic retinopathy screening, becoming the first FDA-authorized autonomous AI diagnostic system' },

      // Insert after "### 2.2 Drug Discovery & Development" (paragraph 6)
      { afterParagraph: 6, type: 'insert', text: 'The pharmaceutical industry has witnessed AI-driven transformation of the drug discovery pipeline, with computational approaches reducing development timelines by 40-60% while substantially decreasing failure rates in clinical trials. DeepMind\'s AlphaFold2, which solved the 50-year-old protein folding problem, was recognized with the 2024 Nobel Prize in Chemistry—the first Nobel awarded to an AI system\'s primary contribution.\n\nNotable milestones include Insilico Medicine\'s AI-designed drug ISM001-055, which completed Phase I trials in record time, and Recursion Pharmaceuticals\' identification of novel therapeutic targets using self-supervised learning on cellular imaging data. Industry analysts project that AI-discovered drugs will comprise 30% of new molecular entities approved by 2028 (Nature Reviews Drug Discovery, 2024).' },

      // Insert after "## 3. Regulatory Landscape & Challenges" (paragraph 7)
      { afterParagraph: 7, type: 'insert', text: 'The regulatory framework governing AI in healthcare continues to evolve, with the FDA\'s 2024 guidance on Predetermined Change Control Plans (PCCPs) establishing a landmark precedent for adaptive AI systems that improve post-deployment. The European Union\'s AI Act, effective January 2025, classifies medical AI as "high-risk" and mandates conformity assessments, algorithmic auditing, and human oversight requirements.\n\nKey regulatory developments include:\n- **FDA Good Machine Learning Practices (GMLP)**: 10 guiding principles for AI/ML lifecycle management\n- **WHO Ethics Framework**: Six core principles including transparency, accountability, and equity\n- **HIPAA-AI Addendum**: Proposed 2025 guidelines addressing AI-specific data governance requirements' },

      // Insert after "## 4. Ethical Considerations" (paragraph 10)
      { afterParagraph: 10, type: 'insert', text: 'Algorithmic bias remains a critical concern, with multiple studies documenting disparate performance across demographic groups. A 2024 JAMA meta-analysis found that dermatological AI systems exhibited 18.4% lower sensitivity for skin conditions in patients with darker skin tones, attributable to training dataset composition that underrepresented non-Caucasian populations (Adamson & Smith, JAMA Dermatology, 2024).\n\nAddressing these inequities requires multi-stakeholder collaboration:\n- **Data Diversification**: NIH BRIDGE2AI initiative mandating representative dataset composition\n- **Algorithmic Auditing**: Regular bias assessments using standardized fairness metrics\n- **Interpretability Requirements**: FDA emphasis on explainable AI (XAI) for clinical decision support' },

      // Insert after "## 5. Future Directions & Conclusions" (paragraph 13)
      { afterParagraph: 13, type: 'insert', text: 'Emerging technologies promise continued acceleration of AI integration into clinical practice. Foundation models trained on multimodal medical data—integrating imaging, genomics, clinical notes, and sensor data—demonstrate potential for generalist medical AI assistants. Google\'s Med-PaLM 2 achieved expert-level performance across multiple medical examination benchmarks, while Microsoft\'s BioGPT enables zero-shot clinical reasoning.\n\nFederated learning architectures address data privacy concerns by enabling model training across distributed healthcare systems without centralizing sensitive patient information. Initial deployments at Mayo Clinic and Cleveland Clinic demonstrate feasibility of collaborative AI development while maintaining HIPAA compliance.\n\nAs AI systems assume greater roles in clinical decision-making, the imperative for robust governance, continuous validation, and human-centered design becomes paramount. The transformation of healthcare through artificial intelligence is not merely technological but fundamentally sociotechnical, requiring careful navigation of the complex interplay between innovation, ethics, and patient welfare.\n\n**References**\n- FDA. (2024). Artificial Intelligence and Machine Learning (AI/ML)-Enabled Medical Devices. U.S. Food & Drug Administration.\n- McKinney, S. M., et al. (2024). International evaluation of an AI system for breast cancer screening. Nature Medicine, 26(1), 89-94.\n- WHO. (2024). Ethics and Governance of Artificial Intelligence for Health. World Health Organization.\n- McKinsey Global Institute. (2024). The Economics of AI in Healthcare. McKinsey & Company.\n\n*Word Count: 2,847*' },
    ]
  }},

  // AI completion message
  { time: 70000, type: 'addAIResponse', value: 'I\'ve written a comprehensive 2,850-word essay covering all requested topics. The essay includes:\n\n• APA 7th edition citations\n• WHO and FDA data integration\n• Emphasis on diagnostic imaging and drug discovery\n• 5 main sections with subsections\n• References section\n\nPlease review the changes in the editor. You can accept or reject the entire essay, or I can help refine specific sections.' },
  { time: 70500, type: 'aiThinking', value: false },

  // Accept essay
  { time: 76000, type: 'acceptDiffChange', index: 0 },
  { time: 76500, type: 'showDiffMode', value: false },
  { time: 76500, type: 'clearDiffContent', value: true },
  { time: 77000, type: 'setPhase', value: 'Essay Generated' },
  { time: 77000, type: 'applyFullEssay', value: true },

  // ==================== PHASE 7: Select Section for AI Refinement (78-90s) ====================
  { time: 78000, type: 'setPhase', value: 'Refining with AI' },

  // User selects a paragraph
  { time: 79000, type: 'setSelection', value: { paragraphIndex: 'diagnostic-imaging', start: 0, end: 200 } },
  { time: 79500, type: 'setSelectedContent', value: 'Deep learning models, particularly convolutional neural networks (CNNs), have achieved remarkable success in analyzing medical images across multiple modalities...' },

  // User asks AI to enhance
  { time: 80000, type: 'setChatInput', value: 'Add more recent 2024 statistics and specific FDA-approved products in this section' },
  { time: 80100, type: 'setChatTyping', value: true },

  { time: 82000, type: 'sendChatMessage', value: 'Add more recent 2024 statistics and specific FDA-approved products in this section' },
  { time: 82200, type: 'clearSelectedContent', value: true },
  { time: 82200, type: 'setSelection', value: null },

  // AI processes
  { time: 82500, type: 'aiThinking', value: true },
  { time: 83000, type: 'addChatTool', value: { name: 'search_knowledge_base', status: 'running' } },
  { time: 84000, type: 'updateChatTool', index: 0, value: { status: 'completed' } },
  { time: 84500, type: 'addChatTool', value: { name: 'web_search', status: 'running' } },
  { time: 85500, type: 'updateChatTool', index: 1, value: { status: 'completed' } },
  { time: 86000, type: 'addChatTool', value: { name: 'str_replace_editor', status: 'running' } },
  { time: 87500, type: 'updateChatTool', index: 2, value: { status: 'completed' } },

  { time: 88000, type: 'clearChatTools', value: true },
  { time: 88000, type: 'aiThinking', value: false },
  { time: 88500, type: 'addAIResponse', value: 'I\'ve enhanced the diagnostic imaging section with:\n\n• Updated 2024 FDA approval counts (743 devices)\n• Specific product names (Viz.ai, Aidoc, Paige AI)\n• Latest performance metrics\n• Recent landmark studies\n\nPlease review the changes.' },

  // Show diff for the section update
  { time: 89000, type: 'showDiffMode', value: true },
  { time: 89000, type: 'setPhase', value: 'Review Changes' },
  { time: 89500, type: 'setDiffContent', value: {
    type: 'replace',
    original: 'The FDA has approved over 692 AI/ML-enabled medical devices as of January 2024',
    new: 'The FDA has approved 743 AI/ML-enabled medical devices as of Q3 2024, including breakthrough products like Viz.ai for stroke detection, Aidoc for radiology workflow prioritization, and Paige AI for pathology diagnosis'
  }},

  // ==================== PHASE 8: Quick Edit (90-100s) ====================
  { time: 90000, type: 'setPhase', value: 'Quick Edit' },
  { time: 90000, type: 'acceptDiffChange', index: 0 },
  { time: 90500, type: 'showDiffMode', value: false },
  { time: 90500, type: 'clearDiffContent', value: true },

  // Select text for quick edit
  { time: 91000, type: 'setSelection', value: { paragraphIndex: 'conclusion', start: 0, end: 150 } },

  // Show quick edit menu
  { time: 92000, type: 'showQuickEdit', value: true },
  { time: 92500, type: 'hoverQuickEdit', value: 'improve' },

  // Click improve
  { time: 94000, type: 'quickEditLoading', value: true },

  // Show result
  { time: 97000, type: 'quickEditResult', value: {
    paragraphIndex: 'conclusion',
    original: 'Artificial intelligence stands poised to transform healthcare in ways that would have seemed like science fiction just decades ago.',
    improved: 'Artificial intelligence is fundamentally redefining the boundaries of what is possible in healthcare—a transformation so profound that it challenges us to reimagine the very nature of medical practice for the 21st century and beyond.'
  }},

  { time: 99000, type: 'clearQuickEditResult', value: true },
  { time: 99500, type: 'setPhase', value: 'Demo Complete' },
];
