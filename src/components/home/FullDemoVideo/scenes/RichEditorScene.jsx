import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DemoHeader, DemoToolbar, DemoSidebar } from '../components';
import { RICH_EDITOR_CONTENT, UI_CONTENT } from '../constants/demoContent';
import { ITEM_SPRING, MOBILE_SPRINGS } from '../constants/animationConfig';

const RichEditorScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const [bulletItems, setBulletItems] = useState([]);
  const [codeText, setCodeText] = useState('');
  const [activeButtons, setActiveButtons] = useState([]);
  const [highlightedButtons, setHighlightedButtons] = useState([]);
  const [isH1Applied, setIsH1Applied] = useState(false);
  const [showBoldText, setShowBoldText] = useState(false);
  const timeoutsRef = useRef([]);

  // Phase timeline:
  // 0: Initial
  // 1: Type title "Introduction"
  // 2: Select text, highlight H1, apply H1
  // 3: Type paragraph
  // 4: Type bullet items
  // 5: Type code block
  // 6: Apply bold to "AI-powered"
  // 7: Final state

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      setTitleText('');
      setParagraphText('');
      setBulletItems([]);
      setCodeText('');
      setActiveButtons([]);
      setHighlightedButtons([]);
      setIsH1Applied(false);
      setShowBoldText(false);
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
    setTitleText('');
    setParagraphText('');
    setBulletItems([]);
    setCodeText('');
    setActiveButtons([]);
    setHighlightedButtons([]);
    setIsH1Applied(false);
    setShowBoldText(false);

    // Type title
    const title = RICH_EDITOR_CONTENT.title;
    let titleIdx = 0;
    addTimeout(() => {
      setPhase(1);
      const titleInterval = setInterval(() => {
        if (titleIdx < title.length) {
          setTitleText(title.slice(0, titleIdx + 1));
          titleIdx++;
        } else {
          clearInterval(titleInterval);
        }
      }, 60);
      timeoutsRef.current.push(titleInterval);
    }, 300);

    // Highlight H1 and apply - cursor in title means H1 is active
    addTimeout(() => {
      setPhase(2);
      setHighlightedButtons(['h1']);
    }, 1500);

    addTimeout(() => {
      setIsH1Applied(true);
      setActiveButtons(['h1']); // H1 active because cursor is in heading
      setHighlightedButtons([]);
    }, 2000);

    // Type paragraph - cursor moves to paragraph, no H1 active
    addTimeout(() => {
      setPhase(3);
      setActiveButtons([]); // Cursor in normal paragraph, no format active
      setParagraphText(RICH_EDITOR_CONTENT.paragraph);
    }, 2500);

    // Type bullet items - bullet format active
    addTimeout(() => {
      setPhase(4);
      setHighlightedButtons(['bullet']);
      setBulletItems([RICH_EDITOR_CONTENT.bulletItems[0]]);
    }, 3500);

    addTimeout(() => {
      setActiveButtons(['bullet']); // Cursor in bullet list
      setHighlightedButtons([]);
      setBulletItems(RICH_EDITOR_CONTENT.bulletItems.slice(0, 2));
    }, 4000);

    addTimeout(() => {
      setBulletItems(RICH_EDITOR_CONTENT.bulletItems);
    }, 4500);

    // Code block - codeblock format active
    addTimeout(() => {
      setPhase(5);
      setHighlightedButtons(['codeblock']);
      setCodeText(RICH_EDITOR_CONTENT.codeBlock);
    }, 5200);

    addTimeout(() => {
      setActiveButtons(['codeblock']); // Cursor in code block
      setHighlightedButtons([]);
    }, 5700);

    // Move back to paragraph for bold - no format active initially
    addTimeout(() => {
      setPhase(6);
      setActiveButtons([]); // Back to paragraph
      setHighlightedButtons(['bold']);
    }, 6200);

    addTimeout(() => {
      setShowBoldText(true);
      setActiveButtons(['bold']); // Bold text selected/active
      setHighlightedButtons([]);
    }, 6700);

    // Final state - cursor at end of paragraph
    addTimeout(() => {
      setPhase(7);
      setActiveButtons([]); // No format active at end
    }, 7200);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [isActive]);

  return (
    <div className="flex flex-col h-full w-full bg-black absolute inset-0">
      {/* Header */}
      <DemoHeader
        fileName="Getting Started.md"
        isDirty={phase > 0}
        isSidebarOpen={true}
        isChatOpen={false}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <DemoSidebar
          files={UI_CONTENT.files}
          activeFileId="project"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <DemoToolbar
            activeButtons={activeButtons}
            highlightedButtons={highlightedButtons}
          />

          <div className="flex-1 p-4 md:p-6 overflow-hidden">
            <div className="max-w-lg">
            {/* Title */}
            {titleText && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-3 font-bold ${isH1Applied ? 'text-xl md:text-2xl text-white' : 'text-sm text-gray-300'}`}
              >
                {titleText}
                {phase === 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-white ml-0.5"
                  />
                )}
              </motion.h1>
            )}

            {/* Paragraph */}
            {paragraphText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-400 leading-relaxed mb-4"
              >
                {showBoldText ? (
                  <>
                    Welcome to doXmind, the{' '}
                    <span className="font-bold text-white">AI-powered</span> writing studio that helps you write better, faster.
                  </>
                ) : (
                  paragraphText
                )}
              </motion.p>
            )}

            {/* Bullet list */}
            {bulletItems.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1.5 mb-4"
              >
                {bulletItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', ...ITEM_SPRING, delay: idx * 0.1 }}
                    className="text-xs text-gray-400 flex items-start gap-2"
                  >
                    <span className="text-blue-400 mt-0.5">•</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Code block */}
            {codeText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', ...MOBILE_SPRINGS.SNAPPY }}
                className="bg-gray-900 border border-white/10 rounded-md overflow-hidden"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <pre className="text-[10px] text-green-400 font-mono p-3">
                  {codeText}
                </pre>
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichEditorScene;
