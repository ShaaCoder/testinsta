'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { 
  Instagram, 
  BarChart3, 
  Calendar, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export function LandingPage() {
  const { loginWithInstagram } = useAuth();

  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into your Instagram performance with real-time metrics and custom reports.',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Schedule posts with optimal timing suggestions and timezone support.',
    },
    {
      icon: Zap,
      title: 'Automation Engine',
      description: 'Automated engagement with safety limits and intelligent targeting.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with rate limiting and secure token management.',
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Collaborative tools for teams with role-based permissions.',
    },
  ];

  const benefits = [
    'Save 10+ hours weekly on social media management',
    'Increase engagement rates by up to 300%',
    'Never miss optimal posting times',
    'Automate repetitive tasks safely',
    'Scale your Instagram presence efficiently',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg instagram-gradient flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold instagram-gradient-text">
              InstagramPro
            </span>
          </div>
          <Button variant="outline" onClick={loginWithInstagram}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Professional{' '}
            <span className="instagram-gradient-text">Instagram</span>
            <br />
            Automation Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scale your Instagram presence with intelligent automation, 
            comprehensive analytics, and professional-grade tools trusted by thousands of creators and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={loginWithInstagram}
              className="instagram-gradient text-white hover:opacity-90 transition-opacity"
            >
              Connect Instagram Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="instagram-gradient-text">Dominate Instagram</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From automated posting to deep analytics, our platform provides all the tools 
            you need to grow your Instagram presence professionally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-8 text-center hover:bg-card/70 transition-all duration-300">
              <div className="w-16 h-16 rounded-full instagram-gradient mx-auto mb-6 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Why Choose{' '}
              <span className="instagram-gradient-text">InstagramPro</span>?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
            <Button 
              size="lg" 
              className="mt-8 instagram-gradient text-white hover:opacity-90 transition-opacity"
              onClick={loginWithInstagram}
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 instagram-gradient rounded-3xl blur-3xl opacity-20"></div>
            <Card className="glass-card p-8 relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="text-2xl font-bold text-green-500">+47.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Engagement Rate</span>
                  <span className="text-2xl font-bold text-blue-500">8.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts This Month</span>
                  <span className="text-2xl font-bold text-purple-500">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time Saved</span>
                  <span className="text-2xl font-bold text-orange-500">15h/week</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-card p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your{' '}
            <span className="instagram-gradient-text">Instagram Strategy</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful creators and businesses who trust InstagramPro 
            to automate and optimize their social media presence.
          </p>
          <Button 
            size="lg" 
            onClick={loginWithInstagram}
            className="instagram-gradient text-white hover:opacity-90 transition-opacity"
          >
            Connect Your Instagram Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 InstagramPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}