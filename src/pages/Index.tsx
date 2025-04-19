
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, FileText, Sparkles, Search, GitBranch, Github } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <div className="py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Track and analyze <span className="text-primary">GitHub repositories</span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Search for repositories, analyze code, view statistics, and track development activity with real GitHub data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" />
                Search Repositories
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">
                <GitBranch className="mr-2 h-4 w-4" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">GitHub API Integration</h3>
              <p className="text-muted-foreground">
                Search and explore millions of GitHub repositories with live data.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Repository Analysis</h3>
              <p className="text-muted-foreground">
                View detailed statistics, commit history, and branch information.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-2">Activity Tracking</h3>
              <p className="text-muted-foreground">
                Monitor repository activity with beautiful visualizations and metrics.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-lg mb-4">Ready to explore GitHub repositories?</p>
          <Button size="lg" asChild>
            <Link to="/search">
              <Github className="mr-2 h-4 w-4" />
              Start Searching
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
