import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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
    { name: "Features", href: "#features" },
    { name: "Process", href: "#how-it-works" },
    { name: "Security", href: "#security" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className={`text-xl font-black tracking-tighter ${scrolled ? "text-slate-900" : "text-white"}`}>
            LGTS <span className="text-accent italic">Lynx</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`text-[10px] font-black uppercase tracking-widest transition-colors ${scrolled ? "text-slate-500 hover:text-accent" : "text-slate-300 hover:text-white"}`}>
              {link.name}
            </a>
          ))}
        </nav>

        <a href="#get-started" className={`hidden md:block px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scrolled ? "bg-slate-900 text-white shadow-lg" : "bg-accent text-black"}`}>
          Launch Console
        </a>

        <button className={`md:hidden text-2xl ${scrolled ? "text-slate-900" : "text-white"}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}