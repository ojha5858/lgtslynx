import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBolt, FaCheckCircle, FaClock, FaChartLine, 
  FaSpinner, FaExclamationTriangle,
  FaHistory, FaShieldAlt, FaPlus, FaMagic, FaListUl
} from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Card from "../components/Card";
import { getDashboardData } from "../../api/indexingApi";

const graphData = [
  { name: 'Mon', indexed: 40 }, { name: 'Tue', indexed: 30 }, { name: 'Wed', indexed: 65 },
  { name: 'Thu', indexed: 45 }, { name: 'Fri', indexed: 90 }, { name: 'Sat', indexed: 70 }, { name: 'Sun', indexed: 85 },
];

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        setLoading(true);
        const res = await getDashboardData();
        if (isMounted) {
          if (res.success) setData(res);
          else setError("Failed to fetch data.");
        }
      } catch (err) {
        if (isMounted) setError("Connection error.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadStats();
    return () => { isMounted = false; };
  }, []);

  if (loading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-slate-400 gap-3">
      <FaSpinner className="animate-spin text-accent" size={32} />
      <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500">Syncing Protocol...</span>
    </div>
  );

  const statsData = data?.stats || { totalIndexed: 0, pending: 0, failed: 0, credits: 0 };
  const recentActivity = data?.recentActivity || [];

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-20 md:pb-10 px-4 pt-4">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">V2.4.0 Live Pulse</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Link to="/indexing" className="flex-1 sm:flex-none justify-center bg-accent text-white px-5 py-2.5 rounded-xl text-[10px] font-black shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
                <FaPlus size={10} /> INDEXING
            </Link>
            <Link to="/content" className="flex-1 sm:flex-none justify-center bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                <FaMagic size={10} /> AI STRATEGY
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[320px]">
        
        <Card className="lg:col-span-8 p-5 md:p-8 flex flex-col border-slate-200 overflow-hidden shadow-sm h-[280px] lg:h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-[10px] md:text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <FaChartLine className="text-accent" /> Performance Matrix
                </h3>
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent"></div> <span className="text-[9px] font-bold text-slate-400">Signals</span></span>
                    <span className="text-[9px] font-black text-green-500 bg-green-50 px-2 py-1 rounded border border-green-100 uppercase">Stable</span>
                </div>
            </div>
            
            <div className="flex-1 w-full -ml-4 md:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                        <YAxis hide={true} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                        <Area 
                          type="monotone" 
                          dataKey="indexed" 
                          stroke="#f59e0b" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#chartGradient)" 
                          animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <Card className="p-6 bg-accent text-white border-0 shadow-xl shadow-accent/20 flex flex-col justify-between overflow-hidden relative group">
                <FaBolt className="absolute -right-4 -top-4 text-white/10 text-7xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-80 leading-none">Node Credits</p>
                    <h2 className="text-3xl font-black mt-2 tracking-tighter leading-none">{statsData.credits?.toLocaleString()}</h2>
                </div>
                <Link to="/indexing" className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-center transition-all mt-4">Refill Balance</Link>
            </Card>

            <Card className="p-6 bg-slate-900 border-0 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-3xl"></div>
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <FaShieldAlt className="text-accent" /> Integrity
                </h3>
                <div className="space-y-4">
                    <ProgressLine label="API Cluster" percent={99.9} color="bg-green-500" />
                    <ProgressLine label="Signals" percent={72} color="bg-accent" />
                </div>
            </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SmallStatBox label="Success" value={statsData.totalIndexed} icon={<FaCheckCircle/>} color="text-green-500" tag="STABLE" />
        <SmallStatBox label="Queue" value={statsData.pending} icon={<FaClock/>} color="text-amber-500" tag="ACTIVE" />
        <SmallStatBox label="Dropped" value={statsData.failed || 0} icon={<FaExclamationTriangle/>} color="text-red-500" tag="ERR" />
        <SmallStatBox label="Latency" value="1.1ms" icon={<FaBolt/>} color="text-blue-500" tag="FAST" />
      </div>

      <Card className="p-0 overflow-hidden border-slate-200 shadow-sm flex flex-col h-[350px]">
          <div className="px-5 py-4 border-b bg-slate-50/50 flex justify-between items-center shrink-0">
              <h3 className="font-black text-slate-800 text-[10px] md:text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <FaHistory className="text-slate-400" /> Signal Logs
              </h3>
              <Link to="/logs" className="text-[9px] font-black text-accent hover:underline uppercase tracking-widest">
                View All
              </Link>
          </div>
          <div className="overflow-y-auto divide-y divide-slate-50 flex-1 bg-white">
              {recentActivity.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 p-10 text-center">
                  <FaClock size={20} className="opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">No signals in queue</p>
                </div>
              ) : (
                recentActivity.map((job, idx) => (
                    <div key={idx} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${job.status === 'done' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`} />
                            <div className="flex flex-col truncate">
                              <span className="text-[12px] font-bold text-slate-700 truncate group-hover:text-accent transition-colors">{job.url}</span>
                              <span className="text-[8px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{job.status === 'done' ? 'Success' : 'Failed'}</span>
                            </div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-md shrink-0">
                          {new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                ))
              )}
          </div>
      </Card>
    </div>
  );
}

function ProgressLine({ label, percent, color }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                <span>{label}</span>
                <span className="text-slate-300">{percent}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}

function SmallStatBox({ label, value, icon, color, tag }) {
  return (
    <Card className="p-4 border-slate-100 shadow-sm flex items-center gap-3 group">
        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${color} shrink-0`}>{icon}</div>
        <div className="min-w-0">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none truncate flex items-center gap-1.5">
              {label} <span className="hidden xs:inline-block opacity-50">/</span> <span className="xs:inline-block hidden">{tag}</span>
            </p>
            <p className="text-lg font-black text-slate-800 tracking-tighter leading-none truncate">{value?.toLocaleString()}</p>
        </div>
    </Card>
  );
}