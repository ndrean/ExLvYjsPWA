try{self["workbox:core:7.2.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.2.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class i{constructor(e,t,i="GET"){this.handler=s(t),this.match=e,this.method=i}setCatchHandler(e){this.catchHandler=s(e)}}class n extends i{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const i=s.origin===location.origin,{params:n,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:s});let r=a&&a.handler;const c=e.method;if(!r&&this.i.has(c)&&(r=this.i.get(c)),!r)return;let o;try{o=r.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const l=a&&a.catchHandler;return o instanceof Promise&&(this.o||l)&&(o=o.catch((async i=>{if(l)try{return await l.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(i=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw i}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:i}){const n=this.t.get(s.method)||[];for(const a of n){let n;const r=a.match({url:e,sameOrigin:t,request:s,event:i});if(r)return n=r,(Array.isArray(n)&&0===n.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const c=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);function o(e,s,a){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new i((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)r=new n(e,s,a);else if("function"==typeof e)r=new i(e,s,a);else{if(!(e instanceof i))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return c().registerRoute(r),r}const l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[l.prefix,e,l.suffix].filter((e=>e&&e.length>0)).join("-"),f=e=>e||u(l.precache),h=e=>e||u(l.runtime);function d(e){e.then((()=>{}))}const b=new Set;function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var i in s)({}).hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e},w.apply(null,arguments)}let p,g;const m=new WeakMap,v=new WeakMap,y=new WeakMap,R=new WeakMap,x=new WeakMap;let q={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return v.get(e);if("objectStoreNames"===t)return e.objectStoreNames||y.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return E(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function j(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(g||(g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(k(this),t),E(m.get(this))}:function(...t){return E(e.apply(k(this),t))}:function(t,...s){const i=e.call(k(this),t,...s);return y.set(i,t.sort?t.sort():[t]),E(i)}}function D(e){return"function"==typeof e?j(e):(e instanceof IDBTransaction&&function(e){if(v.has(e))return;const t=new Promise(((t,s)=>{const i=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",a),e.removeEventListener("abort",a)},n=()=>{t(),i()},a=()=>{s(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",n),e.addEventListener("error",a),e.addEventListener("abort",a)}));v.set(e,t)}(e),t=e,(p||(p=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,q):e);var t}function E(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const i=()=>{e.removeEventListener("success",n),e.removeEventListener("error",a)},n=()=>{t(E(e.result)),i()},a=()=>{s(e.error),i()};e.addEventListener("success",n),e.addEventListener("error",a)}));return t.then((t=>{t instanceof IDBCursor&&m.set(t,e)})).catch((()=>{})),x.set(t,e),t}(e);if(R.has(e))return R.get(e);const t=D(e);return t!==e&&(R.set(e,t),x.set(t,e)),t}const k=e=>x.get(e);const U=["get","getKey","getAll","getAllKeys","count"],T=["put","add","delete","clear"],I=new Map;function L(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(I.get(t))return I.get(t);const s=t.replace(/FromIndex$/,""),i=t!==s,n=T.includes(s);if(!(s in(i?IDBIndex:IDBObjectStore).prototype)||!n&&!U.includes(s))return;const a=async function(e,...t){const a=this.transaction(e,n?"readwrite":"readonly");let r=a.store;return i&&(r=r.index(t.shift())),(await Promise.all([r[s](...t),n&&a.done]))[0]};return I.set(t,a),a}q=(e=>w({},e,{get:(t,s,i)=>L(t,s)||e.get(t,s,i),has:(t,s)=>!!L(t,s)||e.has(t,s)}))(q);try{self["workbox:expiration:7.2.0"]&&_()}catch(e){}const N="cache-entries",C=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class O{constructor(e){this.l=null,this.u=e}h(e){const t=e.createObjectStore(N,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}p(e){this.h(e),this.u&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(e=>t(e.oldVersion,e))),E(s).then((()=>{}))}(this.u)}async setTimestamp(e,t){const s={url:e=C(e),timestamp:t,cacheName:this.u,id:this.m(e)},i=(await this.getDb()).transaction(N,"readwrite",{durability:"relaxed"});await i.store.put(s),await i.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(N,this.m(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let i=await s.transaction(N).store.index("timestamp").openCursor(null,"prev");const n=[];let a=0;for(;i;){const s=i.value;s.cacheName===this.u&&(e&&s.timestamp<e||t&&a>=t?n.push(i.value):a++),i=await i.continue()}const r=[];for(const e of n)await s.delete(N,e.id),r.push(e.url);return r}m(e){return this.u+"|"+C(e)}async getDb(){return this.l||(this.l=await function(e,t,{blocked:s,upgrade:i,blocking:n,terminated:a}={}){const r=indexedDB.open(e,t),c=E(r);return i&&r.addEventListener("upgradeneeded",(e=>{i(E(r.result),e.oldVersion,e.newVersion,E(r.transaction),e)})),s&&r.addEventListener("blocked",(e=>s(e.oldVersion,e.newVersion,e))),c.then((e=>{a&&e.addEventListener("close",(()=>a())),n&&e.addEventListener("versionchange",(e=>n(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.l}}class B{constructor(e,t={}){this.v=!1,this.R=!1,this.q=t.maxEntries,this.j=t.maxAgeSeconds,this.D=t.matchOptions,this.u=e,this.k=new O(e)}async expireEntries(){if(this.v)return void(this.R=!0);this.v=!0;const e=this.j?Date.now()-1e3*this.j:0,t=await this.k.expireEntries(e,this.q),s=await self.caches.open(this.u);for(const e of t)await s.delete(e,this.D);this.v=!1,this.R&&(this.R=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.k.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.j){const t=await this.k.getTimestamp(e),s=Date.now()-1e3*this.j;return void 0===t||t<s}return!1}async delete(){this.R=!1,await this.k.expireEntries(1/0)}}class P{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:i})=>{if(!i)return null;const n=this.U(i),a=this._(s);d(a.expireEntries());const r=a.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return n?i:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.T=e,this.j=e.maxAgeSeconds,this.I=new Map,e.purgeOnQuotaError&&function(e){b.add(e)}((()=>this.deleteCacheAndMetadata()))}_(e){if(e===h())throw new t("expire-custom-caches-only");let s=this.I.get(e);return s||(s=new B(e,this.T),this.I.set(e,s)),s}U(e){if(!this.j)return!0;const t=this.L(e);if(null===t)return!0;return t>=Date.now()-1e3*this.j}L(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.I)await self.caches.delete(e),await t.delete();this.I=new Map}}try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}const M={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};function S(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class W{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function A(e){return new Promise((t=>setTimeout(t,e)))}function K(e){return"string"==typeof e?new Request(e):e}class F{constructor(e,t){this.N={},Object.assign(this,t),this.event=t.event,this.C=e,this.O=new W,this.B=[],this.P=[...e.plugins],this.M=new Map;for(const e of this.P)this.M.set(e,{});this.event.waitUntil(this.O.promise)}async fetch(e){const{event:s}=this;let i=K(e);if("navigate"===i.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?i.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))i=await e({request:i.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const a=i.clone();try{let e;e=await fetch(i,"navigate"===i.mode?void 0:this.C.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=K(e);let s;const{cacheName:i,matchOptions:n}=this.C,a=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:i});s=await caches.match(a,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:i,matchOptions:n,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(e,s){const i=K(e);await A(0);const n=await this.getCacheKey(i,"write");if(!s)throw new t("cache-put-with-no-response",{url:(a=n.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const r=await this.S(s);if(!r)return!1;const{cacheName:c,matchOptions:o}=this.C,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,i){const n=S(t.url,s);if(t.url===n)return e.match(t,i);const a=Object.assign(Object.assign({},i),{ignoreSearch:!0}),r=await e.keys(t,a);for(const t of r)if(n===S(t.url,s))return e.match(t,i)}(l,n.clone(),["__WB_REVISION__"],o):null;try{await l.put(n,u?r.clone():r)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:f,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.N[s]){let i=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))i=K(await e({mode:t,request:i,event:this.event,params:this.params}));this.N[s]=i}return this.N[s]}hasCallback(e){for(const t of this.C.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.C.plugins)if("function"==typeof t[e]){const s=this.M.get(t),i=i=>{const n=Object.assign(Object.assign({},i),{state:s});return t[e](n)};yield i}}waitUntil(e){return this.B.push(e),e}async doneWaiting(){let e;for(;e=this.B.shift();)await e}destroy(){this.O.resolve(null)}async S(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class H{constructor(e={}){this.cacheName=h(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,i="params"in e?e.params:void 0,n=new F(this,{event:t,request:s,params:i}),a=this.W(n,s,t);return[a,this.A(a,n,s,t)]}async W(e,s,i){let n;await e.runCallbacks("handlerWillStart",{event:i,request:s});try{if(n=await this.K(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:t,event:i,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:i,request:s,response:n});return n}async A(e,t,s,i){let n,a;try{n=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:i,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(a=e)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:s,response:n,error:a}),t.destroy(),a)throw a}}class G extends H{async K(e,s){let i,n=await s.cacheMatch(e);if(!n)try{n=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(i=e)}if(!n)throw new t("no-response",{url:e.url,error:i});return n}}class $ extends H{constructor(e={}){super(e),this.F=e.networkTimeoutSeconds||0}async K(e,s){let i,n;try{const t=[s.fetch(e)];if(this.F){const e=A(1e3*this.F);t.push(e)}if(n=await Promise.race(t),!n)throw new Error(`Timed out the network response after ${this.F} seconds.`)}catch(e){e instanceof Error&&(i=e)}if(!n)throw new t("no-response",{url:e.url,error:i});return n}}function V(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}function z(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:i}=e;if(!i)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(i,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(i,location.href),a=new URL(i,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:a.href}}class J{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class Q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.H.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.H=e}}let Y,X;async function Z(e,s){let i=null;if(e.url){i=new URL(e.url).origin}if(i!==self.location.origin)throw new t("cross-origin-copy-response",{origin:i});const n=e.clone(),a={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(a):a,c=function(){if(void 0===Y){const e=new Response("");if("body"in e)try{new Response(e.body),Y=!0}catch(e){Y=!1}Y=!1}return Y}()?n.body:await n.blob();return new Response(c,r)}class ee extends H{constructor(e={}){e.cacheName=f(e.cacheName),super(e),this.G=!1!==e.fallbackToNetwork,this.plugins.push(ee.copyRedirectedCacheableResponsesPlugin)}async K(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.$(e,t):await this.V(e,t))}async V(e,s){let i;const n=s.params||{};if(!this.G)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=n.integrity,a=e.integrity,r=!a||a===t;i=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?a||t:void 0})),t&&r&&"no-cors"!==e.mode&&(this.J(),await s.cachePut(e,i.clone()))}return i}async $(e,s){this.J();const i=await s.fetch(e);if(!await s.cachePut(e,i.clone()))throw new t("bad-precaching-response",{url:e.url,status:i.status});return i}J(){let e=null,t=0;for(const[s,i]of this.plugins.entries())i!==ee.copyRedirectedCacheableResponsesPlugin&&(i===ee.defaultPrecacheCacheabilityPlugin&&(e=s),i.cacheWillUpdate&&t++);0===t?this.plugins.push(ee.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}ee.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},ee.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await Z(e):e};class te{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.Y=new Map,this.X=new Map,this.Z=new Map,this.C=new ee({cacheName:f(e),plugins:[...t,new Q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.C}precache(e){this.addToCacheList(e),this.ee||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.ee=!0)}addToCacheList(e){const s=[];for(const i of e){"string"==typeof i?s.push(i):i&&void 0===i.revision&&s.push(i.url);const{cacheKey:e,url:n}=z(i),a="string"!=typeof i&&i.revision?"reload":"default";if(this.Y.has(n)&&this.Y.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.Y.get(n),secondEntry:e});if("string"!=typeof i&&i.integrity){if(this.Z.has(e)&&this.Z.get(e)!==i.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this.Z.set(e,i.integrity)}if(this.Y.set(n,e),this.X.set(n,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return V(e,(async()=>{const t=new J;this.strategy.plugins.push(t);for(const[t,s]of this.Y){const i=this.Z.get(s),n=this.X.get(t),a=new Request(t,{integrity:i,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:a,event:e}))}const{updatedURLs:s,notUpdatedURLs:i}=t;return{updatedURLs:s,notUpdatedURLs:i}}))}activate(e){return V(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.Y.values()),i=[];for(const n of t)s.has(n.url)||(await e.delete(n),i.push(n.url));return{deletedURLs:i}}))}getURLsToCacheKeys(){return this.Y}getCachedURLs(){return[...this.Y.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.Y.get(t.href)}getIntegrityForCacheKey(e){return this.Z.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const se=()=>(X||(X=new te),X);class ie extends i{constructor(e,t){super((({request:s})=>{const i=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:i=!0,urlManipulation:n}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(i){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:a});for(const t of e)yield t.href}}(s.url,t)){const t=i.get(n);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var ne;self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),ne={},function(e){se().precache(e)}([{url:"assets/_commonjsHelpers.js",revision:null},{url:"assets/app.css",revision:null},{url:"assets/app.js",revision:null},{url:"assets/bins.js",revision:null},{url:"assets/configureTopbar.js",revision:null},{url:"assets/counter.js",revision:null},{url:"assets/formCities.js",revision:null},{url:"assets/formComp.js",revision:null},{url:"assets/formHook.js",revision:null},{url:"assets/great_circle.js",revision:null},{url:"assets/initYJS.js",revision:null},{url:"assets/leaflet-maptilersdk.js",revision:null},{url:"assets/leaflet-src.js",revision:null},{url:"assets/mapHookOrigin.css",revision:null},{url:"assets/mapHookOrigin.js",revision:null},{url:"assets/phoenix_live_view.esm.js",revision:null},{url:"assets/phoenix.js",revision:null},{url:"assets/preload-helper.js",revision:null},{url:"assets/pwaHook.js",revision:null},{url:"assets/solHook.js",revision:null},{url:"assets/SolidComp.js",revision:null},{url:"assets/topbar.min.js",revision:null},{url:"assets/virtual_pwa-register.js",revision:null},{url:"assets/web.js",revision:null},{url:"assets/workbox-window.prod.es5.js",revision:null},{url:"assets/y-indexeddb.js",revision:null},{url:"assets/yjs.js",revision:null},{url:"images/airplan-f84740bb1b3a55e58a9e4d51ebded79f.png",revision:"f84740bb1b3a55e58a9e4d51ebded79f"},{url:"images/airplan.png",revision:"f84740bb1b3a55e58a9e4d51ebded79f"},{url:"images/airplane-b5acaa9e8da6786db718600935f5bcbe.svg",revision:"b5acaa9e8da6786db718600935f5bcbe"},{url:"images/airplane.svg",revision:"b5acaa9e8da6786db718600935f5bcbe"},{url:"images/Elixir-dc5e47f5c026d9a15c63d2e7d17e2364.svg",revision:"dc5e47f5c026d9a15c63d2e7d17e2364"},{url:"images/Elixir.svg",revision:"dc5e47f5c026d9a15c63d2e7d17e2364"},{url:"images/icon-192-fffb16a15ad3ea41472dc1893f194ed1.png",revision:"fffb16a15ad3ea41472dc1893f194ed1"},{url:"images/icon-192.png",revision:"fffb16a15ad3ea41472dc1893f194ed1"},{url:"images/icon-512-f91d41feed42989ae4f739042b270c13.png",revision:"f91d41feed42989ae4f739042b270c13"},{url:"images/icon-512.png",revision:"f91d41feed42989ae4f739042b270c13"},{url:"images/layers-2x-324b4fcaf164735c627269504b7bc28e.png",revision:"324b4fcaf164735c627269504b7bc28e"},{url:"images/layers-2x.png",revision:"324b4fcaf164735c627269504b7bc28e"},{url:"images/layers-7cb0d2482ecadc1b80eb0abe457371b6.png",revision:"7cb0d2482ecadc1b80eb0abe457371b6"},{url:"images/layers.png",revision:"7cb0d2482ecadc1b80eb0abe457371b6"},{url:"images/leafletjs-2475a5ad63a8615ea2ce910f3a37b009.svg",revision:"2475a5ad63a8615ea2ce910f3a37b009"},{url:"images/leafletjs.svg",revision:"2475a5ad63a8615ea2ce910f3a37b009"},{url:"images/logo-06a11be1f2cdde2c851763d00bdd2e80.svg",revision:"06a11be1f2cdde2c851763d00bdd2e80"},{url:"images/logo.svg",revision:"06a11be1f2cdde2c851763d00bdd2e80"},{url:"images/maptiler-55fd2480bcdf937e3044d5edd2e1a78b.webp",revision:"55fd2480bcdf937e3044d5edd2e1a78b"},{url:"images/maptiler-d6d45a67e8821be4e8a98f2eef6bc659.png",revision:"d6d45a67e8821be4e8a98f2eef6bc659"},{url:"images/maptiler.png",revision:"d6d45a67e8821be4e8a98f2eef6bc659"},{url:"images/maptiler.webp",revision:"55fd2480bcdf937e3044d5edd2e1a78b"},{url:"images/marker-icon-2x-1c824216f354218b04b25a57e0f7ab1f.png",revision:"1c824216f354218b04b25a57e0f7ab1f"},{url:"images/marker-icon-2x.png",revision:"1c824216f354218b04b25a57e0f7ab1f"},{url:"images/marker-icon-87f6ca46ac356e81dc438589630ae107.png",revision:"87f6ca46ac356e81dc438589630ae107"},{url:"images/marker-icon.png",revision:"87f6ca46ac356e81dc438589630ae107"},{url:"images/marker-shadow-e7bd5e4b8dbbc3dfbe3ed88c098bc61e.png",revision:"e7bd5e4b8dbbc3dfbe3ed88c098bc61e"},{url:"images/marker-shadow.png",revision:"e7bd5e4b8dbbc3dfbe3ed88c098bc61e"},{url:"images/offline-c762c7f6c34083953b4ab13baadbcd3c.svg",revision:"c762c7f6c34083953b4ab13baadbcd3c"},{url:"images/offline.svg",revision:"c762c7f6c34083953b4ab13baadbcd3c"},{url:"images/online-24d7a14413944ebda517dfcb88a0c081.svg",revision:"24d7a14413944ebda517dfcb88a0c081"},{url:"images/online.svg",revision:"24d7a14413944ebda517dfcb88a0c081"},{url:"images/P404-501a8a98497684aa31659e88adf7119b.jpg",revision:"501a8a98497684aa31659e88adf7119b"},{url:"images/P404.jpg",revision:"501a8a98497684aa31659e88adf7119b"},{url:"images/solidjs-8a66d423b9275303b51ab275e94e929e.svg",revision:"8a66d423b9275303b51ab275e94e929e"},{url:"images/solidjs.svg",revision:"8a66d423b9275303b51ab275e94e929e"},{url:"images/sqlite-332417a7f4156fbd6f81615a48286092.svg",revision:"332417a7f4156fbd6f81615a48286092"},{url:"images/sqlite.svg",revision:"332417a7f4156fbd6f81615a48286092"},{url:"images/valtio2-1b8dc90169f4548cea9ef31f1918fc61.webp",revision:"1b8dc90169f4548cea9ef31f1918fc61"},{url:"images/valtio2.webp",revision:"1b8dc90169f4548cea9ef31f1918fc61"},{url:"images/vitejs-0bd2a9d3f5cd646993e1872565bf36f6.svg",revision:"0bd2a9d3f5cd646993e1872565bf36f6"},{url:"images/vitejs.svg",revision:"0bd2a9d3f5cd646993e1872565bf36f6"},{url:"images/webassembly-dd6350fa543ebb11bb99a6f131c7f5de.svg",revision:"dd6350fa543ebb11bb99a6f131c7f5de"},{url:"images/webassembly.svg",revision:"dd6350fa543ebb11bb99a6f131c7f5de"},{url:"images/workbox-5f606ed19b38382cde3ddcc1aad1c246.svg",revision:"5f606ed19b38382cde3ddcc1aad1c246"},{url:"images/workbox.svg",revision:"5f606ed19b38382cde3ddcc1aad1c246"},{url:"images/x-circle-428b1c46b1cf23a2b74c3e21780cfa7c.svg",revision:"428b1c46b1cf23a2b74c3e21780cfa7c"},{url:"images/x-circle.svg",revision:"428b1c46b1cf23a2b74c3e21780cfa7c"},{url:"images/yjs-caace6cafaec00a57d71a4f8cc52132c.png",revision:"caace6cafaec00a57d71a4f8cc52132c"},{url:"images/yjs-e51539acd5f6d01d14eebe6029a05c08.webp",revision:"e51539acd5f6d01d14eebe6029a05c08"},{url:"images/yjs.png",revision:"caace6cafaec00a57d71a4f8cc52132c"},{url:"images/yjs.webp",revision:"e51539acd5f6d01d14eebe6029a05c08"},{url:"images/zig-7431b66e11d689c489b28abdf312dfec.svg",revision:"7431b66e11d689c489b28abdf312dfec"},{url:"images/zig.svg",revision:"7431b66e11d689c489b28abdf312dfec"},{url:"/",revision:null},{url:"/map",revision:null},{url:"manifest.webmanifest",revision:"eeebd8da55eaab73f22eb1afe6b4e81d"}]),function(e){const t=se();o(new ie(t,e))}(ne),self.addEventListener("activate",(e=>{const t=f();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),o((({url:e})=>"https://api.maptiler.com/"===e.origin),new class extends H{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(M)}async K(e,s){const i=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(i);let n,a=await s.cacheMatch(e);if(a);else try{a=await i}catch(e){e instanceof Error&&(n=e)}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}({cacheName:"tiles",plugins:[new P({maxEntries:1e3,maxAgeSeconds:3600}),{fetchDidFail:async({request:e})=>{console.warn("Tile request failed:",e.url)}}]}),"GET"),o((({url:e})=>["/assets/","/images/"].some((t=>e.pathname.startsWith(t)))),new G({cacheName:"static",matchOptions:{ignoreVary:!0},plugins:[new P({maxAgeSeconds:31536e3,maxEntries:200})]}),"GET"),o((({request:e})=>"script"===e.destination),new G({cacheName:"scripts",plugins:[new P({maxAgeSeconds:604800,maxEntries:50})]}),"GET"),o((({url:e})=>["https://fonts.googleapis.com"].some((t=>e.href.startsWith(t)))),new G({cacheName:"external",matchOptions:{ignoreVary:!0},plugins:[new P({maxAgeSeconds:31536e3,maxEntries:500})]}),"GET"),o((({url:e})=>e.pathname.startsWith("/live/longpoll")),new $,"GET"),o((({url:e})=>e.pathname.startsWith("/live/websocket")),new $,"GET"),o((({url:e})=>e.pathname.startsWith("/test")),new $,"GET"),o((({url:e})=>e.pathname.startsWith("/phoenix")),new $,"GET"),o((({url:e})=>e.pathname.startsWith("/map")||e.pathname.startsWith("/")),new class extends H{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(M),this.F=e.networkTimeoutSeconds||0}async K(e,s){const i=[],n=[];let a;if(this.F){const{id:t,promise:r}=this.te({request:e,logs:i,handler:s});a=t,n.push(r)}const r=this.se({timeoutId:a,request:e,logs:i,handler:s});n.push(r);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await r)());if(!c)throw new t("no-response",{url:e.url});return c}te({request:e,logs:t,handler:s}){let i;return{promise:new Promise((t=>{i=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this.F)})),id:i}}async se({timeoutId:e,request:t,logs:s,handler:i}){let n,a;try{a=await i.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}return e&&clearTimeout(e),!n&&a||(a=await i.cacheMatch(t)),a}}({plugins:[{fetchDidFail:async({request:e})=>{console.warn("Online status request failed:",e.url)}}]}),"GET");
