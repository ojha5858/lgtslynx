import { useState, useEffect } from "react";
import Card from "../components/Card";
import {
    FaCopy,
    FaCheckCircle,
    FaGoogle,
    FaShieldAlt,
    FaExclamationTriangle,
    FaGlobe
} from "react-icons/fa";
import { verifyGscConnection, getSavedConnectionStatus } from "../../api/indexingApi";

export default function SettingsView() {
    const [copied, setCopied] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [status, setStatus] = useState("pending");
    const [verifiedDomains, setVerifiedDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [targetDomain, setTargetDomain] = useState("");

    const SERVICE_EMAIL = "indexing-bot@lgtslynx.iam.gserviceaccount.com";

    useEffect(() => {
        checkSavedStatus();
    }, []);

    const checkSavedStatus = async () => {
        try {
            const data = await getSavedConnectionStatus();
            if (data.success && data.sites.length > 0) {
                setStatus("success");
                setVerifiedDomains(data.sites);
                if (data.sites.length > 0) setTargetDomain(data.sites[0]);
            }
        } catch (error) {
            console.error("Error checking status:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(SERVICE_EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVerify = async () => {
        if (!targetDomain.trim()) return;
        setVerifying(true);
        setStatus("pending");
        try {
            const data = await verifyGscConnection(targetDomain);
            if (data.success && data.sites.length > 0) {
                setStatus("success");
                setVerifiedDomains(data.sites);
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setVerifying(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-lg text-slate-500 animate-pulse">Checking status...</div>;

    return (
        <div className="max-w-6xl mx-auto pb-12 px-4 sm:px-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Project Settings</h1>
                <p className="text-base text-slate-500 mt-2">Connect Google Search Console to enable Bulk Indexing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <Card className="lg:col-span-2 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                <FaGoogle size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Google Indexing API</h2>
                                <p className="text-sm text-slate-500 font-medium">Service Account Connection</p>
                            </div>
                        </div>
                        <div className="ml-auto mt-2 sm:mt-0">
                            {status === "success" ? (
                                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                                    <FaCheckCircle /> Connected
                                </span>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold">
                                    Not Connected
                                </span>
                            )}
                        </div>
                    </div>

                    {status === "error" && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex gap-3 text-base">
                            <FaExclamationTriangle className="mt-1 shrink-0" />
                            <div>
                                <p className="font-bold">Verification Failed.</p>
                                <p className="mt-1 text-sm">Check if email is Owner in GSC & URL is correct.</p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-xl">
                            <span className="text-base text-green-800 font-bold flex items-center gap-2 mb-2">
                                <FaGlobe /> Verified Domains:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {verifiedDomains.map((domain, i) => (
                                    <span key={i} className="text-sm font-mono text-green-700 bg-white px-3 py-1 rounded border border-green-200 shadow-sm">
                                        {domain}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        
                        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-slate-800 text-base">Step 1: Copy Service Email</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <code className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-700 font-mono break-all flex items-center shadow-sm">
                                    {SERVICE_EMAIL}
                                </code>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-6 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap shadow-sm ${copied ? "bg-green-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700"}`}
                                >
                                    {copied ? "Copied!" : "Copy Email"}
                                </button>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-800 text-base mb-3">Step 2: Add to Google Search Console</h3>
                            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 ml-1 leading-relaxed">
                                <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">Google Search Console</a>.</li>
                                <li>Select property &gt; Go to <strong>Settings</strong> &gt; <strong>Users and permissions</strong>.</li>
                                <li>Click <strong>Add User</strong> &gt; Paste the email &gt; Select <strong>Owner</strong> permission.</li>
                            </ol>
                        </div>

                        <div className="pt-2">
                            <label className="block text-base font-semibold text-slate-800 mb-3">Step 3: Enter Domain & Verify</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={targetDomain}
                                    onChange={(e) => setTargetDomain(e.target.value)}
                                    placeholder="https://site.com OR sc-domain:site.com"
                                    className="w-full sm:flex-1 border border-slate-300 rounded-lg px-5 py-3 text-base text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-sm"
                                />
                                <button
                                    onClick={handleVerify}
                                    disabled={verifying}
                                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-base text-white transition-all whitespace-nowrap shadow-md ${
                                        verifying ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"
                                    }`}
                                >
                                    {verifying ? "Verifying..." : "Verify Now"}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 ml-1">
                                *Ensure you enter the exact Property URL (e.g. <code>https://...</code> or <code>sc-domain:...</code>)
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="sticky top-6">
                    <Card className="p-6 bg-blue-50 border-blue-100 shadow-sm">
                        <div className="flex items-start gap-4">
                            <FaShieldAlt className="text-blue-600 text-2xl mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-slate-800 text-base mb-2">Secure Verification</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Google requires you to explicitly claim your domain ownership. This ensures that only you can manage indexing for your websites.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}