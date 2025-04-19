
import { useQuery } from '@tanstack/react-query';
import { 
  fetchRepository, 
  fetchCommits, 
  fetchBranches, 
  GitHubRepository,
  GitHubCommit,
  GitHubBranch
} from '@/services/github';

export interface UseGitHubRepoOptions {
  owner: string;
  repo: string;
  enabled?: boolean;
}

export const useGitHubRepo = ({ owner, repo, enabled = true }: UseGitHubRepoOptions) => {
  const repoQuery = useQuery({
    queryKey: ['github', 'repo', owner, repo],
    queryFn: () => fetchRepository(owner, repo),
    enabled,
  });

  const commitsQuery = useQuery({
    queryKey: ['github', 'commits', owner, repo],
    queryFn: () => fetchCommits(owner, repo),
    enabled: enabled && !!repoQuery.data,
  });

  const branchesQuery = useQuery({
    queryKey: ['github', 'branches', owner, repo],
    queryFn: () => fetchBranches(owner, repo),
    enabled: enabled && !!repoQuery.data,
  });

  return {
    repository: repoQuery.data as GitHubRepository | undefined,
    commits: commitsQuery.data as GitHubCommit[] | undefined,
    branches: branchesQuery.data as GitHubBranch[] | undefined,
    isLoading: repoQuery.isLoading || commitsQuery.isLoading || branchesQuery.isLoading,
    isError: repoQuery.isError || commitsQuery.isError || branchesQuery.isError,
    error: repoQuery.error || commitsQuery.error || branchesQuery.error,
  };
};
