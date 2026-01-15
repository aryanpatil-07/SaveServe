import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { ParallaxSection } from './ui/ParallaxSection';

export const ProblemData: React.FC = () => {
  return (
    <ParallaxSection className="py-24 md:py-32 px-6 bg-stone-50 border-b border-stone-100 overflow-hidden z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Text Content */}
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-semibold text-stone-900 leading-[1.1] mb-10">
              The numbers are <br/>
              <span className="font-serif italic text-amber-600 font-medium">deafening.</span>
            </h2>
            <div className="space-y-8 text-xl text-stone-600 font-normal leading-relaxed">
              <p>
                In a single campus of 3,000 students, roughly <strong className="text-stone-900 font-bold border-b-2 border-amber-400">200kg of edible food</strong> is discarded every single day.
              </p>
              <p>
                That is not just waste. That is 400 meals. That is 400 people who could have slept with full stomachs, but didn't—simply because the food was in the bin, not on a truck.
              </p>
              <p className="text-stone-400 italic font-medium">
                "Hunger is not a scarcity problem. It is a logistics tragedy."
              </p>
            </div>
          </FadeIn>

          {/* Visual Content - Image + Stats Overlay */}
          <FadeIn delay={200} className="relative">
             <div className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl shadow-stone-300">
                {/* Image representing Waste */}
                <img 
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop" 
                    alt="Food Waste" 
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>

                {/* Floating Stat Card - Kept semi-transparent dark since it overlays an image */}
                <div className="absolute bottom-8 left-8 right-8 bg-stone-900/40 backdrop-blur-md border border-white/10 p-8 rounded-xl text-white">
                    <div className="flex items-end justify-between border-b border-white/20 pb-4 mb-4">
                        <span className="text-6xl font-serif font-bold">1/3</span>
                        <span className="text-amber-400 text-lg font-bold mb-2">Global Stat</span>
                    </div>
                    <p className="text-sm md:text-base text-stone-200 font-medium">
                        Of all food produced for human consumption is lost or wasted globally.
                    </p>
                </div>
             </div>
          </FadeIn>

        </div>
      </div>
    </ParallaxSection>
  );
};