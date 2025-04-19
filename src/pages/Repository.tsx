
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitHubRepo } from '@/hooks/use-github-repo';
import { formatDistanceToNow } from 'date-fns';
import { ActivityGraph } from '@/components/ActivityGraph';
import { BranchList } from '@/components/BranchList';
import { CommitHistory } from '@/components/CommitHistory';
import { RepositoryStats } from '@/components/RepositoryStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowLeft, Code, GitBranch, GitCommit } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Repository = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  
  const { 
    repository, 
    commits, 
    branches, 
    isLoading, 
    isError 
  } = useGitHubRepo({ 
    owner: owner || '', 
    repo: repo || '', 
    enabled: !!owner && !!repo 
  });

  // Transform GitHub API data to match our component props
  const commitHistory = commits?.map(commit => ({
    id: commit.sha,
    sha: commit.sha,
    message: commit.commit.message,
    author: {
      name: commit.author?.login || commit.commit.author.name,
      avatarUrl: commit.author?.avatar_url || 'https://github.com/github.png',
    },
    date: formatDistanceToNow(new Date(commit.commit.author.date), { addSuffix: true })
  }));

  const branchList = branches?.map(branch => ({
    id: branch.name,
    name: branch.name,
    isDefault: branch.name === 'main' || branch.name === 'master',
    lastCommitDate: '2 days ago', // GitHub API doesn't provide this directly
    protected: branch.protected
  }));

  // Mock activity data since the GitHub API doesn't provide this directly
  const activityData = [
    { date: '2024-01', commits: 15, additions: 300, deletions: 100 },
    { date: '2024-02', commits: 20, additions: 450, deletions: 200 },
    { date: '2024-03', commits: 10, additions: 200, deletions: 150 },
    { date: '2024-04', commits: 25, additions: 500, deletions: 100 },
  ];

  if (isError) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center p-8 border rounded-md max-w-md">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Repository not found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find the repository {owner}/{repo}. It may be private or doesn't exist.
            </p>
            <Button asChild>
              <Link to="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 max-w-md" />
            <Skeleton className="h-4 w-full max-w-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ) : (
          repository && (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                      {repository.name}
                    </h1>
                    {repository.private ? (
                      <Badge variant="outline" className="text-xs">Private</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Public</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{repository.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {repository.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full bg-github-accent"></span>
                    <span className="text-sm font-mono">{repository.language}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="font-normal">
                    {repository.stargazers_count.toLocaleString()} stars
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="font-normal">
                    {repository.forks_count.toLocaleString()} forks
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="font-normal">
                    {repository.open_issues_count.toLocaleString()} issues
                  </Badge>
                </div>
              </div>
            </>
          )
        )}
      </div>

      <Tabs defaultValue="code" className="mb-8">
        <TabsList>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-1" /> Code
          </TabsTrigger>
          <TabsTrigger value="commits">
            <GitCommit className="h-4 w-4 mr-1" /> Commits
          </TabsTrigger>
          <TabsTrigger value="branches">
            <GitBranch className="h-4 w-4 mr-1" /> Branches
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <>
                <div className="lg:col-span-2">
                  <Skeleton className="h-[300px]" />
                </div>
                <Skeleton className="h-[300px]" />
              </>
            ) : (
              <>
                <div className="lg:col-span-2">
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted/50 p-3 border-b flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-github-accent" />
                        <span className="font-mono text-sm">README.md</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h1 className="text-xl font-bold mb-2">{repository?.name}</h1>
                      <p className="mb-4">{repository?.description}</p>
                      <h2 className="text-lg font-bold mb-2">About</h2>
                      <p className="mb-4">
                        This repository is maintained by {repository?.owner.login}.
                        It was last updated on {new Date(repository?.updated_at || '').toLocaleDateString()}.
                      </p>
                      <h2 className="text-lg font-bold mb-2">Getting Started</h2>
                      <p className="mb-2">Clone this repository to get started:</p>
                      <pre className="bg-muted p-3 rounded-md mb-4 overflow-x-auto">
                        git clone https://github.com/{owner}/{repo}.git
                      </pre>
                    </div>
                  </div>
                  
                  {commitHistory && commitHistory.length > 0 && (
                    <div className="mt-6">
                      <CommitHistory commits={commitHistory.slice(0, 5)} />
                    </div>
                  )}
                </div>
                
                <div>
                  {repository && (
                    <RepositoryStats
                      stars={repository.stargazers_count}
                      forks={repository.forks_count}
                      pullRequests={0} // GitHub API doesn't provide this directly
                      issues={repository.open_issues_count}
                    />
                  )}
                  
                  {branchList && branchList.length > 0 && (
                    <div className="mt-6">
                      <BranchList branches={branchList.slice(0, 3)} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="commits">
          {isLoading ? (
            <Skeleton className="h-[400px]" />
          ) : commitHistory && commitHistory.length > 0 ? (
            <div className="max-w-3xl">
              <CommitHistory
                commits={commitHistory}
                title={`Recent Commits (${commitHistory.length})`}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">No commits found for this repository.</p>
          )}
        </TabsContent>
        
        <TabsContent value="branches">
          {isLoading ? (
            <Skeleton className="h-[400px]" />
          ) : branchList && branchList.length > 0 ? (
            <div className="max-w-3xl">
              <BranchList
                branches={branchList}
                title={`All Branches (${branchList.length})`}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">No branches found for this repository.</p>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Repository;
