"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden select-none px-6 text-center">
      {/* Fixed Noise Overlay for Organic Editorial Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Decorative Ambient Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-7 max-w-md relative z-10 flex flex-col items-center">
        {/* Animated Custom Yarn / Warn Alert Icon */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-16 h-16 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-warm-sm"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </motion.div>

        <div className="space-y-3">
          <h1 className="font-serif text-7xl font-bold text-accent tracking-tighter">404</h1>
          <h2 className="font-serif text-2xl font-bold text-ink tracking-tight">
            Đường chỉ len bị đứt...
          </h2>
          <p className="text-xs text-ink-muted leading-relaxed font-normal max-w-xs mx-auto text-balance">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được dời đi nơi khác. Hãy để chúng mình đưa bạn quay về ngôi nhà ấm áp.
          </p>
        </div>

        <motion.div 
          className="pt-2"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 100, damping: 18 }}
        >
          <Link
            href="/"
            className="pl-6 pr-2.5 py-2.5 rounded-btn bg-accent text-[#FFFCF7] flex items-center gap-4 font-semibold text-xs shadow-warm-md hover:bg-[#A96340] active:scale-[0.98] group transition-all duration-300"
          >
            <span>Quay về trang chủ</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-[#FFFCF7]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
