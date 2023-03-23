(() => {
	addAllTooltips();

	// handle dialog stuff
	const dialogElements = {
		output: {
			explanationHeading: 'explanationHeading',
			explanationContent: 'explanationContent',
			explanationLink: 'explanationLink',
			explanationImg: 'explanationImg',
		}
	}

	const content = `<h2 id="explanationHeading" class="title is-4"></h2>
	<div id="explanationContent" class="nms-font"></div>
	<a id="explanationLink" target='_blank' rel='noopener noreferrer'>
		<img id="explanationImg" alt='Explainer Image'>
	</a>
	<form method="dialog">
		<button class="button" type="submit" autofocus>Close</button>
	</form>`;

	globalElements.output.explanation.innerHTML = content;

	updateGlobalElements(dialogElements);
})();

// set holds images that were previously opened and thereby cached
const cachedImages = new Set();

// shows an explanation modal and fills text
function explanation(heading, text, img) {
	const imgElement = globalElements.output.explanationImg;
	const linkElement = globalElements.output.explanationLink;
	const dialogElement = globalElements.output.explanation;
	if (img) {
		// image is given
		if (cachedImages.has(img)) {
			// image has been opened before -> is cached -> no loading anim necessary
			linkElement.classList.remove('loading');

			// getAttribute is necessary to get the raw value, not the parsed URL
			if (imgElement.getAttribute('src') != img) {
				// image is not same as previous -> need to adjust src and link href
				imgElement.src = '';
				imgElement.src = img;
				linkElement.href = img;
			}

		} else {
			// image, not cached
			imgElement.src = '';
			imgElement.style.opacity = 0;
			imgElement.style.marginBlockStart = 0;
			imgElement.src = img;
			linkElement.classList.add('loading');
			linkElement.href = img;
		}
		linkElement.style.display = '';

	} else {
		// no image
		linkElement.style.display = 'none';
	}
	globalElements.output.explanationHeading.innerText = heading;
	globalElements.output.explanationContent.innerHTML = text;
	imgElement.onload = () => {
		imgElement.style.marginBlockStart = '1rem';
		imgElement.style.opacity = 1;
		cachedImages.add(img);
	}
	dialogElement.style.translate = '0 -100vh';
	dialogElement.showModal();
	dialogElement.style.translate = '0 0';
	dialogElement.scrollTo(0, 0);
}

// adds all tooltips which are not yet generated
function addAllTooltips() {
	const elements = document.querySelectorAll('span.tooltip');
	for (const element of elements) {
		constructTooltip(element);
	}

	// turns HTML tooltip data into actual interactive tooltip
	function constructTooltip(element) {
		const dataElements = element.getElementsByTagName('data');
		if (!dataElements.length) return;

		const dataArr = new Array;
		for (const element of dataElements) {
			const text = element.innerHTML;
			dataArr.push(text);
		}

		const img = document.createElement('img');
		img.src = './assets/vector/help.svg';
		img.alt = 'Help';

		const tooltip = document.createElement('span');
		tooltip.classList.add('tooltiptext', 'nms-font');
		tooltip.innerHTML = dataArr[0];

		if (dataArr.length > 1) {
			assignFunction(element, 'explanation(`' + (dataArr[1] ?? '') + '`,`' + (dataArr[2] ?? '') + '`,`' + (dataArr[3] ?? '') + '`)', 'onclick');
		}

		element.innerHTML = img.outerHTML + tooltip.outerHTML;
	}
}
