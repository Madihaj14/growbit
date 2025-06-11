
import { Link } from "react-router-dom";
import { BarChart3, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const { user, toggleTheme } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">        
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <span className="font-bold text-xl">GrowBit</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/stats">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="gap-2"
            >
              {user.theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {user.theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>
            
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
