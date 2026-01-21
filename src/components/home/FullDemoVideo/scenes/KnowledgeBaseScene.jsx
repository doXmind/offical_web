import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Check } from 'lucide-react';
import { DemoHeader, DemoToolbar, DemoSidebar, DemoChatPanel } from '../components';
import { KNOWLEDGE_BASE_CONTENT, UI_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

const KnowledgeBaseScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [messages, setMessages] = useState([]);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Attachment button highlighted
  // 2: Upload zone appears
  // 3: File dragging animation
  // 4: File dropped, uploading
  // 5: Processing
  // 6: Complete, indexed
  // 7: User asks question

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setShowUploadZone(false);
      setIsDragging(false);
      setUploadProgress(0);
      setIsProcessing(false);
      setIsComplete(false);
      setMessages([]);
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const addTimeout = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    // Reset
    setPhase(0);
    setShowUploadZone(false);
    setIsDragging(false);
    setUploadProgress(0);
    setIsProcessing(false);
    setIsComplete(false);
    setMessages([]);

    // Highlight attachment
    addTimeout(() => setPhase(1), 500);

    // Show upload zone
    addTimeout(() => {
      setPhase(2);
      setShowUploadZone(true);
    }, 1000);

    // Dragging animation
    addTimeout(() => {
      setPhase(3);
      setIsDragging(true);
    }, 1500);

    // Drop and upload
    addTimeout(() => {
      setPhase(4);
      setIsDragging(false);
      // Animate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 15;
        if (progress >= 100) {
          clearInterval(progressInterval);
          setUploadProgress(100);
        } else {
          setUploadProgress(progress);
        }
      }, 150);
      timeoutsRef.current.push(progressInterval);
    }, 2200);

    // Processing
    addTimeout(() => {
      setPhase(5);
      setIsProcessing(true);
    }, 3500);

    // Complete
    addTimeout(() => {
      setPhase(6);
      setIsProcessing(false);
      setIsComplete(true);
      setShowUploadZone(false);
    }, 4800);

    // User question
    addTimeout(() => {
      setPhase(7);
      setMessages([
        { role: 'user', content: KNOWLEDGE_BASE_CONTENT.userQuestion },
        { role: 'assistant', content: KNOWLEDGE_BASE_CONTENT.aiResponse },
      ]);
    }, 6000);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Project Plan.md"
        isDirty={false}
        isSidebarOpen={true}
        isChatOpen={true}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <DemoSidebar
          files={UI_CONTENT.files}
          activeFileId="project"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar activeButtons={[]} />

          <div className="flex-1 p-4 md:p-6 overflow-hidden relative">
            <div className="max-w-md">
              <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                Knowledge Base
              </h1>

            <p className="text-xs text-gray-400 mb-4">
              Upload documents to enable AI-powered semantic search across your knowledge base.
            </p>

            {/* Upload Zone */}
            <AnimatePresence>
              {showUploadZone && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: 'spring', ...ITEM_SPRING }}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/20 bg-white/[0.02]'
                  }`}
                >
                  {phase < 4 ? (
                    <>
                      <motion.div
                        animate={isDragging ? { y: [0, -5, 0] } : {}}
                        transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
                      >
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-xs text-gray-400">
                        {isDragging ? 'Release to upload...' : 'Drag and drop files here'}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-1">
                        Supports PDF, DOCX, PPTX up to 50MB
                      </p>
                    </>
                  ) : phase < 5 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-white">{KNOWLEDGE_BASE_CONTENT.fileName}</span>
                        <span className="text-[10px] text-gray-500">{KNOWLEDGE_BASE_CONTENT.fileSize}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">Uploaded {uploadProgress}%</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="text-xs text-gray-300">Processing document...</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Completed state */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', ...MOBILE_SPRINGS.BOUNCY }}
                className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
                    className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-green-300">{KNOWLEDGE_BASE_CONTENT.fileName}</p>
                    <p className="text-[10px] text-green-400">
                      {KNOWLEDGE_BASE_CONTENT.sectionsIndexed} sections indexed
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            </div>
          </div>
        </div>

        <DemoChatPanel
          messages={messages}
          attachmentHighlight={phase === 1}
        />
      </div>
    </div>
  );
};

export default KnowledgeBaseScene;
