import { g as getNews } from './api-DtRsP8ij.js';
import 'axios';

//#region src/routes/(client)/berita/[slug]/+page.js
var defaultNews = [{
	title: "Festival Reba Mengeruda Siap Menyambut Wisatawan Asing",
	date: "28 April 2026",
	author: "Dinas Pariwisata",
	content: `
      <p>Tahun ini, perayaan Festival Reba di Desa Mengeruda akan terasa berbeda. Selain dihadiri oleh ribuan masyarakat lokal Ngada, acara syukuran hasil bumi dan penghormatan kepada leluhur ini akan dibuka untuk wisatawan mancanegara.</p>
      <br>
      <p>Langkah ini diambil sebagai bentuk komitmen desa untuk menjadikan Mengeruda sebagai pusat ekowisata dan pariwisata budaya kelas dunia. Pemerintah desa telah menyiapkan berbagai fasilitas pendukung untuk memastikan kenyamanan pengunjung selama festival berlangsung.</p>
    `,
	img: "/hero-1.jpg",
	slug: "festival-reba-mengeruda-siap-menyambut-wisatawan-asing"
}, {
	title: "Revitalisasi Fasilitas Pemandian Air Panas Rampung 80%",
	date: "15 April 2026",
	author: "Admin Desa",
	content: "<p>Kabar gembira bagi para pengunjung! Renovasi toilet, area ganti, dan penambahan gazebo di sekitar kolam suhu tinggi kini telah mencapai tahap akhir.</p>",
	img: "/hero-1.jpg",
	slug: "revitalisasi-fasilitas-pemandian"
}];
async function load({ params }) {
	const currentSlug = params.slug;
	let allNews = defaultNews;
	try {
		const res = await getNews();
		if (res && res.length > 0) allNews = res.map((item) => ({
			title: item.title || "Berita Pariwisata",
			date: item.date || "",
			author: "Dinas Pariwisata",
			content: item.content || "<p></p>",
			img: item.image ? item.image.startsWith("http") || item.image.startsWith("/") ? item.image : `/storage/${item.image}` : "/hero-1.jpg",
			slug: item.slug || String(item.id)
		}));
	} catch (e) {
		console.error("Gagal mengambil berita di detail:", e);
	}
	let detail = allNews.find((n) => n.slug === currentSlug || String(n.slug) === String(currentSlug));
	if (!detail) detail = allNews[0];
	const others = allNews.filter((n) => n.slug !== detail.slug).slice(0, 3);
	return {
		detail,
		others
	};
}

var _page = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DXivHQFG.js')).default;
const universal_id = "src/routes/(client)/berita/[slug]/+page.js";
const imports = ["_app/immutable/nodes/5.DsAapp6r.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/356GbviH.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=5-aU2VksYP.js.map
