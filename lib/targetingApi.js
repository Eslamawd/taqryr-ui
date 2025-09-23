import api from "../api/axiosClient";

export async function getTargetingSnap(countryCode = "", type = "") {
  const params = { country_code: countryCode };
  if (type) params.type = type;

  const response = await api().get("api/targeting", { params });
  return response.data;
}
export async function getCountry() {
  const response = await api().get("api/country");
  return response.data;
}
