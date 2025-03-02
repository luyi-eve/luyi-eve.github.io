import { o as onDestroy, d as createEventDispatcher, s as setContext, c as create_ssr_component, f as compute_rest_props, h as spread, a as add_attribute, i as escape_object, g as getContext, b as subscribe, v as validate_component, e as escape, j as each, m as missing_component } from "../../chunks/ssr.js";
import "dequal";
import { w as withGet, n as noop, i as isHTMLElement, t as toWritableStores, o as omit, a as isBrowser, m as makeElement, s as styleToString, e as executeCallbacks, b as addEventListener, c as addMeltEventListener, k as kbd, d as createElHelpers, r as removeUndefined, f as isElement, g as isDocument, h as isTouch, p as portalAttr, j as createBitAttrs, l as removeUndefined$1, q as getOptionUpdater, B as Button } from "../../chunks/button.js";
import { d as derived, w as writable } from "../../chunks/index2.js";
import { t as tick, D as DATA, B as BlurFade, P as ProjectCard } from "../../chunks/resume.js";
import { nanoid } from "nanoid/non-secure";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import "clsx";
import { c as derivedMode } from "../../chunks/stores.js";
import { f as flyAndScale, c as cn, B as Badge } from "../../chunks/badge.js";
import "marked";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
function makeHull(points) {
  const newPoints = points.slice();
  newPoints.sort(POINT_COMPARATOR);
  return makeHullPresorted(newPoints);
}
function makeHullPresorted(points) {
  if (points.length <= 1)
    return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        upperHull.pop();
      else
        break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        lowerHull.pop();
      else
        break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
    return upperHull;
  else
    return upperHull.concat(lowerHull);
}
function POINT_COMPARATOR(a, b) {
  if (a.x < b.x)
    return -1;
  else if (a.x > b.x)
    return 1;
  else if (a.y < b.y)
    return -1;
  else if (a.y > b.y)
    return 1;
  else
    return 0;
}
function getPointsFromEl(el) {
  const rect = el.getBoundingClientRect();
  return [
    { x: rect.left, y: rect.top },
    { x: rect.right, y: rect.top },
    { x: rect.right, y: rect.bottom },
    { x: rect.left, y: rect.bottom }
  ];
}
function makeHullFromElements(els) {
  const points = els.flatMap((el) => getPointsFromEl(el));
  return makeHull(points);
}
function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function effect(stores, fn) {
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    cb = fn(stores2);
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
const defaults$1 = {
  src: "",
  delayMs: 0,
  onLoadingStatusChange: void 0
};
const createAvatar = (props) => {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "loadingStatus", "onLoadingStatusChange"));
  const { src, delayMs } = options;
  const loadingStatusWritable = withDefaults.loadingStatus ?? writable("loading");
  const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);
  effect([src, delayMs], ([$src, $delayMs]) => {
    if (isBrowser) {
      const image2 = new Image();
      image2.src = $src;
      image2.onload = () => {
        if (delayMs !== void 0) {
          const timerId = window.setTimeout(() => {
            loadingStatus.set("loaded");
          }, $delayMs);
          return () => window.clearTimeout(timerId);
        } else {
          loadingStatus.set("loaded");
        }
      };
      image2.onerror = () => {
        loadingStatus.set("error");
      };
    }
  });
  const image = makeElement("avatar-image", {
    stores: [src, loadingStatus],
    returned: ([$src, $loadingStatus]) => {
      const imageStyles = styleToString({
        display: $loadingStatus === "loaded" ? "block" : "none"
      });
      return {
        src: $src,
        style: imageStyles
      };
    }
  });
  const fallback = makeElement("avatar-fallback", {
    stores: [loadingStatus],
    returned: ([$loadingStatus]) => {
      return {
        style: $loadingStatus === "loaded" ? styleToString({
          display: "none"
        }) : void 0,
        hidden: $loadingStatus === "loaded" ? true : void 0
      };
    }
  });
  return {
    elements: {
      image,
      fallback
    },
    states: {
      loadingStatus
    },
    options
  };
};
const defaultConfig = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
};
const defaults = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  closeOnPointerDown: true,
  openDelay: 1e3,
  closeDelay: 0,
  forceVisible: false,
  portal: void 0,
  closeOnEscape: true,
  disableHoverableContent: false,
  group: void 0
};
const { name } = createElHelpers("tooltip");
const groupMap = /* @__PURE__ */ new Map();
const tooltipIdParts = ["trigger", "content"];
function createTooltip(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, closeOnPointerDown, openDelay, closeDelay, forceVisible, portal, closeOnEscape, disableHoverableContent, group } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const openReason = writable(null);
  const ids = toWritableStores({ ...generateIds(tooltipIdParts), ...withDefaults.ids });
  let clickedTrigger = false;
  const getEl = (part) => {
    if (!isBrowser)
      return null;
    return document.getElementById(ids[part].get());
  };
  let openTimeout = null;
  let closeTimeout = null;
  function openTooltip(reason) {
    if (closeTimeout) {
      window.clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    if (!openTimeout) {
      openTimeout = window.setTimeout(() => {
        open.set(true);
        openReason.update((prev) => prev ?? reason);
        openTimeout = null;
      }, openDelay.get());
    }
  }
  function closeTooltip(isBlur) {
    if (openTimeout) {
      window.clearTimeout(openTimeout);
      openTimeout = null;
    }
    if (isBlur && isMouseInTooltipArea) {
      openReason.set("pointer");
      return;
    }
    if (!closeTimeout) {
      closeTimeout = window.setTimeout(() => {
        open.set(false);
        openReason.set(null);
        if (isBlur)
          clickedTrigger = false;
        closeTimeout = null;
      }, closeDelay.get());
    }
  }
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  const trigger = makeElement(name("trigger"), {
    stores: [ids.content, ids.trigger, open],
    returned: ([$contentId, $triggerId, $open]) => {
      return {
        "aria-describedby": $contentId,
        id: $triggerId,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      const keydownHandler = (e) => {
        if (closeOnEscape.get() && e.key === kbd.ESCAPE) {
          if (openTimeout) {
            window.clearTimeout(openTimeout);
            openTimeout = null;
          }
          open.set(false);
        }
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", () => {
        const $closeOnPointerDown = closeOnPointerDown.get();
        if (!$closeOnPointerDown)
          return;
        open.set(false);
        clickedTrigger = true;
        if (openTimeout) {
          window.clearTimeout(openTimeout);
          openTimeout = null;
        }
      }), addMeltEventListener(node, "pointerenter", (e) => {
        if (isTouch(e))
          return;
        openTooltip("pointer");
      }), addMeltEventListener(node, "pointerleave", (e) => {
        if (isTouch(e))
          return;
        if (openTimeout) {
          window.clearTimeout(openTimeout);
          openTimeout = null;
        }
      }), addMeltEventListener(node, "focus", () => {
        if (clickedTrigger)
          return;
        openTooltip("focus");
      }), addMeltEventListener(node, "blur", () => closeTooltip(true)), addMeltEventListener(node, "keydown", keydownHandler), addEventListener(document, "keydown", keydownHandler));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, open, portal, ids.content],
    returned: ([$isVisible, $open, $portal, $contentId]) => {
      return removeUndefined({
        role: "tooltip",
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: $isVisible ? void 0 : styleToString({ display: "none" }),
        id: $contentId,
        "data-portal": portalAttr($portal),
        "data-state": $open ? "open" : "closed"
      });
    },
    action: (node) => {
      let unsubFloating = noop;
      let unsubPortal = noop;
      const unsubDerived = effect([isVisible, positioning, portal], ([$isVisible, $positioning, $portal]) => {
        unsubPortal();
        unsubFloating();
        const triggerEl = getEl("trigger");
        if (!$isVisible || !triggerEl)
          return;
        tick().then(() => {
          unsubPortal();
          unsubFloating();
          const portalDest = getPortalDestination(node, $portal);
          if (portalDest)
            unsubPortal = usePortal(node, portalDest).destroy;
          unsubFloating = useFloating(triggerEl, node, $positioning).destroy;
        });
      });
      function handleScroll(e) {
        if (!open.get())
          return;
        const target = e.target;
        if (!isElement(target) && !isDocument(target))
          return;
        const triggerEl = getEl("trigger");
        if (triggerEl && target.contains(triggerEl)) {
          closeTooltip();
        }
      }
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerenter", () => openTooltip("pointer")), addMeltEventListener(node, "pointerdown", () => openTooltip("pointer")), addEventListener(window, "scroll", handleScroll, { capture: true }));
      return {
        destroy() {
          unsubEvents();
          unsubPortal();
          unsubFloating();
          unsubDerived();
        }
      };
    }
  });
  const arrow2 = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  let isMouseInTooltipArea = false;
  effect(open, ($open) => {
    const currentGroup = group.get();
    if (currentGroup === void 0 || currentGroup === false) {
      return;
    }
    if (!$open) {
      if (groupMap.get(currentGroup) === open) {
        groupMap.delete(currentGroup);
      }
      return;
    }
    const currentOpen = groupMap.get(currentGroup);
    currentOpen?.set(false);
    groupMap.set(currentGroup, open);
  });
  effect([open, openReason], ([$open, $openReason]) => {
    if (!$open || !isBrowser)
      return;
    return executeCallbacks(addEventListener(document, "mousemove", (e) => {
      const contentEl = getEl("content");
      const triggerEl = getEl("trigger");
      if (!contentEl || !triggerEl)
        return;
      const polygonElements = disableHoverableContent.get() ? [triggerEl] : [triggerEl, contentEl];
      const polygon = makeHullFromElements(polygonElements);
      isMouseInTooltipArea = pointInPolygon({
        x: e.clientX,
        y: e.clientY
      }, polygon);
      if ($openReason !== "pointer")
        return;
      if (!isMouseInTooltipArea) {
        closeTooltip();
      }
    }));
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2
    },
    states: { open },
    options
  };
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
function getAvatarData() {
  const NAME = "avatar";
  const PARTS = ["root", "image", "fallback"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getAvatarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const avatar = { ...createAvatar(removeUndefined$1(props)), getAttrs };
  setContext(NAME, avatar);
  return {
    ...avatar,
    updateOption: getOptionUpdater(avatar.options)
  };
}
const Avatar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["delayMs", "loadingStatus", "onLoadingStatusChange", "asChild", "el"]);
  let { delayMs = void 0 } = $$props;
  let { loadingStatus = void 0 } = $$props;
  let { onLoadingStatusChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { loadingStatus: localLoadingStatus }, updateOption, getAttrs } = setCtx$1({
    src: "",
    delayMs,
    onLoadingStatusChange: ({ next }) => {
      loadingStatus = next;
      onLoadingStatusChange?.(next);
      return next;
    }
  });
  const attrs = getAttrs("root");
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  if ($$props.loadingStatus === void 0 && $$bindings.loadingStatus && loadingStatus !== void 0) $$bindings.loadingStatus(loadingStatus);
  if ($$props.onLoadingStatusChange === void 0 && $$bindings.onLoadingStatusChange && onLoadingStatusChange !== void 0) $$bindings.onLoadingStatusChange(onLoadingStatusChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  loadingStatus !== void 0 && localLoadingStatus.set(loadingStatus);
  {
    updateOption("delayMs", delayMs);
  }
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</div>`}`;
});
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getTooltipData() {
  const NAME = "tooltip";
  const PARTS = ["arrow", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getTooltipData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const tooltip = {
    ...createTooltip({
      positioning: {
        placement: "top",
        gutter: 0
      },
      openDelay: 700,
      ...removeUndefined$1(props),
      forceVisible: true
    }),
    getAttrs
  };
  setContext(NAME, tooltip);
  return {
    ...tooltip,
    updateOption: getOptionUpdater(tooltip.options)
  };
}
function getCtx() {
  const { NAME } = getTooltipData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "top",
    align: "center",
    sideOffset: 1
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater({ ...withDefaults });
}
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { closeOnPointerDown = void 0 } = $$props;
  let { openDelay = void 0 } = $$props;
  let { closeDelay = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { disableHoverableContent = void 0 } = $$props;
  let { group = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnEscape,
    portal,
    closeOnPointerDown,
    openDelay,
    closeDelay,
    forceVisible: true,
    defaultOpen: open,
    disableHoverableContent,
    group,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.closeOnPointerDown === void 0 && $$bindings.closeOnPointerDown && closeOnPointerDown !== void 0) $$bindings.closeOnPointerDown(closeOnPointerDown);
  if ($$props.openDelay === void 0 && $$bindings.openDelay && openDelay !== void 0) $$bindings.openDelay(openDelay);
  if ($$props.closeDelay === void 0 && $$bindings.closeDelay && closeDelay !== void 0) $$bindings.closeDelay(closeDelay);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.disableHoverableContent === void 0 && $$bindings.disableHoverableContent && disableHoverableContent !== void 0) $$bindings.disableHoverableContent(disableHoverableContent);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("closeOnPointerDown", closeOnPointerDown);
  }
  {
    updateOption("openDelay", openDelay);
  }
  {
    updateOption("closeDelay", closeDelay);
  }
  {
    updateOption("group", group);
  }
  {
    updateOption("disableHoverableContent", disableHoverableContent);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Tooltip_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $content, $$unsubscribe_content;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "top" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_content();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Tooltip_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Tooltip_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { y: 8, duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Tooltip_content$1, "TooltipPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Tooltip;
const Trigger = Tooltip_trigger;
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "delayMs"]);
  let { class: className = void 0 } = $$props;
  let { delayMs = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  return `${validate_component(Avatar$1, "AvatarPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { delayMs },
      {
        class: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const css$1 = {
  code: ".custom-underline.svelte-y9nwr2{cursor:pointer}.custom-underline.svelte-y9nwr2:hover{text-decoration:underline;text-decoration-color:#a1bbff;text-decoration-thickness:1.5px;text-underline-offset:5px}",
  map: '{"version":3,"file":"ReportingCard.svelte","sources":["ReportingCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Badge from \\"$lib/components/ui/badge/badge.svelte\\";\\nimport * as Avatar from \\"$lib/components/ui/avatar\\";\\nimport { marked } from \\"marked\\";\\nexport let title;\\nexport let url;\\nexport let description;\\nexport let dates;\\nexport let location;\\nexport let image = \\"\\";\\nexport let links = [];\\n<\/script>\\n\\n<li class=\\"relative ml-1 py-4 flex\\">\\n    <div class=\\"flex items-start\\">\\n        <Avatar.Root class=\\"m-auto border\\" style=\\"margin-right:20px; border-radius: 0; width: 100px; height: 100px;\\">\\n            <img src={image} alt={title} class=\\"object-contain\\" />\\n            <!-- <Avatar.Fallback>{title[0]}</Avatar.Fallback> -->\\n        </Avatar.Root>\\n        <div class=\\"flex flex-1 flex-col justify-start gap-1 ml-4\\">\\n\\t\\t\\t<a href=\\"{url}\\" class=\\"custom-underline text-current hover:text-opacity-75\\">\\n\\t\\t\\t\\t<h2 class=\\"font-semibold leading-1.6 mb-2 \\">{title}</h2>\\n\\t\\t\\t</a>\\n            {#if location}\\n                <p class=\\"text-sm text-muted-foreground\\">{location}</p>\\n            {/if}\\n            {#if dates}\\n                <time class=\\"text-xs text-muted-foreground\\">{dates}</time>\\n            {/if}\\n            \\n            <!-- {#if description}\\n                <span class=\\"prose dark:prose-invert text-sm text-muted-foreground\\">\\n                    {@html marked(description)}\\n                </span>\\n            {/if} -->\\n\\n\\t\\t\\t{#if links && links.length > 0}\\n\\t\\t\\t\\t<div class=\\"mt-2 flex flex-row flex-wrap items-start gap-2\\">\\n\\t\\t\\t\\t\\t{#each links as link, idx}\\n\\t\\t\\t\\t\\t\\t<a href=\\"{link.href}\\">\\n\\t\\t\\t\\t\\t\\t\\t<Badge key={idx} title=\\"{link.title}\\" class=\\"flex gap-2\\" style=\\"color:black; background-color:#d9f9f4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<svelte:component this=\\"{link.icon}\\" class=\\"h-4 w-4 \\" strokeWidth=\\"1.6\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t{link.title}\\n\\t\\t\\t\\t\\t\\t\\t</Badge>\\n\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n        </div>\\n    </div>\\n</li>\\n\\n<style>\\n\\t/* Scoped CSS for this component */\\n\\t.custom-underline {\\n        cursor: pointer;\\n    }\\n    .custom-underline:hover {\\n        text-decoration: underline;\\n        text-decoration-color: #a1bbff; /* Change underline color on hover */\\n        text-decoration-thickness: 1.5px; /* Set the thickness of the underline */\\n        text-underline-offset: 5px; /* Adjust the space between text and underline */\\n    }\\n</style>\\n"],"names":[],"mappings":"AAqDC,+BAAkB,CACX,MAAM,CAAE,OACZ,CACA,+BAAiB,MAAO,CACpB,eAAe,CAAE,SAAS,CAC1B,qBAAqB,CAAE,OAAO,CAC9B,yBAAyB,CAAE,KAAK,CAChC,qBAAqB,CAAE,GAC3B"}'
};
const ReportingCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { url } = $$props;
  let { description } = $$props;
  let { dates } = $$props;
  let { location } = $$props;
  let { image = "" } = $$props;
  let { links = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0) $$bindings.dates(dates);
  if ($$props.location === void 0 && $$bindings.location && location !== void 0) $$bindings.location(location);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  if ($$props.links === void 0 && $$bindings.links && links !== void 0) $$bindings.links(links);
  $$result.css.add(css$1);
  return `<li class="relative ml-1 py-4 flex"><div class="flex items-start">${validate_component(Avatar, "Avatar.Root").$$render(
    $$result,
    {
      class: "m-auto border",
      style: "margin-right:20px; border-radius: 0; width: 100px; height: 100px;"
    },
    {},
    {
      default: () => {
        return `<img${add_attribute("src", image, 0)}${add_attribute("alt", title, 0)} class="object-contain"> `;
      }
    }
  )} <div class="flex flex-1 flex-col justify-start gap-1 ml-4"><a${add_attribute("href", url, 0)} class="custom-underline text-current hover:text-opacity-75 svelte-y9nwr2"><h2 class="font-semibold leading-1.6 mb-2 ">${escape(title)}</h2></a> ${location ? `<p class="text-sm text-muted-foreground">${escape(location)}</p>` : ``} ${dates ? `<time class="text-xs text-muted-foreground">${escape(dates)}</time>` : ``}  ${links && links.length > 0 ? `<div class="mt-2 flex flex-row flex-wrap items-start gap-2">${each(links, (link, idx) => {
    return `<a${add_attribute("href", link.href, 0)}>${validate_component(Badge, "Badge").$$render(
      $$result,
      {
        key: idx,
        title: link.title,
        class: "flex gap-2",
        style: "color:black; background-color:#d9f9f4"
      },
      {},
      {
        default: () => {
          return `${validate_component(link.icon || missing_component, "svelte:component").$$render($$result, { class: "h-4 w-4 ", strokeWidth: "1.6" }, {}, {})} ${escape(link.title)} `;
        }
      }
    )} </a>`;
  })}</div>` : ``}</div></div> </li>`;
});
const videos = [
  {
    id: 1,
    title: "Under One Dark Sky",
    length: "19:19",
    src: "https://www.youtube-nocookie.com/embed/7amgJlkS4pk",
    description: "As light pollution worsens in cities and countryside, a hopeful movement led by activists in Western Marin, California, aims to preserve the night sky by making it the Bay Area's first Dark Sky Community."
  },
  {
    id: 2,
    title: "Tidal Variance",
    length: "29:42",
    src: "https://drive.google.com/file/d/1ybwNRVpggg-CS95s35wyBDjbfxS6uEH9/preview",
    description: "A student documentary that features the regional water issues caused by climate change including Miami’s sea-level rise, Bangladesh’s seasonal flooding, and Little Haiti’s climate gentrification."
  },
  {
    id: 3,
    title: "Shanghai Lockdown 2022",
    length: "2:40",
    src: "https://www.youtube-nocookie.com/embed/fxK_2Dpu0nA",
    description: "A short film that features real-life situations during the world’s strictest COVID Lockdown in the Chinese city of Shanghai in April 2022."
  },
  {
    id: 4,
    title: "Food Desert in Overtown",
    length: "6:11",
    src: "https://www.youtube-nocookie.com/embed/NfCUjJpLhek",
    description: "A short film that focuses on food insecurity issues, particularly in Overtown, an under-resourced Caribbean neighborhood located in the city of Miami."
  },
  {
    id: 5,
    title: "How Microchip Shortage Impacted us?",
    length: "7:08",
    src: "https://www.youtube-nocookie.com/embed/YokNYODZe3c",
    description: "An interview-based short film that talks about the global impacts of microchip shortage due to the pandemic. "
  },
  {
    id: 6,
    title: "Cuban Domino Effect in Miami",
    length: "1:36",
    src: "https://www.youtube-nocookie.com/embed/Fd9q-lt4dck",
    description: `A short film that features a tile-based game of "dominoes". The scenario of film was set up at Miami's most iconic spot, Domino Park, in the Cuban community of Little Havana. `
  },
  {
    id: 7,
    title: "A Haitian artist: Louis Rosemont",
    length: "1:09",
    src: "https://www.youtube-nocookie.com/embed/wvpY_stVBVg",
    description: "An interview-based short film with local Haitian artist Louis Rosemont."
  },
  {
    id: 8,
    title: "Find Little Haiti",
    length: "2:40",
    src: "https://www.youtube-nocookie.com/embed/myVN-ftyxnk",
    description: 'A short film that features the largest Haitian American community "Little Haiti" in Miami-Dade County in Florida, with a strong focus on its history, culture, and art evolution.'
  },
  {
    id: 9,
    title: "A Chinese Wheat Straw Artist",
    length: "3:28",
    src: "https://www.youtube-nocookie.com/embed/KS841VeASVY",
    description: "A short film that features the first wheat straw artist in China, Renjie Shi who doesn't paint with pens but with wheat straw to create an incredible world of fine art."
  }
];
const { Object: Object_1 } = globals;
const css = {
  code: 'main.svelte-1746ueg p.svelte-1746ueg{color:#4A4A4A\n	}h2.subtitle.svelte-1746ueg.svelte-1746ueg{font-family:"Cairo Play", serif;color:#000000ba\n	}.slider-container.svelte-1746ueg.svelte-1746ueg{justify-content:center;align-items:center;width:100%;height:520px;overflow:hidden;position:relative}.slider-container.svelte-1746ueg iframe.svelte-1746ueg{width:100%;max-width:600px;height:100%;max-height:350px;display:block;margin:auto}.video-grid.svelte-1746ueg.svelte-1746ueg{display:grid;grid-template-columns:0.35fr 2.3fr 0.35fr;align-items:center;width:100%;margin-top:30px;margin-bottom:65px}.video-info.svelte-1746ueg.svelte-1746ueg{text-align:left}.watch-time.svelte-1746ueg.svelte-1746ueg{font-size:12px;color:gray}.video-info.svelte-1746ueg h2.svelte-1746ueg{font-size:20px;font-weight:bold;margin-bottom:5px}.video-info.svelte-1746ueg p.svelte-1746ueg{font-size:14px;color:#555}.arrow.svelte-1746ueg.svelte-1746ueg{background-color:#e6ecfc;font-family:"Cairo Play", serif;color:black;border:none;padding:5px 7.5px;font-size:10px;cursor:pointer;border-radius:50%;transition:background 0.3s ease}.arrow.svelte-1746ueg.svelte-1746ueg:hover{background-color:#bdf8d2}.left.svelte-1746ueg.svelte-1746ueg{justify-self:start}.right.svelte-1746ueg.svelte-1746ueg{justify-self:end}.custom-underline.svelte-1746ueg.svelte-1746ueg{cursor:pointer}.custom-underline.svelte-1746ueg.svelte-1746ueg:hover{text-decoration:underline;text-decoration-color:#adc4fe;text-decoration-thickness:2px;text-underline-offset:10px}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import * as Tooltip from \\"$lib/components/ui/tooltip\\";\\nimport Button from \\"$lib/components/ui/button/button.svelte\\";\\nimport { mode } from \\"mode-watcher\\";\\n$: theme = $mode;\\nimport BlurFade from \\"$lib/components/magic/BlurFade.svelte\\";\\nlet BLUR_FADE_DELAY = 0.04;\\nimport ReportingCard from \\"$lib/components/portfolio/ReportingCard.svelte\\";\\nimport ProjectCard from \\"$lib/components/portfolio/ProjectCard.svelte\\";\\nimport Badge from \\"$lib/components/ui/badge/badge.svelte\\";\\nimport { DATA } from \\"$lib/data/resume\\";\\nimport { marked } from \\"marked\\";\\nimport { fly } from \\"svelte/transition\\";\\nimport { videos } from \\"./videoData\\";\\nlet currentIndex = 0;\\nlet direction = 1;\\nfunction nextVideo() {\\n  direction = 1;\\n  currentIndex = (currentIndex + 1) % videos.length;\\n}\\nfunction prevVideo() {\\n  direction = -1;\\n  currentIndex = (currentIndex - 1 + videos.length) % videos.length;\\n}\\n<\/script>\\n\\n<svelte:head>\\n\\t<link rel=\\"preconnect\\" href=\\"https://fonts.googleapis.com\\">\\n\\t<link rel=\\"preconnect\\" href=\\"https://fonts.gstatic.com\\" crossorigin>\\n\\t<link href=\\"https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..1000&display=swap\\" rel=\\"stylesheet\\">\\n\\t<link href=\\"https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap\\" rel=\\"stylesheet\\">\\n\\n\\t<title>{DATA.name}</title>\\n\\t<meta name=\\"description\\" content={DATA.description} />\\n\\t<meta property=\\"og:title\\" content={DATA.name} />\\n\\t<meta property=\\"og:description\\" content={DATA.description} />\\n\\t<meta property=\\"og:url\\" content={DATA.url} />\\n\\t<meta property=\\"og:site_name\\" content={DATA.name} />\\n\\t<meta property=\\"og:image\\" content={DATA.img} />\\n\\t<meta property=\\"og:locale\\" content=\\"en_US\\" />\\n\\t<meta property=\\"og:type\\" content=\\"website\\" />\\n\\t<meta name=\\"robots\\" content=\\"index, follow\\" />\\n\\t<meta\\n\\t\\tname=\\"googlebot\\"\\n\\t\\tcontent=\\"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1\\"\\n\\t/>\\n\\t<meta name=\\"twitter:title\\" content={DATA.name} />\\n\\t<meta name=\\"twitter:card\\" content=\\"summary_large_image\\" />\\n\\t<meta name=\\"twitter:image\\" content={DATA.img} />\\n\\t<meta name=\\"twitter:description\\" content={DATA.description} />\\n\\n\\t<meta name=\\"google-site-verification\\" content=\\"your-google-verification-code\\" />\\n\\t<meta name=\\"yandex-verification\\" content=\\"your-yandex-verification-code\\" />\\n</svelte:head>\\n<main class=\\"flex min-h-[100dvh] flex-col space-y-10\\">\\n\\t<section id=\\"intro\\">\\n\\t\\t<div class=\\"mx-auto w-full max-w-2xl space-y-8\\">\\n\\t\\t\\t<div class=\\"flex justify-between gap-2\\">\\n\\t\\t\\t\\t<div class=\\"flex flex-1 flex-col space-y-1.5\\">\\n\\t\\t\\t\\t\\t<BlurFade\\n\\t\\t\\t\\t\\t\\tdelay={BLUR_FADE_DELAY}\\n\\t\\t\\t\\t\\t\\tclass=\\n\\t\\t\\t\\t\\t\\t\\"font-bold tracking-tighter pb-4 text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl\\"\\n\\t\\t\\t\\t\\t\\tyOffset={8}>\\n\\t\\t\\t\\t\\t\\t\\t<div style='font-family:\\"Cairo Play\\", serif;'>\\n\\t\\t\\t\\t\\t\\t\\t\\tHi, I'm Eve (Yi) Lu✨\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t\\t\\t<BlurFade class=\\"md:text-xl\\" delay={BLUR_FADE_DELAY}\\n\\t\\t\\t\\t\\t\\t>I'm a data journalist. I tell stories with data📊, create graphics🎨 and sometimes make films📹.\\n\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</section>\\n\\t<section id=\\"about\\">\\n\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t<h2 class=\\"text-xl font-bold\\">About</h2>\\n\\t\\t</BlurFade>\\n\\t\\t<BlurFade delay={BLUR_FADE_DELAY * 1.4}>\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert\\"\\n\\t\\t\\t\\tstyle=\\"line-height: 1.6;\\"\\n\\t\\t\\t>\\n\\t\\t\\tI am a recent graduate of <span style=\\"text-decoration: underline; font-weight: bold;\\">Stanford University</span> in Data Journalism, and a data reporter intern for <span style=\\"text-decoration: underline; font-weight: bold;\\">Tampa Bay Times</span> in the summer of 2024. Prior to Stanford, I hold a M.A. degree in Journalism at the <span style=\\"text-decoration: underline; font-weight: bold;\\">University of Miami</span> and an alumna of the <span style=\\"text-decoration: underline; font-weight: bold;\\">Lede Program</span> in 2022. I care about <span style=\\"text-decoration: underline; font-weight: bold;\\">social gender inequalities</span> and <span style=\\"text-decoration: underline; font-weight: bold;\\">global environmental matters</span>. Born and raised in Shanghai, I speak English and Mandarin. While not coding, I watch thriller movies alone 🍿 and collect Hello Kittys 🎀₍^. .^₎⟆.\\n\\t\\t\\t</div>\\n\\t\\t</BlurFade>\\n\\t\\t<BlurFade delay={BLUR_FADE_DELAY * 1.4}>\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert\\"\\n\\t\\t\\t>\\n\\t\\t</BlurFade>\\n\\t</section>\\n\\t<section id=\\"skills\\">\\n\\t\\t<div class=\\"flex min-h-0 flex-col gap-y-3\\">\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t<h2 class=\\"text-xl font-bold\\">Tools I use</h2>\\n\\t\\t\\t</BlurFade>\\n\\t\\t\\t<div class=\\"flex flex-wrap gap-1\\">\\n\\t\\t\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY +0.002}>\\n\\t\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"px-1 prose max-w-full text-pretty font-sans text-[14px] text-muted-foreground dark:prose-invert\\"\\n\\t\\t\\t\\t\\t\\t\\tstyle=\\"line-height: 1.6;\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-light\\">████▒▒▒▒▒▒▒▒▒ ?%: I've been self-teaching </span><Badge style=\\" margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black\\">Svelte</Badge><span class=\\"font-light\\">  bit by bit lately.</span> \\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY + 0.002}>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black\\">Python</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px; background-color:#D9F9F4; rounded-lg;color:black\\">Adobe Illustrator</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">Javascript/D3.js</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">HTML/CSS</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">Mapbox</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">QGIS</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">Datawrapper</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">Flourish</Badge>\\n\\t\\t\\t\\t\\t\\t<Badge style=\\"margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black\\">etc</Badge>\\n\\n\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</section>\\n\\t<section id=\\"social-media-icon\\" style=\\"margin-top:10px\\">\\n\\t\\t<div class=\\"pt-4\\">\\n\\t\\t\\t{#each Object.entries(DATA.contact.social)\\n\\t\\t\\t\\t.filter(([_, social]) => social.navbar)\\n\\t\\t\\t\\t.map(([_, social]) => social) as social}\\n\\t\\t\\t\\t\\t<Tooltip.Root openDelay={300}>\\n\\t\\t\\t\\t\\t\\t<Tooltip.Trigger>\\n\\t\\t\\t\\t\\t\\t\\t<Button href={social.url} variant=\\"ghost\\" size=\\"icon\\" class=\\"size-12 rounded-full\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- <svelte:component this={social.icon} class=\\"size-4\\" strokeWidth={1.5} /> -->\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if social?.dark_icon && theme === 'dark'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img src={social?.dark_icon} class=\\"size-4\\" alt={social.name} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<img src={social.icon} class=\\"size-[18px]\\" alt={social.name} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t</Button>\\n\\t\\t\\t\\t\\t\\t</Tooltip.Trigger>\\n\\t\\t\\t\\t\\t\\t<Tooltip.Content>\\n\\t\\t\\t\\t\\t\\t\\t<p>{social.name}</p>\\n\\t\\t\\t\\t\\t\\t</Tooltip.Content>\\n\\t\\t\\t\\t\\t</Tooltip.Root>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\t\\n\\t</section>\\n\\t<section id=\\"datavizs\\">\\n\\t\\t<div class=\\"w-full space-y-12 py-10\\">\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t<div class=\\"flex flex-col items-center justify-center space-y-4 text-center\\">\\n\\t\\t\\t\\t\\t<div class=\\"space-y-2\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"inline-block bg-foreground px-3 py-1 text-sm text-background\\"\\n\\t\\t\\t\\t\\t\\tstyle=\\"background-color:#123524\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\tDATA STORY\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl\\">I make graphics\\n\\t\\t\\t\\t\\t\\t</h2>\\n\\n\\t\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</BlurFade>\\n\\n\\t\\t\\t<!-- <div class=\\"w-full max-w-full grid grid-cols-1 gap-3 sm:grid-cols-3 sm:max-w-[800px] sm:w-auto md:w-[800px] lg:w-[800px] xl:w-[800px] 2xl:w-[800px] mx-auto\\"> -->\\n\\t\\t\\t<div class=\\"w-full grid grid-cols-1 gap-5 sm:grid-cols-2\\">\\n\\t\\t\\t\\t{#each DATA.datavizs as dataviz, id}\\n\\t\\t\\t\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY * 1.5 + id * 0.05}>\\n\\t\\t\\t\\t\\t\\t\\t<ProjectCard\\n\\t\\t\\t\\t\\t\\t\\t\\thref={dataviz.href}\\n\\t\\t\\t\\t\\t\\t\\t\\ttitle={dataviz.title}\\n\\t\\t\\t\\t\\t\\t\\t\\tpublisher={dataviz.publisher}\\n\\t\\t\\t\\t\\t\\t\\t\\tdescription={dataviz.description}\\n\\t\\t\\t\\t\\t\\t\\t\\tdates={dataviz.dates}\\n\\t\\t\\t\\t\\t\\t\\t\\ttags={dataviz.technologies}\\n\\t\\t\\t\\t\\t\\t\\t\\timage={dataviz.image}\\n\\t\\t\\t\\t\\t\\t\\t\\tvideo={dataviz.video}\\n\\t\\t\\t\\t\\t\\t\\t\\tlinks={dataviz.links}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t<div class=\\"flex flex-col space-y-4 text-center\\">\\n\\t\\t\\t\\t\\t<p class=\\"text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-relaxed\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"font-semibold cursor-pointer custom-underline\\" style=\\"font-family:Cairo Play, serif\\">\\n\\t\\t\\t\\t\\t\\t\\tView Data Projects <a href=\\"/blog\\">Archive →</a>\\n\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\n\\t\\t\\t</BlurFade>\\n\\t\\t</div>\\n\\t</section>\\n\\t<section id=\\"reportings\\">\\n\\t\\t<div class=\\"w-full space-y-8 py-10\\">\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t<div class=\\"flex flex-col items-center justify-center space-y-4 text-center\\">\\n\\t\\t\\t\\t\\t<div class=\\"space-y-2\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"inline-block bg-foreground px-3 py-1 text-sm text-background\\" style=\\"background-color:#123524\\">\\n\\t\\t\\t\\t\\t\\t\\tNEWS REPORTING\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl\\">I write words</h2>\\n\\t\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</BlurFade>\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY * 2}>\\n\\t\\t\\t\\t<ul class=\\"mb-4 ml-4 divide-y divide-dashed\\"> \\n\\t\\t\\t\\t\\t{#each DATA.reportings as project}\\n\\t\\t\\t\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t\\t\\t\\t<ReportingCard {...project} />\\n\\t\\t\\t\\t\\t\\t</BlurFade>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</ul>\\n\\t\\t\\t</BlurFade>\\n\\t\\t</div>\\n\\t</section>\\n\\t<section id=\\"videos\\">\\n\\t\\t<div class=\\"w-full space-y-12 py-4\\">\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY}>\\n\\t\\t\\t\\t<div class=\\"flex flex-col items-center justify-center space-y-4 text-center\\">\\n\\t\\t\\t\\t\\t<div class=\\"space-y-2\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"inline-block bg-foreground px-3 py-1 text-sm text-background\\" style=\\"background-color:#123524\\">\\n\\t\\t\\t\\t\\t\\t\\tDOCUMENTARY\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<h2 class=\\"pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl\\">I produce films</h2>\\n\\t\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</BlurFade>\\n\\t\\t<div class=\\"slider-container\\">\\n\\t\\t  {#each videos as video, index}\\n\\t\\t\\t{#if index === currentIndex}\\n\\t\\t\\t  <iframe\\n\\t\\t\\t\\twidth=\\"600\\"\\n\\t\\t\\t\\theight=\\"350\\"\\n\\t\\t\\t\\tsrc={video.src}\\n\\t\\t\\t\\ttitle={video.title}\\n\\t\\t\\t\\tframeborder=\\"0\\"\\n\\t\\t\\t\\tallow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\"\\n\\t\\t\\t\\tallowfullscreen\\n\\t\\t\\t\\ttransition:fly={{ x: direction * 50, duration: 400 }}\\n\\t\\t\\t  ></iframe>\\n\\n\\t\\t\\t<!-- Grid Layout for Arrows & Text -->\\n\\t\\t\\t<div class=\\"video-grid\\">\\n\\t\\t\\t\\t<!-- Left Arrow -->\\n\\t\\t\\t\\t<button on:click={prevVideo} class=\\"arrow left\\">&larr;</button>\\n\\t\\n\\t\\t\\t\\t<!-- Video Information (Center Column) -->\\n\\t\\t\\t\\t<div class=\\"video-info\\">\\n\\t\\t\\t\\t  <p class=\\"watch-time\\">Watch · {video.length}</p>\\n\\t\\t\\t\\t  <h2>{video.title}</h2>\\n\\t\\t\\t\\t  <p>{video.description}</p>\\n\\t\\t\\t\\t</div>\\n\\t\\n\\t\\t\\t\\t<!-- Right Arrow -->\\n\\t\\t\\t\\t<button on:click={nextVideo} class=\\"arrow right\\">&rarr;</button>\\n\\t\\t\\t\\t\\n\\t\\t\\t</div>\\n\\t\\t\\t \\n\\t\\t\\t{/if}\\n\\t\\t  {/each}\\n\\t\\t</div>\\n\\n\\t</section>\\n\\t<section id=\\"credit\\">\\n\\t\\t<div class=\\"grid w-full items-center justify-center gap-4 px-4 pt-0 pb-10 md:px-6\\">\\n\\t\\t\\t<BlurFade delay={BLUR_FADE_DELAY * 2}>\\n\\t\\t\\t\\t<div class=\\"space-y-3\\">\\n\\t\\t\\t\\t\\t<p class=\\"text-sm\\" style=\\"color:grey\\">\\n\\t\\t\\t\\t\\t\\t© Copyright ･ Svelte template ･<a class=\\"custom-underline\\" href=\\"https://github.com/SikandarJODD\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> \\n\\t\\t\\t\\t\\t\\t\\tSikandar S. Bhide \\n\\t\\t\\t\\t\\t\\t  </a>\\n\\t\\t\\t\\t\\t</p> \\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</BlurFade>\\n\\t\\t</div>\\n\\t</section>\\n</main>\\n\\n<style>\\n\\tmain p {\\n\\t\\tcolor:#4A4A4A\\n\\t}\\n\\t\\n\\th2.subtitle {\\n\\t\\tfont-family:\\"Cairo Play\\", serif;\\n\\t\\tcolor: #000000ba\\n\\t}\\n\\n\\t.slider-container {\\n\\t\\tjustify-content: center; /* Centers horizontally */\\n\\t\\talign-items: center; /* Centers vertically */\\n\\t\\twidth: 100%;\\n\\t\\theight: 520px;\\n\\t\\toverflow: hidden;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.slider-container iframe {\\n\\t\\twidth: 100%; /* Adjusts to full container width */\\n\\t\\tmax-width: 600px; /* Prevents iframe from growing too large */\\n\\t\\theight: 100%;\\n\\t\\tmax-height: 350px;\\n\\t\\tdisplay: block;\\n\\t\\tmargin: auto;\\n\\t}  \\n\\n\\t/* Grid Layout for Arrows and Text */\\n\\t.video-grid {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 0.35fr 2.3fr 0.35fr;\\n\\t\\talign-items: center;\\n\\t\\twidth: 100%;\\n\\t\\tmargin-top: 30px;\\n\\t\\tmargin-bottom: 65px;\\n\\n\\t}\\n\\n\\t/* Center Text Content */\\n\\t.video-info {\\n\\t\\ttext-align: left;\\n\\t}\\n\\n\\t.watch-time {\\n\\t\\tfont-size: 12px;\\n\\t\\tcolor: gray;\\n\\t}\\n\\n\\t.video-info h2 {\\n\\t\\tfont-size: 20px;\\n\\t\\tfont-weight: bold;\\n\\t\\tmargin-bottom: 5px;\\n\\t}\\n\\n\\t.video-info p {\\n\\t\\tfont-size: 14px;\\n\\t\\tcolor: #555;\\n\\t}\\n\\n\\t/* Navigation Arrows */\\n\\t.arrow {\\n\\t\\tbackground-color:#e6ecfc;\\n\\t\\tfont-family:\\"Cairo Play\\", serif;\\n\\t\\tcolor: black;\\n\\t\\tborder: none;\\n\\t\\tpadding: 5px 7.5px;\\n\\t\\tfont-size: 10px;\\n\\t\\tcursor: pointer;\\n\\t\\tborder-radius: 50%;\\n\\t\\ttransition: background 0.3s ease;\\n\\t}\\n\\n\\t.arrow:hover {\\n\\t\\tbackground-color: #bdf8d2;\\n\\t}\\n\\n\\t/* Ensures arrows are aligned properly */\\n\\t.left {\\n\\t\\tjustify-self: start;\\n\\t}\\n\\n\\t.right {\\n\\t\\tjustify-self: end;\\n\\t}\\n\\n\\t/* Scoped CSS for this component */\\n\\t.custom-underline {\\n        cursor: pointer;\\n    }\\n    .custom-underline:hover {\\n        text-decoration: underline;\\n        text-decoration-color: #adc4fe; /* Change underline color on hover */\\n        text-decoration-thickness: 2px; /* Set the thickness of the underline */\\n        text-underline-offset: 10px; /* Adjust the space between text and underline */\\n    }\\n\\n</style>\\n"],"names":[],"mappings":"AAqSC,mBAAI,CAAC,gBAAE,CACN,MAAM,OAAO;AACf,CAAC,CAEA,EAAE,uCAAU,CACX,YAAY,YAAY,CAAC,CAAC,KAAK,CAC/B,KAAK,CAAE,SAAS;AAClB,CAAC,CAEA,+CAAkB,CACjB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,QACX,CAEA,gCAAiB,CAAC,qBAAO,CACxB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IACT,CAGA,yCAAY,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,MAAM,CAAC,KAAK,CAAC,MAAM,CAC1C,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAEhB,CAGA,yCAAY,CACX,UAAU,CAAE,IACb,CAEA,yCAAY,CACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IACR,CAEA,0BAAW,CAAC,iBAAG,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAChB,CAEA,0BAAW,CAAC,gBAAE,CACb,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IACR,CAGA,oCAAO,CACN,iBAAiB,OAAO,CACxB,YAAY,YAAY,CAAC,CAAC,KAAK,CAC/B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CAAC,KAAK,CAClB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAC7B,CAEA,oCAAM,MAAO,CACZ,gBAAgB,CAAE,OACnB,CAGA,mCAAM,CACL,YAAY,CAAE,KACf,CAEA,oCAAO,CACN,YAAY,CAAE,GACf,CAGA,+CAAkB,CACX,MAAM,CAAE,OACZ,CACA,+CAAiB,MAAO,CACpB,eAAe,CAAE,SAAS,CAC1B,qBAAqB,CAAE,OAAO,CAC9B,yBAAyB,CAAE,GAAG,CAC9B,qBAAqB,CAAE,IAC3B"}`
};
let BLUR_FADE_DELAY = 0.04;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theme;
  let $mode, $$unsubscribe_mode;
  $$unsubscribe_mode = subscribe(derivedMode, (value) => $mode = value);
  let currentIndex = 0;
  $$result.css.add(css);
  theme = $mode;
  $$unsubscribe_mode();
  return `${$$result.head += `<!-- HEAD_svelte-1ct0eex_START --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..1000&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap" rel="stylesheet">${$$result.title = `<title>${escape(DATA.name)}</title>`, ""}<meta name="description"${add_attribute("content", DATA.description, 0)}><meta property="og:title"${add_attribute("content", DATA.name, 0)}><meta property="og:description"${add_attribute("content", DATA.description, 0)}><meta property="og:url"${add_attribute("content", DATA.url, 0)}><meta property="og:site_name"${add_attribute("content", DATA.name, 0)}><meta property="og:image"${add_attribute("content", DATA.img, 0)}><meta property="og:locale" content="en_US"><meta property="og:type" content="website"><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"><meta name="twitter:title"${add_attribute("content", DATA.name, 0)}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image"${add_attribute("content", DATA.img, 0)}><meta name="twitter:description"${add_attribute("content", DATA.description, 0)}><meta name="google-site-verification" content="your-google-verification-code"><meta name="yandex-verification" content="your-yandex-verification-code"><!-- HEAD_svelte-1ct0eex_END -->`, ""} <main class="flex min-h-[100dvh] flex-col space-y-10 svelte-1746ueg"><section id="intro"><div class="mx-auto w-full max-w-2xl space-y-8"><div class="flex justify-between gap-2"><div class="flex flex-1 flex-col space-y-1.5">${validate_component(BlurFade, "BlurFade").$$render(
    $$result,
    {
      delay: BLUR_FADE_DELAY,
      class: "font-bold tracking-tighter pb-4 text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl",
      yOffset: 8
    },
    {},
    {
      default: () => {
        return `<div style="font-family:&quot;Cairo Play&quot;, serif;" data-svelte-h="svelte-18c0fir">Hi, I&#39;m Eve (Yi) Lu✨</div>`;
      }
    }
  )} ${validate_component(BlurFade, "BlurFade").$$render(
    $$result,
    {
      class: "md:text-xl",
      delay: BLUR_FADE_DELAY
    },
    {},
    {
      default: () => {
        return `I&#39;m a data journalist. I tell stories with data📊, create graphics🎨 and sometimes make films📹.`;
      }
    }
  )}</div></div></div></section> <section id="about">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<h2 class="text-xl font-bold" data-svelte-h="svelte-z7kkf3">About</h2>`;
    }
  })} ${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY * 1.4 }, {}, {
    default: () => {
      return `<div class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert" style="line-height: 1.6;" data-svelte-h="svelte-81oe1n">I am a recent graduate of <span style="text-decoration: underline; font-weight: bold;">Stanford University</span> in Data Journalism, and a data reporter intern for <span style="text-decoration: underline; font-weight: bold;">Tampa Bay Times</span> in the summer of 2024. Prior to Stanford, I hold a M.A. degree in Journalism at the <span style="text-decoration: underline; font-weight: bold;">University of Miami</span> and an alumna of the <span style="text-decoration: underline; font-weight: bold;">Lede Program</span> in 2022. I care about <span style="text-decoration: underline; font-weight: bold;">social gender inequalities</span> and <span style="text-decoration: underline; font-weight: bold;">global environmental matters</span>. Born and raised in Shanghai, I speak English and Mandarin. While not coding, I watch thriller movies alone 🍿 and collect Hello Kittys 🎀₍^. .^₎⟆.</div>`;
    }
  })} ${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY * 1.4 }, {}, {
    default: () => {
      return `<div class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert" data-svelte-h="svelte-ki6r97"></div>`;
    }
  })}</section> <section id="skills"><div class="flex min-h-0 flex-col gap-y-3">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<h2 class="text-xl font-bold" data-svelte-h="svelte-1lx13r5">Tools I use</h2>`;
    }
  })} <div class="flex flex-wrap gap-1">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY + 2e-3 }, {}, {
    default: () => {
      return `<div class="px-1 prose max-w-full text-pretty font-sans text-[14px] text-muted-foreground dark:prose-invert" style="line-height: 1.6;"><span class="font-light" data-svelte-h="svelte-1b5umhq">████▒▒▒▒▒▒▒▒▒ ?%: I&#39;ve been self-teaching </span>${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: " margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black"
        },
        {},
        {
          default: () => {
            return `Svelte`;
          }
        }
      )}<span class="font-light" data-svelte-h="svelte-p00lih">bit by bit lately.</span></div>`;
    }
  })} ${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY + 2e-3 }, {}, {
    default: () => {
      return `${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px; background-color:#D9F9F4;color:black"
        },
        {},
        {
          default: () => {
            return `Python`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px; background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `Adobe Illustrator`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `Javascript/D3.js`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `HTML/CSS`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `Mapbox`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `QGIS`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `Datawrapper`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `Flourish`;
          }
        }
      )} ${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          style: "margin-right:3px; margin-bottom:9px;background-color:#D9F9F4; rounded-lg;color:black"
        },
        {},
        {
          default: () => {
            return `etc`;
          }
        }
      )}`;
    }
  })}</div></div></section> <section id="social-media-icon" style="margin-top:10px"><div class="pt-4">${each(Object.entries(DATA.contact.social).filter(([_, social]) => social.navbar).map(([_, social]) => social), (social) => {
    return `${validate_component(Root, "Tooltip.Root").$$render($$result, { openDelay: 300 }, {}, {
      default: () => {
        return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                href: social.url,
                variant: "ghost",
                size: "icon",
                class: "size-12 rounded-full"
              },
              {},
              {
                default: () => {
                  return ` ${social?.dark_icon && theme === "dark" ? `<img${add_attribute("src", social?.dark_icon, 0)} class="size-4"${add_attribute("alt", social.name, 0)}>` : `<img${add_attribute("src", social.icon, 0)} class="size-[18px]"${add_attribute("alt", social.name, 0)}>`} `;
                }
              }
            )} `;
          }
        })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<p class="svelte-1746ueg">${escape(social.name)}</p> `;
          }
        })} `;
      }
    })}`;
  })}</div></section> <section id="datavizs"><div class="w-full space-y-12 py-10">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<div class="flex flex-col items-center justify-center space-y-4 text-center" data-svelte-h="svelte-1rjp0vq"><div class="space-y-2"><div class="inline-block bg-foreground px-3 py-1 text-sm text-background" style="background-color:#123524">DATA STORY</div> <h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl svelte-1746ueg">I make graphics</h2> <p class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed svelte-1746ueg"></p></div></div>`;
    }
  })}  <div class="w-full grid grid-cols-1 gap-5 sm:grid-cols-2">${each(DATA.datavizs, (dataviz, id) => {
    return `${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY * 1.5 + id * 0.05 }, {}, {
      default: () => {
        return `${validate_component(ProjectCard, "ProjectCard").$$render(
          $$result,
          {
            href: dataviz.href,
            title: dataviz.title,
            publisher: dataviz.publisher,
            description: dataviz.description,
            dates: dataviz.dates,
            tags: dataviz.technologies,
            image: dataviz.image,
            video: dataviz.video,
            links: dataviz.links
          },
          {},
          {}
        )} `;
      }
    })}`;
  })}</div> ${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<div class="flex flex-col space-y-4 text-center" data-svelte-h="svelte-oyyu9j"><p class="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-relaxed svelte-1746ueg"><span class="font-semibold cursor-pointer custom-underline svelte-1746ueg" style="font-family:Cairo Play, serif">View Data Projects <a href="/blog">Archive →</a></span></p></div>`;
    }
  })}</div></section> <section id="reportings"><div class="w-full space-y-8 py-10">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<div class="flex flex-col items-center justify-center space-y-4 text-center" data-svelte-h="svelte-c1t3ao"><div class="space-y-2"><div class="inline-block bg-foreground px-3 py-1 text-sm text-background" style="background-color:#123524">NEWS REPORTING</div> <h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl svelte-1746ueg">I write words</h2> <p class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed svelte-1746ueg"></p></div></div>`;
    }
  })} ${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY * 2 }, {}, {
    default: () => {
      return `<ul class="mb-4 ml-4 divide-y divide-dashed">${each(DATA.reportings, (project) => {
        return `${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
          default: () => {
            return `${validate_component(ReportingCard, "ReportingCard").$$render($$result, Object_1.assign({}, project), {}, {})} `;
          }
        })}`;
      })}</ul>`;
    }
  })}</div></section> <section id="videos"><div class="w-full space-y-12 py-4">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY }, {}, {
    default: () => {
      return `<div class="flex flex-col items-center justify-center space-y-4 text-center" data-svelte-h="svelte-3scfln"><div class="space-y-2"><div class="inline-block bg-foreground px-3 py-1 text-sm text-background" style="background-color:#123524">DOCUMENTARY</div> <h2 class="pt-4 subtitle text-3xl font-bold tracking-tighter sm:text-4xl svelte-1746ueg">I produce films</h2> <p class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed svelte-1746ueg"></p></div></div>`;
    }
  })} <div class="slider-container svelte-1746ueg">${each(videos, (video, index) => {
    return `${index === currentIndex ? `<iframe width="600" height="350"${add_attribute("src", video.src, 0)}${add_attribute("title", video.title, 0)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="svelte-1746ueg"></iframe>  <div class="video-grid svelte-1746ueg"> <button class="arrow left svelte-1746ueg" data-svelte-h="svelte-1xijw83">←</button>  <div class="video-info svelte-1746ueg"><p class="watch-time svelte-1746ueg">Watch · ${escape(video.length)}</p> <h2 class="svelte-1746ueg">${escape(video.title)}</h2> <p class="svelte-1746ueg">${escape(video.description)}</p></div>  <button class="arrow right svelte-1746ueg" data-svelte-h="svelte-sukqlm">→</button> </div>` : ``}`;
  })}</div></div></section> <section id="credit"><div class="grid w-full items-center justify-center gap-4 px-4 pt-0 pb-10 md:px-6">${validate_component(BlurFade, "BlurFade").$$render($$result, { delay: BLUR_FADE_DELAY * 2 }, {}, {
    default: () => {
      return `<div class="space-y-3" data-svelte-h="svelte-z9nu6e"><p class="text-sm svelte-1746ueg" style="color:grey">© Copyright ･ Svelte template ･<a class="custom-underline svelte-1746ueg" href="https://github.com/SikandarJODD" target="_blank" rel="noopener noreferrer">Sikandar S. Bhide</a></p></div>`;
    }
  })}</div></section> </main>`;
});
export {
  Page as default
};
