const galleryWrapper = globalElements.output.galleryItems;
const gallerySort = new Sortable(galleryWrapper, {
	handle: '.handle',	// handle's class
	animation: 250,
	onUpdate: function (evt) { moveItem(evt) },
});

// handles gallery images
function galleryUpload() {

	const inp = globalElements.input.galleryUpload;
	const inputDiv = globalElements.output.galleryItems;
	const wikiCodeGalleryDiv = globalElements.output.galleryCode;

	for (let fileIndex = 0; fileIndex < inp.files.length; fileIndex++) {
		const file = inp.files.item(fileIndex);
		const name = file.name;
		const imgUrlData = URL.createObjectURL(file);
		const childtree = inputDiv.children;
		const IDs = [0];	// dummy element to avoid if statement
		for (const child of childtree) {
			IDs.push(parseInt(child.id.substring(7)))
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
				<p><label>Name: </label>${name}</p>
				<div><select id="${dropdownId}" onchange="galleryDesc(this,'${inputId}', '${wikiCodeGalleryValueId}')"></select></div>
				<div><input id="${inputId}" type="text" placeholder="Description" oninput="galleryInput(this,'${wikiCodeGalleryValueId}')" /></div>
			</div>
			<div class="controlButtons">
				<span class="delete-icon" onclick="rmGallery('${galleryId}', '${wikiCodeGalleryId}');">&#10060</span>
				<img class="handle" src="./lib/arrow.svg">
				<button style="display:none" class="moveButton" onclick="mobileMoveItem('${galleryId}', '${wikiCodeGalleryId}', 'up')">
					<svg width="36" height="36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
				</button>
				<button style="display:none" class="moveButton" onclick="mobileMoveItem('${galleryId}', '${wikiCodeGalleryId}', 'down')">
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
}

// takes description from gallery dropdown into input field
function galleryDesc(dropdownId, inputId, codeId) {
	let dropdown = dropdownId.value;
	let input = document.getElementById(inputId);
	input.value = dropdown;
	galleryInput(input, codeId);
}

// adds or removes descriptions from the gallery
function galleryInput(input, galleryId) {
	if (sanitiseString(input.value) != '') {
		document.getElementById(galleryId).innerText = '\|' + sanitiseString(input.value)
	} else {
		setOutput(galleryId, '')
	}
}

// removes gallery row if X is clicked
function rmGallery(galleryId, wikiCodeGalleryId) {
	const galleryNode = document.getElementById(galleryId);
	galleryNode.remove();

	const wikiCodeGalleryNode = document.getElementById(wikiCodeGalleryId);
	wikiCodeGalleryNode.remove();
}

// moves item in gallery and gallery wikicode up or down depending on user input
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
function mobileMoveItem(elementId, codeId, direction) {
	const galleryItem = document.getElementById(elementId)
	const galleryCodeItem = document.getElementById(codeId)
	const elements = [galleryItem, galleryCodeItem];
	for (const element of elements) {
		const wrapper = element.parentNode;

		if (direction == 'up' && element.previousElementSibling) {
			wrapper.insertBefore(element, element.previousElementSibling);
		} else if (direction == 'down' && element.nextElementSibling) {
			wrapper.insertBefore(element, element.nextElementSibling.nextElementSibling)
		}
	}
}

function resetGallery() {
	globalElements.output.galleryItems.innerHTML = '';
}