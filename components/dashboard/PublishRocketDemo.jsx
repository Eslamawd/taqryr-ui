"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ------------------------------------------------------------
// Rocket Launch Overlay — Polished Version
// ------------------------------------------------------------

const T = {
  ar: {
    publish: "نشر الإعلان",
    launching: "جاري إطلاق حملتك…",
    toPlatforms: "جاري الإرسال إلى المنصّات:",
    launched: "تم إطلاق حملتك بنجاح!",
    viewCampaign: "عرض الحملة",
    close: "إغلاق",
    title: "إطلاق بصري لإعلانك",
    desc: 'عند الضغط على "نشر" تظهر لقطة إطلاق صاروخ مع تقدّم الإرسال إلى المنصّات، ثم احتفال بالنجاح.',
    platforms: "المنصّات",
  },
  en: {
    publish: "Publish Ad",
    launching: "Launching your campaign…",
    toPlatforms: "Dispatching to platforms:",
    launched: "Your campaign is live!",
    viewCampaign: "View Campaign",
    close: "Close",
    title: "Visual Launch for your Ad",
    desc: 'When you hit "Publish", a rocket launch animation confirms dispatch to ad platforms, followed by a success celebration.',
    platforms: "Platforms",
  },
};

const DEFAULT_PLATFORMS = ["Snapchat", "Meta", "Google", "TikTok", "YouTube"];

// Sequence hook
function useSequence(totalSteps, playing, stepDelay = 550) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!playing) return;
    setStep(0);
    let s = 0;
    const id = setInterval(() => {
      s++;
      setStep(Math.min(s, totalSteps));
      if (s >= totalSteps) clearInterval(id);
    }, stepDelay);
    return () => clearInterval(id);
  }, [playing, totalSteps, stepDelay]);
  return step;
}

// Stars background
function Stars({ count = 60 }) {
  const arr = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {arr.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2.6,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Confetti celebration
function Confetti({ show }) {
  const prefersReducedMotion = useReducedMotion();
  const arr = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        r: Math.random() * 360,
        d: 50 + Math.random() * 50,
        s: 6 + Math.random() * 10,
      })),
    []
  );
  if (!show) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {arr.map((c) => (
        <motion.span
          key={c.id}
          className="absolute block"
          style={{
            top: 0,
            left: `${c.x}%`,
            width: c.s,
            height: c.s,
            background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
            borderRadius: 2,
          }}
          initial={{ y: -20, rotate: 0, opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: [0.8, 0] }
              : { y: `${c.d}vh`, rotate: c.r, opacity: [0.9, 0.95, 0.9] }
          }
          transition={{
            duration: 1.8 + Math.random() * 0.8,
            delay: Math.random() * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Rocket SVG
function RocketSVG({ flame = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 128 256"
      className="w-24 h-48 drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="fin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient id="flame" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ae" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ef4444" />
        </radialGradient>
      </defs>
      <g>
        <path
          d="M64 6c18 20 24 46 24 72v56H40v-56C40 52 46 26 64 6z"
          fill="url(#body)"
          stroke="#475569"
          strokeWidth="2"
        />
        <circle
          cx="64"
          cy="76"
          r="10"
          fill="#1f2937"
          stroke="#93c5fd"
          strokeWidth="2"
        />
        <path d="M40 132l-24 24 24-8v-16z" fill="url(#fin)" opacity="0.9" />
        <path d="M88 132l24 24-24-8v-16z" fill="url(#fin)" opacity="0.9" />
      </g>
      <motion.ellipse
        cx="64"
        cy="196"
        rx={12 + flame * 4}
        ry={26 + flame * 8}
        fill="url(#flame)"
        style={{ filter: "blur(0.5px)" }}
        animate={{ ry: [24, 30, 24], rx: [12, 14, 12], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M64 220c0 0-10 10-10 20 0 0 8-4 10-4s10 4 10 4c0-10-10-20-10-20z"
        fill="#cbd5e1"
        opacity="0.7"
        animate={{ opacity: [0.4, 0.8, 0.4], y: [0, 3, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Checklist
function PlatformChecklist({ items, lang, step }) {
  const label = T[lang].platforms;
  return (
    <div className="mt-4 bg-white/10 backdrop-blur border border-white/15 rounded-xl p-3 text-xs sm:text-sm">
      <div className="opacity-90 mb-2">{label}</div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            <span
              className={`inline-flex w-4 h-4 rounded ${
                i < step ? "bg-emerald-400" : "bg-white/30"
              }`}
              aria-hidden
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Progress bar
function ProgressBar({ value }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className="mt-4 h-2 rounded-full bg-white/15 overflow-hidden"
      aria-label="progress"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-300 to-violet-400 transition-all duration-300"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
export default function PublishRocketDemo({
  lang = "ar",
  platforms = DEFAULT_PLATFORMS,
  open,
  done,
  onClose,
  successPosition = "below",
}) {
  const step = useSequence(platforms.length, open && !done, 650);
  const progress = open
    ? Math.min(100, Math.round((step / platforms.length) * 100))
    : 0;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const L = T[lang];
  const successClass =
    successPosition === "above"
      ? "absolute top-10 left-1/2 -translate-x-1/2 z-30"
      : "absolute bottom-24 left-1/2 -translate-x-1/2 z-30";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b z-[999] from-slate-900 via-slate-950 to-black" />
          <Stars />

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl text-center text-white"
          >
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${successClass} text-xl sm:text-2xl font-extrabold`}
              >
                {L.launched}
              </motion.div>
            )}

            {!done && (
              <>
                <div className="text-lg sm:text-xl font-bold mb-1">
                  {L.launching}
                </div>
                <div className="text-xs sm:text-sm opacity-80 mb-3">
                  {L.toPlatforms}
                </div>
              </>
            )}

            {/* Rocket */}
            <div className="relative flex justify-center items-end h-64 sm:h-72 mt-2">
              <motion.div
                initial={{ y: 40, scale: 0.95 }}
                animate={done ? { y: -140, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{
                  duration: done ? 1.2 : 0.6,
                  ease: done ? "easeIn" : "easeOut",
                }}
              >
                <RocketSVG flame={open ? 1 : 0} />
              </motion.div>
            </div>

            {!done && (
              <>
                <PlatformChecklist items={platforms} lang={lang} step={step} />
                <ProgressBar value={progress} />
              </>
            )}

            {done && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400"
                  onClick={onClose}
                >
                  {L.viewCampaign}
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
                  onClick={onClose}
                >
                  {L.close}
                </button>
              </div>
            )}
          </motion.div>

          <Confetti show={done} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
