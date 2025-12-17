import { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./views/DashboardHome";
import IndexingView from "./views/IndexingView";
import ContentView from "./views/ContentView";
import ToolsView from "./views/ToolsView";

const pageTitles = {
  dashboard: "Overview",
  indexing: "Indexing",
  content: "Content",
  tools: "Tools",
  search: "Search",
};

export default function SEOPlatform() {
  const [active, setActive] = useState("dashboard");

  return (
    <DashboardLayout
      active={active}
      setActive={setActive}
      title={pageTitles[active]}
    >
      <div className="text-slate-600">
        {active === "dashboard" && <DashboardHome />}
        {active === "indexing" && <IndexingView />}
        {active === "content" && <ContentView />}
        {active === "tools" && <ToolsView />}
      </div>
    </DashboardLayout>
  );
}
