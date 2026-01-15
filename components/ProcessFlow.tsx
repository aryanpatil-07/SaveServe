import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';
import { ParallaxSection } from './ui/ParallaxSection';
import { 
  ClipboardList, Database, BrainCircuit, ChefHat, 
  Activity, AlertTriangle, BellRing, HandHeart, 
  MapPin, Users, ArrowDown
} from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stepNumber: string;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, subtitle, description, stepNumber, isLast }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate when the element is significantly visible (near center or top-center)
        if (entry.isIntersecting) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
      },
      {
        rootMargin: '-20% 0px -20% 0px', // Active window in middle 60% of viewport
        threshold: 0.4
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative flex gap-6 md:gap-12 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {/* Timeline Column */}
      <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-24">
        {/* Number Badge */}
        <span className={`text-[10px] md:text-xs font-mono text-stone-500 mb-2 transition-opacity duration-500 absolute -left-8 top-6 hidden md:block font-bold ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          STEP {stepNumber}
        </span>
        
        {/* Icon Circle */}
        <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border flex items-center justify-center z-10 transition-all duration-700 relative overflow-hidden ${
            isActive 
            ? 'bg-amber-600 border-amber-500 text-white scale-110 shadow-[0_0_30px_rgba(217,119,6,0.4)]' 
            : 'bg-stone-900 border-stone-800 text-stone-300'
        }`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
        </div>
        
        {/* Connecting Line */}
        {!isLast && (
          <div className="w-0.5 h-32 md:h-40 bg-stone-800 relative overflow-hidden">
             {/* Animated Stream Line */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-500 to-transparent transition-transform duration-[1.5s] ease-in-out ${
                isActive ? 'translate-y-0' : '-translate-y-full'
            }`}></div>
          </div>
        )}
      </div>

      {/* Content Column */}
      <div className="pb-16 md:pb-24 pt-2 max-w-xl">
        <div className="flex items-center gap-3 mb-2">
           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
               isActive ? 'bg-amber-500/10 text-amber-500' : 'bg-stone-800 text-stone-400'
           }`}>
              {subtitle}
           </span>
        </div>
        <h3 className={`text-2xl md:text-3xl font-serif font-bold mb-4 transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-stone-100'
        }`}>
          {title}
        </h3>
        <p className={`font-normal leading-relaxed text-sm md:text-base transition-colors duration-500 ${
            isActive ? 'text-stone-300' : 'text-stone-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export const ProcessFlow: React.FC = () => {
  return (
    <ParallaxSection className="bg-stone-950 py-32 px-6 border-t border-stone-900 relative overflow-hidden z-10">
      
      {/* Header */}
      <div className="container mx-auto max-w-4xl relative z-10 mb-24 text-center">
        <FadeIn>
            <div className="inline-block p-3 rounded-full bg-stone-900 mb-6 border border-stone-800 animate-bounce">
                <ArrowDown className="text-amber-500" />
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold text-stone-100 mb-8">
              The <span className="font-serif italic text-amber-600 font-medium">SaveServe</span> Ecosystem.
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto font-normal">
              We replace manual guessing with a connected digital nervous system.
              Follow the journey of a meal from prediction to plate.
            </p>
        </FadeIn>
      </div>

      {/* Timeline Steps */}
      <div className="container mx-auto max-w-3xl relative z-10 pl-2 md:pl-10">
          
          <FadeIn delay={0}>
            <Step 
              stepNumber="01"
              icon={<ClipboardList />}
              title="Consumption Data Input"
              subtitle="Mess Hall Admin"
              description="Mess managers log daily attendance, menu items, and student feedback via the Admin Dashboard. No more paper logs."
            />
          </FadeIn>

          <FadeIn delay={100}>
            <Step 
              stepNumber="02"
              icon={<Database />}
              title="Historical Aggregation"
              subtitle="Google BigQuery"
              description="Data flows into BigQuery, creating a massive dataset of consumption patterns, holidays, and waste trends over time."
            />
          </FadeIn>

          <FadeIn delay={150}>
            <Step 
              stepNumber="03"
              icon={<BrainCircuit />}
              title="Demand Prediction"
              subtitle="Vertex AI"
              description="Our ML models analyze the data against external factors (weather, exams) to predict tomorrow's attendance with 92% accuracy."
            />
          </FadeIn>

          <FadeIn delay={200}>
            <Step 
              stepNumber="04"
              icon={<ChefHat />}
              title="Smart Prep Guidelines"
              subtitle="Procurement API"
              description="Kitchen staff receive exact procurement and cooking quantities for the day. Waste is prevented before the stove is even lit."
            />
          </FadeIn>

          <FadeIn delay={250}>
            <Step 
              stepNumber="05"
              icon={<Activity />}
              title="Real-time Monitoring"
              subtitle="IoT Sensors / Manual Log"
              description="As service ends, remaining quantities are logged. The system monitors the freshness window of the food."
            />
          </FadeIn>

          <FadeIn delay={300}>
            <Step 
              stepNumber="06"
              icon={<AlertTriangle />}
              title="Surplus Detection"
              subtitle="Automated Trigger"
              description="If usable food exceeds the threshold, the system flags it as a 'Rescue Opportunity' rather than waste."
            />
          </FadeIn>

          <FadeIn delay={350}>
            <Step 
              stepNumber="07"
              icon={<BellRing />}
              title="Instant Broadcast"
              subtitle="Firebase Cloud Messaging"
              description="Push notifications are instantly sent to verified NGOs and shelters within a 5km radius of the campus."
            />
          </FadeIn>

          <FadeIn delay={400}>
            <Step 
              stepNumber="08"
              icon={<HandHeart />}
              title="Volunteer Acceptance"
              subtitle="Partner App"
              description="An NGO claims the donation. A digital handshake is created on the blockchain for accountability."
            />
          </FadeIn>

          <FadeIn delay={450}>
            <Step 
              stepNumber="09"
              icon={<MapPin />}
              title="Route Optimization"
              subtitle="Google Maps Platform"
              description="The driver receives the fastest route to the campus and then to the shelter, accounting for traffic to ensure food safety."
            />
          </FadeIn>

          <FadeIn delay={500}>
            <Step 
              stepNumber="10"
              icon={<Users />}
              title="Redistribution"
              subtitle="Community Impact"
              description="Food reaches those in need while hot and fresh. The loop is closed. The data feeds back into step 1 for better future predictions."
              isLast
            />
          </FadeIn>

      </div>
    </ParallaxSection>
  );
};