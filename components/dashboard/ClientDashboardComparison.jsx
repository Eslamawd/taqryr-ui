"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { ChartBar, TrendingUp, Banknote, ArrowRightLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import CreateAdsForm from "./CreateAdsForm";
import PlatformPicker from "./PlatformPicker";
import Pagination from "../layout/Pagination";
import { loadAds } from "@/lib/adsApi";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

const PLATFORM_COLORS = [
  "#10b981",
  "#06b6d4",
  "#a78bfa",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

export default function AdsDashboard() {
  const { lang, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [ads, setAds] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currency, setCurrency] = useState("SAR");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 5;

  // Fetch ads
  const fetchAds = async () => {
    try {
      const response = await loadAds(1);
      setAds(response?.ads.data || []);
      setCurrentPage(response.ads.current_page);
      setLastPage(response.ads.last_page);
      setTotal(response.ads.total);
      if (!response?.ads.data?.length) toast.info("لا يوجد إعلانات");
    } catch (error) {
      console.error("Failed to load ads", error);
    }
  };

  useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage]);

  const filteredAds = useMemo(() => {
    return selectedPlatform
      ? ads.filter((ad) => ad.platform === selectedPlatform)
      : ads;
  }, [ads, selectedPlatform]);

  // Prepare stats for charts
  const prepared = filteredAds.map((ad) => {
    const impressions = ad.today_stats?.impressions || 0;
    const clicks = ad.today_stats?.clicks || 0;
    const spend = parseFloat(ad.budget || 0);
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? spend / clicks : 0;
    const cpm = impressions > 0 ? (spend / impressions) * 1000 : 0;
    return { ...ad, impressions, clicks, spend, ctr, cpc, cpm };
  });

  const totals = useMemo(() => {
    const sum = prepared.reduce(
      (acc, d) => {
        acc.impressions += d.impressions;
        acc.clicks += d.clicks;
        acc.spend += d.spend;
        return acc;
      },
      { impressions: 0, clicks: 0, spend: 0 }
    );
    return sum;
  }, [prepared]);

  return (
    <main
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen mt-20 bg-[#0f1020] text-white"
    >
      {/* Top Bar */}
      <header className="sticky mt-32 bg-[#0f1020]/80 backdrop-blur border-b border-white/10 z-10">
        <div className="w-full flex items-center justify-between">
          <PlatformPicker
            value={selectedPlatform}
            onChange={setSelectedPlatform}
          />
          <div className="flex gap-2">
            <button onClick={() => setIsDialogOpen(true)} className="h-16 m-3">
              {t("create")}
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-4 gap-4">
        <KPI
          title={t("total_impr")}
          value={totals.impressions.toLocaleString()}
          sub={t("across_plat")}
          icon={<ChartBar />}
        />
        <KPI
          title={t("total_clicks")}
          value={totals.clicks.toLocaleString()}
          sub={t("across_plat")}
          icon={<ArrowRightLeft />}
        />
        <KPI
          title={t("total_spend")}
          value={formatPrice(totals.spend)}
          sub={t("across_plat")}
          icon={<Banknote />}
        />
      </section>

      {/* Charts */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid xl:grid-cols-2 gap-6">
        <ChartCard title={t("clicks_vs_impressions")}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={prepared}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="platform" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="impressions" fill="#10b981" />
              <Bar dataKey="clicks" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={t("cpc_vs_ctr")}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={prepared}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="platform" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpc" stroke="#f59e0b" />
              <Line type="monotone" dataKey="ctr" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Ads Table */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="overflow-x-auto bg-gray-900 rounded-2xl border border-white/10">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white/80">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Budget</th>
                <th className="px-4 py-2">Impressions</th>
                <th className="px-4 py-2">Clicks</th>
                <th className="px-4 py-2">CPC</th>
                <th className="px-4 py-2">CTR</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b border-white/10">
                  <td className="px-4 py-2">{ad.id}</td>
                  <td className="px-4 py-2">{ad.name}</td>
                  <td className="px-4 py-2">
                    {formatPrice(parseFloat(ad.budget || 0))}
                  </td>
                  <td className="px-4 py-2">{ad.impressions}</td>
                  <td className="px-4 py-2">{ad.clicks}</td>
                  <td className="px-4 py-2">
                    {ad.cpc ? ad.cpc.toFixed(2) : "0"}
                  </td>
                  <td className="px-4 py-2">
                    {ad.ctr ? ad.ctr.toFixed(2) : "0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          label={lang === "ar" ? "الإعلانات" : "Ads"}
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
        />
      </section>

      {/* Create Ad Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{t("create_new_ad")}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateAdsForm
            onSuccess={() => {
              setIsDialogOpen(false);
              fetchAds();
            }}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function KPI({ title, value, sub, icon }) {
  return (
    <div className="bg-white/5 rounded-3xl p-4 flex flex-col gap-2 border border-white/10">
      <div className="flex items-center gap-2 text-sm text-white/60">
        {icon} {title}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-white/50">{sub}</div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white/5 rounded-3xl p-4 border border-white/10">
      <div className="text-lg font-bold mb-2">{title}</div>
      {children}
    </div>
  );
}
