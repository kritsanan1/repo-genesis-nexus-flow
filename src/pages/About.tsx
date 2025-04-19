
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Github, MessageCircle, Users } from 'lucide-react';

const About = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About PromptWeaver</h1>
        
        <div className="mb-8">
          <p className="text-lg mb-4">
            PromptWeaver is a tool designed to help developers manage and create prompts for generating code documentation.
            By leveraging AI, we aim to make documentation easier, more consistent, and more maintainable.
          </p>
          <p className="mb-4">
            This project is built with React, TypeScript, and Tailwind CSS on the frontend, with Supabase providing backend functionality.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <CardTitle>Create Prompts</CardTitle>
              </div>
              <CardDescription>
                Design and save prompts tailored to different documentation needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create specialized prompts for different parts of your codebase - API endpoints, 
                database schemas, React components, or anything else that needs documentation.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <CardTitle>Connect Code</CardTitle>
              </div>
              <CardDescription>
                Input your code or connect to your codebase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                After creating your prompts, connect them to your code either by direct input or through integration with your version control.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <CardTitle>Generate Documentation</CardTitle>
              </div>
              <CardDescription>
                Let AI do the heavy lifting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Use your prompts to generate documentation that follows your team's standards 
                and best practices, automatically maintaining consistency across your project.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="border rounded-lg p-6 bg-muted/30 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Supabase Integration</h2>
          <p className="mb-4">
            To unlock the full potential of PromptWeaver, connect to Supabase to enable:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>User authentication and team collaboration</li>
            <li>Prompt storage and version control</li>
            <li>AI model integration for documentation generation</li>
            <li>Sharing and permissions management</li>
          </ul>
          <Button variant="outline">Connect to Supabase</Button>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
          <Button variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Feedback</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Community</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
