
import { Layout } from "@/components/Layout";
import { CommitHistory } from "@/components/CommitHistory";
import { BranchList } from "@/components/BranchList";
import { ActivityGraph } from "@/components/ActivityGraph";
import { RepositoryStats } from "@/components/RepositoryStats";
import { repositories, commits, branches, activityData, repoStats } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  GitFork, 
  Eye, 
  AlertCircle, 
  Code, 
  FileCode,
  Download,
  GitBranch
} from "lucide-react";

export default function RepoDetails() {
  // In a real app, we'd use useParams to get the repo name from the URL
  const repoName = "nexus-flow";
  const repo = repositories.find((r) => r.name === repoName) || repositories[0];

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{repo.name}</h1>
              {repo.isPrivate ? (
                <Badge variant="outline" className="text-xs">Private</Badge>
              ) : (
                <Badge variant="outline" className="text-xs">Public</Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{repo.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex items-center gap-1.5">
                <span 
                  className="inline-block h-3 w-3 rounded-full" 
                  style={{ backgroundColor: repo.languageColor }}
                ></span>
                <span className="text-sm font-mono">{repo.language}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span className="text-sm">{repo.stars.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span className="text-sm">{repo.forks.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{repo.watchers.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{repo.issues.toLocaleString()} issues</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Star className="h-4 w-4" />
              Star
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <GitFork className="h-4 w-4" />
              Fork
            </Button>
            <Button variant="secondary" size="sm" className="gap-1">
              <GitBranch className="h-4 w-4" />
              <span className="font-mono">main</span>
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Clone
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="code" className="mb-8">
        <TabsList>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-1" /> Code
          </TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted/50 p-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-github-accent" />
                    <span className="font-mono text-sm">README.md</span>
                  </div>
                </div>
                <div className="p-4 code-block">
                  <h1 className="text-xl font-bold mb-2">{repo.name}</h1>
                  <p className="mb-4">{repo.description}</p>
                  <h2 className="text-lg font-bold mb-2">Features</h2>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Repository visualization and tracking</li>
                    <li>Commit history analysis</li>
                    <li>Branch management</li>
                    <li>Activity monitoring</li>
                  </ul>
                  <h2 className="text-lg font-bold mb-2">Getting Started</h2>
                  <p className="mb-2">Clone this repository to get started:</p>
                  <pre className="bg-github-light text-github-text p-3 rounded-md mb-4">
                    git clone https://github.com/{repo.owner}/{repo.name}.git
                  </pre>
                </div>
              </div>
              
              <div className="mt-6">
                <CommitHistory commits={commits.slice(0, 3)} />
              </div>
            </div>
            
            <div>
              <BranchList branches={branches.slice(0, 3)} />
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <div className="border rounded-md p-4 space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Repository</div>
                    <div>{repo.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div>{repo.owner}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Created</div>
                    <div>April 15, 2023</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Last Updated</div>
                    <div>{repo.updatedAt}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ActivityGraph data={activityData} />
            </div>
            <div>
              <RepositoryStats {...repoStats} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="branches">
          <div className="max-w-3xl">
            <BranchList branches={branches} title={`All Branches (${branches.length})`} />
          </div>
        </TabsContent>
        
        <TabsContent value="contributors">
          <div className="max-w-3xl">
            <div className="border rounded-md p-4">
              <p className="text-muted-foreground">
                Contributors information will be implemented in a future update.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
