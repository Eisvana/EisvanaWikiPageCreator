import{w as c,g as u,e as s,r,c as l,p as d,h as i,d as o,a as p,t as f,b as m}from"./links-VW0Eb8-6.js";import"./startup-EsiMXR21.js";import"./gallery-5IAjVqM_.js";import"./Explanation.vue_vue_type_script_setup_true_lang-3Wn0jNBb.js";function I(n){const e=n.value,t=n.dataset.destNoauto;c(e.replaceAll("-","/"),t)}function g(n){const e=(new Date).getFullYear();c(e.toString(),n)}function h(){const n=u.input.censusDiscordInput,e=n.value,t=/^[a-z0-9._]+$/.test(e);s(n,!e||t?"":"Invalid Discord tag. Please give your username, not your display name.")}function v(){const n=u.input.censusRedditInput,e=n.value.trim(),t=e.toLowerCase().startsWith("u/")?e.substring(2):e;if(t.includes(" "))return void s(n,"Reddit name must not include spaces");s(n);const i=n.dataset.destNoauto;c(t,i)}function b(){const n=u.input.censusFriendInput;n.value=n.value.toUpperCase();const e=n.dataset.destNoauto;c(n,e)}function k(){const n=u.input.censusFriendInput,e=n.value,t=new RegExp(/(?:[0-9A-Za-z]{4}-){2}[0-9A-Za-z]{5}/);!e||r(e,t)?s(n):s(n,"Wrong friend code format")}function C(){const n=u.input.censusShowInput,e=!!u.input.censusPlayerInput.value;n.checked!=e&&(n.checked=e,l(n))}const F=[{element:["planetInput","moonInput"],func:function(){d()}},{element:"censusRedditInput",func:function(){v()}},{element:"censusFriendInput",func:function(){b()}},{element:"censusFriendInput",handler:"change",func:function(){k()}},{element:"censusPlayerInput",func:function(){C()}},{element:"builderInput",func:function(){i("builderInput","builderlinkInput"),o()}},{element:"builderlinkInput",func:function(){i("builderlinkInput","builderInput"),o()}},{element:"addInfoInput",func:function(){p()}},{element:"censusDiscordInput",handler:"change",func:function(){h()}},{element:"censusArrivalInput",handler:"change",func:function(){I(this)}},{element:"censusHideButton",handler:"click",func:function(){f("census",this)}}];m(F),g("censusrenewal");
