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
		client: {start:"_app/immutable/entry/start.RLXx9Rw0.js",app:"_app/immutable/entry/app.ebQ8LbdB.js",imports:["_app/immutable/entry/start.RLXx9Rw0.js","_app/immutable/chunks/7mhd4TcY.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/entry/app.ebQ8LbdB.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-Rbv5ylRi.js')),
			__memo(() => import('./1-DTmQNOpY.js')),
			__memo(() => import('./2-C_59App8.js')),
			__memo(() => import('./3-CnwBpyoS.js')),
			__memo(() => import('./4-BHb7MW3m.js')),
			__memo(() => import('./5-DkJFVhx5.js')),
			__memo(() => import('./6-5caWFoby.js')),
			__memo(() => import('./7-C9ykIpbB.js')),
			__memo(() => import('./8-C1-STH23.js')),
			__memo(() => import('./9-B6eFeR61.js')),
			__memo(() => import('./10-BVhLF5to.js')),
			__memo(() => import('./11-CESYWWyZ.js')),
			__memo(() => import('./12-Ds2aKldb.js')),
			__memo(() => import('./13-DwbETfCv.js')),
			__memo(() => import('./14-jiikDNhd.js')),
			__memo(() => import('./15-IhTIjt_H.js')),
			__memo(() => import('./16-kar-ivj3.js')),
			__memo(() => import('./17-DLa9xx8B.js')),
			__memo(() => import('./18-CBzz1Nnc.js')),
			__memo(() => import('./19-8dEPtveL.js')),
			__memo(() => import('./20-Bwctgo-k.js'))
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
//# sourceMappingURL=manifest.js-vF60-sVc.js.map
