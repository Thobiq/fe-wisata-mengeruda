

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b8w53wS5.js","_app/immutable/chunks/B8o_ubcR.js","_app/immutable/chunks/BZix6Af6.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
