import{g as d,J as p,p as m,w as o,B as g,C as v,D as h,E as f,o as b,x as s,e as u,F as x,b as I,I as y,c as $}from"./about-4dd2bbee.js";import"./startup-25c1f7e2.js";const C='<div class="tableHeader text sectionToggle" data-section="section${childIndex}">\n\t<div><span class="has-text-weight-bold">Title: </span><output name=${heading}></output></div>\n\t<button class="button is-danger is-outlined" type="button" data-evt-id="removeButton">Remove</button>\n</div>\n<div class="tableCell text" data-section="section${childIndex}">\n\t<label for="${heading_input}">Section heading:</label>\n</div>\n<div class="tableCell data" data-section="section${childIndex}">\n\t<input type="text" id="${heading_input}" data-dest="${heading}" data-evt-id="wikicode">\n</div>\n<div class="tableCell text" data-section="section${childIndex}">\n\t<label for="${img_input}">Image name, including file extension:</label>\n</div>\n<div class="tableCell data" data-section="section${childIndex}">\n\t<input type="text" id="${img_input}" data-dest="${img}" data-evt-id="fileInput">\n\t<input type="file" id="${img_upload}" accept="image/*" data-evt-id="imageUpload">\n</div>\n<div class="tableHeader data no-flex" data-section="section${childIndex}">\n\t<label for="${text_input}">Content:</label>\n\t<textarea class="mb-2" id="${text_input}" data-dest="${text}" data-evt-id="wikicode"></textarea>\n</div>';function _(t){const e=m.currency.toLowerCase(),n=t.dataset.dest;"hubcoin"===e&&o("{{CurrencyHubCoin}}",n)}function w(){const{input:{contentsInput:t},output:{contents:e}}=d,n=document.querySelectorAll("[data-section]"),i=g(Array.from(n),"dataset.section").toString(),a={childIndex:i,heading:"heading"+i,img:"img"+i,text:"text"+i,heading_input:"heading_input"+i,img_input:"img_input"+i,img_upload:"img_upload"+i,text_input:"text_input"+i},s=v(C,a,[{element:"wikicode",handler:"input",func:function(){o(this)}},{element:"removeButton",handler:"click",func:()=>f(`section${i}`)},{element:"fileInput",handler:"input",func:function(){o(this),c(this)}},{element:"imageUpload",handler:"change",func:function(){b(this),c(this.previousElementSibling)}}]),u=`\n\t\t<div data-section="section${i}">==<output name="${a.heading}"></output>==</div>\n\t\t<div style="display:none" data-section="section${i}">[[File:<output id="${a.img}"></output>|thumb]]</div>\n\t\t<div data-section="section${i}"><output id="${a.text}"></output><br><br></div>`;h(s,t,"beforebegin"),e.insertAdjacentHTML("beforeend",u)}function c(t){const e=t.dataset.dest,n=document.getElementById(e).parentElement;t.value?n.style.display="":n.style.display="none"}function E(){const t=document.querySelectorAll("[data-section]");d.output.contents.innerText="",p(Array.from(t))}const S=[{element:"ownerInput",func:()=>{s("ownerInput","ownerlinkInput")}},{element:"ownerlinkInput",func:()=>{s("ownerlinkInput","ownerInput")}},{element:"currencyInput",func:function(){_(this),u(this.value,"enPrefix")}},{element:"sectionAddButton",handler:"click",func:()=>w()}],k={input:{contentsInput:"contentsInput"},output:{contents:"contents"}};$.resetExternal=()=>E(),x(k),I(S);const A={currencies:["{{CurrencyHubCoin}}"]};y(A);const H=document.getElementById("currencyInput");u(H.value,"enPrefix");
