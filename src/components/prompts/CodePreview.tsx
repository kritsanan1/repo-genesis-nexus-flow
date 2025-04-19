
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <div className="relative">
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute top-2 right-2 h-8 w-8"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy code</span>
      </Button>
      <pre className="code-block overflow-auto max-h-[500px]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodePreview;
