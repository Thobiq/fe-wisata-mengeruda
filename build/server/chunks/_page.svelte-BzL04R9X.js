import { h as head, f as ensure_array_like, b as attr_class, e as escape_html, c as attr, j as derived } from './index.js-DCmNgejC.js';
import './api-hZtCFAlg.js';
import { C as ConfirmModal } from './ConfirmModal-BB8GG33X.js';
import 'axios';

//#region src/routes/admin/galeri/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let photos = [];
		let showDeleteModal = false;
		let isDeleting = false;
		let activeTab = "Semua";
		let filteredPhotos = derived(() => photos);
		const categories = [
			"Semua",
			"Alam",
			"Budaya",
			"Kuliner",
			"Fasilitas"
		];
		const executeDeletePhotoItem = async () => {
			return;
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("16t2iyb", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Galeri Wisata - Tourism Admin</title>`);
				});
			});
			$$renderer.push(`<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Galeri Foto Pariwisata</h2> <p class="text-[#6D5D51] text-lg">Kelola kumpulan foto memukau untuk menarik minat wisatawan.</p></div> <button class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Unggah Foto Baru</button></div> <div class="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar"><!--[-->`);
			const each_array = ensure_array_like(categories);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let cat = each_array[$$index];
				$$renderer.push(`<button${attr_class(`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all border ${activeTab === cat ? "bg-[#161311] text-[#C79F44] border-[#161311] shadow-md" : "bg-white text-gray-500 border-[#EAE5DF] hover:bg-gray-50"}`)}>${escape_html(cat)}</button>`);
			}
			$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`);
			const each_array_1 = ensure_array_like(filteredPhotos());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let photo = each_array_1[$$index_1];
				$$renderer.push(`<div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE5DF]"><button class="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm" title="Hapus Foto"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"></path></svg></button> <div class="w-full h-48 overflow-hidden relative"><img${attr("src", photo.image)}${attr("alt", photo.title)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/> <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div></div> <div class="p-4"><span class="text-[11px] font-bold text-[#C79F44] uppercase tracking-wider mb-1 block">${escape_html(photo.category)}</span> <h4 class="font-bold text-[#161311] leading-snug line-clamp-2">${escape_html(photo.title)}</h4></div></div>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (filteredPhotos().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center py-20"><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg></div> <h3 class="text-xl font-bold text-[#161311] mb-2">Belum ada foto</h3> <p class="text-gray-500">Kategori ini masih kosong. Silakan unggah foto baru.</p></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			ConfirmModal($$renderer, {
				title: "Konfirmasi Hapus Foto",
				message: "Apakah Anda yakin ingin menghapus foto ini secara permanen dari galeri wisata?",
				confirmText: "Hapus Foto",
				cancelText: "Batal",
				type: "danger",
				loading: isDeleting,
				onConfirm: executeDeletePhotoItem,
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
//# sourceMappingURL=_page.svelte-BzL04R9X.js.map
