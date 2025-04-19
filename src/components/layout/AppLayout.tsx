
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} PromptWeaver. All rights reserved.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default AppLayout;
