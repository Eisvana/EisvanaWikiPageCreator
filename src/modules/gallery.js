(() => {
	if (window.matchMedia('(pointer: coarse)').matches) return;
	const script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js';
	document.head.appendChild(script);
	script.onload = () => {
		const galleryWrapper = globalElements.output.galleryItems;
		const gallerySort = new Sortable(galleryWrapper, {		// NoSonar (used by another library, not useless!)
			handle: '.handle',	// handle's class
			animation: 250,
			onUpdate: function (evt) { moveItem(evt) },
		});
	}
})();

let galleryUploadShown = false;
// handles gallery images
async function galleryUpload() {
	const inp = globalElements.input.galleryUpload;
	if (!inp.value) return;
	const inputDiv = globalElements.output.galleryItems;
	const wikiCodeGalleryDiv = globalElements.output.galleryCode;
	const errors = new Array;
	for (const file of inp.files) {
		const name = file.name;
		if (file.size > 10000000) {
			errors.push(name);
			continue;
		}
		const childtree = inputDiv.children;
		const childIndex = getChildIndex(childtree, 'id');
		const dropdownId = 'dropdown' + childIndex;
		const wikiCodeGalleryId = 'wikiCodeGallery' + childIndex;
		const wikiCodeGalleryValueId = 'wikiCodeGalleryValue' + childIndex;

		const nameElement = (() => {
			const p = document.createElement('p');
			const span = document.createElement('span');
			p.innerText = name;
			span.classList.add('has-text-weight-bold');
			span.innerText = 'Name: ';
			p.insertAdjacentElement('afterbegin', span);
			return p.outerHTML;
		})();

		const replacementStrings = {
			imgUrlData: URL.createObjectURL(file),
			inputId: 'pic' + childIndex,
			dropdownId: 'dropdown' + childIndex,
			galleryId: 'gallery' + childIndex,
			nameElement: nameElement,
		}

		const galleryTemplate = await loadHTML('src/htmlSnippets/galleryInput.html', replacementStrings);

		const wikiCodeGalleryTemplate = `<div id="${wikiCodeGalleryId}">
		<span>${name}</span><output id="${wikiCodeGalleryValueId}"></output>
		</div>`;

		inputDiv.insertAdjacentHTML('afterbegin', galleryTemplate.body.innerHTML);
		wikiCodeGalleryDiv.insertAdjacentHTML('afterbegin', wikiCodeGalleryTemplate);

		const galleryElement = document.getElementById(dropdownId);

		if (typeof generateGalleryArray == 'function') generateGalleryArray();

		const galleryArray = pageData.galleryArray;
		if (galleryArray) {
			setDropdownOptions(galleryElement, galleryArray);
		} else {
			galleryElement.parentElement.style.display = 'none';
		}
	}
	if (errors.length) {
		errorMessage(inp, `The following files exceed the 10MB upload limit and couldn't be added: ${errors.join(', ')}`)
	} else {
		errorMessage(inp);
	}

	if (galleryUploadShown) return;
	// the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
	if (typeof galleryExplanationExternal == 'function') {
		explanation('Gallery',
			`${galleryExplanationExternal()}
		<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`);
	}
	galleryUploadShown = true;
}

// takes description from gallery dropdown into input field
function galleryDesc(dropdownElement, inputId, codeId) {
	const dropdown = dropdownElement.value;
	const input = document.getElementById(inputId);
	input.value = dropdown;
	galleryInput(input, codeId);
}

// adds or removes descriptions from the gallery
function galleryInput(input, galleryId) {
	const desc = sanitiseString(input.value);
	if (desc) {
		document.getElementById(galleryId).innerText = '|' + desc;
	} else {
		document.getElementById(galleryId).innerText = '';
	}
}

// removes gallery row if X is clicked
function rmGallery(galleryNode, wikiCodeGalleryId) {
	const wikiCodeGalleryNode = document.getElementById(wikiCodeGalleryId);
	wikiCodeGalleryNode.remove();
	galleryNode.closest('.gallery-item').remove();
}

// moves item in gallery and gallery wikicode up or down depending on dragging direction
function moveItem(evt) {
	const oldIndex = evt.oldIndex;
	const newIndex = evt.newIndex;
	const galleryItems = Array.from(document.getElementById('galleryCode').children);
	const extractedItem = galleryItems.splice(oldIndex, 1);
	galleryItems.splice(newIndex, 0, extractedItem[0])
	const HTML = new Array;
	for (const item of galleryItems) {
		const code = item.outerHTML;
		HTML.push(code);
	}
	document.getElementById('galleryCode').innerHTML = HTML.join('')
}

// moves item in gallery and gallery wikicode up or down depending on user input
function mobileMoveItem(element, codeId, direction) {
	const galleryItem = element.closest('.gallery-item')
	const galleryCodeItem = document.getElementById(codeId);
	const elements = [galleryItem, galleryCodeItem];
	for (const element of elements) {
		const wrapper = element.parentNode;

		if (direction == 'up' && element.previousElementSibling) {
			wrapper.insertBefore(element, element.previousElementSibling);
		} else if (direction == 'down' && element.nextElementSibling) {
			wrapper.insertBefore(element, element.nextElementSibling.nextElementSibling);
		}
	}
}

function resetGallery() {
	globalElements.output.galleryItems.innerHTML = '';
}