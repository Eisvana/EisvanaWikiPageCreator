import { addInfoBullet, hideOrgName, numberError } from "../../common";
import { planetMoonSentence } from "../../miscLogic/locationLogic";
import { toggleRedirect } from "../../modules/actions";
import { albumDiscoverer, albumName, albumOther } from "../../modules/albumactions";
import { ElementFunctions } from "../../types/elements"
import { albumDropdown, albumTitle, bundlePropFunctions, genderDropdown, genderProps, genusDropdown, genusProduces, hideAlbumEntry, hideCreaturePrio, hideSecGenderProps, noLineBreak, pageName, specialNotes, specialNotesTextFunc } from "./fauna"

const creatureElementFunctions: ElementFunctions = [
	{
		element: 'nameInput',
		func: () => { pageName(); albumName(); toggleRedirect() }
	},
	{
		element: 'oldNameInput',
		func: () => { hideOrgName(); pageName(); albumName(); toggleRedirect() }
	},
	{
		element: 'planetInput',
		func: () => planetMoonSentence()
	},
	{
		element: 'moonInput',
		func: () => planetMoonSentence()
	},
	{
		element: 'ecosystemInput',
		func: () => { genusDropdown(); albumDropdown(); genusProduces() }
	},
	{
		element: 'genusInput',
		func: () => { genderDropdown(); specialNotesTextFunc(); genusProduces() }
	},
	{
		element: 'civ',
		func: () => { albumDropdown(); hideAlbumEntry() }
	},
	{
		element: 'notesInput',
		func: () => { specialNotes(); specialNotesTextFunc() }
	},
	{
		element: 'specialNotesInput',
		func: () => specialNotesTextFunc()
	},
	{
		element: 'catalogueInput',
		func: () => { addInfo(); addInfoBullet(); albumTitle(); hideAlbumEntry() }
	},
	{
		element: 'researchTeam',
		func: () => addInfo()
	},
	{
		element: 'genderInput',
		func: () => { hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2") }
	},
	{
		element: 'gender2Input',
		func: () => { hideSecGenderProps(); hideCreaturePrio(); genderProps("gender", "gender2") }
	},
	{
		element: 'heightInput',
		func: function () { genderProps("height", "height2"); albumOther(); numberError(this as unknown as HTMLInputElement) }
	},
	{
		element: 'weightInput',
		func: function () { genderProps("height", "height2"); numberError(this as unknown as HTMLInputElement) }
	},
	{
		element: 'height2Input',
		func: function () { genderProps("height", "height2"); albumOther(); numberError(this as unknown as HTMLInputElement) }
	},
	{
		element: 'weight2Input',
		func: function () { genderProps("height", "height2"); numberError(this as unknown as HTMLInputElement) }
	},
	{
		element: 'gender',
		func: () => { bundlePropFunctions(); albumOther() }
	},
	{
		element: 'discoveredInput',
		func: () => albumDiscoverer()
	},
	{
		element: 'discoveredlinkInput',
		func: () => albumDiscoverer()
	},
	{
		element: 'dmInput',
		func: () => noLineBreak()
	},
]

export default creatureElementFunctions;