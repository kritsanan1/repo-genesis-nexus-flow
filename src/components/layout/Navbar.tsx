
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl">
            Repo Genesis
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link to="/library" className="text-sm font-medium hover:text-primary">
              Library
            </Link>
            <Link to="/search" className="text-sm font-medium hover:text-primary">
              Search
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </div>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link to="/search">
            <Search className="h-4 w-4 mr-2" />
            Search Repos
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
