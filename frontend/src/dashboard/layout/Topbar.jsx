import { FaBell, FaSearch } from "react-icons/fa";

export default function Topbar({ title, user }) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-accent/20 transition-all w-64">
          <FaSearch className="text-slate-400 mr-2" size={14} />
          <input
            type="text"
            placeholder="Search keywords..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder:text-slate-400"
          />
        </div>

        <button
          className="
            hidden sm:block
            text-sm px-4 py-2 rounded-xl border border-slate-200
            text-slate-600 hover:bg-slate-50 hover:text-slate-900
            transition-colors font-medium
          "
        >
          Docs
        </button>

        <button
          aria-label="Notifications"
          className="
            relative p-2.5 rounded-xl
            text-slate-500 hover:bg-slate-100 hover:text-accent
            transition-all
          "
        >
          <FaBell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">

          {user && (
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-slate-700 leading-tight">
                {user.displayName}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Admin
              </p>
            </div>
          )}

          <div
            className="
              w-10 h-10 rounded-full
              bg-gradient-to-br from-accent to-yellow-400
              p-[2px] cursor-pointer shadow-sm hover:shadow-md transition-shadow
            "
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {user && user.image ? (
                <img
                  src={user.image}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-bold text-accent text-sm">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
