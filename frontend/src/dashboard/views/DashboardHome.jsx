import Card from "../components/Card";
import { 
  FaBolt, 
  FaCheckCircle, 
  FaClock, 
  FaChartLine, 
  FaExternalLinkAlt 
} from "react-icons/fa";

export default function DashboardHome() {
  const stats = [
    { label: "Total Indexed", value: "1,284", icon: FaCheckCircle, color: "text-green-500", bg: "bg-green-50" },
    { label: "Pending Jobs", value: "12", icon: FaClock, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "Credits Left", value: "450", icon: FaBolt, color: "text-accent", bg: "bg-accent/10" },
    { label: "Avg. Success Rate", value: "94%", icon: FaChartLine, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  const recentActivity = [
    { url: "https://example.com/blog/seo-tips-2025", status: "Indexed", time: "2 mins ago" },
    { url: "https://example.com/products/leather-bag", status: "Submitted", time: "15 mins ago" },
    { url: "https://example.com/about-us", status: "Failed", time: "1 hour ago" },
    { url: "https://example.com/contact", status: "Indexed", time: "3 hours ago" },
    { url: "https://example.com/blog/marketing-guide", status: "Indexed", time: "5 hours ago" },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your indexing projects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 flex items-center gap-4 transition hover:shadow-md cursor-default">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Recent Indexing Activity</h3>
              <button className="text-xs text-accent font-semibold hover:underline">View All</button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {recentActivity.map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-2 h-2 rounded-full shrink-0 
                      ${item.status === 'Indexed' ? 'bg-green-500' : item.status === 'Failed' ? 'bg-red-500' : 'bg-yellow-500'}`} 
                    />
                    <a href="#" className="text-sm text-slate-600 truncate hover:text-accent flex items-center gap-2">
                        {item.url} <FaExternalLinkAlt size={10} className="opacity-50" />
                    </a>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-xs px-2 py-1 rounded font-bold
                      ${item.status === 'Indexed' ? 'bg-green-100 text-green-700' : 
                        item.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400 w-20 text-right">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
            
            <Card className="p-6 bg-[#1e1e1e] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <h3 className="font-bold text-lg mb-1 relative z-10">System Status</h3>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                    <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-green-400 font-mono">Operational</span>
                </div>

                <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">API Latency</span>
                        <span className="font-mono text-green-400">124ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Google Quota</span>
                        <span className="font-mono text-blue-400">185/200</span>
                    </div>
                </div>
            </Card>

            <Card className="p-6 border-l-4 border-accent">
                <h3 className="font-bold text-slate-800 mb-2">Pro Tip 💡</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Always check the <strong>SERP Preview</strong> before submitting. A good title increases CTR by 30%.
                </p>
            </Card>

        </div>
      </div>
    </div>
  );
}
