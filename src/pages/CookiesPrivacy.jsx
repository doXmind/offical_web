import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cookie, Eye, Lock, Server, Mail } from 'lucide-react';
import SEO from '../components/seo/SEO';

const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="flex items-center gap-3 mb-6">
      {Icon && <Icon className="w-6 h-6 text-white" />}
      <h2 className="text-2xl md:text-3xl font-light">{title}</h2>
    </div>
    <div className="prose prose-invert max-w-none text-gray-400">
      {children}
    </div>
  </section>
);

const CookiesPrivacy = () => {
  const lastUpdated = 'January 28, 2026';

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO
        path="/cookies-privacy"
        title="Cookies & Privacy Policy - doXmind"
        description="Learn about how doXmind collects, uses, and protects your personal information and how we use cookies."
      />

      {/* Hero Section */}
      <section className="px-6 py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6">
              Cookies & Privacy Policy
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Introduction */}
          <Section id="introduction" title="Introduction" icon={Shield}>
            <p className="mb-4">
              At doXmind ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Cookies & Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered writing assistant platform.
            </p>
            <p>
              By using doXmind, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </Section>

          {/* Information We Collect */}
          <Section id="information-collected" title="Information We Collect" icon={Eye}>
            <h3 className="text-xl font-light text-white mb-4">Personal Information</h3>
            <p className="mb-4">We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (profile picture, preferences)</li>
              <li>Payment information (processed securely through third-party payment providers)</li>
              <li>Communication data (support tickets, feedback)</li>
            </ul>

            <h3 className="text-xl font-light text-white mb-4">Usage Data</h3>
            <p className="mb-4">We automatically collect certain information when you use our service:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Device information (browser type, operating system, device type)</li>
              <li>Log data (IP address, access times, pages viewed)</li>
              <li>Usage patterns (features used, interaction data)</li>
              <li>Performance data (error reports, loading times)</li>
            </ul>

            <h3 className="text-xl font-light text-white mb-4">Content Data</h3>
            <p>
              Documents and content you create, upload, or process through doXmind are stored securely. We do not use your content to train our AI models without your explicit consent.
            </p>
          </Section>

          {/* How We Use Cookies */}
          <Section id="cookies" title="How We Use Cookies" icon={Cookie}>
            <p className="mb-4">
              Cookies are small text files stored on your device that help us provide and improve our services. We use the following types of cookies:
            </p>

            <div className="space-y-6">
              <div className="p-4 border border-white/10 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Essential Cookies</h4>
                <p>Required for the website to function properly. These cookies enable core functionality such as security, authentication, and session management. You cannot opt out of these cookies.</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Analytics Cookies</h4>
                <p>Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and user experience.</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Functional Cookies</h4>
                <p>Enable enhanced functionality and personalization, such as remembering your preferences, language settings, and theme choices.</p>
              </div>

              <div className="p-4 border border-white/10 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Marketing Cookies</h4>
                <p>Used to track visitors across websites to display relevant advertisements. These cookies are only set with your consent.</p>
              </div>
            </div>

            <h3 className="text-xl font-light text-white mt-8 mb-4">Managing Cookies</h3>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. Please note that disabling certain cookies may affect the functionality of our services.
            </p>
          </Section>

          {/* How We Use Your Information */}
          <Section id="use-of-information" title="How We Use Your Information" icon={Server}>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
              <li>Personalize and improve your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          {/* Data Security */}
          <Section id="data-security" title="Data Security" icon={Lock}>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p>
              While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </Section>

          {/* Your Rights */}
          <Section id="your-rights" title="Your Rights" icon={Shield}>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong className="text-white">Access:</strong> Request access to your personal data</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your data</li>
              <li><strong className="text-white">Portability:</strong> Request transfer of your data</li>
              <li><strong className="text-white">Objection:</strong> Object to processing of your data</li>
              <li><strong className="text-white">Restriction:</strong> Request restriction of processing</li>
              <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </Section>

          {/* Third-Party Services */}
          <Section id="third-party" title="Third-Party Services">
            <p className="mb-4">
              Our service may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>
            <p>
              We may use third-party service providers to help us operate our business, such as:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>Analytics services</li>
              <li>Customer support tools</li>
            </ul>
          </Section>

          {/* Children's Privacy */}
          <Section id="children" title="Children's Privacy">
            <p>
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </Section>

          {/* Changes to This Policy */}
          <Section id="changes" title="Changes to This Policy">
            <p>
              We may update this Cookies & Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </Section>

          {/* Contact Us */}
          <Section id="contact" title="Contact Us" icon={Mail}>
            <p className="mb-4">
              If you have any questions about this Cookies & Privacy Policy, please contact us:
            </p>
            <div className="p-6 border border-white/10 rounded-lg bg-white/5">
              <p className="mb-2"><strong className="text-white">Email:</strong> privacy@doxmind.com</p>
              <p className="mb-2"><strong className="text-white">Company:</strong> W Aixs Inc.</p>
              <p><strong className="text-white">Website:</strong> https://doxmind.com</p>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPrivacy;
