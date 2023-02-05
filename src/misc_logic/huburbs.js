const GHubHuburbRegions = {
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
};
// GHub has additional ship and MT hunting grounds
for (const regionCode in GHubHuburbRegions) {
	regions.GHub[regionCode] = GHubHuburbRegions[regionCode];
};