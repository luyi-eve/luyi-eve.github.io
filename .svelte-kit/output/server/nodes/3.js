import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.CschHDtX.js","_app/immutable/chunks/oaJrz1TM.js","_app/immutable/chunks/COxv0z7M.js","_app/immutable/chunks/DrbM07Vh.js","_app/immutable/chunks/4FLGIFN6.js","_app/immutable/chunks/D0QH3NT1.js","_app/immutable/chunks/BWzIiUQM.js"];
export const stylesheets = ["_app/immutable/assets/3.Bwbee1z0.css","_app/immutable/assets/resume.Y9YKM9Zf.css"];
export const fonts = [];
