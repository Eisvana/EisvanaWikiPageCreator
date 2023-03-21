function planetStartupFunctions(){moonList()}const planetElements={input:{moonInputs:"moonInputs"},output:{}};function addMoon(e){var n=e.parentElement,o=document.querySelectorAll("[data-moon]"),o=getChildIndex(o,"dataset.moon"),t="moon_input"+o,n=(n.insertAdjacentHTML("beforebegin",`<div class="tableCell text removable" data-moon="section${o}">
		<button class="button is-outlined is-danger icon is-small" title="Remove moon" type="button" onclick="removeSpecificSection('section${o}', 'moon'); enableMoonAdd()">&#10006</button>
		<label for="${t}">Moon name:</label>
	</div>
	<div class="tableCell data" data-moon="section${o}">
		<input type="text" id="${t}" oninput="moonList()">
	</div>`),document.querySelectorAll("[data-moon]").length/2);2<1+n&&(e.disabled=!0)}function enableMoonAdd(){globalElements.input.moonInputs.querySelector("button").disabled=!1,moonList()}function moonList(){var e=document.querySelectorAll("[data-moon] input"),n=new Array;for(const o of e)o.value&&n.push(`[[${sanitiseString(o.value)}]]`);globalElements.output.moonList.innerText=n.join(", "),pageData.moons=n,moonSentence()}function moonSentence(){var e,n=(e=pageData.moons)&&0!=e.length?`This planet's [[moon]]${2==(n=e.length)?"s":""} ${plural(n)} ${e.join(" and ")}.`:"This planet has no moons.";wikiCode(n,"moonSentence")}function galleryExplanationExternal(){return`There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Landscape</li>
			<li>Night View</li>
			<li>Cave System</li>
			<li>Coast Area</li>
			<li>Underwater</li>
			<li>Analysis Visor</li>
			<li>Planet Exploration Guide</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`}updateGlobalElements(planetElements);