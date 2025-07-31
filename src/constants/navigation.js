export const navigationData = {
  learn: {
    label: 'Learn',
    sections: [
      {
        title: 'Getting Started',
        items: [
          { 
            label: 'Quick Start Guide', 
            href: '/learn/quickstart',
            description: 'Get up and running in 5 minutes'
          },
          { 
            label: 'Video Tutorials', 
            href: '/learn/tutorials',
            description: 'Step-by-step video guides'
          },
          { 
            label: 'Best Practices', 
            href: '/learn/best-practices',
            description: 'Tips from power users'
          }
        ]
      },
      {
        title: 'Resources',
        items: [
          { 
            label: 'Documentation', 
            href: 'https://docs.docmindllm.com',
            description: 'Complete product documentation',
            external: true
          },
          { 
            label: 'API Reference', 
            href: 'https://docs.docmindllm.com/api-reference/introduction',
            description: 'For developers',
            external: true
          },
          { 
            label: 'Help Center', 
            href: '/help',
            description: 'FAQs and support'
          }
        ]
      }
    ],
    featured: {
      title: 'What\'s New',
      subtitle: 'Latest Features & Updates',
      description: 'Discover the newest capabilities and improvements in DocMindLLM',
      href: '/changelog',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  }
};

export const simpleNavItems = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Solutions', href: '/solutions' }
];

export const ctaButtons = [
  { label: 'Try DocMindLLM', href: '/auth/signup', variant: 'primary' }
];