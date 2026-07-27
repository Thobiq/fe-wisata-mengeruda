import axios from 'axios';

//#region src/lib/api.js
var BACKEND_URL = "https://api.mengeruda.id";
var API_BASE = `${BACKEND_URL}/api/tourism`;
var api = axios.create({
	baseURL: API_BASE,
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
async function getNews() {
	return (await api.get("/news")).data.data;
}

export { api as a, getNews as g };
//# sourceMappingURL=api-DtRsP8ij.js.map
