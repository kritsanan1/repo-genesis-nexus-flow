
import { useState } from "react";
import { GitCommit } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Commit {
  id: string;
  message: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  sha: string;
}

interface CommitHistoryProps {
  commits: Commit[];
  title?: string;
}

export function CommitHistory({ 
  commits, 
  title = "Recent Commits" 
}: CommitHistoryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-github-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0.5">
        {commits.map((commit) => (
          <div key={commit.id} className="commit-item">
            <div className="relative">
              <Avatar className="h-7 w-7 border">
                <img
                  src={commit.author.avatarUrl}
                  alt={commit.author.name}
                />
              </Avatar>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-background bg-github-accent text-white">
                <GitCommit className="h-2.5 w-2.5" />
              </span>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{commit.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{commit.author.name}</span>
                <span>•</span>
                <span className="font-mono">{commit.sha.substring(0, 7)}</span>
                <span>•</span>
                <span>{commit.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
