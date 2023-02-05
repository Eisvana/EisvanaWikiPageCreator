(() => {
	const content = `<button class="button" id="switchTheme" onclick="switchTheme()">Switch light/dark mode</button>
	<p>Found a bug, have an improvement suggestion or simply want to leave some feedback?<br>
	Fill out the <a href='https://docs.google.com/forms/d/e/1FAIpQLSdXFIaHbeCWVsiaeIvcJL0A3aWiB5tQQFf2ofg0dr7lOkDChQ/viewform' rel='noreferrer noopener' target='_blank'>feedback form</a>!</p>
	<a href='./about.html' class="about">About</a>`;
	if (typeof globalElements == 'undefined') {
		document.getElementById('footer').innerHTML = content
	} else {
		globalElements.output.footer.innerHTML = content;
	}

	// determines if the user has a set theme
	let theme = localStorage.getItem('theme') ?? 'light';    //default to light
	// local storage is used to override OS theme settings
	if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// OS theme setting detected as dark
		theme = 'dark';
	}

	// if dark theme is preferred, set document with a `data-theme` attribute
	if (theme == 'dark') document.documentElement.dataset.theme = 'dark';

	if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);
})();

// function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme() {
	document.documentElement.dataset.transition = 'true';
	if (localStorage.getItem('theme') == 'light') {
		localStorage.setItem('theme', 'dark');
		document.documentElement.dataset.theme = 'dark';
	} else {
		localStorage.setItem('theme', 'light');
		document.documentElement.dataset.theme = 'light';
	}

	// adding delay to allow the CSS transition to complete. This is only for Chrome, Firefox would work with any timeout (even 0) #chromesucks
	setTimeout(() => {
		delete document.documentElement.dataset.transition;
	}, 400);
}