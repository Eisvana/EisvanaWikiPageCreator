		// assigns planet or moon name dynamically
		function wormName(planet_inputId, moon_inputId, codeName) {
			const planet = document.getElementById(planet_inputId).value;
			const moon = document.getElementById(moon_inputId).value;

			let body = planet_inputId;
			if (moon != '') body = moon_inputId;

			textFunctionMultiple(codeName, body)
		}

		// sets the autospawn value according to input
		function autoSpawn(inputId, codeId) {
			const spawn = document.querySelector(`[id^=${inputId}]:checked`).value;
			const output = `This creature ${spawn} automatically spawn on a game reload.`;
			if (spawn != '') {
				document.getElementById(codeId).style.display = '';
				setOutput(codeId, output);
			} else {
				document.getElementById(codeId).style.display = 'none';
			}
		}

		// assigns "documented by GHEC" sentence
		function catalog(civ, researchTeam_codeId, codeId) {
			const chapter = document.getElementById(researchTeam_codeId).innerHTML;
			const hub = document.getElementById(civ).value;

			let research = '';
			if (chapter == 'GHEC') {
				research = ' and documented by the [[Galactic Hub Exobiology Corps]]'
			}

			let album;
			switch (hub) {
				case "GHub":
					album = "GHEC Sandworm";
					break;

				case "CalHub":
					album = "CalHub Rare Fauna";
					break;

				case "EisHub":
					album = "EisHub Shaihuluda";
					break;
			}

			const output = `[[${album} Album]]${research}`;

			setOutput(codeId, output);
		}
