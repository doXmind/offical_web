export const navigationData = {
  learn: {
    label: 'Learn',
    sections: [
      {
        title: 'Getting Started',
        items: [
          {
            label: 'Quick Start',
            href: 'https://docs.doxmind.com/quickstart',
            description: 'Get up and running in 5 minutes',
            external: true
          },
          {
            label: 'User Guide',
            href: '/guide',
            description: 'Complete guide to using doXmind'
          }
        ]
      },
      {
        title: 'Resources',
        items: [
          {
            label: 'Documentation',
            href: 'https://docs.doxmind.com',
            description: 'Complete product documentation',
            external: true
          },
          {
            label: 'Advanced Features',
            href: '/guide#advanced',
            description: 'Power user capabilities'
          }
        ]
      }
    ],
    featured: {
      title: 'User Guide',
      subtitle: 'Complete doXmind Guide',
      description: 'Everything you need to know about using doXmind - from basics to advanced features',
      href: '/guide',
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
  { label: 'Launch App', href: 'https://beta.doxmind.com/', variant: 'primary', external: true }
];