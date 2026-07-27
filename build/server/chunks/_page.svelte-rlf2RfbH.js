import { h as head, f as ensure_array_like, o as attr_style, e as escape_html, c as attr, d as stringify } from './index.js-DCmNgejC.js';
import './api-hZtCFAlg.js';
import './client-DCeqx-EH.js';
import 'axios';

//#region src/routes/(client)/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const bgImages = ["/hero-1.jpg", "/hero-2.png"];
		let currentIndex = 0;
		let email = "";
		let password = "";
		let isLoading = false;
		let namaDesa = "Desa Mengeruda";
		head("1h3584h", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login Pengelola Pariwisata | Wisata Desa Mengeruda</title>`);
			});
		});
		$$renderer.push(`<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-serif py-10 px-4"><!--[-->`);
		const each_array = ensure_array_like(bgImages);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let img = each_array[index];
			$$renderer.push(`<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"${attr_style(`background-image: url('${stringify(img)}'); opacity: ${stringify(index === currentIndex ? 1 : 0)};`)}></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div> <div class="relative z-10 w-full max-w-md mx-4"><div class="bg-stone-900/85 backdrop-blur-2xl border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white"><div class="px-8 pt-8 pb-6 border-b border-stone-800 text-center relative">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 shadow-lg shadow-amber-500/25 mb-4"><svg class="w-8 h-8 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`);
		$$renderer.push(`<!--]--> <h1 class="text-2xl font-bold text-amber-400 tracking-tight font-serif">Wisata ${escape_html(namaDesa)}</h1> <p class="text-xs text-stone-400 mt-1 uppercase tracking-widest font-medium font-sans">Portal Manajemen Pariwisata &amp; Alam</p></div> <div class="p-8 font-sans">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form class="space-y-5"><div><label for="email" class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">Alamat Email</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <input id="email" type="email"${attr("value", email)} placeholder="admin@mengeruda.id" required="" class="w-full pl-11 pr-4 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm"/></div></div> <div><label for="password" class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">Kata Sandi</label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <input id="password"${attr("type", "password")}${attr("value", password)} placeholder="••••••••" required="" class="w-full pl-11 pr-12 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm"/> <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors"${attr("title", "Tampilkan password")}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span>Masuk ke Portal Pariwisata</span> <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`);
		$$renderer.push(`<!--]--></button></form> <div class="mt-8 pt-6 border-t border-stone-800 text-center"><a href="/" class="text-xs text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> <span>Kembali ke Beranda Wisata</span></a></div></div></div> <p class="text-center text-xs text-stone-500 mt-6 font-sans">© 2026 Pengelola Pariwisata Desa Mengeruda, NTT.</p></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-rlf2RfbH.js.map
