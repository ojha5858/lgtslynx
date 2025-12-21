import { useState } from "react";
import Card from "../components/Card";
import { FaCopy, FaCheckCircle, FaGoogle, FaShieldAlt } from "react-icons/fa";

export default function SettingsView() {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState("pending");

  const SERVICE_EMAIL = "saas-agent@lgts-lynx.iam.gserviceaccount.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SERVICE_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyConnection = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setStatus("success"); 
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Project Settings</h1>
        <p className="text-slate-500 mt-1">Connect your Google Search Console to enable Bulk Indexing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <Card className="lg:col-span-2 p-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaGoogle size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Google Indexing API</h2>
                    <p className="text-sm text-slate-500">Service Account Connection</p>
                </div>
                <div className="ml-auto">
                    {status === "success" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <FaCheckCircle /> Connected
                        </span>
                    ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                            Not Connected
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-700 text-sm mb-2">Step 1: Copy Service Email</h3>
                    <p className="text-xs text-slate-500 mb-3">Copy this email address to add it as a user in your Search Console.</p>
                    
                    <div className="flex gap-2">
                        <code className="flex-1 bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-600 font-mono">
                            {SERVICE_EMAIL}
                        </code>
                        <button 
                            onClick={copyToClipboard}
                            className={`px-4 py-2 rounded font-medium text-sm transition-all ${copied ? "bg-green-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700"}`}
                        >
                            {copied ? "Copied!" : <div className="flex items-center gap-2"><FaCopy /> Copy</div>}
                        </button>
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-700 text-sm mb-2">Step 2: Add to Google Search Console</h3>
                    <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 ml-1">
                        <li>Go to <a href="https://search.google.com/search-console" target="_blank" className="text-blue-600 hover:underline">Google Search Console</a>.</li>
                        <li>Select your property (website).</li>
                        <li>Go to <strong>Settings</strong> &gt; <strong>Users and permissions</strong>.</li>
                        <li>Click <strong>Add User</strong>, paste the email above, and select <strong>Owner</strong> permission.</li>
                    </ol>
                </div>

                <button 
                    onClick={verifyConnection}
                    disabled={verifying || status === "success"}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                        status === "success" 
                        ? "bg-green-500 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {verifying ? "Checking Permissions..." : status === "success" ? "Connection Verified Successfully" : "Verify Connection"}
                </button>
            </div>
        </Card>

        <div className="space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-100">
                <FaShieldAlt className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-bold text-slate-800 mb-2">Why "Owner" Access?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Google requires "Owner" level permission for Service Accounts to publish indexing requests via the API.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                    <strong>Note:</strong> We do not read your search data. We only use this permission to <em>submit</em> URLs for crawling.
                </p>
            </Card>

            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-6 text-center">
                <p className="text-slate-400 text-sm italic">
                    "Bulk Indexing feature will be unlocked automatically once verification is complete."
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}