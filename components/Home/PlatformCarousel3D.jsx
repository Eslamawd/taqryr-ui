"use client";
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const platforms = [
  {
    name: "TikTok",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-32 h-32"
      >
        <path
          fill="#25F4EE"
          d="M34.5 14.5c-2.8-1.8-4.5-4.9-4.5-8.4h-5.1v25.1c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 1 0 1.9.3 2.7.7V21c-1-.1-1.9-.1-2.9 0-5.8.8-10.1 6.2-9.3 12 0 0 0 .1 0 .1 1 6.6 7.1 11.1 13.7 10.1 6-.9 10.4-6 10.4-12.1V20c1.3 1 2.8 1.8 4.5 2.2V14.5z"
        />
        <path
          fill="#FE2C55"
          d="M34.5 14.5c-2.8-1.8-4.5-4.9-4.5-8.4h-5.1v25.1c0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 1 0 1.9.3 2.7.7V21c-1-.1-1.9-.1-2.9 0-5.8.8-10.1 6.2-9.3 12 0 0 0 .1 0 .1 1 6.6 7.1 11.1 13.7 10.1 6-.9 10.4-6 10.4-12.1V20c1.3 1 2.8 1.8 4.5 2.2V14.5z"
          opacity=".6"
        />
        <path
          fill="#000000"
          d="M30 6.1c0 3.6 1.7 6.6 4.5 8.4v7.7c-1.7-.4-3.2-1.2-4.5-2.2v11.1c0 6-4.4 11.2-10.4 12.1-6.6 1-12.7-3.5-13.7-10.1 0 0 0-.1 0-.1-.8-5.8 3.5-11.2 9.3-12 1-.1 1.9-.1 2.9 0v5.4c-.8-.4-1.7-.7-2.7-.7-3.1 0-5.6 2.5-5.6 5.6 0 3.1 2.5 5.6 5.6 5.6 3.1 0 5.6-2.5 5.6-5.6V6.1H30z"
        />
      </svg>
    ),
    color: "#69C9D0",
  },
  {
    name: "Instagram",
    icon: () => <Instagram className="w-32 h-32" />,
    color: "#C13584",
  },
  {
    name: "Facebook",
    icon: () => <Facebook className="w-32 h-32" />,
    color: "#1877F2",
  },
  {
    name: "Twitter",
    icon: () => <Twitter className="w-32 h-32" />,
    color: "#1DA1F2",
  },
  {
    name: "Snapchat",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-32 h-32"
      >
        <path
          fill="#000000"
          d="M24 10c-3.6 0-6.7 2.9-6.7 6.5v.7c0 3-2.3 5.4-5.2 5.6v2c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8c1.4 1.9 3.6 3.1 6 3.1h12c2.4 0 4.6-1.2 6-3.1-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8v-2c-2.9-.2-5.2-2.6-5.2-5.6v-.7c0-3.6-3.1-6.5-6.7-6.5z"
        />
      </svg>
    ),
    color: "#FFFC00",
  },
  {
    name: "Google",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-32 h-32"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.42-5.42C33.58 3.67 29.17 1.5 24 1.5 14.73 1.5 7.06 7.5 4.44 16.07l6.96 5.41C12.69 15.14 17.91 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.5 24c0-1.57-.14-3.08-.41-4.53H24v9.05h12.65c-.55 2.86-2.23 5.28-4.73 6.91l7.34 5.69C43.73 37.25 46.5 31.08 46.5 24z"
        />
        <path
          fill="#FBBC05"
          d="M11.4 28.52a13.99 13.99 0 0 1 0-9.04l-6.96-5.41a22.477 22.477 0 0 0 0 19.86l6.96-5.41z"
        />
        <path
          fill="#EA4335"
          d="M24 46.5c6.17 0 11.35-2.03 15.13-5.48l-7.34-5.69c-2.04 1.37-4.66 2.17-7.79 2.17-6.09 0-11.31-5.64-12.6-12.98l-6.96 5.41C7.06 40.5 14.73 46.5 24 46.5z"
        />
      </svg>
    ),
    color: "#4285F4",
  },
  {
    name: "YouTube",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-10 h-10"
      >
        <path
          fill="currentColor"
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 16v-8l8 4-8 4z"
        />
      </svg>
    ),
    color: "#FF0000",
  },
];

export default function PlatformCarousel3D() {
  const { lang } = useLanguage();
  const containerVariants = {
    animate: {
      x: [0, "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="mx-auto w-full overflow-hidden py-12" id="platforms">
      <div dir="rtl">
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          {lang === "ar"
            ? "  منصات متكاملة من مكان واحد"
            : "Integrated platforms from one place"}
        </h2>
        <p className="text-white/70 text-center mb-8">
          {lang === "ar"
            ? "  ابدأ بسناب شات الآن، وتوسّع لاحقًا لإنستغرام وتيك توك وغيرها."
            : "  Start with Snapchat now, and expand later to Instagram, TikTok, and more."}
        </p>
      </div>

      <div className="relative flex justify-center items-center h-[120px]">
        <motion.div
          className="absolute inset-0 flex flex-row items-center gap-8 whitespace-nowrap"
          variants={containerVariants}
          animate="animate"
        >
          {[...platforms, ...platforms].map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center w-32 justify-center p-4 rounded-2xl cursor-pointer"
              style={{
                backgroundColor: p.color,
                color: p.name === "Snapchat" ? "#000" : "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {p.icon()}
              </div>
              <div className="text-sm font-bold mt-2">{p.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
