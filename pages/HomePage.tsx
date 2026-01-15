import React from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { ProcessFlow } from '../components/ProcessFlow';
import { ProblemData } from '../components/ProblemData';
import { Features } from '../components/Features';
import { ChevronDown, ArrowRight, Utensils, ArrowUpRight } from 'lucide-react';

/* --- IMPACT METRICS COMPONENT --- */
const ImpactMetric: React.FC<{ label: string; value: string; unit: string; delay: number }> = ({ label, value, unit, delay }) => (
  <div className="flex flex-col items-center justify-center p-8 border border-stone-800/50 bg-stone-900/50 rounded-2xl hover:bg-stone-800/80 transition-colors duration-500 group">
    <div className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
      {value}<span className="text-amber-500 text-2xl md:text-3xl ml-1">{unit}</span>
    </div>
    <div className="text-stone-400 uppercase tracking-widest text-xs font-bold">{label}</div>
  </div>
);

interface HomePageProps {
    onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const scrollToFlow = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <ParallaxSection className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 overflow-hidden">
        
        <FadeIn className="z-10 text-center max-w-6xl relative">
            <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-stone-400"></span>
                <span className="uppercase tracking-[0.2em] text-stone-500 text-xs font-bold">Logistics of Empathy</span>
                <span className="h-[1px] w-12 bg-stone-400"></span>
            </div>
            
            <h1 className="text-6xl md:text-[8rem] font-semibold tracking-tighter mb-8 text-stone-900 leading-[0.9] mix-blend-multiply">
                Hunger is a <br/>
                <span className="font-serif italic text-stone-600 font-medium">logistics error.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-700 font-normal max-w-2xl mx-auto leading-relaxed mt-8 text-balance">
                We bridge the disconnect between campus abundance and community need. 
                One platform to track, predict, and redistribute food in real-time.
            </p>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                <button 
                    onClick={scrollToFlow}
                    className="bg-stone-900 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-amber-600 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 group"
                >
                    See How It Works
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </FadeIn>
        
        <div className="absolute bottom-12 animate-bounce duration-[2000ms] text-stone-400 cursor-pointer" onClick={scrollToFlow}>
            <ChevronDown className="w-8 h-8 opacity-70" />
        </div>
      </ParallaxSection>

      {/* 2. THE PROBLEM */}
      <ProblemData />
      
      {/* 3. HOW SAVESERVE WORKS (SCROLLING FLOW) */}
      <div id="how-it-works">
        <ProcessFlow />
      </div>

      <div className="relative z-10">
        <Features onNavigate={onNavigate} />
      </div>

      {/* 4. IMPACT SNAPSHOT */}
      <ParallaxSection className="py-32 px-6 bg-stone-950 relative overflow-hidden text-stone-50">
        {/* Subtle Map Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-end mb-20">
                <div>
                    <h2 className="text-5xl md:text-7xl font-semibold mb-6">
                        The proof is <br/><span className="font-serif italic text-amber-500 font-medium">on the table.</span>
                    </h2>
                </div>
                <div>
                    <p className="text-stone-400 text-lg md:text-xl font-normal leading-relaxed border-l border-stone-800 pl-6">
                        Since our pilot launch in 3 campuses, we haven't just moved data. We've moved nutrition. 
                        We've turned "waste management" into "hunger management".
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FadeIn delay={100}>
                    <ImpactMetric label="Food Rescued" value="12.4" unit="tons" delay={100} />
                </FadeIn>
                <FadeIn delay={200}>
                    <ImpactMetric label="Meals Served" value="24,800" unit="+" delay={200} />
                </FadeIn>
                <FadeIn delay={300}>
                    <ImpactMetric label="CO₂ Diverted" value="31.2" unit="tons" delay={300} />
                </FadeIn>
                <FadeIn delay={400}>
                    <ImpactMetric label="Active Partners" value="18" unit="NGOs" delay={400} />
                </FadeIn>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* 5. FINAL CTA */}
      <ParallaxSection className="py-40 px-6 bg-stone-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-6">
                <Utensils />
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-stone-900">
              Stop feeding <br/> the landfill.
            </h2>
            <p className="text-stone-600 text-xl md:text-2xl mb-12 font-normal max-w-2xl mx-auto">
              Whether you manage a campus kitchen or run a local NGO, your participation changes the equation.
            </p>

            <div className="max-w-md mx-auto">
              <button 
                onClick={() => onNavigate('get-involved')}
                className="w-full bg-stone-900 text-white py-5 rounded-full hover:bg-amber-600 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-xl flex items-center justify-center gap-2"
              >
                 Join the Initiative <ArrowUpRight size={20} />
              </button>
              <p className="mt-4 text-stone-400 text-sm font-medium">Join the 50+ campuses already onboard</p>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>
    </>
  );
};