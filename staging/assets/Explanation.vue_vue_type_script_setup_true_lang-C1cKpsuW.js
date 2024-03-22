import{b0 as J,b1 as y,b2 as rt,b3 as M,b4 as T,b5 as P,b6 as Y,b7 as v,b8 as at,ah as Z,b9 as lt,ba as ct,bb as ft,bc as tt,bd as ut,be as dt,bf as pt,bg as et,bh as mt,I as gt,a5 as u,a6 as ht,K as A,L,O as f,V,W as bt,af as H,Q as K,ag as vt,P as St}from"./links-Ch0PFcvJ.js";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const _t="http://www.w3.org/2000/svg",Et="http://www.w3.org/1998/Math/MathML",m=typeof document<"u"?document:null,D=m&&m.createElement("template"),Ct={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,o)=>{const s="svg"===e?m.createElementNS(_t,t):"mathml"===e?m.createElementNS(Et,t):m.createElement(t,n?{is:n}:void 0);return"select"===t&&o&&null!=o.multiple&&s.setAttribute("multiple",o.multiple),s},createText:t=>m.createTextNode(t),createComment:t=>m.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>m.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,o,s,a){const l=n?n.previousSibling:e.lastChild;if(s&&(s===a||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),s!==a&&(s=s.nextSibling););else{D.innerHTML="svg"===o?`<svg>${t}</svg>`:"mathml"===o?`<math>${t}</math>`:t;const s=D.content;if("svg"===o||"mathml"===o){const t=s.firstChild;for(;t.firstChild;)s.appendChild(t.firstChild);s.removeChild(t)}e.insertBefore(s,n)}return[l?l.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},At=Symbol("_vtc");function wt(t,e,n){const o=t[At];o&&(e=(e?[e,...o]:[...o]).join(" ")),null==e?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const x=Symbol("_vod"),nt=Symbol("_vsh"),oe={beforeMount(t,{value:e},{transition:n}){t[x]="none"===t.style.display?"":t.style.display,n&&e?n.beforeEnter(t):_(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:o}){!e!=!n&&(o?e?(o.beforeEnter(t),_(t,!0),o.enter(t)):o.leave(t,(()=>{_(t,!1)})):_(t,e))},beforeUnmount(t,{value:e}){_(t,e)}};function _(t,e){t.style.display=e?t[x]:"none",t[nt]=!e}const yt=Symbol(""),Mt=/(^|;)\s*display\s*:/;function xt(t,e,n){const o=t.style,s=y(n);let a=!1;if(n&&!s){if(e)if(y(e))for(const t of e.split(";")){const e=t.slice(0,t.indexOf(":")).trim();null==n[e]&&w(o,e,"")}else for(const t in e)null==n[t]&&w(o,t,"");for(const t in n)"display"===t&&(a=!0),w(o,t,n[t])}else if(s){if(e!==n){const t=o[yt];t&&(n+=";"+t),o.cssText=n,a=Mt.test(n)}}else e&&t.removeAttribute("style");x in t&&(t[x]=a?o.display:"",t[nt]&&(o.display="none"))}const U=/\s*!important$/;function w(t,e,n){if(v(n))n.forEach((n=>w(t,e,n)));else if(null==n&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const o=Tt(t,e);U.test(n)?t.setProperty(tt(o),n.replace(U,""),"important"):t[o]=n}}const W=["Webkit","Moz","ms"],$={};function Tt(t,e){const n=$[e];if(n)return n;let o=ut(e);if("filter"!==o&&o in t)return $[e]=o;o=dt(o);for(let n=0;n<W.length;n++){const s=W[n]+o;if(s in t)return $[e]=s}return e}const j="http://www.w3.org/1999/xlink";function Nt(t,e,n,o,s){if(o&&e.startsWith("xlink:"))null==n?t.removeAttributeNS(j,e.slice(6,e.length)):t.setAttributeNS(j,e,n);else{const o=pt(e);null==n||o&&!et(n)?t.removeAttribute(e):t.setAttribute(e,o?"":n)}}function It(t,e,n,o,s,a,l){if("innerHTML"===e||"textContent"===e)return o&&l(o,s,a),void(t[e]=n??"");const i=t.tagName;if("value"===e&&"PROGRESS"!==i&&!i.includes("-")){const o=n??"";return(("OPTION"===i?t.getAttribute("value")||"":t.value)!==o||!("_value"in t))&&(t.value=o),null==n&&t.removeAttribute(e),void(t._value=n)}let r=!1;if(""===n||null==n){const o=typeof t[e];"boolean"===o?n=et(n):null==n&&"string"===o?(n="",r=!0):"number"===o&&(n=0,r=!0)}try{t[e]=n}catch{}r&&t.removeAttribute(e)}function g(t,e,n,o){t.addEventListener(e,n,o)}function Lt(t,e,n,o){t.removeEventListener(e,n,o)}const F=Symbol("_vei");function Vt(t,e,n,o,s=null){const a=t[F]||(t[F]={}),l=a[e];if(o&&l)l.value=o;else{const[n,i]=$t(e);if(o){g(t,n,a[e]=Bt(o,s),i)}else l&&(Lt(t,n,l,i),a[e]=void 0)}}const G=/(?:Once|Passive|Capture)$/;function $t(t){let e;if(G.test(t)){let n;for(e={};n=t.match(G);)t=t.slice(0,t.length-n[0].length),e[n[0].toLowerCase()]=!0}return[":"===t[2]?t.slice(3):tt(t.slice(2)),e]}let O=0;const Ot=Promise.resolve(),Pt=()=>O||(Ot.then((()=>O=0)),O=Date.now());function Bt(t,e){const n=t=>{if(t._vts){if(t._vts<=n.attached)return}else t._vts=Date.now();mt(Rt(t,n.value),e,5,[t])};return n.value=t,n.attached=Pt(),n}function Rt(t,e){if(v(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map((t=>e=>!e._stopped&&t&&t(e)))}return e}const q=t=>111===t.charCodeAt(0)&&110===t.charCodeAt(1)&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Ht=(t,e,n,o,s,a,l,i,r)=>{const u="svg"===s;"class"===e?wt(t,o,u):"style"===e?xt(t,n,o):ct(e)?ft(e)||Vt(t,e,n,o,l):("."===e[0]?(e=e.slice(1),1):"^"===e[0]?(e=e.slice(1),0):Kt(t,e,o,u))?It(t,e,o,a,l,i,r):("true-value"===e?t._trueValue=o:"false-value"===e&&(t._falseValue=o),Nt(t,e,o,u))};function Kt(t,e,n,o){if(o)return!!("innerHTML"===e||"textContent"===e||e in t&&q(e)&&J(n));if("spellcheck"===e||"draggable"===e||"translate"===e||"form"===e||"list"===e&&"INPUT"===t.tagName||"type"===e&&"TEXTAREA"===t.tagName)return!1;if("width"===e||"height"===e){const e=t.tagName;if("IMG"===e||"VIDEO"===e||"CANVAS"===e||"SOURCE"===e)return!1}return(!q(e)||!y(n))&&e in t}const b=t=>{const e=t.props["onUpdate:modelValue"]||!1;return v(e)?t=>at(e,t):e};function Dt(t){t.target.composing=!0}function z(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const d=Symbol("_assign"),ie={created(t,{modifiers:{lazy:e,trim:n,number:o}},s){t[d]=b(s);const a=o||s.props&&"number"===s.props.type;g(t,e?"change":"input",(e=>{if(e.target.composing)return;let o=t.value;n&&(o=o.trim()),a&&(o=M(o)),t[d](o)})),n&&g(t,"change",(()=>{t.value=t.value.trim()})),e||(g(t,"compositionstart",Dt),g(t,"compositionend",z),g(t,"change",z))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:o,number:s}},a){if(t[d]=b(a),t.composing)return;const l=e??"";(s||"number"===t.type?M(t.value):t.value)!==l&&(document.activeElement===t&&"range"!==t.type&&(n||o&&t.value.trim()===l)||(t.value=l))}},re={deep:!0,created(t,e,n){t[d]=b(n),g(t,"change",(()=>{const e=t._modelValue,n=E(t),o=t.checked,s=t[d];if(v(e)){const t=P(e,n),a=-1!==t;if(o&&!a)s(e.concat(n));else if(!o&&a){const n=[...e];n.splice(t,1),s(n)}}else if(T(e)){const t=new Set(e);o?t.add(n):t.delete(n),s(t)}else s(st(t,o))}))},mounted:X,beforeUpdate(t,e,n){t[d]=b(n),X(t,e,n)}};function X(t,{value:e,oldValue:n},o){t._modelValue=e,v(e)?t.checked=P(e,o.props.value)>-1:T(e)?t.checked=e.has(o.props.value):e!==n&&(t.checked=Y(e,st(t,!0)))}const ae={deep:!0,created(t,{value:e,modifiers:{number:n}},o){const s=T(e);g(t,"change",(()=>{const e=Array.prototype.filter.call(t.options,(t=>t.selected)).map((t=>n?M(E(t)):E(t)));t[d](t.multiple?s?new Set(e):e:e[0]),t._assigning=!0,Z((()=>{t._assigning=!1}))})),t[d]=b(o)},mounted(t,{value:e,modifiers:{number:n}}){Q(t,e,n)},beforeUpdate(t,e,n){t[d]=b(n)},updated(t,{value:e,modifiers:{number:n}}){t._assigning||Q(t,e,n)}};function Q(t,e,n){const o=t.multiple,s=v(e);if(!o||s||T(e)){for(let a=0,l=t.options.length;a<l;a++){const l=t.options[a],i=E(l);if(o)if(s){const t=typeof i;l.selected="string"===t||"number"===t?e.includes(n?M(i):i):P(e,i)>-1}else l.selected=e.has(i);else if(Y(E(l),e))return void(t.selectedIndex!==a&&(t.selectedIndex=a))}!o&&-1!==t.selectedIndex&&(t.selectedIndex=-1)}}function E(t){return"_value"in t?t._value:t.value}function st(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const Ut=["ctrl","shift","alt","meta"],Wt={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&0!==t.button,middle:t=>"button"in t&&1!==t.button,right:t=>"button"in t&&2!==t.button,exact:(t,e)=>Ut.some((n=>t[`${n}Key`]&&!e.includes(n)))},le=(t,e)=>{const n=t._withMods||(t._withMods={}),o=e.join(".");return n[o]||(n[o]=(n,...o)=>{for(let t=0;t<e.length;t++){const o=Wt[e[t]];if(o&&o(n,e))return}return t(n,...o)})},jt=lt({patchProp:Ht},Ct);let k;function Ft(){return k||(k=rt(jt))}const ce=(...t)=>{const e=Ft().createApp(...t),{mount:n}=e;return e.mount=t=>{const o=qt(t);if(!o)return;const s=e._component;!J(s)&&!s.render&&!s.template&&(s.template=o.innerHTML),o.innerHTML="";const a=n(o,!1,Gt(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),a},e};function Gt(t){return t instanceof SVGElement?"svg":"function"==typeof MathMLElement&&t instanceof MathMLElement?"mathml":void 0}function qt(t){return y(t)?document.querySelector(t):t}const fe=(t,e)=>{const n=t.__vccOpts||t;for(const[t,o]of e)n[t]=o;return n},zt="/assets/icons/help.svg",Xt=["aria-disabled"],Qt=f("img",{src:zt,alt:"Help"},null,-1),kt={class:"tooltiptext nms-font"},Jt={id:"explanationHeading",class:"explanationHeading title is-4"},Yt={id:"explanationContent",class:"explanationContent nms-font"},Zt=["href"],te=["srcset"],ee=["src"],ne=f("form",{method:"dialog"},[f("button",{class:"button",type:"submit",autofocus:""}," Close ")],-1),ue=gt({__name:"Explanation",props:{img:{},open:{type:Boolean}},emits:["update:open"],setup(t,{emit:e}){var n;const o=t,s=u(null),a=u(null),l=u(null),i=(null==(n=o.img)?void 0:n.trim())??"",r=u("0 -100vh"),c=u(""),m=u(0),d=u(0),p=u(!1),v=u(!1),g=e;function b(){r.value="0 -100vh",c.value||(c.value=i),p.value||(p.value=!0),g("update:open",!0),Z((()=>{s.value&&(s.value.showModal(),r.value="0 0",s.value.scrollTo(0,0))}))}function h(){d.value=1,m.value=1}return ht((()=>{o.open&&b()})),(t,e)=>(A(),L(St,null,[f("button",{"aria-disabled":!t.$slots.content||void 0,class:"tooltip",onClick:e[0]||(e[0]=e=>t.$slots.content&&b())},[Qt,f("p",kt,[V(t.$slots,"default")])],8,Xt),(A(),bt(vt,{to:"body"},[p.value?(A(),L("dialog",{key:0,style:H({translate:r.value}),class:"explanation modal-content content",ref_key:"dialogElement",ref:s,onClose:e[3]||(e[3]=e=>t.$emit("update:open",!1))},[f("h2",Jt,[V(t.$slots,"heading")]),f("div",Yt,[V(t.$slots,"content")]),c.value&&!v.value?(A(),L("a",{key:0,href:`./assets/images/jpg/${c.value}.jpg`,class:"explanationLink loading",id:"explanationLink",ref_key:"linkElement",ref:l,rel:"noopener noreferrer",target:"_blank"},[f("picture",null,[f("source",{srcset:`./assets/images/webp/${c.value}.webp`,class:"explanationWebpImg",id:"explanationWebpImg",type:"image/webp"},null,8,te),f("img",{src:`./assets/images/jpg/${c.value}.jpg`,style:H({opacity:m.value,"margin-block-start":d.value+"rem"}),alt:"Explainer Image",class:"explanationFallbackImg",id:"explanationFallbackImg",ref_key:"imgElement",ref:a,onLoadstart:e[1]||(e[1]=t=>v.value=!1),onLoad:h,onError:e[2]||(e[2]=t=>v.value=!0)},null,44,ee)])],8,Zt)):K("",!0),ne],36)):K("",!0)]))],64))}});export{fe as _,ue as a,ie as b,re as c,ce as d,oe as e,ae as v,le as w};