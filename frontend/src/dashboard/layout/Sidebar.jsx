import React from "react";
import {
  FaHome,
  FaBolt,
  FaBrain,
  FaTools,
} from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  const items = [
    { id: "dashboard", label: "Overview", icon: FaHome },
    { id: "indexing", label: "Indexing", icon: FaBolt },
    { id: "content", label: "Content", icon: FaBrain },
    { id: "tools", label: "Tools", icon: FaTools },
  ];

  return (
    <aside
      className="
        bg-white
        border-t md:border-t-0 md:border-r border-slate-200
        fixed md:static
        bottom-0 left-0 right-0
        h-16 md:h-screen md:w-64
        flex md:flex-col
        z-50
      "
    >
      {/* Logo Area (Hidden on Mobile) */}
      <div className="hidden md:block px-6 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold tracking-wide text-slate-800 flex items-center gap-2">
           LGTS <span className="italic text-accent">Lynx</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          SEO Automation Platform
        </p>
      </div>

      <nav
        className="
          flex-1 flex md:flex-col
          justify-around md:justify-start
          items-center md:items-stretch
          px-2 md:px-4
          py-1 md:py-6
          md:space-y-1
        "
      >
        {items.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                flex flex-col md:flex-row
                items-center gap-1 md:gap-3
                flex-1 md:flex-none
                w-full
                text-[10px] md:text-sm font-medium
                px-2 md:px-4
                py-2 md:py-3
                rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "text-accent bg-accent/5 shadow-sm ring-1 ring-accent/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon
                size={isActive ? 20 : 18}
                className={`transition-colors ${isActive ? "text-accent" : "text-slate-400"}`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Pro Plan Card (Hidden on Mobile) */}
      <div className="hidden md:block p-4 border-t border-slate-100">
        <div className="rounded-2xl p-5 bg-slate-900 text-white relative overflow-hidden group">
          {/* Decorative Circle */}
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent/20 rounded-full group-hover:bg-accent/30 transition-colors blur-xl"></div>
          
          <p className="text-xs font-medium text-slate-300 mb-1">
            Pro Plan Active
          </p>
          <p className="text-lg font-bold mb-3">
            12 Days Left
          </p>

          <button
            className="
              w-full bg-accent text-black
              text-xs py-2 rounded-lg
              hover:bg-white hover:text-accent transition-all
              font-bold shadow-lg shadow-accent/20
            "
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
