import{f as e,w as s,g as r,a as m,j as g,D as b,p as c,m as w,u as y,b as x,l as o}from"./links-46c35bcf.js";import{a as u,b as E,c as h,d as I}from"./startup-f630788f.js";function i(){const n=e.planet,t=e.moon;if(!n)return void(e.name="");const a=t||n;s(a,"bodyName"),e.name=`Immortal Worm ${a}`}function p(){const n=(()=>{const n=r.input.autoSpawn;for(const t of Array.from(n))if(t.checked)return t.value;return""})(),t=`This creature ${n} automatically spawn on game reload`,a=r.output.autoSpawn;a.style.display=n?"":"none",n&&(a.innerText=t),m()}function d(){const n=g(),t="Eisvana Rare Fauna Album";s(`[[${t}]]${n}`,"addInfo"),m(),e.catalogue=t}function v(){return e.catalogue.split("|").at(-1)}function S(){b();const{name:n,wormclass:t}=e;return`${n}|${t}`}function P(){return`(${e.wormmaxdepth}ku)<br>Stomach: ${e.wormstomach}`}function $(){return e.catalogue.split("|")[0]}function k(){const n=["","Worm scan","Moon Page","Planet Page","System Page","Galaxy Map"];if(!e.moon){const t=n.findIndex((n=>n.toLowerCase().includes("moon")));n.splice(t,1)}e.galleryArray=n}const G=[{element:["planetInput","moonInput"],func:()=>{i(),c(void 0,void 0,!0),u()}},{element:"autoSpawn",func:()=>p()},{element:"researchTeam",func:()=>d()},{element:"wormclassInput",func:()=>u()},{element:["wormmaxdepthInput","wormstomachInput"],func:()=>E()},{element:["discoveredInput","discoveredlinkInput"],func:()=>h()}],T={input:{autoSpawn:"autoSpawnInput"}};o.generateGalleryArray=()=>k(),o.albumLinkGen=()=>$(),o.albumOtherExternal=()=>P(),o.albumNameExternal=()=>S(),o.albumItemTypeExternal=()=>v(),w("galleryExplanationExternal","\n\tThe preferred order of pictures is as follows:\n\t<div class='dialog-center'>\n\t\t<ol class='dialog-list'>\n\t\t\t<li>Worm scan</li>\n\t\t\t<li>Moon Page</li>\n\t\t\t<li>Planet Page</li>\n\t\t\t<li>System Page</li>\n\t\t\t<li>Galaxy Map</li>\n\t\t</ol>\n\t</div>"),y(T),x(G),i(),c(void 0,void 0,!0),d(),p(),I();
