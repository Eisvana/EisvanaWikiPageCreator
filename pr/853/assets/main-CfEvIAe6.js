const __vite__mapDeps=(e,t=__vite__mapDeps,s=t.f||(t.f=["assets/Flora-B4aB5HR-.js","assets/runtime-dom.esm-bundler-BmmUgs3d.js","assets/links-BDA2W767.js","assets/links-Bl0SuOXC.css","assets/index-BK4qrdfx.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/Explanation.vue_vue_type_script_setup_true_lang-C5E2c9AL.js","assets/index-CfvIg6Rn.css","assets/floraDatalists-Bz-O6jQ9.js","assets/Home-BIt_AWC4.js","assets/Home-DO7Qgol1.css","assets/Mineral-JWuUQQx8.js","assets/mineralDatalists-CKshA0d-.js"]))=>e.map((e=>s[e]));import{I as E,J as g,K as y,L as T,M as f,N as h,O as x,P,Q as S,R as D,S as k,T as b,U as R,V as C,W as V,X as L,Y as A}from"./links-BDA2W767.js";import{c as M}from"./runtime-dom.esm-bundler-BmmUgs3d.js";const N="modulepreload",I=function(e){return"/pr/853/"+e},_={},v=function(e,t,s){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),s=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));a=Promise.allSettled(t.map((e=>{if((e=I(e))in _)return;_[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":N,t||(n.as="script"),n.crossOrigin="",n.href=e,s&&n.setAttribute("nonce",s),document.head.appendChild(n),t?new Promise(((t,s)=>{n.addEventListener("load",t),n.addEventListener("error",(()=>s(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}function n(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return a.then((t=>{for(const e of t||[])"rejected"===e.status&&n(e.reason);return e().catch(n)}))},O=(e,t,s)=>{const a=e[t];return a?"function"==typeof a?a():Promise.resolve(a):new Promise(((e,a)=>{("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==s?". Note that variables only represent file names one level deep.":""))))}))},B=E("dataValidation",{state:()=>({text:"",copy:!1}),actions:{getSelectedText(e){var t;const s=null==(t=document.getElementById("switchTheme"))?void 0:t.innerText,a=e.target;if(!(a instanceof HTMLElement&&s))return;const n=a.closest(".wikiText");if(!(n instanceof HTMLDivElement))return;const r=g(n.innerText).trim(),o=window.getSelection()??"",i=(()=>{const e=g(o.toString()).trim();return e.endsWith(s)?e.replace(s,"").trim():e})();this.text=y(),this.copy=r===i}}});function H(e=!1,t=!1){const s=T(),{name:a,glyphs:n,regionNumber:r}=f(s),o=B(),{text:i,copy:l}=f(o),u=h(!1),c=h(""),m=y(),p=!!(a.value&&n.value&&r.value&&(m===i.value&&l.value||e)),d="",v="Missing Name!",_="Wrong Glyphs!",g="Copy Code First!";return u.value=p,l.value=!1,p?c.value=d:a.value?n.value&&r.value?c.value=g:c.value=_:c.value=v,{isValidData:u,message:c}}function U(){const{isValidData:e,message:t}=H(!0);return document.body.dataset.mark=e.value.toString(),{isValidData:e,message:t}}const q=x({__name:"App",setup(e){const t=P(),{route:s}=f(t),a=T(),{pageName:n,glyphs:r,release:o}=f(a);S((async()=>{const e=await D();o.value=e})),k([n,r],(()=>V((()=>U()))),{immediate:!0});const i={flora:"Flora",mineral:"Mineral",home:"Home"};const l=L({loader:()=>O(Object.assign({"./pages/Flora.vue":()=>v((()=>import("./Flora-B4aB5HR-.js")),__vite__mapDeps([0,1,2,3,4,5,6,7,8])),"./pages/Home.vue":()=>v((()=>import("./Home-BIt_AWC4.js")),__vite__mapDeps([9,2,3,5,10])),"./pages/Mineral.vue":()=>v((()=>import("./Mineral-JWuUQQx8.js")),__vite__mapDeps([11,1,2,3,4,5,6,7,12]))}),`./pages/${function(){const e=s.value;return e&&i[e]?i[e]:i.home}()}.vue`,3)});return(e,t)=>(C(),b(R(l)))}}),w=M(q),W=A();w.use(W),w.mount("#app");export{v as _,U as a,H as b,B as u};
