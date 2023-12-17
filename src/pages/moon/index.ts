import { addStaticPageData } from "../../common";
import '../../startup/planetMoon';

addStaticPageData('galleryExplanationExternal', `
Hay un orden preferido de imágenes:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Paisaje/Landscape</li>
			<li>Vista nocturna/Night View</li>
			<li>Sistema de cuevas/Cave System</li>
			<li>Visor de analisis/Analysis Visor</li>
			<li>Guía de exploración de la luna/Moon Exploration Guide</li>
			<li>Página de la luna/Moon Page</li>
			<li>Página del planeta/Planet Page</li>
			<li>Página del sistema/System Page</li>
			<li>Mapa galáctico/Galaxy Map</li>
		</ol>
	</div>`)


addStaticPageData('galleryArray', [
	'',
	'Landscape',
	'Night View',
	'Cave System',
	'Analysis Visor',
	'Moon Exploration Guide',
	'Moon Page',
	'Planet Page',
	'System Page',
	'Galaxy Map'
])