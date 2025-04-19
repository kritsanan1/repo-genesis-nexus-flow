
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchRepositories } from '@/services/github';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RepoCard } from '@/components/RepoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { Search as SearchIcon, AlertCircle } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const ITEMS_PER_PAGE = 5;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['github', 'search', query, currentPage, ITEMS_PER_PAGE],
    queryFn: () => searchRepositories(query, currentPage, ITEMS_PER_PAGE),
    enabled: !!query,
    retry: 1,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Search term is required",
        description: "Please enter a repository name to search",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentPage(1);
    setQuery(searchTerm.trim());
  };
  
  const totalPages = data ? Math.ceil(Math.min(data.total_count, 1000) / ITEMS_PER_PAGE) : 0;
  
  return (
    <AppLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Search GitHub Repositories</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit" disabled={isLoading}>
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
        
        {isError && (
          <div className="flex items-center p-4 mb-4 bg-destructive/10 text-destructive rounded-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Error: {error instanceof Error ? error.message : 'Failed to search repositories'}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border p-4 rounded-md">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))
          ) : data?.items?.length ? (
            <>
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, data.total_count)} of {data.total_count.toLocaleString()} repositories
              </p>
              
              {data.items.map((repo) => (
                <div key={repo.id} className="border p-4 rounded-md">
                  <RepoCard
                    name={repo.name}
                    owner={repo.owner.login}
                    description={repo.description || ''}
                    language={repo.language || 'Unknown'}
                    stars={repo.stargazers_count}
                    forks={repo.forks_count}
                    watchers={repo.watchers_count}
                    issues={repo.open_issues_count}
                    updatedAt={new Date(repo.updated_at).toLocaleDateString()}
                    isPrivate={repo.private}
                  />
                </div>
              ))}
              
              {totalPages > 1 && (
                <Pagination
                  className="mt-6"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : query && !isLoading ? (
            <p>No repositories found matching '{query}'</p>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
