import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Sparkles, Menu, X, ArrowRight, Check,
  Edit3, BarChart3, Image, FileEdit, Zap, Brain,
  Shield, Globe, Type, PenTool, FileText, Palette,
  TrendingUp, Users, Wand2, BookOpen, MessageSquare,
  Layers, Download, RefreshCw, Target
} from 'lucide-react';

const DoXmind = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState('autocomplete');
  const [scrolled, setScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [demoText, setDemoText] = useState('');
  const [isVisible, setIsVisible] = useState({});

  const fullDemoText = "Transform your ideas into compelling content with AI-powered suggestions...";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isTyping && demoText.length < fullDemoText.length) {
      const timeout = setTimeout(() => {
        setDemoText(fullDemoText.slice(0, demoText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, demoText]);

  const features = [
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "AI Auto-Complete",
      description: "Intelligent suggestions that understand context and style",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Smart Editing",
      description: "Real-time grammar, style, and tone improvements",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Content Analytics",
      description: "Track readability, engagement, and SEO metrics",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Expression",
      description: "Generate charts, diagrams, and visual content",
      color: "from-orange-500 to-red-500"
    }
  ];

  const writingTools = [
    {
      id: 'autocomplete',
      icon: <Wand2 className="w-5 h-5" />,
      title: "AI Auto-Complete",
      description: "Finish sentences, paragraphs, or entire sections with context-aware AI suggestions.",
      demo: {
        prompt: "The future of artificial intelligence in education will",
        suggestions: [
          "revolutionize personalized learning experiences",
          "enable adaptive curriculum based on individual needs",
          "create virtual tutors available 24/7"
        ]
      }
    },
    {
      id: 'rewrite',
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Smart Rewriting",
      description: "Transform your text with different tones, styles, or perspectives instantly.",
      demo: {
        original: "The meeting was boring and unproductive.",
        rewrites: {
          "Professional": "The meeting did not yield the expected outcomes.",
          "Positive": "The meeting provided opportunities for improvement.",
          "Detailed": "The meeting lacked clear objectives and actionable outcomes."
        }
      }
    },
    {
      id: 'analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Content Analysis",
      description: "Get insights on readability, tone, SEO optimization, and engagement metrics.",
      demo: {
        metrics: {
          "Readability Score": "8.5/10",
          "Average Sentence Length": "15 words",
          "Tone": "Professional, Informative",
          "SEO Score": "92%"
        }
      }
    },
    {
      id: 'visual',
      icon: <Image className="w-5 h-5" />,
      title: "Visual Creation",
      description: "Generate diagrams, charts, and infographics from your text descriptions.",
      demo: {
        input: "Create a flowchart showing user onboarding process",
        output: "📊 AI-generated flowchart with 5 steps"
      }
    }
  ];

  const useCases = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Writing",
      description: "Research papers, essays, and dissertations"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Content",
      description: "Blog posts, social media, and ad copy"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Technical Documentation",
      description: "API docs, user guides, and tutorials"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Business Communication",
      description: "Reports, proposals, and presentations"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$15",
      description: "For individual writers",
      features: [
        "5,000 AI words/month",
        "Basic auto-complete",
        "Grammar & style checks",
        "Export to Word & PDF",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$49",
      description: "For content teams",
      features: [
        "50,000 AI words/month",
        "Advanced AI features",
        "Team collaboration",
        "Custom style guides",
        "Analytics dashboard",
        "API access",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited AI words",
        "Custom AI training",
        "Dedicated workspace",
        "SSO integration",
        "Advanced security",
        "24/7 phone support",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <PenTool className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold">doXmind</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#tools" className="text-gray-300 hover:text-white transition-colors">Writing Tools</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-all transform hover:scale-105">
                Start Writing
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white">Features</a>
            <a href="#tools" className="block px-3 py-2 text-gray-300 hover:text-white">Writing Tools</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-white">Pricing</a>
            <button className="w-full text-left bg-white text-black px-3 py-2 rounded-lg font-medium">
              Start Writing
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            <span className="text-white">Write Better with</span>
            <br />
            <span className="text-gradient">AI-Powered Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fadeInUp delay-200">
            Your intelligent writing assistant that helps you create compelling content, 
            analyze data, and express ideas visually—all in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp delay-400">
            <button 
              className="group bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center"
              onMouseEnter={() => setIsTyping(true)}
            >
              Try It Free
              <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-all">
              See It In Action
            </button>
          </div>

          {/* Live Demo Editor */}
          <div className="mt-16 animate-fadeInUp delay-500">
            <div className="relative max-w-4xl mx-auto">
              <div className="gradient-border rounded-2xl p-1 hover-glow">
                <div className="bg-gray-900 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-gray-500">doXmind Editor</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Type className="w-5 h-5 text-purple-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-gray-300 text-left">
                          {demoText}
                          <span className="animate-blink">|</span>
                        </p>
                        {isTyping && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center space-x-2 text-sm text-purple-400">
                              <Sparkles className="w-4 h-4" />
                              <span>AI is generating suggestions...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
                      <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <Wand2 className="w-4 h-4" />
                        <span>Auto-complete</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        <span>Rewrite</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analyze</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Write Better
            </h2>
            <p className="text-xl text-gray-400">
              Powerful AI tools that enhance every aspect of your writing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative group ${isVisible.features ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Tools Section */}
      <section id="tools" className="py-20 px-4 relative animate-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Writing Tools
            </h2>
            <p className="text-xl text-gray-400">
              Advanced features that transform how you create content
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="gradient-border rounded-2xl p-8 hover-glow">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="flex flex-col space-y-4">
                    {writingTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => setActiveFeature(tool.id)}
                        className={`text-left p-4 rounded-lg transition-all ${
                          activeFeature === tool.id 
                            ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/20' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {tool.icon}
                          <span className="font-medium">{tool.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:w-2/3">
                  {writingTools.map((tool) => (
                    activeFeature === tool.id && (
                      <div key={tool.id} className="space-y-4 animate-slideInRight">
                        <h3 className="text-2xl font-bold">{tool.title}</h3>
                        <p className="text-gray-400">{tool.description}</p>
                        
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-6">
                          {tool.id === 'autocomplete' && (
                            <div className="space-y-4">
                              <div className="text-sm text-gray-400">Type:</div>
                              <div className="font-mono">{tool.demo.prompt}...</div>
                              <div className="space-y-2 mt-4">
                                <div className="text-sm text-gray-400">AI Suggestions:</div>
                                {tool.demo.suggestions.map((suggestion, i) => (
                                  <div key={i} className="flex items-center space-x-2 p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm">{suggestion}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {tool.id === 'rewrite' && (
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm text-gray-400 mb-2">Original:</div>
                                <div className="p-3 bg-gray-800/50 rounded">{tool.demo.original}</div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm text-gray-400">Rewrite Options:</div>
                                {Object.entries(tool.demo.rewrites).map(([style, text]) => (
                                  <div key={style} className="p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg">
                                    <div className="text-xs text-purple-400 mb-1">{style}</div>
                                    <div className="text-sm">{text}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {tool.id === 'analysis' && (
                            <div className="grid grid-cols-2 gap-4">
                              {Object.entries(tool.demo.metrics).map(([metric, value]) => (
                                <div key={metric} className="bg-gray-800/50 rounded-lg p-4">
                                  <div className="text-sm text-gray-400">{metric}</div>
                                  <div className="text-xl font-bold text-purple-400">{value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {tool.id === 'visual' && (
                            <div className="space-y-4">
                              <div className="p-3 bg-gray-800/50 rounded">
                                <div className="text-sm text-gray-400 mb-1">Your Input:</div>
                                <div>{tool.demo.input}</div>
                              </div>
                              <div className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg text-center">
                                <div className="text-3xl mb-2">{tool.demo.output}</div>
                                <button className="text-sm text-purple-400 hover:text-purple-300">
                                  Click to generate visual content
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 animate-on-scroll" id="use-cases">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Perfect for Every Writer
            </h2>
            <p className="text-xl text-gray-400">
              From students to professionals, doXmind adapts to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`text-center ${isVisible['use-cases'] ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="gradient-border rounded-3xl p-12 hover-glow">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Works Where You Write
                </h2>
                <p className="text-xl text-gray-400 mb-6">
                  Seamlessly integrate doXmind with your favorite tools and platforms. 
                  Write better everywhere with our browser extension, desktop app, and API.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span>Chrome Extension</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileEdit className="w-5 h-5 text-purple-400" />
                    <span>MS Word Plugin</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    <span>Slack Integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <span>API Access</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg font-semibold">Ready to integrate?</p>
                  <p className="text-gray-400 mt-2">Get started in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative ${plan.highlighted ? 'scale-105' : ''} ${
                  isVisible.pricing ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className={`gradient-border rounded-2xl p-8 h-full ${
                  plan.highlighted ? 'hover-glow' : ''
                }`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.highlighted 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}>
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-border rounded-3xl p-12 hover-glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Writing Better Today
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 50,000+ writers who create amazing content with doXmind
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all transform hover:scale-105 inline-flex items-center">
              Try doXmind Free
              <Sparkles className="ml-2 w-5 h-5" />
            </button>
            <p className="mt-4 text-gray-500">No credit card required • 7-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PenTool className="w-6 h-6 text-purple-500" />
                <span className="text-lg font-bold">doXmind</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered writing assistant for the modern creator.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Writing Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 W Aixs Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoXmind; 