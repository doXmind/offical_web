import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import DemoContainer from '../components/home/FullDemoVideo/ContinuousDemo/components/DemoContainer';
import DemoToolbar from '../components/home/FullDemoVideo/ContinuousDemo/components/DemoToolbar';
import DemoSidebar from '../components/home/FullDemoVideo/ContinuousDemo/components/DemoSidebar';
import DemoChatPanel from '../components/home/FullDemoVideo/ContinuousDemo/components/DemoChatPanel';
import { DEMO_SCRIPT } from '../components/home/FullDemoVideo/ContinuousDemo/constants/demoScript';

/**
 * VideoExport - Self-contained video export page
 *
 * This is a copy of ContinuousDemo optimized for video export:
 * - No autoPlay issues
 * - Direct window API control
 * - Guaranteed 106 second playback
 */

const INTRO_DURATION = 3000;
const DEMO_DURATION = 100000;
const OUTRO_DURATION = 3000;
const TOTAL_DURATION = INTRO_DURATION + DEMO_DURATION + OUTRO_DURATION;

// Icon paths for logo
const iconPaths = [
  "M6 0 Q0 0 0 6 L0 32 L40 40 L32 0 Z",
  "M48 0 L40 40 L80 32 L80 6 Q80 0 74 0 Z",
  "M0 48 L40 40 L32 80 L6 80 Q0 80 0 74 Z",
  "M40 40 L80 48 L80 74 Q80 80 74 80 L48 80 Z",
];

const CYAN = "#00f2ea";
const RED = "#ff0050";

const VideoExport = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

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

  // Ghost text
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

  // Knowledge Base
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
  const [highlightedReviewIssue, setHighlightedReviewIssue] = useState(null);

  // Diff Review
  const [showDiffMode, setShowDiffMode] = useState(false);
  const [diffContent, setDiffContent] = useState(null);
  const [acceptedChanges, setAcceptedChanges] = useState([]);

  // Mindlines
  const [showMindlines, setShowMindlines] = useState(false);
  const [mindlineNodes, setMindlineNodes] = useState([]);

  // Progress indicator
  const [currentPhase, setCurrentPhase] = useState('');

  const executedActionsRef = React.useRef(new Set());
  const timerRef = React.useRef(null);

  const resetAllState = useCallback(() => {
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
    setHighlightedReviewIssue(null);
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

  // Expose API to Puppeteer - immediately on mount
  useEffect(() => {
    window.__VIDEO_EXPORT__ = {
      start: () => {
        console.log('[VideoExport] Starting...');
        executedActionsRef.current = new Set();
        resetAllState();
        setCurrentTime(0);
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
      resume: () => setIsPlaying(true),
      getProgress: () => currentTime / TOTAL_DURATION,
      getCurrentTime: () => currentTime,
      getDuration: () => TOTAL_DURATION,
      isComplete: () => currentTime >= TOTAL_DURATION,
      isReady: () => isReady,
    };

    // Mark ready immediately
    setIsReady(true);
    console.log('[VideoExport] Ready');

    return () => {
      delete window.__VIDEO_EXPORT__;
    };
  }, [currentTime, isReady, resetAllState]);

  // Main timeline controller
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + 100;
        if (next >= TOTAL_DURATION) {
          console.log('[VideoExport] Complete!');
          setIsPlaying(false);
          window.__VIDEO_EXPORT_COMPLETE__ = true;
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Calculate phase
  const demoTime = currentTime - INTRO_DURATION;
  const isInIntro = currentTime < INTRO_DURATION;
  const isInOutro = currentTime >= INTRO_DURATION + DEMO_DURATION;
  const isInDemo = !isInIntro && !isInOutro;

  // Execute demo script
  useEffect(() => {
    if (!isInDemo || !isPlaying) return;

    DEMO_SCRIPT.forEach(action => {
      const actionKey = `${action.time}-${action.type}`;
      if (demoTime >= action.time && demoTime < action.time + 100 && !executedActionsRef.current.has(actionKey)) {
        executedActionsRef.current.add(actionKey);
        executeAction(action);
      }
    });
  }, [currentTime, demoTime, isInDemo, isPlaying]);

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
        setKbFiles([action.value]);
        setShowKBUpload(false);
        break;
      case 'addKBFile':
        setKbFiles(prev => [...prev, action.value]);
        setCurrentUploadFile(action.value);
        setKbUploadProgress(0);
        break;
      case 'applyOutline':
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
        setDocumentContent(prev => ({
          ...prev,
          paragraphs: [
            prev.paragraphs[0],
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
        setHighlightedReviewIssue(null);
        break;
      case 'highlightReviewIssue':
        setHighlightedReviewIssue(action.value);
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
        setDocumentContent(prev => ({ ...prev, list: action.value }));
        break;
      case 'updateList':
        setDocumentContent(prev => ({ ...prev, list: action.value }));
        break;
      default:
        break;
    }
  };

  const progress = (currentTime / TOTAL_DURATION) * 100;
  const displayPhase = isInIntro ? 'Intro' : (isInOutro ? 'Outro' : currentPhase);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <DemoContainer
            isPlaying={isPlaying}
            onTogglePlay={() => {}}
            progress={progress}
            currentPhase={displayPhase}
          >
            <div className="flex h-full w-full bg-black relative">
              {/* Logo Animation Overlay for Intro/Outro */}
              <AnimatePresence>
                {(isInIntro || isInOutro) && (
                  <motion.div
                    key={isInIntro ? 'intro' : 'outro'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                  >
                    <VideoExportLogo isOutro={isInOutro} />
                  </motion.div>
                )}
              </AnimatePresence>

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
                      highlightedReviewIssue={highlightedReviewIssue}
                      showDiffMode={showDiffMode}
                      diffContent={diffContent}
                      acceptedChanges={acceptedChanges}
                    />
                  )}
                </div>
              </div>

              {/* Review Panel */}
              {showReview && reviewIssues.length > 0 && (
                <ReviewPanel
                  issues={reviewIssues}
                  highlightedIndex={highlightedReviewIssue}
                />
              )}

              {/* Chat Panel */}
              {!showReview && (
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
              )}
            </div>
          </DemoContainer>
        </div>
      </div>
    </div>
  );
};

// Animated Logo for intro/outro
const VideoExportLogo = ({ isOutro = false }) => {
  const mainControls = useAnimationControls();
  const redControls = useAnimationControls();
  const cyanControls = useAnimationControls();

  const triggerGlitch = useCallback(() => {
    cyanControls.start({
      x: [0, -4, -3, -4, 0],
      opacity: [0, 0.8, 0.6, 0.7, 0],
      transition: { duration: 0.2, ease: "easeInOut" },
    });
    redControls.start({
      x: [0, 4, 3, 4, 0],
      opacity: [0, 0.8, 0.6, 0.7, 0],
      transition: { duration: 0.2, ease: "easeInOut" },
    });
    mainControls.start({
      x: [0, -2, 2, -1, 1, 0],
      transition: { duration: 0.2, ease: "easeInOut" },
    });
  }, [mainControls, redControls, cyanControls]);

  useEffect(() => {
    const glitchInterval = setInterval(() => triggerGlitch(), 1500);
    const initialGlitch = setTimeout(() => triggerGlitch(), 800);
    return () => {
      clearInterval(glitchInterval);
      clearTimeout(initialGlitch);
    };
  }, [triggerGlitch]);

  const text = [
    { char: "d", weight: "font-light" },
    { char: "o", weight: "font-light" },
    { char: "X", weight: "font-black" },
    { char: "m", weight: "font-light" },
    { char: "i", weight: "font-light" },
    { char: "n", weight: "font-light" },
    { char: "d", weight: "font-light" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          className="absolute inset-0 pointer-events-none"
          animate={cyanControls}
          initial={{ opacity: 0, x: 0 }}
        >
          {iconPaths.map((d, i) => (
            <path key={i} d={d} fill={CYAN} />
          ))}
        </motion.svg>

        <motion.svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          className="absolute inset-0 pointer-events-none"
          animate={redControls}
          initial={{ opacity: 0, x: 0 }}
        >
          {iconPaths.map((d, i) => (
            <path key={i} d={d} fill={RED} />
          ))}
        </motion.svg>

        <motion.svg
          viewBox="0 0 80 80"
          width={80}
          height={80}
          className="relative z-10 text-white"
          animate={mainControls}
        >
          {iconPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="currentColor"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ transformOrigin: "40px 40px" }}
            />
          ))}
        </motion.svg>
      </div>

      <motion.div
        className="flex items-center text-white"
        style={{ fontSize: 36, letterSpacing: "-0.03em" }}
      >
        {text.map((item, i) => (
          <motion.span
            key={i}
            className={item.weight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.5 + i * 0.05,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {item.char}
          </motion.span>
        ))}
      </motion.div>

      {isOutro && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-gray-400 text-sm"
        >
          AI-Powered Writing, Reimagined
        </motion.p>
      )}
    </motion.div>
  );
};

// Simplified DocumentView, ReviewPanel, MindlinesView for video export
const DocumentView = ({ content, cursorVisible, ghostText, showTabHint, selectionRange, showQuickEditMenu, quickEditHovered, isQuickEditLoading, quickEditResult, reviewIssues, highlightedReviewIssue, showDiffMode, diffContent, acceptedChanges }) => {
  const showCursor = cursorVisible && !ghostText && content.paragraphs.length > 0;

  const renderInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;
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

  return (
    <div className="space-y-4 h-full overflow-y-auto demo-scrollbar">
      {content.title && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl font-bold text-white max-w-lg"
        >
          {content.title}
          {content.paragraphs.length === 0 && cursorVisible && <Cursor />}
        </motion.h1>
      )}

      {content.paragraphs.map((para, idx) => {
        const trimmed = para.trim();
        const isLast = idx === content.paragraphs.length - 1;

        if (trimmed.startsWith('## ')) {
          return (
            <motion.h2 key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-white mt-3 max-w-lg">
              {trimmed.slice(3)}
            </motion.h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <motion.h3 key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium text-gray-200 mt-2 max-w-lg">
              {trimmed.slice(4)}
            </motion.h3>
          );
        }

        if (trimmed.startsWith('- ')) {
          return (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 text-xs text-gray-300 pl-2 max-w-lg">
              <span className="text-blue-400">•</span>
              <span>{renderInlineMarkdown(trimmed.slice(2))}</span>
            </motion.div>
          );
        }

        return (
          <div key={idx} className="relative max-w-lg">
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              {renderInlineMarkdown(para)}
              {isLast && ghostText && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="text-gray-500">
                  {ghostText}
                </motion.span>
              )}
              {isLast && showCursor && <Cursor />}
            </p>
            {isLast && showTabHint && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-6 left-0 flex items-center gap-2">
                <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] text-white font-mono">
                  Tab
                </motion.span>
                <span className="text-[10px] text-gray-500">to accept</span>
              </motion.div>
            )}
          </div>
        );
      })}

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

const Cursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity }}
    className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle"
  />
);

const MindlinesView = ({ nodes }) => (
  <div className="h-full flex items-center justify-center">
    <div className="relative w-full" style={{ height: '180px' }}>
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
            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
          >
            {node.label}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

const ReviewPanel = ({ issues, highlightedIndex }) => {
  const activeIssues = issues.filter(issue => !issue.fixed);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-44 border-l border-white/10 bg-white/[0.02] flex flex-col"
    >
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-medium">Review</span>
        <span className="text-[9px] text-gray-500">{activeIssues.length} issue{activeIssues.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {activeIssues.map((issue, idx) => {
          const isHighlighted = highlightedIndex === issues.findIndex(i => i.id === issue.id);
          const dotColor = issue.type === 'grammar' ? 'bg-red-500' : 'bg-blue-500';
          const categoryLabel = issue.type === 'grammar' ? 'Correctness' : 'Clarity';
          const textColor = issue.type === 'grammar' ? 'text-red-400' : 'text-blue-400';
          const highlightBg = issue.type === 'grammar' ? 'bg-red-500/10 border-red-500/30' : 'bg-blue-500/10 border-blue-500/30';

          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-2 rounded border transition-colors cursor-pointer ${isHighlighted ? highlightBg : 'bg-white/5 border-white/10'}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-1.5 h-1.5 ${dotColor} rounded-full`} />
                <span className="text-[9px] text-gray-400 uppercase">{categoryLabel}</span>
              </div>
              <div className="text-[10px]">
                <span className={`${textColor} line-through`}>{issue.text}</span>
                <span className="text-gray-500 mx-1">→</span>
                <span className="text-green-400">{issue.suggestion}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      {activeIssues.length > 0 && (
        <div className="px-2 py-2 border-t border-white/10 flex gap-1.5">
          <button className="flex-1 px-2 py-1 text-[9px] text-green-400 bg-green-500/10 rounded">Accept All</button>
          <button className="flex-1 px-2 py-1 text-[9px] text-gray-400 bg-white/5 rounded">Dismiss All</button>
        </div>
      )}
    </motion.div>
  );
};

export default VideoExport;
