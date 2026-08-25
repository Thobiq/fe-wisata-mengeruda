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
		client: {start:"_app/immutable/entry/start.M_jJutA5.js",app:"_app/immutable/entry/app.DCB8vhEx.js",imports:["_app/immutable/entry/start.M_jJutA5.js","_app/immutable/chunks/VVWDWrg0.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/entry/app.DCB8vhEx.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-Rbv5ylRi.js')),
			__memo(() => import('./1-uWwxSWFz.js')),
			__memo(() => import('./2-BGd_oHB0.js')),
			__memo(() => import('./3-C2Gc7GZP.js')),
			__memo(() => import('./4-41h_2oz5.js')),
			__memo(() => import('./5-HEBwClM-.js')),
			__memo(() => import('./6-M4kXodyS.js')),
			__memo(() => import('./7-DQkF3ygc.js')),
			__memo(() => import('./8-BCTM9Jap.js')),
			__memo(() => import('./9-CtPz58AJ.js')),
			__memo(() => import('./10-CLF3Wj_r.js')),
			__memo(() => import('./11-D0Zmrm_2.js')),
			__memo(() => import('./12-DBXiLi7b.js')),
			__memo(() => import('./13-DkU0NdhE.js')),
			__memo(() => import('./14-viC0-vQj.js')),
			__memo(() => import('./15-CERdRnn3.js')),
			__memo(() => import('./16-IAL59nVm.js')),
			__memo(() => import('./17-63W4HXsu.js')),
			__memo(() => import('./18-B-lRRK_7.js')),
			__memo(() => import('./19-B-YYSpr7.js')),
			__memo(() => import('./20--EGDnb_t.js'))
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
//# sourceMappingURL=manifest.js-BYBvz7Sh.js.map
