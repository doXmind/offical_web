import { Shield, Cookie, Eye, Lock, Server, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SEO from "../components/seo/SEO";
import { ChevronGrid } from "../components/home/chevron-grid";
import { DemoFooter } from "../components/home/demo-footer";

function SectionBlock({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function CookiesPrivacy() {
  const { t } = useTranslation('privacy');
  const { t: tc } = useTranslation('common');

  const cookieTypes = [
    { name: t('cookies.essential.name'), desc: t('cookies.essential.desc') },
    { name: t('cookies.analytics.name'), desc: t('cookies.analytics.desc') },
    { name: t('cookies.functional.name'), desc: t('cookies.functional.desc') },
    { name: t('cookies.marketing.name'), desc: t('cookies.marketing.desc') },
  ];

  const rights = [
    { key: t('yourRights.access.key'), value: t('yourRights.access.value') },
    { key: t('yourRights.correction.key'), value: t('yourRights.correction.value') },
    { key: t('yourRights.deletion.key'), value: t('yourRights.deletion.value') },
    { key: t('yourRights.portability.key'), value: t('yourRights.portability.value') },
    { key: t('yourRights.objection.key'), value: t('yourRights.objection.value') },
    { key: t('yourRights.restriction.key'), value: t('yourRights.restriction.value') },
    { key: t('yourRights.withdrawConsent.key'), value: t('yourRights.withdrawConsent.value') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO path="/cookies-privacy" />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-6">
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
          <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
        </div>

        {/* Interactive chevron grid */}
        <ChevronGrid />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Content */}
        <motion.div
          className="relative z-10 mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{t('badge')}</span>
          </div>

          {/* Heading */}
          <h1 className="fluid-hero font-bold tracking-tight text-gradient">
            {t('heading')}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t('lastUpdated')}
          </p>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-14">
          {/* Introduction */}
          <SectionBlock id="introduction" title={t('introduction.title')} icon={Shield}>
            <p>{t('introduction.p1')}</p>
            <p>{t('introduction.p2')}</p>
          </SectionBlock>

          {/* Information We Collect */}
          <SectionBlock id="information-collected" title={t('informationCollected.title')} icon={Eye}>
            <div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{t('informationCollected.personal.title')}</h3>
              <p className="mb-3">{t('informationCollected.personal.intro')}</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>{t('informationCollected.personal.account')}</li>
                <li>{t('informationCollected.personal.profile')}</li>
                <li>{t('informationCollected.personal.payment')}</li>
                <li>{t('informationCollected.personal.communication')}</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{t('informationCollected.usage.title')}</h3>
              <p className="mb-3">{t('informationCollected.usage.intro')}</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>{t('informationCollected.usage.device')}</li>
                <li>{t('informationCollected.usage.log')}</li>
                <li>{t('informationCollected.usage.patterns')}</li>
                <li>{t('informationCollected.usage.performance')}</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{t('informationCollected.content.title')}</h3>
              <p>{t('informationCollected.content.description')}</p>
            </div>
          </SectionBlock>

          {/* How We Use Cookies */}
          <SectionBlock id="cookies" title={t('cookies.title')} icon={Cookie}>
            <p>{t('cookies.intro')}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {cookieTypes.map((cookie) => (
                <div
                  key={cookie.name}
                  className="rounded-lg border border-border px-4 py-3"
                >
                  <p className="mb-1 text-sm font-semibold text-foreground">{cookie.name}</p>
                  <p className="text-sm">{cookie.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{t('cookies.managing.title')}</h3>
              <p>{t('cookies.managing.description')}</p>
            </div>
          </SectionBlock>

          {/* How We Use Your Information */}
          <SectionBlock id="use-of-information" title={t('useOfInformation.title')} icon={Server}>
            <p>{t('useOfInformation.intro')}</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>{t('useOfInformation.items.provide')}</li>
              <li>{t('useOfInformation.items.process')}</li>
              <li>{t('useOfInformation.items.send')}</li>
              <li>{t('useOfInformation.items.respond')}</li>
              <li>{t('useOfInformation.items.monitor')}</li>
              <li>{t('useOfInformation.items.detect')}</li>
              <li>{t('useOfInformation.items.personalize')}</li>
              <li>{t('useOfInformation.items.comply')}</li>
            </ul>
          </SectionBlock>

          {/* Data Security */}
          <SectionBlock id="data-security" title={t('dataSecurity.title')} icon={Lock}>
            <p>{t('dataSecurity.intro')}</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>{t('dataSecurity.items.encryption')}</li>
              <li>{t('dataSecurity.items.assessments')}</li>
              <li>{t('dataSecurity.items.access')}</li>
              <li>{t('dataSecurity.items.training')}</li>
              <li>{t('dataSecurity.items.incident')}</li>
            </ul>
            <p>{t('dataSecurity.disclaimer')}</p>
          </SectionBlock>

          {/* Your Rights */}
          <SectionBlock id="your-rights" title={t('yourRights.title')} icon={Shield}>
            <p>{t('yourRights.intro')}</p>
            <ul className="ml-5 list-disc space-y-1.5">
              {rights.map((r) => (
                <li key={r.key}>
                  <strong className="text-foreground">{r.key}:</strong> {r.value}
                </li>
              ))}
            </ul>
            <p>{t('yourRights.contact')}</p>
          </SectionBlock>

          {/* Third-Party Services */}
          <SectionBlock id="third-party" title={t('thirdParty.title')}>
            <p>{t('thirdParty.p1')}</p>
            <p>{t('thirdParty.p2')}</p>
          </SectionBlock>

          {/* Children's Privacy */}
          <SectionBlock id="children" title={t('children.title')}>
            <p>{t('children.description')}</p>
          </SectionBlock>

          {/* Changes to This Policy */}
          <SectionBlock id="changes" title={t('changes.title')}>
            <p>{t('changes.description')}</p>
          </SectionBlock>

          {/* Contact Us */}
          <SectionBlock id="contact" title={t('contact.title')} icon={Mail}>
            <p>{t('contact.intro')}</p>
            <div className="overflow-hidden rounded-xl border border-white/[0.06] glow-card px-6 py-5">
              <p className="mb-1.5 text-sm">
                <strong className="text-foreground">{t('contact.email')}:</strong> privacy@doxmind.com
              </p>
              <p className="mb-1.5 text-sm">
                <strong className="text-foreground">{t('contact.company')}:</strong> W Aixs Inc.
              </p>
              <p className="text-sm">
                <strong className="text-foreground">{t('contact.website')}:</strong> doxmind.com
              </p>
            </div>
          </SectionBlock>
        </div>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 pt-48 pb-36 text-center lg:pt-60 lg:pb-44">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
          <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
        </div>

        <ChevronGrid />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('cta.heading')}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            {t('cta.description')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://beta.doxmind.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              {tc('cta.getStarted')}
            </a>
            <Link
              to="/guide"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              {tc('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>

      <DemoFooter />
    </div>
  );
}
