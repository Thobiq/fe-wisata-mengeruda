import axios from "axios";
var api = axios.create({
	baseURL: `https://api.mengeruda.id/api/tourism`,
	withCredentials: true,
	headers: {
		"Accept": "application/json",
		"X-Requested-With": "XMLHttpRequest"
	}
});
api.interceptors.request.use((config) => {
	if (typeof document !== "undefined") {
		const match = document.cookie.match(/* @__PURE__ */ new RegExp("(^|;\\s*)(XSRF-TOKEN)=([^;]*)"));
		if (match) config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[3]);
	}
	return config;
});
async function getAttractions() {
	return (await api.get("/attractions")).data.data;
}
async function getAttraction(id) {
	return (await api.get(`/attractions/${id}`)).data.data;
}
async function getUmkms() {
	return (await api.get("/umkms")).data.data;
}
async function getProducts(umkmId = null) {
	const url = umkmId ? `/umkms/${umkmId}/products` : "/products";
	return (await api.get(url)).data.data;
}
async function getNews() {
	return (await api.get("/news")).data.data;
}
async function deleteNews(id) {
	return (await api.delete(`/news/${id}`)).data;
}
async function getGalleries(category = "Semua") {
	return (await api.get("/galleries", { params: category && category !== "Semua" ? { category } : {} })).data.data;
}
async function deleteGallery(id) {
	return (await api.delete(`/galleries/${id}`)).data;
}
async function getEvents() {
	return (await api.get("/events")).data.data;
}
async function getEvent(id) {
	return (await api.get(`/events/${id}`)).data.data;
}
async function getProfile() {
	return (await api.get("/profile")).data.data;
}
//#endregion
export { getAttractions as a, getGalleries as c, getProfile as d, getUmkms as f, getAttraction as i, getNews as l, deleteGallery as n, getEvent as o, deleteNews as r, getEvents as s, api as t, getProducts as u };
