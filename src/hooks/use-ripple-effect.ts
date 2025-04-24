
import { useCallback } from 'react';

export const useRippleEffect = () => {
  const createRipple = useCallback((x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full bg-white/10 animate-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    
    const container = document.getElementById('ripple-container');
    if (container) {
      container.appendChild(ripple);
      
      // Remove the ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 2000);
    }
  }, []);

  return { createRipple };
};
