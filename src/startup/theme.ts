const localStorageTheme = localStorage.getItem('theme');

// determines if the user has a set theme
let theme = localStorageTheme ?? 'light';    //default to light

/**
 * If the user has not yet set a theme preference, and the user's operating system is using a dark theme,
 * the theme of the footer will be set to "dark".
 */
if (!localStorageTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	// OS theme setting detected as dark
	theme = 'dark';
}

// if dark theme is preferred, set document with a `data-theme` attribute
if (theme === 'dark') document.documentElement.dataset.theme = 'dark';

if (!localStorageTheme) localStorage.setItem('theme', theme);

// this empty export statement is necessary to make this file a module
export { };