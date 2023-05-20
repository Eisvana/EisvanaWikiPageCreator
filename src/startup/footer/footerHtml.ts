import { loadHTML } from "../../common";
import { addPortalGlyphButtons } from "../../modules/portalglyphs";
import { globalElements } from "../../variables/objects";

/**
 * Loads the HTML of the footer and removes the `<a>` element with an `id` of `about` if it links to the current page.
 */
const dom = await loadHTML('src/htmlSnippets/footer.html');
const about = dom.getElementById('about');
if ((about as HTMLAnchorElement).href == window.location.toString()) about?.remove();

/**
 * If a global `globalElements` object exists, the `innerHTML` property of the `footer` key is set to `footerHTML`.
 * Otherwise, the `innerHTML` property of the element with an `id` of `footer` is set to `footerHTML`.
 */
const footerHTML = dom.body.innerHTML;
if (globalElements?.output?.footer) {
	(globalElements.output.footer as HTMLElement).innerHTML = footerHTML;
} else {
	(document.getElementById('footer') as HTMLElement).innerHTML = footerHTML;
}

// Add portal glyph buttons to the `settingsPortalglyphButtons` container.
const settingsPortalglyphButtons = document.getElementById('settingsPortalglyphButtons') as HTMLDivElement;
if (settingsPortalglyphButtons) addPortalGlyphButtons(settingsPortalglyphButtons, 'portalglyphsDefault');