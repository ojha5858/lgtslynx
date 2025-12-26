import { FaShieldAlt, FaLock, FaUserShield, FaCheckCircle, FaChartLine, FaLockOpen } from "react-icons/fa";

export default function Security() {
  const rules = [
    { title: "White-Hat Protocol", desc: "100% compliant with Google Guidelines.", icon: <FaCheckCircle /> },
    { title: "GSC Native Sync", desc: "Official Search Console API integration.", icon: <FaLockOpen /> },
    { title: "Data Isolation", desc: "Your site data is AES-256 encrypted.", icon: <FaLock /> },
  ];

  return (
    <section id="security" className="py-20 bg-white relative overflow-hidden">
      <FaShieldAlt className="absolute -bottom-20 -right-20 text-slate-50 text-[300px] rotate-12" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <span className="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Compliance</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Built on <span className="text-slate-400">Trust,</span> Not Tricks.</h2>
          </div>
          <p className="text-slate-500 font-medium text-sm max-w-xs">Improvements without violations. Your domain authority is our priority.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rules.map((r, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all">
              <div className="text-accent text-2xl mb-4">{r.icon}</div>
              <h4 className="font-black text-slate-800 mb-2 uppercase text-sm">{r.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}