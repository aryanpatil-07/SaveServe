import React, { useState } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { Sparkles, ArrowRight, Check, HeartHandshake, Users, AlertCircle } from 'lucide-react';

export const GetInvolvedPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student Volunteer',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
       // Optional based on UI, but user asked for "make sure all fields are filled correctly"
       // I'll keep message optional as is standard for "Message (Optional)" field, 
       // but if they put text, maybe sanitize? 
       // Actually, let's enforce a minimum length if they DO type something.
       if (formData.message.length > 0 && formData.message.length < 10) {
           newErrors.message = 'Message is too short (min 10 chars).';
       }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
        // 1. Store in "Database" (Browser LocalStorage for frontend persistence)
        const currentDb = JSON.parse(localStorage.getItem('saveServe_submissions') || '[]');
        const newEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...formData
        };
        localStorage.setItem('saveServe_submissions', JSON.stringify([...currentDb, newEntry]));

        // 2. Send Email via FormSubmit (Free Email API)
        // Note: For the first submission, FormSubmit will send an activation email to aryanpatil0700@gmail.com
        // You MUST click the activation link in that email for future emails to arrive.
        const response = await fetch("https://formsubmit.co/ajax/aryanpatil0700@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                message: formData.message,
                _subject: `SaveServe: New ${formData.role} Application`,
                _template: 'table',
                _captcha: 'false', // Disable captcha for smoother AJAX experience
                _replyto: formData.email // Allows you to reply directly to the submitter
            })
        });

        const result = await response.json();

        if (response.ok) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', role: 'Student Volunteer', message: '' });
        } else {
            console.error("Submission failed:", result);
            alert("Something went wrong. Please try again later.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Please check your internet connection.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      
      {/* 1. HERO & INTRO */}
      <ParallaxSection className="py-20 px-6 relative flex-grow flex items-center z-0">
        <div className="container mx-auto max-w-4xl relative z-10">
            <FadeIn>
                {/* Headline */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-8 shadow-xl">
                        <Sparkles size={14} className="text-amber-500" />
                        The Final Step
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 mb-6 leading-[0.95] tracking-tight">
                        The table is <br/>
                        <span className="italic text-stone-500 font-medium">long enough.</span>
                    </h1>
                </div>

                {/* Explanation / Why It Matters */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                     <p className="text-xl md:text-2xl text-stone-600 font-normal leading-relaxed text-balance">
                        Hunger isn't solved by algorithms alone. It is solved when a vendor decides to track waste, when a student decides to volunteer, and when communities decide to care.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 font-bold text-sm">
                        <Users size={16} />
                        <span>Join 450+ Active Partners</span>
                    </div>
                </div>

                {/* 3. INTERACTIVE FORM */}
                <div className="bg-stone-900 rounded-3xl shadow-2xl border border-stone-800 p-8 md:p-12 max-w-2xl mx-auto relative overflow-hidden transition-all duration-700 ease-in-out group">
                    
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className={`space-y-6 relative z-10 transition-opacity duration-500 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`} noValidate>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-stone-400">Your Name <span className="text-amber-500">*</span></label>
                                    <input 
                                        name="name"
                                        type="text" 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Jane Doe" 
                                        className={`w-full bg-stone-800 border ${errors.name ? 'border-red-500' : 'border-stone-700'} rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-500 text-white font-medium`}
                                    />
                                    {errors.name && (
                                        <div className="flex items-center gap-1 text-red-400 text-xs font-medium animate-pulse">
                                            <AlertCircle size={12} /> {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-stone-400">Email Address <span className="text-amber-500">*</span></label>
                                    <input 
                                        name="email"
                                        type="email" 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="jane@example.com" 
                                        className={`w-full bg-stone-800 border ${errors.email ? 'border-red-500' : 'border-stone-700'} rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-500 text-white font-medium`}
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-1 text-red-400 text-xs font-medium animate-pulse">
                                            <AlertCircle size={12} /> {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wide text-stone-400">I am a...</label>
                                <div className="relative">
                                    <select 
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-white cursor-pointer appearance-none font-medium"
                                    >
                                        <option>Student Volunteer</option>
                                        <option>Mess/Kitchen Vendor</option>
                                        <option>NGO / Shelter Representative</option>
                                        <option>University Administrator</option>
                                        <option>Developer / Contributor</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                        <ArrowRight size={14} className="rotate-90"/>
                                    </div>
                                </div>
                            </div>

                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wide text-stone-400">Message (Optional)</label>
                                <textarea 
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="How would you like to contribute?" 
                                    className={`w-full bg-stone-800 border ${errors.message ? 'border-red-500' : 'border-stone-700'} rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-500 text-white resize-none font-medium`}
                                />
                                {errors.message && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs font-medium animate-pulse">
                                        <AlertCircle size={12} /> {errors.message}
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-stone-900 font-bold text-lg py-4 rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 group mt-4 disabled:opacity-50 disabled:cursor-wait"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>Take Your Seat <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center relative z-10 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-green-900/20 border border-green-800">
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-white mb-4">Welcome to the table.</h3>
                            <p className="text-stone-400 max-w-sm mx-auto mb-8 font-medium">
                                We've received your details and emailed a confirmation to the team. A community manager will reach out to you within 24 hours.
                            </p>
                            <button onClick={() => setIsSubmitted(false)} className="text-stone-500 text-sm hover:text-stone-300 underline underline-offset-4 transition-colors font-bold">
                                Submit another response
                            </button>
                        </div>
                    )}
                </div>
            </FadeIn>
        </ParallaxSection>

      {/* 4. FINAL CLOSING */}
      <ParallaxSection className="py-12 bg-stone-900 text-stone-400 text-center border-t border-stone-800 z-10">
        <div className="container mx-auto px-6">
            <FadeIn delay={200}>
                <div className="flex items-center justify-center gap-3 mb-4 opacity-50">
                    <HeartHandshake />
                </div>
                <p className="font-serif italic text-xl md:text-2xl text-stone-300 mb-2 font-medium">
                    "When you have more than you need, build a longer table, not a higher fence."
                </p>
            </FadeIn>
        </div>
      </ParallaxSection>

    </div>
  );
};