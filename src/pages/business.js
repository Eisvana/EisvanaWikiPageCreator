function startupFunctions(){var t=document.querySelector('[oninput*="enPrefix"]');enPrefix(t.value,"enPrefix")}const businessElements={input:{contentsInput:"contentsInput"},output:{contents:"contents"}},businessElementFunctions=(updateGlobalElements(businessElements),{ownerInput:['hideDiscoverer("ownerInput", "ownerlinkInput")'],ownerlinkInput:['hideDiscoverer("ownerlinkInput", "ownerInput")'],currencyInput:['fixHC(this); enPrefix(this.value, "enPrefix")']});function fixHC(t){var e=pageData.currency.toLowerCase(),t=t.dataset.dest;"hubcoin"===e&&wikiCode("{{CurrencyHubCoin}}",t)}function addSection(){var t=globalElements.input.contentsInput,e=globalElements.output.contents,n=document.querySelectorAll("[data-section]"),n=getChildIndex(n,"dataset.section"),i="heading"+n,o="img"+n,s="text"+n,a="heading_input"+n,l="img_input"+n,u="text_input"+n,c=`<div data-section="section${n}">==<output name="${i}"></output>==</div>
	<div style="display:none" data-section="section${n}">[[File:<output id="${o}"></output>|thumb]]</div>
	<div data-section="section${n}"><output id="${s}"></output><br><br></div>`,t=(t.insertAdjacentHTML("beforebegin",`<div class="tableHeader text sectionToggle" data-section="section${n}">
		<div><span class="has-text-weight-bold">Title: </span><output name=${i}></output></div>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${n}')">Remove</button>
	</div>
	<div class="tableCell text" data-section="section${n}">
		<label for="${a}">Section heading:</label>
	</div>
	<div class="tableCell data" data-section="section${n}">
		<input type="text" id="${a}" data-dest="${i}">
	</div>
	<div class="tableCell text" data-section="section${n}">
		<label for="${l}">Image name, including file extension:</label>
	</div>
	<div class="tableCell data" data-section="section${n}">
		<input type="text" id="${l}" data-dest="${o}" oninput="showContentImg(this)">
		<input type="file" id="${"img_upload"+n}" accept="image/*" onchange="image(this); showContentImg(this.previousElementSibling)">
	</div>
	<div class="tableHeader data no-flex" data-section="section${n}">
		<label for="${u}">Content:</label>
		<textarea class="mb-2" id="${u}" data-dest="${s}"></textarea>
	</div>`),e.insertAdjacentHTML("beforeend",c),document.querySelectorAll(`[data-section="section${n}"] :is(input, textarea)`));for(const d of t)assignFunction(d,"wikiCode(this)")}function showContentImg(t){var e=t.dataset.dest,e=document.getElementById(e).parentElement;t.value?e.style.display="":e.style.display="none"}function resetExternal(){var t=document.querySelectorAll("[data-section]");globalElements.output.contents.innerText="",removeSection(t)}assignElementFunctions(businessElementFunctions),datalists({currencies:["{{CurrencyHubCoin}}"]});