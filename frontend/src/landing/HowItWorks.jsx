import { FaUpload, FaDatabase, FaGoogle, FaCheckDouble } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    { id: "01", title: "Ingestion", icon: <FaUpload />, color: "from-blue-500 to-cyan-500", log: "$ GET /urls.csv" },
    { id: "02", title: "Processing", icon: <FaDatabase />, color: "from-amber-500 to-orange-500", log: "SYNC: 100%" },
    { id: "03", title: "Injection", icon: <FaGoogle />, color: "from-red-500 to-pink-500", log: "API: SUCCESS" },
    { id: "04", title: "Indexing", icon: <FaCheckDouble />, color: "from-green-500 to-emerald-500", log: "CONFIRMED" },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">The Workflow</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">How LGTS Lynx <span className="text-slate-400">Forces Results.</span></h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl mb-6`}>{s.icon}</div>
              <h3 className="text-lg font-black text-slate-800 mb-2 uppercase">{s.title}</h3>
              <div className="mt-4 p-3 bg-slate-900 rounded-xl font-mono text-[9px] text-slate-400 border border-transparent group-hover:border-accent/50 transition-colors">
                <span className="text-accent">&gt;</span> {s.log}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}