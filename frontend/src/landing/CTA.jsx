import React from 'react';
import { FaArrowRight, FaShieldHalved, FaBolt, FaTerminal } from "react-icons/fa6"; 

export default function CTA({ onLaunch }) {
  return (
    <section id="get-started" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl mb-8 group cursor-default hover:border-accent/30 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Nodes Ready for Deployment</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
            Stop Waiting. <br />
            <span className="text-slate-300 italic">Start Ranking.</span>
          </h2>

          <p className="max-w-xl text-slate-500 text-lg font-medium mb-10 leading-relaxed">
            Join the elite SEO circle using LGTS Lynx to force Googlebot discovery in real-time. 
            <span className="text-slate-900 font-bold block mt-2"> Your first 50 URLs are on us.</span>
          </p>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-yellow-500 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            
            <button
              onClick={onLaunch}
              className="relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-black transition-all active:scale-95 shadow-2xl"
            >
              Launch Console <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            <div className="flex items-center gap-2.5">
              <FaShieldHalved className="text-green-500 text-sm" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">No Credit Card Required</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <div className="flex items-center gap-2.5">
              <FaBolt className="text-accent text-sm" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Instant API Access</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <div className="flex items-center gap-2.5">
              <FaTerminal className="text-slate-400 text-sm" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GSC Protocol V3.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}