export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DesJin0Y.js",app:"_app/immutable/entry/app.BfPxHFmF.js",imports:["_app/immutable/entry/start.DesJin0Y.js","_app/immutable/chunks/DAeYH5AC.js","_app/immutable/chunks/oaJrz1TM.js","_app/immutable/chunks/BWzIiUQM.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/entry/app.BfPxHFmF.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/oaJrz1TM.js","_app/immutable/chunks/COxv0z7M.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/content",
				pattern: /^\/api\/content\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/content/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
