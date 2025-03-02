import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "Coding is Cool",
  "description": "Second post.",
  "date": "2024-7-25",
  "categories": ["sveltekit", "svelte"],
  "published": true
};
const { title, description, date, categories, published } = metadata;
const Second_post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 data-svelte-h="svelte-tzycul">Svelte</h2> <p data-svelte-h="svelte-zwt2wz">Media inside the <strong>static</strong> folder is served from <code>/</code>.</p> <p data-svelte-h="svelte-2z9jf5"><img src="/favicon.png" alt="Svelte"></p>`;
});
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Second_post,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_1 as _
};
