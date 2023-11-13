import {f as e,g as o,i as d,j as I,k as b,w as h,t as E,b as y,l as c,m as u} from'./links-7c6350cc.js';import {a as $,b as v,c as x,d as C} from'./startup-f6be267d.js';function s(){var t=o.output.regNr;t.innerText=d(e.region)}function m(){const a=I(),t=e.catalogue,n=o.output.addInfo;n.innerText=`[[${t}]]${a}`}function w(){e.catalogue='Eisvana Starship Album - Organic Frigate'}function l(){const a=e.name,t=e.tentacles,n=e.mainColour,r=e.secColour,i=o.input.appearanceInput;if(!(n.trim()||r.trim()||t.trim()))return;const p=(()=>n.trim()?`${b(n)} ${n.trim()}`:'')(),g=(()=>r.trim()?` with ${r} accents`:'')();(i.value=`${a} is ${p} organic frigate${g} with ${t}.`,h(i))}function F(){return`{{Class|${e.class}}}`}function T(){return'Organic Frigate Album'}c.albumOtherExternal=()=>F();c.albumItemTypeExternal=()=>T();u('galleryExplanationExternal',`
	There is a preferred order of gallery pictures:
	<div class='dialog-center'>
		<ol class='dialog-list'>
			<li>Rear view of frigate</li>
			<li>Interaction screen</li>
			<li>System Page</li>
		</ol>
 	</div>`);u('galleryArray',['','Rear view of frigate','Interaction screen','System Page']);y([{element:'nameInput',func:()=>($(),l())},{element:'portalglyphsInput',func:()=>s()},{element:['mainColourInput','secColourInput','tentacleInput'],func:()=>l()},{element:'researchTeam',func:()=>m()},{element:'classInput',func:()=>v()},{element:'hideAppearanceButton',handler:'click',func:function(){E('appearance',this)}},{element:['discoveredInput','discoveredlinkInput'],func:()=>x()}]);s();w();m();C();
