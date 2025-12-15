import { useState } from "react";
import Card from "../components/Card";
import { FaBolt, FaLink } from "react-icons/fa";

export default function IndexingView() {
  const [url, setUrl] = useState("");
  const [pingGSC, setPingGSC] = useState(true);
  const [updateSitemap, setUpdateSitemap] = useState(true);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const pushLog = (type, message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { type, message, time }]);
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      pushLog("error", "Invalid URL provided");
      return;
    }

    setLogs([]);
    setLoading(true);

    pushLog("info", "Initializing indexing workflow");
    pushLog("info", "Authenticating with Google OAuth2");

    setTimeout(() => {
      pushLog("success", "Access token refreshed");

      pingGSC
        ? pushLog("info", "Pinging Google Search Console")
        : pushLog("warn", "Search Console ping skipped");

      updateSitemap
        ? pushLog("info", "Updating sitemap.xml")
        : pushLog("warn", "Sitemap update skipped");

      setTimeout(() => {
        pushLog("success", "URL submitted successfully");
        pushLog("info", "Waiting for Google crawl signal…");
        setLoading(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <FaBolt className="text-accent" />
          Fast Indexing Module
        </h1>
        <p className="text-slate-500 mt-1">
          Trigger indexing signals & monitor server output
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Target URL
            </label>

            <div className="flex border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent/40">
              <span className="px-3 py-2 bg-slate-100 text-slate-600 text-sm border-r flex items-center gap-2">
                <FaLink size={12} />
                https://
              </span>

              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com/new-page"
                className="flex-1 px-3 py-2 outline-none text-sm text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={pingGSC}
                onChange={() => setPingGSC(!pingGSC)}
                className="accent-accent"
              />
              <span className="text-sm font-medium text-slate-700">
                Ping Google Search Console
              </span>
            </label>

            <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={updateSitemap}
                onChange={() => setUpdateSitemap(!updateSitemap)}
                className="accent-accent"
              />
              <span className="text-sm font-medium text-slate-700">
                Update Sitemap.xml
              </span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              w-full py-3 rounded-lg font-semibold
              flex items-center justify-center gap-2
              transition-all duration-200
              ${
                loading
                  ? "bg-accent/70 text-white cursor-not-allowed"
                  : "bg-accent text-white hover:bg-accent/90 active:scale-[0.98]"
              }
            `}
          >
            <FaBolt className={loading ? "animate-pulse" : ""} />
            {loading ? "Processing…" : "Instant Submit"}
          </button>
        </div>
      </Card>

      {logs.length > 0 && (
        <div className="bg-black text-slate-200 rounded-xl p-4 font-mono text-sm max-h-64 overflow-y-auto">
          <div className="text-slate-500 mb-3">
            &gt; <span className="text-accent">server-console</span>
          </div>

          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <span className="text-slate-500">[{log.time}]</span>

              <span
                className={
                  log.type === "success"
                    ? "text-green-400"
                    : log.type === "warn"
                    ? "text-yellow-400"
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
    </div>
  );
}
