import React, { useEffect, useState } from 'react';
import { Truck, Store } from 'lucide-react';

export const ScrollProgressTruck: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const maxScroll = documentHeight - windowHeight;
      const percentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      setScrollPercentage(Math.min(Math.max(percentage, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 z-50 pointer-events-none px-4 md:px-8">
      {/* Road/Track Line */}
      <div className="absolute bottom-3 left-4 right-4 h-[1px] border-b border-dashed border-stone-400/30"></div>

      <div className="relative w-full h-full max-w-[100%] mx-auto">
        
        {/* Moving Truck Icon */}
        <div 
            className="absolute bottom-3 -ml-3 transition-all duration-75 ease-out text-stone-600 bg-stone-50 rounded-full p-1"
            style={{ 
                // Move from left (0%) to right (approx 100% minus space for destination)
                // We subtract 40px to stop right before the building
                left: `calc(${scrollPercentage} * (100% - 50px))` 
            }}
        >
             {/* Removed the transform flip to make it face the other way */}
             <div className="">
                <Truck size={24} strokeWidth={1.5} />
             </div>
        </div>

        {/* Destination NGO/Shop Icon */}
        <div className="absolute bottom-3 right-0 text-amber-600 bg-stone-50 pl-1">
            <Store size={24} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};