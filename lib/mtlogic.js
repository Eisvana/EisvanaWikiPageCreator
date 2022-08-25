const GHubHuburbRegions = {
	'FA555C30': 'Wekeram Conflux',
	'FA555C31': 'Ahomas Fringe',
	'FA556C31': 'Nudryorob Fringe',
	'FA557C31': 'Urzews Instability',
	'FA557C30': 'Ercays',
	'FA557C2F': 'Dahiloci Conflux',
	'FA556C2F': 'Rapphosu',
	'FA555C2F': 'Kemurrim Expanse',
	'F8555C30': 'Ardarea Sector',
	'F8555C31': 'Cetrocho Spur',
	'F8556C31': 'Guitat Cloud',
	'F8557C31': 'Unceto Cloud',
	'F8557C30': 'Yamurab Instability',
	'F8557C2F': 'Tenavata Terminus',
	'F8556C2F': 'Menacaro',
	'F8555C2F': 'Ziessuw Mass'
};
// GHub has additional ship and MT hunting grounds
for (let regionCode in GHubHuburbRegions) {
	GHubRegions[regionCode] = GHubHuburbRegions[regionCode];
};


// handles acquirement gallery images
function acquirementGalleryUpload(uploadId, descId, codeId) {

	const inp = document.getElementById(uploadId);
	const inputDiv = document.getElementById(descId);
	const wikiCodeGalleryDiv = document.getElementById(codeId);

	for (let fileIndex = 0; fileIndex < inp.files.length; ++fileIndex) {
		const file = inp.files.item(fileIndex);
		const name = file.name;
		const imgUrlData = URL.createObjectURL(file);
		const childtree = inputDiv.children;
		const IDs = [0];	// dummy element to avoid if statement
		for (const child of childtree) {
			IDs.push(parseInt(child.id.substring(18)))
		}
		function compareNumbers(a, b) {
			return a - b;
		}
		IDs.sort(compareNumbers);
		const childIndex = IDs[IDs.length - 1] + 1
		const inputId = 'acquirementPic' + childIndex;
		const dropdownId = 'acquirementDropdown' + childIndex;
		const galleryId = 'acquirementGallery' + childIndex;
		const wikiCodeGalleryId = 'acquirementWikiCodeGallery' + childIndex;
		const wikiCodeGalleryValueId = 'acquirementWikiCodeGalleryValue' + childIndex;

		const galleryTemplate = `<div id="${galleryId}" class="gallery-item">
			<a class="gallery-media" href=${imgUrlData} target="_blank" rel="noopener noreferrer">
				<img src="${imgUrlData}" alt="" />
			</a>
			<div class="gallery-meta">
				<p><b>Name: </b>${name}</p>
				<div><select id="${dropdownId}" onchange="galleryDesc(this,'${inputId}', '${wikiCodeGalleryValueId}')"></select></div>
				<div><input id="${inputId}" type="text" placeholder="Description" oninput="galleryInput(this,'${wikiCodeGalleryValueId}')" /></div>
			</div>
			<div class="controlButtons">
				<span class="delete-icon" onclick="rmGallery('${galleryId}', '${wikiCodeGalleryId}');">❌</span>
				<button class="moveButton" onclick="moveItem('${galleryId}', '${wikiCodeGalleryId}', 'up')">
					<svg width="36" height="36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
				</button>
				<button class="moveButton" onclick="moveItem('${galleryId}', '${wikiCodeGalleryId}', 'down')">
					<svg width="36" height="36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
				</button>
			</div>
		</div>`;

		inputDiv.insertAdjacentHTML('beforeend', galleryTemplate);

		const wikiCodeGalleryTemplate = `<div id="${wikiCodeGalleryId}">
			<span>${name}</span><output id="${wikiCodeGalleryValueId}"></output>
		</div>`;

		wikiCodeGalleryDiv.insertAdjacentHTML('beforeend', wikiCodeGalleryTemplate);

		if (typeof galleryArray == 'undefined') {
			document.getElementById(dropdownId).parentElement.style.display = 'none';
		} else {
			setDropDownOptions(galleryArray, dropdownId);
		}
	}
}

// adds region to location sentence
function locGalaxy(civ, codeId) {
	const hub = document.getElementById(civ).value
	let output;
	switch (hub) {
		case "GHub":
			output = '[[Galactic Hub]]'
			break;

		case "CalHub":
			output = '[[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]'
			break;

		case "EisHub":
			output = '[[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]'
			break;
	}
	setOutput(codeId, output)
}

// constructs the acquirement sentence
function acquirement(location_inputId, planet_inputId, moon_inputId, axes_inputId, sr_inputId, srloc_inputId, codeId) {
	const srloc = document.getElementById(srloc_inputId).value.toLowerCase()	// s/r location (for example planet/moon/space station)
	const sr = document.getElementById(sr_inputId).value						// name of the s/r location (for example a planetname)
	const planet = document.getElementById(planet_inputId).value				// planet name of the MT
	const moon = document.getElementById(moon_inputId).value					// moon name of the MT
	const coords = document.getElementById(axes_inputId).value					// coords of the MT
	const loc = document.getElementById(location_inputId).value.toLowerCase()	// location type of the MT (for example space station/settlement/sentinel pillar)
	let instructions, savereload;
	function planetMoon(planet, moon) {
		if (moon != '') return `moon [[${moon}]]`

		return `planet [[${planet}]]`
	}

	if (loc == 'space station' || loc == 'space anomaly') {
		instructions = `fly to the ${loc}`
		savereload = `the ${srloc}`
		if (loc == srloc) {
			instructions = 'take from cabinet'
		} else if (!(srloc == 'space station' || srloc == 'space anomaly')) {
			savereload = `${srloc} [[${sr}]]`
		}
	} else {	// if not on Station/Anomaly
		savereload = `${srloc} [[${sr}]]`
		instructions = `fly to ${planetMoon(planet, moon)} (${coords})`
		if (srloc == 'space station' || srloc == 'space anomaly') {
			savereload = `the ${srloc}`
		} else if ((moon != '' && srloc == 'moon' && sr == moon) || (moon == '' && srloc == 'planet' && sr == planet)) {
			instructions = `fly to ${coords}`
		} else if (sr == '') {
			savereload = `${planetMoon(planet, moon)}`;
			instructions = `fly to ${coords}`;
		}
	}

	const sentence = `Save and reload on ${savereload}, then ${instructions}.`;
	setOutput(codeId, sentence);
}

// Corrects catalog link for GHub
function catalog(civ_inputId, codeId) {
	const civ = document.getElementById(civ_inputId).value;
	let output = civ;
	if (civ == 'GHub') {
		output = "Galactic Hub"
	}
	setOutput(codeId, output)
}

// adds "documented by the GHSH" sentence
function addInfoChapter(chapter_inputId, codeId) {
	const chapter = document.getElementById(chapter_inputId).value;
	let output = '';
	if (chapter == 'GHSH') {
		output = ' and documented by the [[Galactic Hub Ship Hunters]]'
	}
	document.getElementById(codeId).innerHTML = output;
}