import { motion } from "framer-motion";
import {
  Check,
  Wand2,
  GripVertical,
  Trash2,
  Copy,
  ArrowRightLeft,
  Heading1,
  Heading2,
  List,
  Code,
  Quote,
  ListChecks,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTypingReveal } from "../../hooks/useTypingReveal";

export function MockEditorArea({ inView = false }) {
  const { t } = useTranslation('mock');
  const ghostText = t('editor.autocompleteGhost');
  const revealedGhost = useTypingReveal(ghostText, inView, 2000, 35);

  return (
    <div
      className="flex-1 overflow-hidden"
      style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="h-full overflow-y-auto px-10 py-8">
        {/* H1 Title — delay 0.2s */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mb-4 text-[26px] font-semibold leading-tight text-white/95 tracking-[-0.02em]"
        >
          {t('editor.title')}
        </motion.h1>

        {/* Body paragraph — delay 0.5s */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6 text-[14px] leading-[1.7] text-white/60"
        >
          {t('editor.bodyP1')}{" "}
          <span className="relative">
            <span className="rounded bg-blue-500/15 px-0.5 text-white/80">{t('editor.compelling')}</span>
            {/* Bubble toolbar — delay 0.8s, pop in */}
            <motion.span
              initial={{ opacity: 0, scale: 0.85, y: 4 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 4 }}
              transition={{ duration: 0.3, delay: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="absolute -top-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg px-1.5 py-1"
              style={{
                background: "rgba(30,32,42,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white/70">
                B
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded text-xs italic text-white/70">
                I
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded text-xs text-white/70 underline">
                U
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded text-xs text-white/70 line-through">
                S
              </span>
              <span className="mx-0.5 h-4 w-px bg-white/10" />
              <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white/40">
                H1
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white/40">
                H2
              </span>
              <span className="mx-0.5 h-4 w-px bg-white/10" />
              <span className="flex h-6 w-6 items-center justify-center rounded text-blue-400">
                <Wand2 className="h-3.5 w-3.5" />
              </span>
            </motion.span>
          </span>{" "}
          {t('editor.bodyP1End')}
        </motion.p>

        {/* H2: Key Features — delay 1.0s */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
          className="mb-3 mt-6 text-lg font-semibold text-white/90 tracking-[-0.01em]"
        >
          {t('editor.keyFeatures')}
        </motion.h2>

        {/* Task list — staggered from 1.2s */}
        <div className="mb-5 space-y-2 text-[14px]">
          {/* Task 1 — checked, delay 1.2s */}
          <motion.label
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="flex h-[16px] w-[16px] items-center justify-center rounded-[4px] bg-blue-500/80">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span className="text-white/35 line-through">
              {t('editor.feature1')}
            </span>
          </motion.label>
          {/* Task 2 — checked, delay 1.35s */}
          <motion.label
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.3, delay: 1.35, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="flex h-[16px] w-[16px] items-center justify-center rounded-[4px] bg-blue-500/80">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span className="text-white/35 line-through">
              {t('editor.feature2')}
            </span>
          </motion.label>
          {/* Task 3 — unchecked, delay 1.5s */}
          <motion.label
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.3, delay: 1.5, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span
              className="h-[16px] w-[16px] rounded-[4px]"
              style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
            />
            <span className="text-white/70">{t('editor.feature3')}</span>
          </motion.label>
        </div>

        {/* Autocomplete ghost text — delay 1.8s for line, 2.0s for typing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
          className="mb-5 mt-7 text-[14px] leading-[1.7]"
        >
          <span className="text-white/70">{t('editor.autocompleteVisible')}</span>
          <span className="relative mx-0.5 inline-block h-5 w-[1.5px] animate-pulse bg-blue-400 align-middle" />
          <span className="text-white/20">
            {revealedGhost}
          </span>
        </motion.p>

        {/* Diff section — delay 3.8s, expand from height 0 */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={inView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.5, delay: 3.8, ease: "easeOut" }}
          className="mb-5 overflow-hidden rounded-lg"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="px-4 py-2.5 text-[13px]"
            style={{ backgroundColor: "rgba(255,59,48,0.06)" }}
          >
            <span className="mr-2 text-red-400/60">-</span>
            <span className="text-white/40 line-through">
              {t('editor.diffOld')}
            </span>
          </div>
          <div
            className="px-4 py-2.5 text-[13px]"
            style={{ backgroundColor: "rgba(52,199,89,0.05)" }}
          >
            <span className="mr-2 text-green-400/60">+</span>
            <span className="text-white/75">
              {t('editor.diffNew')}
            </span>
          </div>
          <div
            className="flex gap-2 px-4 py-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              className="inline-flex cursor-default items-center rounded-md px-2.5 py-1 text-xs font-medium text-green-400"
              style={{ background: "rgba(52,199,89,0.1)" }}
            >
              {t('editor.accept')}
            </span>
            <span
              className="inline-flex cursor-default items-center rounded-md px-2.5 py-1 text-xs font-medium text-white/40"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {t('editor.reject')}
            </span>
          </div>
        </motion.div>

        {/* Block select with drag handle menu — static (below fold) */}
        <div className="relative mb-5">
          <div
            className="rounded-lg px-3 py-2.5 text-[14px] leading-relaxed text-white/75"
            style={{
              background: "rgba(255,255,255,0.03)",
              boxShadow: "inset 0 0 0 1px rgba(100,140,255,0.12)",
            }}
          >
            {t('editor.exportLine')}
          </div>
          {/* Drag handle */}
          <div className="absolute -left-7 top-1/2 -translate-y-1/2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md text-white/30"
              style={{
                background: "rgba(255,255,255,0.04)",
                boxShadow: "0 0 0 0.5px rgba(255,255,255,0.08)",
              }}
            >
              <GripVertical className="h-3.5 w-3.5" />
            </div>
          </div>
          {/* Handle dropdown menu */}
          <div
            className="absolute -left-7 top-[calc(50%+16px)] z-10 w-[160px] overflow-hidden rounded-xl py-1"
            style={{
              background: "rgba(28,30,40,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-white/70">
              <Trash2 className="h-3.5 w-3.5 text-white/35" />
              {t('editor.delete')}
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-white/70">
              <Copy className="h-3.5 w-3.5 text-white/35" />
              {t('editor.duplicate')}
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-white/70">
              <ArrowRightLeft className="h-3.5 w-3.5 text-white/35" />
              {t('editor.turnInto')}
            </div>
          </div>
        </div>

        {/* Spacer for handle menu */}
        <div className="h-14" />

        {/* Slash command — static (below fold) */}
        <div className="relative mb-5">
          <p className="text-[14px] leading-relaxed text-white/70">
            <span className="text-white/30">/</span>
            <span className="relative mx-0.5 inline-block h-5 w-[1.5px] animate-pulse bg-blue-400 align-middle" />
          </p>
          {/* Slash command dropdown */}
          <div
            className="absolute left-0 top-8 z-10 w-[200px] overflow-hidden rounded-xl py-1"
            style={{
              background: "rgba(28,30,40,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/25">
              {t('editor.blocks')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-[13px] text-white/80">
              <Heading1 className="h-4 w-4 text-white/40" />
              {t('editor.heading1')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-white/60">
              <Heading2 className="h-4 w-4 text-white/30" />
              {t('editor.heading2')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-white/60">
              <List className="h-4 w-4 text-white/30" />
              {t('editor.bulletList')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-white/60">
              <ListChecks className="h-4 w-4 text-white/30" />
              {t('editor.taskList')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-white/60">
              <Code className="h-4 w-4 text-white/30" />
              {t('editor.codeBlock')}
            </div>
            <div className="mx-1 flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-white/60">
              <Quote className="h-4 w-4 text-white/30" />
              {t('editor.blockquote')}
            </div>
          </div>
        </div>

        {/* Spacer for slash dropdown */}
        <div className="h-36" />

        {/* H2: Implementation — static (below fold) */}
        <h2 className="mb-3 mt-6 text-lg font-semibold text-white/90 tracking-[-0.01em]">
          {t('editor.implementation')}
        </h2>

        {/* Code block — static (below fold) */}
        <div
          className="mb-5 overflow-hidden rounded-xl"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-1.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="text-[11px] font-medium text-white/25">TypeScript</span>
          </div>
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-blue-400">function</span>{" "}
              <span className="text-white/85">enhance</span>
              <span className="text-white/30">(</span>
              <span className="text-white/85">text</span>
              <span className="text-white/30">: </span>
              <span className="text-amber-400">string</span>
              <span className="text-white/30">) {"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-blue-400">return</span>{" "}
              <span className="text-white/85">ai</span>
              <span className="text-white/30">.</span>
              <span className="text-white/85">improve</span>
              <span className="text-white/30">(</span>
              <span className="text-white/85">text</span>
              <span className="text-white/30">, {"{"}</span>
              {"\n"}
              {"    "}
              <span className="text-white/85">tone</span>
              <span className="text-white/30">: </span>
              <span className="text-green-400">
                &quot;professional&quot;
              </span>
              <span className="text-white/30">,</span>
              {"\n"}
              {"    "}
              <span className="text-white/85">style</span>
              <span className="text-white/30">: </span>
              <span className="text-green-400">&quot;concise&quot;</span>
              {"\n"}
              {"  "}
              <span className="text-white/30">{"}"});</span>
              {"\n"}
              <span className="text-white/30">{"}"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
