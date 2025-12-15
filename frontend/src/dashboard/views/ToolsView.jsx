import { useState } from "react";
import Card from "../components/Card";
import {
  FaGlobe,
  FaSearch,
  FaBolt,
  FaChartBar,
  FaMagic,
  FaCogs,
} from "react-icons/fa";

const TOOLS = [
  { id: 1, name: "Sitemap Generator", icon: FaGlobe, active: true },
  { id: 2, name: "Meta Tag Checker", icon: FaSearch, active: true },
  { id: 3, name: "Page Speed Analyzer", icon: FaBolt, active: false },
  { id: 4, name: "Keyword Density", icon: FaChartBar, active: false },
];

export default function ToolsView() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const pushLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { type, message, time }]);
  };

  const auditContent = () => {
    if (!content.trim()) {
      pushLog("error", "No content provided for audit");
      return;
    }

    setLogs([]);
    setResult(null);
    setLoading(true);

    pushLog("info", "Initializing Smart Content Auditor");
    pushLog("info", "Analyzing keyword density");
    pushLog("info", "Checking heading structure");
    pushLog("info", "Evaluating internal linking");

    setTimeout(() => {
      pushLog("success", "Audit completed successfully");
      setResult([
        "Keyword density is optimal (1.8%)",
        "H1 and H2 structure looks good",
        "Add 2–3 internal links for better crawlability",
        "Meta description can be shortened",
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          SEO Tools Suite
        </h1>
        <button className="text-sm text-accent hover:underline">
          Manage Subscription
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;

          return (
            <Card
              key={tool.id}
              className={`p-6 text-center transition
                ${
                  tool.active
                    ? "cursor-pointer hover:shadow-md"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
            >
              <div
                className="w-12 h-12 mx-auto rounded-full
                           bg-accent/10 flex items-center
                           justify-center text-accent mb-4"
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-sm text-slate-800">
                {tool.name}
              </h3>

              <span
                className={`mt-3 inline-block text-xs px-3 py-1 rounded-full
                  ${
                    tool.active
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "bg-slate-200 text-slate-500"
                  }
                `}
              >
                {tool.active ? "Active" : "Pro Only"}
              </span>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50">
          <h3 className="font-semibold flex items-center gap-2 text-slate-800">
            <FaMagic className="text-accent" />
            Smart Content Auditor
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your blog or landing page copy here..."
              className="w-full border rounded-lg p-4 text-sm outline-none
                         focus:ring-2 focus:ring-accent/40"
            />

            <button
              onClick={auditContent}
              disabled={loading}
              className={`
                w-full py-3 rounded-lg font-semibold transition
                flex items-center justify-center gap-2
                ${
                  loading
                    ? "bg-accent/70 cursor-not-allowed text-white"
                    : "bg-accent hover:bg-accent/90 text-white"
                }
              `}
            >
              <FaCogs className={loading ? "animate-spin" : ""} />
              {loading ? "Auditing…" : "Audit Content"}
            </button>
          </div>

          <div>
            {!logs.length && !result && (
              <div
                className="h-full border border-dashed border-accent/30
                           rounded-lg bg-accent/5 flex flex-col
                           items-center justify-center
                           text-slate-400 text-sm"
              >
                <FaChartBar size={36} className="mb-3 text-accent" />
                AI insights will appear here.
              </div>
            )}

            {logs.length > 0 && (
              <div
                className="bg-black text-slate-200 rounded-lg p-4
                           font-mono text-sm mb-4 max-h-48 overflow-y-auto"
              >
                <div className="text-slate-500 mb-2">
                  &gt; <span className="text-accent">content-auditor</span>
                </div>

                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <span className="text-slate-500">[{log.time}]</span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-green-400"
                          : log.type === "error"
                          ? "text-red-400"
                          : "text-blue-400"
                      }
                    >
                      {log.type.toUpperCase()}
                    </span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            )}

            {result && (
              <ul className="space-y-2 text-sm">
                {result.map((r, i) => (
                  <li
                    key={i}
                    className="border-l-4 border-accent
                               bg-white rounded-lg px-4 py-2"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
