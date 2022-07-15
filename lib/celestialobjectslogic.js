// generates discovered section sentences
function explorer(discovered_inputId, discoveredlink_inputId, documenter_inputId, researchteam_inputId, platform_inputId, docDate_inputId, discDate_inputId, codeId) {
    const discovered = document.getElementById(discovered_inputId).value;
    const discoveredlink = document.getElementById(discoveredlink_inputId).value;
    const documenter = document.getElementById(documenter_inputId).value;
    const researchteam = document.getElementById(researchteam_inputId).value;
    const platform = document.getElementById(platform_inputId).value;
    let discDate = document.getElementById(discDate_inputId).value.replaceAll("-", "/");
    let docDate = document.getElementById(docDate_inputId).value.replaceAll("-", "/");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    discDate = new Date(discDate);
    discDate = discDate.toLocaleString('en-UK', options);
    docDate = new Date(docDate);
    docDate = docDate.toLocaleString('en-UK', options);
    let discoverer = '';
    let research; 

    if (!discoveredlink == '') {
        discoverer = '{{profile|' + discoveredlink + '}}'
    } else if (!discovered == '') {
        discoverer = "''" + discovered + "''"
    }

    if (researchteam == '') {
        research = platform + ' explorer'
    } else if (researchteam.length == 4) {
        research = researchteam + ' researcher'
    } else if (researchteam.includes('Scribe')) {
        research = 'EisHub [[Galactic Hub Eissentam Scribes|Scribe]]'
    } else if (researchteam.includes('Archivist')) {
        research = 'CalHub [[Galactic Hub Calypso Archivists|Archivist]]'
    }

    let explorer;
    if (documenter == '' || documenter == discovered || documenter == discoveredlink) {
        explorer = `Discovered and uploaded by ${research} ${discoverer} on <output id="discDate">${discDate}</output>.`
    } else {
        explorer = `<div>* Discovered and uploaded by ${platform} explorer ${discoverer} on <output id="discDate">${discDate}</output>.</div>
        <div>* Explored and documented by ${research} ${documenter} on <output id="docDate">${docDate}</output>.</div>`
    }
    setOutput(codeId, explorer)
}

// generates researchteam dropdown
function researchTeamDropdown(civ_inputId, researchteam_inputId) {
    const civ = document.getElementById(civ_inputId).value;
    const prevSelect = document.getElementById(researchteam_inputId).value
    const teams = ['', 'GHGS', 'GHEC', 'GHSH'];
    document.getElementById(researchteam_inputId).innerHTML = ''

    switch(civ) {
        case "CalHub":
            teams.push('CalHub Archivists')
            break;

        case "EisHub":
            teams.push('EisHub Scribes')
            break;
    }
    setDropDownOptions(teams, researchteam_inputId)
    document.getElementById(researchteam_inputId).value = prevSelect
}