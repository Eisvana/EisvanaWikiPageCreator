import {ad as d,g as s,f as o,w as r,v as p,ar as f,s as g,q as y,as as v,u as b,b as h,m as S,l as A} from'./links-7c6350cc.js';import {p as E} from'./index-ac198c01.js';function I(t){const e=document.querySelectorAll('[data-moon]'),a=f([...e],'dataset.moon'),l=`moon_input${a}`;(y(g(`<div class="table-cell text removable" data-moon="section${a}">
		<button class="button is-outlined is-danger icon is-small" title="Remove moon" type="button" data-evt-id="removeButton">&#10006</button>
		<label for="${l}">Moon name:</label>
	</div>
	<div class="table-cell data" data-moon="section${a}">
		<input type="text" id="${l}" data-evt-id="moonInput">
	</div>`,{},[{element:'moonInput',handler:'input',func:()=>i()},{element:'removeButton',handler:'click',func:()=>(v(`section${a}`,'moon'),L())}]),t.parentElement,'beforebegin'),document.querySelectorAll('[data-moon]').length/2+1>2&&(t.disabled=!0))}function L(){var t=s.input.moonInputs.querySelector('button');(t.disabled=!1,i())}function i(){const t=document.querySelectorAll('[data-moon] input'),n=[];for(const e of t)e.value&&n.push(`[[${d(e.value)}]]`);(s.output.moonList.innerText=n.join(', '),o.moons=n,M())}function M(){r((()=>{var n=o.moons,e=n.length;if(!n||!n.length)return'This planet has no moons.';return`This planet's [[moon]]${e>1?'s':''} ${E(e)} ${n.join(' and ')}.`})(),'moonSentence')}function P(){const t=['','Landscape','Night View','Cave System','Analysis Visor','Planet Exploration Guide','Planet Page','System Page','Galaxy Map'],n=['Coast Area','Underwater'];if(o.terrain!=='Pangean'){var e=t.indexOf('Analysis Visor');t.splice(e,0,...n)}o.galleryArray=t}function u(){var t=o.terrain;if(typeof t!='string')return;r(t!=='Pangean'?'Yes':'No','water')}function w(){i();var t=s.input.terrainInput;t instanceof HTMLSelectElement&&p(t,'change')}A.generateGalleryArray=()=>P();document.addEventListener('pageReset',()=>w());b({input:{moonInputs:'moonInputs',addMoonButton:'addMoonButton'},output:{}});h([{element:'addMoonButton',handler:'click',func:function(){I(this)}},{element:'terrainInput',func:()=>u()}]);i();u();S('galleryExplanationExternal',`
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
	</div>`);
