const GroundGenera = {
	'Anastomus': '',
	'Anomalous': '',
	'Bos': '',
	'Bosoptera': '',
	'Felidae': '',
	'Felihex': '',
	'Hexungulatis': '',
	'Lok': '',
	'Mechanoceris': '',
	'Mogara': '',
	'Osteofelidae': '',
	'Prionterrae': '',
	'Procavya': '',
	'Protosphaeridae': '',
	'Prototerrae': '',
	'Rangiafe': '',
	'Reococcyx': '',
	'Spiralis': '',
	'Spiralis': '',
	'Talpidae': '',
	'Tetraceris': '',
	'Theroma': '',
	'Tyranocae': '',
	'Ungulatis': ''
};

const FlyingGenera = {
	'Agnelis': '',
	'Cycromys': '',
	'Oxyacta': '',
	'Protocaeli': '',
	'Rhopalocera': ''
};

const UnderwaterGenera = {
	'Procavaquatica': '',
	'Bosaquatica': '',
	'Chrysaora': '',
	'Ictaloris': '',
	'Prionace': '',
	'Prionacefda': ''
};

const UndergroundGenera = {
	'Bos': '',
	'Lok': '',
	'Procavya': '',
	'Prototerrae': ''
};

// sets genus dropdown
function genusDropdown(ecosystem_inputId, genus_inputId) {
	let genera;
	let ecosystem = document.getElementById(genus_inputId).value
	switch (ecosystem) {
		case "Ground":
			genera = GroundGenera;
			break;
		
		case "Flying":
			genera = FlyingGenera;
			break;
		
		case "Underwater":
			genera = UnderwaterGenera;
			break;
		
		case "Underground":
			genera = UndergroundGenera;
			break;
	}
	genera = Object.keys(genera);
	setDropDownOptions(genera, genus_inputId);
}

// generates additional information sentence
function addInfo(type_inputId, civ_inputId, researchTeam_codeId, codeId) {
	let catalog = '';
	let chapter = document.getElementById(researchTeam_codeId).innerHTML;
	let civ = document.getElementById(civ_inputId).value;
	let type = document.getElementById(type_inputId).value;
	
	if (civ == 'GHub') {
			civ = 'Galactic Hub'
			catalog = 'GHEC '
	}
	
	if (chapter.length > 4) {
		chapter = ''
	} else {
		chapter = ' and documented by the [[Galactic Hub Exobiology Corps]]'
	}
	
	catalog = civ + type + ' Album'
	const output = '[[' + catalog + ']]' + chapter

	setOutput(codeId, output);
}

// generates name to use for wikilink
function pageName(orgName_inputId, newName_inputId) {
	orgName = document.getElementById(orgName_inputId).value
	if (!orgName == '') {
		return orgName_inputId
	} else {
		return newName_inputId
	}
}