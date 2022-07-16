function planetMoon(planet_inputId, moon_inputId, input_placementId, planetmoons_codeId) {
    const planetDiv = document.getElementById(planetmoons_codeId)
    const planets = document.getElementById(planet_inputId).value;
    const moons = document.getElementById(moon_inputId).value;
    let bodies = parseInt(planets) + parseInt(moons)
    console.log(bodies)
    if (bodies > 6) {
        bodies = 6
    } else if (bodies < 2) {
        bodies = 2
    }
    const IDs = ['planet1', 'planet2', 'planet3', 'planet4', 'planet5'];
    document.getElementById(input_placementId).innerHTML = '';
    document.getElementById(planetmoons_codeId).innerHTML = '';
    planetDiv.innerHTML = ''

    for (let i = 0; i < bodies; i++) {
        const planetTemplate = `<div id="body${i}"><div>|-</div>
        <div>|[[File:<output id="planetFile${i}"></output>|150px]]</div>
        <div>|[[File:<output id="landscapeFile${i}"></output>|150px]]</div>
        <div>|[[<output id="planetName${i}"></output>]]</div>
        <div>|{{Biome|<output id="biomeName${i}"></output>}} <output id="infested${i}"></output>- <output id="planetDescriptor${i}"></output></div>
        <div>|<output id="resource${i}1"></output><output id="resource${i}2"></output><output id="resource${i}3"></output><output id="resource${i}4"></output><output id="resource${i}5"></output></div>
        <div>|<output id="weather${i}"></output>}}</div>
        <div>|<output id="sent${i}"></output></div>
        <div>|<output id="flora${i}"></output></div>
        <div>|<output id="fauna${i}"></output> (<output id="faunaTotal${i}" name="FaunaTotal"></output>)</div>
        <div>|-</div>
        <div>!style="background-color:#2f4f4f"|Notes:</div>
        <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus:''' {{FaunaTotal|<output id="faunaTotalNotes${i}" name="FaunaTotal"></output>}} {{nanites}}</div></div>`
        planetDiv.insertAdjacentHTML('beforeend', planetTemplate);
        console.log(planetDiv.childElementCount)
    } 
}

// shows or hides the resource inputs for the planet table
function hideResource(currentResource, nextResource) {
    if (currentResource.value == '') {
        document.getElementById(nextResource).value = ''
        document.getElementById(nextResource).parentElement.parentElement.style.display = 'none'
    } else {
        document.getElementById(nextResource).parentElement.parentElement.style.display = ''
    }
}

function displayResource(resource_input, resourceCodeId) {
    if(resource_input.value == '') {
        document.getElementById(resourceCodeId).style.display = 'none'
    } else {
        document.getElementById(resourceCodeId).style.display = ''
        document.getElementById(resourceCodeId).innerHTML = '<br>' + currentResource.value
    }
}