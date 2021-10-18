var Y=Object.defineProperty;var Q=(t,e,r)=>e in t?Y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var _=(t,e,r)=>(Q(t,typeof e!="symbol"?e+"":e,r),r);import{d as R,r as u,c as g,a as v,t as $,b as f,w as m,o as d,F as y,e as C,f as w,g as L,h as X,m as N,p as H,i as Z,j as T,v as ee,k as te,l as re,n as se,q as ne,s as oe,u as ae,N as k,x as U}from"./vendor.db50f025.js";const ie=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}};ie();var j={siteName:"my-book",repositoryUrl:"https://github.com/0xcaffebabe/note",navMenu:[{title:"\u67B6\u6784",router:"/doc/\u8F6F\u4EF6\u5DE5\u7A0B-\u67B6\u6784-\u67B6\u6784"},{title:"\u8F6F\u4EF6\u8BBE\u8BA1",children:[{title:"\u8BBE\u8BA1\u6A21\u5F0F",router:"/doc/\u8F6F\u4EF6\u5DE5\u7A0B-\u8BBE\u8BA1\u6A21\u5F0F-\u8BBE\u8BA1\u6A21\u5F0F"}]},{title:"\u5916\u94FE",children:[{title:"Github",url:"https://github.com/0xcaffebabe"},{title:"\u535A\u5BA2",url:"https://www.ismy.wang/"}]}]};var A=(t,e)=>{for(const[r,n]of e)t[r]=n;return t};const ce=R({setup(){},data(){return{name:"my-book"}},computed:{siteName(){return j.siteName},navMenu(){return j.navMenu}},created(){}}),le={class:"header"},ue={class:"header-wrapper"},de={class:"container"},he={class:"logo"},pe={class:"content"};function _e(t,e,r,n,s,o){const a=u("el-button"),c=u("el-menu-item"),l=u("el-sub-menu"),h=u("el-menu");return d(),g("div",le,[v("div",ue,[v("div",de,[v("div",he,[v("a",{href:"#",onClick:e[0]||(e[0]=i=>t.$router.push("/"))},$(t.siteName),1)]),v("div",pe,[v("div",null,[f(a,{icon:"el-icon-search",class:"search",onClick:e[1]||(e[1]=i=>t.$emit("search")),size:"mini",round:""})]),f(h,{mode:"horizontal",router:!0},{default:m(()=>[(d(!0),g(y,null,C(t.navMenu,(i,p)=>(d(),g(y,{key:p},[i.children?(d(),w(l,{key:0,index:i.router},{title:m(()=>[L($(i.title),1)]),default:m(()=>[(d(!0),g(y,null,C(i.children,(D,I)=>(d(),w(c,{index:p+"-"+I,key:p+"-"+I},{default:m(()=>[L($(D.title),1)]),_:2},1032,["index"]))),128))]),_:2},1032,["index"])):(d(),w(c,{key:1,index:p+""},{default:m(()=>[L($(i.title),1)]),_:2},1032,["index"]))],64))),128))]),_:1})])])])])}var me=A(ce,[["render",_e],["__scopeId","data-v-78f20696"]]);const S="mark";class fe{static async search(e){const s=await X("K9I7PAT3CY","8f3ec5043331dedbccce916154fc0162").initIndex("note").search(e,{hitsPerPage:200,highlightPreTag:`<${S}>`,highlightPostTag:`</${S}>`});return s?s.hits.map(o=>{var a,c,l,h,i,p;return{url:o.url,body:o.txt,hilighedUrl:(c=(a=o._highlightResult)==null?void 0:a.url)==null?void 0:c.value,hilighedBody:(h=(l=o._highlightResult)==null?void 0:l.txt)==null?void 0:h.value,hilighedSegement:this.splitHilighedBody((p=(i=o._highlightResult)==null?void 0:i.txt)==null?void 0:p.value)}}):[]}static splitHilighedBody(e){if(!e||e.indexOf(`<${S}>`)==-1)return[];const r=e.split(`
`).filter(n=>n.indexOf(`<${S}>`)!=-1);return Array.from(new Set(r))}}class ge{constructor(){_(this,"name","");_(this,"link","");_(this,"chidren",[])}}const O=class{constructor(){_(this,"cacheMap",new Map)}static getInstance(){return this.instance}set(e,r,n){this.ensureScopreCacheExists(e,r),this.cacheMap.get(e).set(r,n)}get(e,r){return this.ensureScopreCacheExists(e,r),this.cacheMap.get(e).get(r)}has(e,r){return this.ensureScopreCacheExists(e,r),this.cacheMap.get(e).has(r)}ensureScopreCacheExists(e,r){this.cacheMap.has(e)||this.cacheMap.set(e,new Map)}};let b=O;_(b,"instance",new O);const B=b.getInstance();function ve(){return function(t,e,r){let n=r.value;const s=t.name()+"-"+e;return r.value=function(){const o=JSON.stringify(arguments);if(B.has(s,o))return B.get(s,o);const a=n.apply(this,arguments);return a instanceof Promise?a.then(c=>(B.set(s,o,c),c)):a},r}}function ye(t){return t?(t=decodeURI(t).replace(/-/g,"@@"),t.split("/").splice(1).join("-").replace(".md","")):""}function we(t){return t?t.split("-").join("/").replace(/@@/g,"-")+".md":""}var V={docId2Url:we,docUrl2Id:ye},ke=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,J=(t,e,r,n)=>{for(var s=n>1?void 0:n?$e(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(s=(n?a(e,r,s):a(s))||s);return n&&s&&ke(e,r,s),s};const W=ve(),q={c:"clike",java:"clike",cpp:"clike","c++":"clike",html:"markup",xml:"markup",python:"clike","c#":"clike",ts:"javascript",js:"javascript",typesscript:"javascript",go:"clike",conf:"markup",ruby:"clike"};var x;const z=(x=class{constructor(){}name(){return"doc-service"}static getInstance(){return this.instance||(this.instance=new z),this.instance}renderMd(t){const e=new N.Renderer;return e.link=(r,n,s)=>(r==null?void 0:r.startsWith("http"))?`<a href='${r}' target="_blank">${s}</a>`:`<a href='/doc/${this.docUrl2Id(r)}'>${s}</a>`,e.code=(r,n,s)=>`<pre><code class="language-${n}">${this.hightlightCode(r,n)}</code></pre>`,e.image=(r,n,s)=>`<p class="img-wrapper" style="text-align:center"><img src='${r}'/></p>`,N(t,{renderer:e})}setDocReadRecrod(t,e){const r=this.getReadingRecords();r.set(t,e),this.setLastReadRecord(t),localStorage.setItem("doc-service::read-record",JSON.stringify([...r]))}setLastReadRecord(t){localStorage.setItem("doc-service:last-read",t);const e=localStorage.getItem("doc-service::read-history-list");let r=[];e&&(r=JSON.parse(e));const n=r.findIndex(s=>s.doc==t);n!=-1&&r.splice(n,1),r.push({doc:t,time:new Date().toISOString()}),r.length>20&&r.shift(),localStorage.setItem("doc-service::read-history-list",JSON.stringify(r))}getReadHistoryList(){const t=localStorage.getItem("doc-service::read-history-list");let e=[];return t&&(e=JSON.parse(t)),e.reverse()}getLastReadRecord(){return localStorage.getItem("doc-service:last-read")||""}getDocReadRecord(t){return this.getReadingRecords().get(t)||0}getReadingRecords(){let t=localStorage.getItem("doc-service::read-record"),e;return t?e=new Map(JSON.parse(t)):e=new Map,e}hightlightCode(t,e){return e&&q[e]?e=q[e]:e="clike",H.highlight(t,H.languages[e],e)}docUrl2Id(t){return V.docUrl2Id(t)}docId2Url(t){return V.docId2Url(t)}getContent(t){const r=new DOMParser().parseFromString(t,"text/html").querySelectorAll("h1, h2, h3, h4, h5, h6");let n=[],s=[];for(let o=0;o<r.length;o++){const a=r[o];let c=parseInt(a.tagName.replace("H","")),l=new ge;if(l.name=a.innerHTML,l.link=a.getAttribute("id"),n[c]=l,c==1)s.push(l);else for(let h=c-1;h>=1;h--)if(n[h]){n[h].chidren.push(l);break}}return s}},_(x,"instance"),x);let M=z;J([W],M.prototype,"renderMd",1);J([W],M.prototype,"getContent",1);var Ce=M.getInstance();let G;const Se=R({setup(){},data(){return{kw:"",showDrawer:!1,showEmpty:!0,showLoading:!1,resultList:[]}},methods:{async show(){this.showDrawer=!0},hide(){this.showDrawer=!1},handleSearch(){this.showEmpty=!1,clearTimeout(G),G=setTimeout(async()=>{this.showLoading=!0,this.resultList=await fe.search(this.kw),this.showEmpty=!0,this.showLoading=!1},500)},handleDocClick(t){!t.startsWith("./")&&!t.startsWith("/")&&(t="/"+t);const e=Ce.docUrl2Id(t);this.$router.push("/doc/"+e)}}}),Ee={class:"search-result"},De=["onClick"],Ie=["innerHTML"],Re=["innerHTML"];function Le(t,e,r,n,s,o){const a=u("el-input"),c=u("el-empty"),l=u("el-drawer"),h=Z("loading");return d(),w(l,{modelValue:t.showDrawer,"onUpdate:modelValue":e[1]||(e[1]=i=>t.showDrawer=i),size:"600px"},{title:m(()=>[f(a,{modelValue:t.kw,"onUpdate:modelValue":e[0]||(e[0]=i=>t.kw=i),placeholder:"\u641C\u7D22",onInput:t.handleSearch},null,8,["modelValue","onInput"])]),default:m(()=>[T(v("div",Ee,[(d(!0),g(y,null,C(t.resultList,i=>(d(),g("div",{key:i.url,class:"result-item",onClick:p=>t.handleDocClick(i.url)},[v("h3",{innerHTML:i.hilighedUrl},null,8,Ie),(d(!0),g(y,null,C(i.hilighedSegement,p=>(d(),g("p",{innerHTML:p,key:p},null,8,Re))),128))],8,De))),128))],512),[[h,t.showLoading]]),t.resultList.length==0?T((d(),w(c,{key:0,description:t.kw?"\u6CA1\u6709\u641C\u5230 "+t.kw+"\u76F8\u5173\u7684\u7ED3\u679C":"\u641C\u7D22\u7ED3\u679C\u5C06\u5728\u8FD9\u91CC\u5C55\u793A"},null,8,["description"])),[[ee,t.showEmpty]]):te("",!0)]),_:1},8,["modelValue"])}var Ae=A(Se,[["render",Le],["__scopeId","data-v-596c88e4"]]);const be=R({components:{Header:me,Search:Ae},setup(){},data(){return{}}});function Be(t,e,r,n,s,o){const a=u("Header"),c=u("el-affix"),l=u("el-header"),h=u("router-view"),i=u("el-main"),p=u("el-container"),D=u("Search");return d(),g(y,null,[f(p,null,{default:m(()=>[f(l,null,{default:m(()=>[f(c,{offset:0},{default:m(()=>[f(a,{onSearch:e[0]||(e[0]=I=>t.$refs.search.show())})]),_:1})]),_:1}),f(i,null,{default:m(()=>[f(h)]),_:1})]),_:1}),f(D,{ref:"search"},null,512)],64)}var Me=A(be,[["render",Be],["__scopeId","data-v-790fa079"]]);const Pe="modulepreload",K={},Fe="/",P=function(e,r){return!r||r.length===0?e():Promise.all(r.map(n=>{if(n=`${Fe}${n}`,n in K)return;K[n]=!0;const s=n.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${o}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":Pe,s||(a.as="script",a.crossOrigin=""),a.href=n,document.head.appendChild(a),s)return new Promise((c,l)=>{a.addEventListener("load",c),a.addEventListener("error",l)})})).then(()=>e())},Oe=[{path:"/",component:()=>P(()=>import("./HomePage.172817ed.js"),["resource/HomePage.172817ed.js","resource/HomePage.ca0681c3.css","resource/index.6ad25096.js","resource/vendor.db50f025.js"])},{path:"/wc",component:()=>P(()=>import("./WordCloud.a113d7f0.js"),["resource/WordCloud.a113d7f0.js","resource/WordCloud.9e8ca8bf.css","resource/vendor.db50f025.js","resource/index.6ad25096.js"])},{path:"/doc/:doc",component:()=>P(()=>import("./DocPage.c7371aa3.js"),["resource/DocPage.c7371aa3.js","resource/DocPage.466dd6df.css","resource/vendor.db50f025.js","resource/index.6ad25096.js"])}];function xe(){return re({history:se(),routes:Oe})}class Ne{constructor(){_(this,"name","");_(this,"link","");_(this,"chidren",[]);_(this,"parent")}}function He(){return ne({state(){return{currentCategory:new Ne}},mutations:{setCurrentCategory(e,r){e.currentCategory=r}}})}const E=oe(Me);E.use(ae);E.use(He());const F=xe();F.beforeEach((t,e,r)=>{k.start(),r()});F.afterEach(()=>{k.done()});U.interceptors.request.use(t=>(k.start(),t));U.interceptors.response.use(t=>(k.done(),t),t=>(k.done(),Promise.resolve(t)));E.use(F);E.mount("#app");export{ve as C,V as D,A as _,Ne as a,j as c,Ce as d};
