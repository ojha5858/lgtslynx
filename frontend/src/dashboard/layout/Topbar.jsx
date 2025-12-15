import { FaBell } from "react-icons/fa";

export default function Topbar({ title }) {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-slate-800">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search…"
          className="hidden md:block text-sm px-3 py-1.5 rounded-lg border
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          className="text-sm px-4 py-2 rounded-lg border
                     text-slate-600 hover:bg-slate-100"
        >
          Docs
        </button>

        <button
          aria-label="Notifications"
          className="relative p-2 rounded hover:bg-slate-100 text-slate-600"
        >
          <FaBell size={22} />
        </button>

        <div
          className="w-9 h-9 rounded-full bg-slate-700
                     text-white flex items-center justify-center
                     text-sm font-bold cursor-pointer"
        >
          SO
        </div>
      </div>
    </header>
  );
}
