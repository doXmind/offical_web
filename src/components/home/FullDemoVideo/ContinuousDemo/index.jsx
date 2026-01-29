import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import DemoContainer from './components/DemoContainer';
import DemoToolbar from './components/DemoToolbar';
import DemoSidebar from './components/DemoSidebar';
import DemoChatPanel from './components/DemoChatPanel';
import CameraLayer from './components/CameraLayer';
import TransitionOverlay from './components/TransitionOverlay';
import SpotlightOverlay from './components/SpotlightOverlay';
import { DEMO_SCRIPT } from './constants/demoScript';
import { FOCUS_AREAS, CAMERA_TRANSITIONS, CAMERA_SCRIPT } from './constants/cameraPresets';
import IntroSequence from './components/IntroSequence';
import OutroSequence from './components/OutroSequence';

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
 *
 * Timeline: 12s intro (hook + abstract + brand) + 66s demo + 8s outro (stats + CTA) = 86s total
 */

const INTRO_DURATION = 12000; // 12 seconds for cinematic intro (hook + abstract + brand)
const DEMO_DURATION = 66000; // 66 seconds for demo (maximum compression, tight pacing between phases)
const OUTRO_DURATION = 8000; // 8 seconds for outro with stats + CTA
const TOTAL_DURATION = INTRO_DURATION + DEMO_DURATION + OUTRO_DURATION; // 86 seconds

/**
 * ContinuousDemo Component
 *
 * @param {Object} props
 * @param {function} props.onComplete - Callback when demo completes (for video export)
 * @param {boolean} props.hideControls - Hide progress bar and controls (for video export)
 * @param {boolean} props.autoPlay - Auto-start playing (default: true)
 * @param {React.Ref} ref - Ref for external control (start, pause, getProgress, isComplete)
 */
const ContinuousDemo = forwardRef(({ onComplete, hideControls = false, autoPlay = true }, ref) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

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
  const [highlightedReviewIssue, setHighlightedReviewIssue] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // Diff Review
  const [showDiffMode, setShowDiffMode] = useState(false);
  const [diffContent, setDiffContent] = useState(null);
  const [acceptedChanges, setAcceptedChanges] = useState([]);

  // Mindlines
  const [showMindlines, setShowMindlines] = useState(false);
  const [mindlineNodes, setMindlineNodes] = useState([]);
  const [mindlineHover, setMindlineHover] = useState(null);

  // AI Semantic Search
  const [showAISearch, setShowAISearch] = useState(false);
  const [aiSearchQuery, setAISearchQuery] = useState('');
  const [aiSearchResults, setAISearchResults] = useState([]);
  const [aiSearchCurrentIndex, setAISearchCurrentIndex] = useState(0);
  const [aiSearchHighlights, setAISearchHighlights] = useState([]);

  // Outline (in sidebar)
  const [outlineExpanded, setOutlineExpanded] = useState(false);
  const [outlineItems, setOutlineItems] = useState([]);

  // TODO Plan for agent execution
  const [todoPlan, setTodoPlan] = useState([]);
  const [showTodoPlan, setShowTodoPlanState] = useState(false);

  // Progress indicator
  const [currentPhase, setCurrentPhase] = useState('');

  // Stats popup (data proof point)
  const [showStats, setShowStats] = useState(false);
  const [statsData, setStatsData] = useState(null);

  // Camera System state
  const [cameraState, setCameraState] = useState(FOCUS_AREAS.FULL_VIEW);
  const [cameraTransition, setCameraTransition] = useState(CAMERA_TRANSITIONS.SMOOTH);
  const [activeTransition, setActiveTransition] = useState(null);
  const [spotlight, setSpotlight] = useState(null);

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
    setHighlightedReviewIssue(null);
    setShowReviewPopup(false);
    setShowDiffMode(false);
    setDiffContent(null);
    setAcceptedChanges([]);
    setShowMindlines(false);
    setMindlineNodes([]);
    setMindlineHover(null);
    setShowAISearch(false);
    setAISearchQuery('');
    setAISearchResults([]);
    setAISearchCurrentIndex(0);
    setAISearchHighlights([]);
    setOutlineExpanded(false);
    setOutlineItems([]);
    setTodoPlan([]);
    setShowTodoPlanState(false);
    setIsAIThinking(false);
    setChatTools([]);
    setShowAutocomplete(false);
    setCurrentPhase('');
    setShowStats(false);
    setStatsData(null);
    // Reset camera state
    setCameraState(FOCUS_AREAS.FULL_VIEW);
    setCameraTransition(CAMERA_TRANSITIONS.SMOOTH);
    setActiveTransition(null);
    setSpotlight(null);
  }, []);

  const resetDemo = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    executedActionsRef.current = new Set();
    resetAllState();
  }, [resetAllState]);

  // Expose control API via ref (for video export)
  useImperativeHandle(ref, () => ({
    start: () => {
      setCurrentTime(0);
      setIsPlaying(true);
      executedActionsRef.current = new Set();
      resetAllState();
    },
    pause: () => setIsPlaying(false),
    resume: () => setIsPlaying(true),
    getProgress: () => currentTime / TOTAL_DURATION,
    getCurrentTime: () => currentTime,
    getTotalDuration: () => TOTAL_DURATION,
    isComplete: () => currentTime >= TOTAL_DURATION,
  }), [currentTime, resetAllState]);

  // Call onComplete callback when demo ends
  useEffect(() => {
    if (currentTime >= TOTAL_DURATION && onComplete) {
      onComplete();
    }
  }, [currentTime, onComplete]);

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
          // If onComplete is provided (video export mode), stop at the end
          // Otherwise, loop the demo
          if (onComplete) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          resetDemo();
          return 0;
        }
        return prev + 100;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, resetDemo, onComplete]);

  // Calculate which phase we're in (intro/demo/outro)
  const demoTime = currentTime - INTRO_DURATION; // Time within the demo portion
  const isInIntro = currentTime < INTRO_DURATION;
  const isInOutro = currentTime >= INTRO_DURATION + DEMO_DURATION;
  const isInDemo = !isInIntro && !isInOutro;

  // Execute script based on current time (offset by intro duration)
  useEffect(() => {
    if (!isInDemo) return; // Don't execute demo script during intro/outro

    DEMO_SCRIPT.forEach(action => {
      const actionKey = `${action.time}-${action.type}`;
      // Check against demoTime (time since intro ended)
      if (demoTime >= action.time && demoTime < action.time + 100 && !executedActionsRef.current.has(actionKey)) {
        executedActionsRef.current.add(actionKey);
        executeAction(action);
      }
    });

    // Execute camera script in parallel
    CAMERA_SCRIPT.forEach(action => {
      const actionKey = `camera-${action.time}-${action.type}`;
      if (demoTime >= action.time && demoTime < action.time + 100 && !executedActionsRef.current.has(actionKey)) {
        executedActionsRef.current.add(actionKey);
        executeCameraAction(action);
      }
    });
  }, [currentTime, demoTime, isInDemo]);

  // Camera action executor
  const executeCameraAction = (action) => {
    switch (action.type) {
      case 'setCamera':
        if (typeof action.value === 'string') {
          setCameraState(FOCUS_AREAS[action.value] || FOCUS_AREAS.FULL_VIEW);
        } else {
          setCameraState(action.value);
        }
        if (action.transition) {
          setCameraTransition(CAMERA_TRANSITIONS[action.transition] || CAMERA_TRANSITIONS.SMOOTH);
        }
        break;

      case 'transition':
        setActiveTransition(action.value);
        // Auto-clear transition after duration
        setTimeout(() => setActiveTransition(null), action.value.duration + 100);
        break;

      case 'spotlight':
        setSpotlight(action.value);
        break;

      default:
        break;
    }
  };

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
      case 'applyQuickEditResult':
        // Apply the quick edit result to the actual document content
        if (action.value) {
          setDocumentContent(prev => {
            const newParagraphs = [...prev.paragraphs];
            newParagraphs[action.value.paragraphIndex] = action.value.text;
            return { ...prev, paragraphs: newParagraphs };
          });
        }
        setQuickEditResult(null);
        setSelectionRange(null);
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
        // This replaces outline with full essay paragraphs (Argumentative Essay Template)
        setDocumentContent(prev => ({
          ...prev,
          paragraphs: [
            prev.paragraphs[0], // Keep original intro
            '## 1. Introduction',
            '*Hook:* In the time it takes to read this sentence, an AI system has diagnosed a case of diabetic retinopathy, identified a drug candidate, and flagged an anomaly in a patient\'s CT scan.',
            '*Thesis:* AI should be embraced as a transformative force in healthcare because it improves diagnostic accuracy, accelerates drug discovery, and enhances patient outcomes.',
            '## 2. AI-Powered Diagnostics',
            '**Topic Sentence:** The most compelling evidence for AI adoption lies in its ability to match or exceed human diagnostic performance.',
            '- **Mammography**: 96.2% sensitivity, 11.7% fewer false negatives',
            '- **Chest CT**: 45-second stroke detection via Viz.ai',
            '- **Retinal Imaging**: 98.1% sensitivity (IDx-DR)',
            '- **Pathology**: 99.7% accuracy in cancer detection',
            '## 3. Drug Discovery: Decades to Months',
            'AlphaFold3 predicts protein-ligand interactions with 89% accuracy. Insilico Medicine\'s ISM001-055 now in Phase II trials.',
            '## 4. Counterargument: Ethical Challenges',
            'Critics cite algorithmic bias (12.3% lower sensitivity for darker skin, improved from 18.4% in 2024). FDA GMLP and EU AI Act now fully enforced.',
            '## 5. Future Directions',
            'Med-Gemini deployed in 200+ hospitals. National Health AI Consortium trains federated models across 340 hospitals.',
            '## 6. Conclusion',
            '**Call to Action:** Policymakers and developers must ensure AI benefits all patients equitably through diverse data, bias testing, and transparent deployment.',
          ],
          isFullEssay: true,
          wordCount: 3247
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
      case 'acceptAllReviewIssues':
        // Mark all remaining unfixed issues as fixed
        setReviewIssues(prev => prev.map(issue => ({ ...issue, fixed: true })));
        setHighlightedReviewIssue(null);
        break;
      case 'highlightReviewIssue':
        setHighlightedReviewIssue(action.value);
        break;
      case 'showReviewPopup':
        setShowReviewPopup(action.value);
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
      case 'setMindlineHover':
        setMindlineHover(action.value);
        break;
      case 'setOutlineExpanded':
        setOutlineExpanded(action.value);
        break;
      case 'setOutlineItems':
        setOutlineItems(action.value);
        break;
      case 'showTodoPlan':
        setTodoPlan(action.value);
        setShowTodoPlanState(true);
        break;
      case 'updateTodoStatus':
        setTodoPlan(prev => prev.map(item =>
          item.id === action.value.id ? { ...item, ...action.value } : item
        ));
        break;
      case 'hideTodoPlan':
        setShowTodoPlanState(false);
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
      case 'showStats':
        setStatsData(action.value);
        setShowStats(true);
        break;
      case 'hideStats':
        setShowStats(false);
        break;
      case 'showAISearch':
        setShowAISearch(action.value);
        break;
      case 'setAISearchQuery':
        setAISearchQuery(action.value);
        break;
      case 'typeAISearchQuery':
        setAISearchQuery(prev => prev + action.value);
        break;
      case 'setAISearchResults':
        setAISearchResults(action.value);
        break;
      case 'setAISearchCurrentIndex':
        setAISearchCurrentIndex(action.value);
        break;
      case 'setAISearchHighlights':
        setAISearchHighlights(action.value);
        break;
      case 'clearAISearch':
        setShowAISearch(false);
        setAISearchQuery('');
        setAISearchResults([]);
        setAISearchCurrentIndex(0);
        setAISearchHighlights([]);
        break;
      default:
        break;
    }
  };

  // Store executeAction in ref so seekToTime can use it
  executeActionRef.current = executeAction;

  // Store executeCameraAction in ref for seek
  const executeCameraActionRef = useRef(null);
  executeCameraActionRef.current = executeCameraAction;

  // Seek to a specific time - resets state and replays actions up to that point
  const handleSeek = (targetTime) => {
    // Reset everything first
    resetAllState();
    executedActionsRef.current = new Set();

    // Calculate demo time (accounting for intro offset)
    const targetDemoTime = targetTime - INTRO_DURATION;

    // Only execute actions if we're past the intro
    if (targetDemoTime > 0) {
      // Execute demo script actions
      DEMO_SCRIPT.forEach(action => {
        if (action.time <= targetDemoTime) {
          executedActionsRef.current.add(`${action.time}-${action.type}`);
          executeActionRef.current(action);
        }
      });

      // Execute camera script actions
      CAMERA_SCRIPT.forEach(action => {
        if (action.time <= targetDemoTime) {
          executedActionsRef.current.add(`camera-${action.time}-${action.type}`);
          executeCameraActionRef.current(action);
        }
      });
    }

    setCurrentTime(targetTime);
  };

  const progress = (currentTime / TOTAL_DURATION) * 100;

  // Display time (show demo time during demo, otherwise total time)
  const displayTime = isInDemo ? Math.floor(demoTime / 1000) : (isInIntro ? 0 : Math.floor(DEMO_DURATION / 1000));
  const displayPhase = isInIntro ? 'Intro' : (isInOutro ? 'Outro' : currentPhase);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <DemoContainer
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        progress={progress}
        currentPhase={displayPhase}
      >
        {/* Transition Overlay - z-40 */}
        <TransitionOverlay
          isActive={!!activeTransition}
          type={activeTransition?.type}
          duration={activeTransition?.duration}
        />

        {/* Camera Layer wraps all content */}
        <CameraLayer
          cameraState={cameraState}
          transition={cameraTransition}
          isExportMode={hideControls}
        >
          <div className="flex h-full w-full bg-black relative">
            {/* Cinematic Intro Sequence (15s) - z-50 */}
            <AnimatePresence>
              {isInIntro && (
                <motion.div
                  key="intro-sequence"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-50"
                >
                  <IntroSequence currentTime={currentTime} duration={INTRO_DURATION} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Outro with Stats + CTA (8s) - z-50 */}
            <AnimatePresence>
              {isInOutro && (
                <OutroSequence
                  currentTime={currentTime}
                  introDuration={INTRO_DURATION}
                  demoDuration={DEMO_DURATION}
                  outroDuration={OUTRO_DURATION}
                />
              )}
            </AnimatePresence>

            {/* Stats Popup - Data proof point after AI generation - z-40 */}
            <AnimatePresence>
              {showStats && isInDemo && (
                <StatsPopup data={statsData} />
              )}
            </AnimatePresence>

            {/* Review Suggestion Popup - hover comparison for Text Review - z-35 */}
            <AnimatePresence>
              {showReviewPopup && highlightedReviewIssue !== null && reviewIssues[highlightedReviewIssue] && (
                <ReviewSuggestionPopup
                  issue={reviewIssues[highlightedReviewIssue]}
                />
              )}
            </AnimatePresence>

            {/* AI Search Panel - semantic search with relevance scores - z-40 */}
            <AnimatePresence>
              {showAISearch && (
                <AISearchPanel
                  query={aiSearchQuery}
                  results={aiSearchResults}
                  currentIndex={aiSearchCurrentIndex}
                />
              )}
            </AnimatePresence>

            {/* Spotlight Overlay - z-30 */}
            <SpotlightOverlay
              isActive={!!spotlight}
              spotlight={spotlight}
            />

            {/* Sidebar */}
            <div className={`transition-all duration-500 ${isInOutro ? 'blur-md opacity-30' : ''}`}>
              <DemoSidebar
                files={files}
                activeFileId={activeFileId}
                showCreateModal={showCreateModal}
                createModalInput={createModalInput}
                onCloseModal={() => setShowCreateModal(false)}
                outlineExpanded={outlineExpanded}
                outlineItems={outlineItems}
              />
            </div>

            {/* Main Editor */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${isInOutro ? 'blur-md opacity-30' : ''}`}>
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
                {showMindlines && !isInOutro ? (
                  <MindlinesView nodes={mindlineNodes} hoveredNode={mindlineHover} />
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

            {/* Review Panel - shown during text review */}
            {showReview && reviewIssues.length > 0 && (
              <div className={`transition-all duration-500 ${isInOutro ? 'blur-md opacity-30' : ''}`}>
                <ReviewPanel
                  issues={reviewIssues}
                  highlightedIndex={highlightedReviewIssue}
                />
              </div>
            )}

            {/* Chat Panel - hidden during review and mindlines */}
            {!showReview && !showMindlines && (
              <div className={`transition-all duration-500 ${isInOutro ? 'blur-md opacity-30' : ''}`}>
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
                  todoPlan={todoPlan}
                  showTodoPlan={showTodoPlan}
                />
              </div>
            )}
          </div>
        </CameraLayer>
      </DemoContainer>

      {/* Progress Bar - Clickable (hidden in video export mode) */}
      {!hideControls && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{displayPhase}</span>
            <span>{Math.floor(currentTime / 1000)}s / {Math.floor(TOTAL_DURATION / 1000)}s</span>
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
      )}
    </div>
  );
});

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
  highlightedReviewIssue,
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

  // Render an INSERT block - matches DiffAcceptScene style
  const renderInsertBlock = (change, changeIdx, totalChanges, isAccepted) => (
    <motion.div
      key={`insert-${changeIdx}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: changeIdx * 0.15 }}
      className="space-y-1"
    >
      {!isAccepted ? (
        <>
          {/* Insert action buttons - inline like DiffAcceptScene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded">
              <span className="text-[8px] text-gray-500 uppercase">Insert</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-4 h-4 bg-green-500/80 hover:bg-green-500 rounded flex items-center justify-center"
              >
                <span className="text-white text-[10px]">✓</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center"
              >
                <span className="text-white text-[10px]">✕</span>
              </motion.button>
            </div>
            <span className="text-[8px] text-gray-600">{changeIdx + 1}/{totalChanges}</span>
          </motion.div>

          {/* Content - rendered as Markdown with green background */}
          <div className="bg-green-500/15 border border-green-500/30 text-gray-300 px-2 py-1.5 rounded">
            <RenderedMarkdown content={change.text} />
          </div>
        </>
      ) : (
        /* After acceptance - show the content normally */
        <motion.div
          initial={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
          animate={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
          transition={{ duration: 1 }}
        >
          <RenderedMarkdown content={change.text} />
        </motion.div>
      )}
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
          className="text-xl md:text-2xl font-bold text-white "
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
              highlightedReviewIssue={highlightedReviewIssue}
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
  highlightedReviewIssue,
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
  // Pattern from DiffAcceptScene: show original (strikethrough) + buttons + new text
  if (showDiffMode && diffContent && isLast && diffContent.type === 'replace') {
    const isAccepted = acceptedChanges.includes(0);

    return (
      <div className="relative space-y-1">
        {!isAccepted ? (
          <>
            {/* Original text - deleted with strikethrough */}
            <div className="bg-red-500/15 text-gray-500 line-through px-2 py-1 rounded text-xs">
              {diffContent.original}
            </div>

            {/* Replace action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 my-1.5"
            >
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded">
                <span className="text-[8px] text-gray-500 uppercase">Replace</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-4 h-4 bg-green-500/80 hover:bg-green-500 rounded flex items-center justify-center"
                >
                  <span className="text-white text-[10px]">✓</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center"
                >
                  <span className="text-white text-[10px]">✕</span>
                </motion.button>
              </div>
            </motion.div>

            {/* New text - inserted with green background */}
            <div className="bg-green-500/15 border border-green-500/30 text-gray-300 px-2 py-1 rounded text-xs">
              {diffContent.new}
            </div>
          </>
        ) : (
          /* After acceptance - show the new text normally */
          <motion.p
            initial={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
            animate={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
            transition={{ duration: 1 }}
            className="text-xs md:text-sm text-gray-300 leading-relaxed"
          >
            {diffContent.new}
          </motion.p>
        )}
      </div>
    );
  }

  // Render with review issues - check if this paragraph contains any issue text
  const activeIssues = reviewIssues.filter(issue => !issue.fixed);
  // Find issues whose text appears in this paragraph
  const paragraphIssues = activeIssues.filter(issue => para.includes(issue.text));
  if (paragraphIssues.length > 0) {
    return (
      <div className="relative">
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          <ReviewHighlightedText
            text={para}
            issues={paragraphIssues}
            highlightedIndex={highlightedReviewIssue}
            allIssues={reviewIssues}
          />
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

        {/* Quick Edit Loading - styled as a visible pill */}
        {isQuickEditLoading && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 top-full mt-3 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-blue-400/30 border-t-blue-400 rounded-full"
            />
            <span className="text-xs text-blue-300 font-medium">Improving text...</span>
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
        className="text-sm font-semibold text-white mt-3 "
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
        className="text-xs font-medium text-gray-200 mt-2 "
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
        className="flex gap-2 text-xs text-gray-300 pl-2 "
      >
        <span className="text-blue-400">•</span>
        <span>{renderInlineMarkdown(trimmed.slice(2))}</span>
      </motion.div>
    );
  }

  return (
    <div className="relative ">
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
const ReviewHighlightedText = ({ text, issues, highlightedIndex, allIssues }) => {
  if (!issues || issues.length === 0) return text;

  // Sort issues by position
  const sortedIssues = [...issues].sort((a, b) => (a.position?.start || 0) - (b.position?.start || 0));

  // Find original index of issue for highlighting comparison
  const getOriginalIndex = (issue) => {
    const sourceList = allIssues || issues;
    return sourceList.findIndex(i => i.id === issue.id);
  };

  const parts = [];
  let lastEnd = 0;

  sortedIssues.forEach((issue, idx) => {
    const start = issue.position?.start || text.indexOf(issue.text);
    const end = issue.position?.end || (start + issue.text.length);

    // Add text before issue
    if (start > lastEnd) {
      parts.push(<span key={`text-${idx}`}>{text.slice(lastEnd, start)}</span>);
    }

    // Add highlighted issue - with background when selected
    // Use original index for highlighting comparison
    const originalIndex = getOriginalIndex(issue);

    // Color mapping based on issue type
    const getIssueColors = (type) => {
      switch (type) {
        case 'correctness':
          return { underline: '#EF4444', bg: 'bg-red-500/20' }; // Red
        case 'clarity':
          return { underline: '#3B82F6', bg: 'bg-blue-500/20' }; // Blue
        case 'tone':
          return { underline: '#10B981', bg: 'bg-green-500/20' }; // Green
        default:
          return { underline: '#6B7280', bg: 'bg-gray-500/20' }; // Gray
      }
    };
    const colors = getIssueColors(issue.type);
    const bgColor = colors.bg;
    const isHighlighted = highlightedIndex === originalIndex;

    parts.push(
      <motion.span
        key={`issue-${idx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`cursor-pointer ${isHighlighted ? `${bgColor} rounded px-0.5` : ''}`}
        style={{
          textDecoration: 'underline',
          textDecorationStyle: 'wavy',
          textDecorationColor: colors.underline,
          textUnderlineOffset: '3px',
        }}
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

// Quick Edit Menu - matches MockEditorShowcase design
const QuickEditMenu = ({ hovered }) => {
  const commands = [
    { id: 'grammar', label: 'Fix Grammar', icon: 'CheckCircle' },
    { id: 'improve', label: 'Improve', icon: 'Sparkles' },
    { id: 'simplify', label: 'Simplify', icon: 'Type' },
    { id: 'expand', label: 'Expand', icon: 'Edit3' },
    { id: 'shorten', label: 'Shorten', icon: 'Zap' },
    { id: 'translate', label: 'Translate', icon: 'Languages' },
  ];

  // Simple SVG icons
  const icons = {
    CheckCircle: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Sparkles: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    Type: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M9 12h6" />
      </svg>
    ),
    Edit3: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    Zap: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    Languages: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full mt-2 bg-black border border-white/20 rounded-lg p-1.5 shadow-xl z-10"
    >
      <div className="grid grid-cols-3 gap-1">
        {commands.map(cmd => {
          const isHovered = hovered === cmd.id;
          return (
            <motion.div
              key={cmd.id}
              animate={isHovered ? { scale: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.15 }}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] cursor-pointer ${
                isHovered
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              {icons[cmd.icon]}
              <span>{cmd.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Mindlines View - Shows mindmap visualization (outline is in sidebar)
const MindlinesView = ({ nodes, hoveredNode }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <span className="text-[11px] font-medium text-gray-400">Mindlines View</span>
      </div>

      {/* Mindmap */}
      <div className="flex-1 relative overflow-hidden">
          {/* SVG Connections - horizontal tree layout */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            {nodes.filter(n => n.parent).map(node => {
              const parent = nodes.find(p => p.id === node.parent);
              if (!parent) return null;
              const isHighlighted = hoveredNode === node.id || hoveredNode === parent.id;
              // Draw curved path from right side of parent to left side of child
              const startX = parent.x + 40; // Right edge of parent
              const startY = parent.y;
              const endX = node.x - 25; // Left edge of child
              const endY = node.y;
              const midX = (startX + endX) / 2;
              // Curved path using quadratic bezier
              const path = `M ${startX} ${startY} Q ${midX} ${startY}, ${midX} ${(startY + endY) / 2} Q ${midX} ${endY}, ${endX} ${endY}`;
              return (
                <motion.path
                  key={`${parent.id}-${node.id}`}
                  d={path}
                  stroke={isHighlighted ? "rgba(59, 130, 246, 0.5)" : "rgba(255,255,255,0.15)"}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node, idx) => {
              const isHovered = hoveredNode === node.id;
              const sizeByLevel = {
                0: 'px-3 py-1.5 text-xs font-medium',
                1: 'px-2.5 py-1 text-[10px]',
                2: 'px-2 py-0.5 text-[9px]',
              };

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 }}
                  className={`absolute rounded-lg border transition-colors ${sizeByLevel[node.level]} ${
                    isHovered
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : node.level === 0
                      ? 'bg-blue-500/10 border-blue-500/30 text-white'
                      : node.level === 1
                      ? 'bg-white/5 border-white/15 text-gray-300'
                      : 'bg-white/[0.02] border-white/10 text-gray-400'
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {node.label}
                </motion.div>
              );
            })}
          </AnimatePresence>

        {/* Minimap indicator */}
        <div className="absolute bottom-3 right-3 w-16 h-12 bg-white/5 border border-white/10 rounded">
          <div className="absolute inset-1 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500/50 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Panel - matches TextReviewScene design exactly
const ReviewPanel = ({ issues, highlightedIndex }) => {
  const activeIssues = issues.filter(issue => !issue.fixed);
  const allFixed = activeIssues.length === 0;

  // Find original index of each issue for highlighting comparison
  const getOriginalIndex = (issue) => issues.findIndex(i => i.id === issue.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-44 border-l border-white/10 bg-white/[0.02] flex flex-col"
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-medium">Review</span>
        <span className="text-[9px] text-gray-500">
          {activeIssues.length} issue{activeIssues.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Issues list */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {activeIssues.map((issue, idx) => {
          // Use original index for highlighting - issue.id - 1 matches the demoScript index
          const originalIndex = getOriginalIndex(issue);
          const isHighlighted = highlightedIndex === originalIndex;
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
              className={`
                p-2 rounded border transition-colors cursor-pointer
                ${isHighlighted ? highlightBg : 'bg-white/5 border-white/10 hover:border-white/20'}
              `}
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

        {/* Empty state when all done */}
        {allFixed && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="w-6 h-6 text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] text-gray-500">All done!</span>
          </div>
        )}
      </div>

      {/* Panel actions */}
      {activeIssues.length > 0 && (
        <div className="px-2 py-2 border-t border-white/10 flex gap-1.5">
          <button className="flex-1 px-2 py-1 text-[9px] text-green-400 bg-green-500/10 rounded hover:bg-green-500/20">
            Accept All
          </button>
          <button className="flex-1 px-2 py-1 text-[9px] text-gray-400 bg-white/5 rounded hover:bg-white/10">
            Dismiss All
          </button>
        </div>
      )}
    </motion.div>
  );
};

// ReviewSuggestionPopup - Hover popup showing before/after comparison for Text Review
const ReviewSuggestionPopup = ({ issue }) => {
  if (!issue) return null;

  // Get type color and label
  const getTypeConfig = (type) => {
    switch (type) {
      case 'correctness':
        return { color: '#EF4444', bgColor: 'bg-red-500/20', textColor: 'text-red-400', dotColor: 'bg-red-500' };
      case 'clarity':
        return { color: '#3B82F6', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400', dotColor: 'bg-blue-500' };
      case 'tone':
        return { color: '#10B981', bgColor: 'bg-green-500/20', textColor: 'text-green-400', dotColor: 'bg-green-500' };
      default:
        return { color: '#6B7280', bgColor: 'bg-gray-500/20', textColor: 'text-gray-400', dotColor: 'bg-gray-500' };
    }
  };

  const typeConfig = getTypeConfig(issue.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute z-50 pointer-events-auto"
      style={{
        top: '30%',
        left: '15%',
        maxWidth: '320px',
      }}
    >
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Header with type badge */}
        <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${typeConfig.dotColor}`} />
          <span className={`text-sm font-medium capitalize ${typeConfig.textColor}`}>
            {issue.type}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${typeConfig.bgColor} ${typeConfig.textColor}`}>
            {issue.category}
          </span>
        </div>

        {/* Before/After comparison */}
        <div className="px-4 py-3 space-y-3">
          {/* Original text (strikethrough red) */}
          <div className="flex items-start gap-2">
            <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm line-through">
              {issue.text}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>

          {/* Suggested text (green) */}
          <div className="flex items-start gap-2">
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
              {issue.suggestion}
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="px-4 py-3 bg-[#111111] border-t border-gray-700">
          <p className="text-xs text-gray-400 leading-relaxed">
            {issue.reasoning}
          </p>
        </div>

        {/* Action buttons */}
        <div className="px-4 py-3 flex items-center gap-2 border-t border-gray-700">
          <button className="flex-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-colors">
            Dismiss
          </button>
          <button className="flex-1 px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-colors flex items-center justify-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// AISearchPanel - Semantic search panel showing AI search results with relevance scores
const AISearchPanel = ({ query, results, currentIndex, onClose }) => {
  const totalResults = results.length;
  const navText = totalResults > 0 ? `${currentIndex + 1} of ${totalResults}` : '0 of 0';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden min-w-[320px]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-700/50">
          {/* Search Icon */}
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Query Text */}
          <div className="flex-1 text-sm text-white bg-transparent">
            {query}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 align-middle"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="text-xs">{navText}</span>
            <button className="p-0.5 hover:bg-white/10 rounded">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button className="p-0.5 hover:bg-white/10 rounded">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Close Button */}
          <button className="p-1 hover:bg-white/10 rounded ml-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* AI Results Section */}
        {results.length > 0 && (
          <div className="px-3 py-2">
            {/* AI Results Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xs font-medium text-purple-400">AI Results</span>
                <span className="text-xs text-gray-500">({results.length})</span>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    idx === currentIndex
                      ? 'bg-purple-500/20 border border-purple-500/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Relevance Score */}
                  <div className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                    result.relevance >= 50
                      ? 'bg-green-500/20 text-green-400'
                      : result.relevance >= 35
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {result.relevance}%
                  </div>

                  {/* Result Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {result.text}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                      {result.source}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// SVG Icons for StatsPopup
const StatsIcons = {
  check: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  document: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  citation: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  folder: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

// Animated counter for stats
const AnimatedCounter = ({ end, duration = 1, suffix = '' }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    let animationFrame;
    const numericEnd = typeof end === 'number' ? end : parseInt(end.replace(/,/g, ''), 10);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericEnd));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// StatsPopup - Enhanced data proof point with achievement unlock effect
const StatsPopup = ({ data, onClose }) => {
  if (!data) return null;

  const stats = [
    { icon: 'check', value: data.words || 3247, label: 'words generated', color: 'text-green-400', isNumeric: true },
    { icon: 'citation', value: data.citations || 8, label: 'APA citations', color: 'text-blue-400', isNumeric: true },
    { icon: 'folder', value: data.sources || 4, label: 'sources integrated', color: 'text-purple-400', isNumeric: true },
    { icon: 'clock', value: data.time || 12, label: 'seconds', color: 'text-yellow-400', isNumeric: true, suffix: 's' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
    >
      {/* Glow effect - achievement unlock style */}
      <motion.div
        className="absolute inset-0 -m-4 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0.3],
          scale: [1, 1.1, 1.05],
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 -m-8 rounded-2xl border-2 border-green-500/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.3] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 -m-4 rounded-2xl border border-green-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 0.3, 0], scale: [0.9, 1.15, 1.2] }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
      />

      <div className="relative bg-black/95 border border-green-500/40 rounded-xl p-8 shadow-2xl backdrop-blur-sm min-w-[320px]">
        {/* Header - larger */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"
          >
            {StatsIcons.check}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-green-400 font-semibold text-xl"
          >
            Essay Complete
          </motion.span>
        </div>

        {/* Stats Grid - 2x2 larger */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.15, type: 'spring' }}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-white/5"
            >
              <div className={`mb-2 ${stat.color}`}>
                {StatsIcons[stat.icon]}
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.isNumeric ? (
                  <AnimatedCounter end={stat.value} duration={0.8} suffix={stat.suffix || ''} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar animation */}
        <motion.div
          className="mt-6 h-1.5 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
          />
        </motion.div>

        {/* Subtle sparkles */}
        <motion.div
          className="absolute top-2 right-2 text-yellow-400/50"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {StatsIcons.clock}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Animated Logo Component - based on doxmind-mini design
// Icon paths for the 4 quadrants
const iconPaths = [
  "M6 0 Q0 0 0 6 L0 32 L40 40 L32 0 Z", // top-left
  "M48 0 L40 40 L80 32 L80 6 Q80 0 74 0 Z", // top-right
  "M0 48 L40 40 L32 80 L6 80 Q0 80 0 74 Z", // bottom-left
  "M40 40 L80 48 L80 74 Q80 80 74 80 L48 80 Z", // bottom-right
];

// TikTok-style colors for glitch effect
const CYAN = "#00f2ea";
const RED = "#ff0050";

const DemoAnimatedLogo = ({ isOutro = false }) => {
  const mainControls = useAnimationControls();
  const redControls = useAnimationControls();
  const cyanControls = useAnimationControls();

  // Trigger glitch effect
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

  // Run glitch animation periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 1500);

    // Trigger initial glitch after a short delay
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
      {/* Animated Icon */}
      <div className="relative">
        {/* Cyan ghost layer */}
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

        {/* Red ghost layer */}
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

        {/* Main layer */}
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

      {/* Animated Text */}
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

      {/* Tagline for outro */}
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

export default ContinuousDemo;
