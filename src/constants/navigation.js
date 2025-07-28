export const navigationData = {
  products: {
    label: 'Products',
    sections: [
      {
        title: 'AI Writing Assistant',
        items: [
          { 
            label: 'Features Overview', 
            href: '#features',
            description: 'Explore all capabilities'
          },
          { 
            label: 'Use Cases', 
            href: '#use-cases',
            description: 'See how others use DocMindLLM'
          },
          { 
            label: 'Getting Started', 
            href: '#getting-started',
            description: 'Quick setup guide'
          }
        ]
      },
      {
        title: 'Solutions by Industry',
        items: [
          { 
            label: 'Academic Writing', 
            href: '#academic',
            description: 'Research papers & essays'
          },
          { 
            label: 'Business Documents', 
            href: '#business',
            description: 'Reports & proposals'
          },
          { 
            label: 'Creative Writing', 
            href: '#creative',
            description: 'Stories & scripts'
          },
          { 
            label: 'Technical Documentation', 
            href: '#technical',
            description: 'APIs & guides'
          }
        ]
      }
    ],
    featured: {
      title: 'What\'s New',
      subtitle: 'AI Research Assistant',
      description: 'Transform your research workflow with intelligent source analysis and citation management',
      href: '#research-assistant',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    }
  },
  developers: {
    label: 'Developers',
    sections: [
      {
        title: 'Documentation',
        items: [
          { 
            label: 'API Reference', 
            href: '/docs/api',
            description: 'Complete API documentation'
          },
          { 
            label: 'SDK & Tools', 
            href: '/docs/sdk',
            description: 'Libraries and toolkits'
          },
          { 
            label: 'Integration Guide', 
            href: '/docs/integration',
            description: 'Step-by-step integration'
          },
          { 
            label: 'Code Examples', 
            href: '/docs/examples',
            description: 'Sample implementations'
          }
        ]
      },
      {
        title: 'Developer Resources',
        items: [
          { 
            label: 'Changelog', 
            href: '/changelog',
            description: 'Latest updates & features'
          },
          { 
            label: 'API Status', 
            href: '/status',
            description: 'Service health monitoring'
          },
          { 
            label: 'Rate Limits', 
            href: '/docs/limits',
            description: 'Usage quotas & limits'
          }
        ]
      }
    ],
    featured: {
      title: 'Developer Portal',
      subtitle: 'Build with DocMindLLM',
      description: 'Access powerful writing AI capabilities in your applications with our robust API',
      href: '/developers',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    }
  },
  resources: {
    label: 'Resources',
    sections: [
      {
        title: 'Learn',
        items: [
          { 
            label: 'Learning Center', 
            href: '/learn',
            description: 'Tutorials and guides'
          },
          { 
            label: 'Best Practices', 
            href: '/best-practices',
            description: 'Tips from experts'
          },
          { 
            label: 'Case Studies', 
            href: '/case-studies',
            description: 'Real-world examples'
          },
          { 
            label: 'Webinars', 
            href: '/webinars',
            description: 'Live training sessions'
          }
        ]
      },
      {
        title: 'Support',
        items: [
          { 
            label: 'Help Center', 
            href: '/help',
            description: 'FAQs and troubleshooting'
          },
          { 
            label: 'Community Forum', 
            href: '/community',
            description: 'Connect with users'
          },
          { 
            label: 'Contact Support', 
            href: '/support',
            description: 'Get expert help'
          }
        ]
      }
    ],
    featured: {
      title: 'Success Story',
      subtitle: 'Boosting Team Productivity',
      description: 'Learn how leading companies use DocMindLLM to enhance their content creation workflow',
      href: '/success-stories',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    }
  }
};

export const simpleNavItems = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' }
];

export const ctaButtons = [
  { label: 'Get Started', href: '#get-started', variant: 'primary' }
];