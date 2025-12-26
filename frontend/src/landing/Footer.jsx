import { FaTwitter, FaLinkedin, FaGithub, FaGoogle } from "react-icons/fa6";
import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="LGTS Lynx Logo" className="h-8 w-auto" />
              <span className="text-white font-black tracking-tighter text-xl">
                LGTS <span className="text-accent italic font-serif">LYNX</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Accelerating search discovery with industrial-grade indexing protocols. Built for modern SEO teams.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#features" className="text-slate-500 hover:text-accent transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-500 hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#security" className="text-slate-500 hover:text-accent transition-colors">Security</a></li>
              <li><a href="/api-docs" className="text-slate-500 hover:text-accent transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/privacy" className="text-slate-500 hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-500 hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="/ethics" className="text-slate-500 hover:text-accent transition-colors">Ethical Usage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-black transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-black transition-all">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-black transition-all">
                <FaGithub size={18} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
              <FaGoogle /> Verified GSC Partner Tool
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © 2025 LGTS LYNX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <span>System Status: <span className="text-green-500">Operational</span></span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}