
import { BarChart, Star, GitFork, GitPullRequestDraft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItemProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatItem({ title, value, icon, description }: StatItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-primary/10 p-2">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

interface RepositoryStatsProps {
  stars: number;
  forks: number;
  pullRequests: number;
  issues: number;
}

export function RepositoryStats({
  stars,
  forks,
  pullRequests,
  issues,
}: RepositoryStatsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <BarChart className="h-4 w-4 text-github-accent" />
          Repository Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatItem
            title="Stars"
            value={stars.toLocaleString()}
            icon={<Star className="h-4 w-4 text-github-warning" />}
          />
          <StatItem
            title="Forks"
            value={forks.toLocaleString()}
            icon={<GitFork className="h-4 w-4 text-github-purple" />}
          />
          <StatItem
            title="Pull Requests"
            value={pullRequests.toLocaleString()}
            icon={<GitPullRequestDraft className="h-4 w-4 text-github-accent" />}
          />
          <StatItem
            title="Issues"
            value={issues.toLocaleString()}
            icon={<AlertCircle className="h-4 w-4 text-github-error" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}
