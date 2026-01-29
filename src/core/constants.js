// Constants for doXmind website

// Navigation links
export const navLinks = {
  main: [
    { name: 'Product', href: '/product' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Developers', href: '/developers' },
    { name: 'Company', href: '/company' },
  ],
  secondary: [
    { name: 'Docs', href: '/docs' },
    { name: 'Sign In', href: '/signin' },
  ],
};

// Core features
export const features = [
  {
    id: 'smart-editor',
    icon: 'Edit3',
    title: 'SmartEditor Pro',
    description: 'Intelligent rich-text editor integrated with multiple AI models, supporting real-time content suggestions',
    highlight: '300% efficiency increase',
  },
  {
    id: 'data-insight',
    icon: 'BarChart3',
    title: 'DataInsight Engine',
    description: 'Automatically analyzes uploaded data files and generates visual reports and insights',
    highlight: 'Zero-code analysis',
  },
  {
    id: 'multimodal',
    icon: 'Layers',
    title: 'MultiModal Processor',
    description: 'Supports unified processing and analysis of text, tables, images, and web pages',
    highlight: 'All-in-one solution',
  },
  {
    id: 'ai-assistant',
    icon: 'MessageSquare',
    title: 'doXmind Assistant',
    description: 'Context-aware intelligent conversation assistant that understands document content',
    highlight: '24/7 intelligent help',
  },
  {
    id: 'teamspace',
    icon: 'Users',
    title: 'TeamSpace',
    description: 'Project-level document management with version control and team collaboration',
    highlight: 'Enterprise-ready',
  },
];

// Solutions
export const solutions = [
  {
    id: 'enterprise',
    title: 'Enterprise Reporting',
    description: 'Automate business reports and data analysis',
    icon: 'Building',
    href: '/solutions/enterprise',
  },
  {
    id: 'research',
    title: 'Research Management',
    description: 'Organize and analyze research documents efficiently',
    icon: 'BookOpen',
    href: '/solutions/research',
  },
  {
    id: 'knowledge',
    title: 'Knowledge Base',
    description: 'Build and maintain organizational knowledge',
    icon: 'Database',
    href: '/solutions/knowledge',
  },
  {
    id: 'content',
    title: 'Content Creation',
    description: 'Create professional content with AI assistance',
    icon: 'PenTool',
    href: '/solutions/content',
  },
];

// Pricing plans
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out doXmind',
    features: [
      '5 documents/month',
      'Basic AI features (100 uses/month)',
      '10MB storage',
      'Basic templates',
      'Community support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Great for individuals and small projects',
    features: [
      '50 documents/month',
      'Standard AI features (1,000 uses/month)',
      '1GB storage',
      'Data analysis features',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Perfect for teams and professionals',
    features: [
      'Unlimited documents',
      'Advanced AI features (5,000 uses/month)',
      '10GB storage',
      'Collaboration (5 users)',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored for large organizations',
    features: [
      'Unlimited documents and AI usage',
      'Unlimited storage',
      'Unlimited collaboration users',
      'Private deployment',
      'Custom development',
      'Dedicated customer success manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

// Tech advantages
export const techAdvantages = [
  {
    id: 'multi-model',
    title: 'Multi-model AI',
    description: 'Supports GPT-4, Claude, Gemini, and other mainstream models',
    icon: 'Brain',
  },
  {
    id: 'private-deploy',
    title: 'Private Deployment',
    description: 'Supports on-premise deployment for data security',
    icon: 'Shield',
  },
  {
    id: 'real-time',
    title: 'Real-time Processing',
    description: 'Millisecond-level response for smooth user experience',
    icon: 'Zap',
  },
  {
    id: 'modular',
    title: 'Modular Architecture',
    description: 'Flexible expansion and easy customization',
    icon: 'Package',
  },
];

// Footer links
export const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'User Guide', href: '/guide' },
  ],
  resources: [
    { name: 'User Guide', href: '/guide', external: false },
    { name: 'Documentation', href: '/guide', external: false },
  ],
  community: [
    { name: 'Launch Beta', href: 'https://beta.doxmind.com/', external: true },
    { name: 'Join Testing', href: 'https://beta.doxmind.com/', external: true },
  ],
  legal: [
    { name: 'Cookies & Privacy', href: '/cookies-privacy' },
  ],
};

// Company info
export const companyInfo = {
  name: 'doXmind',
  tagline: 'AI-Powered Intelligent Document Creation Platform',
  description: 'Transform Every Idea into Professional Content',
  copyright: `© ${new Date().getFullYear()} W Aixs Inc. All rights reserved.`,
  socialLinks: {
    twitter: 'https://twitter.com/doxmind',
    github: 'https://github.com/doxmind',
    linkedin: 'https://linkedin.com/company/doxmind',
  },
};

// Comparison data
export const comparisonData = {
  before: {
    title: 'Traditional Method',
    time: '7 hours',
    steps: [
      { task: 'Data organization', time: '2h' },
      { task: 'Chart creation', time: '1h' },
      { task: 'Report writing', time: '3h' },
      { task: 'Format adjustment', time: '1h' },
    ],
  },
  after: {
    title: 'Using doXmind',
    time: '30 minutes',
    steps: [
      { task: 'Upload data', time: '30s' },
      { task: 'AI analysis', time: '5min' },
      { task: 'Review & adjust', time: '25min' },
    ],
  },
};