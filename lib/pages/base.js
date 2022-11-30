const baseElementFunctions = {
	builderInput: ['hideDiscoverer("builderInput", "builderlinkInput")'],
	builderlinkInput: ['hideDiscoverer("builderlinkInput", "builderInput")'],
}
assignFunctions(baseElementFunctions);

// validates Discord tags (must have #xxxx at the end)
globalElements.input.censusDiscordInput.onchange = () => {
	const element = globalElements.input.censusDiscordInput;
	const tag = element.value;
	if (tag == '') {
		errorMessage(element);
		return;
	}
	const discriminator = tag.substring(tag.length - 5);
	const hashtag = discriminator.substring(0, 1);
	const numeric = discriminator.substring(1);
	if (hashtag === '#' && parseInt(numeric)) {			// valid
		if (tag.substring(tag.length - 6, tag.length - 5) === ' ') {		// tag has space between name and discriminator
			errorMessage(element, 'There is a space between the name and the #xxxx. Ignore this message if this is correct.');
		} else {		// tag is good
			errorMessage(element);
		}
	} else {			// invalid
		errorMessage(element, 'Invalid Discord tag. Include #xxxx at the end');
	}
}

globalElements.input.censusRedditInput.oninput = () => {
	const element = globalElements.input.censusRedditInput;
	const value = element.value;
	const redditName = (() => {
		if (value.toLowerCase().substring(0, 2) === 'u/') {
			return value.substring(2);
		} else {
			return value;
		}
	})();
	const dest = element.getAttribute('data-dest-noauto');
	globalElements.output[dest].innerText = redditName;
}