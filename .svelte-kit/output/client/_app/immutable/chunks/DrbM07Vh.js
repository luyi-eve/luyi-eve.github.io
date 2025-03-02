import{a as de,t as ue,S as Le,i as We}from"./COxv0z7M.js";import{r as Fe,s as Ce,d as ne,b as _e,h as be,Z as ge,_ as se,$ as Ue,E as $e,F as qe,G as Je,I as Ke,a4 as me,c as Ze,o as He,j as Xe}from"./oaJrz1TM.js";function Lt(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Wt(e,r){ue(e,1,1,()=>{r.delete(e.key)})}function Ft(e,r,t,n,a,o,s,l,i,u,d,x){let v=e.length,S=o.length,z=v;const M={};for(;z--;)M[e[z].key]=z;const m=[],j=new Map,h=new Map,U=[];for(z=S;z--;){const _=x(a,o,z),T=t(_);let P=s.get(T);P?U.push(()=>P.p(_,r)):(P=u(T,_),P.c()),j.set(T,m[z]=P),T in M&&h.set(T,Math.abs(z-M[T]))}const E=new Set,$=new Set;function L(_){de(_,1),_.m(l,d),s.set(_.key,_),d=_.first,S--}for(;v&&S;){const _=m[S-1],T=e[v-1],P=_.key,I=T.key;_===T?(d=_.first,v--,S--):j.has(I)?!s.has(P)||E.has(P)?L(_):$.has(I)?v--:h.get(P)>h.get(I)?($.add(P),L(_)):(E.add(I),v--):(i(T,s),v--)}for(;v--;){const _=e[v];j.has(_.key)||i(_,s)}for(;S;)L(m[S-1]);return Fe(U),m}function Qe(e,r){const t={},n={},a={$$scope:1};let o=e.length;for(;o--;){const s=e[o],l=r[o];if(l){for(const i in s)i in l||(n[i]=1);for(const i in l)a[i]||(t[i]=l[i],a[i]=1);e[o]=l}else for(const i in s)a[i]=1}for(const s in n)s in t||(t[s]=void 0);return t}function Ut(e){return typeof e=="object"&&e!==null?e:{}}function Se(e){var r,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(r=0;r<a;r++)e[r]&&(t=Se(e[r]))&&(n&&(n+=" "),n+=t)}else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function Ye(){for(var e,r,t=0,n="",a=arguments.length;t<a;t++)(e=arguments[t])&&(r=Se(e))&&(n&&(n+=" "),n+=r);return n}const fe="-";function De(e){const r=tt(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:n}=e;function a(s){const l=s.split(fe);return l[0]===""&&l.length!==1&&l.shift(),ze(l,r)||et(s)}function o(s,l){const i=t[s]||[];return l&&n[s]?[...i,...n[s]]:i}return{getClassGroupId:a,getConflictingClassGroupIds:o}}function ze(e,r){var s;if(e.length===0)return r.classGroupId;const t=e[0],n=r.nextPart.get(t),a=n?ze(e.slice(1),n):void 0;if(a)return a;if(r.validators.length===0)return;const o=e.join(fe);return(s=r.validators.find(({validator:l})=>l(o)))==null?void 0:s.classGroupId}const he=/^\[(.+)\]$/;function et(e){if(he.test(e)){const r=he.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function tt(e){const{theme:r,prefix:t}=e,n={nextPart:new Map,validators:[]};return ot(Object.entries(e.classGroups),t).forEach(([o,s])=>{ie(s,n,o,r)}),n}function ie(e,r,t,n){e.forEach(a=>{if(typeof a=="string"){const o=a===""?r:ye(r,a);o.classGroupId=t;return}if(typeof a=="function"){if(rt(a)){ie(a(n),r,t,n);return}r.validators.push({validator:a,classGroupId:t});return}Object.entries(a).forEach(([o,s])=>{ie(s,ye(r,o),t,n)})})}function ye(e,r){let t=e;return r.split(fe).forEach(n=>{t.nextPart.has(n)||t.nextPart.set(n,{nextPart:new Map,validators:[]}),t=t.nextPart.get(n)}),t}function rt(e){return e.isThemeGetter}function ot(e,r){return r?e.map(([t,n])=>{const a=n.map(o=>typeof o=="string"?r+o:typeof o=="object"?Object.fromEntries(Object.entries(o).map(([s,l])=>[r+s,l])):o);return[t,a]}):e}function nt(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,n=new Map;function a(o,s){t.set(o,s),r++,r>e&&(r=0,n=t,t=new Map)}return{get(o){let s=t.get(o);if(s!==void 0)return s;if((s=n.get(o))!==void 0)return a(o,s),s},set(o,s){t.has(o)?t.set(o,s):a(o,s)}}}const Me="!";function st(e){const{separator:r,experimentalParseClassName:t}=e,n=r.length===1,a=r[0],o=r.length;function s(l){const i=[];let u=0,d=0,x;for(let m=0;m<l.length;m++){let j=l[m];if(u===0){if(j===a&&(n||l.slice(m,m+o)===r)){i.push(l.slice(d,m)),d=m+o;continue}if(j==="/"){x=m;continue}}j==="["?u++:j==="]"&&u--}const v=i.length===0?l:l.substring(d),S=v.startsWith(Me),z=S?v.substring(1):v,M=x&&x>d?x-d:void 0;return{modifiers:i,hasImportantModifier:S,baseClassName:z,maybePostfixModifierPosition:M}}return t?function(i){return t({className:i,parseClassName:s})}:s}function it(e){if(e.length<=1)return e;const r=[];let t=[];return e.forEach(n=>{n[0]==="["?(r.push(...t.sort(),n),t=[]):t.push(n)}),r.push(...t.sort()),r}function at(e){return{cache:nt(e.cacheSize),parseClassName:st(e),...De(e)}}const lt=/\s+/;function ct(e,r){const{parseClassName:t,getClassGroupId:n,getConflictingClassGroupIds:a}=r,o=new Set;return e.trim().split(lt).map(s=>{const{modifiers:l,hasImportantModifier:i,baseClassName:u,maybePostfixModifierPosition:d}=t(s);let x=!!d,v=n(x?u.substring(0,d):u);if(!v){if(!x)return{isTailwindClass:!1,originalClassName:s};if(v=n(u),!v)return{isTailwindClass:!1,originalClassName:s};x=!1}const S=it(l).join(":");return{isTailwindClass:!0,modifierId:i?S+Me:S,classGroupId:v,originalClassName:s,hasPostfixModifier:x}}).reverse().filter(s=>{if(!s.isTailwindClass)return!0;const{modifierId:l,classGroupId:i,hasPostfixModifier:u}=s,d=l+i;return o.has(d)?!1:(o.add(d),a(i,u).forEach(x=>o.add(l+x)),!0)}).reverse().map(s=>s.originalClassName).join(" ")}function dt(){let e=0,r,t,n="";for(;e<arguments.length;)(r=arguments[e++])&&(t=je(r))&&(n&&(n+=" "),n+=t);return n}function je(e){if(typeof e=="string")return e;let r,t="";for(let n=0;n<e.length;n++)e[n]&&(r=je(e[n]))&&(t&&(t+=" "),t+=r);return t}function ae(e,...r){let t,n,a,o=s;function s(i){const u=r.reduce((d,x)=>x(d),e());return t=at(u),n=t.cache.get,a=t.cache.set,o=l,l(i)}function l(i){const u=n(i);if(u)return u;const d=ct(i,t);return a(i,d),d}return function(){return o(dt.apply(null,arguments))}}function C(e){const r=t=>t[e]||[];return r.isThemeGetter=!0,r}const Ge=/^\[(?:([a-z-]+):)?(.+)\]$/i,ut=/^\d+\/\d+$/,ft=new Set(["px","full","screen"]),pt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,bt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,gt=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,mt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ht=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function O(e){return q(e)||ft.has(e)||ut.test(e)}function W(e){return J(e,"length",_t)}function q(e){return!!e&&!Number.isNaN(Number(e))}function D(e){return J(e,"number",q)}function Z(e){return!!e&&Number.isInteger(Number(e))}function yt(e){return e.endsWith("%")&&q(e.slice(0,-1))}function f(e){return Ge.test(e)}function F(e){return pt.test(e)}const vt=new Set(["length","size","percentage"]);function wt(e){return J(e,vt,Pe)}function xt(e){return J(e,"position",Pe)}const kt=new Set(["image","url"]);function At(e){return J(e,kt,zt)}function Ct(e){return J(e,"",St)}function H(){return!0}function J(e,r,t){const n=Ge.exec(e);return n?n[1]?typeof r=="string"?n[1]===r:r.has(n[1]):t(n[2]):!1}function _t(e){return bt.test(e)&&!gt.test(e)}function Pe(){return!1}function St(e){return mt.test(e)}function zt(e){return ht.test(e)}function le(){const e=C("colors"),r=C("spacing"),t=C("blur"),n=C("brightness"),a=C("borderColor"),o=C("borderRadius"),s=C("borderSpacing"),l=C("borderWidth"),i=C("contrast"),u=C("grayscale"),d=C("hueRotate"),x=C("invert"),v=C("gap"),S=C("gradientColorStops"),z=C("gradientColorStopPositions"),M=C("inset"),m=C("margin"),j=C("opacity"),h=C("padding"),U=C("saturate"),E=C("scale"),$=C("sepia"),L=C("skew"),_=C("space"),T=C("translate"),P=()=>["auto","contain","none"],I=()=>["auto","hidden","clip","visible","scroll"],K=()=>["auto",f,r],c=()=>[f,r],b=()=>["",O,W],p=()=>["auto",q,f],y=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],g=()=>["solid","dashed","dotted","double","none"],w=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],k=()=>["start","end","center","between","around","evenly","stretch"],A=()=>["","0",f],G=()=>["auto","avoid","all","avoid-page","page","left","right","column"],V=()=>[q,D],R=()=>[q,f];return{cacheSize:500,separator:":",theme:{colors:[H],spacing:[O,W],blur:["none","",F,f],brightness:V(),borderColor:[e],borderRadius:["none","","full",F,f],borderSpacing:c(),borderWidth:b(),contrast:V(),grayscale:A(),hueRotate:R(),invert:A(),gap:c(),gradientColorStops:[e],gradientColorStopPositions:[yt,W],inset:K(),margin:K(),opacity:V(),padding:c(),saturate:V(),scale:V(),sepia:A(),skew:R(),space:c(),translate:c()},classGroups:{aspect:[{aspect:["auto","square","video",f]}],container:["container"],columns:[{columns:[F]}],"break-after":[{"break-after":G()}],"break-before":[{"break-before":G()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...y(),f]}],overflow:[{overflow:I()}],"overflow-x":[{"overflow-x":I()}],"overflow-y":[{"overflow-y":I()}],overscroll:[{overscroll:P()}],"overscroll-x":[{"overscroll-x":P()}],"overscroll-y":[{"overscroll-y":P()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[M]}],"inset-x":[{"inset-x":[M]}],"inset-y":[{"inset-y":[M]}],start:[{start:[M]}],end:[{end:[M]}],top:[{top:[M]}],right:[{right:[M]}],bottom:[{bottom:[M]}],left:[{left:[M]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Z,f]}],basis:[{basis:K()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",f]}],grow:[{grow:A()}],shrink:[{shrink:A()}],order:[{order:["first","last","none",Z,f]}],"grid-cols":[{"grid-cols":[H]}],"col-start-end":[{col:["auto",{span:["full",Z,f]},f]}],"col-start":[{"col-start":p()}],"col-end":[{"col-end":p()}],"grid-rows":[{"grid-rows":[H]}],"row-start-end":[{row:["auto",{span:[Z,f]},f]}],"row-start":[{"row-start":p()}],"row-end":[{"row-end":p()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",f]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",f]}],gap:[{gap:[v]}],"gap-x":[{"gap-x":[v]}],"gap-y":[{"gap-y":[v]}],"justify-content":[{justify:["normal",...k()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...k(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...k(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[h]}],px:[{px:[h]}],py:[{py:[h]}],ps:[{ps:[h]}],pe:[{pe:[h]}],pt:[{pt:[h]}],pr:[{pr:[h]}],pb:[{pb:[h]}],pl:[{pl:[h]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[_]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[_]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",f,r]}],"min-w":[{"min-w":[f,r,"min","max","fit"]}],"max-w":[{"max-w":[f,r,"none","full","min","max","fit","prose",{screen:[F]},F]}],h:[{h:[f,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[f,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[f,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[f,r,"auto","min","max","fit"]}],"font-size":[{text:["base",F,W]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",D]}],"font-family":[{font:[H]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",f]}],"line-clamp":[{"line-clamp":["none",q,D]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",O,f]}],"list-image":[{"list-image":["none",f]}],"list-style-type":[{list:["none","disc","decimal",f]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[j]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[j]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...g(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",O,W]}],"underline-offset":[{"underline-offset":["auto",O,f]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:c()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",f]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",f]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[j]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...y(),xt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",wt]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},At]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[z]}],"gradient-via-pos":[{via:[z]}],"gradient-to-pos":[{to:[z]}],"gradient-from":[{from:[S]}],"gradient-via":[{via:[S]}],"gradient-to":[{to:[S]}],rounded:[{rounded:[o]}],"rounded-s":[{"rounded-s":[o]}],"rounded-e":[{"rounded-e":[o]}],"rounded-t":[{"rounded-t":[o]}],"rounded-r":[{"rounded-r":[o]}],"rounded-b":[{"rounded-b":[o]}],"rounded-l":[{"rounded-l":[o]}],"rounded-ss":[{"rounded-ss":[o]}],"rounded-se":[{"rounded-se":[o]}],"rounded-ee":[{"rounded-ee":[o]}],"rounded-es":[{"rounded-es":[o]}],"rounded-tl":[{"rounded-tl":[o]}],"rounded-tr":[{"rounded-tr":[o]}],"rounded-br":[{"rounded-br":[o]}],"rounded-bl":[{"rounded-bl":[o]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[j]}],"border-style":[{border:[...g(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[j]}],"divide-style":[{divide:g()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...g()]}],"outline-offset":[{"outline-offset":[O,f]}],"outline-w":[{outline:[O,W]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:b()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[j]}],"ring-offset-w":[{"ring-offset":[O,W]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",F,Ct]}],"shadow-color":[{shadow:[H]}],opacity:[{opacity:[j]}],"mix-blend":[{"mix-blend":[...w(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":w()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[n]}],contrast:[{contrast:[i]}],"drop-shadow":[{"drop-shadow":["","none",F,f]}],grayscale:[{grayscale:[u]}],"hue-rotate":[{"hue-rotate":[d]}],invert:[{invert:[x]}],saturate:[{saturate:[U]}],sepia:[{sepia:[$]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[n]}],"backdrop-contrast":[{"backdrop-contrast":[i]}],"backdrop-grayscale":[{"backdrop-grayscale":[u]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[d]}],"backdrop-invert":[{"backdrop-invert":[x]}],"backdrop-opacity":[{"backdrop-opacity":[j]}],"backdrop-saturate":[{"backdrop-saturate":[U]}],"backdrop-sepia":[{"backdrop-sepia":[$]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",f]}],duration:[{duration:R()}],ease:[{ease:["linear","in","out","in-out",f]}],delay:[{delay:R()}],animate:[{animate:["none","spin","ping","pulse","bounce",f]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[E]}],"scale-x":[{"scale-x":[E]}],"scale-y":[{"scale-y":[E]}],rotate:[{rotate:[Z,f]}],"translate-x":[{"translate-x":[T]}],"translate-y":[{"translate-y":[T]}],"skew-x":[{"skew-x":[L]}],"skew-y":[{"skew-y":[L]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",f]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",f]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":c()}],"scroll-mx":[{"scroll-mx":c()}],"scroll-my":[{"scroll-my":c()}],"scroll-ms":[{"scroll-ms":c()}],"scroll-me":[{"scroll-me":c()}],"scroll-mt":[{"scroll-mt":c()}],"scroll-mr":[{"scroll-mr":c()}],"scroll-mb":[{"scroll-mb":c()}],"scroll-ml":[{"scroll-ml":c()}],"scroll-p":[{"scroll-p":c()}],"scroll-px":[{"scroll-px":c()}],"scroll-py":[{"scroll-py":c()}],"scroll-ps":[{"scroll-ps":c()}],"scroll-pe":[{"scroll-pe":c()}],"scroll-pt":[{"scroll-pt":c()}],"scroll-pr":[{"scroll-pr":c()}],"scroll-pb":[{"scroll-pb":c()}],"scroll-pl":[{"scroll-pl":c()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",f]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[O,W,D]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}function Mt(e,{cacheSize:r,prefix:t,separator:n,experimentalParseClassName:a,extend:o={},override:s={}}){Q(e,"cacheSize",r),Q(e,"prefix",t),Q(e,"separator",n),Q(e,"experimentalParseClassName",a);for(const l in s)jt(e[l],s[l]);for(const l in o)Gt(e[l],o[l]);return e}function Q(e,r,t){t!==void 0&&(e[r]=t)}function jt(e,r){if(r)for(const t in r)Q(e,t,r[t])}function Gt(e,r){if(r)for(const t in r){const n=r[t];n!==void 0&&(e[t]=(e[t]||[]).concat(n))}}function Pt(e,...r){return typeof e=="function"?ae(le,e,...r):ae(()=>Mt(le(),e),...r)}const Te=ae(le);function Tt(e){const r=e-1;return r*r*r+1}function ve(...e){return Te(Ye(e))}const $t=(e,r={y:-8,x:0,start:.95,duration:150})=>{const t=getComputedStyle(e),n=t.transform==="none"?"":t.transform,a=(s,l,i)=>{const[u,d]=l,[x,v]=i;return(s-u)/(d-u)*(v-x)+x},o=s=>Object.keys(s).reduce((l,i)=>s[i]===void 0?l:l+`${i}:${s[i]};`,"");return{duration:r.duration??200,delay:0,css:s=>{const l=a(s,[0,1],[r.y??5,0]),i=a(s,[0,1],[r.x??0,0]),u=a(s,[0,1],[r.start??.95,1]);return o({transform:`${n} translate3d(${i}px, ${l}px, 0) scale(${u})`,opacity:s})},easing:Tt}};function qt(e,r="medium",t="en"){const n=new Date(e.replaceAll("-","/"));return new Intl.DateTimeFormat(t,{dateStyle:r}).format(n)}var we=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,N=e=>!e||typeof e!="object"||Object.keys(e).length===0,Nt=(e,r)=>JSON.stringify(e)===JSON.stringify(r);function Ne(e,r){e.forEach(function(t){Array.isArray(t)?Ne(t,r):r.push(t)})}function Re(e){let r=[];return Ne(e,r),r}var Ve=(...e)=>Re(e).filter(Boolean),Ie=(e,r)=>{let t={},n=Object.keys(e),a=Object.keys(r);for(let o of n)if(a.includes(o)){let s=e[o],l=r[o];typeof s=="object"&&typeof l=="object"?t[o]=Ie(s,l):Array.isArray(s)||Array.isArray(l)?t[o]=Ve(l,s):t[o]=l+" "+s}else t[o]=e[o];for(let o of a)n.includes(o)||(t[o]=r[o]);return t},xe=e=>!e||typeof e!="string"?e:e.replace(/\s+/g," ").trim(),Rt={twMerge:!0,twMergeConfig:{},responsiveVariants:!1},Ee=e=>e||void 0,Y=(...e)=>Ee(Re(e).filter(Boolean).join(" ")),re=null,B={},ce=!1,X=(...e)=>r=>r.twMerge?((!re||ce)&&(ce=!1,re=N(B)?Te:Pt({...B,extend:{theme:B.theme,classGroups:B.classGroups,conflictingClassGroupModifiers:B.conflictingClassGroupModifiers,conflictingClassGroups:B.conflictingClassGroups,...B.extend}})),Ee(re(Y(e)))):Y(e),ke=(e,r)=>{for(let t in r)e.hasOwnProperty(t)?e[t]=Y(e[t],r[t]):e[t]=r[t];return e},Vt=(e,r)=>{let{extend:t=null,slots:n={},variants:a={},compoundVariants:o=[],compoundSlots:s=[],defaultVariants:l={}}=e,i={...Rt,...r},u=t!=null&&t.base?Y(t.base,e==null?void 0:e.base):e==null?void 0:e.base,d=t!=null&&t.variants&&!N(t.variants)?Ie(a,t.variants):a,x=t!=null&&t.defaultVariants&&!N(t.defaultVariants)?{...t.defaultVariants,...l}:l;!N(i.twMergeConfig)&&!Nt(i.twMergeConfig,B)&&(ce=!0,B=i.twMergeConfig);let v=N(t==null?void 0:t.slots),S=N(n)?{}:{base:Y(e==null?void 0:e.base,v&&(t==null?void 0:t.base)),...n},z=v?S:ke({...t==null?void 0:t.slots},N(S)?{base:e==null?void 0:e.base}:S),M=N(t==null?void 0:t.compoundVariants)?o:Ve(t==null?void 0:t.compoundVariants,o),m=h=>{if(N(d)&&N(n)&&v)return X(u,h==null?void 0:h.class,h==null?void 0:h.className)(i);if(M&&!Array.isArray(M))throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof M}`);if(s&&!Array.isArray(s))throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof s}`);let U=(c,b,p=[],y)=>{let g=p;if(typeof b=="string")g=g.concat(xe(b).split(" ").map(w=>`${c}:${w}`));else if(Array.isArray(b))g=g.concat(b.reduce((w,k)=>w.concat(`${c}:${k}`),[]));else if(typeof b=="object"&&typeof y=="string"){for(let w in b)if(b.hasOwnProperty(w)&&w===y){let k=b[w];if(k&&typeof k=="string"){let A=xe(k);g[y]?g[y]=g[y].concat(A.split(" ").map(G=>`${c}:${G}`)):g[y]=A.split(" ").map(G=>`${c}:${G}`)}else Array.isArray(k)&&k.length>0&&(g[y]=k.reduce((A,G)=>A.concat(`${c}:${G}`),[]))}}return g},E=(c,b=d,p=null,y=null)=>{var g;let w=b[c];if(!w||N(w))return null;let k=(g=y==null?void 0:y[c])!=null?g:h==null?void 0:h[c];if(k===null)return null;let A=we(k),G=Array.isArray(i.responsiveVariants)&&i.responsiveVariants.length>0||i.responsiveVariants===!0,V=x==null?void 0:x[c],R=[];if(typeof A=="object"&&G)for(let[te,pe]of Object.entries(A)){let Be=w[pe];if(te==="initial"){V=pe;continue}Array.isArray(i.responsiveVariants)&&!i.responsiveVariants.includes(te)||(R=U(te,Be,R,p))}let Oe=A!=null&&typeof A!="object"?A:we(V),ee=w[Oe||"false"];return typeof R=="object"&&typeof p=="string"&&R[p]?ke(R,ee):R.length>0?(R.push(ee),R):ee},$=()=>d?Object.keys(d).map(c=>E(c,d)):null,L=(c,b)=>{if(!d||typeof d!="object")return null;let p=new Array;for(let y in d){let g=E(y,d,c,b),w=c==="base"&&typeof g=="string"?g:g&&g[c];w&&(p[p.length]=w)}return p},_={};for(let c in h)h[c]!==void 0&&(_[c]=h[c]);let T=(c,b)=>{var p;let y=typeof(h==null?void 0:h[c])=="object"?{[c]:(p=h[c])==null?void 0:p.initial}:{};return{...x,..._,...y,...b}},P=(c=[],b)=>{let p=[];for(let{class:y,className:g,...w}of c){let k=!0;for(let[A,G]of Object.entries(w)){let V=T(A,b);if(Array.isArray(G)){if(!G.includes(V[A])){k=!1;break}}else if(V[A]!==G){k=!1;break}}k&&(y&&p.push(y),g&&p.push(g))}return p},I=c=>{let b=P(M,c);if(!Array.isArray(b))return b;let p={};for(let y of b)if(typeof y=="string"&&(p.base=X(p.base,y)(i)),typeof y=="object")for(let[g,w]of Object.entries(y))p[g]=X(p[g],w)(i);return p},K=c=>{if(s.length<1)return null;let b={};for(let{slots:p=[],class:y,className:g,...w}of s){if(!N(w)){let k=!0;for(let A of Object.keys(w)){let G=T(A,c)[A];if(G===void 0||(Array.isArray(w[A])?!w[A].includes(G):w[A]!==G)){k=!1;break}}if(!k)continue}for(let k of p)b[k]=b[k]||[],b[k].push([y,g])}return b};if(!N(n)||!v){let c={};if(typeof z=="object"&&!N(z))for(let b of Object.keys(z))c[b]=p=>{var y,g;return X(z[b],L(b,p),((y=I(p))!=null?y:[])[b],((g=K(p))!=null?g:[])[b],p==null?void 0:p.class,p==null?void 0:p.className)(i)};return c}return X(u,$(),P(M),h==null?void 0:h.class,h==null?void 0:h.className)(i)},j=()=>{if(!(!d||typeof d!="object"))return Object.keys(d)};return m.variantKeys=j(),m.extend=t,m.base=u,m.slots=z,m.variants=d,m.defaultVariants=x,m.compoundSlots=s,m.compoundVariants=M,m};const Ae=Vt({base:"inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function oe(e){let r,t,n;const a=e[5].default,o=$e(a,e,e[4],null);let s=[{href:e[1]},{class:t=ve(Ae({variant:e[2],className:e[0]}))},e[3]],l={};for(let i=0;i<s.length;i+=1)l=se(l,s[i]);return{c(){r=Xe(e[1]?"a":"span"),o&&o.c(),this.h()},l(i){r=Ze(i,((e[1]?"a":"span")||"null").toUpperCase(),{href:!0,class:!0});var u=He(r);o&&o.l(u),u.forEach(ne),this.h()},h(){me(e[1]?"a":"span")(r,l)},m(i,u){_e(i,r,u),o&&o.m(r,null),n=!0},p(i,u){o&&o.p&&(!n||u&16)&&qe(o,a,i,i[4],n?Ke(a,i[4],u,null):Je(i[4]),null),me(i[1]?"a":"span")(r,l=Qe(s,[(!n||u&2)&&{href:i[1]},(!n||u&5&&t!==(t=ve(Ae({variant:i[2],className:i[0]}))))&&{class:t},u&8&&i[3]]))},i(i){n||(de(o,i),n=!0)},o(i){ue(o,i),n=!1},d(i){i&&ne(r),o&&o.d(i)}}}function It(e){let r=e[1]?"a":"span",t,n,a=(e[1]?"a":"span")&&oe(e);return{c(){a&&a.c(),t=be()},l(o){a&&a.l(o),t=be()},m(o,s){a&&a.m(o,s),_e(o,t,s),n=!0},p(o,[s]){o[1],r?Ce(r,o[1]?"a":"span")?(a.d(1),a=oe(o),r=o[1]?"a":"span",a.c(),a.m(t.parentNode,t)):a.p(o,s):(a=oe(o),r=o[1]?"a":"span",a.c(),a.m(t.parentNode,t))},i(o){n||(de(a,o),n=!0)},o(o){ue(a,o),n=!1},d(o){o&&ne(t),a&&a.d(o)}}}function Et(e,r,t){const n=["class","href","variant"];let a=ge(r,n),{$$slots:o={},$$scope:s}=r,{class:l=void 0}=r,{href:i=void 0}=r,{variant:u="default"}=r;return e.$$set=d=>{r=se(se({},r),Ue(d)),t(3,a=ge(r,n)),"class"in d&&t(0,l=d.class),"href"in d&&t(1,i=d.href),"variant"in d&&t(2,u=d.variant),"$$scope"in d&&t(4,s=d.$$scope)},[l,i,u,a,s,o]}class Jt extends Le{constructor(r){super(),We(this,r,Et,It,Ce,{class:0,href:1,variant:2})}}export{Jt as B,Ut as a,Vt as b,ve as c,$t as d,Lt as e,qt as f,Qe as g,Tt as h,Wt as o,Ft as u};
