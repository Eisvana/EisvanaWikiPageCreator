const content = `<p></p>
<p>Please contact Lenni#4423 on Discord if you encounter any issues.</p>`;
if (typeof globalElements == 'undefined') {
	document.getElementById('footer').innerHTML = content
} else {
	globalElements.output.footer.innerHTML = content;
}