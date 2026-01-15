import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollProgressTruck } from './ui/ScrollProgressTruck';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-stone-50 text-stone-900 overflow-x-hidden selection:bg-amber-100 selection:text-amber-900 relative min-h-screen flex flex-col">
      
      {/* Global Background Textures - Z-Index updated to 40 to overlay content sections */}
      <div className="fixed inset-0 z-40 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 z-40 bg-[url('https://www.transparenttextures.com/patterns/washi.png')] opacity-30 pointer-events-none mix-blend-multiply"></div>
      <div className="fixed inset-0 z-40 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-stone-200' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            {/* Logo */}
            <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-lg group-hover:bg-amber-600 transition-colors">S</div>
              <span className={`font-serif font-bold tracking-tight transition-all text-stone-900 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
                  SaveServe.
              </span>
            </div>

            {/* Menu */}
            <div className="flex items-center gap-4 md:gap-6">
                <button 
                    onClick={() => onNavigate('analytics')}
                    className={`hidden md:block text-xs md:text-sm uppercase tracking-widest font-medium transition-colors border-b-2 ${currentPage === 'analytics' ? 'text-amber-600 border-amber-600' : 'text-stone-500 border-transparent hover:text-stone-900'}`}
                >
                    AI & Analytics
                </button>
                <button 
                    onClick={() => onNavigate('kitchens')}
                    className={`hidden md:block text-xs md:text-sm uppercase tracking-widest font-medium transition-colors border-b-2 ${currentPage === 'kitchens' ? 'text-amber-600 border-amber-600' : 'text-stone-500 border-transparent hover:text-stone-900'}`}
                >
                    Kitchens
                </button>
                <button 
                    onClick={() => onNavigate('ngos')}
                    className={`text-xs md:text-sm uppercase tracking-widest font-medium transition-colors border-b-2 ${currentPage === 'ngos' ? 'text-amber-600 border-amber-600' : 'text-stone-500 border-transparent hover:text-stone-900'}`}
                >
                    NGOs
                </button>
                <button 
                    onClick={() => onNavigate('get-involved')}
                    className={`text-xs md:text-sm uppercase tracking-widest hover:text-stone-900 transition-colors hidden lg:block font-medium border-b-2 pb-0 ${currentPage === 'get-involved' ? 'text-amber-600 border-amber-600' : 'text-stone-500 border-transparent'} ml-4`}
                >
                  Partner With Us
                </button>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Global Scroll Animation */}
      <ScrollProgressTruck />

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-50 border-t border-stone-200 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center text-stone-400 text-sm">
               <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
                   <button onClick={() => onNavigate('home')} className="hover:text-stone-900 transition-colors">Home</button>
                   <button onClick={() => onNavigate('analytics')} className="hover:text-stone-900 transition-colors">AI & Analytics</button>
                   <button onClick={() => onNavigate('kitchens')} className="hover:text-stone-900 transition-colors">Kitchens</button>
                   <button onClick={() => onNavigate('ngos')} className="hover:text-stone-900 transition-colors">NGOs</button>
                   <button onClick={() => onNavigate('get-involved')} className="hover:text-stone-900 transition-colors font-medium text-amber-600">Partner With Us</button>
               </div>
               <span>&copy; 2026 SaveServe Initiative.</span>
            </div>
          </div>
      </footer>
    </div>
  );
};