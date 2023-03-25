const baseElementFunctions = {
	planetInput: ['planetMoonSentence()'],
	moonInput: ['planetMoonSentence()'],
	censusRedditInput: ['validateReddit()'],
	censusFriendInput: ['capitaliseFriendCode()'],
	censusPlayerInput: ['createCensusEntry()'],
	builderInput: ['hideDiscoverer("builderInput", "builderlinkInput"); docBy()'],
	builderlinkInput: ['hideDiscoverer("builderlinkInput", "builderInput"); docBy()'],
	addInfoInput: ['addInfoBullet()'],
}
assignElementFunctions(baseElementFunctions);

// run on startup and reset
function startupFunctions() {
	getCurrentYear('censusrenewal');
}

/**
 * Validates Discord tags.
 *
 * @param {Object} inputElement - The input element to validate.
 * @returns {void}
 */
globalElements.input.censusDiscordInput.onchange = () => {
	const element = globalElements.input.censusDiscordInput;
	const tag = element.value;
	if (!tag) {
		errorMessage(element);
		return;
	}
	const discriminator = tag.substring(tag.length - 5);
	const hashtag = discriminator.substring(0, 1);
	const numeric = discriminator.substring(1);
	if (hashtag === '#' && /^\d+$/.test(numeric)) {			// valid; regex source: https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
		if (tag.substring(tag.length - 6, tag.length - 5) === ' ') {		// tag has space between name and discriminator
			errorMessage(element, 'There is a space between the name and the #xxxx. Ignore this message if this is correct.');
		} else {		// tag is good
			errorMessage(element);
		}
	} else {			// invalid
		errorMessage(element, 'Invalid Discord tag. Include #xxxx at the end');
	}
}

/**
 * Validates the input value for a Reddit user name and generates wiki code for it.
 * @function
 *
 * @returns {void}
 */
function validateReddit() {
	const element = globalElements.input.censusRedditInput;
	const value = element.value.trim();
	const redditName = (() => {
		if (value.toLowerCase().startsWith('u/')) {
			return value.substring(2);
		} else {
			return value;
		}
	})();
	if (redditName.includes(' ')) {
		errorMessage(element, 'Reddit name must not include spaces');
		return;
	} else {
		errorMessage(element);
	}
	const dest = element.dataset.destNoauto;
	wikiCode(redditName, dest);
}

/**
 * Capitalizes the input value of a friend code input element and calls the wikiCode function.
 * @function
 */
function capitaliseFriendCode() {
	const element = globalElements.input.censusFriendInput;
	element.value = element.value.toUpperCase();
	const dest = element.dataset.destNoauto;
	wikiCode(element, dest);
}

/**
 * Validates a friend code format (xxxx-xxxx-xxxxx).
 * @function
 * @param {Event} e - The change event.
 * @returns {void}
 */
globalElements.input.censusFriendInput.onchange = () => {
	const element = globalElements.input.censusFriendInput;
	const friendCode = element.value;
	const friendCodeRegex = new RegExp(/(?:[0-9A-Za-z]{4}-){2}[0-9A-Za-z]{5}/);
	if (!friendCode || regexMatch(friendCode, friendCodeRegex)) {
		errorMessage(element);
	} else {
		errorMessage(element, 'Wrong friend code format');
	}
}

/**
 * Automatically checks or unchecks a checkbox to create a census entry.
 *
 * @function
 * @returns {void}
 */
function createCensusEntry() {
	const input = globalElements.input.censusPlayerInput;
	const inputBool = Boolean(input.value);	// boolean from the input (true if any input is given)
	const checkbox = globalElements.input.censusShowInput;
	if (checkbox.checked == inputBool) return;
	checkbox.checked = inputBool;
	checkboxWikiCode(checkbox);
}