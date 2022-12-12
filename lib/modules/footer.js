(() => {
	const content = `<button class="button" onclick="switchMode(this)">Switch light/dark mode (experimental)</button>
	<p>Please contact Lenni#4423 on Discord if you encounter any issues.</p>`;
	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = content
	} else {
		globalElements.output.footer.innerHTML = content;
	}
})();

function switchMode(button) {
	const cssId = 'bulmaDark';
	const head = document.querySelector('head');
	const body = document.querySelector('body');
	function toggle() {
		body.classList.toggle('darkmode');
	}
	if (document.getElementById(cssId)) {
		const element = document.getElementById(cssId)
		element.remove();
		toggle();
	} else {
		const link = document.createElement('link');
		link.id = cssId;
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/bulma-prefers-dark';
		head.appendChild(link);
		button.classList.toggle('is-loading');
		link.onload = () => {
			toggle();
			button.classList.toggle('is-loading');
		}
	}
}