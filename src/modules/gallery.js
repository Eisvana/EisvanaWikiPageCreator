(()=>{var e;window.matchMedia("(pointer: coarse)").matches||((e=document.createElement("script")).src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js",document.head.appendChild(e),e.onload=()=>{var e=globalElements.output.galleryItems;new Sortable(e,{handle:".handle",animation:250,onUpdate:function(e){moveItem(e)}})})})();let galleryUploadShown=!1;function galleryUpload(){var e=globalElements.input.galleryUpload;if(e.value){var t,l,n,a,o,i,r,s,d=globalElements.output.galleryItems,c=globalElements.output.galleryCode,m=new Array;for(const g of e.files.length){const u=g.name;1e7<g.size?m.push(u):(i=URL.createObjectURL(g),a=d.children,t="pic"+(a=getChildIndex(a,"id")),l="dropdown"+a,o="gallery"+a,n="wikiCodeGallery"+a,a="wikiCodeGalleryValue"+a,s=(s=r=void 0,r=document.createElement("p"),s=document.createElement("span"),r.innerText=u,s.classList.add("has-text-weight-bold"),s.innerText="Name: ",r.insertAdjacentElement("afterbegin",s),r.outerHTML),r=(d.insertAdjacentHTML("afterbegin",`
		<div id="${o}" class="gallery-item">
			<a class="gallery-media" href=${i} target="_blank" rel="noopener noreferrer">
				<img src="${i}">
			</a>
			<div class="gallery-meta">
				${s}
				<div><select id="${l}" onchange="galleryDesc(this,'${t}', '${a}')"></select></div>
				<div><input id="${t}" type="text" placeholder="Description" oninput="galleryInput(this,'${a}')" /></div>
			</div>
			<div class="controlButtons">
				<span class="delete-icon is-clickable" title="Remove picture from gallery" onclick="rmGallery(this, '${n}')">&#10060</span>
				<img class="handle" src="./assets/vector/arrow.svg" title="Move picture up or down">
				<button class="button moveButton" title="Move up" onclick="mobileMoveItem(this, '${n}', 'up')">
					<svg width="36" height="36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
				</button>
				<button class="button moveButton" title="Move down" onclick="mobileMoveItem(this, '${n}', 'down')">
					<svg width="36" height="36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
				</button>
			</div>
		</div>`),`<div id="${n}">
			<span>${u}</span><output id="${a}"></output>
		</div>`),o=(c.insertAdjacentHTML("afterbegin",r),document.getElementById(l)),"function"==typeof generateGalleryArray&&generateGalleryArray(),(i=pageData.galleryArray)?setDropdownOptions(o,i):o.parentElement.style.display="none")}m.length?errorMessage(e,"The following files exceed the 10MB upload limit and couldn't be added: "+m.join(", ")):errorMessage(e),galleryUploadShown||("function"==typeof galleryExplanationExternal&&explanation("Gallery",galleryExplanationExternal()+`
		<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`),galleryUploadShown=!0)}}function galleryDesc(e,t,l){e=e.value,t=document.getElementById(t);t.value=e,galleryInput(t,l)}function galleryInput(e,t){e=sanitiseString(e.value);document.getElementById(t).innerText=e?"|"+e:""}function rmGallery(e,t){document.getElementById(t).remove(),e.closest(".gallery-item").remove()}function moveItem(e){var t=e.oldIndex,e=e.newIndex,l=Array.from(document.getElementById("galleryCode").children),t=l.splice(t,1),n=(l.splice(e,0,t[0]),new Array);for(const o of l){var a=o.outerHTML;n.push(a)}document.getElementById("galleryCode").innerHTML=n.join("")}function mobileMoveItem(e,t,l){var n=e.closest(".gallery-item");for(const e of[n,document.getElementById(t)]){var a=e.parentNode;"up"==l&&e.previousElementSibling?a.insertBefore(e,e.previousElementSibling):"down"==l&&e.nextElementSibling&&a.insertBefore(e,e.nextElementSibling.nextElementSibling)}}function resetGallery(){globalElements.output.galleryItems.innerHTML=""}