
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreVertical, Star, Trash2 } from 'lucide-react';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    category: string;
    createdAt: string;
    favorite: boolean;
  };
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const formattedDate = new Date(prompt.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="prompt-card">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{prompt.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{prompt.category}</Badge>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center">
            {prompt.favorite && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-2" />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  <span>{prompt.favorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          A prompt for generating detailed documentation for {prompt.title.toLowerCase()}.
        </p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/editor/${prompt.id}`}>Edit</Link>
          </Button>
          <Button size="sm">Use Prompt</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
