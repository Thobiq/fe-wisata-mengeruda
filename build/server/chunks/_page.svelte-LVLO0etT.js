import { h as head, f as ensure_array_like, c as attr, d as stringify } from './index.js-C9BbnU1l.js';
import './api-B_LB5Kdh.js';
import 'axios';

//#region src/lib/components/HeroTourism.svelte
function HeroTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let currentImageIndex = 0;
		const images = ["/hero-1.jpg", "/hero-2.png"];
		$$renderer.push(`<section class="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(images);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let image = each_array[i];
			if (i === currentImageIndex) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", image)}${attr("alt", `Hero Background ${stringify(i)}`)} class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-[#1B120C]/60"></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
//#region src/lib/components/SejarahTourism.svelte
function SejarahTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="sejarah" class="w-full py-24 bg-[#1B120C]"><div class="max-w-[1300px] mx-auto px-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/PetaTourism.svelte
function PetaTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="maps" class="w-full py-20 bg-[#160E0A] border-y border-[#332418]"><div class="max-w-[1300px] mx-auto px-6"><div class="text-center mb-12">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative bg-[#2A1B12]">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ListWisataTourism.svelte
function ListWisataTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="wisata" class="w-full py-24 bg-[#1B120C]"><div class="max-w-[1300px] mx-auto px-6"><div id="umkm" class="scroll-mt-24"></div> <div class="text-center mb-16">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="flex flex-wrap justify-center gap-3 mb-12">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/KegiatanTourism.svelte
function KegiatanTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="event" class="w-full py-24 bg-[#160E0A] border-t border-[#2a1d13]"><div class="max-w-[1300px] mx-auto px-6"><div class="text-center mb-16">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/BeritaTourism.svelte
function BeritaTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="berita" class="py-20 bg-[#161311] text-white overflow-hidden"><div class="container mx-auto px-6 lg:px-12"><div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"><div><div class="flex items-center gap-2 mb-2 text-[#d7a750] uppercase tracking-widest text-xs font-semibold"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg> Kabar Mengeruda</div> <h2 class="text-4xl lg:text-5xl font-serif font-bold text-[#d7a750]">Berita &amp; Artikel</h2></div> <a href="#" class="mt-4 md:mt-0 text-sm text-gray-300 hover:text-[#d7a750] transition-colors flex items-center gap-1 group">Lihat Semua Berita <span class="transform group-hover:translate-x-1 transition-transform">›</span></a></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="flex justify-center items-center h-48"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d7a750]"></div></div>`);
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
//#region src/lib/components/GaleriTourism.svelte
function GaleriTourism($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="galeri" class="w-full py-24 bg-[#1B120C] border-t border-[#3A291D]"><div class="max-w-[1300px] mx-auto px-6"><div class="text-center mb-16 flex flex-col items-center">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 min-h-[400px] md:h-[600px] lg:h-[800px]">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/routes/(client)/+page.svelte
function _page($$renderer) {
	head("opejen", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Tourism Information Center - Desa Mengeruda</title>`);
		});
		$$renderer.push(`<meta name="description" content="Jelajahi jejak geologi purba dan keajaiban wisata air panas di Desa Mengeruda."/>`);
	});
	HeroTourism($$renderer);
	$$renderer.push(`<!----> `);
	SejarahTourism($$renderer);
	$$renderer.push(`<!----> `);
	PetaTourism($$renderer);
	$$renderer.push(`<!----> `);
	ListWisataTourism($$renderer);
	$$renderer.push(`<!----> `);
	KegiatanTourism($$renderer);
	$$renderer.push(`<!----> `);
	BeritaTourism($$renderer);
	$$renderer.push(`<!----> `);
	GaleriTourism($$renderer);
	$$renderer.push(`<!---->`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-LVLO0etT.js.map
