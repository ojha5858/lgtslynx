import React from "react";
import { FaGoogle, FaTimes, FaLock, FaFingerprint } from "react-icons/fa";

export default function AuthModal({ isOpen, onClose, onGoogleLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-all">
      <div className="bg-slate-50 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20 animate-in fade-in zoom-in duration-300">
        
        <div className="bg-white px-8 py-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center">
              <FaFingerprint className="text-accent text-xs" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Security Gate</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors p-1"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-8 space-y-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
              Get <span className="text-accent italic">Started.</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">
              Authorized access only
            </p>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <button
                type="button"
                onClick={onGoogleLogin}
                className="relative w-full flex items-center justify-center gap-4 bg-slate-900 text-white py-4 rounded-2xl hover:bg-black transition-all font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer shadow-xl"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#fff" d="M12 23c3.11 0 5.71-1.03 7.62-2.81l-3.57-2.77c-.99.66-2.23 1.06-4.05 1.06-3.11 0-5.75-2.1-6.7-4.93H1.23v2.86C3.14 20.32 7.24 23 12 23z"/>
                  <path fill="#fff" d="M5.3 14.55c-.24-.72-.37-1.49-.37-2.3c0-.81.13-1.58.37-2.3V7.09H1.23C.45 8.65 0 10.5 0 12.5s.45 3.85 1.23 5.41l4.07-3.16z"/>
                  <path fill="#fff" d="M12 4.75c1.69 0 3.21.58 4.41 1.73l3.31-3.31C17.71 1.05 15.11 0 12 0 7.24 0 3.14 2.68 1.23 6.94l4.07 3.16c.95-2.83 3.59-4.93 6.7-4.93z"/>
                </svg>
                Sign In with Google
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2rem] p-6 group/lock">
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[4px] flex flex-col items-center justify-center">
              <div className="bg-slate-900 text-accent p-2.5 rounded-xl shadow-lg mb-2">
                <FaLock size={12} />
              </div>
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.3em]">Manual Entry Locked</span>
            </div>

            <div className="space-y-3 opacity-20">
              <div className="h-10 bg-slate-100 rounded-xl"></div>
              <div className="h-10 bg-slate-100 rounded-xl"></div>
            </div>
          </div>

          <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest pt-2">
            Protected by industrial-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}