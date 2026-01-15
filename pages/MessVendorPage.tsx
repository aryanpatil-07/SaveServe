import React, { useState } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { ChefHat, TrendingDown, Bell, CheckCircle, AlertCircle, ArrowRight, DollarSign, Leaf, Clock, Smartphone, HeartHandshake, Info } from 'lucide-react';

/* --- UI COMPONENTS --- */

const DashboardCard: React.FC = () => {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
      return (
        <div className="bg-stone-900 rounded-xl shadow-xl border border-green-900/50 p-8 text-center h-full flex flex-col items-center justify-center min-h-[380px] animate-fade-in-up w-full max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle size={40} />
            </div>
            <h3 className="text-white font-serif font-bold text-2xl mb-2">Order Confirmed</h3>
            <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                The prep list has been broadcast to the kitchen staff.
                <br/><span className="text-stone-500">Inventory logs updated: -45kg Rice</span>
            </p>
            <button 
                onClick={() => setConfirmed(false)} 
                className="text-xs text-stone-500 hover:text-white underline decoration-stone-700 underline-offset-4 font-bold"
            >
                Undo Selection
            </button>
        </div>
      );
  }

  return (
    <div className="bg-stone-900 rounded-xl shadow-xl border border-stone-800 overflow-hidden w-full max-w-md mx-auto relative group min-h-[380px] flex flex-col">
        {/* Header */}
        <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Live Prediction</span>
            </div>
            <span className="text-stone-500 text-xs font-medium">Today, 11:30 AM</span>
        </div>
        
        {/* Body */}
        <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="text-stone-400 text-sm font-bold mb-1">Lunch Service • Rice Preparation</h3>
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-serif font-bold text-white">45<span className="text-2xl">kg</span></span>
                <span className="text-stone-400 font-medium">Recommended</span>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-stone-800 pb-2">
                    <span className="text-stone-400 font-medium">Expected Footfall</span>
                    <span className="font-bold text-stone-200">342 Students</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-stone-800 pb-2">
                    <span className="text-stone-400 font-medium">Buffer Quantity</span>
                    <span className="font-bold text-stone-200">2.5 kg</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 font-medium">Confidence Score</span>
                    <span className="font-bold text-amber-500">96% High</span>
                </div>
            </div>

            <button 
                onClick={() => setConfirmed(true)}
                className="w-full mt-8 bg-stone-800 text-white py-3 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 border border-stone-700"
            >
                <CheckCircle size={16} /> Confirm Prep Order
            </button>
        </div>
        
        {/* Decorative blur */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
    </div>
  );
};

const NgoActionCard: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSend = () => {
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-stone-900 rounded-xl shadow-xl border border-green-900/50 p-8 text-center h-full flex flex-col items-center justify-center min-h-[280px] animate-fade-in-up">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
          <HeartHandshake size={32} />
        </div>
        <h3 className="text-white font-serif font-bold text-2xl mb-2">You're a Hero!</h3>
        <p className="text-stone-400 text-sm mb-4">
          Pickup request sent to <span className="text-white font-bold">FeedIndia</span>. 
          <br/>45 meals saved from the landfill.
        </p>
        <button onClick={() => setStatus('idle')} className="text-xs text-stone-500 hover:text-white underline decoration-stone-700 underline-offset-4">
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 rounded-xl shadow-xl border border-stone-800 overflow-hidden w-full max-w-md mx-auto relative group">
       {/* Header */}
       <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Action Required</span>
            </div>
            <span className="text-stone-500 text-xs font-medium">Just now</span>
        </div>
        
        <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-red-900/20 p-3 rounded-lg text-red-500 border border-red-900/30">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Leftovers Detected</h3>
                    <p className="text-stone-400 text-sm mt-1">
                        Input logs show <span className="text-white font-bold">12kg Dal</span> remaining. 
                        Safe consumption window: 4 hours.
                    </p>
                </div>
            </div>

            <button 
                onClick={handleSend}
                disabled={status === 'sending'}
                className="w-full bg-white text-stone-900 py-4 rounded-lg font-bold hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group-hover:scale-[1.02]"
            >
                {status === 'sending' ? (
                    <>
                        <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
                        Connecting to NGOs...
                    </>
                ) : (
                    <>
                         Dispatch to NGO <ArrowRight size={18} />
                    </>
                )}
            </button>
            <p className="text-center text-[10px] text-stone-600 mt-4 font-bold uppercase tracking-wide">
                1 Click • Zero Paperwork • Instant Receipt
            </p>
        </div>
    </div>
  );
};

const NotificationMockup: React.FC = () => (
    <div className="bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl p-4 shadow-lg w-full max-w-sm flex gap-4 items-start animate-[pulse-soft_4s_infinite]">
        <div className="bg-amber-900/30 text-amber-500 p-2 rounded-full mt-1 border border-amber-500/20">
            <Bell size={20} />
        </div>
        <div>
            <h4 className="font-bold text-white text-sm">Surplus Detected</h4>
            <p className="text-stone-400 text-xs mt-1 leading-relaxed font-medium">
                Sensor detected 12kg unserved Dal. <br/>
                <span className="font-bold text-amber-500">NGO "FeedIndia" notified for pickup (ETA 15 mins).</span>
            </p>
            <div className="flex gap-3 mt-3">
                <button className="text-[10px] font-bold uppercase tracking-wide bg-stone-800 text-white px-3 py-1.5 rounded hover:bg-stone-700 transition-colors border border-stone-700">Approve</button>
                <button className="text-[10px] font-bold uppercase tracking-wide text-stone-500 hover:text-stone-300 transition-colors">Details</button>
            </div>
        </div>
    </div>
);

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
    <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-stone-800 rounded-lg text-stone-300 shadow-sm border border-stone-700">{icon}</div>
            <span className="text-green-400 text-xs font-bold bg-green-900/30 px-2 py-1 rounded border border-green-800">{trend}</span>
        </div>
        <div className="text-3xl font-serif font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">{label}</div>
    </div>
);

export const MessVendorPage: React.FC = () => {
  return (
    <div className="pt-20">
      
      {/* 1. HERO */}
      <ParallaxSection className="py-20 px-6 bg-stone-900 text-stone-50 relative overflow-hidden z-0">
        {/* Background Pattern - Cubes */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10 grid md:grid-cols-2 gap-16 items-center">
             <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <ChefHat size={14} />
                    For Kitchen Operations
                </div>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
                    Cook smarter, <br/> not harder.
                </h1>
                <p className="text-stone-400 text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-lg">
                    The operating system for modern campuses. Reduce procurement costs, automate logs, and certify your sustainability efforts.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-stone-900 px-6 py-3 rounded-full font-bold hover:bg-stone-200 transition-colors flex items-center gap-2">
                        Schedule Demo <ArrowRight size={16} />
                    </button>
                    <button className="border border-stone-700 text-stone-300 px-6 py-3 rounded-full font-bold hover:bg-stone-800 transition-colors">
                        View Pricing
                    </button>
                </div>
             </FadeIn>
             
             <FadeIn delay={200} className="relative">
                {/* Hero Dashboard Graphic */}
                <div className="relative z-10">
                    <DashboardCard />
                </div>
                {/* Floating Notification */}
                <div className="absolute -bottom-12 -left-12 z-20 hidden md:block">
                    <NotificationMockup />
                </div>
             </FadeIn>
        </div>
      </ParallaxSection>
      
      {/* 2. YOUR NEW DAILY ROUTINE */}
      <ParallaxSection className="py-24 px-6 bg-stone-950 border-t border-stone-800 z-10 relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="container mx-auto max-w-6xl relative z-10">
             <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Your New Daily Routine</h2>
                 <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                     Forget the clipboards. Here is how your morning shift changes with SaveServe.
                 </p>
             </div>

             <div className="grid lg:grid-cols-2 gap-16 items-center">
                 <FadeIn>
                    <div className="flex flex-col gap-6">
                         <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-2 rounded-2xl border border-stone-700 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                             <DashboardCard />
                         </div>
                         <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-2 rounded-2xl border border-stone-700 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 relative z-10">
                             <NgoActionCard />
                         </div>
                    </div>
                 </FadeIn>

                 <FadeIn delay={200}>
                     <div className="space-y-8">
                         <div className="flex gap-6 group">
                             <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all flex-shrink-0 font-bold text-xl">1</div>
                             <div>
                                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                     <Clock size={18} className="text-stone-500" /> 
                                     Check at 9:00 AM
                                 </h3>
                                 <p className="text-stone-400 leading-relaxed">
                                     Open the dashboard on your tablet. The AI has already analyzed last night's hostel attendance and today's exam schedule.
                                 </p>
                             </div>
                         </div>

                         <div className="flex gap-6 group">
                             <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all flex-shrink-0 font-bold text-xl">2</div>
                             <div>
                                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                     <CheckCircle size={18} className="text-stone-500" />
                                     Confirm Quantity
                                 </h3>
                                 <p className="text-stone-400 leading-relaxed">
                                     You see "Cook 45kg Rice" instead of your usual 60kg. Tap <strong>Confirm</strong> to lock in the procurement order for the day.
                                 </p>
                             </div>
                         </div>

                         <div className="flex gap-6 group">
                             <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all flex-shrink-0 font-bold text-xl">3</div>
                             <div>
                                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                     <Smartphone size={18} className="text-stone-500" />
                                     Auto-Log Leftovers
                                 </h3>
                                 <p className="text-stone-400 leading-relaxed">
                                     At 2:00 PM, enter the remaining quantity. If it exceeds 5kg, the system automatically dispatches a pickup request to FeedIndia NGO.
                                 </p>
                             </div>
                         </div>
                     </div>
                 </FadeIn>
             </div>
         </div>
      </ParallaxSection>

      {/* 3. VALUE PROPS / FEATURES */}
      <ParallaxSection className="py-24 px-6 bg-stone-50 z-20">
          <div className="container mx-auto max-w-6xl">
              <FadeIn>
                  <div className="text-center mb-16 max-w-3xl mx-auto">
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Run a Zero-Waste Kitchen</h2>
                      <p className="text-stone-600 font-medium">
                          Your kitchen is a high-pressure environment. Our tools are designed to be silent, helpful, and invisible until you need them.
                      </p>
                  </div>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                        { 
                            title: "Precision Prep", 
                            shortDesc: "Receive daily preparation guides based on AI forecasts. Know exactly how many kg of rice, dal, or veggies to chop before the shift starts.",
                            detailDesc: "Our Vertex AI engine ingests real-time academic calendars, weather patterns, and historical consumption rates to generate procurement lists with 92% accuracy, reducing over-prep waste instantly.",
                            icon: <ChefHat />,
                            color: "amber"
                        },
                        { 
                            title: "Auto-Redistribution", 
                            shortDesc: "If you overcook, don't stress. One tap triggers a broadcast to nearby NGOs. We handle the logistics; you get the tax credit.",
                            detailDesc: "Leftovers are inevitable. Our system auto-calculates safe consumption windows and broadcasts available surplus to verified NGOs within a 5km radius, ensuring food reaches mouths, not bins.",
                            icon: <AlertCircle />,
                            color: "red"
                        },
                        { 
                            title: "Green Certification", 
                            shortDesc: "Automated monthly reports on food saved and CO2 diverted. Perfect for university audits and CSR compliance.",
                            detailDesc: "Every kg saved is logged on an immutable ledger. Generate audit-ready sustainability reports in one click to showcase your campus's environmental impact to stakeholders and students.",
                            icon: <Leaf />,
                            color: "green"
                        }
                    ].map((item, i) => (
                        <FadeIn delay={100 + i * 100} key={i}>
                            <div className="bg-stone-900 p-8 rounded-2xl shadow-sm border border-stone-800 h-full group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                
                                {/* Header */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-colors ${
                                    item.color === 'amber' ? 'bg-amber-900/30 text-amber-500 border-amber-800/30' :
                                    item.color === 'red' ? 'bg-red-900/30 text-red-500 border-red-800/30' :
                                    'bg-green-900/30 text-green-500 border-green-800/30'
                                }`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                
                                {/* Text Content Area - Fixed height to prevent jumps, cross-fade effect */}
                                <div className="relative min-h-[120px]">
                                    {/* Short Description (Fades out on hover) */}
                                    <p className="text-stone-400 text-sm leading-relaxed font-normal absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0">
                                        {item.shortDesc}
                                    </p>
                                    
                                    {/* Detailed Description (Fades in on hover) */}
                                    <p className="text-stone-300 text-sm leading-relaxed font-medium absolute top-0 left-0 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {item.detailDesc}
                                    </p>
                                </div>
                                
                                {/* Hover Indicator */}
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                     <Info size={16} className="text-stone-500" />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
              </div>
          </div>
      </ParallaxSection>

      {/* 4. REPORTS SECTION */}
      <ParallaxSection className="py-24 px-6 bg-stone-50 border-y border-stone-100 z-30">
          <div className="container mx-auto max-w-5xl">
              <FadeIn>
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                      <div>
                          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Monthly Impact Report</h2>
                          <p className="text-stone-500 text-sm font-medium">Automated generation every 30 days.</p>
                      </div>
                      <button className="text-amber-600 font-bold text-sm hover:text-amber-700 flex items-center gap-1 mt-4 md:mt-0">
                          View Full Report <ArrowRight size={16} />
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <StatCard 
                        icon={<DollarSign size={24} />}
                        label="Procurement Saved"
                        value="₹ 1.2 L"
                        trend="+12% vs last mo"
                      />
                      <StatCard 
                        icon={<TrendingDown size={24} />}
                        label="Waste Reduced"
                        value="480 kg"
                        trend="-18% vs last mo"
                      />
                      <StatCard 
                        icon={<Leaf size={24} />}
                        label="Sustainability Score"
                        value="A+"
                        trend="Top 5% Rank"
                      />
                  </div>
              </FadeIn>
          </div>
      </ParallaxSection>

      {/* 5. CTA */}
      <ParallaxSection className="py-24 px-6 bg-stone-50 z-40">
          <div className="container mx-auto max-w-3xl text-center">
              <FadeIn>
                  <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Ready to upgrade your kitchen?</h2>
                  <p className="text-stone-600 mb-8 max-w-xl mx-auto font-medium">
                      Join 50+ campuses using SaveServe to cut costs and feed communities. Implementation takes less than 3 days.
                  </p>
                  
                  <form className="bg-stone-900 p-2 rounded-full shadow-lg border border-stone-800 flex flex-col md:flex-row gap-2 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                      <input 
                        type="email" 
                        placeholder="kitchen_manager@campus.edu" 
                        className="flex-grow px-6 py-3 rounded-full outline-none bg-stone-800 text-white placeholder:text-stone-500 border border-transparent focus:border-amber-500 font-medium"
                      />
                      <button className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-colors">
                          Get Started
                      </button>
                  </form>
                  <p className="text-stone-400 text-xs mt-4 font-bold">No hardware required. Works on any tablet or smartphone.</p>
              </FadeIn>
          </div>
      </ParallaxSection>

    </div>
  );
};