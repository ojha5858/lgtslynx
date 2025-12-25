import React from "react";
import {
  FaHome,
  FaBolt,
  FaBrain,
  FaTools,
  FaGoogle,
  FaCogs,
} from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  const items = [
    { id: "dashboard", label: "Overview", icon: FaHome },
    { id: "indexing", label: "Indexing", icon: FaBolt },
    { id: "content", label: "Content", icon: FaBrain },
    { id: "serp", label: "SERP", icon: FaGoogle },
    { id: "tools", label: "Tools", icon: FaTools },
    { id: "settings", label: "Settings", icon: FaCogs },
  ];

  return (
    <aside
      className="
        bg-white
        /* Mobile: Fixed at bottom */
        fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-slate-200 flex items-center justify-around px-2
        
        /* Desktop: Full height, static relative to parent wrapper */
        md:static md:h-full md:w-full md:flex-col md:border-none md:justify-start md:px-0 md:py-0
      "
    >
      <div className="hidden md:block px-6 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold tracking-wide text-slate-800 flex items-center gap-2">
           LGTS <span className="italic text-accent">Lynx</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          SEO Automation Platform
        </p>
      </div>

      <nav className="flex md:flex-col w-full md:px-4 md:py-6 md:space-y-1 justify-around md:justify-start">
        {items.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                flex flex-col md:flex-row
                items-center justify-center md:justify-start
                gap-1 md:gap-3
                text-[10px] md:text-sm font-medium
                px-2 md:px-4
                py-2 md:py-3
                rounded-xl
                transition-all duration-200
                w-full
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
              <span className="mt-1 md:mt-0">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </aside>
  );
}