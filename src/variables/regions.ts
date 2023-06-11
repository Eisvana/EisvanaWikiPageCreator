import { addHuburbs } from "../common";
import { Region, Regions } from "../types/regions"
import { pageData } from "./objects";

/**
 * An object representing discovery regions and their associated systems.
 * @typedef {Object} RegionsObject
 * @property {Object} GHub - The Galactic Hub Project.
 * @property {Object} CalHub - The Galactic Hub Calypso.
 * @property {Object} EisHub - The Galactic Hub Eissentam.
 * @property {Object.<string, string>} GHub - The systems in the Galactic Hub Project, indexed by their Glyphs.
 * @property {Object.<string, string>} CalHub - The systems in the Galactic Hub Calypso, indexed by their Glyphs.
 * @property {Object.<string, string>} EisHub - The systems in the Galactic Hub Eissentam, indexed by their Glyphs.
 * @example
 * const regions = {
 *    GHub: {
 *        F9556C30: 'The Arm of Vezitinen',
 *        F9555C30: 'Canthian',
 *        F9555C31: 'Dexterf Sector',
 *        F9556C31: 'The Arm of Katteus',
 *        ...
 *    },
 *    CalHub: {
 *        F9556C30: 'Uisaor Spur',
 *        F9555C30: 'The Arm of Kiffeyn',
 *        F9555C31: 'Ilongl Cloud',
 *        F9556C31: 'The Arm of Taticale',
 *        ...
 *    },
 *    EisHub: {
 *        F9556C30: 'Riwala',
 *        F9555C30: 'Omskio Instability',
 *        F9555C31: 'Marcki',
 *        F9556C31: 'Anolamga Spur',
 *        ...
 *    }
 * };
 */
export const regions: Regions = {
	GHub: {
		F9556C30: 'The Arm of Vezitinen',
		F9555C30: 'Canthian',
		F9555C31: 'Dexterf Sector',
		F9556C31: 'The Arm of Katteus',
		F9557C31: 'Nugsdor Adjunct',
		F9557C30: 'Uefert Nebula',
		F9557C2F: 'Widraik',
		F9556C2F: 'Airnaka Conflux',
		F9555C2F: 'Sivess Instability',
		FA556C30: 'Savenix Instability',
		F8556C30: 'Nonlopsi Instability'
	},
	CalHub: {
		F9556C30: 'Uisaor Spur',
		F9555C30: 'The Arm of Kiffeyn',
		F9555C31: 'Ilongl Cloud',
		F9556C31: 'The Arm of Taticale',
		F9557C31: 'Egerap Anomaly',
		F9557C30: 'Wakestones Expanse',
		F9557C2F: 'Erhahn Fringe',
		F9556C2F: 'Imrikians Terminus',
		F9555C2F: 'Imedeili',
		FA556C30: 'Kovasu Adjunct',
		F8556C30: 'Lossians Boundary'
	},
	EisHub: {
		F9556C30: 'Riwala',
		F9555C30: 'Omskio Instability',
		F9555C31: 'Marcki',
		F9556C31: 'Anolamga Spur',
		F9557C31: 'Sea of Zonyayp',
		F9557C30: 'Rayuyar Band',
		F9557C2F: 'Umaton Instability',
		F9556C2F: 'Exramb Adjunct',
		F9555C2F: 'Ologowe Fringe',
		FA556C30: 'Yatrifex',
		FA555C30: 'Yeiada Sector',
		FA555C31: 'Iptrevs Fringe',
		FA556C31: 'Yamiraith Sector',
		FA557C31: 'Wedragi Spur',
		FA557C30: 'Rezhensk',
		FA557C2F: 'Sobert Cloud',
		FA556C2F: 'Umtats Anomaly',
		FA555C2F: 'Tavill',
		F8556C30: 'Qangew Expanse',
		F8555C30: 'Nijhwal Boundary',
		F8555C31: 'Usband Cluster',
		F8556C31: 'Ejongaa Anomaly',
		F8557C31: 'Zahrel Expanse',
		F8557C30: 'The Arm of Fupand',
		F8557C2F: 'Cuculta',
		F8556C2F: 'Etmarao',
		F8555C2F: 'Otreie Void'
	}
}

/**
 * A mapping of region codes to region names for huburb regions in the Galactic Hub
 * @type {Object.<string, string>}
 */
export const GHubHuburbRegions: Region = {
	'FA555C30': 'Wekeram Conflux',
	'FA555C31': 'Ahomas Fringe',
	'FA556C31': 'Nudryorob Fringe',
	'FA557C31': 'Urzews Instability',
	'FA557C30': 'Ercays',
	'FA557C2F': 'Dahiloci Conflux',
	'FA556C2F': 'Rapphosu',
	'FA555C2F': 'Kemurrim Expanse',
	'F8555C30': 'Ardarea Sector',
	'F8555C31': 'Cetrocho Spur',
	'F8556C31': 'Guitat Cloud',
	'F8557C31': 'Unceto Cloud',
	'F8557C30': 'Yamurab Instability',
	'F8557C2F': 'Tenavata Terminus',
	'F8556C2F': 'Menacaro',
	'F8555C2F': 'Ziessuw Mass'
}

// If the 'huburbs' variable is defined and truthy, add Galactic Hub regions to 'regions'
const huburbs = pageData.huburbs;
if (huburbs) addHuburbs(regions);

// Make 'regions' read-only
Object.freeze(regions);