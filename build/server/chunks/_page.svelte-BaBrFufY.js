import { h as head, e as escape_html, c as attr, f as ensure_array_like, j as derived } from './index.js-C10oFRQT.js';
import './api-C02zWmjI.js';
import './client-BueZBvJI.js';
import 'quill';
import 'axios';

//#region src/routes/admin/umkm/[id]/produk/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let umkmName = "Toko UMKM";
		let products = [];
		let searchQuery = "";
		let filteredProducts = derived(() => products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())));
		head("yl8wzl", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Produk UMKM - Tourism Admin</title>`);
			});
		});
		$$renderer.push(`<a href="/admin/umkm" class="inline-flex items-center gap-2 text-[#6D5D51] hover:text-[#C79F44] transition-colors mb-4 font-semibold text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg> Kembali ke Daftar UMKM</a> <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Kelola Produk &amp; Menu</h2> <p class="text-[#6D5D51] text-lg">Toko/UMKM: <span class="font-bold text-[#161311]">${escape_html(umkmName)}</span></p></div> <button class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Tambah Produk</button></div> <div class="mb-6 bg-white p-2 rounded-2xl border border-[#EAE5DF] shadow-sm flex items-center max-w-md"><div class="px-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></div> <input type="text"${attr("value", searchQuery)} placeholder="Cari nama produk atau kategori..." class="w-full bg-transparent border-none outline-none text-[#161311] px-2 py-2"/></div> <div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-[#FDFBF7] border-b border-[#EAE5DF] text-[#6D5D51] text-sm font-semibold uppercase tracking-wider"><th class="py-4 px-6">Produk</th><th class="py-4 px-6">Kategori</th><th class="py-4 px-6">Harga</th><th class="py-4 px-6 text-right">Aksi</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(filteredProducts());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<tr class="border-b border-[#EAE5DF] hover:bg-[#FDFBF7] transition-colors group"><td class="py-4 px-6"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0 border border-[#EAE5DF]"><img${attr("src", item.image)}${attr("alt", item.name)} class="w-full h-full object-cover"/></div> <div><span class="font-bold text-[#161311] block">${escape_html(item.name)}</span> <span class="text-xs text-gray-500 line-clamp-1">${escape_html(item.description)}</span></div></div></td><td class="py-4 px-6"><span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C79F44]/10 text-[#B68D37] border border-[#C79F44]/20">${escape_html(item.category)}</span></td><td class="py-4 px-6 font-bold text-[#161311]">${escape_html(item.price)}</td><td class="py-4 px-6 text-right"><div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg></button> <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></div></td></tr>`);
		}
		$$renderer.push(`<!--]-->`);
		if (filteredProducts().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<tr><td colspan="4" class="py-8 text-center text-gray-400 font-medium">Data produk belum tersedia.</td></tr>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></tbody></table></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BaBrFufY.js.map
