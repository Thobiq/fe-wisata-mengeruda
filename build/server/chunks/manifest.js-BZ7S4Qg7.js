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
		client: {start:"_app/immutable/entry/start.B34TtePx.js",app:"_app/immutable/entry/app.DDhz0Pur.js",imports:["_app/immutable/entry/start.B34TtePx.js","_app/immutable/chunks/CV-SGtrG.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/entry/app.DDhz0Pur.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-Rbv5ylRi.js')),
			__memo(() => import('./1-CBdQBBgo.js')),
			__memo(() => import('./2-CEtCEwWu.js')),
			__memo(() => import('./3-BZPTboMe.js')),
			__memo(() => import('./4-BxD__7-O.js')),
			__memo(() => import('./5-Af8kqtSj.js')),
			__memo(() => import('./6-aJLwbqMi.js')),
			__memo(() => import('./7-Da62uLc-.js')),
			__memo(() => import('./8-Cyn28EfL.js')),
			__memo(() => import('./9-By9w13yO.js')),
			__memo(() => import('./10-BsLFMDC9.js')),
			__memo(() => import('./11-DEHOSpKS.js')),
			__memo(() => import('./12-v4x0GCGR.js')),
			__memo(() => import('./13-BveFQxEg.js')),
			__memo(() => import('./14-D7DsUc3q.js')),
			__memo(() => import('./15-CAooQzQB.js')),
			__memo(() => import('./16-Bc0PduQY.js')),
			__memo(() => import('./17-BcH2azXB.js')),
			__memo(() => import('./18-DEFMdhnd.js')),
			__memo(() => import('./19-C9Lqc-xb.js')),
			__memo(() => import('./20-C2ZnAzR8.js'))
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
//# sourceMappingURL=manifest.js-BZ7S4Qg7.js.map
