// in dev, this makes Vite inject its client as this module's first dependency,
// so that global constant replacements are installed before any other module
// (including user hooks) evaluates. In build it's inert.
import.meta.hot;




export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/(client)": [4,[2]],
		"/admin": [12,[3]],
		"/admin/berita": [13,[3]],
		"/admin/galeri": [14,[3]],
		"/admin/kegiatan": [15,[3]],
		"/admin/login": [16,[3]],
		"/admin/profil": [17,[3]],
		"/admin/tempat-wisata": [18,[3]],
		"/admin/umkm": [19,[3]],
		"/admin/umkm/[id]/produk": [20,[3]],
		"/(client)/berita/[slug]": [5,[2]],
		"/(client)/kegiatan/[id]": [6,[2]],
		"/(client)/login": [7,[2]],
		"/(client)/produk/[id]": [8,[2]],
		"/(client)/store/[id]": [9,[2]],
		"/(client)/struktur-organisasi": [10,[2]],
		"/(client)/wisata/[id]": [11,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);