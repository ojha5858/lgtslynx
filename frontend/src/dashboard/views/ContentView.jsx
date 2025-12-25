import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import {
  FaMagic,
  FaBrain,
  FaRocket,
  FaCalendarAlt,
  FaLayerGroup,
  FaCopy,
  FaCheck,
  FaLightbulb,
  FaCat
} from "react-icons/fa";
import { generateContentStrategy } from "../../api/indexingApi";

export default function ContentStrategistView() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const logsEndRef = useRef(null);
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const clusters = [
    { name: "Technical SEO", count: 12 },
    { name: "Content Marketing", count: 8 },
    { name: "Backlink Strategies", count: 5 },
  ];

  const generateStrategy = async () => {
    if (!keyword.trim()) {
      setLogs(prev => [...prev, { type: "error", message: "Please enter a keyword first.", time: new Date().toLocaleTimeString() }]);
      return;
    }

    setLogs([]);
    setResult(null);
    setLoading(true);

    try {
      setLogs([{ type: "info", message: `Initializing AI agent for: "${keyword}"...`, time: new Date().toLocaleTimeString() }]);

      const res = await generateContentStrategy({ keyword });

      if (res.logs) setLogs(res.logs);
      setResult(res.result || null);
    } catch (err) {
      setLogs(prev => [...prev, { type: "error", message: err.message || "Failed to generate strategy.", time: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  const copyStrategy = () => {
    if (!result) return;
    const text = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">

      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white shadow-sm">
          <FaCat size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">LGTS <span className="text-accent italic">Lynx</span> Strategy</h1>
          <p className="text-xs text-slate-500">AI-Powered Content Planning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        <Card className="p-6 bg-white shadow-sm border border-slate-200 h-full">
          <div className="space-y-6">

            <div className="flex items-center gap-2 mb-2">
              <FaMagic className="text-accent" />
              <h2 className="text-lg font-bold text-slate-800">AI Content Strategist</h2>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Target Keyword / Niche
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateStrategy()}
                placeholder="e.g. Sustainable Coffee"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <FaLightbulb className="text-accent" /> Enter a broad topic for best results.
              </p>
            </div>

            <button
              onClick={generateStrategy}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-sm flex items-center justify-center gap-2 ${loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-accent hover:bg-accent/90 active:scale-[0.98]"
                }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FaRocket /> Generate Strategy
                </>
              )}
            </button>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Sample Clusters
              </p>
              <div className="space-y-2">
                {clusters.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setKeyword(c.name)}
                    className="w-full group flex justify-between items-center bg-slate-50 hover:bg-accent/10 border border-slate-200 hover:border-accent/30 rounded-lg px-4 py-2.5 transition-all text-left"
                  >
                    <span className="text-sm font-medium text-slate-700">{c.name}</span>
                    <span className="text-xs bg-white text-accent border border-accent/20 px-2 py-0.5 rounded font-bold group-hover:bg-accent group-hover:text-white transition-colors">
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-0 overflow-hidden h-[500px] flex flex-col border border-slate-200 shadow-sm bg-white">

          <div className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-[0_2px_10px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2 text-slate-800">
              <FaBrain className="text-slate-400" />
              <h3 className="font-bold text-lg">Strategy Output</h3>
            </div>
            {result && (
              <button
                onClick={copyStrategy}
                className="text-xs font-medium flex items-center gap-1.5 text-slate-500 hover:text-accent transition-colors bg-slate-50 px-3 py-1.5 rounded border border-slate-200 hover:border-accent"
              >
                {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                {copied ? "Copied" : "Copy JSON"}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 scroll-smooth">

            {!logs.length && !result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 px-6">
                <div className="w-16 h-16 bg-white border-2 border-dashed border-accent/30 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <FaMagic className="text-2xl text-accent" />
                </div>
                <h4 className="text-slate-700 font-bold text-lg">Ready to Ideate</h4>
                <p className="text-sm max-w-xs mt-1">Enter a niche keyword on the left to generate a comprehensive content map.</p>
              </div>
            )}

            {(loading || (logs.length > 0 && !result)) && (
              <div className="bg-slate-900 text-slate-300 rounded-xl p-5 font-mono text-xs shadow-inner min-h-[300px] flex flex-col">
                <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2 text-slate-500">
                  <span className="text-accent">●</span> AI Agent Terminal
                </div>
                <div className="space-y-1.5 flex-1">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-600 shrink-0">[{log.time}]</span>
                      <span className={log.type === "error" ? "text-red-400" : "text-accent/80"}>
                        &gt; {log.message}
                      </span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-fade-in">

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Pillar Strategy
                  </h5>
                  <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-accent border-y border-r border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-1">
                      Main Pillar Page
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {result.pillar || `The Ultimate Guide to ${keyword}: Everything You Need to Know`}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FaLayerGroup /> Topic Clusters
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(result.clusters || []).map((c, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-accent transition-all group">
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-accent transition-colors">
                            {c.title}
                          </h3>
                          <span className="shrink-0 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 uppercase">
                            {c.content_type || "BLOG POST"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {(c.keywords || []).slice(0, 3).map((k, ki) => (
                            <span key={ki} className="text-[10px] bg-accent/10 text-accent px-2 py-1 rounded border border-accent/20 font-medium">
                              #{k}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FaCalendarAlt /> Posting Schedule
                  </h5>
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    {(result.calendar || []).map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded bg-accent/10 text-accent border border-accent/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {i + 1}
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{c.topic}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {c.date || "TBD"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
