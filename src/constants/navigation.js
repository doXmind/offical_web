export const navigationData = {
  learn: {
    label: 'Learn',
    sections: [
      {
        title: 'Getting Started',
        items: [
          {
            label: 'User Guide',
            href: '/guide',
            description: 'Complete guide to using doXmind'
          },
          {
            label: 'Quick Start',
            href: '/guide#getting-started',
            description: 'Get up and running in 5 minutes'
          },
          {
            label: 'Keyboard Shortcuts',
            href: '/guide#shortcuts',
            description: 'Essential shortcuts and tips'
          }
        ]
      },
      {
        title: 'Resources',
        items: [
          {
            label: 'Documentation',
            href: '/guide',
            description: 'Complete product documentation',
            external: false
          },
          {
            label: 'Advanced Features',
            href: '/guide#advanced',
            description: 'Power user capabilities',
            external: false
          },
          {
            label: 'Troubleshooting',
            href: '/guide#troubleshooting',
            description: 'Common issues and solutions'
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