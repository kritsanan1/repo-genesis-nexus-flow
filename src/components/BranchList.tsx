
import { GitBranch, GitMerge, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Branch {
  id: string;
  name: string;
  isDefault: boolean;
  lastCommitDate: string;
  protected: boolean;
}

interface BranchListProps {
  branches: Branch[];
  title?: string;
}

export function BranchList({ branches, title = "Branches" }: BranchListProps) {
  const defaultBranch = branches.find((branch) => branch.isDefault);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-github-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0.5">
        {defaultBranch && (
          <>
            <div className="branch-item">
              <div className="mr-2">
                <GitBranch className="h-4 w-4 text-github-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{defaultBranch.name}</span>
                  <Badge variant="outline" className="h-5 px-1.5 text-xs">default</Badge>
                  {defaultBranch.protected && (
                    <span className="flex items-center text-xs text-github-success">
                      <Check className="mr-0.5 h-3 w-3" />
                      protected
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{defaultBranch.lastCommitDate}</div>
            </div>
            <div className="my-2">
              <Separator />
            </div>
          </>
        )}

        {branches
          .filter((branch) => !branch.isDefault)
          .map((branch) => (
            <div key={branch.id} className="branch-item">
              <div className="mr-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{branch.name}</span>
                  {branch.protected && (
                    <span className="flex items-center text-xs text-github-success">
                      <Check className="mr-0.5 h-3 w-3" />
                      protected
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{branch.lastCommitDate}</div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
