import "../../../../../chunks/index-server.js";
import { T as escape_html, c as store_get, i as derived, o as head, u as unsubscribe_stores, w as attr } from "../../../../../chunks/server.js";
import "../../../../../chunks/api.js";
import { t as page } from "../../../../../chunks/stores.js";
//#region src/lib/components/StoreInfo.svelte
function StoreInfo($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { store } = $$props;
		const waMessage = derived(() => `Halo, saya melihat toko Anda (${store.nama}) di TIC Desa Mengeruda.`);
		derived(() => `https://wa.me/${(store.wa || "6281234567890").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage())}`);
		$$renderer.push(`<div>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/StoreCatalog.svelte
function StoreCatalog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { umkmId = null } = $$props;
		$$renderer.push(`<div class="min-h-[400px]">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/(client)/store/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let id = derived(() => store_get($$store_subs ??= {}, "$page", page).params.id);
		let store = {
			id: 1,
			nama: "Warung Makan Bu Erni",
			logo: "/hero-1.jpg",
			lokasi: "Mengeruda",
			deskripsi: "Sentra kuliner dan UMKM pilihan di Desa Mengeruda dengan cita rasa otentik khas Ngada.",
			heroImage: "/hero-1.jpg",
			sosmed: {
				instagram: "#",
				facebook: "#",
				twitter: "#",
				website: "#"
			}
		};
		head("adz1x1", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store.nama)} - Tourism Information Center</title>`);
			});
		});
		$$renderer.push(`<section class="relative w-full h-[50vh] min-h-[400px]"><img${attr("src", store.heroImage)} alt="Hero Background" class="absolute inset-0 w-full h-full object-cover"/> <div class="absolute inset-0 bg-gradient-to-b from-[#1B120C]/70 via-[#1B120C]/30 to-[#1B120C]"></div></section> <section class="relative z-10 w-full bg-[#1B120C]"><div class="max-w-[1300px] mx-auto px-6 -mt-32 pb-24">`);
		StoreInfo($$renderer, { store });
		$$renderer.push(`<!----> <div class="mt-20">`);
		StoreCatalog($$renderer, { umkmId: id() });
		$$renderer.push(`<!----></div></div></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
