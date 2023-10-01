import { assignElementFunctions } from "../../commonElements/elementBackend/elementFunctions";
import { albumFunctions } from "../../modules/albumactions";
import { globalFunctions, pageData } from "../../variables/objects";
import MTElementFunctions from "./elementFunctions";
import { acquirementBundle, addInfo, albumDescExternal, albumItemTypeExternal, albumLinkGen, albumOtherExternal, albumTypeExternal, autoMTLoc, generateGalleryArray, hideCost, hideLocName, hideSrLocName, locRegNr, subtypeDropdown } from "./multitool";
import { addStaticPageData, enPrefix } from "../../common";
import '../../startup';

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
			<li>Minor Settlement/Sentinel Pillar/Harmonic Camp/Monolith</li>
			<li>Tool in Hand</li>
			<li>First Person View</li>
		</ol>
	</div>`)

assignElementFunctions(MTElementFunctions);

// startupFunctions
acquirementBundle();
addInfo();
autoMTLoc();
subtypeDropdown();
hideLocName();
hideSrLocName();
locRegNr();
hideCost();
albumFunctions();
enPrefix(pageData.type as string | undefined ?? '', 'enPrefix');