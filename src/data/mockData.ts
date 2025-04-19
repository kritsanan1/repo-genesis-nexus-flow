
// Mock data for the repository dashboard

export const repositories = [
  {
    id: "1",
    name: "react",
    owner: "facebook",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 204583,
    forks: 42691,
    watchers: 6749,
    issues: 1082,
    updatedAt: "2 days ago",
    isPrivate: false
  },
  {
    id: "2",
    name: "typescript",
    owner: "microsoft",
    description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
    language: "TypeScript",
    languageColor: "#2b7489",
    stars: 85421,
    forks: 11249,
    watchers: 2143,
    issues: 6421,
    updatedAt: "5 hours ago",
    isPrivate: false
  },
  {
    id: "3",
    name: "vscode",
    owner: "microsoft",
    description: "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web applications.",
    language: "TypeScript",
    languageColor: "#2b7489",
    stars: 143987,
    forks: 25839,
    watchers: 3142,
    issues: 7462,
    updatedAt: "1 day ago",
    isPrivate: false
  },
  {
    id: "4",
    name: "TailwindCSS",
    owner: "tailwindlabs",
    description: "A utility-first CSS framework for rapid UI development.",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 68423,
    forks: 3485,
    watchers: 1042,
    issues: 241,
    updatedAt: "3 days ago",
    isPrivate: false
  },
  {
    id: "5",
    name: "next.js",
    owner: "vercel",
    description: "The React Framework for Production.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 105284,
    forks: 24851,
    watchers: 2048,
    issues: 1982,
    updatedAt: "12 hours ago",
    isPrivate: false
  },
  {
    id: "6",
    name: "nexus-flow",
    owner: "your-company",
    description: "Internal tool for repository management and workflow optimization.",
    language: "TypeScript",
    languageColor: "#2b7489",
    stars: 42,
    forks: 5,
    watchers: 8,
    issues: 12,
    updatedAt: "1 hour ago",
    isPrivate: true
  }
];

export const commits = [
  {
    id: "c1",
    message: "Fix memory leak in data rendering component",
    author: {
      name: "Sarah Chen",
      avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Chen&background=random"
    },
    date: "2 hours ago",
    sha: "8f81a47c229e24a5e4c"
  },
  {
    id: "c2",
    message: "Update dependencies and security patches",
    author: {
      name: "Alex Johnson",
      avatarUrl: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
    },
    date: "5 hours ago",
    sha: "6d71fe32aa9e5ba419c"
  },
  {
    id: "c3",
    message: "Add unit tests for authentication flow",
    author: {
      name: "Dani Kareem",
      avatarUrl: "https://ui-avatars.com/api/?name=Dani+Kareem&background=random"
    },
    date: "yesterday",
    sha: "2c4a83076dce641f852"
  },
  {
    id: "c4",
    message: "Refactor API client for better error handling",
    author: {
      name: "Taylor Moore",
      avatarUrl: "https://ui-avatars.com/api/?name=Taylor+Moore&background=random"
    },
    date: "2 days ago",
    sha: "9f51ae720b6e83a42d1"
  },
  {
    id: "c5",
    message: "Implement new dashboard layout and navigation",
    author: {
      name: "Jamie Watson",
      avatarUrl: "https://ui-avatars.com/api/?name=Jamie+Watson&background=random"
    },
    date: "3 days ago",
    sha: "3e7a12c96f4582bc90f"
  }
];

export const branches = [
  {
    id: "b1",
    name: "main",
    isDefault: true,
    lastCommitDate: "2 hours ago",
    protected: true
  },
  {
    id: "b2",
    name: "develop",
    isDefault: false,
    lastCommitDate: "12 hours ago",
    protected: true
  },
  {
    id: "b3",
    name: "feature/authentication",
    isDefault: false,
    lastCommitDate: "1 day ago",
    protected: false
  },
  {
    id: "b4",
    name: "feature/dashboard",
    isDefault: false,
    lastCommitDate: "5 days ago",
    protected: false
  },
  {
    id: "b5",
    name: "bugfix/memory-leak",
    isDefault: false,
    lastCommitDate: "2 hours ago",
    protected: false
  }
];

export const activityData = [
  { date: "Jan", commits: 120, additions: 4500, deletions: 2300 },
  { date: "Feb", commits: 150, additions: 6700, deletions: 3400 },
  { date: "Mar", commits: 90, additions: 3200, deletions: 1800 },
  { date: "Apr", commits: 180, additions: 7900, deletions: 4100 },
  { date: "May", commits: 250, additions: 9800, deletions: 5600 },
  { date: "Jun", commits: 280, additions: 11200, deletions: 6200 },
  { date: "Jul", commits: 190, additions: 8300, deletions: 4700 },
  { date: "Aug", commits: 220, additions: 9100, deletions: 5200 },
  { date: "Sep", commits: 270, additions: 10700, deletions: 6100 },
  { date: "Oct", commits: 230, additions: 9500, deletions: 5300 },
  { date: "Nov", commits: 310, additions: 12300, deletions: 6800 },
  { date: "Dec", commits: 150, additions: 6200, deletions: 3100 }
];

export const repoStats = {
  stars: 2483,
  forks: 562,
  pullRequests: 128,
  issues: 47
};
