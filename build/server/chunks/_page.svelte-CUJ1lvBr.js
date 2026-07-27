import { h as head, c as attr, j as derived, k as store_get, e as escape_html, u as unsubscribe_stores } from './index.js-B92JqgZl.js';
import './api-DtRsP8ij.js';
import { p as page } from './stores-DYubsUVv.js';
import 'axios';
import './client-D_wwHrBQ.js';

//#region src/lib/components/StoreInfo.svelte
function StoreInfo($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/StoreCatalog.svelte
function StoreCatalog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
			nama: "Warung Makan Bu Erni",
			heroImage: "/hero-1.jpg"};
		head("adz1x1", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(store.nama)} - Tourism Information Center</title>`);
			});
		});
		$$renderer.push(`<section class="relative w-full h-[50vh] min-h-[400px]"><img${attr("src", store.heroImage)} alt="Hero Background" class="absolute inset-0 w-full h-full object-cover"/> <div class="absolute inset-0 bg-gradient-to-b from-[#1B120C]/70 via-[#1B120C]/30 to-[#1B120C]"></div></section> <section class="relative z-10 w-full bg-[#1B120C]"><div class="max-w-[1300px] mx-auto px-6 -mt-32 pb-24">`);
		StoreInfo($$renderer);
		$$renderer.push(`<!----> <div class="mt-20">`);
		StoreCatalog($$renderer, { umkmId: id() });
		$$renderer.push(`<!----></div></div></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CUJ1lvBr.js.map
