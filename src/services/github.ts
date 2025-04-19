
import { useState } from 'react';

// GitHub API base URL
const GITHUB_API_BASE_URL = 'https://api.github.com';

// Types for GitHub API responses
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
  private: boolean;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    }
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

export interface GitHubBranch {
  name: string;
  protected: boolean;
  commit: {
    sha: string;
    url: string;
  };
}

// Function to fetch a repository by owner and repo name
export const fetchRepository = async (owner: string, repo: string): Promise<GitHubRepository> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.statusText}`);
  }
  
  return response.json();
};

// Function to fetch commits for a repository
export const fetchCommits = async (owner: string, repo: string, page = 1, perPage = 10): Promise<GitHubCommit[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/commits?page=${page}&per_page=${perPage}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.statusText}`);
  }
  
  return response.json();
};

// Function to fetch branches for a repository
export const fetchBranches = async (owner: string, repo: string): Promise<GitHubBranch[]> => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/branches`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch branches: ${response.statusText}`);
  }
  
  return response.json();
};

// Function to search repositories
export const searchRepositories = async (query: string, page = 1, perPage = 10): Promise<{
  items: GitHubRepository[];
  total_count: number;
}> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to search repositories: ${response.statusText}`);
  }
  
  return response.json();
};

// Custom hook for fetching repository data
export const useRepository = (owner: string, repoName: string) => {
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRepositoryData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const repoData = await fetchRepository(owner, repoName);
      setRepository(repoData);
      
      const [commitsData, branchesData] = await Promise.all([
        fetchCommits(owner, repoName),
        fetchBranches(owner, repoName)
      ]);
      
      setCommits(commitsData);
      setBranches(branchesData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    repository,
    commits,
    branches,
    isLoading,
    error,
    fetchRepositoryData
  };
};
