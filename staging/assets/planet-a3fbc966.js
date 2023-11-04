import{M as c,g as s,f as a,w as d,N as m,s as p,q as f,O as g,u as y,b as v,m as b,l as S}from"./links-46c35bcf.js";import{p as h}from"./index-add1cbe5.js";import"./index-49010a29.js";import"./creatureData-d60072e3.js";import"./startup-f630788f.js";const A={input:{moonInputs:"moonInputs",addMoonButton:"addMoonButton"},output:{}};function x(t){const n=t.parentElement,e=document.querySelectorAll("[data-moon]"),o=m(Array.from(e),"dataset.moon"),a="moon_input"+o,l=p(`<div class="tableCell text removable" data-moon="section${o}">\n\t\t<button class="button is-outlined is-danger icon is-small" title="Remove moon" type="button" data-evt-id="removeButton">&#10006</button>\n\t\t<label for="${a}">Moon name:</label>\n\t</div>\n\t<div class="tableCell data" data-moon="section${o}">\n\t\t<input type="text" id="${a}" data-evt-id="moonInput">\n\t</div>`,{},[{element:"moonInput",handler:"input",func:()=>i()},{element:"removeButton",handler:"click",func:()=>{g("section"+o,"moon"),C()}}]);f(l,n,"beforebegin"),document.querySelectorAll("[data-moon]").length/2+1>2&&(t.disabled=!0)}function C(){s.input.moonInputs.querySelector("button").disabled=!1,i()}function i(){const t=document.querySelectorAll("[data-moon] input"),n=[];for(const e of Array.from(t))e.value&&n.push(`[[${c(e.value)}]]`);s.output.moonList.innerText=n.join(", "),a.moons=n,E()}function E(){const t=(()=>{const t=a.moons;if(!t||0===t.length)return"This planet has no moons.";{const n=t.length;return`This planet's [[moon]]${n>1?"s":""} ${h(n)} ${t.join(" and ")}.`}})();d(t,"moonSentence")}function I(){const t=["","Landscape","Night View","Cave System","Analysis Visor","Planet Exploration Guide","Planet Page","System Page","Galaxy Map"],n=["Coast Area","Underwater"];if("Pangean"!==a.terrain){const e=t.indexOf("Analysis Visor");t.splice(e,0,...n)}a.galleryArray=t}const M=[{element:"addMoonButton",handler:"click",func:function(){x(this)}}];S.generateGalleryArray=()=>I(),y(A),v(M),i(),b("galleryExplanationExternal","\nThere is a preferred order of pictures:\n\t<div class='dialog-center'>\n\t\t<ol class='dialog-list'>\n\t\t\t<li>Landscape</li>\n\t\t\t<li>Night View</li>\n\t\t\t<li>Cave System</li>\n\t\t\t<li>Coast Area</li>\n\t\t\t<li>Underwater</li>\n\t\t\t<li>Analysis Visor</li>\n\t\t\t<li>Planet Exploration Guide</li>\n\t\t\t<li>Planet Page</li>\n\t\t\t<li>System Page</li>\n\t\t\t<li>Galaxy Map</li>\n\t\t</ol>\n\t</div>");
