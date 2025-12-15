import { useState } from "react";
import Card from "../components/Card";
import { FaMagic, FaBrain } from "react-icons/fa";

export default function ContentStrategistView() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const clusters = [
    { name: "Technical SEO", count: 12 },
    { name: "Content Marketing", count: 8 },
    { name: "Backlink Strategies", count: 5 },
  ];

  const pushLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { type, message, time }]);
  };

  const generateStrategy = () => {
    if (!keyword.trim()) {
      pushLog("error", "Keyword / niche is required");
      return;
    }

    setLogs([]);
    setResult(null);
    setLoading(true);

    pushLog("info", "Initializing Gemini content strategist");
    pushLog("info", `Analyzing niche: "${keyword}"`);

    setTimeout(() => {
      pushLog("success", "Search intent analyzed");
      pushLog("info", "Generating topic clusters");

      setTimeout(() => {
        pushLog("success", "Content calendar generated");
        setResult([
          "Pillar article: Complete guide to " + keyword,
          "Cluster: How " + keyword + " impacts SEO",
          "Cluster: Tools for " + keyword,
          "Cluster: Common mistakes in " + keyword,
        ]);
        setLoading(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ===== LEFT PANEL ===== */}
      <Card className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <FaMagic className="text-indigo-600" />
            AI Content Strategist
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generate high-ranking content ideas using Gemini.
          </p>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Target Keyword / Niche
          </label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Sustainable Coffee"
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={generateStrategy}
          disabled={loading}
          className={`
            w-full py-3 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-slate-400 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }
          `}
        >
          {loading ? "Generating…" : "Generate Strategy"}
        </button>

        {/* Existing Clusters */}
        <div className="border-t pt-4">
          <p className="text-xs font-semibold text-slate-400 mb-3">
            YOUR EXISTING CLUSTERS
          </p>

          <div className="space-y-2">
            {clusters.map((c) => (
              <div
                key={c.name}
                className="flex justify-between items-center
                           bg-slate-50 rounded-lg px-3 py-2 text-sm"
              >
                <span>{c.name}</span>
                <span className="text-xs bg-white border rounded px-2 py-0.5">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ===== RIGHT PANEL (AI CONSOLE) ===== */}
      <Card className="lg:col-span-2 p-6">
        {!logs.length && !result && (
          <div
            className="h-full border-2 border-dashed rounded-xl
                       flex flex-col items-center justify-center
                       text-center text-slate-400"
          >
            <FaBrain className="text-4xl mb-4 text-indigo-600" />
            <p className="max-w-md text-sm">
              Enter a niche to generate an AI-powered content strategy.
            </p>
          </div>
        )}

        {/* Console */}
        {logs.length > 0 && (
          <div className="bg-black text-slate-200 rounded-xl p-4 font-mono text-sm mb-4 max-h-60 overflow-y-auto">
            <div className="text-slate-500 mb-2">
              &gt; gemini-console
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

        {/* Result */}
        {result && (
          <div>
            <h3 className="font-semibold mb-3 text-slate-800">
              Generated Content Plan
            </h3>
            <ul className="space-y-2 text-sm">
              {result.map((item, i) => (
                <li
                  key={i}
                  className="border rounded-lg px-4 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
