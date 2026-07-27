import { h as head, c as attr, e as escape_html } from './index.js-C10oFRQT.js';
import './api-C02zWmjI.js';
import 'axios';

//#region src/routes/admin/profil/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let profile = {
			namaDesa: "Desa Mengeruda",
			deskripsiSingkat: "Menjelajahi keajaiban geo-wisata dan kekayaan budaya peninggalan leluhur di tanah Ngada.",
			sejarah: "Mengeruda merupakan kawasan geo-wisata yang terkenal dengan kolam pemandian air panas alami dan penemuan batuan purba. Desa ini telah menjadi titik kumpul masyarakat lokal dalam merayakan hasil bumi.",
			kontak: {
				telepon: "081234567890",
				email: "pariwisata@mengeruda.id",
				alamat: "Kantor Desa Mengeruda, Kec. Soa, Kab. Ngada"
			}
		};
		let isSaving = false;
		head("1pefjfj", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Profil Wisata - Tourism Admin</title>`);
			});
		});
		$$renderer.push(`<div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="text-3xl font-serif font-bold text-[#161311] mb-2">Profil Pariwisata</h2> <p class="text-[#6D5D51] text-lg">Atur informasi utama, sejarah, dan kontak destinasi wisata.</p></div> <button${attr("disabled", isSaving, true)} class="bg-[#161311] hover:bg-[#2C2520] text-[#C79F44] px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-70">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg> Simpan Perubahan`);
		$$renderer.push(`<!--]--></button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="bg-white rounded-2xl border border-[#EAE5DF] shadow-sm overflow-hidden"><div class="p-6 md:p-8 space-y-8"><div><h3 class="text-xl font-serif font-bold text-[#161311] mb-6 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#C79F44]"><path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd"></path></svg> Informasi Utama</h3> <div class="space-y-5"><div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DF]"><div class="w-20 h-20 rounded-xl bg-white border border-[#EAE5DF] flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span class="text-2xl font-serif font-bold text-[#C79F44]">M</span>`);
		$$renderer.push(`<!--]--></div> <div class="flex-1"><label for="logoUpload" class="block text-sm font-semibold text-[#6D5D51] mb-1">Logo Pariwisata / Destinasi</label> <p class="text-xs text-[#6D5D51]/70 mb-3">Unggah logo resmi untuk navigasi client &amp; admin (PNG, JPG, SVG, maks 5MB).</p> <input type="file" id="logoUpload" accept="image/*" class="block w-full text-sm text-[#6D5D51] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#161311] file:text-[#C79F44] hover:file:bg-[#2C2520] transition-colors cursor-pointer"/></div></div> <div><label for="namaDesa" class="block text-sm font-semibold text-[#6D5D51] mb-2">Nama Destinasi / Desa</label> <input type="text" id="namaDesa"${attr("value", profile.namaDesa)} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"/></div> <div><label for="deskripsiSingkat" class="block text-sm font-semibold text-[#6D5D51] mb-2">Deskripsi Singkat (Slogan)</label> <textarea id="deskripsiSingkat" rows="2" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]">`);
		const $$body = escape_html(profile.deskripsiSingkat);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> <div><label for="sejarah" class="block text-sm font-semibold text-[#6D5D51] mb-2">Sejarah Singkat &amp; Narasi Geologi</label> <textarea id="sejarah" rows="5" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]">`);
		const $$body_1 = escape_html(profile.sejarah);
		if ($$body_1) $$renderer.push(`${$$body_1}`);
		$$renderer.push(`</textarea></div></div></div> <div class="h-px bg-[#EAE5DF] w-full"></div> <div><h3 class="text-xl font-serif font-bold text-[#161311] mb-6 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#C79F44]"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"></path></svg> Pusat Bantuan &amp; Kontak</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div><label for="telepon" class="block text-sm font-semibold text-[#6D5D51] mb-2">Nomor Telepon / WhatsApp</label> <input type="text" id="telepon"${attr("value", profile.kontak.telepon)} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"/></div> <div><label for="email" class="block text-sm font-semibold text-[#6D5D51] mb-2">Alamat Email</label> <input type="email" id="email"${attr("value", profile.kontak.email)} class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]"/></div> <div class="md:col-span-2"><label for="alamat" class="block text-sm font-semibold text-[#6D5D51] mb-2">Alamat Lengkap</label> <textarea id="alamat" rows="2" class="w-full px-4 py-3 rounded-xl border border-[#EAE5DF] focus:border-[#C79F44] focus:ring-1 focus:ring-[#C79F44] outline-none transition-colors bg-[#FDFBF7] text-[#161311]">`);
		const $$body_2 = escape_html(profile.kontak.alamat);
		if ($$body_2) $$renderer.push(`${$$body_2}`);
		$$renderer.push(`</textarea></div></div></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BGtCAgBt.js.map
