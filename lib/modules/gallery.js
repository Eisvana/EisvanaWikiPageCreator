(() => {
	if (window.matchMedia('(pointer: coarse)').matches) return;
	const script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js';
	document.head.appendChild(script);
	script.onload = () => sortable();
})();

function sortable() {
	const galleryWrapper = globalElements.output.galleryItems;
	const gallerySort = new Sortable(galleryWrapper, {
		handle: '.handle',	// handle's class
		animation: 250,
		onUpdate: function (evt) { moveItem(evt) },
	});
}

let galleryUploadShown = false;

// handles gallery images
function galleryUpload() {
	const inp = globalElements.input.galleryUpload;
	if (!inp.value) return;
	const inputDiv = globalElements.output.galleryItems;
	const wikiCodeGalleryDiv = globalElements.output.galleryCode;
	const regex = /[0-9]/g;		// match all numbers from 0-9 in the given string

	for (let fileIndex = 0; fileIndex < inp.files.length; fileIndex++) {
		const file = inp.files.item(fileIndex);
		const name = file.name;
		const imgUrlData = URL.createObjectURL(file);
		const childtree = inputDiv.children;
		const IDs = [0];	// dummy element to avoid if statement
		for (const child of childtree) {
			const idNumber = child.id.match(regex).join('');	// get all numbers of the string into an array, then join that array
			IDs.push(parseInt(idNumber));
		}
		function compareNumbers(a, b) {
			return a - b;
		}
		IDs.sort(compareNumbers);
		const childIndex = IDs[IDs.length - 1] + 1
		const inputId = 'pic' + childIndex;
		const dropdownId = 'dropdown' + childIndex;
		const galleryId = 'gallery' + childIndex;
		const wikiCodeGalleryId = 'wikiCodeGallery' + childIndex;
		const wikiCodeGalleryValueId = 'wikiCodeGalleryValue' + childIndex;

		const galleryTemplate = `
		<div id="${galleryId}" class="gallery-item">
			<a class="gallery-media" href=${imgUrlData} target="_blank" rel="noopener noreferrer">
				<img src="${imgUrlData}" alt="" />
			</a>
			<div class="gallery-meta">
				<p><span class="has-text-weight-bold">Name: </span>${name}</p>
				<div><select id="${dropdownId}" onchange="galleryDesc(this,'${inputId}', '${wikiCodeGalleryValueId}')"></select></div>
				<div><input id="${inputId}" type="text" placeholder="Description" oninput="galleryInput(this,'${wikiCodeGalleryValueId}')" /></div>
			</div>
			<div class="controlButtons">
				<span class="delete-icon is-clickable" title="Remove picture from gallery" onclick="rmGallery(this, '${wikiCodeGalleryId}');">&#10060</span>
				<img class="handle" src="./lib/arrow.svg" title="Move picture up or down">
				<button class="button moveButton" title="Move up" onclick="mobileMoveItem(this, '${wikiCodeGalleryId}', 'up')">
					<svg width="36" height="36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
				</button>
				<button class="button moveButton" title="Move down" onclick="mobileMoveItem(this, '${wikiCodeGalleryId}', 'down')">
					<svg width="36" height="36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
				</button>
			</div>
		</div>`;

		inputDiv.insertAdjacentHTML('beforeend', galleryTemplate);

		const wikiCodeGalleryTemplate = `<div id="${wikiCodeGalleryId}">
			<span>${name}</span><output id="${wikiCodeGalleryValueId}"></output>
		</div>`;

		wikiCodeGalleryDiv.insertAdjacentHTML('beforeend', wikiCodeGalleryTemplate);

		const galleryElement = document.getElementById(dropdownId);
		if (typeof galleryArray == 'undefined') {
			galleryElement.parentElement.style.display = 'none';
		} else {
			setDropdownOptions(galleryElement, galleryArray);
		}
	}
	if (galleryUploadShown) return;
	// the galleryExplanationExternal() function should return string with the popup text. HTML is supported.
	try {
		explanation('Gallery',
			`${galleryExplanationExternal()}
		<div class="mt-3"><span class="has-text-weight-bold">NOTE</span>: You can access this popup at any time by clicking on the "?" next to the gallery upload button.</div>`);
	} catch (error) {
		/* do nothing */
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
	if (desc != '') {
		document.getElementById(galleryId).innerText = '\|' + desc;
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