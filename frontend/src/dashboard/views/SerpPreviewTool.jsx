import { useState } from "react";
import { FaGoogle, FaMobileAlt, FaDesktop, FaInfoCircle } from "react-icons/fa";

export default function SerpPreviewTool() {
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    url: "example.com/blog/how-to-rank-fast",
  });
  
  const [view, setView] = useState("desktop");

  const TITLE_LIMIT = 60;
  const DESC_LIMIT = 160;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2 text-slate-800">
          <FaGoogle className="text-blue-500" /> 
          Google SERP Simulator
        </h3>
        <div className="flex bg-white rounded-lg border p-1">
            <button 
                onClick={() => setView("desktop")}
                className={`p-2 rounded-md transition-all ${view === 'desktop' ? 'bg-slate-100 text-blue-600' : 'text-slate-400'}`}
            >
                <FaDesktop size={14} />
            </button>
            <button 
                onClick={() => setView("mobile")}
                className={`p-2 rounded-md transition-all ${view === 'mobile' ? 'bg-slate-100 text-blue-600' : 'text-slate-400'}`}
            >
                <FaMobileAlt size={14} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        
        <div className="p-6 space-y-5 border-r border-slate-100">
          <div>
            <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">SEO Title</label>
                <span className={`text-xs font-bold ${metadata.title.length > TITLE_LIMIT ? "text-red-500" : "text-green-600"}`}>
                    {metadata.title.length} / {TITLE_LIMIT} px
                </span>
            </div>
            <input
              type="text"
              className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter your page title..."
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
            />
            <div className="h-1 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${metadata.title.length > TITLE_LIMIT ? "bg-red-500" : "bg-blue-500"}`} 
                style={{ width: `${Math.min((metadata.title.length / TITLE_LIMIT) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Meta Description</label>
                <span className={`text-xs font-bold ${metadata.description.length > DESC_LIMIT ? "text-red-500" : "text-green-600"}`}>
                    {metadata.description.length} / {DESC_LIMIT} px
                </span>
            </div>
            <textarea
              className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              rows={4}
              placeholder="Enter meta description..."
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            />
             <div className="h-1 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${metadata.description.length > DESC_LIMIT ? "bg-red-500" : "bg-blue-500"}`} 
                style={{ width: `${Math.min((metadata.description.length / DESC_LIMIT) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-xs flex gap-2 items-start">
            <FaInfoCircle className="mt-0.5 shrink-0" />
            <p>Keep titles under 60 characters to prevent Google from cutting them off with "..." ellipses.</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex items-center justify-center">
            <div className={`w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 transition-all duration-300 ${view === 'mobile' ? 'max-w-[360px]' : ''}`}>
                
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold border border-slate-200">
                        IMG
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs text-slate-900 font-medium">Your Website Name</span>
                        <span className="text-[11px] text-slate-500">{metadata.url || "https://example.com"}</span>
                    </div>
                    <div className="ml-auto text-slate-400">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                    </div>
                </div>

                <h3 className="text-[20px] leading-snug text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 break-words">
                    {metadata.title || "Your Page Title Will Appear Here - Google Search"}
                </h3>

                <p className="text-[14px] leading-normal text-[#4d5156] break-words">
                    {metadata.description || "This is how your description will look on Google. Make sure to include your main keywords here to attract more clicks from users."}
                </p>

            </div>
        </div>

      </div>
    </div>
  );
}