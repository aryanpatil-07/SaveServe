import React, { useState, useEffect } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { BrainCircuit, CloudLightning, Calendar as CalendarIcon, TrendingUp, Search, Sun, Database, ChevronLeft, ChevronRight, BarChart2, BookOpen, Umbrella, Info } from 'lucide-react';

/* --- UTILS --- */

// Simple smooth curve generator for SVG
const getPath = (points: number[], width: number, height: number) => {
    if (points.length === 0) return "";
    const stepX = width / (points.length - 1);
    const data = points.map((p, i) => ({ x: i * stepX, y: height - (p / 100) * height }));
    
    let d = `M ${data[0].x} ${data[0].y}`;
    for (let i = 0; i < data.length - 1; i++) {
        const p0 = data[i];
        const p1 = data[i + 1];
        // Control points for bezier curve
        const cp1x = p0.x + (p1.x - p0.x) / 2;
        const cp1y = p0.y;
        const cp2x = p1.x - (p1.x - p0.x) / 2;
        const cp2y = p1.y;
        d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p1.x} ${p1.y}`;
    }
    return d;
};

/* --- DYNAMIC COMPONENTS --- */

const CalendarWidget: React.FC<{ onDateSelect: (date: number) => void }> = ({ onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 is Sunday

    const handleDateClick = (day: number) => {
        setSelectedDate(day);
        onDateSelect(day);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif font-bold text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="p-1 hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                    <div key={i} className="text-center text-[10px] font-bold text-stone-500 uppercase">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate === day;
                    return (
                        <button 
                            key={day} 
                            onClick={() => handleDateClick(day)}
                            className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all duration-300 ${
                                isSelected 
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 scale-110' 
                                : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
             <div className="mt-4 pt-4 border-t border-stone-800 flex items-center gap-2 text-[10px] text-stone-500">
                <div className="w-2 h-2 rounded-full bg-amber-600"></div> Selected
                <div className="w-2 h-2 rounded-full bg-stone-700 ml-2"></div> Available
            </div>
        </div>
    );
};

const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const width = 600;
  const height = 200;
  const path = getPath(data, width, height);

  return (
    <div className="w-full h-[250px] relative mt-8 select-none">
       {/* Background Grid Lines */}
       <div className="absolute inset-0 flex flex-col justify-between text-xs text-stone-300 pointer-events-none pb-8 pr-4">
          {[100, 75, 50, 25, 0].map((val) => (
              <div key={val} className="border-b border-dashed border-stone-800 w-full h-0 relative flex items-center">
                  <span className="absolute -left-8 text-[10px] font-medium w-6 text-right text-stone-500">{val}%</span>
              </div>
          ))}
       </div>
       
       {/* SVG Chart */}
       <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>

          {/* Area under curve */}
          <path 
              d={`${path} L ${width} ${height} L 0 ${height} Z`} 
              fill="url(#gradientArea)" 
              className="transition-all duration-1000 ease-in-out"
          />

          {/* Animated Line Path */}
          <path 
              d={path} 
              fill="none" 
              stroke="#d97706" 
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="transition-all duration-1000 ease-in-out drop-shadow-lg"
          />
          
          {/* Points */}
          {data.map((val, i) => {
              const x = i * (width / (data.length - 1));
              const y = height - (val / 100) * height;
              return (
                <g key={i} className="group cursor-pointer">
                    {/* Invisible hit area for easier hovering */}
                    <circle cx={x} cy={y} r="20" fill="transparent" />
                    
                    {/* Visible Dot */}
                    <circle 
                        cx={x} 
                        cy={y} 
                        r="5" 
                        fill="#fff" 
                        stroke="#d97706" 
                        strokeWidth="2.5" 
                        className="transition-all duration-300 group-hover:scale-150 group-hover:stroke-amber-600 shadow-sm" 
                    />
                    
                    {/* Tooltip */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x={x - 24} y={y - 45} width="48" height="28" rx="6" fill="#0f172a" stroke="#334155" />
                        <path d={`M ${x} ${y - 12} L ${x - 5} ${y - 17} L ${x + 5} ${y - 17} Z`} fill="#0f172a" />
                        <text x={x} y={y - 27} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            {val}%
                        </text>
                    </g>
                </g>
              );
          })}
       </svg>
       
       {/* X-Axis Labels */}
       <div className="absolute -bottom-2 w-full flex justify-between text-xs text-stone-500 font-medium uppercase tracking-wider px-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <span key={i} className={`text-center w-8 ${i === new Date().getDay() - 1 ? 'text-amber-500 font-bold' : ''}`}>{day}</span>
          ))}
       </div>
    </div>
  );
};

const TrendBarChart: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const data = [
        { label: 'Exam Wk', height: 40, impact: '-30%', sub: 'Attendance Drop', saved: '180kg', color: 'bg-stone-700' },
        { label: 'Normal', height: 65, impact: 'Baseline', sub: 'Standard Ops', saved: '45kg', color: 'bg-stone-600' },
        { label: 'Festival', height: 95, impact: '+45%', sub: 'Guest Influx', saved: '210kg', color: 'bg-amber-500' },
        { label: 'Rainy', height: 80, impact: '+25%', sub: 'Cafeteria Pref.', saved: '95kg', color: 'bg-amber-600' },
        { label: 'Holiday', height: 20, impact: '-85%', sub: 'Hostel Vacancy', saved: '350kg', color: 'bg-stone-800' },
    ];

    return (
        <div className="h-64 mt-8 w-full relative select-none" onMouseLeave={() => setHoveredIndex(null)}>
             {/* Background Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[100, 75, 50, 25, 0].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-stone-800/50 border-t border-dashed border-stone-800"></div>
                ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-between gap-3 px-2">
                {data.map((item, i) => (
                    <div 
                        key={i} 
                        className="flex-1 h-full flex items-end justify-center relative group"
                        onMouseEnter={() => setHoveredIndex(i)}
                    >
                         {/* Hover Tooltip - Positioned above the bar */}
                         <div className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-32 bg-stone-900/95 backdrop-blur-md p-3 rounded-xl border border-stone-700 shadow-2xl z-20 transition-all duration-300 pointer-events-none ${hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                            <div className="text-xl font-serif font-bold text-white">{item.impact}</div>
                            <div className="text-[10px] text-stone-400 font-medium mb-2">{item.sub}</div>
                            <div className="pt-2 border-t border-stone-800 flex items-center gap-1 text-[10px] font-bold text-green-400">
                                <span>Saved:</span>
                                <span className="text-white">{item.saved}</span>
                            </div>
                            {/* Arrow */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-900 border-b border-r border-stone-700 rotate-45"></div>
                         </div>

                        {/* Bar */}
                        <div 
                            style={{ height: `${item.height}%` }} 
                            className={`w-full rounded-t-md relative overflow-hidden transition-all duration-300 ${
                                hoveredIndex === i 
                                ? 'bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] brightness-110' 
                                : hoveredIndex !== null 
                                    ? 'bg-stone-800 opacity-40 grayscale' 
                                    : item.color
                            }`}
                        >
                            {/* Scanline effect on hover */}
                             <div className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2 w-full transition-transform duration-1000 ${hoveredIndex === i ? 'translate-y-full' : '-translate-y-full'}`}></div>
                        </div>

                        {/* X-Axis Label */}
                        <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${hoveredIndex === i ? 'text-white' : 'text-stone-500'}`}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ScenarioComparison: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    baselineLabel: string; 
    baselineValue: number; 
    eventLabel: string; 
    eventValue: number;
    unit: string;
}> = ({ icon, title, description, baselineLabel, baselineValue, eventLabel, eventValue, unit }) => {
    const max = Math.max(baselineValue, eventValue);
    const baselineWidth = (baselineValue / max) * 100;
    const eventWidth = (eventValue / max) * 100;

    return (
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 bg-stone-800 rounded-lg text-amber-500 shadow-lg">{icon}</div>
                <div>
                    <strong className="block text-white text-sm uppercase tracking-wide font-bold mb-1">{title}</strong>
                    <p className="text-stone-400 text-xs leading-relaxed font-medium">{description}</p>
                </div>
            </div>
            
            {/* Mini Charts */}
            <div className="space-y-3 pl-1">
                {/* Baseline */}
                <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-stone-500 font-medium">{baselineLabel}</span>
                    <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div style={{ width: `${baselineWidth}%` }} className="h-full bg-stone-600 rounded-full"></div>
                    </div>
                    <span className="w-12 text-right text-stone-500 font-mono">{baselineValue}{unit}</span>
                </div>
                
                {/* Event */}
                <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-amber-500 font-bold">{eventLabel}</span>
                    <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                         <div style={{ width: `${eventWidth}%` }} className="h-full bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
                    </div>
                    <span className="w-12 text-right text-white font-mono font-bold">{eventValue}{unit}</span>
                </div>
            </div>
        </div>
    )
}

/* --- VERTEX DIAGRAM COMPONENT --- */

const ArchitectureBlock: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-stone-900 border border-stone-800 rounded-xl shadow-sm min-w-[120px]">
        <div className="text-stone-400 mb-2">{icon}</div>
        <span className="text-xs font-bold text-stone-300 uppercase tracking-wide text-center">{label}</span>
    </div>
);

export const AnalyticsPage: React.FC = () => {
  // Chart Data State
  const [chartData, setChartData] = useState<number[]>([45, 52, 49, 62, 58, 40, 35]);
  const [loading, setLoading] = useState(false);

  // Simulate new AI prediction fetch on date change
  const handleDateChange = (date: number) => {
      setLoading(true);
      // Simulate network delay and data regeneration
      setTimeout(() => {
          const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 30);
          setChartData(newData);
          setLoading(false);
      }, 600);
  };

  return (
    <div className="pt-20">
      
      {/* 1. HERO */}
      <ParallaxSection className="py-20 md:py-32 px-6 bg-stone-50 relative overflow-hidden z-0">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
            <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <BrainCircuit size={14} />
                    Powered by Vertex AI
                </div>
                <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 text-stone-900 leading-[0.95]">
                    Prediction is the <br/>
                    <span className="font-serif italic text-stone-600 font-medium">ultimate prevention.</span>
                </h1>
                <p className="text-xl text-stone-600 font-normal max-w-2xl mx-auto leading-relaxed text-balance">
                    We don't just manage waste; we stop it from existing. 
                    Our models analyze historical patterns to tell kitchens exactly what to cook.
                </p>
            </FadeIn>
        </div>
      </ParallaxSection>

      {/* 2. DEMAND PREDICTION WITH CALENDAR */}
      <ParallaxSection className="py-24 px-6 bg-stone-50 border-y border-stone-100 relative overflow-hidden z-10">
        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                
                {/* Text & Calendar Column */}
                <div className="lg:col-span-4 space-y-8">
                     <FadeIn>
                        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">The 92% Accuracy Curve</h2>
                        <p className="text-stone-600 leading-relaxed mb-8">
                            Select a date to view the AI's consumption forecast. Our model adapts to holidays, weekends, and academic schedules in real-time.
                        </p>
                        
                        {/* THE FUNCTIONAL CALENDAR */}
                        <div className="relative z-10">
                            <CalendarWidget onDateSelect={handleDateChange} />
                        </div>
                    </FadeIn>
                </div>

                {/* Chart Column */}
                <div className="lg:col-span-8">
                    <FadeIn delay={200}>
                        <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] border border-stone-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                            
                            {/* Decorative Background Elements - Adjusted for Dark Mode */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-stone-800 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 opacity-50 pointer-events-none"></div>

                            {/* Chart Header */}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="p-1.5 bg-amber-900/40 text-amber-500 rounded-lg border border-amber-800/50">
                                            <BarChart2 size={16} />
                                        </div>
                                        <h3 className="font-bold text-xl text-white tracking-tight">Weekly Demand Forecast</h3>
                                    </div>
                                    <p className="text-sm text-stone-400 pl-9 font-medium">Predicted consumption vs actuals</p>
                                </div>
                                <div className="text-right">
                                    <div className={`transition-opacity duration-300 ${loading ? 'opacity-100' : 'opacity-0'} inline-block mr-2`}>
                                         <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-full border border-green-800">
                                        98% Confidence
                                    </span>
                                </div>
                            </div>

                            {/* Chart Explanation/Guide */}
                            <div className="relative z-10 mb-6 pl-9 pr-4 flex items-start gap-2">
                                <Info size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-stone-400 leading-relaxed max-w-lg font-medium">
                                    <span className="font-bold text-stone-200">How to read:</span> The glowing amber line represents the AI's predicted consumption trend for the upcoming week. Higher peaks indicate days with expected higher footfall. Hover over dots to see exact percentage values.
                                </p>
                            </div>

                            {/* The Line Chart */}
                            <div className={`transition-all duration-700 ease-in-out relative z-10 ${loading ? 'blur-sm opacity-60 scale-[0.99]' : 'blur-0 opacity-100 scale-100'}`}>
                                <LineChart data={chartData} />
                            </div>

                            {/* Legend */}
                            <div className="flex gap-8 text-sm mt-8 justify-center border-t border-stone-800 pt-6 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-900"></span>
                                    <span className="text-stone-300 font-bold text-xs uppercase tracking-wide">AI Prediction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-0.5 border-b-2 border-dashed border-stone-600"></span>
                                    <span className="text-stone-500 font-bold text-xs uppercase tracking-wide">Historical Baseline</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
      </ParallaxSection>

      {/* 3. CONTEXTUAL AWARENESS (Event Impact) */}
      <ParallaxSection className="py-24 px-6 bg-stone-900 text-stone-50 relative overflow-hidden z-20">
        {/* Background Sparkles */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                
                {/* IMPROVED VISIBILITY CHART CARD */}
                <FadeIn delay={100} className="order-2 md:order-1">
                     <div className="bg-stone-950 p-8 md:p-10 rounded-3xl border border-stone-800 backdrop-blur-md shadow-2xl relative group hover:border-stone-700 transition-all duration-500">
                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                         
                         <div className="flex justify-between items-start mb-6">
                             <div>
                                 <h3 className="font-bold text-2xl text-stone-100">Event Impact</h3>
                                 <p className="text-stone-400 text-xs mt-1 font-medium">Correlation: Weather & Events vs. Waste</p>
                             </div>
                             <div className="p-2 bg-stone-800 rounded-lg border border-stone-700">
                                 <TrendingUp className="text-amber-500" size={20} />
                             </div>
                         </div>
                         
                         {/* The Visible Chart */}
                         <TrendBarChart />

                         {/* Footer data */}
                         <div className="mt-6 pt-6 border-t border-stone-800 flex justify-between text-xs text-stone-500 font-mono font-medium">
                             <span>DATA SOURCE: CAMPUS_API_V2</span>
                             <span>UPDATED: LIVE</span>
                         </div>
                     </div>
                </FadeIn>

                <FadeIn className="order-1 md:order-2">
                    <div className="mb-6 inline-block p-3 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20"><CalendarIcon /></div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-6">Beyond Simple Averages</h2>
                    <p className="text-stone-300 leading-relaxed mb-8 text-lg font-normal">
                        A simple average fails when it rains, during exams, or on festival days. 
                        Our engine ingests academic calendars and weather APIs to adjust procurement orders dynamically.
                    </p>
                    
                    {/* SCENARIO COMPARISON CHARTS */}
                    <div className="space-y-4">
                        <ScenarioComparison 
                            icon={<Umbrella size={20} />}
                            title="Heavy Rain Detected"
                            description="Students prefer indoor cafeteria meals over going out."
                            baselineLabel="Avg Day"
                            baselineValue={420}
                            eventLabel="Rainy Day"
                            eventValue={485}
                            unit=""
                        />
                        
                        <ScenarioComparison 
                            icon={<BookOpen size={20} />}
                            title="Exam Week"
                            description="Dinner attendance drops as students study in libraries/dorms."
                            baselineLabel="Avg Day"
                            baselineValue={420}
                            eventLabel="Exam Day"
                            eventValue={310}
                            unit=""
                        />
                    </div>
                </FadeIn>
            </div>
        </div>
      </ParallaxSection>

      {/* 4. ARCHITECTURE DIAGRAM */}
      <ParallaxSection className="py-32 px-6 bg-stone-50 relative overflow-hidden z-30">
        <div className="container mx-auto max-w-5xl relative z-10">
            <FadeIn>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-medium text-stone-900 mb-4">Inside the Engine</h2>
                    <p className="text-stone-500 font-medium">How raw data becomes actionable intelligence.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                        <ArchitectureBlock label="Mess Logs" icon={<Database size={20}/>} />
                        <ArchitectureBlock label="Weather API" icon={<Sun size={20}/>} />
                        <ArchitectureBlock label="Calendar" icon={<CalendarIcon size={20}/>} />
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block w-12 h-[2px] bg-stone-300 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-stone-300 rotate-45"></div>
                    </div>
                    
                    {/* The Brain */}
                    <div className="w-48 h-48 bg-stone-900 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative z-10 border-4 border-stone-800">
                        <BrainCircuit size={48} className="mb-2 text-amber-500 animate-pulse" />
                        <span className="font-serif font-bold text-lg">Vertex AI</span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-500 mt-1 font-bold">Processing</span>
                    </div>

                     {/* Arrow */}
                     <div className="hidden md:block w-12 h-[2px] bg-stone-300 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-stone-300 rotate-45"></div>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col gap-4">
                         <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl shadow-sm max-w-xs">
                            <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase text-xs tracking-wide">
                                <TrendingUp size={16} />
                                Output
                            </div>
                            <div className="text-2xl font-serif font-bold text-white mb-1">Cook 420 Meals</div>
                            <div className="text-xs text-stone-400 font-medium">Confidence Interval: 94%</div>
                         </div>
                    </div>
                </div>
            </FadeIn>
        </div>
      </ParallaxSection>

      {/* 5. SOLUTIONS GRID */}
      <ParallaxSection className="py-24 px-6 bg-stone-50 border-t border-stone-100 z-40">
        <div className="container mx-auto max-w-6xl">
            <FadeIn>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Budget Optimized", desc: "Kitchens save an average of 18% on procurement costs by buying only what is needed." },
                        { title: "Freshness Guaranteed", desc: "Food is cooked to demand, ensuring students eat fresh meals, not reheated leftovers." },
                        { title: "Zero Landfill", desc: "Any remaining margin of error is instantly routed to NGOs, ensuring zero organic waste." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-stone-900 rounded-2xl hover:scale-[1.02] transition-all duration-300 border border-stone-800 shadow-xl group">
                            <h3 className="font-serif text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                            <p className="text-stone-400 font-normal text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
      </ParallaxSection>

    </div>
  );
};