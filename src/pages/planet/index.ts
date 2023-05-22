import { updateGlobalElements } from "../../commonElements/elementBackend/elementStore";
import { pageData } from "../../variables/objects";
import planetElements from "./elementStore";
import { moonList } from "./planet";

updateGlobalElements(planetElements);
moonList();

pageData.galleryExplanationExternal = `
There is a preferred order of pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Landscape</li>
			<li>Night View</li>
			<li>Cave System</li>
			<li>Coast Area</li>
			<li>Underwater</li>
			<li>Analysis Visor</li>
			<li>Planet Exploration Guide</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`;