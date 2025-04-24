
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "Dashboard", path: "/" },
    { title: "Habits", path: "/habits" },
    { title: "Leaderboard", path: "/leaderboard" },
    { title: "Profile", path: "/profile" }
  ];

  return (
    <header className="growbit-header">
      <div className="growbit-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-growbit-primary flex items-center justify-center text-white font-bold">G</span>
          <span className="text-xl font-bold bg-gradient-to-r from-growbit-primary to-growbit-success bg-clip-text text-transparent">
            Growbit
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-growbit-text-primary hover:text-growbit-primary transition-colors relative group"
            >
              {item.title}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-growbit-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-growbit-text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-scale-fade-in">
          <nav className="growbit-container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-2 py-3 text-growbit-text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
