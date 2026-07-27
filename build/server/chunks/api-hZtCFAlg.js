import axios from 'axios';

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
async function getNews() {
	return (await api.get("/news")).data.data;
}

export { api as a, getNews as g };
//# sourceMappingURL=api-hZtCFAlg.js.map
