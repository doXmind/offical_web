import { Sparkles, CheckCircle, Paperclip, ArrowUp, FileText, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MockChatPanel() {
  const { t } = useTranslation('mock');

  return (
    <div
      className="flex h-full w-[280px] shrink-0 flex-col"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Sparkles className="h-4 w-4 text-blue-400" />
        <span className="text-sm font-semibold text-white/80">{t('chat.aiAssistant')}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium text-blue-400"
          style={{ background: "rgba(96,165,250,0.1)" }}
        >
          {t('chat.demo')}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3.5 overflow-hidden px-4 py-4">
        {/* User message */}
        <div className="flex justify-end">
          <div
            className="max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] text-white/80"
            style={{ background: "rgba(96,165,250,0.1)" }}
          >
            {t('chat.userMessage')}
          </div>
        </div>

        {/* Tool steps */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <CheckCircle className="h-3 w-3 text-green-400/70" />
            <span>{t('chat.analyzingDocument')}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <CheckCircle className="h-3 w-3 text-green-400/70" />
            <span>{t('chat.editingIntroduction')}</span>
          </div>
        </div>

        {/* AI response */}
        <div className="max-w-[90%]">
          <div
            className="rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] leading-relaxed text-white/70"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p>{t('chat.improvedIntro')}</p>
            <ul className="mt-2 space-y-1 text-[12px]">
              <li>
                {t('chat.fixed')} <strong className="text-white/80">&quot;{t('chat.efficently')}&quot;</strong> &rarr;{" "}
                <strong className="text-white/80">&quot;{t('chat.efficiently')}&quot;</strong>
              </li>
              <li>{t('chat.madeEngaging')}</li>
              <li>{t('chat.tightenedLanguage')}</li>
            </ul>
          </div>
          <div
            className="mt-2 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium text-amber-400/80"
            style={{ background: "rgba(251,191,36,0.08)" }}
          >
            {t('chat.reviewChanges')}
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[t('chat.summarizeDoc'), t('chat.brainstormIdeas'), t('chat.fixGrammar')].map((label) => (
            <span
              key={label}
              className="rounded-full px-2.5 py-1 text-[11px] text-white/35"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Knowledge Base */}
      <div
        className="px-3 py-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-white/25">
          <Paperclip className="h-3 w-3" />
          <span>{t('chat.knowledgeBase')}</span>
        </div>
        <div className="space-y-1.5">
          <div
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <FileText className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-medium text-white/60">
                {t('chat.researchPaper')}
              </div>
              <div
                className="mt-0.5 h-1 w-full overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div className="h-full w-[65%] rounded-full bg-blue-400/60" />
              </div>
            </div>
            <Loader2 className="h-3 w-3 shrink-0 animate-spin text-blue-400/50" />
          </div>
          <div
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <FileText className="h-3.5 w-3.5 shrink-0 text-green-400/70" />
            <span className="truncate text-[11px] text-white/40">{t('chat.styleGuide')}</span>
            <CheckCircle className="ml-auto h-3 w-3 shrink-0 text-green-400/70" />
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div
        className="px-3 py-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="flex-1 text-[13px] text-white/20">{t('chat.askAiAnything')}</span>
          <Paperclip className="h-3.5 w-3.5 text-white/15" />
          <div
            className="flex h-6 w-6 items-center justify-center rounded-lg"
            style={{ background: "rgba(96,165,250,0.12)" }}
          >
            <ArrowUp className="h-3.5 w-3.5 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
