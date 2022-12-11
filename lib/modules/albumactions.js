// The logic for calculating the link target should be done by the main JS file of the page
const albumElements = {
	output: {
		albumCiv: 'albumCiv',
		album: 'album',
		albumType: 'albumType',
		albumHeaderName: 'albumHeaderName',
		albumImage: 'albumImage',
		albumName: 'albumName',
		albumOther: 'albumOther',
		albumGlyphs: 'albumGlyphs',
		albumDiscoverer: 'albumDiscoverer',
		albumText: 'albumText'
	}
};		// this semicolon is necessary, otherwise the code throws an error

(() => {
	const wikitext = `<h3 class="subtitle has-text-weight-bold mb-2"><output id="albumCiv"></output>
<output id="album" name="type"></output> <output id="albumType"></output> entry for <output id='albumHeaderName' name="name"></output>:
</h3>
<div id="albumText" class="wikiText">
| {{album| file=<output name="image" id="albumImage"></output> | name=[[<output id="albumName"></output>]]
| other=<output id="albumOther"></output> | glyph=<output id='albumGlyphs' name="portalglyphs"></output> |
<output id="albumDiscoverer"></output>}}
</div>`

	const actions = `<button id="albumBtn" class="button is-outlined is-primary"
onclick="copyCode(this, 'albumText')">
Copy album wikicode
</button>
<a class="button is-outlined is-primary" id="albumLink"
onclick="albumLink(this)">
Open Album
</a>`
	globalElements.output.albumEntry.innerHTML = wikitext;
	globalElements.output.albumActions.innerHTML = actions;
	updateGlobalElements(albumElements);
})();


function albumDiscoverer() {
	const discovered = pageData.discovered;
	const discoveredlink = pageData.discoveredlink;

	const output = (() => {
		if (discoveredlink != '') {
			return `wiki=${discoveredlink}`;
		} else {
			return `discoverer=${discovered}`;
		}
	})();
	albumElements.output.albumDiscoverer.innerText = output;
}

const albumElementFunctions = {
	civ: ['albumCiv()', null, true],
}
assignElementFunctions(albumElementFunctions);

function albumCiv() {
	albumElements.output.albumCiv.innerText = pageData.civShort;
}

function albumFunctions() {
	albumCiv();
	albumDiscoverer();
	albumName();
	albumOther();
	albumType();
}

// wikiLink('albumLink', 'region', 'name_input'); this.href ? this.href = 'https://nomanssky.fandom.com/wiki/' + document.getElementById('addInfo').innerHTML.replace('[[', '').replace(']]', '') : this.removeAttribute('href')