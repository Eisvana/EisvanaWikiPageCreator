function startupFunctions(){celestialStartupFunctions(),autoInfested(),wormAutoSpawn(),wormAlbumName(),"function"==typeof planetStartupFunctions&&planetStartupFunctions()}const planetMoonElements={input:{resourceInputs:"resourceInputs",autoSpawn:"autoSpawnInput"},output:{resourceBullets:"resourceBullets",creatures:"creatures",plants:"plants",minerals:"minerals",sandworm:"sandworm"}},planetMoonElementFunctions=(updateGlobalElements(planetMoonElements),{civ:["wormAlbumName()",null,!0],systemInput:["locationSentence()"],faunaNumberInput:['numberStats(this); plural(pageData[this.dataset.destNoauto], "faunaSentencePlural")'],sentinelInput:["sentinelSentence()"],descriptionInput:["autoInfested(this)"],sandwormInput:["addSandwormTemplate()"],wormmaxdepthInput:["numberStats(this, 1)"],autoSpawn:["wormAutoSpawn()"]});function plural(a,t=null){a=1==a?"is":"are";if(!t)return a;wikiCode(a,t)}function planetDescriptor(a){var t=a.dataset.destNoauto;const e=buildDescriptor(a.value,pageData.pageType," ");a=globalElements.output[t];Array.isArray(a)?a.forEach(a=>a.innerText=e):a.innerText=e}function locationSentence(){var a=pageData.system,t=pageData.region,e=pageData.civShort,a=`It can be found in the [[${a}]] [[star system]] in the [[${t}]] [[region]] (HUB${getHubNumber(t)}) of the ${HubGal(e)}.`;globalElements.output.location.innerText=a}function addResource(a=globalElements.input.resourceInputs.querySelector("button")){for(var t=a.parentElement,e=document.querySelectorAll("[data-resource]"),e=getChildIndex(e,"dataset.resource"),n="resource_input"+e,t=(t.insertAdjacentHTML("beforebegin",`<div class="tableCell text removable" data-resource="section${e}">
		<button class="button is-outlined is-danger icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${e}', 'resource'); enableResourceAdd()">&#10006</button>
		<label for="${n}">Resource name:</label>
	</div>
	<div class="tableCell data" data-resource="section${e}">
		<input type="text" list="resources" id="${n}" oninput="resourceList()" onchange="forceDatalist(this)">
	</div>`),document.querySelectorAll("[data-resource] button")),e=t.length;document.querySelectorAll("[data-resource] button").length<3;)addResource(a);if(6<e+1&&(a.disabled=!0),3<e)for(const o of t)o.disabled=!1}function enableResourceAdd(){globalElements.input.resourceInputs.querySelector("button").disabled=!1;var a=document.querySelectorAll("[data-resource] button");if(a.length<4)for(const t of a)t.disabled=!0;resourceList()}function resourceList(){var a=getResourceData(),t=document.querySelectorAll("[data-resource] input"),e=new Set;for(const s of t)s.value&&e.add(s.value);var n=new Object;for(const d of Array.from(e))n[d]=a[d];var o=Object.keys(n),i=Object.values(n);for(let a=0;a<o.length;a++){var l=o[a],l=(o[a]=`* {{ilink|${l}}}`,i[a]);i[a]=`[[${l}]]`}globalElements.output.resourceList.innerText=i.join(", "),globalElements.output.resourceBullets.innerText=o.join("\n")}function sentinelSentence(){const t=pageData.sentinel,e=getSentinelData();var a=(()=>{for(const a in e)if(e[a].includes(t))return a})(),a=`[[Sentinel]] activity on this ${pageData.pageType.toLowerCase()} is classified as: ''${t}''. The sentinels ${"aggressive"==a?"":"don't"} present an immediate threat.`;globalElements.output.sentinelSentence.innerText=a}function addFauna(a){var t=a.parentElement,e=globalElements.output[a.dataset.destNoauto],n="fauna",o=document.querySelectorAll(`[data-${n}]`),o=getChildIndex(o,"dataset."+n),i=`<div data-fauna="section${o}">|-</div>
	<div data-fauna="section${o}">|[[File:<output id="faunaFile${o}"></output>|150px]] || <output id="faunaName${o}" name="faunaName${o}"></output> || <output id="faunaRarity${o}"></output> / <output id="faunaEcosystem${o}"></output> / <output id="faunaActivity${o}"> </output> <output id="faunaHemisphere${o}"></output> || <output id="faunaGenus${o}"></output> || <output id="faunaHeight${o}"></output>m || <output id="faunaWeight${o}"></output>kg || <output id="faunaDiscoverer${o}"></output></div>`;t.insertAdjacentHTML("beforebegin",`<div class="tableHeader text sectionToggle" data-fauna="section${o}" data-section="fauna">
		<p style="margin-right:auto">Creature: <output class="has-text-weight-bold" name="faunaName${o}"></output></p>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${o}', 'fauna'); changeTableEntry(this)">Remove</button>
		<button class="button" onclick="toggleSection('fauna${o}', this)">Hide</button>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label for="faunaNameInput${o}">Creature name:</label>
		<span class="tooltip">
			<data>Enter exactly as seen in game. Watch out for 0 (zero) and O (o).</data>
			<data>Creature Name</data>
			<data>Enter exactly as seen in game. Watch out for 0 (zero) and O (o).</data>
			<data>./assets/bitmap/creature/creatureName.jpg</data>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<input type="text" data-dest="faunaName${o}" id="faunaNameInput${o}">
	</div>
		<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label for="faunaFile_input${o}">Creature file name:</label>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<input type="text" id="faunaFile_input${o}" data-dest="faunaFile${o}" data-default="NmsMisc_NotAvailable.png">
		<input type="file" id="faunaFileUpl${o}" accept="image/*" oninput="image(this)">
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label>Hemisphere:</label>
		<span class="tooltip">
			<data>Found in the creature discovery menu.</data>
			<data>Hemisphere</data>
			<data>
				Found in the creature discovery menu.<br>
				If no hemisphere is given, leave the input empty.
			</data>
			<data>./assets/bitmap/creature/creatureHemisphere.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<select data-dest="faunaHemisphere${o}" id="faunaHemisphereInput${o}">
			<option value=""></option>
			<option value="/ Found in the North">North</option>
			<option value="/ Found in the South">South</option>
		</select>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label>Rarity:</label>
			<span class="tooltip">
			<data>Found in the creature discovery menu.</data>
			<data>Rarity</data>
			<data>Found in the creature discovery menu.</data>
			<data>./assets/bitmap/creature/creatureRarity.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<select data-dest="faunaRarity${o}" id="faunaRarityInput${o}">
			<option value="Common">Common</option>
			<option value="Uncommon">Uncommon</option>
			<option value="Rare">Rare</option>
		</select>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label>Ecosystem:</label>
		<span class="tooltip">
			<data>Found in the creature discovery menu.</data>
			<data>Ecosystem</data>
			<data>Found in the creature discovery menu.</data>
			<data>./assets/bitmap/creature/creatureEcosystem.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<select data-dest="faunaEcosystem${o}" id="faunaEcosystemInput${o}" onchange="genusDropdown(this)">
			<option value="Ground">Ground</option>
			<option value="Flying">Flying</option>
			<option value="Underwater">Underwater</option>
			<option value="Underground">Underground</option>
		</select>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label>Activity:</label>
		<span class="tooltip">
			<data>Found in the creature discovery menu.</data>
			<data>Activity</data>
			<data>Found in the creature discovery menu.</data>
			<data>./assets/bitmap/creature/creatureActivity.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<select data-dest="faunaActivity${o}" id="faunaActivityInput${o}">
			<option value="Always Active">Always Active</option>
			<option value="Diurnal">Diurnal</option>
			<option value="Nocturnal">Nocturnal</option>
			<option value="Mostly Diurnal">Mostly Diurnal</option>
			<option value="Mostly Nocturnal">Mostly Nocturnal</option>
		</select>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label>Genus:</label>
		<span class="tooltip">
			<data>See the wiki for a list of genera.</data>
			<data>Genus</data>
			<data>The genus is defined by the general appearance of a creature.<br>
				See the wiki for a <a href='https://nomanssky.fandom.com/wiki/Genus#Genus_List'
					target='_blank' rel='noopener noreferrer'>list of genera</a>.</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<select data-dest-noauto="faunaGenus${o}" id="faunaGenusInput${o}" onchange="addGenus(this)"></select>
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label for="faunaWeightInput${o}">Weight in kg:</label>
			<span class="tooltip">
			<data>Found on the creature scan. No "kg" necessary.</data>
			<data>Weight</data>
			<data>Found on the creature scan.<br>No "kg" necessary.</data>
			<data>./assets/bitmap/creature/creatureWeight.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<input data-dest-noauto="faunaWeight${o}" type="text" id="faunaWeightInput${o}" maxlength="5" placeholder="0.0" oninput="numberStats(this, 1)">
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label for="faunaHeightInput${o}">Height in m:</label>
			<span class="tooltip">
			<data>Found on the creature scan. No "m" necessary.</data>
			<data>Height</data>
			<data>Found on the creature scan.<br>No "m" necessary.</data>
			<data>./assets/bitmap/creature/creatureHeight.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<input data-dest-noauto="faunaHeight${o}" type="text" id="faunaHeightInput${o}" maxlength="3" placeholder="0.0" oninput="numberStats(this, 1)">
	</div>
	<div class="tableCell text" data-fauna="section${o}" data-section="fauna fauna${o}">
		<label for="faunaDiscovererInput${o}">Discoverer:</label>
	</div>
	<div class="tableCell data" data-fauna="section${o}" data-section="fauna fauna${o}">
		<input data-dest="faunaDiscoverer${o}" type="text" id="faunaDiscovererInput${o}">
	</div>`),e.insertAdjacentHTML("beforeend",i),postProcessSection(a,n,o),genusDropdown(globalElements.input["faunaEcosystemInput"+o])}function addFlora(a){var t=a.parentElement,e=globalElements.output[a.dataset.destNoauto],n="flora",o=document.querySelectorAll(`[data-${n}]`),o=getChildIndex(o,"dataset."+n),i=`<div data-flora="section${o}">|-</div>
	<div data-flora="section${o}">|[[File:<output id="floraFile${o}"></output>|150px]] || <output id="floraName${o}" name="floraName${o}"></output> || <output id="floraAge${o}"></output> || <output id="floraRoot${o}"></output> || <output id="floraNut${o}"></output> || <output id="floraNote${o}"></output> || <output id="floraElements${o}"></output> || <output id="floraDiscoverer${o}"></output></div>`;t.insertAdjacentHTML("beforebegin",`<div class="tableHeader text sectionToggle" data-flora="section${o}" data-section="flora">
		<p style="margin-right:auto">Plant: <output class="has-text-weight-bold" name="floraName${o}"></output></p>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${o}', 'flora'); changeTableEntry(this)">Remove</button>
		<button class="button" onclick="toggleSection('flora${o}', this)">Hide</button>
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraNameInput${o}">Plant name:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Name</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/floraName.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" data-dest="floraName${o}" id="floraNameInput${o}">
	</div>
		<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraFile_input${o}">Plant file name:</label>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" id="floraFile_input${o}" data-dest="floraFile${o}" data-default="NmsMisc_NotAvailable.png">
		<input type="file" id="floraFileUpl${o}" accept="image/*" oninput="image(this)">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraAgeInput${o}">Age:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Age</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/age.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" data-dest="floraAge${o}" list="ageData" id="floraAgeInput${o}">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraRootInput${o}">Root structure:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Root Structure</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/roots.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" data-dest="floraRoot${o}" list="rootData" id="floraRootInput${o}">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraNutInput${o}">Nutrient source:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Nutrient Source</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/nutSource.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" data-dest="floraNut${o}" list="nutSourceData" id="floraNutInput${o}">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraNoteInput${o}">Notes:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Notes</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/notes.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input type="text" data-dest="floraNote${o}" list="floraNotesData" id="floraNoteInput${o}">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraResourcePrimInput${o}">Primary element:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Primary Element</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/flora/primEl.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
	<input data-dest-noauto="floraElements${o}" type="text" list="floraResources" id="floraResourcePrimInput${o}" oninput="floraMineralResourceLinks(this)">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraResourceSecInput${o}">Secondary element:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Flora Secondary Element</data>
			<data>Found in the analysis visor. Leave empty if there is no secondary element.</data>
			<data>./assets/bitmap/flora/secEl.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input data-dest-noauto="floraElements${o}" type="text" list="floraResources" id="floraResourceSecInput${o}" oninput="floraMineralResourceLinks(this)">
	</div>
	<div class="tableCell text" data-flora="section${o}" data-section="flora flora${o}">
		<label for="floraDiscovererInput${o}">Discoverer:</label>
	</div>
	<div class="tableCell data" data-flora="section${o}" data-section="flora flora${o}">
		<input data-dest="floraDiscoverer${o}" type="text" id="floraDiscovererInput${o}">
	</div>`),e.insertAdjacentHTML("beforeend",i),postProcessSection(a,n,o)}function addMineral(a){var t=a.parentElement,e=globalElements.output[a.dataset.destNoauto],n="mineral",o=document.querySelectorAll(`[data-${n}]`),o=getChildIndex(o,"dataset."+n),i=`<div data-mineral="section${o}">|-</div>
	<div data-mineral="section${o}">|[[File:<output id="mineralFile${o}"></output>|150px]] || <output id="mineralName${o}" name="mineralName${o}"></output> || <output id="mineralMetal${o}"></output> || <output id="mineralFormation${o}"></output> || <output id="mineralNote${o}"></output> || <output id="mineralElements${o}"></output> || <output id="mineralDiscoverer${o}"></output></div>`;t.insertAdjacentHTML("beforebegin",`<div class="tableHeader text sectionToggle" data-mineral="section${o}" data-section="mineral">
		<p style="margin-right:auto">Mineral: <output class="has-text-weight-bold" name="mineralName${o}"></output></p>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${o}', 'mineral'); changeTableEntry(this)">Remove</button>
		<button class="button" onclick="toggleSection('mineral${o}', this)">Hide</button>
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralNameInput${o}">Mineral name:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Name</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/mineral/mineralName.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input type="text" data-dest="mineralName${o}" id="mineralNameInput${o}">
	</div>
		<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralFile_input${o}">Mineral file name:</label>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input type="text" id="mineralFile_input${o}" data-dest="mineralFile${o}" data-default="NmsMisc_NotAvailable.png">
		<input type="file" id="mineralFileUpl${o}" accept="image/*" oninput="image(this)">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralMetalInput${o}">Metal Content:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Metal Content</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/mineral/content.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input type="text" data-dest-noauto="mineralMetal${o}" id="mineralMetalInput${o}" maxlength="2" oninput="wikiCodePercentage(this)">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralFormationInput${o}">Formation Process:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Formation Process</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/mineral/formation.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input type="text" data-dest="mineralFormation${o}" list="formationData" id="mineralFormationInput${o}">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralNoteInput${o}">Notes:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Notes</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/mineral/notes.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input type="text" data-dest="mineralNote${o}" list="mineralNotesData" id="mineralNoteInput${o}">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralResourcePrimInput${o}">Primary element:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Primary Element</data>
			<data>Found in the analysis visor.</data>
			<data>./assets/bitmap/mineral/primEl.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
	<input data-dest-noauto="mineralElements${o}" type="text" list="mineralResources" id="mineralResourcePrimInput${o}" oninput="floraMineralResourceLinks(this)">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralResourceSecInput${o}">Secondary element:</label>
		<span class="tooltip">
			<data>Found in the analysis visor.</data>
			<data>Mineral Secondary Element</data>
			<data>Found in the analysis visor. Leave empty if there is no secondary element.</data>
			<data>./assets/bitmap/mineral/secEl.jpg</data>
		</span>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input data-dest-noauto="mineralElements${o}" type="text" list="mineralResources" id="mineralResourceSecInput${o}" oninput="floraMineralResourceLinks(this)">
	</div>
	<div class="tableCell text" data-mineral="section${o}" data-section="mineral mineral${o}">
		<label for="mineralDiscovererInput${o}">Discoverer:</label>
	</div>
	<div class="tableCell data" data-mineral="section${o}" data-section="mineral mineral${o}">
		<input data-dest="mineralDiscoverer${o}" type="text" id="mineralDiscovererInput${o}">
	</div>`),e.insertAdjacentHTML("beforeend",i),postProcessSection(a,n,o)}function postProcessSection(a,t,e){addAllTooltips(),changeTableEntry(a);var n={input:{},output:{}};for(const o of document.querySelectorAll(`[data-${t}="section${e}"] :is(input, select)`))n.input[o.id]=o.id,o.dataset.dest&&(assignFunction(o,"wikiCode(this)"),wikiCode(o)),o.dataset.destNoauto&&(assignFunction(o,"storeData(this)"),storeData(o)),o.dataset.default&&(assignFunction(o,"assignDefaultValue(this)",null,!0),assignDefaultValue(o)),o.list&&assignFunction(o,"forceDatalist(this)","onchange");for(const i of document.querySelectorAll(`[data-${t}="section${e}"] output`))i.id&&(n.output[i.id]=i.id);updateGlobalElements(n)}function changeTableEntry(a){const n=a.parentElement,o=n.dataset.section;var t=document.querySelectorAll(`.tableHeader[data-${o}]`);for(let a=0;a<t.length;a++){var e="is-"+oddEven(a+1),i=t[a].dataset[o];for(const s of document.querySelectorAll(`[data-${o}="${i}"]`))s.classList.remove("is-odd","is-even"),s.classList.add(e)}function l(a){if(a){var t=n.dataset[o];const e=extractNumber(t);delete a[Object.keys(a).find(a=>extractNumber(a)==e)]}}n.dataset[o]&&("fauna"==o?(l(links.genera),addGenus):(l(links.resources?.[o]),floraMineralResourceLinks))()}function addGenus(a=null){var t,e=links.genera??=new Object,n=(a&&(t=a.value,e[a.dataset.destNoauto]=sanitiseString(t)),new Set),o=sortObj(structuredClone(e),!0);for(const s in o){var i=o[s];i&&!n.has(i)&&(o[s]=`[[${i}]]`,n.add(i))}for(const d in o){var l=o[d];globalElements.output[d].innerText=l}}function floraMineralResourceLinks(a=null){const t=links.resources??=new Object;a&&(e=a.value,n=a.dataset.destNoauto,o=a.id,a=(a=a.parentElement.dataset.section.split(" ")[0]).replace(extractNumber(a),""),t[a]??=new Object,t[a][n]??=new Object,t[a][n][o]=sanitiseString(e));var e,n,o,i=new Set,l=sortObj(structuredClone(t));for(const u in sortObj(l)){var s=l[u];for(const c in sortObj(s)){const t=s[c];for(const p in t){var d=t[p];d&&!i.has(d)&&(t[p]=`[[${d}]]`,i.add(d))}}}for(const m in l)for(const f in l[m]){var r=Object.values(l[m][f]).filter(a=>a).join(", ");globalElements.output[f].innerText=r}}function genusDropdown(a){var t=getCreatureData(),e=a.value,n=Object.keys(t.ecosystems[e]),a="faunaGenusInput"+extractNumber(a.id),o=new Array;for(const i of n)o.push(`${i} (${t.ecosystems[e][i].commonName})`);setDropdownOptions(globalElements.input[a],n,o),addGenus(globalElements.input[a])}function autoWorm(a){a&&(globalElements.input.sandwormInput.checked=!0),addSandwormTemplate()}function addSandwormTemplate(){var a=globalElements.input.sandwormInput,t=a.dataset.destNoauto,e=Array.from(document.querySelectorAll(`[data-section="${t}"]`)),t=globalElements.output[t];e.push(t);for(const n of e)a.checked?n.style.display="":n.style.display="none"}function wormAutoSpawn(){var a=(()=>{for(const a of globalElements.input.autoSpawn)if(a.checked)return a.value})();globalElements.output.wormAutoSpawn.innerText=a}function wormAlbumName(){const a=pageData.civShort;var t=(()=>{switch(a){case"GHub":return"GHEC Sandworm Album";case"CalHub":return"CalHub Rare Fauna Album#Sandworm|CalHub Rare Fauna Album";case"EisHub":return"EisHub Shaihuluda Album"}})();globalElements.output.wormAlbumName.innerText=t}function resetExternal(){var a=document.querySelectorAll("[data-moon], [data-resource], [data-fauna], [data-flora], [data-mineral]");removeSection(a),enableResourceAdd(),"function"==typeof enableMoonAdd&&enableMoonAdd()}assignElementFunctions(planetMoonElementFunctions);