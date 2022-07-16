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
            const currentResourceId = 'resource_input' + num1 + 2
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