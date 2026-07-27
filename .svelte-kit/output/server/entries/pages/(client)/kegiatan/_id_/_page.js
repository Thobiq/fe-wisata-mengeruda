import { o as getEvent, s as getEvents } from "../../../../../chunks/api.js";
//#region src/routes/(client)/kegiatan/[id]/+page.js
var ssr = false;
async function load({ params }) {
	try {
		const id = params.id;
		return {
			detail: await getEvent(id),
			others: (await getEvents() || []).filter((e) => String(e.id) !== String(id)).slice(0, 3)
		};
	} catch (e) {
		console.error("Gagal memuat detail kegiatan:", e);
		return {
			detail: null,
			others: []
		};
	}
}
//#endregion
export { load, ssr };
