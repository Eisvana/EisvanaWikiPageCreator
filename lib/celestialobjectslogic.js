function explorer(discovered_inputId, discoveredlink_inputId, codeId) {
    const discovered = document.getElementById(discovered_inputId).value
    const discoveredlink = document.getElementById(discoveredlink_inputId).value
    let discoverer = '';
    if (discovered != '') {
        discoverer = discovered
    } else if (discoveredlink != '') {
        discoverer = discoveredlink
    }
    setOutput(codeId, discoverer)
}