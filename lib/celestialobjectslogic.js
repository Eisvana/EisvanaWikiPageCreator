// generates discovered section sentences
function explorer(discovered_inputId, discoveredlink_inputId, documenter_inputId, researchteam_inputId, platform_inputId, docDate_inputId, discDate_inputId, codeId) {
    const discovered = document.getElementById(discovered_inputId).value;
    const discoveredlink = document.getElementById(discoveredlink_inputId).value;
    const documenter = document.getElementById(documenter_inputId).value;
    const researchteam = document.getElementById(researchteam_inputId).value;
    const platform = document.getElementById(platform_inputId).value;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let discDate = document.getElementById(discDate_inputId).value.replaceAll("-", "/");
    let docDate = document.getElementById(docDate_inputId).value.replaceAll("-", "/");
    discDate = new Date(discDate);
    discDate = discDate.toLocaleString('en-UK', options);
    docDate = new Date(docDate);
    docDate = docDate.toLocaleString('en-UK', options);

    const documented = formatName(documenter);
    const research = displayResearch(researchteam);
    let discoverer;

    if (!discoveredlink == '') {
        discoverer = '{{profile|' + discoveredlink + '}}'
    } else {
        discoverer = formatName(discovered);
    }

    let explorer;
    if (documented == '' || documented == discovered || documented == discoveredlink) {
        explorer = `Discovered and uploaded by ${research} ${discoverer} on <output id="discDate">${discDate}</output>.`
    } else {
        explorer = `<div>* Discovered and uploaded by ${platform} explorer ${discoverer} on <output id="discDate">${discDate}</output>.</div>
        <div>* Explored and documented by ${research} ${documented} on <output id="docDate">${docDate}</output>.</div>`
    }
    setOutput(codeId, explorer)
}