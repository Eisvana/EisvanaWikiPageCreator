import{O as m,b1 as k,T as s,aY as a,a$ as g,b4 as h,aW as l,aZ as r,b5 as f,a_ as p,b3 as _,b8 as v,b9 as b}from"./links-BWCMRQq7.js";import{_ as c}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x=["href","title"],y=m({__name:"PageLink",props:{text:{},url:{},inactive:{type:Boolean}},setup(t){const l=t,e=k((()=>{const t=l.text.slice(0,1).toLowerCase();return`Create ${"aeiou".includes(t)?"an":"a"} ${l.text} page`}));return(t,l)=>(s(),a("a",{href:t.url,title:e.value,class:"button is-link is-outlined"},g(t.text),9,x))}}),S=c(y,[["__scopeId","data-v-522cca6e"]]),$=["href","title"],A=["src","alt"],B=["src","alt"],w=m({__name:"BuiltBy",props:{text:{},link:{},imgAlt:{},img:{}},setup:t=>(t,e)=>(s(),a("div",null,[t.link?(s(),a("a",{key:0,href:t.link,title:t.text,rel:"noopener noreferrer",target:"_blank"},[h(g(t.text)+" ",1),l("img",{src:t.img,alt:t.imgAlt},null,8,A)],8,$)):(s(),a(r,{key:1},[h(g(t.text)+" ",1),t.img?(s(),a("img",{key:0,src:t.img,alt:t.imgAlt},null,8,B)):f("",!0)],64))]))}),C=c(w,[["__scopeId","data-v-24b2e339"]]),I=["href"],N=["src","alt"],E=m({__name:"CivImage",props:{link:{},imgAlt:{},img:{}},setup:t=>(t,e)=>(s(),a("a",{href:t.link,target:"_blank",rel:"noopener noreferrer"},[l("img",{src:t.img,alt:t.imgAlt},null,8,N)],8,I))}),L=c(E,[["__scopeId","data-v-b06031cf"]]),d=t=>(v("data-v-20cde747"),t=t(),b(),t),M=d((()=>l("h1",{class:"title is-spaced"},"Eisvana Wiki Page Creator",-1))),F=d((()=>l("div",{class:"subtitle is-4"},"Choose what page you want to create:",-1))),P={"aria-label":"Subpages",class:"page-options"},V={class:"built-by"},T=d((()=>l("div",null,"Brought to you by:",-1))),W={class:"eisvana-images"},D=m({__name:"Home",setup(t){const e=[{text:"Base",url:"./base.html"},{text:"Fauna",url:"./fauna.html"},{text:"Sandworm",url:"./sandworm.html"},{text:"Flora",url:"./flora.html"},{text:"Starship",url:"./starship.html"},{text:"Multi-Tool",url:"./multitool.html"},{text:"Mineral",url:"./mineral.html"},{text:"Derelict Freighter",url:"./derelict.html"},{text:"Organic Frigate",url:"./biofrig.html"},{text:"System",url:"./system.html"},{text:"Planet",url:"./planet.html"},{text:"Moon",url:"./moon.html"}],i=[{text:"Eisvana Wiki Scholars"},{text:"Assistant for No Man's Sky",link:"https://nmsassistant.com/",img:"https://cdn.assistantapps.com/assistantNMS.png",imgAlt:"Assistant for NMS logo"}],n=[{link:"https://nomanssky.fandom.com/wiki/Eisvana",imgAlt:"Eisvana logo",img:"https://static.wikia.nocookie.net/nomanssky_gamepedia/images/8/85/Eisvana_Logo.png"}];return(t,m)=>(s(),a(r,null,[M,F,l("nav",P,[(s(),a(r,null,p(e,(t=>_(S,{url:t.url,text:t.text,disabled:t.inactive},null,8,["url","text","disabled"]))),64))]),l("div",V,[T,(s(),a(r,null,p(i,(t=>_(C,{link:t.link,text:t.text,img:t.img,"img-alt":t.imgAlt},null,8,["link","text","img","img-alt"]))),64))]),l("div",W,[(s(),a(r,null,p(n,(t=>_(L,{img:t.img,"img-alt":t.imgAlt,link:t.link},null,8,["img","img-alt","link"]))),64))])],64))}}),Z=c(D,[["__scopeId","data-v-20cde747"]]);export{Z as default};
