"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { toast } from "sonner";
import {
  Trash2,
  Mail,
  AlertTriangle,
  ShapesIcon,
  Phone,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { deleteAd } from "../../lib/adminApi";
import { loadAdsByAdmin, sendAdToPlatform } from "@/lib/adsApi";
import Pagination from "../layout/Pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import PhoneVideoPreview from "../PhoneVideoPreview";
import { useLanguage } from "@/context/LanguageContext";
import CreativeCarousel from "../CreativeCarousel";
import { useCurrency } from "@/context/CurrencyContext";

const AdsManagement = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showAdDetails, setShowAdDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const { lang } = useLanguage();

  const { formatPrice } = useCurrency();

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // جلب المستخدمين من Laravel API
  const fetchAds = async () => {
    try {
      const response = await loadAdsByAdmin(currentPage);
      setAds(response?.ads.data || []);
      setCurrentPage(response.ads.current_page);
      setLastPage(response.ads.last_page);
      setTotal(response.ads.total);
      if (response.ads.data.length === 0) {
        toast.info("لا يوجد إعلانات");
      }
    } catch (error) {
      console.error("فشل في جلب إعلانات", error);
    }
  };
  useEffect(() => {
    fetchAds();
  }, [currentPage]);

  // البحث

  // حذف مستخدم
  const confirmDelete = async () => {
    if (!adToDelete) return;
    try {
      await deleteAd(adToDelete.id);
      const updatedAds = ads.filter((u) => u.id !== adToDelete.id);
      setAds(updatedAds);
      setFilteredAds(updatedAds);
      setShowDeleteDialog(false);
      toast.success(`تم حذف المستخدم ${adToDelete.email} بنجاح`);
      setAdToDelete(null);
    } catch (error) {
      console.error("فشل حذف المستخدم", error);
      toast.error("فشل حذف المستخدم");
    }
  };

  // تغيير دور المستخدم
  const adNewAd = async (adId) => {
    try {
      await sendAdToPlatform(adId);

      toast.success(`Send New Ads`);
    } catch (error) {
      console.error(" Can Not Send To", error);
      toast.error("  Can Not Send");
    }
  };

  const handleDeleteAd = (ad) => {
    setAdToDelete(ad);
    setShowDeleteDialog(true);
  };

  return (
    <>
      <motion.div
        dir={lang === "ar" ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-[#0f1020] text-gray-200"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              {lang === "ar" ? "إدارة الإعلانات" : "Ads Management"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ads?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">
                  {lang === "ar" ? "لا يوجد إعلانات" : "No ads available"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === "ar" ? "الاسم والميزانية" : "Name & Budget"}
                      </TableHead>
                      <TableHead>
                        {lang === "ar" ? "تاريخ البداية" : "Start Time"}
                      </TableHead>
                      <TableHead>
                        {lang === "ar" ? "تاريخ الانتهاء" : "End Time"}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === "ar" ? "الإجراءات" : "Actions"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads?.map((ad) => (
                      <TableRow
                        key={ad.id}
                        onClick={() => {
                          setSelectedAd(ad);
                          setShowAdDetails(true);
                        }}
                        className="cursor-pointer hover:bg-gray-700"
                      >
                        <TableCell className="font-medium flex justify-center items-center">
                          {ad.name}
                        </TableCell>
                        <TableCell className="flex items-center justify-center gap-1">
                          {formatPrice(ad.budget)}
                        </TableCell>
                        <TableCell className="">
                          {new Date(ad.start_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="">
                          {new Date(ad.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right flex justify-center items-center">
                          {ad.platform_ad_id === null ? (
                            <Button
                              className="m-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                adNewAd(ad.id);
                              }}
                            >
                              {lang === "ar" ? "إرسال" : "Send To"}
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            total={total}
            label={lang === "ar" ? "الإعلانات" : "Ads"}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
          />
        </Card>
      </motion.div>
      {/* Dialog واحد للتفاصيل + الكاروسيل */}
      <Dialog open={showAdDetails} onOpenChange={setShowAdDetails}>
        <DialogHeader>
          <DialogTitle>
            {lang === "ar" ? "تفاصيل الإعلان" : "Ad Details"}
          </DialogTitle>
        </DialogHeader>
        <DialogContent className="bg-black h-[80vh]   overflow-y-auto text-white">
          {selectedAd && (
            <div className="flex flex-col justify-center items-center gap-6">
              {/* بيانات المستخدم */}
              <div className="space-y-2">
                <p>
                  <strong>{lang === "ar" ? "الاسم:" : "Name:"}</strong>{" "}
                  {selectedAd.user?.name}
                </p>
                <p>
                  <strong>{lang === "ar" ? "الإيميل:" : "Email:"}</strong>{" "}
                  {selectedAd.user?.email}
                </p>
                <p>
                  <strong>{lang === "ar" ? "رقم التليفون:" : "Phone:"}</strong>{" "}
                  {selectedAd.user?.phone}
                </p>
              </div>

              {/* بيانات الإعلان */}
              <div className="space-y-2">
                <p>
                  <strong>{lang === "ar" ? "المنصة:" : "Platform:"}</strong>{" "}
                  {selectedAd.platform}
                </p>
                <p>
                  <strong>{lang === "ar" ? "الهدف:" : "Objective:"}</strong>{" "}
                  {selectedAd.objective}
                </p>
              </div>

              {/* الكاروسيل */}
              <h3 className="text-lg font-semibold mb-2">
                {lang === "ar" ? "المحتوى الإبداعي" : "Creatives"}
              </h3>
              <div className="mt-16">
                <CreativeCarousel creatives={selectedAd.creative} />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => setShowAdDetails(false)}>
            {lang === "ar" ? "إغلاق" : "Close"}
          </Button>
        </DialogFooter>
      </Dialog>{" "}
    </>
  );
};

export default AdsManagement;
