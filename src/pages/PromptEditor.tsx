import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Star, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import CodePreview from '@/components/prompts/CodePreview';

const PromptEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewPrompt = id === 'new';
  
  const [prompt, setPrompt] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    tags: '',
    isFavorite: false,
  });

  const [previewCode, setPreviewCode] = useState(`// Generated documentation will appear here`);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setPrompt(prev => ({ ...prev, category: value }));
  };

  const toggleFavorite = () => {
    setPrompt(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert([{
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          category: prompt.category,
          tags: prompt.tags.split(',').map(tag => tag.trim()),
          is_favorite: prompt.isFavorite,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prompt saved successfully",
      });

      navigate('/library');
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast({
        title: "Error",
        description: "Failed to save prompt",
        variant: "destructive",
      });
    }
  };

  const generatePreview = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { prompt: prompt.content, category: prompt.category },
      });

      if (error) throw error;

      setPreviewCode(data.content);
      toast({
        title: "Preview Generated",
        description: "AI-generated preview is ready",
      });
    } catch (error) {
      console.error('Error generating preview:', error);
      toast({
        title: "Error",
        description: "Failed to generate preview",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isNewPrompt ? 'Create New Prompt' : 'Edit Prompt'}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="title">Prompt Title</Label>
                  <div className="flex items-center">
                    <Switch 
                      checked={prompt.isFavorite} 
                      onCheckedChange={toggleFavorite} 
                      id="favorite"
                    />
                    <Label htmlFor="favorite" className="ml-2 cursor-pointer">
                      <Star className={`h-4 w-4 ${prompt.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                    </Label>
                  </div>
                </div>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Enter prompt title" 
                  value={prompt.title}
                  onChange={handleChange}
                />
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Briefly describe what this prompt does" 
                    value={prompt.description}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={prompt.category} onValueChange={handleSelectChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags" 
                    name="tags"
                    placeholder="api, documentation, generator" 
                    value={prompt.tags}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div>
                <Label htmlFor="content">Prompt Content</Label>
                <Textarea 
                  id="content" 
                  name="content"
                  placeholder="Write your prompt here..." 
                  className="min-h-[200px]"
                  value={prompt.content}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/library')}>Cancel</Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={generatePreview} disabled={isGenerating || !prompt.content}>
                {isGenerating ? "Generating..." : "Preview"}
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Prompt
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="preview">
            <TabsList className="w-full">
              <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Advanced Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <CodePreview code={previewCode} />
                </CardContent>
              </Card>
              <p className="text-xs text-muted-foreground mt-2">
                Preview shows example output. Connect to Supabase to enable AI-powered generation.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Advanced settings will be available after connecting to Supabase.
                    </p>
                    <div className="opacity-50 pointer-events-none">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="model">AI Model</Label>
                          <Select disabled>
                            <SelectTrigger id="model">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt4">GPT-4</SelectItem>
                              <SelectItem value="gpt3">GPT-3.5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="temperature">Temperature</Label>
                          <Input id="temperature" type="range" disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default PromptEditor;
