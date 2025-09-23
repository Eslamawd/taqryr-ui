"use client";
import { Toaster } from "@/components/ui/Toster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <Header />
          <Toaster />
          <Sonner />
          {children}

          <Footer />
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
