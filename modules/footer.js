const content = `<p class="github">
Please consider contributing to the project:
<a href="https://github.com/Lenni009/NMSWikiPageCreator" target="_blank" rel="noopener noreferrer">GitHub
	repository</a>
</p>
<p>If you encounter any issues contact Lenni#4423 on Discord.</p>`;
if (typeof globalElements == 'undefined') {
	document.getElementById('footer').innerHTML = content
} else {
	globalElements.output.footer.innerHTML = content;
}