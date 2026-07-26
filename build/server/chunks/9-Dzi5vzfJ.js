//#region src/routes/(client)/struktur-organisasi/+page.js
/** @type {import('./$types').PageLoad} */
async function load({ fetch }) {
	try {
		const response = await fetch(`http://localhost:8000/api/struktur-desa`);
		if (!response.ok) throw new Error("Gagal mengambil data struktur organisasi");
		return { perangkat: (await response.json()).data || [] };
	} catch (error) {
		console.error("Error fetching org chart data:", error);
		return {
			perangkat: [],
			error: error.message
		};
	}
}

var _page = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CEv-wI4g.js')).default;
const universal_id = "src/routes/(client)/struktur-organisasi/+page.js";
const imports = ["_app/immutable/nodes/9.CpWA3PMy.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/xihTtKlq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=9-Dzi5vzfJ.js.map
