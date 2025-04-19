
import { Layout } from "@/components/Layout";
import { RepoCard } from "@/components/RepoCard";
import { CommitHistory } from "@/components/CommitHistory";
import { BranchList } from "@/components/BranchList";
import { RepositoryStats } from "@/components/RepositoryStats";
import { ActivityGraph } from "@/components/ActivityGraph";
import { 
  repositories,
  commits,
  branches,
  activityData,
  repoStats
} from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const featuredRepo = repositories.find(repo => repo.name === "nexus-flow");
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Repository Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage your repositories
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="lg:col-span-2">
              <ActivityGraph data={activityData} />
            </div>
            <div>
              <RepositoryStats {...repoStats} />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Featured Repository</h2>
                  <Badge>Featured</Badge>
                </div>
                {featuredRepo && <RepoCard {...featuredRepo} />}
              </div>
              
              <div className="mb-6">
                <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
                <CommitHistory commits={commits} />
              </div>
            </div>
            
            <div>
              <BranchList branches={branches} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="repositories">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Repositories</h2>
            <div className="repo-grid">
              {repositories.map((repo) => (
                <RepoCard key={repo.id} {...repo} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold mb-4">Commit Activity</h2>
              <CommitHistory commits={commits} title="All Commits" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Branch Activity</h2>
              <BranchList branches={branches} title="All Branches" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Dashboard Settings</h2>
            <p className="text-muted-foreground mb-6">
              Configure your repository dashboard view and notifications.
            </p>
            <div className="code-block">
              <pre>// Settings will be implemented in future updates</pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
