import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MockSidebar } from "./mock-sidebar";
import { MockEditorArea } from "./mock-editor-area";
import { MockChatPanel } from "./mock-chat-panel";
import { MockStatusBar } from "./mock-status-bar";

export function MockEditorShowcase() {
  const { t } = useTranslation('mock');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();

  // If user prefers reduced motion, show everything immediately
  const inView = isInView || prefersReduced;

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-2xl bg-[hsl(228,14%,7%)]"
      style={{
        boxShadow: [
          "0 0 0 0.5px rgba(255,255,255,0.08)",
          "0 0 0 1px rgba(0,0,0,0.4)",
          "0 1px 2px rgba(0,0,0,0.12)",
          "0 4px 8px rgba(0,0,0,0.12)",
          "0 12px 24px rgba(0,0,0,0.16)",
          "0 32px 64px rgba(0,0,0,0.24)",
        ].join(","),
      }}
    >
      {/* Title bar — frosted glass */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-[12px] w-[12px] rounded-full bg-[#ff5f57]" />
          <div className="h-[12px] w-[12px] rounded-full bg-[#febc2e]" />
          <div className="h-[12px] w-[12px] rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs font-medium text-white/30 tracking-wide">
          {t('titleBar')}
        </span>
      </div>

      {/* Three-panel layout */}
      <div className="flex h-[700px]">
        <MockSidebar inView={inView} />
        <MockEditorArea inView={inView} />
        <MockChatPanel inView={inView} />
      </div>

      {/* Status bar */}
      <MockStatusBar inView={inView} />
    </div>
  );
}
