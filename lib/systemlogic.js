// inserts the planet table into the code
function planetMoon(planet_inputId, moon_inputId, planetmoons_codeId) {
    const planetDiv = document.getElementById(planetmoons_codeId)
    const planets = document.getElementById(planet_inputId).value;
    const moons = document.getElementById(moon_inputId).value;
    let bodies = parseInt(planets) + parseInt(moons)
    if (bodies > 6) {
        bodies = 6
    } else if (bodies < 2) {
        bodies = 2
    }
    const rowIDs = ['planet1', 'planet2', 'planet3', 'planet4', 'planet5', 'planet6'];
    for (const ID of rowIDs) {
        const rows = document.getElementsByName(ID)

        for (const row of rows) {
            row.style.display = 'none'
        }
    }

    document.getElementById(planetmoons_codeId).innerHTML = '';
    planetDiv.innerHTML = ''

    for (let i = 1; i <= bodies; i++) {
        const planetTemplate = `<div id="body${i}"><div>|-</div>
        <div>|[[File:<output id="planetFile${i}"></output>|150px]]</div>
        <div>|[[File:<output id="landscapeFile${i}"></output>|150px]]</div>
        <div>|[[<output id="planetName${i}"></output>]]</div>
        <div>|{{Biome|<output id="biome${i}"></output>}} <output id="infested${i}"></output>- <output id="descriptor${i}"></output></div>
        <div>|<output id="resource${i}1"></output><output id="resource${i}2"></output><output id="resource${i}3"></output><output id="resource${i}4"></output><output id="resource${i}5"></output></div>
        <div>|<output id="weather${i}"></output></div>
        <div>|<output id="sentinel${i}"></output></div>
        <div>|<output id="flora${i}"></output></div>
        <div>|<output id="fauna${i}"></output> (<output id="faunaTotal${i}" name="FaunaTotal${i}"></output>)</div>
        <div>|-</div>
        <div>!style="background-color:#2f4f4f"|Notes:</div>
        <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus:''' {{FaunaTotal|<output id="faunaTotalNotes${i}" name="FaunaTotal${i}"></output>}} {{nanites}}</div></div>`

        const inputRowId = 'planet' + i
        const inputRows = document.getElementsByName(inputRowId)
        for (const inputRow of inputRows) {
            inputRow.style.display = ''
        }

        planetDiv.insertAdjacentHTML('beforeend', planetTemplate);

        for (j = 2; j <=5; j++) {
            num1 = i.toString()
            num2 = j.toString()
            num3 = (j+1).toString()
            const currentResourceId = 'resource_input' + num1 + '2'
            const currentResource = document.getElementById(currentResourceId)
            hideResource(currentResource)
        }
    } 
}

// shows or hides the resource inputs for the planet table
function hideResource(currentResource, nextResource) {
    if (currentResource.value == '') {
        const idObj = {};
        for (i = 1; i <= 6; i++) {
        	const key = 'resource_input' + i.toString()
        	const resArr = [];
            for (j = 2; j <= 5; j++) {
                const value = 'resource_input' + i.toString() + j.toString()
                resArr.push(value)
            }
			idObj[key] = []
            for (const resource of resArr) {
                idObj[key].push(resource)
            }
        }
        const currentId = currentResource.id;
        const key = currentId.substring(0, currentId.length-1);
        const searchArr = idObj[key];
        let index = searchArr.indexOf(currentId)

        for (i = index; i < searchArr.length; i++) {
            const target = searchArr[i]
            document.getElementById(target).value = ''
            document.getElementById(target).parentElement.parentElement.style.display = 'none'
        }
    } else {
        if (nextResource == undefined) return
        document.getElementById(nextResource).parentElement.parentElement.style.display = ''
    }
}

function displayResource(resource_input, resourceCodeId) {
    if(resource_input.value == '') {
        document.getElementById(resourceCodeId).style.display = 'none'
    } else {
        document.getElementById(resourceCodeId).style.display = ''
        document.getElementById(resourceCodeId).innerHTML = '&lt;br&gt;' + resource_input.value
    }
}

function placePlanetInputs(inputId) {
    for (i = 1; i <= 6; i++) {
        const inputTemplate = `<tr name="planet${i}" style="display: none;">
    <td colspan="2" style="text-align: center;">Planet ${i}</td>
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="planetName_input${i}">Planet name</label>
    <td><input type="text" id="planetName_input${i}" oninput="document.getElementById('planetName${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="planetFile_input${i}">Planet file name</label>
    <td>
        <input type="text" id="planetFile_input${i}" oninput="document.getElementById('planetFile${i}').innerHTML = this.value">
        <br>
        <input type="file" id="mainFileUpl${i}" accept="image/*" onchange="imgUpload('planetFile${i}', 'mainFileUpl${i}', 'planetFile_input${i}')">
    </td>
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="landscapeFile_input${i}">Landscape file name</label>
    <td>
        <input type="text" id="landscapeFile_input${i}" oninput="document.getElementById('landscapeFile${i}').innerHTML = this.value">
        <br>
        <input type="file" id="secFileUpl${i}" accept="image/*" onchange="imgUpload('landscapeFile${i}', 'secFileUpl${i}', 'landscapeFile_input${i}')">
    </td>
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label>Biome</label>
    <td>
        <select id="biome_input${i}" onchange="document.getElementById('biome${i}').innerHTML = this.value">
            <option value="Lush">Lush
            <option value="Barren">Barren
            <option value="Dead">Dead
            <option value="Exotic">Exotic
            <option value="Mega Exotic">Mega Exotic
            <option value="Scorched">Scorched
            <option value="Frozen">Frozen
            <option value="Toxic">Toxic
            <option value="Irradiated">Irradiated
            <option value="Marsh">Marsh
            <option value="Volcanic">Volcanic
        </select>
    </td>
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="infested_input${i}">Is infested</label>
    <td><input type="checkbox" id="infested_input${i}" onchange="if (this.checked) {this.value='([[Biome Subtype - Infested|Infested]]) '} else {this.value = ''}; document.getElementById('infested${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="descriptor_input${i}">Planet description</label>
    <td><input type="text" id="descriptor_input${i}" oninput="document.getElementById('descriptor${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="resource_input${i}1">Resource 1</label>
    <td><input type="text" id="resource_input${i}1" oninput="hideResource(this, 'resource_input${i}2'); document.getElementById('resource${i}1').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display:none">
    <th><label for="resource_input${i}2">Resource 2</label>
    <td><input type="text" id="resource_input${i}2" oninput="hideResource(this, 'resource_input${i}3'); displayResource(this, 'resource${i}2')">
</tr>
<tr name="planet${i}" style="display:none">
    <th><label for="resource_input${i}3">Resource 3</label>
    <td><input type="text" id="resource_input${i}3" oninput="hideResource(this, 'resource_input${i}4'); displayResource(this, 'resource${i}3')">
</tr>
<tr name="planet${i}" style="display:none">
    <th><label for="resource_input${i}4">Resource 4</label>
    <td><input type="text" id="resource_input${i}4" oninput="hideResource(this, 'resource_input${i}5'); displayResource(this, 'resource${i}4')">
</tr>
<tr name="planet${i}" style="display:none">
    <th><label for="resource_input${i}5">Resource 5</label>
    <td><input type="text" id="resource_input${i}5" oninput="displayResource(this, 'resource${i}5')">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="weather_input${i}">Weather</label>
    <td><input type="text" id="weather_input${i}" oninput="document.getElementById('weather${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="sentinel_input${i}">Sentinels</label>
    <td><input type="text" id="sentinel_input${i}" oninput="document.getElementById('sentinel${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="flora_input${i}">Flora</label>
    <td><input type="text" id="flora_input${i}" oninput="document.getElementById('flora${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="fauna_input${i}">Fauna</label>
    <td><input type="text" id="fauna_input${i}" oninput="document.getElementById('fauna${i}').innerHTML = this.value">
</tr>
<tr name="planet${i}" style="display: none;">
    <th><label for="faunatotal_input${i}">Number of Fauna</label>
    <td><input type="number" id="faunatotal_input${i}" min="0" oninput="textFunctionMultiple('FaunaTotal${i}', 'faunatotal_input${i}')">
</tr>`

        document.getElementById(inputId).parentElement.parentElement.insertAdjacentHTML('beforebegin', inputTemplate)
    }
}