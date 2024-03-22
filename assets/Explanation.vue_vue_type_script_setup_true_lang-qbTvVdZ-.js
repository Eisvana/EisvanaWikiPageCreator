import{b0 as J,b1 as y,b2 as it,b3 as M,b4 as x,b5 as O,b6 as Y,b7 as S,b8 as rt,ah as Z,b9 as at,ba as lt,bb as ct,bc as tt,bd as ft,be as ut,bf as dt,bg as et,bh as pt,I as mt,a5 as u,a6 as gt,K as w,L as I,O as f,V,W as ht,af as K,Q as H,ag as bt,P as vt}from"./links--ndirX6f.js";
/**
* @vue/runtime-dom v3.4.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const St="http://www.w3.org/2000/svg",_t="http://www.w3.org/1998/Math/MathML",g=typeof document<"u"?document:null,D=g&&g.createElement("template"),Et={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,a)=>{const s="svg"===e?g.createElementNS(St,t):"mathml"===e?g.createElementNS(_t,t):g.createElement(t,n?{is:n}:void 0);return"select"===t&&a&&null!=a.multiple&&s.setAttribute("multiple",a.multiple),s},createText:t=>g.createTextNode(t),createComment:t=>g.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>g.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,a,s,o){const l=n?n.previousSibling:e.lastChild;if(s&&(s===o||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),s!==o&&(s=s.nextSibling););else{D.innerHTML="svg"===a?`<svg>${t}</svg>`:"mathml"===a?`<math>${t}</math>`:t;const s=D.content;if("svg"===a||"mathml"===a){const t=s.firstChild;for(;t.firstChild;)s.appendChild(t.firstChild);s.removeChild(t)}e.insertBefore(s,n)}return[l?l.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ct=Symbol("_vtc");function At(t,e,n){const a=t[Ct];a&&(e=(e?[e,...a]:[...a]).join(" ")),null==e?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const E=Symbol("_vod"),se={beforeMount(t,{value:e},{transition:n}){t[E]="none"===t.style.display?"":t.style.display,n&&e?n.beforeEnter(t):_(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:a}){!e==!n&&t.style.display===t[E]||(a?e?(a.beforeEnter(t),_(t,!0),a.enter(t)):a.leave(t,(()=>{_(t,!1)})):_(t,e))},beforeUnmount(t,{value:e}){_(t,e)}};function _(t,e){t.style.display=e?t[E]:"none"}const wt=Symbol(""),yt=/(^|;)\s*display\s*:/;function Mt(t,e,n){const a=t.style,s=y(n),o=a.display;let l=!1;if(n&&!s){if(e&&!y(e))for(const t in e)null==n[t]&&P(a,t,"");for(const t in n)"display"===t&&(l=!0),P(a,t,n[t])}else if(s){if(e!==n){const t=a[wt];t&&(n+=";"+t),a.cssText=n,l=yt.test(n)}}else e&&t.removeAttribute("style");E in t&&(t[E]=l?a.display:"",a.display=o)}const W=/\s*!important$/;function P(t,e,n){if(S(n))n.forEach((n=>P(t,e,n)));else if(null==n&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const a=xt(t,e);W.test(n)?t.setProperty(tt(a),n.replace(W,""),"important"):t[a]=n}}const U=["Webkit","Moz","ms"],L={};function xt(t,e){const n=L[e];if(n)return n;let a=ft(e);if("filter"!==a&&a in t)return L[e]=a;a=ut(a);for(let n=0;n<U.length;n++){const s=U[n]+a;if(s in t)return L[e]=s}return e}const j="http://www.w3.org/1999/xlink";function Tt(t,e,n,a,s){if(a&&e.startsWith("xlink:"))null==n?t.removeAttributeNS(j,e.slice(6,e.length)):t.setAttributeNS(j,e,n);else{const a=dt(e);null==n||a&&!et(n)?t.removeAttribute(e):t.setAttribute(e,a?"":n)}}function Nt(t,e,n,a,s,o,l){if("innerHTML"===e||"textContent"===e)return a&&l(a,s,o),void(t[e]=n??"");const i=t.tagName;if("value"===e&&"PROGRESS"!==i&&!i.includes("-")){t._value=n;const a=n??"";return("OPTION"===i?t.getAttribute("value"):t.value)!==a&&(t.value=a),void(null==n&&t.removeAttribute(e))}let r=!1;if(""===n||null==n){const a=typeof t[e];"boolean"===a?n=et(n):null==n&&"string"===a?(n="",r=!0):"number"===a&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(e)}function h(t,e,n,a){t.addEventListener(e,n,a)}function It(t,e,n,a){t.removeEventListener(e,n,a)}const F=Symbol("_vei");function Vt(t,e,n,a,s=null){const o=t[F]||(t[F]={}),l=o[e];if(a&&l)l.value=a;else{const[n,i]=Lt(e);if(a){h(t,n,o[e]=Ot(a,s),i)}else l&&(It(t,n,l,i),o[e]=void 0)}}const G=/(?:Once|Passive|Capture)$/;function Lt(t){let e;if(G.test(t)){let n;for(e={};n=t.match(G);)t=t.slice(0,t.length-n[0].length),e[n[0].toLowerCase()]=!0}return[":"===t[2]?t.slice(3):tt(t.slice(2)),e]}let $=0;const $t=Promise.resolve(),Pt=()=>$||($t.then((()=>$=0)),$=Date.now());function Ot(t,e){const n=t=>{if(t._vts){if(t._vts<=n.attached)return}else t._vts=Date.now();pt(Bt(t,n.value),e,5,[t])};return n.value=t,n.attached=Pt(),n}function Bt(t,e){if(S(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map((t=>e=>!e._stopped&&t&&t(e)))}return e}const q=t=>111===t.charCodeAt(0)&&110===t.charCodeAt(1)&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Rt=(t,e,n,a,s,o,l,i,r)=>{const u="svg"===s;"class"===e?At(t,a,u):"style"===e?Mt(t,n,a):lt(e)?ct(e)||Vt(t,e,n,a,l):("."===e[0]?(e=e.slice(1),1):"^"===e[0]?(e=e.slice(1),0):Kt(t,e,a,u))?Nt(t,e,a,o,l,i,r):("true-value"===e?t._trueValue=a:"false-value"===e&&(t._falseValue=a),Tt(t,e,a,u))};function Kt(t,e,n,a){if(a)return!!("innerHTML"===e||"textContent"===e||e in t&&q(e)&&J(n));if("spellcheck"===e||"draggable"===e||"translate"===e||"form"===e||"list"===e&&"INPUT"===t.tagName||"type"===e&&"TEXTAREA"===t.tagName)return!1;if("width"===e||"height"===e){const e=t.tagName;if("IMG"===e||"VIDEO"===e||"CANVAS"===e||"SOURCE"===e)return!1}return(!q(e)||!y(n))&&e in t}const v=t=>{const e=t.props["onUpdate:modelValue"]||!1;return S(e)?t=>rt(e,t):e};function Ht(t){t.target.composing=!0}function z(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const d=Symbol("_assign"),oe={created(t,{modifiers:{lazy:e,trim:n,number:a}},s){t[d]=v(s);const o=a||s.props&&"number"===s.props.type;h(t,e?"change":"input",(e=>{if(e.target.composing)return;let a=t.value;n&&(a=a.trim()),o&&(a=M(a)),t[d](a)})),n&&h(t,"change",(()=>{t.value=t.value.trim()})),e||(h(t,"compositionstart",Ht),h(t,"compositionend",z),h(t,"change",z))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:a,number:s}},o){if(t[d]=v(o),t.composing)return;const l=e??"";(s||"number"===t.type?M(t.value):t.value)!==l&&(document.activeElement===t&&"range"!==t.type&&(n||a&&t.value.trim()===l)||(t.value=l))}},ie={deep:!0,created(t,e,n){t[d]=v(n),h(t,"change",(()=>{const e=t._modelValue,n=C(t),a=t.checked,s=t[d];if(S(e)){const t=O(e,n),o=-1!==t;if(a&&!o)s(e.concat(n));else if(!a&&o){const n=[...e];n.splice(t,1),s(n)}}else if(x(e)){const t=new Set(e);a?t.add(n):t.delete(n),s(t)}else s(nt(t,a))}))},mounted:X,beforeUpdate(t,e,n){t[d]=v(n),X(t,e,n)}};function X(t,{value:e,oldValue:n},a){t._modelValue=e,S(e)?t.checked=O(e,a.props.value)>-1:x(e)?t.checked=e.has(a.props.value):e!==n&&(t.checked=Y(e,nt(t,!0)))}const re={deep:!0,created(t,{value:e,modifiers:{number:n}},a){const s=x(e);h(t,"change",(()=>{const e=Array.prototype.filter.call(t.options,(t=>t.selected)).map((t=>n?M(C(t)):C(t)));t[d](t.multiple?s?new Set(e):e:e[0]),t._assigning=!0,Z((()=>{t._assigning=!1}))})),t[d]=v(a)},mounted(t,{value:e,oldValue:n,modifiers:{number:a}}){Q(t,e,n,a)},beforeUpdate(t,e,n){t[d]=v(n)},updated(t,{value:e,oldValue:n,modifiers:{number:a}}){t._assigning||Q(t,e,n,a)}};function Q(t,e,n,a){const s=t.multiple,o=S(e);if(!s||o||x(e)){for(let n=0,l=t.options.length;n<l;n++){const l=t.options[n],i=C(l);if(s)if(o){const t=typeof i;l.selected="string"===t||"number"===t?e.includes(a?M(i):i):O(e,i)>-1}else l.selected=e.has(i);else if(Y(C(l),e))return void(t.selectedIndex!==n&&(t.selectedIndex=n))}!s&&-1!==t.selectedIndex&&(t.selectedIndex=-1)}}function C(t){return"_value"in t?t._value:t.value}function nt(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const Dt=["ctrl","shift","alt","meta"],Wt={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&0!==t.button,middle:t=>"button"in t&&1!==t.button,right:t=>"button"in t&&2!==t.button,exact:(t,e)=>Dt.some((n=>t[`${n}Key`]&&!e.includes(n)))},ae=(t,e)=>{const n=t._withMods||(t._withMods={}),a=e.join(".");return n[a]||(n[a]=(n,...a)=>{for(let t=0;t<e.length;t++){const a=Wt[e[t]];if(a&&a(n,e))return}return t(n,...a)})},Ut=at({patchProp:Rt},Et);let k;function jt(){return k||(k=it(Ut))}const le=(...t)=>{const e=jt().createApp(...t),{mount:n}=e;return e.mount=t=>{const a=Gt(t);if(!a)return;const s=e._component;!J(s)&&!s.render&&!s.template&&(s.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,Ft(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e};function Ft(t){return t instanceof SVGElement?"svg":"function"==typeof MathMLElement&&t instanceof MathMLElement?"mathml":void 0}function Gt(t){return y(t)?document.querySelector(t):t}const ce=(t,e)=>{const n=t.__vccOpts||t;for(const[t,a]of e)n[t]=a;return n},qt="/EisvanaWikiPageCreator/assets/icons/help.svg",zt=["aria-disabled"],Xt=f("img",{src:qt,alt:"Help"},null,-1),Qt={class:"tooltiptext nms-font"},kt={id:"explanationHeading",class:"explanationHeading title is-4"},Jt={id:"explanationContent",class:"explanationContent nms-font"},Yt=["href"],Zt=["srcset"],te=["src"],ee=f("form",{method:"dialog"},[f("button",{class:"button",type:"submit",autofocus:""}," Close ")],-1),fe=mt({__name:"Explanation",props:{img:{},open:{type:Boolean}},emits:["update:open"],setup(t,{emit:e}){var n;const a=t,s=u(null),o=u(null),l=u(null),i=(null==(n=a.img)?void 0:n.trim())??"",r=u("0 -100vh"),c=u(""),d=u(0),p=u(0),m=u(!1),v=u(!1),g=e;function b(){r.value="0 -100vh",c.value||(c.value=i),m.value||(m.value=!0),g("update:open",!0),Z((()=>{s.value&&(s.value.showModal(),r.value="0 0",s.value.scrollTo(0,0))}))}function h(){p.value=1,d.value=1}return gt((()=>{a.open&&b()})),(t,e)=>(w(),I(vt,null,[f("button",{"aria-disabled":!t.$slots.content||void 0,class:"tooltip",onClick:e[0]||(e[0]=e=>t.$slots.content&&b())},[Xt,f("p",Qt,[V(t.$slots,"default")])],8,zt),(w(),ht(bt,{to:"body"},[m.value?(w(),I("dialog",{key:0,style:K({translate:r.value}),class:"explanation modal-content content",ref_key:"dialogElement",ref:s,onClose:e[3]||(e[3]=e=>t.$emit("update:open",!1))},[f("h2",kt,[V(t.$slots,"heading")]),f("div",Jt,[V(t.$slots,"content")]),c.value&&!v.value?(w(),I("a",{key:0,href:`./assets/images/jpg/${c.value}.jpg`,class:"explanationLink loading",id:"explanationLink",ref_key:"linkElement",ref:l,rel:"noopener noreferrer",target:"_blank"},[f("picture",null,[f("source",{srcset:`./assets/images/webp/${c.value}.webp`,class:"explanationWebpImg",id:"explanationWebpImg",type:"image/webp"},null,8,Zt),f("img",{src:`./assets/images/jpg/${c.value}.jpg`,style:K({opacity:d.value,"margin-block-start":p.value+"rem"}),alt:"Explainer Image",class:"explanationFallbackImg",id:"explanationFallbackImg",ref_key:"imgElement",ref:o,onLoadstart:e[1]||(e[1]=t=>v.value=!1),onLoad:h,onError:e[2]||(e[2]=t=>v.value=!0)},null,44,te)])],8,Yt)):H("",!0),ee],36)):H("",!0)]))],64))}});export{ce as _,fe as a,oe as b,ie as c,le as d,se as e,re as v,ae as w};