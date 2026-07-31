import axios from 'axios';

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
async function getNews() {
	return (await api.get("/news")).data.data;
}

export { api as a, getNews as g };
//# sourceMappingURL=api-DfgGPL10.js.map
