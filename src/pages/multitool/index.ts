import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { albumFunctions } from "../../modules/albumactions";
import { globalFunctions } from "../../variables/objects";
import MTElementFunctions from "./elementFunctions";
import { MTType, acquirementBundle, addInfo, albumDescExternal, albumItemTypeExternal, albumLinkGen, albumOtherExternal, albumTypeExternal, autoMTType, generateGalleryArray, hideCost, hideLocName, hideSrLocName, locGalaxy, locHubNr, showSizeDropdown } from "./multitool";
import { addStaticPageData } from "../../common";
import '../../startup';

addStaticPageData('huburbs', true);

globalFunctions.albumDescExternal = () => albumDescExternal();
globalFunctions.albumOtherExternal = () => albumOtherExternal();
globalFunctions.albumItemTypeExternal = () => albumItemTypeExternal();
globalFunctions.albumTypeExternal = () => albumTypeExternal();
globalFunctions.generateGalleryArray = () => generateGalleryArray();
globalFunctions.albumLinkGen = () => albumLinkGen();

addStaticPageData('galleryExplanationExternal', `
	There is a preferred order of pictures:
	<div class='is-flex is-justify-content-center'>
		<ol class='has-text-left'>
			<li>Discovery Menu</li>
			<li>Price Page</li>
			<li>Base Stats</li>
			<li>Minor Settlement/Sentinel Pillar/Harmonic Camp</li>
			<li>Tool in Hand</li>
			<li>First Person View</li>
		</ol>
	</div>`)

assignElementFunctions(MTElementFunctions);

// startupFunctions
locGalaxy();
acquirementBundle();
addInfo();
autoMTType();
showSizeDropdown();
MTType();
hideLocName();
hideSrLocName();
locHubNr();
hideCost();
albumFunctions();