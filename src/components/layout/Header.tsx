
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">        
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Link to="/" className="font-bold text-xl">
              GrowBit
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/stats">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </Button>
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
