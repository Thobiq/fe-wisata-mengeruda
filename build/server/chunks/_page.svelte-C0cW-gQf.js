import { h as head, c as attr, f as ensure_array_like, e as escape_html, b as attr_class, j as derived } from './index.js-B92JqgZl.js';
import './api-DtRsP8ij.js';
import { C as ConfirmModal } from './ConfirmModal-B0-i1veH.js';
import 'quill';
import 'axios';

//#region src/routes/admin/berita/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let news = [];
		let showDeleteModal = false;
		let isDeleting = false;
		let searchQuery = "";
		let filteredNews = derived(() => news.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase())));
		const executeDeleteNewsItem = async () => {
			return;
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("rfaxfw", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Berita Wisata - Tourism Admin</title>`);
				});
			});
			$$renderer.push(`<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Berita Pariwisata</h2> <p class="text-[#6D5D51] text-lg">Kelola publikasi artikel, pengumuman, dan berita seputar wisata desa.</p></div> <button class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg> Tulis Berita</button></div> <div class="mb-6 bg-white p-2 rounded-2xl border border-[#EAE5DF] shadow-sm flex items-center max-w-md"><div class="px-3 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></div> <input type="text"${attr("value", searchQuery)} placeholder="Cari judul berita..." class="w-full bg-transparent border-none outline-none text-[#161311] px-2 py-2"/></div> <div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-[#FDFBF7] border-b border-[#EAE5DF] text-[#6D5D51] text-sm font-semibold uppercase tracking-wider"><th class="py-4 px-6">Judul Berita</th><th class="py-4 px-6">Tanggal Publikasi</th><th class="py-4 px-6">Penulis</th><th class="py-4 px-6">Status</th><th class="py-4 px-6 text-right">Aksi</th></tr></thead><tbody><!--[-->`);
			const each_array = ensure_array_like(filteredNews());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let item = each_array[$$index];
				$$renderer.push(`<tr class="border-b border-[#EAE5DF] hover:bg-[#FDFBF7] transition-colors group"><td class="py-4 px-6"><div class="flex items-center gap-4 max-w-sm"><div class="w-16 h-10 rounded shadow-sm bg-gray-200 overflow-hidden shrink-0"><img${attr("src", item.image)}${attr("alt", item.title)} class="w-full h-full object-cover"/></div> <span class="font-bold text-[#161311] truncate">${escape_html(item.title)}</span></div></td><td class="py-4 px-6 text-[#6D5D51] font-medium">${escape_html(item.date)}</td><td class="py-4 px-6 text-[#6D5D51]">${escape_html(item.author)}</td><td class="py-4 px-6"><span${attr_class(`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.status === "Draft" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"}`)}>${escape_html(item.status)}</span></td><td class="py-4 px-6 text-right"><div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg></button> <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></div></td></tr>`);
			}
			$$renderer.push(`<!--]-->`);
			if (filteredNews().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<tr><td colspan="5" class="py-8 text-center text-gray-400 font-medium">Berita tidak ditemukan.</td></tr>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></tbody></table></div></div> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			ConfirmModal($$renderer, {
				title: "Konfirmasi Hapus Berita",
				message: "Apakah Anda yakin ingin menghapus berita wisata ini? Tindakan ini tidak dapat dibatalkan.",
				confirmText: "Hapus Berita",
				cancelText: "Batal",
				type: "danger",
				loading: isDeleting,
				onConfirm: executeDeleteNewsItem,
				get open() {
					return showDeleteModal;
				},
				set open($$value) {
					showDeleteModal = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C0cW-gQf.js.map
