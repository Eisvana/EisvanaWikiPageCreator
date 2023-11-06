import footerHTMLRaw from '../../htmlSnippets/footer.html?raw';
import { addPortalGlyphButtons } from "../../modules/portalglyphs";
import { globalElements } from "../../variables/objects";

const parser = new DOMParser();
const dom = parser.parseFromString(footerHTMLRaw, 'text/html');
const about = dom.getElementById('about');

if ((about as HTMLAnchorElement).href === window.location.toString()) about?.remove();
/**
 * If a global `globalElements` object exists, the `innerHTML` property of the `footer` key is set to `footerHTML`.
 * Otherwise, the `innerHTML` property of the element with an `id` of `footer` is set to `footerHTML`.
*/
const footerHTML = dom.body.innerHTML;
if (globalElements?.output?.footer instanceof HTMLElement) {
	globalElements.output.footer.innerHTML = footerHTML;
} else {
	(document.getElementById('footer') as HTMLElement).innerHTML = footerHTML;
}

// Add portal glyph buttons to the `settingsPortalglyphButtons` container.
const settingsPortalglyphButtons = document.getElementById('settingsPortalglyphButtons') as HTMLDivElement;
if (settingsPortalglyphButtons) addPortalGlyphButtons(settingsPortalglyphButtons, 'portalglyphsDefault');