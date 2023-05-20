// determines if the user has a set theme
let theme = localStorage.getItem('theme') ?? 'light';    //default to light

/**
 * If the user has not yet set a theme preference, and the user's operating system is using a dark theme,
 * the theme of the footer will be set to "dark".
 */
if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	// OS theme setting detected as dark
	theme = 'dark';
}

// if dark theme is preferred, set document with a `data-theme` attribute
if (theme == 'dark') document.documentElement.dataset.theme = 'dark';

if (!localStorage.getItem('theme')) localStorage.setItem('theme', theme);