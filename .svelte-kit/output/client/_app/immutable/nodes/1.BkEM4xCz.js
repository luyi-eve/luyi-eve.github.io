import{s as S,n as _,d as l,l as d,b as m,m as f,c as g,o as h,p as v,e as q,j as $,t as E,k as x,q as j}from"../chunks/oaJrz1TM.js";import{S as k,i as y}from"../chunks/COxv0z7M.js";import{s as C}from"../chunks/DAeYH5AC.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",u;return{c(){t=$("h1"),o=E(r),n=x(),i=$("p"),u=E(c)},l(e){t=g(e,"H1",{});var a=h(t);o=v(a,r),a.forEach(l),n=q(e),i=g(e,"P",{});var p=h(i);u=v(p,c),p.forEach(l)},m(e,a){m(e,t,a),f(t,o),m(e,n,a),m(e,i,a),f(i,u)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&d(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&d(u,c)},i:_,o:_,d(e){e&&(l(t),l(n),l(i))}}}function z(s,t,r){let o;return j(s,P,n=>r(0,o=n)),[o]}let F=class extends k{constructor(t){super(),y(this,t,z,w,S,{})}};export{F as component};
