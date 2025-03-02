import { c as create_ssr_component, f as compute_rest_props, b as subscribe, h as spread, a as add_attribute, i as escape_object, v as validate_component, e as escape, j as each, m as missing_component } from "../../../../chunks/ssr.js";
import { c as cn, a as formatDate, B as Badge } from "../../../../chunks/badge.js";
import { t as toWritableStores, m as makeElement, l as removeUndefined, q as getOptionUpdater, j as createBitAttrs, B as Button } from "../../../../chunks/button.js";
import "dequal";
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function getSeparatorData() {
  const NAME = "separator";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSeparatorData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
  return {
    ...separator,
    updateOption: getOptionUpdater(separator.options)
  };
}
const Separator$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["orientation", "decorative", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { orientation = "horizontal" } = $$props;
  let { decorative = true } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, updateOption, getAttrs } = setCtx({ orientation, decorative });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0) $$bindings.decorative(decorative);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("decorative", decorative);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "orientation", "decorative"]);
  let { class: className = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { decorative = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0) $$bindings.decorative(decorative);
  return `${validate_component(Separator$1, "SeparatorPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )
      },
      { orientation },
      { decorative },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return ` ${$$result.head += `<!-- HEAD_svelte-ylbs26_START -->${$$result.title = `<title>${escape(data.meta.title)}</title>`, ""}<meta property="og:type" content="article"><meta property="og:title"${add_attribute("content", data.meta.title, 0)}><!-- HEAD_svelte-ylbs26_END -->`, ""} <div class="-mt-10">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "/blog",
      style: "padding: 0 0px !important; background:transparent; border:none;",
      class: " mb-2 h-6 border-none bg-transparent text-xs text-muted-foreground outline-none"
    },
    {},
    {
      default: () => {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mb-px mr-1"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
		Back`;
      }
    }
  )}</div> <article> <hgroup class="mb-1"><h1 class="title max-w-[650px] text-2xl font-medium capitalize tracking-tighter">${escape(data.meta.title)}</h1> <div class="mb-3 mt-2 flex max-w-[650px] items-center justify-between text-sm"><p class="text-sm text-neutral-600 dark:text-neutral-400">${escape(formatDate(data.meta.date))}</p></div></hgroup>  <div class="tags mb-2 flex space-x-2">${each(data.meta.categories, (category) => {
    return `${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        variant: "outline",
        class: "rounded-[4px]"
      },
      {},
      {
        default: () => {
          return `${escape(category)}`;
        }
      }
    )}`;
  })}</div> ${validate_component(Separator, "Separator").$$render($$result, { class: "mb-4" }, {}, {})}  <div class="prose-video prose-ol:my2 prose dark:prose-invert prose-h1:my-1 prose-h2:my-1 prose-h3:my-1 prose-p:my-0 prose-a:my-3 prose-blockquote:my-3 prose-figcaption:my-3 prose-pre:my-3 prose-ul:my-3 prose-table:border-b last:prose-table:border-b prose-thead:border prose-thead:bg-zinc-100 prose-th:border prose-td:border-x prose-td:text-center prose-img:mx-auto prose-img:my-3 prose-img:text-center prose-hr:my-3 dark:prose-thead:bg-zinc-900">${validate_component(data.content || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div></article>`;
});
export {
  Page as default
};
