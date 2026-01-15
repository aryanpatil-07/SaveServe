import React, { useState, useEffect, useRef } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { Heart, Bell, MapPin, Calendar, Clock, ArrowRight, CheckCircle, Navigation, AlertTriangle, Briefcase } from 'lucide-react';

/* --- UI COMPONENTS --- */

const NotificationCard = () => {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  if (status === 'accepted') {
    return (
      <div className="bg-stone-900 rounded-2xl shadow-xl p-6 border border-green-900/50 max-w-sm w-full relative overflow-hidden group min-h-[220px] flex flex-col items-center justify-center text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-serif text-white font-bold mb-2">Headed Your Way!</h3>
        <p className="text-stone-400 text-sm font-medium">
           Route locked. Driver dispatched.<br/>ETA: 12 mins.
        </p>
         <button onClick={() => setStatus('pending')} className="mt-4 text-xs text-stone-500 hover:text-white underline decoration-stone-700 underline-offset-4 font-bold">
            Undo
        </button>
      </div>
    );
  }

  if (status === 'declined') {
    return (
      <div className="bg-stone-900 rounded-2xl shadow-xl p-6 border border-stone-800 max-w-sm w-full relative overflow-hidden group min-h-[220px] flex flex-col items-center justify-center text-center animate-fade-in-up">
         <div className="w-16 h-16 bg-stone-800 text-stone-500 rounded-full flex items-center justify-center mb-4 border border-stone-700">
           <Clock size={32} />
        </div>
        <h3 className="text-xl font-serif text-white font-bold mb-2">Pickup Declined</h3>
        <p className="text-stone-400 text-sm font-medium">
           No problem. More requests<br/>coming soon.
        </p>
        <button onClick={() => setStatus('pending')} className="mt-4 text-xs text-stone-500 hover:text-white underline decoration-stone-700 underline-offset-4 font-bold">
            Undo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 rounded-2xl shadow-xl p-6 border border-stone-800 max-w-sm w-full relative overflow-hidden group hover:scale-105 transition-transform duration-300 min-h-[220px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-wider">
           <Bell size={14} className="animate-pulse" />
           Rescue Alert
        </div>
        <span className="text-stone-400 text-xs font-bold">2 min ago</span>
      </div>
      <h3 className="text-lg font-serif text-white font-bold mb-1">North Campus Mess</h3>
      <p className="text-stone-400 text-sm mb-4 font-medium">
         15kg Rice, 8kg Dal available for immediate pickup. Freshness window: 2 hours.
      </p>
      <div className="flex gap-2 mt-auto">
         <button onClick={() => setStatus('accepted')} className="flex-1 bg-white text-stone-900 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-stone-200 transition-colors">Accept</button>
         <button onClick={() => setStatus('declined')} className="flex-1 bg-stone-800 text-stone-400 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-stone-700 transition-colors">Decline</button>
      </div>
    </div>
  );
};

interface PickupProps {
    id: number;
    title: string;
    location: string;
    defaultTime: string;
    type: 'recurring' | 'adhoc';
}

const ScheduledPickup = ({ id, title, location, defaultTime, type }: PickupProps) => {
    // Parse time helper (HH:MM PM -> minutes)
    const parseTime = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (hours === 12 && modifier === 'AM') hours = 0;
        if (hours !== 12 && modifier === 'PM') hours += 12;
        return hours * 60 + minutes;
    };

    const initialMinutes = parseTime(defaultTime);
    const [adjustment, setAdjustment] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // Format minutes back to HH:MM AM/PM
    const formatTime = (totalMinutes: number) => {
        let h = Math.floor(totalMinutes / 60);
        let m = totalMinutes % 60;
        // Handle overflow/underflow of day boundaries roughly if needed, 
        // but for +/- 1hr it's usually fine. 
        if (totalMinutes < 0) totalMinutes += 1440;
        if (totalMinutes >= 1440) totalMinutes -= 1440;
        
        h = Math.floor(totalMinutes / 60);
        m = totalMinutes % 60;
        
        const ampm = h >= 12 && h < 24 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12; 
        const mStr = m < 10 ? '0' + m : m;
        return `${h}:${mStr} ${ampm}`;
    };

    const currentMinutes = initialMinutes + adjustment;

    return (
        <div className="bg-stone-800 p-4 rounded-xl border border-stone-700/50 transition-colors group relative overflow-hidden">
            {type === 'recurring' && (
                <div className="absolute top-0 right-0 p-1.5 bg-stone-700/50 rounded-bl-lg">
                    <Briefcase size={10} className="text-stone-400" />
                </div>
            )}
            
            <div className="flex items-start justify-between relative z-10">
                <div>
                     <div className="text-sm font-bold text-white mb-0.5">{title}</div>
                     <div className="text-xs text-stone-500 font-bold flex items-center gap-1">
                        <MapPin size={10} /> {location}
                     </div>
                </div>
                <div className="text-right pr-2">
                     <div className={`text-sm font-mono font-bold ${adjustment !== 0 ? 'text-amber-500' : 'text-stone-300'}`}>
                        {formatTime(currentMinutes)}
                     </div>
                     {adjustment !== 0 && (
                        <div className="text-[10px] text-amber-500/80 font-medium">
                            {adjustment > 0 ? `+${adjustment} min` : `${adjustment} min`}
                        </div>
                     )}
                </div>
            </div>

            {isEditing ? (
                <div className="mt-4 pt-4 border-t border-stone-700 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Adjust Time</label>
                        <span className="text-[10px] font-mono text-stone-400 font-bold">
                             {adjustment === 0 ? 'Original Time' : adjustment > 0 ? `Postpone ${adjustment}m` : `Prepone ${Math.abs(adjustment)}m`}
                        </span>
                    </div>
                    
                    <div className="relative h-8 flex items-center mb-1">
                        {/* Range Slider (-30 to +60) */}
                        <input 
                            type="range" 
                            min="-30" 
                            max="60" 
                            step="15" 
                            value={adjustment}
                            onChange={(e) => setAdjustment(Number(e.target.value))}
                            className="w-full h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 relative z-10"
                        />
                        
                        {/* Ticks Background */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none px-1 h-full items-center z-0">
                             {/* -30 */}
                             <div className="w-0.5 h-3 bg-stone-500/50"></div>
                             {/* -15 */}
                             <div className="w-0.5 h-1.5 bg-stone-600/50"></div>
                             {/* 0 (33% pos approximately) */}
                             <div className="w-0.5 h-3 bg-stone-400"></div>
                             {/* 15 */}
                             <div className="w-0.5 h-1.5 bg-stone-600/50"></div>
                             {/* 30 */}
                             <div className="w-0.5 h-1.5 bg-stone-600/50"></div>
                             {/* 45 */}
                             <div className="w-0.5 h-1.5 bg-stone-600/50"></div>
                             {/* 60 */}
                             <div className="w-0.5 h-3 bg-stone-500/50"></div>
                        </div>
                    </div>
                    
                    {/* Labels aligned to the asymmetrical range */}
                    <div className="relative h-4 text-[10px] text-stone-600 font-bold font-mono">
                        <span className="absolute left-0">-30m</span>
                        <span className="absolute left-1/3 -translate-x-1/2 text-stone-400">Original</span>
                        <span className="absolute right-0">+1h</span>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                         <button 
                            onClick={() => { setAdjustment(0); setIsEditing(false); }}
                            className="px-3 py-1.5 rounded text-[10px] font-bold text-stone-500 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded text-[10px] font-bold transition-colors shadow-lg"
                        >
                            Update Slot
                        </button>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-3 py-2 rounded border border-stone-700/50 text-stone-500 hover:text-white hover:border-stone-500/50 text-xs font-bold transition-all flex items-center justify-center gap-1 opacity-60 hover:opacity-100 group-hover:opacity-100"
                >
                    Reschedule
                </button>
            )}
        </div>
    );
};

// Fallback SVG Map - Styled to look identical to the real map in dark mode
const StaticRouteMap = () => (
    <div className="w-full h-full relative bg-stone-900 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
            {/* Roads */}
            <path d="M 50 200 C 150 100, 250 180, 350 150" fill="none" stroke="#292524" strokeWidth="8" strokeLinecap="round" />
            
            {/* Active Route */}
            <path d="M 50 200 C 150 100, 250 180, 350 150" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 5" className="animate-[dash_30s_linear_infinite]" />
            
            {/* Start Point */}
            <circle cx="50" cy="200" r="8" fill="#f5f5f4" stroke="#d97706" strokeWidth="3" />
            
            {/* End Point */}
            <circle cx="350" cy="150" r="8" fill="#d97706" stroke="#fff" strokeWidth="2" />
            
            {/* Moving Car */}
            <circle r="5" fill="white" filter="drop-shadow(0 0 4px rgba(255,255,255,0.5))">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 50 200 C 150 100, 250 180, 350 150" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
            </circle>
        </svg>

        {/* Text Overlays for Static Map */}
        <div className="absolute bottom-4 left-4 bg-stone-900/90 px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-white flex items-center gap-2 border border-stone-800 z-10 backdrop-blur-sm">
            <div className="w-2 h-2 bg-stone-500 rounded-full"></div> Pickup: North Campus
         </div>
         <div className="absolute top-4 right-4 bg-stone-900/90 px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-amber-500 flex items-center gap-2 border border-stone-800 z-10 backdrop-blur-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Drop: Civil Lines Shelter
         </div>
         
         {/* Simulated ETA Overlay */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-950/80 backdrop-blur-md border border-amber-500/30 px-6 py-4 rounded-2xl flex flex-col items-center z-10 shadow-2xl animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Estimated Arrival</span>
            <div className="text-3xl font-serif font-bold text-white flex items-center gap-2">
                <span className="text-amber-500 animate-pulse text-xl">●</span> 14 min
            </div>
            <div className="text-xs text-stone-500 font-bold mt-1 uppercase tracking-wide">Distance: 5.2 km</div>
        </div>
    </div>
);

const LeafletMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const [libLoaded, setLibLoaded] = useState(false);

    useEffect(() => {
        // Dynamically inject Leaflet
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        if (!document.getElementById('leaflet-js')) {
            const script = document.createElement('script');
            script.id = 'leaflet-js';
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            script.onload = () => setLibLoaded(true);
            document.body.appendChild(script);
        } else {
            // Check if L is already available
            if ((window as any).L) {
                setLibLoaded(true);
            } else {
                // Wait for it if script tag exists but not loaded
                 const existingScript = document.getElementById('leaflet-js');
                 existingScript?.addEventListener('load', () => setLibLoaded(true));
            }
        }
    }, []);

    useEffect(() => {
        if (libLoaded && mapContainerRef.current && !mapInstanceRef.current && (window as any).L) {
            const L = (window as any).L;
            
            // Initialize Map
            const map = L.map(mapContainerRef.current, {
                center: [28.68, 77.22], // Center between North Campus and Civil Lines roughly
                zoom: 13,
                zoomControl: false,
                attributionControl: false
            });

            // Add CartoDB Dark Matter Tiles (High quality, free, matches theme)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 20,
                subdomains: 'abcd'
            }).addTo(map);

            // Custom Markers
            const createCustomIcon = (colorClass: string) => L.divIcon({
                className: 'bg-transparent',
                html: `<div class="w-4 h-4 ${colorClass} rounded-full border-2 border-white shadow-[0_0_15px_currentColor] animate-pulse"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8] // Center
            });

            const startPoint = [28.6943, 77.2104];
            const endPoint = [28.6650, 77.2320];

            L.marker(startPoint, { icon: createCustomIcon('bg-stone-500') }).addTo(map);
            L.marker(endPoint, { icon: createCustomIcon('bg-amber-500') }).addTo(map);

            // Route Line
            // Using a simple curve approximation for visuals since we don't have a routing API key
            const midPoint = [
                (startPoint[0] + endPoint[0]) / 2 + 0.005, // Slight curve
                (startPoint[1] + endPoint[1]) / 2 - 0.005
            ];
            
            // Simple Polyline
            const latlngs = [startPoint, midPoint, endPoint];
            const polyline = L.polyline(latlngs, {
                color: '#d97706', // amber-600
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10',
                lineCap: 'round'
            }).addTo(map);

            // Fit bounds
            map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

            mapInstanceRef.current = map;
        }

        return () => {
             // Cleanup on unmount if needed, though for this page transition it's often better to keep or ensure clean destruction
             if (mapInstanceRef.current) {
                 mapInstanceRef.current.remove();
                 mapInstanceRef.current = null;
             }
        }
    }, [libLoaded]);

    return (
        <div className="w-full h-full relative group">
             {/* Map Container */}
             <div ref={mapContainerRef} className="w-full h-full bg-stone-900" />
             
             {/* Text Overlays */}
             <div className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-white flex items-center gap-2 border border-stone-800 z-[400]">
                <div className="w-2 h-2 bg-stone-500 rounded-full"></div> Pickup: North Campus
             </div>
             <div className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-amber-500 flex items-center gap-2 border border-stone-800 z-[400]">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Drop: Civil Lines Shelter
             </div>

             {/* Dynamic ETA Center Overlay */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-950/80 backdrop-blur-md border border-amber-500/30 px-6 py-4 rounded-2xl flex flex-col items-center z-[400] shadow-2xl animate-fade-in-up pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Estimated Arrival</span>
                <div className="text-3xl font-serif font-bold text-white flex items-center gap-2">
                    <span className="text-amber-500 animate-pulse text-xl">●</span> 14 min
                </div>
                <div className="text-xs text-stone-500 font-bold mt-1 uppercase tracking-wide">Distance: 5.2 km</div>
            </div>
        </div>
    );
};

const LogTable = () => (
  <div className="w-full overflow-x-auto">
    <table className="w-full text-left border-collapse">
       <thead>
         <tr className="border-b border-stone-800 text-stone-400 text-xs uppercase tracking-wider font-bold">
           <th className="py-4 font-bold pl-2">Date & Time</th>
           <th className="py-4 font-bold">Source</th>
           <th className="py-4 font-bold">Items</th>
           <th className="py-4 font-bold">Weight</th>
           <th className="py-4 font-bold">Status</th>
         </tr>
       </thead>
       <tbody className="text-sm text-stone-300">
         {[
           { date: "Oct 24, 2:30 PM", source: "Engg Canteen", items: "Rice, Mixed Veg", weight: "12 kg", status: "Delivered" },
           { date: "Oct 23, 8:15 PM", source: "Main Mess Hall", items: "Roti, Dal", weight: "8.5 kg", status: "Delivered" },
           { date: "Oct 23, 2:45 PM", source: "Staff Cafeteria", items: "Sandwiches", weight: "3 kg", status: "Delivered" },
           { date: "Oct 22, 9:00 PM", source: "North Block Mess", items: "Curry, Rice", weight: "15 kg", status: "Delivered" },
           { date: "Oct 22, 2:15 PM", source: "Admin Canteen", items: "Salad, Wraps", weight: "4.2 kg", status: "Delivered" },
           { date: "Oct 21, 8:30 PM", source: "Central Kitchen", items: "Mixed Lentils", weight: "9.5 kg", status: "Delivered" },
         ].map((row, i) => (
           <tr key={i} className="border-b border-stone-800 hover:bg-stone-800 transition-colors">
             <td className="py-4 pl-2 font-mono text-xs font-medium text-stone-500">{row.date}</td>
             <td className="py-4 font-bold text-white">{row.source}</td>
             <td className="py-4 font-medium">{row.items}</td>
             <td className="py-4 font-medium">{row.weight}</td>
             <td className="py-4"><span className="inline-flex items-center gap-1 text-green-400 bg-green-900/30 px-2 py-1 rounded-full text-xs font-bold border border-green-800"><CheckCircle size={10}/> {row.status}</span></td>
           </tr>
         ))}
       </tbody>
    </table>
  </div>
);

export const NGOPage: React.FC = () => {
    return (
        <div className="pt-20">
             {/* 1. HERO */}
             <ParallaxSection className="py-20 px-6 bg-stone-50 relative z-0">
                 {/* Crossed Stripes Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crossed-stripes.png')] opacity-10"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Heart size={14} />
                            For Partners & Heroes
                        </div>
                        <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 text-stone-900 leading-[0.95]">
                            Be the hands that <br/>
                            <span className="font-serif italic text-amber-600 font-medium">bridge the gap.</span>
                        </h1>
                        <p className="text-xl text-stone-600 font-normal max-w-2xl mx-auto leading-relaxed text-balance">
                            Technology notifies you, but your empathy finishes the job. 
                            Join the network of NGOs ensuring no good food goes to waste.
                        </p>
                    </FadeIn>
                </div>
             </ParallaxSection>

             {/* 2. REAL-TIME ALERT */}
             <ParallaxSection className="py-24 px-6 bg-stone-50 border-y border-stone-100 z-10">
                 <div className="container mx-auto max-w-6xl">
                     <div className="grid md:grid-cols-2 gap-16 items-center">
                         <FadeIn>
                             <div className="relative">
                                 {/* Decorative Circle */}
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                                 <div className="relative z-10 flex justify-center">
                                     <NotificationCard />
                                 </div>
                             </div>
                         </FadeIn>
                         <FadeIn delay={200}>
                             <div className="max-w-md">
                                 <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Signals, not Noise.</h2>
                                 <p className="text-stone-600 leading-relaxed mb-6 font-medium">
                                     No endless phone calls or coordination chaos. When surplus food is detected, verified partners receive an instant notification with all the vital details.
                                 </p>
                                 <ul className="space-y-4 text-sm text-stone-500 font-medium">
                                     <li className="flex items-center gap-3">
                                         <Clock className="text-amber-500" />
                                         <span>Pickup window included (Food safety priority)</span>
                                     </li>
                                     <li className="flex items-center gap-3">
                                         <MapPin className="text-amber-500" />
                                         <span>Precise GPS location of pickup point</span>
                                     </li>
                                 </ul>
                             </div>
                         </FadeIn>
                     </div>
                 </div>
             </ParallaxSection>

             {/* 3 & 4. ROUTING & SCHEDULING */}
             <ParallaxSection className="py-24 px-6 bg-stone-950 text-stone-50 z-20">
                 <div className="container mx-auto max-w-6xl">
                     <div className="grid md:grid-cols-2 gap-12">
                         <FadeIn>
                             <h2 className="text-3xl md:text-5xl font-medium mb-8">
                                 The fastest path to <br/> <span className="text-amber-500 font-serif italic font-medium">impact.</span>
                             </h2>
                             <p className="text-stone-400 mb-8 leading-relaxed font-normal">
                                 Traffic is the enemy of fresh food. Our integrated mapping system calculates the optimal route from mess hall to shelter, avoiding congestion to ensure meals arrive hot.
                             </p>
                             <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl">
                                 <div className="flex items-center gap-4 mb-4">
                                     <Calendar className="text-stone-400" />
                                     <span className="font-bold text-white">Scheduled Pickups</span>
                                 </div>
                                 <div className="space-y-3">
                                    <ScheduledPickup 
                                        id={1} 
                                        title="Regular Lunch Service" 
                                        location="North Campus Mess" 
                                        defaultTime="02:30 PM" 
                                        type="recurring"
                                    />
                                    <ScheduledPickup 
                                        id={2} 
                                        title="Ad-hoc Dinner Run" 
                                        location="South Hostel Block A" 
                                        defaultTime="09:15 PM" 
                                        type="adhoc"
                                    />
                                 </div>
                             </div>
                         </FadeIn>
                         <FadeIn delay={200} className="h-full">
                             {/* Map Wrapper with consistent styling */}
                             <div className="w-full h-64 md:h-[450px] bg-stone-800 rounded-2xl overflow-hidden relative border border-stone-700 shadow-inner">
                                <LeafletMap />
                             </div>
                         </FadeIn>
                     </div>
                 </div>
             </ParallaxSection>

             {/* 5. LOGS */}
             <ParallaxSection className="py-24 px-6 bg-stone-50 z-30">
                 <div className="container mx-auto max-w-4xl">
                     <FadeIn>
                         <div className="text-center mb-12">
                             <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Transparent Impact Logs</h2>
                             <p className="text-stone-500 font-medium">Every kilogram counted. Every meal verified.</p>
                         </div>
                         <div className="bg-stone-900 rounded-2xl shadow-sm border border-stone-800 p-8">
                             <LogTable />
                         </div>
                     </FadeIn>
                 </div>
             </ParallaxSection>
             
             {/* CTA */}
             <ParallaxSection className="py-24 px-6 bg-amber-600 text-stone-900 relative overflow-hidden z-40">
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 tracking-tight text-white">Join the Network</h2>
                        <p className="text-white/80 text-xl mb-8 font-bold">Are you an NGO or Shelter? Partner with us to receive surplus food notifications.</p>
                        <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-stone-800 hover:scale-105 transition-all shadow-2xl">
                            Register Organization
                        </button>
                    </FadeIn>
                </div>
             </ParallaxSection>
        </div>
    );
};