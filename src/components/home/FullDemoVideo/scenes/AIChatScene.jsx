import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DemoHeader, DemoToolbar, DemoChatPanel } from '../components';
import { AI_CHAT_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

const AIChatScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [tools, setTools] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [documentText, setDocumentText] = useState(AI_CHAT_CONTENT.originalText);
  const [isDocumentHighlighted, setIsDocumentHighlighted] = useState(false);
  const [isDocumentUpdated, setIsDocumentUpdated] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: User typing message
  // 2: Message sent
  // 3: Thinking
  // 4: Tool 1 running
  // 5: Tool 1 complete, Tool 2 running
  // 6: Tool 2 complete
  // 7: AI response streaming
  // 8: Document updated

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setMessages([]);
      setIsThinking(false);
      setTools([]);
      setInputValue('');
      setIsTyping(false);
      setDocumentText(AI_CHAT_CONTENT.originalText);
      setIsDocumentHighlighted(false);
      setIsDocumentUpdated(false);
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
    setMessages([]);
    setIsThinking(false);
    setTools([]);
    setInputValue('');
    setIsTyping(false);
    setDocumentText(AI_CHAT_CONTENT.originalText);
    setIsDocumentHighlighted(false);
    setIsDocumentUpdated(false);

    // Type user message
    const userMsg = AI_CHAT_CONTENT.userMessage;
    let charIdx = 0;

    addTimeout(() => {
      setPhase(1);
      setIsTyping(true);
      const typeInterval = setInterval(() => {
        if (charIdx < userMsg.length) {
          setInputValue(userMsg.slice(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);
      timeoutsRef.current.push(typeInterval);
    }, 300);

    // Send message with context
    addTimeout(() => {
      setPhase(2);
      setMessages([{
        role: 'user',
        content: AI_CHAT_CONTENT.userMessage,
        context: AI_CHAT_CONTENT.userContext,
        timestamp: '11:57',
      }]);
      setInputValue('');
    }, 1500);

    // Thinking
    addTimeout(() => {
      setPhase(3);
      setIsThinking(true);
    }, 2000);

    // Tool 1 - view document
    addTimeout(() => {
      setPhase(4);
      setIsThinking(false);
      setTools([{ name: 'view_document', status: 'running' }]);
      setIsDocumentHighlighted(true);
    }, 2500);

    // Tool 1 complete, Tool 2 running
    addTimeout(() => {
      setPhase(5);
      setTools([
        { name: 'view_document', status: 'completed' },
        { name: 'str_replace_editor', status: 'running' },
      ]);
    }, 3500);

    // Tool 2 complete
    addTimeout(() => {
      setPhase(6);
      setTools([
        { name: 'view_document', status: 'completed' },
        { name: 'str_replace_editor', status: 'completed' },
      ]);
    }, 4500);

    // AI response with timestamps
    addTimeout(() => {
      setPhase(7);
      setMessages([
        {
          role: 'user',
          content: AI_CHAT_CONTENT.userMessage,
          context: AI_CHAT_CONTENT.userContext,
          timestamp: '11:57',
        },
        {
          role: 'assistant',
          content: AI_CHAT_CONTENT.aiResponse,
          timestamp: '11:57',
        },
      ]);
    }, 5000);

    // Document updated
    addTimeout(() => {
      setPhase(8);
      setIsDocumentHighlighted(false);
      setIsDocumentUpdated(true);
      setDocumentText(AI_CHAT_CONTENT.improvedText);
    }, 6500);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Project Overview.md"
        isDirty={isDocumentUpdated}
        isSidebarOpen={false}
        isChatOpen={true}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area - No sidebar when chat is open */}
        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar activeButtons={[]} />

          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="max-w-md">
              <h1 className="text-lg md:text-xl font-bold text-white mb-4">
                Project Overview
              </h1>

              <div className="relative">
                <motion.div
                  animate={{
                    backgroundColor: isDocumentHighlighted
                      ? 'rgba(59, 130, 246, 0.1)'
                      : isDocumentUpdated
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'transparent',
                  }}
                  transition={{ type: 'spring', ...MOBILE_SPRINGS.SMOOTH }}
                  className={`text-xs md:text-sm leading-relaxed p-2 rounded transition-colors ${
                    isDocumentUpdated ? 'text-green-300' : 'text-gray-300'
                  }`}
                >
                  {documentText}
                </motion.div>

                {/* Reading indicator */}
                {phase >= 4 && phase < 6 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', ...ITEM_SPRING }}
                    className="absolute -right-2 -top-2 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-[9px] text-blue-400 flex items-center gap-1.5"
                  >
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full border-2 border-blue-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    {phase === 4 ? 'Reading...' : 'Editing...'}
                  </motion.div>
                )}

                {/* Updated indicator */}
                {isDocumentUpdated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', ...MOBILE_SPRINGS.BOUNCY }}
                    className="absolute -right-2 -top-2 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-[9px] text-green-400"
                  >
                    Updated
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <DemoChatPanel
          messages={messages}
          isThinking={isThinking}
          tools={tools}
          inputValue={inputValue}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default AIChatScene;
