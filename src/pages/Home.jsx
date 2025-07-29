import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Sparkles, ArrowRight, Check,
  Edit3, BarChart3, Wand2, RefreshCw, Image,
  Type, BookOpen, Target, FileText, Users,
  Brain, Shield, Zap, Package
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { features, solutions, techAdvantages, comparisonData } from '../core/constants';

// Hero Section Component
const HeroSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [demoText, setDemoText] = useState('');
  const fullDemoText = "Transform your ideas into compelling content with AI-powered suggestions...";

  useEffect(() => {
    if (isTyping && demoText.length < fullDemoText.length) {
      const timeout = setTimeout(() => {
        setDemoText(fullDemoText.slice(0, demoText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, demoText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
          <span className="text-white">Transform Every Idea into</span>
          <br />
          <span className="text-gradient">Professional Content</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fadeInUp delay-200">
          AI-powered intelligent document creation platform that helps you analyze data, 
          generate content, and collaborate efficiently—all in one powerful solution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp delay-400">
          <Button 
            variant="primary"
            size="lg"
            onMouseEnter={() => setIsTyping(true)}
            className="group"
          >
            Try It Free
            <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg">
            Watch Demo
          </Button>
        </div>

        {/* Live Demo Editor */}
        <div className="mt-16 animate-fadeInUp delay-500">
          <div className="relative max-w-4xl mx-auto">
            <div className="gradient-border rounded-2xl p-1 hover-glow bg-gray-900">
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500">DocMindLLM Editor</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Type className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-300 text-left">
                        {demoText}
                        <span className="animate-blink">|</span>
                      </p>
                      {isTyping && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-primary">
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
  );
};

// Features Section Component
const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      Edit3: <Edit3 className="w-6 h-6" />,
      BarChart3: <BarChart3 className="w-6 h-6" />,
      Layers: <Layers className="w-6 h-6" />,
      MessageSquare: <MessageSquare className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />
    };
    return icons[iconName] || null;
  };

  return (
    <section id="features-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive AI-Powered Features
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to create, analyze, and collaborate efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`p-6 hover:scale-105 transition-all duration-300 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center mb-4">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{feature.description}</p>
              <p className="text-xs text-primary font-medium">{feature.highlight}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Comparison Section Component
const ComparisonSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Save Time, Increase Efficiency
          </h2>
          <p className="text-xl text-gray-400">
            See how DocMindLLM transforms your workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="gradient-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-400">
              {comparisonData.before.title}
            </h3>
            <p className="text-4xl font-bold mb-6 text-red-400">
              {comparisonData.before.time}
            </p>
            <div className="space-y-3">
              {comparisonData.before.steps.map((step, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400">{step.task}</span>
                  <span className="text-gray-500">{step.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="gradient-border rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative">
              <h3 className="text-2xl font-bold mb-2">
                {comparisonData.after.title}
              </h3>
              <p className="text-4xl font-bold mb-6 text-primary">
                {comparisonData.after.time}
              </p>
              <div className="space-y-3">
                {comparisonData.after.steps.map((step, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {step.task}
                    </span>
                    <span className="text-primary">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Solutions Section Component
const SolutionsSection = () => {
  const getIcon = (iconName) => {
    const icons = {
      Building: <Building className="w-8 h-8" />,
      BookOpen: <BookOpen className="w-8 h-8" />,
      Database: <Database className="w-8 h-8" />,
      PenTool: <PenTool className="w-8 h-8" />
    };
    return icons[iconName] || null;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Solutions for Every Team
          </h2>
          <p className="text-xl text-gray-400">
            Tailored solutions for different industries and use cases
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution) => (
            <Card
              key={solution.id}
              className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {getIcon(solution.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">{solution.title}</h3>
              <p className="text-sm text-gray-400 text-center">{solution.description}</p>
              <div className="mt-4 text-center">
                <a href={solution.href} className="text-primary hover:text-primary-light inline-flex items-center">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Advantages Section Component
const TechAdvantagesSection = () => {
  const getIcon = (iconName) => {
    const icons = {
      Brain: <Brain className="w-6 h-6" />,
      Shield: <Shield className="w-6 h-6" />,
      Zap: <Zap className="w-6 h-6" />,
      Package: <Package className="w-6 h-6" />
    };
    return icons[iconName] || null;
  };

  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built with Advanced Technology
          </h2>
          <p className="text-xl text-gray-400">
            Enterprise-grade infrastructure for reliability and performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techAdvantages.map((advantage) => (
            <div key={advantage.id} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {getIcon(advantage.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
              <p className="text-sm text-gray-400">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="gradient-border rounded-3xl p-12 hover-glow">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of teams already using DocMindLLM to create better content faster
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="group">
              Start Free Trial
              <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg">
              Schedule Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

// Missing imports for icons
import { Layers, MessageSquare, Building, Database, PenTool } from 'lucide-react';

// Main Home Component
const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <SolutionsSection />
      <TechAdvantagesSection />
      <CTASection />
    </Layout>
  );
};

export default Home;