"use client";
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const platforms = [
  {
    name: "TikTok",
    icon: () => <FaTiktok className="w-32 h-32" />,
    color: "#69C9D0",
  },
  {
    name: "Instagram",
    icon: () => <FaInstagram className="w-32 h-32" />,
    color: "#C13584",
  },
  {
    name: "Facebook",
    icon: () => <FaFacebook className="w-32 h-32" />,
    color: "#1877F2",
  },
  {
    name: "Twitter",
    icon: () => <FaTwitter className="w-32 h-32" />,
    color: "#1DA1F2",
  },
  {
    name: "Snapchat",
    icon: () => <FaSnapchatGhost className="w-32 h-32" />,
    color: "#FFFC00",
  },
  {
    name: "Google",
    icon: () => <FaGoogle className="w-32 h-32" />,
    color: "#4285F4",
  },
  {
    name: "YouTube",
    icon: () => <FaYoutube className="w-32 h-32" />,
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
          duration: 10,
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
