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
        border-t md:border-t-0 md:border-r
        fixed md:static
        bottom-0 left-0 right-0
        h-16 md:h-screen md:w-64
        flex md:flex-col
        z-40
      "
    >
      <div className="hidden md:block px-4 py-6 border-b border-slate-200">
        <h2 className="text-xl font-bold tracking-wide text-gray-600">
          LGTS <span className="italic text-accent">Lynx</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Search & Indexing Platform
        </p>
      </div>

      <nav
        className="
          flex-1 flex md:flex-col
          justify-around md:justify-start
          items-center md:items-stretch
          px-2 md:px-4
          py-1 md:py-4
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
                items-center
                gap-1 md:gap-3
                flex-1 md:flex-none
                w-full
                text-xs md:text-sm
                px-2 md:px-4
                py-1.5 md:py-2
                rounded-md
                transition-colors
                ${
                  isActive
                    ? "text-accent md:bg-accent/10 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              <Icon size={18} className="md:text-base" />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:block p-4 border-t border-slate-100">
        <div className="rounded-lg p-4 text-white bg-accent">
          <p className="text-xs font-medium opacity-90 mb-1">
            Pro Plan
          </p>
          <p className="text-sm font-bold">
            12 Days Left
          </p>

          <button
            className="
              w-full mt-3 bg-white text-accent text-xs py-1.5 rounded
              hover:bg-slate-100 transition-colors font-semibold
            "
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
