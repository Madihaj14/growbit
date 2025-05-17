
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="growbit-footer">
      <div className="growbit-container">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center text-growbit-text-primary">
            Made with{" "}
            <Heart className="mx-1 text-red-500 animate-pulse-glow" size={16} fill="currentColor" />{" "}
            by Madiha
          </div>
          <div className="text-sm text-growbit-text-secondary">
            © {new Date().getFullYear()} Growbit. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
