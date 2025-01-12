try{self["workbox:core:7.2.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.2.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=s(e)}}class i extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let a=r&&r.handler;const o=e.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:e,event:t,params:i})}catch(e){c=Promise.reject(e)}const l=r&&r.catchHandler;return c instanceof Promise&&(this.o||l)&&(c=c.catch((async n=>{if(l)try{return await l.handle({url:s,request:e,event:t,params:i})}catch(e){e instanceof Error&&(n=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw n}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:e,sameOrigin:t,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let a;const o=()=>(a||(a=new r,a.addFetchListener(),a.addCacheListener()),a);function c(e,s,r){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n((({url:e})=>e.href===t.href),s,r)}else if(e instanceof RegExp)a=new i(e,s,r);else if("function"==typeof e)a=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return o().registerRoute(a),a}const l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[l.prefix,e,l.suffix].filter((e=>e&&e.length>0)).join("-"),h=e=>e||u(l.precache),f=e=>e||u(l.runtime);function d(e){e.then((()=>{}))}const w=new Set;function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)({}).hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},p.apply(null,arguments)}let g,m;const y=new WeakMap,v=new WeakMap,b=new WeakMap,R=new WeakMap,q=new WeakMap;let x={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return v.get(e);if("objectStoreNames"===t)return e.objectStoreNames||b.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return j(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function D(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(m||(m=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(U(this),t),j(y.get(this))}:function(...t){return j(e.apply(U(this),t))}:function(t,...s){const n=e.call(U(this),t,...s);return b.set(n,t.sort?t.sort():[t]),j(n)}}function E(e){return"function"==typeof e?D(e):(e instanceof IDBTransaction&&function(e){if(v.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",r),e.removeEventListener("abort",r)},i=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",i),e.addEventListener("error",r),e.addEventListener("abort",r)}));v.set(e,t)}(e),t=e,(g||(g=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,x):e);var t}function j(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",i),e.removeEventListener("error",r)},i=()=>{t(j(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",i),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&y.set(t,e)})).catch((()=>{})),q.set(t,e),t}(e);if(R.has(e))return R.get(e);const t=E(e);return t!==e&&(R.set(e,t),q.set(t,e)),t}const U=e=>q.get(e);const k=["get","getKey","getAll","getAllKeys","count"],T=["put","add","delete","clear"],I=new Map;function L(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(I.get(t))return I.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,i=T.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!k.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(t.shift())),(await Promise.all([a[s](...t),i&&r.done]))[0]};return I.set(t,r),r}x=(e=>p({},e,{get:(t,s,n)=>L(t,s)||e.get(t,s,n),has:(t,s)=>!!L(t,s)||e.has(t,s)}))(x);try{self["workbox:expiration:7.2.0"]&&_()}catch(e){}const N="cache-entries",C=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class O{constructor(e){this.l=null,this.u=e}h(e){const t=e.createObjectStore(N,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}p(e){this.h(e),this.u&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(e=>t(e.oldVersion,e))),j(s).then((()=>{}))}(this.u)}async setTimestamp(e,t){const s={url:e=C(e),timestamp:t,cacheName:this.u,id:this.m(e)},n=(await this.getDb()).transaction(N,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(N,this.m(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(N).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.u&&(e&&s.timestamp<e||t&&r>=t?i.push(n.value):r++),n=await n.continue()}const a=[];for(const e of i)await s.delete(N,e.id),a.push(e.url);return a}m(e){return this.u+"|"+C(e)}async getDb(){return this.l||(this.l=await function(e,t,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(e,t),o=j(a);return n&&a.addEventListener("upgradeneeded",(e=>{n(j(a.result),e.oldVersion,e.newVersion,j(a.transaction),e)})),s&&a.addEventListener("blocked",(e=>s(e.oldVersion,e.newVersion,e))),o.then((e=>{r&&e.addEventListener("close",(()=>r())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.l}}class B{constructor(e,t={}){this.v=!1,this.R=!1,this.q=t.maxEntries,this.D=t.maxAgeSeconds,this.j=t.matchOptions,this.u=e,this.U=new O(e)}async expireEntries(){if(this.v)return void(this.R=!0);this.v=!0;const e=this.D?Date.now()-1e3*this.D:0,t=await this.U.expireEntries(e,this.q),s=await self.caches.open(this.u);for(const e of t)await s.delete(e,this.j);this.v=!1,this.R&&(this.R=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.U.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.D){const t=await this.U.getTimestamp(e),s=Date.now()-1e3*this.D;return void 0===t||t<s}return!1}async delete(){this.R=!1,await this.U.expireEntries(1/0)}}class P{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this._(n),r=this.k(s);d(r.expireEntries());const a=r.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.k(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.T=e,this.D=e.maxAgeSeconds,this.I=new Map,e.purgeOnQuotaError&&function(e){w.add(e)}((()=>this.deleteCacheAndMetadata()))}k(e){if(e===f())throw new t("expire-custom-caches-only");let s=this.I.get(e);return s||(s=new B(e,this.T),this.I.set(e,s)),s}_(e){if(!this.D)return!0;const t=this.L(e);if(null===t)return!0;return t>=Date.now()-1e3*this.D}L(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.I)await self.caches.delete(e),await t.delete();this.I=new Map}}try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}const S={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};function M(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class W{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function A(e){return new Promise((t=>setTimeout(t,e)))}function K(e){return"string"==typeof e?new Request(e):e}class F{constructor(e,t){this.N={},Object.assign(this,t),this.event=t.event,this.C=e,this.O=new W,this.B=[],this.P=[...e.plugins],this.S=new Map;for(const e of this.P)this.S.set(e,{});this.event.waitUntil(this.O.promise)}async fetch(e){const{event:s}=this;let n=K(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this.C.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw i&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:i.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=K(e);let s;const{cacheName:n,matchOptions:i}=this.C,r=await this.getCacheKey(t,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const n=K(e);await A(0);const i=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const a=await this.M(s);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.C,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),h=u?await async function(e,t,s,n){const i=M(t.url,s);if(t.url===i)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await e.keys(t,r);for(const t of a)if(i===M(t.url,s))return e.match(t,n)}(l,i.clone(),["__WB_REVISION__"],c):null;try{await l.put(i,u?a.clone():a)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:h,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.N[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=K(await e({mode:t,request:n,event:this.event,params:this.params}));this.N[s]=n}return this.N[s]}hasCallback(e){for(const t of this.C.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.C.plugins)if("function"==typeof t[e]){const s=this.S.get(t),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return t[e](i)};yield n}}waitUntil(e){return this.B.push(e),e}async doneWaiting(){let e;for(;e=this.B.shift();)await e}destroy(){this.O.resolve(null)}async M(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class H{constructor(e={}){this.cacheName=f(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,i=new F(this,{event:t,request:s,params:n}),r=this.W(i,s,t);return[r,this.A(r,i,s,t)]}async W(e,s,n){let i;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this.K(s,e),!i||"error"===i.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:t,event:n,request:s}),i)break;if(!i)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))i=await t({event:n,request:s,response:i});return i}async A(e,t,s,n){let i,r;try{i=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),t.destroy(),r)throw r}}class G extends H{async K(e,s){let n,i=await s.cacheMatch(e);if(!i)try{i=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(n=e)}if(!i)throw new t("no-response",{url:e.url,error:n});return i}}class $ extends H{constructor(e={}){super(e),this.F=e.networkTimeoutSeconds||0}async K(e,s){let n,i;try{const t=[s.fetch(e)];if(this.F){const e=A(1e3*this.F);t.push(e)}if(i=await Promise.race(t),!i)throw new Error(`Timed out the network response after ${this.F} seconds.`)}catch(e){e instanceof Error&&(n=e)}if(!i)throw new t("no-response",{url:e.url,error:n});return i}}function V(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}function J(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class z{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class Q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.H.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.H=e}}let Y,X;async function Z(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const i=e.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=s?s(r):r,o=function(){if(void 0===Y){const e=new Response("");if("body"in e)try{new Response(e.body),Y=!0}catch(e){Y=!1}Y=!1}return Y}()?i.body:await i.blob();return new Response(o,a)}class ee extends H{constructor(e={}){e.cacheName=h(e.cacheName),super(e),this.G=!1!==e.fallbackToNetwork,this.plugins.push(ee.copyRedirectedCacheableResponsesPlugin)}async K(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.$(e,t):await this.V(e,t))}async V(e,s){let n;const i=s.params||{};if(!this.G)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=i.integrity,r=e.integrity,a=!r||r===t;n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||t:void 0})),t&&a&&"no-cors"!==e.mode&&(this.J(),await s.cachePut(e,n.clone()))}return n}async $(e,s){this.J();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}J(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==ee.copyRedirectedCacheableResponsesPlugin&&(n===ee.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(ee.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}ee.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},ee.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await Z(e):e};class te{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.Y=new Map,this.X=new Map,this.Z=new Map,this.C=new ee({cacheName:h(e),plugins:[...t,new Q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.C}precache(e){this.addToCacheList(e),this.ee||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.ee=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=J(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.Y.has(i)&&this.Y.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.Y.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.Z.has(e)&&this.Z.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.Z.set(e,n.integrity)}if(this.Y.set(i,e),this.X.set(i,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return V(e,(async()=>{const t=new z;this.strategy.plugins.push(t);for(const[t,s]of this.Y){const n=this.Z.get(s),i=this.X.get(t),r=new Request(t,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return V(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.Y.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.Y}getCachedURLs(){return[...this.Y.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.Y.get(t.href)}getIntegrityForCacheKey(e){return this.Z.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const se=()=>(X||(X=new te),X);class ne extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const i of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(i);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var ie;self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),ie={},function(e){se().precache(e)}([{url:"assets/app.css",revision:null},{url:"assets/app.js",revision:null},{url:"assets/bins.js",revision:null},{url:"assets/counter.js",revision:null},{url:"assets/formCities.js",revision:null},{url:"assets/formHook.js",revision:null},{url:"assets/great_circle.js",revision:null},{url:"assets/initYJS.js",revision:null},{url:"assets/leaflet-src.js",revision:null},{url:"assets/mapHookOrigin.css",revision:null},{url:"assets/mapHookOrigin.js",revision:null},{url:"assets/phoenix_live_view.esm.js",revision:null},{url:"assets/phoenix.js",revision:null},{url:"assets/preload-helper.js",revision:null},{url:"assets/progressCircle.js",revision:null},{url:"assets/pwaHook.js",revision:null},{url:"assets/pwaHooks.js",revision:null},{url:"assets/refreshSW.js",revision:null},{url:"assets/solHook.js",revision:null},{url:"assets/SolidComp.js",revision:null},{url:"assets/topbar.js",revision:null},{url:"assets/virtual_pwa-register.js",revision:null},{url:"assets/web.js",revision:null},{url:"assets/workbox-window.prod.es5.js",revision:null},{url:"assets/y-indexeddb.js",revision:null},{url:"assets/yjs.js",revision:null},{url:"images/airplan.png",revision:"f84740bb1b3a55e58a9e4d51ebded79f"},{url:"images/airplane.svg",revision:"b5acaa9e8da6786db718600935f5bcbe"},{url:"images/Elixir.svg",revision:"dc5e47f5c026d9a15c63d2e7d17e2364"},{url:"images/icon-192.png",revision:"fffb16a15ad3ea41472dc1893f194ed1"},{url:"images/icon-512.png",revision:"f91d41feed42989ae4f739042b270c13"},{url:"images/layers-2x.png",revision:"324b4fcaf164735c627269504b7bc28e"},{url:"images/layers.png",revision:"7cb0d2482ecadc1b80eb0abe457371b6"},{url:"images/leafletjs.svg",revision:"2475a5ad63a8615ea2ce910f3a37b009"},{url:"images/logo.svg",revision:"06a11be1f2cdde2c851763d00bdd2e80"},{url:"images/marker-icon-2x.png",revision:"1c824216f354218b04b25a57e0f7ab1f"},{url:"images/marker-icon.png",revision:"87f6ca46ac356e81dc438589630ae107"},{url:"images/marker-shadow.png",revision:"e7bd5e4b8dbbc3dfbe3ed88c098bc61e"},{url:"images/offline.svg",revision:"c762c7f6c34083953b4ab13baadbcd3c"},{url:"images/online.svg",revision:"24d7a14413944ebda517dfcb88a0c081"},{url:"images/solidjs.svg",revision:"8a66d423b9275303b51ab275e94e929e"},{url:"images/sqlite.svg",revision:"332417a7f4156fbd6f81615a48286092"},{url:"images/vitejs.svg",revision:"cad8797b346f70c027cee960acc1ff97"},{url:"images/webassembly.svg",revision:"dd6350fa543ebb11bb99a6f131c7f5de"},{url:"images/workbox.svg",revision:"5f606ed19b38382cde3ddcc1aad1c246"},{url:"images/x-circle.svg",revision:"428b1c46b1cf23a2b74c3e21780cfa7c"},{url:"images/yjs.png",revision:"caace6cafaec00a57d71a4f8cc52132c"},{url:"images/zig.svg",revision:"7431b66e11d689c489b28abdf312dfec"},{url:"/",revision:null},{url:"/map",revision:null},{url:"manifest.webmanifest",revision:"eeebd8da55eaab73f22eb1afe6b4e81d"}]),function(e){const t=se();c(new ne(t,e))}(ie),self.addEventListener("activate",(e=>{const t=h();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),c((({url:e})=>"https://tile.openstreetmap.org"===e.origin),new class extends H{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(S)}async K(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(n);let i,r=await s.cacheMatch(e);if(r);else try{r=await n}catch(e){e instanceof Error&&(i=e)}if(!r)throw new t("no-response",{url:e.url,error:i});return r}}({cacheName:"tiles",plugins:[new P({maxEntries:1e3,maxAgeSeconds:3600}),{fetchDidFail:async({request:e})=>{console.warn("Tile request failed:",e.url)}}]}),"GET"),c((({url:e})=>["/assets/","/images/"].some((t=>e.pathname.startsWith(t)))),new G({cacheName:"static",matchOptions:{ignoreVary:!0},plugins:[new P({maxAgeSeconds:31536e3,maxEntries:200})]}),"GET"),c((({request:e})=>"script"===e.destination),new G({cacheName:"scripts",plugins:[new P({maxAgeSeconds:604800,maxEntries:50})]}),"GET"),c((({url:e})=>["https://fonts.googleapis.com"].some((t=>e.href.startsWith(t)))),new G({cacheName:"external",matchOptions:{ignoreVary:!0},plugins:[new P({maxAgeSeconds:31536e3,maxEntries:500})]}),"GET"),c((({url:e})=>e.pathname.startsWith("/live/longpoll")),new $,"GET"),c((({url:e})=>e.pathname.startsWith("/live/websocket")),new $,"GET"),c((({url:e})=>e.pathname.startsWith("/test")),new $,"GET"),c((({url:e})=>e.pathname.startsWith("/phoenix")),new $,"GET"),c((({url:e})=>e.pathname.startsWith("/map")||e.pathname.startsWith("/")),new class extends H{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(S),this.F=e.networkTimeoutSeconds||0}async K(e,s){const n=[],i=[];let r;if(this.F){const{id:t,promise:a}=this.te({request:e,logs:n,handler:s});r=t,i.push(a)}const a=this.se({timeoutId:r,request:e,logs:n,handler:s});i.push(a);const o=await s.waitUntil((async()=>await s.waitUntil(Promise.race(i))||await a)());if(!o)throw new t("no-response",{url:e.url});return o}te({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this.F)})),id:n}}async se({timeoutId:e,request:t,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(t)}catch(e){e instanceof Error&&(i=e)}return e&&clearTimeout(e),!i&&r||(r=await n.cacheMatch(t)),r}}({plugins:[{fetchDidFail:async({request:e})=>{console.warn("Online status request failed:",e.url)}}]}),"GET");
