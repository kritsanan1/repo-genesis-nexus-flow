
import { Star, GitFork, Eye, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface RepoCardProps {
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  updatedAt: string;
  isPrivate?: boolean;
  languageColor?: string;
}

export function RepoCard({
  name,
  owner,
  description,
  language,
  stars,
  forks,
  watchers,
  issues,
  updatedAt,
  isPrivate = false,
  languageColor = "#f1e05a" // Default to JavaScript yellow
}: RepoCardProps) {
  return (
    <div className="repo-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold hover:text-github-accent transition-colors">
            <a href={`/repo/${name}`} className="hover:underline">
              {name}
            </a>
          </h3>
          {isPrivate ? (
            <Badge variant="outline" className="text-xs">Private</Badge>
          ) : null}
        </div>
        <div className="text-sm text-muted-foreground">
          {owner}
        </div>
      </div>
      
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {description || "No description provided"}
      </p>
      
      <div className="mt-3 flex flex-wrap gap-3">
        {language && (
          <div className="flex items-center gap-1.5">
            <span 
              className="inline-block h-3 w-3 rounded-full" 
              style={{ backgroundColor: languageColor }}
            ></span>
            <span className="text-xs font-mono">{language}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          <span className="text-xs">{stars.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          <span className="text-xs">{forks.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          <span className="text-xs">{watchers.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span className="text-xs">{issues.toLocaleString()}</span>
        </div>
      </div>

      <Progress className="mt-4 h-1" value={75} />
      
      <div className="mt-3 flex items-center text-xs text-muted-foreground">
        <Clock className="mr-1 h-3 w-3" /> Updated {updatedAt}
      </div>
    </div>
  );
}
