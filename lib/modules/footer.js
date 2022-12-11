(() => {
	const content = `<button class="button" onclick="switchMode()">Switch light/dark mode (experimental)</button>
	<p>Please contact Lenni#4423 on Discord if you encounter any issues.</p>`;
	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = content
	} else {
		globalElements.output.footer.innerHTML = content;
	}
})();

function switchMode() {
	const cssId = 'bulmaDark';
	const body = document.querySelector('body');
	const head = document.querySelector('head');
	if (document.getElementById(cssId)) {
		const element = document.getElementById(cssId)
		element.remove();
	} else {
		const link = document.createElement('link');
		link.id = cssId;
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/bulma-prefers-dark';
		head.appendChild(link);
	}
	body.classList.toggle('darkmode');
}