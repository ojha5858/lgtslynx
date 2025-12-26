import { useState, useEffect } from "react";
import Card from "../components/Card";
import {
    FaCopy,
    FaCheckCircle,
    FaGoogle,
    FaShieldAlt,
    FaExclamationTriangle,
    FaGlobe,
    FaLink,
    FaUserPlus,
    FaKey
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
            const data = await verifyGscConnection(targetDomain.trim());
            if (data.success && data.sites && data.sites.length > 0) {
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

    if (loading) return <div className="p-10 text-center text-lg text-slate-500 animate-pulse font-medium">Synchronizing with GSC...</div>;

    return (
        <div className="max-w-8xl mx-auto pb-12 px-4 sm:px-6">
            
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Project Settings</h1>
                <p className="text-base text-slate-500 mt-1">Configure your Google Search Console connection for automated indexing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <Card className="lg:col-span-2 p-6 sm:p-8 bg-white border-slate-200 shadow-sm">
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 border-b border-slate-50 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                                <FaGoogle size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 leading-tight">Google Indexing API</h2>
                                <p className="text-sm text-slate-500 font-medium">Service Account Integration</p>
                            </div>
                        </div>
                        
                        <div className="shrink-0">
                            {status === "success" ? (
                                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100 shadow-sm">
                                    <FaCheckCircle className="animate-pulse" /> Connection Verified
                                </div>
                            ) : (
                                <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                                    Status: Not Connected
                                </div>
                            )}
                        </div>
                    </div>

                    {status === "error" && (
                        <div className="mb-8 bg-red-50 border border-red-100 text-red-700 p-5 rounded-2xl flex gap-4 animate-fade-in shadow-sm">
                            <FaExclamationTriangle className="mt-1 shrink-0 text-xl" />
                            <div className="text-sm">
                                <p className="font-bold text-base mb-1">Handshake Failed</p>
                                <p className="opacity-90 leading-relaxed">Please ensure the service email has been added as an <b>Owner</b> in GSC and the URL format matches your property exactly.</p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="mb-8 bg-accent/5 border border-accent/20 p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-accent font-bold text-sm uppercase tracking-wider">
                                <FaGlobe /> Authorized Domains
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {verifiedDomains.map((domain, i) => (
                                    <span key={i} className="text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                                        {domain}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        
                        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold shadow-sm shadow-accent/40">1</span>
                                <h3 className="font-bold text-slate-800 text-base">Copy Identity Credentials</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative group">
                                    <code className="block w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-600 font-mono break-all pr-10 shadow-inner">
                                        {SERVICE_EMAIL}
                                    </code>
                                    <FaKey className="absolute right-4 top-4 text-slate-300 group-hover:text-accent transition-colors" />
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-8 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                                        copied ? "bg-green-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700 active:scale-95"
                                    }`}
                                >
                                    {copied ? <><FaCheckCircle /> Copied</> : <><FaCopy /> Copy Email</>}
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold shadow-sm shadow-accent/40">2</span>
                                <h3 className="font-bold text-slate-800 text-base">Assign Permissions</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0 hidden sm:block">
                                    <FaUserPlus className="text-accent text-3xl" />
                                </div>
                                <ol className="list-decimal list-outside text-sm text-slate-600 space-y-3 ml-4 leading-relaxed font-medium">
                                    <li>Access <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-accent font-bold hover:underline decoration-accent/30 underline-offset-4">Google Search Console</a>.</li>
                                    <li>Navigate to <b>Settings</b> &gt; <b>Users and permissions</b>.</li>
                                    <li>Select <b>Add User</b>, paste the email, and choose <b>Owner</b> permission.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold shadow-sm shadow-accent/40">3</span>
                                <h3 className="font-bold text-slate-800 text-base">Final Verification</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <FaLink className="absolute left-4 top-4 text-slate-300" />
                                    <input
                                        type="text"
                                        value={targetDomain}
                                        onChange={(e) => setTargetDomain(e.target.value)}
                                        placeholder="https://mysite.com OR sc-domain:site.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all outline-none shadow-sm placeholder:text-slate-400 font-medium"
                                        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                    />
                                </div>
                                <button
                                    onClick={handleVerify}
                                    disabled={verifying}
                                    className={`px-10 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                                        verifying ? "bg-slate-400 cursor-not-allowed" : "bg-accent/90 hover:bg-accent hover:shadow-accent/30"
                                    }`}
                                >
                                    {verifying ? (
                                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Validating...</>
                                    ) : "Verify Now"}
                                </button>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 ml-1 font-semibold italic">
                                *Tip: Use the exact URL property as shown in your GSC dashboard.
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="lg:sticky lg:top-8 space-y-6">
                    <Card className="p-6 bg-slate-900 border-0 shadow-xl overflow-hidden relative group">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500"></div>
                        
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-accent/20 rounded-xl text-accent border border-accent/30">
                                <FaShieldAlt className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base mb-2 tracking-wide">Secure Verification</h3>
                                <p className="text-slate-400 text-[13px] leading-relaxed font-medium">
                                    Google requires you to explicitly claim ownership. This high-security protocol ensures that only authorized accounts can push indexing signals for your specific domain.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <div className="px-6 py-2 border-l-2 border-slate-100">
                        <p className="text-[11px] text-slate-400 uppercase font-bold tracking-widest leading-loose">
                            System Requirements:<br/>
                            • Domain Ownership verified in GSC<br/>
                            • Active LGTS indexing plan
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}