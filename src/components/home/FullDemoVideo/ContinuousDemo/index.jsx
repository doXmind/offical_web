import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoContainer from './components/DemoContainer';
import DemoToolbar from './components/DemoToolbar';
import DemoSidebar from './components/DemoSidebar';
import DemoChatPanel from './components/DemoChatPanel';
import { DEMO_SCRIPT } from './constants/demoScript';

/**
 * ContinuousDemo - A single continuous demo video showing all features
 * through the lens of writing an academic paper
 *
 * Story: User writes a research paper on "AI in Healthcare"
 * - Creates new document
 * - Types title and introduction
 * - Uses AI autocomplete for suggestions
 * - Applies formatting (headings, lists)
 * - Uses Quick Edit to improve text
 * - Chats with AI for help
 * - Uploads reference PDF to knowledge base
 * - Uses Text Review for grammar
 * - Reviews AI-suggested changes (diff)
 * - Views document structure (mindlines)
 */

const TOTAL_DURATION = 100000; // 100 seconds

const ContinuousDemo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Document state
  const [files, setFiles] = useState([{ id: 'welcome', name: 'Welcome.md' }]);
  const [activeFileId, setActiveFileId] = useState('welcome');
  const [documentContent, setDocumentContent] = useState({ title: '', paragraphs: [], list: null });
  const [cursorVisible, setCursorVisible] = useState(true);
  const [selectionRange, setSelectionRange] = useState(null);

  // UI state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModalInput, setCreateModalInput] = useState('');
  const [activeToolbarButtons, setActiveToolbarButtons] = useState([]);
  const [highlightedToolbarButtons, setHighlightedToolbarButtons] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Ghost text / autocomplete
  const [ghostText, setGhostText] = useState('');
  const [showTabHint, setShowTabHint] = useState(false);

  // Quick Edit
  const [showQuickEditMenu, setShowQuickEditMenu] = useState(false);
  const [quickEditHovered, setQuickEditHovered] = useState(null);
  const [isQuickEditLoading, setIsQuickEditLoading] = useState(false);
  const [quickEditResult, setQuickEditResult] = useState(null);

  // Chat
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [chatTools, setChatTools] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  // Knowledge Base - support multiple files
  const [showKBUpload, setShowKBUpload] = useState(false);
  const [kbUploadProgress, setKbUploadProgress] = useState(0);
  const [kbFiles, setKbFiles] = useState([]);
  const [currentUploadFile, setCurrentUploadFile] = useState(null);

  // Chat input features
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // Text Review
  const [showReview, setShowReview] = useState(false);
  const [reviewIssues, setReviewIssues] = useState([]);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  // Diff Review
  const [showDiffMode, setShowDiffMode] = useState(false);
  const [diffContent, setDiffContent] = useState(null);
  const [acceptedChanges, setAcceptedChanges] = useState([]);

  // Mindlines
  const [showMindlines, setShowMindlines] = useState(false);
  const [mindlineNodes, setMindlineNodes] = useState([]);

  // Progress indicator
  const [currentPhase, setCurrentPhase] = useState('');

  const timerRef = useRef(null);
  const executedActionsRef = useRef(new Set());

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const resetAllState = useCallback(() => {
    // Reset all state to initial values
    setFiles([{ id: 'welcome', name: 'Welcome.md' }]);
    setActiveFileId('welcome');
    setDocumentContent({ title: '', paragraphs: [], list: null });
    setShowCreateModal(false);
    setCreateModalInput('');
    setActiveToolbarButtons([]);
    setHighlightedToolbarButtons([]);
    setGhostText('');
    setShowTabHint(false);
    setShowQuickEditMenu(false);
    setQuickEditResult(null);
    setSelectionRange(null);
    setChatMessages([]);
    setChatInput('');
    setIsChatTyping(false);
    setSelectedContent(null);
    setShowKBUpload(false);
    setKbUploadProgress(0);
    setKbFiles([]);
    setCurrentUploadFile(null);
    setWebSearchEnabled(false);
    setShowAttachMenu(false);
    setShowReview(false);
    setReviewIssues([]);
    setShowDiffMode(false);
    setDiffContent(null);
    setAcceptedChanges([]);
    setShowMindlines(false);
    setMindlineNodes([]);
    setIsAIThinking(false);
    setChatTools([]);
    setShowAutocomplete(false);
    setCurrentPhase('');
  }, []);

  const resetDemo = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    executedActionsRef.current = new Set();
    resetAllState();
  }, [resetAllState]);

  // Reference for executeAction to be used in seekToTime
  const executeActionRef = useRef(null);

  // Main timeline controller
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= TOTAL_DURATION) {
          resetDemo();
          return 0;
        }
        return prev + 100;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, resetDemo]);

  // Execute script based on current time
  useEffect(() => {
    DEMO_SCRIPT.forEach(action => {
      const actionKey = `${action.time}-${action.type}`;
      if (currentTime >= action.time && currentTime < action.time + 100 && !executedActionsRef.current.has(actionKey)) {
        executedActionsRef.current.add(actionKey);
        executeAction(action);
      }
    });
  }, [currentTime]);

  const executeAction = (action) => {
    switch (action.type) {
      case 'setPhase':
        setCurrentPhase(action.value);
        break;
      case 'showCreateModal':
        setShowCreateModal(action.value);
        break;
      case 'typeModalInput':
        setCreateModalInput(prev => prev + action.value);
        break;
      case 'setModalInput':
        setCreateModalInput(action.value);
        break;
      case 'createFile':
        setShowCreateModal(false);
        setCreateModalInput('');
        setFiles(prev => [...prev, { id: action.id, name: action.name, isNew: true }]);
        setActiveFileId(action.id);
        setDocumentContent({ title: '', paragraphs: [], list: null });
        break;
      case 'typeTitle':
        setDocumentContent(prev => ({ ...prev, title: prev.title + action.value }));
        break;
      case 'setTitle':
        setDocumentContent(prev => ({ ...prev, title: action.value }));
        break;
      case 'highlightToolbar':
        setHighlightedToolbarButtons(action.value);
        break;
      case 'activateToolbar':
        setActiveToolbarButtons(action.value);
        setHighlightedToolbarButtons([]);
        break;
      case 'typeParagraph':
        setDocumentContent(prev => {
          const paragraphs = [...prev.paragraphs];
          if (paragraphs.length === 0) {
            paragraphs.push(action.value);
          } else {
            paragraphs[paragraphs.length - 1] = (paragraphs[paragraphs.length - 1] || '') + action.value;
          }
          return { ...prev, paragraphs };
        });
        break;
      case 'addParagraph':
        setDocumentContent(prev => ({
          ...prev,
          paragraphs: [...prev.paragraphs, action.value || '']
        }));
        break;
      case 'setParagraph':
        setDocumentContent(prev => {
          const newParagraphs = [...prev.paragraphs];
          newParagraphs[action.index] = action.value;
          return { ...prev, paragraphs: newParagraphs };
        });
        break;
      case 'showGhostText':
        setGhostText(action.value);
        break;
      case 'showTabHint':
        setShowTabHint(action.value);
        break;
      case 'acceptGhostText':
        setDocumentContent(prev => {
          const paragraphs = [...prev.paragraphs];
          if (paragraphs.length > 0) {
            paragraphs[paragraphs.length - 1] = (paragraphs[paragraphs.length - 1] || '') + ghostText;
          }
          return { ...prev, paragraphs };
        });
        setGhostText('');
        setShowTabHint(false);
        break;
      case 'setSelection':
        setSelectionRange(action.value);
        break;
      case 'showQuickEdit':
        setShowQuickEditMenu(action.value);
        break;
      case 'hoverQuickEdit':
        setQuickEditHovered(action.value);
        break;
      case 'quickEditLoading':
        setIsQuickEditLoading(action.value);
        setShowQuickEditMenu(false);
        break;
      case 'quickEditResult':
        setIsQuickEditLoading(false);
        setQuickEditResult(action.value);
        setSelectionRange(null);
        break;
      case 'clearQuickEditResult':
        setQuickEditResult(null);
        break;
      case 'showAutocomplete':
        setShowAutocomplete(action.value);
        break;
      case 'setChatInput':
        setChatInput(action.value);
        break;
      case 'setChatTyping':
        setIsChatTyping(action.value);
        break;
      case 'typeChatInput':
        setChatInput(prev => prev + action.value);
        setIsChatTyping(true);
        break;
      case 'sendChatMessage':
        setChatMessages(prev => [...prev, { role: 'user', content: action.value }]);
        setChatInput('');
        setIsChatTyping(false);
        break;
      case 'aiThinking':
        setIsAIThinking(action.value);
        break;
      case 'addChatTool':
        setChatTools(prev => [...prev, action.value]);
        break;
      case 'updateChatTool':
        setChatTools(prev => prev.map((t, i) => i === action.index ? { ...t, ...action.value } : t));
        break;
      case 'clearChatTools':
        setChatTools([]);
        break;
      case 'addAIResponse':
        setChatMessages(prev => [...prev, { role: 'assistant', content: action.value }]);
        setIsAIThinking(false);
        break;
      case 'setSelectedContent':
        setSelectedContent(action.value);
        break;
      case 'clearSelectedContent':
        setSelectedContent(null);
        break;
      case 'showKBUpload':
        setShowKBUpload(action.value);
        break;
      case 'setWebSearchEnabled':
        setWebSearchEnabled(action.value);
        break;
      case 'showAttachMenu':
        setShowAttachMenu(action.value);
        break;
      case 'setKBProgress':
        setKbUploadProgress(action.value);
        break;
      case 'setKBFile':
        // Legacy single file support
        setKbFiles([action.value]);
        setShowKBUpload(false);
        break;
      case 'addKBFile':
        // Add to multiple files array
        setKbFiles(prev => [...prev, action.value]);
        setCurrentUploadFile(action.value);
        setKbUploadProgress(0);
        break;
      case 'applyOutline':
        // After accepting outline, update document with the outline content
        // Each line should be a separate paragraph for proper rendering
        setDocumentContent(prev => ({
          ...prev,
          paragraphs: [
            ...(prev.paragraphs || []),
            '## 1. Introduction & Background',
            '- Evolution of AI in healthcare',
            '- Scope and significance of the transformation',
            '## 2. Current AI Applications in Healthcare',
            '### 2.1 Diagnostic Imaging & Radiology',
            '### 2.2 Drug Discovery & Development',
            '## 3. Regulatory Landscape & Challenges',
            '### 3.1 FDA Approval Pathways',
            '### 3.2 Data Privacy Concerns',
            '## 4. Ethical Considerations',
            '### 4.1 Algorithmic Bias',
            '### 4.2 Transparency',
            '## 5. Future Directions & Conclusions',
          ],
          hasOutline: true
        }));
        break;
      case 'applyFullEssay':
        // After accepting full essay, update document with complete content
        // This replaces outline with full essay paragraphs
        setDocumentContent(prev => ({
          ...prev,
          paragraphs: [
            prev.paragraphs[0], // Keep original intro
            '## 1. Introduction & Background',
            'The integration of artificial intelligence into healthcare represents a paradigm shift unprecedented in the history of medicine. According to the World Health Organization\'s 2024 Global AI Health Report, 78.3% of healthcare institutions across 142 countries have implemented or are actively piloting AI-driven diagnostic and clinical decision support systems.',
            '## 2. Current AI Applications in Healthcare',
            '### 2.1 Diagnostic Imaging & Radiology',
            'The U.S. Food and Drug Administration has authorized 692 AI/ML-enabled medical devices as of January 2024, with radiological applications comprising 75.8% of all approvals.',
            '- **Mammography**: 94.5% sensitivity in breast cancer detection',
            '- **Chest CT Analysis**: Under 60 seconds for vessel occlusion identification',
            '- **Retinal Imaging**: 97.4% sensitivity for diabetic retinopathy',
            '### 2.2 Drug Discovery & Development',
            'AI reduces drug development timelines by 40-60%. DeepMind\'s AlphaFold2 was recognized with the 2024 Nobel Prize in Chemistry.',
            '## 3. Regulatory Landscape & Challenges',
            'The FDA\'s 2024 guidance on Predetermined Change Control Plans (PCCPs) establishes a landmark precedent for adaptive AI systems.',
            '## 4. Ethical Considerations',
            'Algorithmic bias remains a critical concern, with AI systems exhibiting 18.4% lower sensitivity for darker skin tones.',
            '## 5. Future Directions & Conclusions',
            'Foundation models and federated learning architectures promise continued acceleration of AI integration into clinical practice.',
          ],
          isFullEssay: true,
          wordCount: 2847
        }));
        break;
      case 'showReview':
        setShowReview(action.value);
        break;
      case 'reviewLoading':
        setIsReviewLoading(action.value);
        break;
      case 'setReviewIssues':
        setReviewIssues(action.value);
        setIsReviewLoading(false);
        break;
      case 'fixReviewIssue':
        setReviewIssues(prev => prev.map((issue, i) => i === action.index ? { ...issue, fixed: true } : issue));
        break;
      case 'showDiffMode':
        setShowDiffMode(action.value);
        break;
      case 'setDiffContent':
        setDiffContent(action.value);
        setAcceptedChanges([]);
        break;
      case 'clearDiffContent':
        setDiffContent(null);
        setAcceptedChanges([]);
        break;
      case 'acceptDiffChange':
        setAcceptedChanges(prev => [...prev, action.index]);
        break;
      case 'showMindlines':
        setShowMindlines(action.value);
        break;
      case 'setMindlineNodes':
        setMindlineNodes(action.value);
        break;
      case 'addMindlineNode':
        setMindlineNodes(prev => [...prev, action.value]);
        break;
      case 'setList':
        setDocumentContent(prev => ({
          ...prev,
          list: action.value
        }));
        break;
      case 'updateList':
        setDocumentContent(prev => ({
          ...prev,
          list: action.value
        }));
        break;
      default:
        break;
    }
  };

  // Store executeAction in ref so seekToTime can use it
  executeActionRef.current = executeAction;

  // Seek to a specific time - resets state and replays actions up to that point
  const handleSeek = (targetTime) => {
    // Reset everything first
    resetAllState();
    executedActionsRef.current = new Set();

    // Execute all actions up to the target time
    DEMO_SCRIPT.forEach(action => {
      if (action.time <= targetTime) {
        executedActionsRef.current.add(`${action.time}-${action.type}`);
        executeActionRef.current(action);
      }
    });

    setCurrentTime(targetTime);
  };

  const progress = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <DemoContainer
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        progress={progress}
        currentPhase={currentPhase}
      >
        <div className="flex h-full w-full bg-black">
          {/* Sidebar */}
          <DemoSidebar
            files={files}
            activeFileId={activeFileId}
            showCreateModal={showCreateModal}
            createModalInput={createModalInput}
            onCloseModal={() => setShowCreateModal(false)}
          />

          {/* Main Editor */}
          <div className="flex-1 flex flex-col min-w-0">
            <DemoToolbar
              activeButtons={activeToolbarButtons}
              highlightedButtons={highlightedToolbarButtons}
              showAutocomplete={showAutocomplete}
              autocompleteMode="Auto"
              showReview={showReview}
              isReviewLoading={isReviewLoading}
              showDiffMode={showDiffMode}
              pendingChanges={diffContent?.type === 'inline_inserts' ? diffContent.changes?.filter(c => c.type === 'insert').length : (diffContent ? 1 : 0)}
            />

            {/* Editor Content */}
            <div className="flex-1 p-4 md:p-6 overflow-hidden relative min-h-0">
              {showMindlines ? (
                <MindlinesView nodes={mindlineNodes} />
              ) : (
                <DocumentView
                  content={documentContent}
                  cursorVisible={cursorVisible}
                  ghostText={ghostText}
                  showTabHint={showTabHint}
                  selectionRange={selectionRange}
                  showQuickEditMenu={showQuickEditMenu}
                  quickEditHovered={quickEditHovered}
                  isQuickEditLoading={isQuickEditLoading}
                  quickEditResult={quickEditResult}
                  reviewIssues={reviewIssues}
                  showDiffMode={showDiffMode}
                  diffContent={diffContent}
                  acceptedChanges={acceptedChanges}
                />
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <DemoChatPanel
            messages={chatMessages}
            inputValue={chatInput}
            isTyping={isChatTyping}
            isThinking={isAIThinking}
            tools={chatTools}
            kbFiles={kbFiles}
            selectedContent={selectedContent}
            webSearchEnabled={webSearchEnabled}
            showAttachMenu={showAttachMenu}
            isUploading={showKBUpload}
            uploadProgress={kbUploadProgress}
            currentUploadFile={currentUploadFile}
          />
        </div>
      </DemoContainer>

      {/* Progress Bar - Clickable */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{currentPhase}</span>
          <span>{Math.floor(currentTime / 1000)}s / 100s</span>
        </div>
        <div
          className="w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = Math.floor(percentage * TOTAL_DURATION);
            handleSeek(newTime);
          }}
        >
          <motion.div
            className="h-full bg-white/30 group-hover:bg-white/40 transition-colors"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Document View Component
const DocumentView = ({
  content,
  cursorVisible,
  ghostText,
  showTabHint,
  selectionRange,
  showQuickEditMenu,
  quickEditHovered,
  isQuickEditLoading,
  quickEditResult,
  reviewIssues,
  showDiffMode,
  diffContent,
  acceptedChanges,
}) => {
  const showCursor = cursorVisible && !ghostText && content.paragraphs.length > 0;
  const containerRef = useRef(null);

  // Auto-scroll when diff content changes to show all changes
  useEffect(() => {
    if (showDiffMode && diffContent && containerRef.current) {
      // Smooth scroll to bottom over time to show all changes
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        // Animate scroll over 3 seconds
        let startTime = null;
        const duration = 3000;

        const animateScroll = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          container.scrollTop = maxScroll * easeOut;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        // Delay before starting scroll
        setTimeout(() => {
          requestAnimationFrame(animateScroll);
        }, 500);
      }
    }
  }, [showDiffMode, diffContent]);

  // Get inline inserts for a specific paragraph index
  const getInsertsAfterParagraph = (paragraphIdx) => {
    if (!showDiffMode || !diffContent || diffContent.type !== 'inline_inserts') {
      return [];
    }
    return diffContent.changes.filter(c => c.afterParagraph === paragraphIdx && c.type === 'insert');
  };

  // Render an INSERT block
  const renderInsertBlock = (change, changeIdx, totalChanges, isAccepted) => (
    <motion.div
      key={`insert-${changeIdx}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: changeIdx * 0.15 }}
      className={`relative border rounded-lg overflow-hidden ${
        isAccepted ? 'border-green-500/30' : 'border-green-500/50'
      }`}
    >
      {/* Header with accept/reject inline */}
      <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border-b border-white/10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-4 h-4 flex items-center justify-center rounded bg-green-500/20 hover:bg-green-500/30"
        >
          <span className="text-green-400 text-[10px]">✓</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-4 h-4 flex items-center justify-center rounded bg-red-500/20 hover:bg-red-500/30"
        >
          <span className="text-red-400 text-[10px]">✕</span>
        </motion.button>
        <span className="text-[9px] text-gray-500 uppercase tracking-wide">INSERT</span>
        <span className="text-[8px] text-gray-600 ml-auto">{changeIdx + 1}/{totalChanges}</span>
      </div>

      {/* Content - rendered as Markdown */}
      <div className={`p-3 bg-green-500/5 ${isAccepted ? 'opacity-70' : ''}`}>
        <RenderedMarkdown content={change.text} />
      </div>
    </motion.div>
  );

  // Get all insert changes for counting
  const allInserts = diffContent?.type === 'inline_inserts' ? diffContent.changes.filter(c => c.type === 'insert') : [];
  const isAccepted = acceptedChanges.includes(0);

  return (
    <div ref={containerRef} className="space-y-4 h-full overflow-y-auto demo-scrollbar">
      {/* Title */}
      {content.title && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl font-bold text-white max-w-lg"
        >
          {content.title}
          {content.paragraphs.length === 0 && cursorVisible && (
            <Cursor />
          )}
        </motion.h1>
      )}

      {/* Paragraphs with inline INSERT blocks */}
      {content.paragraphs.map((para, idx) => {
        const insertsAfterThis = getInsertsAfterParagraph(idx);

        return (
          <React.Fragment key={idx}>
            <ParagraphRenderer
              para={para}
              idx={idx}
              isLast={idx === content.paragraphs.length - 1}
              ghostText={ghostText}
              showTabHint={showTabHint}
              showCursor={showCursor}
              selectionRange={selectionRange}
              quickEditResult={quickEditResult}
              reviewIssues={reviewIssues}
              showDiffMode={showDiffMode}
              diffContent={diffContent}
              acceptedChanges={acceptedChanges}
              showQuickEditMenu={showQuickEditMenu}
              quickEditHovered={quickEditHovered}
              isQuickEditLoading={isQuickEditLoading}
            />

            {/* Render INSERT blocks after this paragraph */}
            {insertsAfterThis.length > 0 && (
              <div className="space-y-3 my-2">
                {insertsAfterThis.map((change, localIdx) => {
                  // Find the global index of this change
                  const globalIdx = allInserts.findIndex(c => c === change);
                  return renderInsertBlock(change, globalIdx, allInserts.length, isAccepted);
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* List */}
      {content.list && (
        <ul className="space-y-1.5 ml-4">
          <AnimatePresence mode="popLayout">
            {content.list.items.map((item, itemIdx) => (
              <motion.li
                key={itemIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIdx * 0.05 }}
                className="text-xs md:text-sm text-gray-300 flex items-start gap-2"
              >
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

    </div>
  );
};

// Helper to render inline markdown (bold, italic) - must be before ParagraphRenderer
const renderInlineMarkdown = (text) => {
  if (typeof text !== 'string') return text;
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

// Paragraph Renderer with all effects
const ParagraphRenderer = ({
  para,
  idx,
  isLast,
  ghostText,
  showTabHint,
  showCursor,
  selectionRange,
  quickEditResult,
  reviewIssues,
  showDiffMode,
  diffContent,
  acceptedChanges,
  showQuickEditMenu,
  quickEditHovered,
  isQuickEditLoading,
}) => {
  // Render quick edit result
  if (quickEditResult && quickEditResult.paragraphIndex === idx) {
    return (
      <div className="relative">
        <motion.p
          initial={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
          animate={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          transition={{ duration: 1 }}
          className="text-xs md:text-sm text-green-300 leading-relaxed p-1 rounded"
        >
          {quickEditResult.text}
        </motion.p>
      </div>
    );
  }

  // Render diff mode - handle simple replace type (inline replacement)
  // Note: inline_inserts type is handled in DocumentView, not here
  if (showDiffMode && diffContent && isLast && diffContent.type === 'replace') {
    const isAccepted = acceptedChanges.includes(0);

    return (
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative border rounded-lg overflow-hidden ${
            isAccepted ? 'border-green-500/30' : 'border-green-500/50'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border-b border-white/10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-4 h-4 flex items-center justify-center rounded bg-green-500/20 hover:bg-green-500/30"
            >
              <span className="text-green-400 text-[10px]">✓</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-4 h-4 flex items-center justify-center rounded bg-red-500/20 hover:bg-red-500/30"
            >
              <span className="text-red-400 text-[10px]">✕</span>
            </motion.button>
            <span className="text-[9px] text-gray-500 uppercase tracking-wide">REPLACE</span>
          </div>

          {/* Content */}
          <div className={`p-3 bg-green-500/5 ${isAccepted ? 'opacity-70' : ''}`}>
            <RenderedMarkdown content={diffContent.new} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Render with review issues
  const activeIssues = reviewIssues.filter(issue => !issue.fixed);
  if (activeIssues.length > 0 && isLast) {
    return (
      <div className="relative">
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          <ReviewHighlightedText text={para} issues={activeIssues} />
        </p>
      </div>
    );
  }

  // Render with selection
  if (selectionRange && selectionRange.paragraphIndex === idx) {
    const before = para.slice(0, selectionRange.start);
    const selected = para.slice(selectionRange.start, selectionRange.end);
    const after = para.slice(selectionRange.end);

    return (
      <div className="relative">
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          {before}
          <motion.span
            initial={{ backgroundColor: 'rgba(59, 130, 246, 0)' }}
            animate={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
            className="text-blue-200 px-0.5 rounded"
          >
            {selected}
          </motion.span>
          {after}
        </p>

        {/* Quick Edit Menu */}
        {showQuickEditMenu && (
          <QuickEditMenu hovered={quickEditHovered} />
        )}

        {/* Quick Edit Loading */}
        {isQuickEditLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -right-2 top-0 flex items-center gap-1 text-[10px] text-blue-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full"
            />
            <span>Improving...</span>
          </motion.div>
        )}
      </div>
    );
  }

  // Normal paragraph - with markdown support
  const trimmed = para.trim();

  // Check for markdown heading formats
  if (trimmed.startsWith('## ')) {
    return (
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm font-semibold text-white mt-3 max-w-lg"
      >
        {trimmed.slice(3)}
      </motion.h2>
    );
  }

  if (trimmed.startsWith('### ')) {
    return (
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs font-medium text-gray-200 mt-2 max-w-lg"
      >
        {trimmed.slice(4)}
      </motion.h3>
    );
  }

  // Check for bullet list
  if (trimmed.startsWith('- ')) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2 text-xs text-gray-300 pl-2 max-w-lg"
      >
        <span className="text-blue-400">•</span>
        <span>{renderInlineMarkdown(trimmed.slice(2))}</span>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-lg">
      <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
        {renderInlineMarkdown(para)}
        {/* Ghost text */}
        {isLast && ghostText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-gray-500"
          >
            {ghostText}
          </motion.span>
        )}
        {/* Cursor */}
        {isLast && showCursor && (
          <Cursor />
        )}
      </p>

      {/* Tab hint */}
      {isLast && showTabHint && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 flex items-center gap-2"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] text-white font-mono"
          >
            Tab
          </motion.span>
          <span className="text-[10px] text-gray-500">to accept</span>
        </motion.div>
      )}
    </div>
  );
};

// Review highlighted text component
const ReviewHighlightedText = ({ text, issues }) => {
  if (!issues || issues.length === 0) return text;

  // Sort issues by position
  const sortedIssues = [...issues].sort((a, b) => (a.position?.start || 0) - (b.position?.start || 0));

  const parts = [];
  let lastEnd = 0;

  sortedIssues.forEach((issue, idx) => {
    const start = issue.position?.start || text.indexOf(issue.text);
    const end = issue.position?.end || (start + issue.text.length);

    // Add text before issue
    if (start > lastEnd) {
      parts.push(<span key={`text-${idx}`}>{text.slice(lastEnd, start)}</span>);
    }

    // Add highlighted issue
    const underlineColor = issue.type === 'grammar' ? 'decoration-red-500' : 'decoration-blue-500';
    parts.push(
      <motion.span
        key={`issue-${idx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`underline decoration-wavy ${underlineColor} cursor-pointer`}
        title={`Suggestion: ${issue.suggestion}`}
      >
        {issue.text}
      </motion.span>
    );

    lastEnd = end;
  });

  // Add remaining text
  if (lastEnd < text.length) {
    parts.push(<span key="text-end">{text.slice(lastEnd)}</span>);
  }

  return <>{parts}</>;
};

// Cursor component
const Cursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity }}
    className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle"
  />
);

// Simple Markdown renderer for diff content
const RenderedMarkdown = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 max-h-[300px] overflow-y-auto demo-scrollbar">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // H1: # Title
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-base font-bold text-white">
              {trimmed.slice(2)}
            </h1>
          );
        }

        // H2: ## Title - main section headings
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-[13px] font-bold text-white mt-4 first:mt-0">
              {trimmed.slice(3)}
            </h2>
          );
        }

        // H3: ### Title - subsection headings
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-[11px] font-semibold text-gray-300 mt-1 pl-2">
              {trimmed.slice(4)}
            </h3>
          );
        }

        // Bullet list: - item or * item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex gap-2 text-[11px] text-gray-400 pl-4">
              <span className="text-gray-500">•</span>
              <span>{renderInlineMarkdown(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-[11px] text-gray-300 leading-relaxed">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// Quick Edit Menu
const QuickEditMenu = ({ hovered }) => {
  const commands = [
    { id: 'grammar', label: 'Fix Grammar', icon: '✓' },
    { id: 'improve', label: 'Improve', icon: '✨' },
    { id: 'simplify', label: 'Simplify', icon: '−' },
    { id: 'expand', label: 'Expand', icon: '+' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute left-0 mt-2 bg-gray-900 border border-white/10 rounded-lg p-1.5 z-10 shadow-xl"
    >
      <div className="flex gap-1">
        {commands.map(cmd => (
          <motion.div
            key={cmd.id}
            whileHover={{ scale: 1.05 }}
            className={`px-2.5 py-1.5 rounded text-[10px] transition-colors flex items-center gap-1 ${
              hovered === cmd.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <span>{cmd.icon}</span>
            <span>{cmd.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Mindlines View
const MindlinesView = ({ nodes }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full" style={{ height: '180px' }}>
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {nodes.filter(n => n.parent).map(node => {
            const parent = nodes.find(p => p.id === node.parent);
            if (!parent) return null;
            return (
              <motion.path
                key={`${parent.id}-${node.id}`}
                d={`M ${parent.x} ${parent.y + 20} Q ${parent.x} ${(parent.y + node.y) / 2} ${node.x} ${node.y - 15}`}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 }}
              className={`absolute px-3 py-1.5 rounded-lg border text-xs font-medium shadow-lg ${
                node.level === 0
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                  : 'bg-white/5 border-white/10 text-gray-300'
              }`}
              style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {node.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContinuousDemo;
