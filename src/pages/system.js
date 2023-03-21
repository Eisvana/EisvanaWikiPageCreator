function startupFunctions(){celestialStartupFunctions(),combineEconConf(),merchantUpgrades(),regionLong(),spaceStationSection(),planetInputs(),expectedHubTagSentence(),civCatalog(),addTemplate(),wikiCodePercentage(),autoPirate(globalElements.input.wealthInput)}const systemElements={input:{planetInput:"planetNumInput",moonInput:"moonNumInput",terminalInputs:"terminalInputs",systemExtras:"systemExtras"},output:{tradeTerminal:"tradeTerminal",planets:"planets",Freighters:"Freighters",Derelict:"Derelict",Organic:"Organic",Starships:"Starships",MTs:"MTs"}},systemElementFunctions=(updateGlobalElements(systemElements),{civ:["regionLong(); expectedHubTagSentence(); civCatalog()",null,!0],portalglyphsInput:["regionLong(); expectedHubTagSentence(); autoBH()",null,!0],planetInput:["numberStats(this); planetInputs()"],moonInput:["numberStats(this); planetInputs()"],nameInput:["expectedHubTagSentence()"],factionInput:["spaceStationSection(); combineEconConf()"],economybuyInput:["wikiCodePercentage(this)"],economysellInput:["wikiCodePercentage(this)"],wealthInput:["autoPirate(this)"],conflictInput:["autoPirate(this)"],platformInput:["docByExternal()"],distanceInput:["numberStats(this)"],systemExtras:["addTemplate(this)"]});function locationSentence(){var t=pageData.region,e=pageData.civShort,a=regNr(t),e=HubGal(e);wikiCode(`Located in the [[${t}]] [[region]]${a} of the ${e}.`,"loc")}function planetInputs(){const e=globalElements.input.waterInput.parentElement.previousElementSibling,a=globalElements.output.planets;var t,n=pageData.planet,l=pageData.moon;n=parseInt(n)+parseInt(l),l=2,t=6;const o=Math.max(l,Math.min(t,n));if(!isNaN(o)){l=document.querySelectorAll("[data-planet]");let t=getChildIndex(l,"dataset.planet");for(;0!=b();)if(0<b()){p=u=r=s=d=i=void 0;var i=t,s=`<div class="tableHeader text ${d="is-"+oddEven(i)} sectionToggle" data-planet="planet${i}">
			<p><output id=planetClass${i}>Planet</output> ${i}: <output class="has-text-weight-bold" name="planetName${i}"></output></p>
			<button class="button" onclick="toggleSection('planet${i}', this)">Hide</button>
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="planetName_input${i}">Planet name</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Name</data>
				<data>Can be found in the planet discovery menu.<br>Enter exactly as seen in game. Watch out for 0 (zero) and O (o).</data>
				<data>./assets/bitmap/planet/planetName.jpg</data>
			</span>			
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="planetName_input${i}" data-dest="planetName${i}">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="planetFile_input${i}">Planet file name</label>
			<span class="tooltip">
				<data>Should show the entire planet from space. Click for an example picture.</data>
				<data>Planet Name</data>
				<data>
					Should show the entire planet from space.<br>
					Make sure no asteroids/pulse lines/freighters are obstructing the picture.
					<br>Point the sun directly at the planet, no weird angles.
					<br>Also try to only get the planet into the shot, no other planets.
					Only exception to this are moons or rings, which should be included if they exist.
					<br>Disable the vignette.
				</data>
				<data>./assets/bitmap/planet/planetPic.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
				<input type="text" id="planetFile_input${i}" data-dest="planetFile${i}" data-default="NmsMisc_NotAvailable.png">
				<input type="file" id="mainFileUpl${i}" accept="image/*" oninput="image(this)">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="landscapeFile_input${i}">Landscape file name</label>
			<span class="tooltip">
				<data>Showcase the planet's landscape.</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
				<input type="text" id="landscapeFile_input${i}" data-dest="landscapeFile${i}" data-default="NmsMisc_NotAvailable.png">
				<input type="file" id="secFileUpl${i}" accept="image/*" onchange="image(this)">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label>Biome</label>
			<span class="tooltip">
				<data>Can be determined from the planetary features.</data>
				<data>Planet Biome</data>
				<data>
					Can be determined from the planetary features such as the weather, harvestable plants or available resources.<br>
					See the <a href=https://nomanssky.fandom.com/wiki/Biome rel=noreferrer target=_blank>Biome wiki page</a> for more information.
				</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
				<select id="biome_input${i}" data-dest-noauto="biome${i}" onchange="biomeLinks(this)">
					<option value="Lush">Lush</option>
					<option value="Barren">Barren</option>
					<option value="Dead">Dead</option>
					<option value="Exotic">Exotic</option>
					<option value="Mega Exotic">Mega Exotic</option>
					<option value="Scorched">Scorched</option>
					<option value="Frozen">Frozen</option>
					<option value="Toxic">Toxic</option>
					<option value="Irradiated">Irradiated</option>
					<option value="Marsh">Marsh</option>
					<option value="Volcanic">Volcanic</option>
				</select>
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="descriptor_input${i}">Planet description</label>
			<span class="tooltip">
				<data>Can be found in the exploration guide.</data>
				<data>Planet Description</data>
				<data>Can be found in the exploration guide.</data>
				<data>./assets/bitmap/planet/planetDesc.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="descriptor_input${i}" list="planetDescriptors" data-dest-noauto="descriptor${i}" oninput="expandDescriptor(this)">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="moon_input${i}">Is moon</label>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="checkbox" id="moon_input${i}" data-dest-noauto="descriptor_input${i}" oninput="moonSwitch(this)">
		</div>
		<div class="tableHeader text ${d} sectionToggle" data-planet="planet${i}" data-section="planet${i}">
			<div style="display:flex">
				<p style="margin-right:1.5rem">Resources</p>
				<span class="tooltip">
					<data>Found in the Discovery Menu or on the analysis visor.</data>
					<data>Planet Resources</data>
					<data>Found in the Discovery Menu or on the analysis visor.</data>
					<data>./assets/bitmap/planet/resources.jpg</data>
				</span>
			</div>
			<button class="button" onclick="toggleSection('resource${i}', this)">Hide</button>
		</div>
		<div class="tableHeader text ${d}" data-section="resource${i} planet${i}" data-planet="planet${i}">
			<button class="button is-primary" id="addResourceButton${i}" type="button" onclick="addResourceInput(this, ${i})">+ Add Resource</button>
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="weather_input${i}">Weather</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Weather</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/weather.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="weather_input${i}" list="weatherData" data-dest-simple="weather${i}" oninput="wikiCodeSimple(this)">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="sentinel_input${i}">Sentinels</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Sentinel Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/sentinels.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="sentinel_input${i}" list="sentinels" data-dest="sentinel${i}">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="flora_input${i}">Flora</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Flora Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/flora.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="flora_input${i}" list="rarity" data-dest="flora${i}">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="fauna_input${i}">Fauna</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Fauna Level</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/fauna.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="fauna_input${i}" list="rarity" data-dest="fauna${i}">
		</div>
		<div class="tableCell text ${d}" data-planet="planet${i}" data-section="planet${i}">
			<label for="faunatotal_input${i}">Number of Fauna</label>
			<span class="tooltip">
				<data>Can be found in the discovery menu.</data>
				<data>Planet Fauna Number</data>
				<data>Can be found in the discovery menu.</data>
				<data>./assets/bitmap/planet/faunaNum.jpg</data>
			</span>
		</div>
		<div class="tableCell data ${d}" data-planet="planet${i}" data-section="planet${i}">
			<input type="text" id="faunatotal_input${i}" maxlength="2" data-dest-noauto="FaunaTotal${i}" oninput="numberStats(this)">
		</div>`,d=`<div class="${d}" data-planet="planet${i}" id="body${i}"><div>|-</div>
        <div>|[[File:<output id="planetFile${i}"></output>|150px]]</div>
        <div>|[[File:<output id="landscapeFile${i}"></output>|150px]]</div>
        <div>|[[<output id="planetName${i}" name="planetName${i}"></output>]]</div>
        <div>|<output id="biome${i}"></output><output id="infested${i}"></output>&lt;hr&gt;<output id="descriptor${i}"></output></div>
        <div>|<output id="resource${i}"></output></div>
        <div>|<output id="weather${i}"></output></div>
        <div>|<output id="sentinel${i}"></output></div>
        <div>|<output id="flora${i}"></output></div>
        <div>|<output id="fauna${i}"></output> (<output id="faunaTotal${i}" name="FaunaTotal${i}"></output>)</div>
        <div>|-</div>
        <div>!style="background-color:#2f4f4f"|Notes:</div>
        <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus''': {{FaunaTotal|<output id="faunaTotalNotes${i}" name="FaunaTotal${i}"></output>}} {{nanites}}</div></div>`;e.insertAdjacentHTML("beforebegin",s),a.insertAdjacentHTML("beforeend",d),addAllTooltips();for(const m of s=document.querySelectorAll(`[data-planet="planet${i}"] [data-default]`))assignFunction(m,"assignDefaultValue(this)"),assignDefaultValue(m);for(const v of d=document.querySelectorAll(`[data-planet="planet${i}"] [data-dest]`))assignFunction(v,"wikiCode(this)");for(const f of s=document.querySelectorAll(`[data-planet="planet${i}"] [data-dest-noauto]`))assignFunction(f,"storeData(this)");for(const g of d=document.querySelectorAll(`[data-planet="planet${i}"] [list]`))assignFunction(g,"forceDatalist(this)","onchange");var r=document.getElementById("addResourceButton"+i);for(let t=0;t<3;t++)addResourceInput(r,i);var u={output:{}};for(const $ of s=document.querySelectorAll(`#body${i} output`)){var p=$.id;u.output[p]=p}updateGlobalElements(u),biomeLinks(document.getElementById("biome_input"+i)),t++}else{c=d=void 0;var d=document.querySelectorAll("[data-planet]"),c=new Set;for(const h of d)c.add(h.dataset.planet);d=Array.from(c).pop(),d=document.querySelectorAll(`[data-planet="${d}"]`),removeSection(d)}function b(){const e=new Set;var t=(()=>{for(const t of document.querySelectorAll("[data-planet]"))e.add(t.dataset.planet);return e.size})();return o-t}}}function addResourceInput(t,e){var a=t.parentElement,n=document.querySelectorAll("[data-resource]"),n=getChildIndex(n,"dataset.resource"),l="resource"+e,o="resource_input"+n,s="is-"+oddEven(i),a=(a.insertAdjacentHTML("beforebegin",`<div class="tableCell text removable ${s}" data-section="resource${e} planet${e}" data-resource="section${n}" data-planet="planet${e}">
		<button class="button is-danger is-outlined icon is-small" title="Remove resource" type="button" disabled onclick="removeSpecificSection('section${n}', 'resource'); removeResource('${o}')">&#10006</button>
		<label for="${o}">Resource name:</label>
	</div>
	<div class="tableCell data ${s}" data-section="resource${e} planet${e}" data-resource="section${n}" data-planet="planet${e}">
		<input type="text" list="resources" id="${o}" data-dest-noauto="${l}" oninput="addResource(this)">
	</div>`),{input:{}}),s=(a.input[o]=o,updateGlobalElements(a),getResourceInputSections(e)),n=getResourceInputSectionCount(s);if(6<n+1&&(t.disabled=!0),3<n)for(const t of s){var d=t.querySelector("button");d&&(d.disabled=!1)}}function getResourceInputSections(t){return document.querySelectorAll(`[data-resource][data-planet="planet${t}"]`)}function getResourceInputSectionCount(t){var e=new Set;for(const a of t)e.add(a.dataset.resource);return e.size}function removeResource(t){var t=globalElements.input[t],e=t.dataset.destNoauto,a=t.id,n=extractNumber(e),t=(t.value&&(delete links.resources[e][a],addResource()),document.getElementById("addResourceButton"+n).disabled=!1,getResourceInputSections(n));if(getResourceInputSectionCount(t)<4)for(const o of t){var l=o.querySelector("button");l&&(l.disabled=!0)}}function moonSwitch(t){var e=document.getElementById(t.dataset.destNoauto),a=extractNumber(t.id),t=t.checked?"Moon":"Planet";expandDescriptor(e,document.getElementById("planetClass"+a).innerText=t)}function expandDescriptor(t,e=null){var a=extractNumber(t.id),n=(e=e||(document.getElementById("moon_input"+a).checked?"Moon":"Planet"),t.value),l=t.dataset.destNoauto,n=buildDescriptor(n,e,"<br>"),e=(globalElements.output[l].innerText=n,autoInfested(t));infestedBiomeLinks("infested"+a,e)}function merchantUpgrades(t=null){var e=document.querySelectorAll("[data-dest-checkbox-group]");if(t)n(t);else{var a=new Set;for(const l of e)l.onchange||assignFunction(l,"merchantUpgrades(this.dataset.destCheckboxGroup)"),a.add(l.dataset.destCheckboxGroup);for(const o of a)n(o)}function n(t){var e=document.querySelectorAll(`[data-dest-checkbox-group="${t}"]`),a=t.startsWith("SD")?"":t.substring(0,2),n=new Array;for(const i of e)i.checked&&n.push(i.value);var l=new Array;for(let t=1;t<=n.length;t++){var o=`| ${a}${t}=`+n[t-1];l.push(o)}wikiCode(l.join("\n"),t);e=globalElements.output[t].closest("#scrapDealer");e&&(0==l.length?e.style.display="none":e.style.display="")}}function tradeables(){var t=globalElements.input.terminalInputs,e=globalElements.output.tradeTerminal,a=document.querySelectorAll("[data-tradeable]"),a=getChildIndex(a,"dataset.tradeable"),n="price"+a,l="text"+a,o="text_input"+a,i="price_input"+a,s=`<div data-tradeable="section${a}">|-</div>
	<div data-tradeable="section${a}">| {{ilink|<output id="${l}"></output>}} || {{Units}} <output id="${n}"></output></div>`,o=(t.insertAdjacentHTML("beforebegin",`<div class="tableHeader text sectionToggle" data-tradeable="section${a}" data-station="terminal">
		<span class="has-text-weight-bold">Tradeable</span>
		<button class="button is-danger is-outlined" type="button" onclick="removeSpecificSection('section${a}', 'tradeable'); enableTradeableAdd()">Remove</button>
	</div>
	<div class="tableCell text" data-tradeable="section${a}" data-station="terminal">
		<label for="${o}">Tradeable name:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${a}" data-station="terminal">
		<input type="text" list="terminal" id="${o}" data-dest="${l}">
	</div>
	<div class="tableCell text" data-tradeable="section${a}" data-station="terminal">
		<label for="${i}">Tradeable price:</label>
	</div>
	<div class="tableCell data" data-tradeable="section${a}" data-station="terminal">
		<input type="text" id="${i}" data-dest-noauto="${n}">
	</div>`),e.insertAdjacentHTML("beforeend",s),document.querySelectorAll(`[data-tradeable="section${a}"] input[data-dest]`));for(const r of o)assignFunction(r,"wikiCode(this)");for(const u of document.querySelectorAll(`[data-tradeable="section${a}"] input[data-dest-noauto]`))assignFunction(u,"storeData(this); numberStats(this)");const d=document.querySelectorAll("[data-tradeable]");l=(()=>{var t=new Set;for(const a of d){var e=a.dataset.tradeable;t.add(e)}return t.size})(),i=t.querySelector("button");5<l+1&&(i.disabled=!0)}function enableTradeableAdd(){globalElements.input.terminalInputs.querySelector("button").disabled=!1}function resetExternal(){var t=document.querySelectorAll("[data-tradeable], [data-planet]");removeSection(t)}function regionLong(){const t=pageData.region;var e=1==t.split(" ").length?t+" region":t;globalElements.output.regionLong.innerText=e}function addResource(t=null){var e,a,n=links.resources??=new Object,l=(t&&(e=t.value,a=t.dataset.destNoauto,t=t.id,n[a]??=new Object,n[a][t]=sanitiseString(e)),new Set),o=sortObj(structuredClone(n),!0);for(const r in o){var i=o[r];for(const u in i){var s=i[u];s&&!l.has(s)&&(o[r][u]=`[[${s}]]`,l.add(s))}}for(const p in o){var d=Object.values(o[p]).filter(t=>t).join("<br>");globalElements.output[p].innerText=d}}function biomeLinks(t){var e=t.value,t=t.dataset.destNoauto,a=links.biomes??=new Object,n=(a[t]=sanitiseString(e),new Set),l=sortObj(structuredClone(a),!0);for(const i in l){var o=l[i];o&&!n.has(o)&&(l[i]=`{{Biome|${o}}}`,n.add(o))}setBiomeText(l)}function infestedBiomeLinks(t,e){var a=links.infestedBiomes??=new Object;a[t]=e;let n=!1;var l=sortObj(structuredClone(a),!0);for(const i in l){var o=l[i];o&&!n?(l[i]="<br>([[Biome Subtype - Infested|Infested]])",n=!0):o?l[i]=" (Infested) ":(l[i]="",delete a[i])}setBiomeText(l)}function setBiomeText(t){for(const a in t){var e=t[a];globalElements.output[a].innerText=e}}function expectedHubTagSentence(){var t=globalElements.output.expectedHubTag,e=pageData.name;if(e){var a=pageData.region;const n=pageData.portalglyphs;a=`HUB${getHubNumber(a)}-`+(()=>{let t=n.substring(1,4);for(;t.startsWith("0")&&1<t.length;)t=t.substring(1);return t})();t.innerHTML="",e.includes(a)||(t.innerText=`The expected HUB Tag for this system is ${a}.`+"\n\n")}else t.innerHTML=""}function spaceStationSection(){var t,e={uncharted:"This system is uncharted and has no [[Space Station]].",abandoned:"This space station is abandoned.\n\n"},a={normal:["img","terminal","merchant","scrapDealer"],pirate:["img","scrapDealer"],abandoned:["img","note","terminal"],uncharted:["note"]},n="Uncharted"==(t=pageData.faction)?"uncharted":t.includes("Abandoned")?"abandoned":pageData.wealth.includes("Black Market")?"pirate":"normal",l=document.querySelectorAll("[data-station]");for(let t=0;t<l.length;t++){var o=l[t],i=o.dataset.station;a[n].includes(i)&&("merchant"!=i&&"scrapDealer"!=i||!function(t){t=t.querySelector("button");if(t){var e=t.dataset.buttonId;if(e)return e="display"+e,t.dataset[e]}}(o)||t++,"scrapDealer"!=o.id||pageData.SDMerchant)?o.style.display="":o.style.display="none"}e[n]&&(document.querySelector('[data-station="note"]').innerText=e[n])}function autoBH(){var t=pageData.portalglyphs,e=globalElements.input.colorInput;"79"==t.substring(2,4)?(hideInput(e,"none"),e.value="Black Hole"):hideInput(e,""),wikiCode(e)}function autoPirate(t){t=t.value;if(t.includes("Black Market")||t.includes("Pirate Controlled")){t=globalElements.input.conflictInput;for(const a of[globalElements.input.wealthInput,t]){var e=a.querySelector('optgroup[label="Pirate"] option').value;a.value=e,wikiCode(a)}spaceStationSection()}}function combineEconConf(){var t=pageData.faction,e=[globalElements.input.wealthInput,globalElements.input.economyInput,globalElements.input.conflictInput];if(t.includes("Abandoned")||"Uncharted"==t)for(const n of e){var a=n.querySelector('optgroup[label="Abandoned/Uncharted"] option').value;n.value=a,wikiCode(n),hideInput(n,"none")}else for(const l of e)hideInput(l,"")}function addTemplate(t=null){if(t){var e=globalElements.output[t.value];t.checked?e.style.display="":e.style.display="none"}else for(const a of document.getElementsByName("systemExtras"))addTemplate(a)}function civCatalog(){var t=shortenGHub(pageData.civShort);wikiCode(t,"civShorter")}function generateGalleryArray(){var t=["","System Exploration Guide","System Page","Default SS Multi-Tool"];"Uncharted"!=pageData.faction&&!pageData.faction.includes("Abandoned")||t.pop(),pageData.galleryArray=t}function galleryExplanationExternal(){return`There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>System Exploration Guide</li>
			<li>System Page</li>
			<li>Default SS Multi-Tool</li>
		</ol>
	</div>`}assignElementFunctions(systemElementFunctions);