// src/lib/adApi.js

import api from "../api/axiosClient";

/**
 * GET /api/ads
 */
export async function loadAds(page) {
  const response = await api().get(`api/ads?page=${page || 1}`);
  // نفترض أنّ الـ response.data هو مصفوفة الخدمات
  return response.data;
}

// GET /api/admin/ads
export async function loadAdsByAdmin(page) {
  const response = await api().get(`api/admin/ads?page=${page || 1}`);
  // نفترض أنّ الـ response.data هو مصفوفة الخدمات
  return response.data;
}

// GET /api/ads/{id}
export async function getAd(id) {
  const response = await api().get(`api/ads/${id}`);
  // نفترض أنّ الـ response.data هو مصفوفة الخدمات
  return response.data;
}

// POST /api/admin/ads/{id}
/**
 * إرسال الإعلان إلى المنصة
 * @param id: معرف الإعلان (رقم صحيح)
 */
export async function sendAdToPlatform(id) {
  const response = await api().post(`api/admin/ads/${id}`);
  // نفترض أنّ الـ response.data هو مصفوفة الخدمات
  return response.data;
}

/**
 * POST /api/ads
 * @param adData: جسم الطلب بصيغة Ad (object)
 */
export async function addNewAd(adData) {
  // لا حاجة لتمرير الـ id، Laravel سيولّد id تلقائيًا (بما أننا استخدمنا auto-increment)

  const response = await api().post("api/ads", adData);
  return response.data;
}

export async function asyncCatlogFromAll() {
  // لا حاجة لتمرير الـ id، Laravel سيولّد id تلقائيًا (بما أننا استخدمنا auto-increment)

  const response = await api().post("api/platform-catalog/sync");
  return response.data;
}

/**
 * PUT /api/ads/{id}
 * @param adData: كائن الخدمة يحتوي على id وحقول أخرى محدثة
 */
export async function updateAd(id, payload) {
  const response = await api().put(`api/ads/${id}`, payload);
  return response.data;
}

/**
 * DELETE /api/ads/{id}
 */
export async function deleteAd(id) {
  const response = await api().delete(`api/ads/${id}`);
  return response.data;
}
