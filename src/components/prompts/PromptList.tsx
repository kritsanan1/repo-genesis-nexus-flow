
import { useState, useCallback } from 'react';
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription';
import { toast } from '@/components/ui/use-toast';
import PromptCard from './PromptCard';
import type { Tables } from '@/integrations/supabase/types';

type Prompt = Tables<'prompts'>;

export function PromptList({ initialPrompts }: { initialPrompts: Prompt[] }) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

  const handleInsert = useCallback((payload: { new: Prompt }) => {
    setPrompts(current => [...current, payload.new]);
    toast({
      title: "เพิ่มข้อมูลใหม่",
      description: `เพิ่ม "${payload.new.title}" เรียบร้อยแล้ว`,
    });
  }, []);

  const handleUpdate = useCallback((payload: { old: Prompt; new: Prompt }) => {
    setPrompts(current =>
      current.map(prompt =>
        prompt.id === payload.new.id ? payload.new : prompt
      )
    );
    toast({
      title: "อัพเดตข้อมูล",
      description: `อัพเดต "${payload.new.title}" เรียบร้อยแล้ว`,
    });
  }, []);

  const handleDelete = useCallback((payload: { old: Prompt }) => {
    setPrompts(current =>
      current.filter(prompt => prompt.id !== payload.old.id)
    );
    toast({
      title: "ลบข้อมูล",
      description: `ลบ "${payload.old.title}" เรียบร้อยแล้ว`,
    });
  }, []);

  useRealtimeSubscription({
    table: 'prompts',
    onInsert: handleInsert,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
