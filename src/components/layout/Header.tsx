
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <header className="growbit-header">
      <div className="growbit-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-growbit-primary flex items-center justify-center text-white font-bold">G</span>
          <span className="text-xl font-bold bg-gradient-to-r from-growbit-primary to-growbit-success bg-clip-text text-transparent">
            Growbit
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
