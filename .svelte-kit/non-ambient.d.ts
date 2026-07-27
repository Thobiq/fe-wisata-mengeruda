
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(client)" | "/" | "/admin" | "/admin/berita" | "/admin/galeri" | "/admin/kegiatan" | "/admin/login" | "/admin/profil" | "/admin/tempat-wisata" | "/admin/umkm" | "/admin/umkm/[id]" | "/admin/umkm/[id]/produk" | "/(client)/berita" | "/(client)/berita/[slug]" | "/(client)/kegiatan" | "/(client)/kegiatan/[id]" | "/(client)/login" | "/(client)/produk" | "/(client)/produk/[id]" | "/(client)/store" | "/(client)/store/[id]" | "/(client)/struktur-organisasi" | "/(client)/wisata" | "/(client)/wisata/[id]";
		RouteParams(): {
			"/admin/umkm/[id]": { id: string };
			"/admin/umkm/[id]/produk": { id: string };
			"/(client)/berita/[slug]": { slug: string };
			"/(client)/kegiatan/[id]": { id: string };
			"/(client)/produk/[id]": { id: string };
			"/(client)/store/[id]": { id: string };
			"/(client)/wisata/[id]": { id: string }
		};
		LayoutParams(): {
			"/(client)": { slug?: string | undefined; id?: string | undefined };
			"/": { id?: string | undefined; slug?: string | undefined };
			"/admin": { id?: string | undefined };
			"/admin/berita": Record<string, never>;
			"/admin/galeri": Record<string, never>;
			"/admin/kegiatan": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/profil": Record<string, never>;
			"/admin/tempat-wisata": Record<string, never>;
			"/admin/umkm": { id?: string | undefined };
			"/admin/umkm/[id]": { id: string };
			"/admin/umkm/[id]/produk": { id: string };
			"/(client)/berita": { slug?: string | undefined };
			"/(client)/berita/[slug]": { slug: string };
			"/(client)/kegiatan": { id?: string | undefined };
			"/(client)/kegiatan/[id]": { id: string };
			"/(client)/login": Record<string, never>;
			"/(client)/produk": { id?: string | undefined };
			"/(client)/produk/[id]": { id: string };
			"/(client)/store": { id?: string | undefined };
			"/(client)/store/[id]": { id: string };
			"/(client)/struktur-organisasi": Record<string, never>;
			"/(client)/wisata": { id?: string | undefined };
			"/(client)/wisata/[id]": { id: string }
		};
		Pathname(): "/" | "/admin" | "/admin/berita" | "/admin/galeri" | "/admin/kegiatan" | "/admin/login" | "/admin/profil" | "/admin/tempat-wisata" | "/admin/umkm" | `/admin/umkm/${string}/produk` & {} | `/berita/${string}` & {} | `/kegiatan/${string}` & {} | "/login" | `/produk/${string}` & {} | `/store/${string}` & {} | "/struktur-organisasi" | `/wisata/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/acara-adat-resepsi.png" | "/Batas_Desa.json" | "/berangkat-sekolah.jpeg" | "/diskusi-kantor-desa.png" | "/Fasilitas_Desa_Mengeruda.json" | "/hero-1.jpg" | "/hero-2.png" | "/icon-apbd.png" | "/Jalan_Desa_Mengeruda.json" | "/karang-taruna.png" | "/kunjungan-mahasiswa-sekolah.jpeg" | "/logo.png" | "/menjemur-padi.jpeg" | "/mpls-satap.png" | "/peta-mengeruda.png" | "/produk-tempe.png" | "/robots.txt" | "/sinergi-mahasiswa-kkn.jpeg" | "/user-placeholder.png" | "/wisata-air-panas.jpeg" | string & {};
	}
}