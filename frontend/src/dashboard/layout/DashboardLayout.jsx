import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  active,
  setActive,
  title,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div
        className="
          fixed bottom-0 left-0 right-0 z-40
          md:static md:inset-y-0 md:w-64
        "
      >
        <Sidebar active={active} setActive={setActive} />
      </div>

      <div className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        <Topbar title={title} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
