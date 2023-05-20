import '../../startup/cssImports';
import '../../startup/theme';
import '../../startup/footer';

const GHubHosts = ['wiki.nmsgalactichub.com', 'nmswikipagecreator.nmsgalactichub.com', 'hubwikipagecreator.nmsgalactichub.com'];
if (GHubHosts.includes(window.location.host)) {
	const linkElement: HTMLAnchorElement | null = document.querySelector('a[href=".."]');
	if (linkElement) linkElement.href = 'https://lenni009.github.io/';	// 'https://nmsgalactichub.com';
}