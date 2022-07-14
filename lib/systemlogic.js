function planetMoon(planet_inputId, moon_inputId, planetmoons_codeId) {
    const planetDiv = document.getElementById(planetmoons_codeId)
    const planets = document.getElementById(planet_inputId).value;
    const moons = document.getElementById(moon_inputId).value;
    const bodies = planets + moons
    for (let i = 0; i < bodies; i++) {
    const planetTemplate = `<div>|-</div>
    <div>|[[File:${planetFile}|150px]]</div>
    <div>|[[File:${landscapeFile}|150px]]</div>
    <div>|[[${name}]]</div>
    <div>|{{Biome|${biome}}} - ${planetDescriptor}</div>
    <div>|[[Resource1]]<br>[[Resource2]]<br>[[Resource3]]<br>[[Resource4]]</div>
    <div>|${weather}</div>
    <div>|${sent}</div>
    <div>|${flora}</div>
    <div>|${fauna} (#)</div>
    <div>|-</div>
    <div>!style="background-color:#2f4f4f"|Notes:</div>
    <div>|colspan=8 style="text-align:left"|'''100% Zoology Bonus:''' {{#expr: ${faunaTotal} * 250}} {{nanites}}</div>`


    planetTemplate.insertAdjacentHTML('beforeend', planetDiv);

    }







    
}

/*
|-
|[[File:nmsMisc_NotAvailable.png|150px]]
|[[File:nmsMisc_NotAvailable.png|150px]]
|[[Planet Name]]
|{{Biome|XX}} - PlanetType
|[[Resource1]]<br>[[Resource2]]<br>[[Resource3]]<br>[[Resource4]]
|Weather
|Sent
|Flora
|Fauna (#)
|-
!style="background-color:#2f4f4f"|Notes:
|colspan=8 style="text-align:left"|'''100% Zoology Bonus:''' {{#expr: x * 250}} {{nanites}}
*/