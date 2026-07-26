import "../../../../../chunks/index-server.js";
import { T as escape_html, a as ensure_array_like, c as store_get, i as derived, l as stringify, o as head, t as attr_class, u as unsubscribe_stores, w as attr } from "../../../../../chunks/server.js";
import "../../../../../chunks/api.js";
import { t as page } from "../../../../../chunks/stores.js";
//#region src/lib/components/ProductDetailGallery.svelte
function ProductDetailGallery($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { images = [] } = $$props;
		let activeIndex = 0;
		derived(() => images[activeIndex]);
		$$renderer.push(`<div class="flex flex-col gap-4 h-full"><div class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#1B120C] rounded-3xl overflow-hidden shadow-inner border border-[#3A291D]"><!--[-->`);
		const each_array = ensure_array_like(images);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let image = each_array[i];
			if (i === activeIndex) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", image)} alt="Produk Utama" class="absolute inset-0 w-full h-full object-cover"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (images.length > 1) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex gap-4 mt-2 overflow-x-auto pb-2 scrollbar-hide svelte-wqbtto"><!--[-->`);
			const each_array_1 = ensure_array_like(images.slice(0, 4));
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let image = each_array_1[i];
				$$renderer.push(`<button${attr_class(`relative w-[22%] aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeIndex === i ? "border-[#FACC15] scale-105 shadow-md" : "border-transparent hover:border-gray-500 opacity-70 hover:opacity-100"}`)}><img${attr("src", image)}${attr("alt", `Thumbnail ${stringify(i)}`)} class="w-full h-full object-cover"/></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/ProductDetailInfo.svelte
function ProductDetailInfo($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product } = $$props;
		const waMessage = derived(() => `Halo, saya tertarik dengan produk ${product.nama} dari TIC Desa Mengeruda.`);
		const waUrl = derived(() => `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage())}`);
		$$renderer.push(`<div class="flex flex-col h-full">`);
		if (product.badge) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-4"><span class="inline-block bg-[#E0F2FE] text-[#0284C7] px-4 py-1.5 rounded-full text-sm font-bold font-sans shadow-sm">${escape_html(product.badge)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">${escape_html(product.nama)}</h1> <p class="text-3xl font-serif font-bold text-[#FACC15] mb-6">${escape_html(product.harga)}</p> <p class="text-gray-300 font-sans text-base md:text-lg leading-relaxed mb-8 text-justify">${escape_html(product.deskripsi)}</p> <div class="border border-[#4A392D] rounded-2xl p-4 flex items-center justify-between bg-[#1B120C]/30 mb-8 hover:bg-[#1B120C]/50 transition-colors"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-full overflow-hidden border-2 border-[#4A392D]"><img${attr("src", product.toko.logo)}${attr("alt", product.toko.nama)} class="w-full h-full object-cover"/></div> <div><h4 class="font-bold text-[#FACC15] font-serif text-lg leading-tight">${escape_html(product.toko.nama)}</h4> <p class="text-gray-400 text-sm font-sans">${escape_html(product.toko.lokasi)}</p></div></div> <a href="#" class="bg-[#FACC15] text-[#1B120C] hover:bg-[#eab308] px-5 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-md">Lihat Toko</a></div> <div class="mt-auto"></div> <div class="flex flex-col sm:flex-row gap-4 mt-8"><a${attr("href", waUrl())} target="_blank" rel="noopener noreferrer" class="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.031 21.432l-3.328 1.11 1.12-3.23A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-3.969-.824l.03-.021zM12 4a8 8 0 105.12 14.12l.14-.1 1.95.65-.67-1.93-.11-.14A8 8 0 0012 4zm4.23 9.4c-.23-.11-1.37-.67-1.58-.75-.21-.07-.37-.11-.53.11-.16.23-.6.75-.74.9-.13.16-.27.18-.5.07-.23-.11-.98-.36-1.87-1.16-.69-.62-1.16-1.38-1.3-1.61-.14-.23-.01-.36.1-.47.11-.11.23-.27.35-.41.11-.14.15-.23.39.07-.16.03-.3-.02-.41-.07-.11-.53-1.27-.72-1.74-.19-.46-.38-.4-.53-.41h-.45c-.16 0-.42.06-.64.3-.23.23-.87.85-.87 2.07s.9 2.4 1.02 2.56c.11.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.37-.56 1.56-1.11.19-.55.19-1.02.13-1.11-.06-.09-.22-.14-.45-.25z"></path></svg> Order Sekarang</a> <button class="sm:w-auto w-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 py-3.5 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg> Bagikan</button></div></div>`);
	});
}
//#endregion
//#region src/lib/components/RelatedProducts.svelte
function RelatedProducts($$renderer, $$props) {
	let { tokoName = "" } = $$props;
	$$renderer.push(`<div class="min-h-[400px]">`);
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div>`);
}
//#endregion
//#region src/routes/(client)/produk/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		derived(() => store_get($$store_subs ??= {}, "$page", page).params.id);
		let product = {
			id: 1,
			nama: "Keripik Tempe",
			harga: "Rp10.000",
			deskripsi: "Sentra oleh-oleh khas Ngada berkualitas tinggi buatan UMKM lokal.",
			badge: "Produk Unggulan",
			toko: {
				id: 1,
				nama: "Oleh-oleh bu Erni",
				lokasi: "Desa Mengeruda",
				logo: "/hero-1.jpg"
			},
			images: ["/hero-1.jpg", "/hero-2.png"]
		};
		head("zeal0d", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(product.nama)} - Tourism Information Center</title>`);
			});
		});
		$$renderer.push(`<section class="min-h-screen pt-32 pb-20 px-6 max-w-[1300px] mx-auto"><div class="bg-[#281C14] rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 border border-[#3A291D]"><div class="w-full lg:w-1/2">`);
		ProductDetailGallery($$renderer, { images: product.images });
		$$renderer.push(`<!----></div> <div class="w-full lg:w-1/2 flex flex-col">`);
		ProductDetailInfo($$renderer, { product });
		$$renderer.push(`<!----></div></div> <div class="mt-24">`);
		RelatedProducts($$renderer, { tokoName: product.toko.nama });
		$$renderer.push(`<!----></div></section>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
