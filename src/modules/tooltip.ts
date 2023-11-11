/**
 * @fileoverview Generates tooltips and handles all logic related to tooltips and explanation popups.
 */

import { globalElements } from "../variables/objects";
import { assignFunction } from "../commonElements/elementBackend/elementFunctions";

export const explanationContent: string = `
	<h2 id="explanationHeading" class="title is-4"></h2>
	<div id="explanationContent" class="nms-font"></div>
	<a id="explanationLink" target="_blank" rel="noopener noreferrer">
		<picture>
			<source type="image/webp" id="explanationWebpImg">
			<img id="explanationFallbackImg" alt="Explainer Image">
		</picture>
	</a>
	<form method="dialog">
		<button class="button" type="submit" autofocus>Close</button>
	</form>`;

/**
 * A Set which holds images that have been previously loaded and cached.
 * @type {Set}
 */
const cachedImages: Set<string> = new Set();

/**
 * Displays an explanation modal with optional text and image.
 * @param {string} heading - The heading of the modal.
 * @param {string} text - The text content of the modal.
 * @param {string} image - The URL of the image to display in the modal.
 */
export function explanation(heading: string = '', text: string = '', image: string = '') {
	// I have no idea how to do type guards in destructuring, so I need to do it the ugly way here.
	// I also hate past-Lenni for making this ugly interface that needs typeguards and assertions everywhere.
	const imgElement = globalElements.output.explanationFallbackImg as HTMLImageElement;
	const webpImg = globalElements.output.explanationWebpImg as HTMLSourceElement;
	const linkElement = globalElements.output.explanationLink as HTMLAnchorElement;
	const dialogElement = globalElements.output.explanation as HTMLDialogElement;
	const img = image.trim();

	// Check if img URL was provided
	if (img) {
		const isCached = cachedImages.has(img);

		linkElement.classList.toggle('loading', !isCached);

		if (!isCached || imgElement.getAttribute('src') !== `./assets/images/jpg/${img}.jpg`) {
			const imageFormats = {
				webp: webpImg,
				jpg: imgElement
			}

			/*
			This needs an explanation *sigh*
			You might wonder: Why the fuck is there a setTimeout with 0ms here?!
			You'd be absolutely right in asking that.
			So here's the story:
			Since we serve optimised images, we use a <picture> element.
			This picture element behaves differently from the <img> element:
			It doesn't display the picture line by line when they are ready, but it instead waits for the entire thing to load, and then displays it all at once.
			It also keeps the aspect ratio of the previous picture until the new one is loaded. This is the big pain point.
			In order to not have the <dialog> jump around during load, we're clearing the source attributes and then re-assigning them.
			So why the setTimeout() you might ask?
			Because browsers suck.
			The code runs so fast that the browser only updates with the new image, it doesn't clear the old one.
			This means the aspect ratio is never cleared, and therefore the image still jumps around.
			By using a setTimeout(), we're pushing the new images to the end of the callstack, meaning we wait for everything else to finish running before we fill in the new sources.
			This results in the necessary wait time for the browser to update, and we get the intended result of no jumping images.
			*/
			for (const [format, element] of Object.entries(imageFormats)) {
				const attribute = element.tagName === 'IMG' ? 'src' : 'srcset';

				// clear source attributes
				element[attribute] = '';

				// wait for everything else to update, then set the new image sources
				setTimeout(() => {
					element[attribute] = `./assets/images/${format}/${img}.${format}`;
				}, 0);
			}

			linkElement.href = `./assets/images/jpg/${img}.jpg`;

			if (!isCached) {
				imgElement.style.opacity = '0';
				imgElement.style.marginBlockStart = '0';
			}
		}
	}

	// Set link display style depending on whether an img was provided or not
	linkElement.style.display = img ? '' : 'none';

	// Set modal heading and text content
	(globalElements.output.explanationHeading as HTMLHeadingElement).innerText = heading;
	(globalElements.output.explanationContent as HTMLDivElement).innerHTML = text;

	// Show the modal with a slide-down animation
	dialogElement.style.translate = '0 -100vh';
	dialogElement.showModal();
	dialogElement.style.translate = '0 0';
	dialogElement.scrollTo(0, 0);

	// Wait for img to load, then update the DOM and cache the image
	imgElement.onload = () => {
		imgElement.style.marginBlockStart = '1rem';
		imgElement.style.opacity = '1';
		cachedImages.add(img);
	}
}

/**
 * Adds a tooltip to all HTML elements with the class name 'tooltip'
 *
 * @param  {Object} [dom=document] - Optional DOM object to query for elements
 * @return {void}
 */
export function addAllTooltips(dom = document) {
	const elements: NodeListOf<HTMLButtonElement> = dom.querySelectorAll('button.tooltip');
	for (const element of Array.from(elements)) {
		constructTooltip(element);
	}

	/**
	 * Turns HTML tooltip data into actual interactive tooltip
	 * @function
	 * @param {Element} element - The tooltip element to be constructed
	 * @returns {void}
	 */
	function constructTooltip(element: HTMLButtonElement) {
		const dataElements = element.getElementsByTagName('data');
		if (!dataElements.length) return;

		const dataArr: Array<string> = [];
		for (const element of Array.from(dataElements)) {
			const text = element.innerHTML;
			dataArr.push(text);
		}

		const img = document.createElement('img');
		img.src = './assets/icons/help.svg';
		img.alt = 'Help';

		const tooltip = document.createElement('p');
		tooltip.classList.add('tooltiptext', 'nms-font');
		tooltip.innerHTML = dataArr.shift() as string;

		/**
		* This if statement checks if the length of dataArr is truthy. If it is, params is assigned to an array with dataArr elements joined with a comma as the separator.
		* Then, the functionCall is assigned the result of interpolating params into a string with the `explanation` function call.
		* Finally, assignFunction is called with element, functionCall, and 'onclick' as its arguments.
		*/
		if (dataArr.length) {
			assignFunction({ element, handler: 'click', func: () => explanation(...dataArr) });
		} else {
			element.ariaDisabled = 'true';
		}

		element.innerHTML = img.outerHTML;
		element.appendChild(tooltip);
	}
}