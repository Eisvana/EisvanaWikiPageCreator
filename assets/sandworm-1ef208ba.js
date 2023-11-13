import {f as n,w as m,g as s,a as c,j as g,D as b,p as i,m as w,u as y,b as h,l as o} from'./links-7c6350cc.js';import {a as u,b as x,c as S,d as E} from'./startup-f6be267d.js';function p(){const a=n.planet,e=n.moon;if(!a){n.name='';return}var t=(()=>e||a)();(m(t,'bodyName'),n.name=`Immortal Worm ${t}`)}function d(){const a=(()=>{var l=s.input.autoSpawn;for(const r of l)if(r.checked)return r.value;return''})(),t=s.output.autoSpawn;(t.style.display=a?'':'none',a&&(t.innerText=`This creature ${a} automatically spawn on game reload`),c())}function f(){const a=g(),e='Eisvana Rare Fauna Album';(m(`[[${e}]]${a}`,'addInfo'),c(),n.catalogue=e)}function I(){return n.catalogue.split('|').at(-1)}function v(){b();var{name:a,wormclass:e}=n;return`${a}|${e=='Unstoppable Nematode'?'Unstopp. Nematode':e}`}function P(){var{wormmaxdepth:a,wormstomach:e}=n;return`(${a}ku)<br>${e=='Consumed waypoints'?'Stom.':'Stomach'}: ${e}`}function $(){return n.catalogue.split('|')[0]}function N(){var a=['','Worm scan','Moon Page','Planet Page','System Page','Galaxy Map'];if(!n.moon){var e=a.findIndex(t=>t.toLowerCase().includes('moon'));a.splice(e,1)}n.galleryArray=a}o.generateGalleryArray=()=>N();o.albumLinkGen=()=>$();o.albumOtherExternal=()=>P();o.albumNameExternal=()=>v();o.albumItemTypeExternal=()=>I();w('galleryExplanationExternal',`
	The preferred order of pictures is as follows:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Worm scan</li>
			<li>Moon Page</li>
			<li>Planet Page</li>
			<li>System Page</li>
			<li>Galaxy Map</li>
		</ol>
	</div>`);y({input:{autoSpawn:'autoSpawnInput'}});h([{element:['planetInput','moonInput'],func:()=>(p(),i(void 0,void 0,!0),u())},{element:'autoSpawn',func:()=>d()},{element:'researchTeam',func:()=>f()},{element:'wormclassInput',func:()=>u()},{element:['wormmaxdepthInput','wormstomachInput'],func:()=>x()},{element:['discoveredInput','discoveredlinkInput'],func:()=>S()}]);p();i(void 0,void 0,!0);f();d();E();
