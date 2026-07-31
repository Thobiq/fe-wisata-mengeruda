const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["acara-adat-resepsi.png","Batas_Desa.json","berangkat-sekolah.jpeg","diskusi-kantor-desa.png","Fasilitas_Desa_Mengeruda.json","hero-1.jpg","hero-2.png","icon-apbd.png","Jalan_Desa_Mengeruda.json","karang-taruna.png","kunjungan-mahasiswa-sekolah.jpeg","logo.png","menjemur-padi.jpeg","mpls-satap.png","peta-mengeruda.png","produk-tempe.png","robots.txt","sinergi-mahasiswa-kkn.jpeg","user-placeholder.png","wisata-air-panas.jpeg"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".jpeg":"image/jpeg",".jpg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.6xaCAZJW.js",app:"_app/immutable/entry/app.CeXnaKo0.js",imports:["_app/immutable/entry/start.6xaCAZJW.js","_app/immutable/chunks/DxXmLn0u.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/entry/app.CeXnaKo0.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-Rbv5ylRi.js')),
			__memo(() => import('./1-gGE4sWKd.js')),
			__memo(() => import('./2-rZmDryS4.js')),
			__memo(() => import('./3-CwCR73LH.js')),
			__memo(() => import('./4-CSbkEwtx.js')),
			__memo(() => import('./5-CYulMWNH.js')),
			__memo(() => import('./6-aoReq4_t.js')),
			__memo(() => import('./7-XE1sCzD9.js')),
			__memo(() => import('./8-BA2qNHlf.js')),
			__memo(() => import('./9-dGyVohc5.js')),
			__memo(() => import('./10-DQ_MneuV.js')),
			__memo(() => import('./11-CZUCYWC1.js')),
			__memo(() => import('./12-Ebcsb474.js')),
			__memo(() => import('./13-DQiTJlHt.js')),
			__memo(() => import('./14-CPtLnpPB.js')),
			__memo(() => import('./15-q2Ga8JgH.js')),
			__memo(() => import('./16-I4NrL4Rd.js')),
			__memo(() => import('./17-BoDyrIaB.js')),
			__memo(() => import('./18-CRoWUoRV.js')),
			__memo(() => import('./19-DaEuFJbS.js')),
			__memo(() => import('./20-BWJD2g5z.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(client)",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/berita",
				pattern: /^\/admin\/berita\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/galeri",
				pattern: /^\/admin\/galeri\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/kegiatan",
				pattern: /^\/admin\/kegiatan\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/profil",
				pattern: /^\/admin\/profil\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/tempat-wisata",
				pattern: /^\/admin\/tempat-wisata\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/umkm",
				pattern: /^\/admin\/umkm\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/admin/umkm/[id]/produk",
				pattern: /^\/admin\/umkm\/([^/]+?)\/produk\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(client)/berita/[slug]",
				pattern: /^\/berita\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(client)/kegiatan/[id]",
				pattern: /^\/kegiatan\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(client)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(client)/produk/[id]",
				pattern: /^\/produk\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(client)/store/[id]",
				pattern: /^\/store\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(client)/struktur-organisasi",
				pattern: /^\/struktur-organisasi\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(client)/wisata/[id]",
				pattern: /^\/wisata\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-BdkKYBQr.js.map
