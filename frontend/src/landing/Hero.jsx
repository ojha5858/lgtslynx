import { FaArrowRight, FaPlay, FaCheckCircle, FaRocket } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">v2.4 Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
              Rank Faster. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white italic font-serif">Not Later.</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Force Google discovery via direct API injection. Bypass standard crawl cycles and index your content in under 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#get-started"
                className="bg-accent text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(245,158,11,0.2)] hover:-translate-y-1 hover:shadow-accent/30 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Get Started Free <FaArrowRight className="text-[10px]" />
              </a>              <button className="border border-white/10 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <FaPlay className="text-[10px] text-accent" /> View Demo
              </button>
            </div>
          </div>

          <div className="flex-1 w-full relative group">
            <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-all duration-700">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-800"></div><div className="w-2 h-2 rounded-full bg-slate-800"></div></div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase flex items-center gap-2">
                  <FaRocket className="text-accent animate-bounce" /> node-01.lynx
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-[8px] uppercase text-slate-500 mb-1">Health</div>
                  <div className="text-2xl font-black text-white">99.8%</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-[8px] uppercase text-slate-500 mb-1">Time</div>
                  <div className="text-2xl font-black text-white">4.2h</div>
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-[9px] text-green-400/80 space-y-1">
                <div>&gt; SYNCING GSC... DONE</div>
                <div>&gt; PUSHING API... SUCCESS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}