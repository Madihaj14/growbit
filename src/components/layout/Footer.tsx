
import { Heart, Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="growbit-footer">
      <div className="growbit-container">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center text-growbit-text-secondary">
            Made with{" "}
            <Heart className="mx-1 text-red-500" size={16} fill="currentColor" />{" "}
            by Madiha
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Madihaj14" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-growbit-text-secondary hover:text-growbit-text-primary transition-colors"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/madiha-khan14/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-growbit-text-secondary hover:text-growbit-text-primary transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-growbit-text-secondary hover:text-growbit-text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </a>
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
