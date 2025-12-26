import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaLayerGroup, FaCogs, FaShieldAlt, FaTag, FaCircle } from "react-icons/fa"; 
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features", icon: <FaLayerGroup /> },
    { name: "Process", href: "#how-it-works", icon: <FaCogs /> },
    { name: "Security", href: "#security", icon: <FaShieldAlt /> },
    { name: "Pricing", href: "#pricing", icon: <FaTag /> },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between">
            
            <div className="flex items-center gap-2 group cursor-pointer shrink-0">
              <img src={logo} alt="Logo" className="h-8 w-auto transition-transform group-hover:scale-110" />
              <span className={`text-xl font-black tracking-tighter transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
                LGTS <span className="text-accent italic font-serif">Lynx</span>
              </span>
            </div>

            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent ${
                    scrolled ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block shrink-0">
              <a 
                href="#get-started" 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  scrolled ? "bg-slate-900 text-white shadow-lg" : "bg-accent text-black shadow-xl shadow-accent/20"
                }`}
              >
                Launch Console
              </a>
            </div>

            <button 
              className={`md:hidden text-2xl z-[120] transition-transform active:scale-90 ${scrolled || isOpen ? "text-slate-900" : "text-white"}`} 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[105] transition-opacity duration-500 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed top-0 right-0 h-[100dvh] w-[300px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out md:hidden flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="Logo" className="h-6 w-auto" />
            <span className="text-lg font-black tracking-tighter text-slate-900">LYNX <span className="text-accent italic">PRO</span></span>
          </div>
          <div className="flex items-center gap-2">
             <FaCircle className="text-green-500 text-[6px] animate-pulse" />
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-left">Global Nodes Online</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 text-left">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
            >
              <span className="text-lg opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all">
                {link.icon}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-6">
          <a 
            href="#get-started" 
            onClick={() => setIsOpen(false)}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 shadow-xl"
          >
            Launch Console
          </a>
        </div>
      </div>
    </>
  );
}