import { addInfoBullet, docBy, hideDiscoverer, toggleSection } from "../../common";
import { processDate } from "../../miscLogic/dateLogic";
import { planetMoonSentence } from "../../miscLogic/locationLogic";
import type { ElementFunctions } from "../../types/elements";
import { capitaliseFriendCode, createCensusEntry, validateDiscord, validateFriendcode, validateReddit, exocraftCheckboxes } from "./racetrack";

const racetrackElementFunctions: ElementFunctions = [
	{
		element: ['planetInput', 'moonInput'],
		func: function () { planetMoonSentence() }
	},
	{
		element: 'censusRedditInput',
		func: function () { validateReddit() }
	},
	{
		element: 'exocraftInput',
		func: () => exocraftCheckboxes()
	},
	{
		element: 'censusFriendInput',
		func: function () { capitaliseFriendCode() }
	},
	{
		element: 'censusFriendInput',
		handler: 'change',
		func: function () { validateFriendcode() }
	},
	{
		element: 'censusPlayerInput',
		func: function () { createCensusEntry() }
	},
	{
		element: 'builderInput',
		func: function () { hideDiscoverer("builderInput", "builderlinkInput"); docBy() }
	},
	{
		element: 'builderlinkInput',
		func: function () { hideDiscoverer("builderlinkInput", "builderInput"); docBy() }
	},
	{
		element: 'addInfoInput',
		func: function () { addInfoBullet() }
	},
	{
		element: 'censusDiscordInput',
		handler: 'change',
		func: function () { validateDiscord() }
	},
	{
		element: 'censusArrivalInput',
		handler: 'change',
		func: function () { processDate(this as unknown as HTMLInputElement) }
	},
	{
		element: 'censusHideButton',
		handler: 'click',
		func: function () { toggleSection('census', this as unknown as HTMLButtonElement) }
	},
]

export default racetrackElementFunctions;