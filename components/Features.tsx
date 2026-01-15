import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { ParallaxSection } from './ui/ParallaxSection';
import { BarChart3, Map, Users, ArrowUpRight, TrendingDown } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon, visual, color = "amber", onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`bg-stone-900 border border-stone-800 p-0 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-stone-900/50 transition-all duration-500 group flex flex-col h-full cursor-pointer hover:border-amber-900/50 ${className}`}
  >
    {/* Visual Header (Big Data) */}
    <div className="h-64 bg-stone-950 border-b border-stone-800 relative group-hover:bg-black/50 transition-colors p-6 flex flex-col justify-center">
        {visual}
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
    </div>

    {/* Content */}
    <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6 flex items-center justify-between">
            <div className={`p-3 rounded-full bg-stone-800 text-stone-300 group-hover:bg-amber-900/30 group-hover:text-amber-500 transition-colors`}>
                {icon}
            </div>
            <ArrowUpRight className="text-stone-600 group-hover:text-stone-200 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{title}</h3>
        <p className="text-stone-400 font-normal leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

/* --- DATA VISUALIZATIONS --- */

const AdminDashboardVisual = () => (
  <div className="w-full flex items-end justify-between gap-2 h-full px-4 pt-8">
     {/* Bar Chart */}
     <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-end gap-2 w-full h-32">
            {[30, 55, 45, 70, 60, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-stone-800 rounded-t relative group-hover:bg-stone-700 transition-colors overflow-hidden">
                    <div style={{ height: `${h}%` }} className={`absolute bottom-0 w-full bg-stone-600 group-hover:bg-amber-500 transition-all duration-1000 ease-out delay-${i * 100}`}></div>
                </div>
            ))}
        </div>
        <div className="flex justify-between w-full text-[10px] text-stone-600 uppercase tracking-wider font-bold">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
     </div>
     
     {/* Floating Badge */}
     <div className="absolute top-6 right-6 bg-stone-800 shadow-lg border border-stone-700 py-2 px-4 rounded-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs font-bold text-stone-300">Live Feed</span>
     </div>
  </div>
);

const NetworkMapVisual = () => (
    <div className="w-full h-full relative">
        {/* Map Grid Background */}
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Routes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 50 150 Q 150 50 250 100" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
            <path d="M 250 100 Q 300 180 100 200" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Nodes */}
        <div className="absolute top-[150px] left-[50px] transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <div className="w-4 h-4 bg-stone-700 rounded-full border-2 border-stone-500 shadow-lg"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-stone-800 text-stone-300 text-[10px] px-2 py-1 rounded whitespace-nowrap font-bold border border-stone-700">Mess Hall A</div>
            </div>
        </div>

        <div className="absolute top-[100px] left-[250px] transform -translate-x-1/2 -translate-y-1/2">
             <div className="relative">
                <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-900/80 text-amber-500 text-[10px] px-2 py-1 rounded whitespace-nowrap font-bold border border-amber-500/30">NGO Pickup</div>
            </div>
        </div>
    </div>
);

const PredictionVisual = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
            <div className="text-6xl font-serif font-bold text-white mb-2 tracking-tighter">-18%</div>
            <div className="flex items-center justify-center gap-2 text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full text-xs border border-green-800">
                <TrendingDown size={14} />
                <span>Waste Reduced</span>
            </div>
        </div>
        <div className="mt-6 w-full max-w-[200px] space-y-2">
            <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>Planned</span>
                <span>Actual</span>
            </div>
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-stone-600 w-[80%]"></div>
            </div>
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 w-[62%]"></div>
            </div>
        </div>
    </div>
);

interface FeaturesProps {
  onNavigate?: (page: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  return (
    <ParallaxSection className="py-32 px-6 bg-stone-50 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-20 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-semibold text-stone-900 mb-6">
                Data made <span className="font-serif italic text-amber-600 font-medium">visible.</span>
            </h2>
            <p className="text-stone-500 text-lg font-normal leading-relaxed">
              SaveServe unites the entire ecosystem under one intelligent roof, providing real-time visibility into waste, impact, and logistics.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          <FadeIn delay={100}>
            <FeatureCard 
              title="Admin & Mess Analytics"
              desc="View live analytics on food waste reduction. Visualize the exact amount of kg saved vs. meals served."
              icon={<BarChart3 />}
              visual={<AdminDashboardVisual />}
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate?.('analytics');
              }}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <FeatureCard 
              title="Smart Routing"
              desc="Real-time geo-location matching. Our algorithm finds the closest NGO and calculates the fastest path."
              icon={<Map />}
              visual={<NetworkMapVisual />}
              color="blue"
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate?.('ngos');
              }}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <FeatureCard 
              title="Predictive Procurement"
              desc="Daily cooking recommendations based on AI. We tell vendors exactly how much to buy."
              icon={<Users />}
              visual={<PredictionVisual />}
              color="green"
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate?.('kitchens');
              }}
            />
          </FadeIn>
        </div>
      </div>
    </ParallaxSection>
  );
};