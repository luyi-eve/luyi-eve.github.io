import { c as create_ssr_component } from "./ssr.js";
const metadata = {
  "title": "Svelte is Fun",
  "description": "First post.",
  "date": "2024-7-25",
  "categories": ["sveltekit", "svelte"],
  "published": true
};
const { title, description, date, categories, published } = metadata;
const First_post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 data-svelte-h="svelte-1l3q54i">Svelte is Fun</h2> <p data-svelte-h="svelte-atyp5e">Hey friends! 👋</p> <!-- HTML_TAG_START -->${`<pre class="shiki vesper" style="background-color:#101010;color:#FFF" tabindex="0"><code><span class="line"><span style="color:#A0A0A0">&#x3C;</span><span style="color:#FFC799">script</span><span style="color:#A0A0A0">></span></span>
<span class="line"><span style="color:#A0A0A0">	export</span><span style="color:#A0A0A0"> let</span><span style="color:#FFF"> name </span><span style="color:#A0A0A0">=</span><span style="color:#99FFE4"> 'Developers'</span><span style="color:#FFF">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0A0A0">	function</span><span style="color:#FFC799"> greet</span><span style="color:#FFF">(name</span><span style="color:#A0A0A0">:</span><span style="color:#FFC799"> string</span><span style="color:#FFF">) &#123;</span></span>
<span class="line"><span style="color:#FFF">		console.</span><span style="color:#FFC799">log</span><span style="color:#FFF">(</span><span style="color:#99FFE4">&#96;Hey $&#123;</span><span style="color:#FFF">name</span><span style="color:#99FFE4">&#125;! 👋&#96;</span><span style="color:#FFF">);</span></span>
<span class="line"><span style="color:#FFF">	&#125;</span></span>
<span class="line"><span style="color:#A0A0A0">	let</span><span style="color:#FFF"> num </span><span style="color:#A0A0A0">=</span><span style="color:#FFC799"> 0</span><span style="color:#FFF">;</span></span>
<span class="line"><span style="color:#A0A0A0">&#x3C;/</span><span style="color:#FFC799">script</span><span style="color:#A0A0A0">></span></span></code></pre>`}<!-- HTML_TAG_END -->`;
});
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: First_post,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_0 as _
};
