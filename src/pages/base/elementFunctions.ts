import { hideDiscoverer } from "../../common";
import { planetMoonSentence } from "../../miscLogic/locationLogic";
import { ElementFunctions } from "../../types/elements";
import { capitaliseFriendCode, createCensusEntry, validateDiscord, validateFriendcode, validateReddit } from "./base";

const baseElementFunctions: Array<ElementFunctions> = [
	{
		element: 'planetInput',
		func: function () { planetMoonSentence() }
	},
	{
		element: 'moonInput',
		func: function () { planetMoonSentence() }
	},
	{
		element: 'censusRedditInput',
		func: function () { validateReddit() }
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
]

export default baseElementFunctions;