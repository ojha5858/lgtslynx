import { FaCheck, FaRocket, FaBuilding, FaLeaf } from "react-icons/fa";

export default function Pricing() {
  const plans = [
    { name: "Starter", price: "0", credits: "50 URLs", recommended: false },
    { name: "Pro", price: "999", credits: "2,000 URLs", recommended: true },
    { name: "Agency", price: "2,999", credits: "15,000 URLs", recommended: false },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 text-white">
          <span className="text-accent font-black text-[10px] uppercase tracking-widest mb-2 block">Investment</span>
          <h2 className="text-4xl font-black tracking-tighter">Pricing For <span className="text-slate-500 italic">Scale.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border-2 flex flex-col items-center transition-all ${p.recommended ? "bg-white border-accent scale-105 shadow-2xl" : "bg-slate-900 border-white/5 text-white"}`}>
              <h3 className="text-[10px] font-black uppercase opacity-50 mb-4">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-black ${p.recommended ? "text-slate-900" : "text-white"}`}>₹{p.price}</span>
                <span className="text-xs opacity-50">/mo</span>
              </div>
              <div className="bg-accent/10 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-10">{p.credits} PER MONTH</div>
              <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${p.recommended ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>Start Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}