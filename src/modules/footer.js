function switchTheme(){document.documentElement.dataset.transition="true","light"==localStorage.getItem("theme")?(localStorage.setItem("theme","dark"),document.documentElement.dataset.theme="dark"):(localStorage.setItem("theme","light"),document.documentElement.dataset.theme="light"),setTimeout(()=>{delete document.documentElement.dataset.transition},400)}(()=>{var e=`<button class="button" id="switchTheme" onclick="switchTheme()">Switch light/dark mode</button>
	<div class="footerLinks">
		<button type="button" onclick="showSettings()">Settings</button>
		<a href='./about.html' id="about">About</a>
		<a href='https://docs.google.com/forms/d/e/1FAIpQLSdXFIaHbeCWVsiaeIvcJL0A3aWiB5tQQFf2ofg0dr7lOkDChQ/viewform' rel='noreferrer noopener' target='_blank'>Feedback Form</a>
	</div>
	<dialog id="settings" class="modal-content content">
		<h2 class="title is-4">Global Preload Values</h2>
		<div class="table">
			<div class="tableCell text">
				<label>Civ:</label>
			</div>
			<div class="tableCell data">
				<select id="civDefault" data-store="civInput">
					<option value="GHub">GHub</option>
					<option value="CalHub">CalHub</option>
					<option value="EisHub">EisHub</option>
				</select>
			</div>
			<div class="tableCell text">
				<label for="discoveredlinkDefault">Discoverer wiki account:</label>
			</div>
			<div class="tableCell data">
				<input id="discoveredlinkDefault" type="text" data-store="discoveredlinkInput builderlinkInput ownerlinkInput">
			</div>
			<div class="tableCell text">
				<label for="discoveredDefault">Discoverer alias if no wiki:</label>
			</div>
			<div class="tableCell data">
				<input id="discoveredDefault" type="text" data-store="discoveredInput builderInput ownerInput">
			</div>
			<div class="tableCell text">
				<label for="docbyDefault">Documenter alias if not discoverer:</label>
			</div>
			<div class="tableCell data">
				<input id="docbyDefault" type="text" data-store="docbyInput">
			</div>
			<div class="tableCell text">
				<label for="systemDefault">Name of the system:</label>
			</div>
			<div class="tableCell data">
				<input id="systemDefault" type="text" data-store="systemInput">
			</div>
			<div class="tableCell text">
				<label for="planetDefault">Name of the planet:</label>
			</div>
			<div class="tableCell data">
				<input id="planetDefault" type="text" data-store="planetInput">
			</div>
			<div class="tableCell text">
				<label for="moonDefault">Name of the moon:</label>
			</div>
			<div class="tableCell data">
				<input id="moonDefault" type="text" data-store="moonInput">
			</div>
			<div class="tableCell text">
				<label>Platform:</label>
			</div>
			<div class="tableCell data">
				<select id="platformDefault" data-store="platformInput">
					<option value="PC">PC</option>
					<option value="PS">PlayStation</option>
					<option value="XB">Xbox</option>
					<option value="NS">Switch</option>
				</select>
			</div>
			<div class="tableCell text">
				<label>Chapter:</label>
			</div>
			<div class="tableCell data">
				<select id="researchteamDefault" data-store="researchteamInput">
				</select>
			</div>
			<div class="tableCell text">
				<div class="label-combo">
					<label for="portalglyphsDefault">Portalglyphs:</label>
					<button class="button is-small is-danger" type="button" data-input-bind="portalglyphsDefault" onclick="deleteCharacter(this)">&larr;
						Delete</button>
				</div>
			</div>
			<div class="tableCell data">
				<input type="text" id="portalglyphsDefault" maxlength="12" data-store="portalglyphsInput">
			</div>
			<div class="tableHeader data">
				<div id="settingsPortalglyphButtons" class="portalglyphButtons"></div>
				<output id="settingsPortalglyphsPreview" class="glyph portalglyphsPreview"></output>
			</div>
			<div class="tableCell text">
				<label>System wealth:</label>
			</div>
			<div class="tableCell data">
				<select id="wealthDefault" data-store="wealthInput">
					<optgroup label="T3">
						<option value="★★★ (Advanced)">Advanced</option>
						<option value="★★★ (Affluent)">Affluent</option>
						<option value="★★★ (Booming)">Booming</option>
						<option value="★★★ (Flourishing)">Flourishing</option>
						<option value="★★★ (High Supply)">High Supply</option>
						<option value="★★★ (Opulent)">Opulent</option>
						<option value="★★★ (Prosperous)">Prosperous</option>
						<option value="★★★ (Wealthy)">Wealthy</option>
					</optgroup><!-- here ends T3-->
					<optgroup label="T2">
						<!--here begins T2-->
						<option value="★★ (Adequate)">Adequate</option>
						<option value="★★ (Balanced)">Balanced</option>
						<option value="★★ (Comfortable)">Comfortable</option>
						<option value="★★ (Developing)">Developing</option>
						<option value="★★ (Medium Supply)">Medium Supply</option>
						<option value="★★ (Promising)">Promising</option>
						<option value="★★ (Satisfactory)">Satisfactory</option>
						<option value="★★ (Sustainable)">Sustainable</option>
					</optgroup><!-- here ends T2-->
					<optgroup label="T1">
						<!--here begins T1-->
						<option value="★ (Declining)">Declining</option>
						<option value="★ (Destitute)">Destitute</option>
						<option value="★ (Failing)">Failing</option>
						<option value="★ (Fledgling)">Fledgling</option>
						<option value="★ (Low Supply)">Low Supply</option>
						<option value="★ (Struggling)">Struggling</option>
						<option value="★ (Unsuccessful)">Unsuccessful</option>
						<option value="★ (Unpromising)">Unpromising</option>
					</optgroup>
					<!--here ends T1-->
					<optgroup label="Pirate">
						<option value="💀 (Black Market)">Black Market</option>
					</optgroup>
					<optgroup label="Abandoned/Uncharted">
						<option value="">Data Unavailable</option>
					</optgroup>
				</select>
			</div>

		</div>
		<p>If you experience weird behaviour, restore the defaults and click "Set".</p>
		<form method="dialog">
			<button class="button is-primary" type="submit" onclick="updateDefaultValues()">Set</button>
			<button class="button is-danger" type="submit" autofocus>Cancel</button>
			<button class="button is-warning" type="reset" onclick="restoreDefaults()">Restore Defaults</button>
		</form>
	</dialog>`;"undefined"==typeof globalElements?document.getElementById("footer").innerHTML=e:globalElements.output.footer.innerHTML=e;let t=localStorage.getItem("theme")??"light";"dark"==(t=!localStorage.getItem("theme")&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":t)&&(document.documentElement.dataset.theme="dark"),localStorage.getItem("theme")||localStorage.setItem("theme",t);e=document.getElementById("about");e.href==window.location&&e.remove()})();const footerElements={input:{settings:"settings"}};function showSettings(){restoreDefaults();var e=globalElements.input.settings,t=(e.style.scale="0",e.showModal(),e.style.scale="1",e.scrollTo(0,0),JSON.parse(localStorage.getItem("defaultSettings"))??new Object);for(const a in t){var l=e.querySelector(`.data [data-store="${a}"]`);if(l)switch(l.value=t[a],l.id){case"civDefault":l.onchange();break;case"portalglyphsDefault":executeOnInput(l)}}hideDiscoverer(),delete pageData.restored}function updateDefaultValues(){if(pageData.restored)localStorage.removeItem("defaultSettings"),delete pageData.restored;else{var e=new Object;for(const a of footerElements.inputs){var t=a?.value,l=a?.dataset?.store;(a?.options?.[a.options.length-1]?.value==t||t)&&l&&(e[l]=sanitiseString(t))}localStorage.setItem("defaultSettings",JSON.stringify(e))}}function readDefaultValues(){var e=JSON.parse(localStorage.getItem("defaultSettings"))??new Object;for(const l in e){var t=1<l.split(" ").length?l.split(" ").map(e=>document.getElementById(e)).find(e=>e):document.getElementById(l);if(t)switch(t.value=e[l],l){case"civInput":pageData.civShort=e[l],researchTeamDropdown();break;case"portalglyphsInput":executeOnInput(t)}}}function restoreDefaults(){for(const e of footerElements.inputs)null!=e?.value&&("select"==e.tagName.toLowerCase()?e.value=e.options?.[0]?.value:e.value="");hideDiscoverer(),pageData.restored=!0}function validateGlyphSettings(e){var t=e.value,l=structuredClone(regions),t=(addHuburbs(l),Object.freeze(l),validateGlyphs(t,globalElements.input.civDefault.value,l));glyphError(t,e),globalElements.input.settings.querySelector("form button.is-primary").disabled=null==t}(()=>{var e=document.querySelectorAll("footer dialog .data>*");e.forEach(e=>{footerElements.input[e.id]=e.id,e.dataset.store&&assignFunction(e,"delete pageData.restored")}),updateGlobalElements(footerElements),footerElements.inputs=e,addPortalGlyphButtons(globalElements.input.settingsPortalglyphButtons,"portalglyphsDefault");assignElementFunctions({civDefault:["researchTeamDropdown(globalElements.input.researchteamDefault, this.value)"],discoveredDefault:['hideDiscoverer("discoveredDefault", "discoveredlinkDefault")'],discoveredlinkDefault:['hideDiscoverer("discoveredlinkDefault", "discoveredDefault")'],portalglyphsDefault:['glyphInputOnChange(this); validateGlyphSettings(this); document.getElementById("settingsPortalglyphsPreview").value = validateGlyphInput(this.value)']})})();