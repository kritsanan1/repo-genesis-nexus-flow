
import { GitBranch, Github, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <a href="/" className="flex items-center gap-2 hover:text-github-accent transition-colors">
            <Github className="h-6 w-6 text-github-accent" />
            <span className="text-xl">Repo Genesis</span>
          </a>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search repositories..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <GitBranch className="h-4 w-4" />
            <span className="sr-only">Branches</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
