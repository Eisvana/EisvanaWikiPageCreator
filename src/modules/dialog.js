(() => {
	const dialogElements = {
		output: {
			explanationHeading: 'explanationHeading',
			explanationContent: 'explanationContent',
			explanationLink: 'explanationLink',
			explanationImg: 'explanationImg',
		}
	}

	const content = `<h2 id="explanationHeading" class="title is-4"></h2>
	<div id="explanationContent" class="nms-font"></div>
	<a id="explanationLink" target='_blank' rel='noopener noreferrer'>
		<img id="explanationImg" alt='Explainer Image'>
	</a>
	<form method="dialog">
		<button class="button" type="submit" autofocus>Close</button>
	</form>`;

	globalElements.output.explanation.innerHTML = content;

	updateGlobalElements(dialogElements);
})();

// shows an explanation modal and fills text
function explanation(heading, text, img) {
	const imgElement = globalElements.output.explanationImg;
	const linkElement = globalElements.output.explanationLink;
	if (img) {
		imgElement.src = '';
		imgElement.src = img
		linkElement.style.display = '';
		linkElement.href = img;
	} else {
		linkElement.style.display = 'none';
	}
	globalElements.output.explanationHeading.innerText = heading;
	globalElements.output.explanationContent.innerHTML = text;
	globalElements.output.explanation.showModal();
}