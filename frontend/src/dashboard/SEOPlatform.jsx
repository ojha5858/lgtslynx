import { useLocation, useNavigate } from "react-router-dom";
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

export default function SEOPlatform({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.replace("/", "");

  const activeTab = currentPath === "overview" ? "dashboard" : currentPath;

  const handleTabChange = (tabName) => {
    if (tabName === "dashboard") {
      navigate("/overview");
    } else {
      navigate(`/${tabName}`);
    }
  };

  return (
    <DashboardLayout
      user={user}
      active={activeTab}
      setActive={handleTabChange}
      title={pageTitles[activeTab] || "Overview"}
    >
      <div className="text-slate-600">
        {activeTab === "dashboard" && <DashboardHome />}
        {activeTab === "indexing" && <IndexingView />}
        {activeTab === "content" && <ContentView />}
        {activeTab === "tools" && <ToolsView />}
      </div>
    </DashboardLayout>
  );
}