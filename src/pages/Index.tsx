
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, FileText, Sparkles } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <div className="py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Manage and generate prompts for <span className="text-primary">code documentation</span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Create, organize, and leverage AI prompts to generate high-quality code documentation efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/library">Browse Library</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Prompt Management</h3>
              <p className="text-muted-foreground">
                Organize and categorize your prompts for easy retrieval and reuse.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Code Documentation</h3>
              <p className="text-muted-foreground">
                Generate comprehensive documentation for your codebase with specialized prompts.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Leverage AI to improve and optimize your prompts for better results.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-lg mb-4">Ready to streamline your documentation workflow?</p>
          <Button size="lg" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
