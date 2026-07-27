import axios from "axios";
//#region src/lib/api.js
var BACKEND_URL = "https:///api.mengeruda.id";
var API_BASE = `${BACKEND_URL}/api/tourism`;
var api = axios.create({
	baseURL: API_BASE,
	withCredentials: true,
	headers: {
		"Accept": "application/json",
		"X-Requested-With": "XMLHttpRequest"
	}
});
async function initCsrf() {
	try {
		await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
			withCredentials: true,
			headers: {
				"Accept": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			}
		});
	} catch (e) {
		console.error("Gagal mengambil CSRF cookie:", e);
	}
}
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
	await initCsrf();
	return (await api.delete(`/news/${id}`)).data;
}
async function getGalleries(category = "Semua") {
	return (await api.get("/galleries", { params: category && category !== "Semua" ? { category } : {} })).data.data;
}
async function deleteGallery(id) {
	await initCsrf();
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
