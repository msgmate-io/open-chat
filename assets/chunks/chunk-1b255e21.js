import{j as t,v as fe,r as l}from"./chunk-a2378650.js";import{j as D,c as $,N as Ge,O as Ve,e as Be,f as Ue,g as Ye,_ as Te}from"./chunk-b3511bc0.js";import{$ as $e,a as Se,b as oe,d as se,e as We,f as Ee,g as Ce,D as Je}from"./chunk-54be2a6f.js";function xe(r){const e={blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{children:"Welcome to Open Chat Docs!"}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"Docs are still work in progress feel free to open a PR"}),`
`]}),`
`,t.jsx(e.p,{children:"Generaly the repo comes with 3 services:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"backend"}),": ",t.jsx(fe,{href:"https://www.djangoproject.com/",target:"_blank",children:"Django"})," + Rest-Framework + Django-Channels"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"frontend"}),": Express + Vike"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"proxy"}),": Nginx"]}),`
`]}),`
`,t.jsxs(e.p,{children:["All components are containerized, check ",t.jsx(fe,{href:"/docs/dev-docker",children:"docker development"}),"."]})]})}function Qe(r={}){const{wrapper:e}=r.components||{};return e?t.jsx(e,{...r,children:t.jsx(xe,{...r})}):xe(r)}function ge(r){const e={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{children:"Docker Development"}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"✅ recommended way to develop for web!"}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`docker compose up --build
`})}),`
`,t.jsxs(e.p,{children:["Visit ",t.jsx(e.code,{children:"localhost"})," ( http port 80 ), live reload & dev mode enabled by default."]}),`
`,t.jsx(e.h2,{children:"Capacitor Development"}),`
`,t.jsx(e.p,{children:"Be sure to have all required android build tools installed, check capacitor docs for more info."}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`npx cap sync
npx cap run android -l --external
`})}),`
`,t.jsx(e.h2,{children:"Shell in container"}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsxs(e.li,{children:["Shell on container ",t.jsx(e.code,{children:"docker compose exec <service> sh"})]}),`
`,t.jsxs(e.li,{children:["Do stuff e.g.: ",t.jsx(e.em,{children:"Install Packages"})," ",t.jsx(e.code,{children:"pip3 install ..."})," / ",t.jsx(e.code,{children:"npm run dev"})]}),`
`]}),`
`,t.jsx(e.h2,{children:"Updating Api Client"}),`
`,t.jsxs(e.p,{children:["Generate typed api client outside the container: ",t.jsx(e.code,{children:"cd frontend && npm run generate-api"}),", consider:"]}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsx(e.li,{children:"updates to the api client should be commited"}),`
`,t.jsxs(e.li,{children:["Api is generated based in infered types from ",t.jsx(e.code,{children:"rest_framework"})," and ",t.jsx(e.code,{children:"drf_spectacular"})]}),`
`,t.jsxs(e.li,{children:["Use ",t.jsx(e.code,{children:"rest_framework.serializers"})," ( and ",t.jsx(e.code,{children:"ModelSerializer"})," ) where possible"]}),`
`,t.jsxs(e.li,{children:["Use ",t.jsx(e.code,{children:"drf_spectacular.utils.extend_schema"})," to extend incomplete schemas"]}),`
`]}),`
`,t.jsxs(e.p,{children:["View the swagger-ui at ",t.jsx(e.code,{children:"/api/schema/swagger-ui/"})]})]})}function Ze(r={}){const{wrapper:e}=r.components||{};return e?t.jsx(e,{...r,children:t.jsx(ge,{...r})}):ge(r)}function ve(r){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{children:"Helm deployment"}),`
`,t.jsx(e.p,{children:"Backend & Frontend can be deployed seperately but a current image url for both must be provided."}),`
`,t.jsxs(e.h2,{children:["Locally using ",t.jsx(e.code,{children:"microk8s"})]}),`
`,t.jsxs(e.p,{children:["Make sure you have ",t.jsx(e.a,{href:"https://microk8s.io/docs/getting-started",children:"setup & installed"})," ",t.jsx(e.code,{children:"microk8s"}),"."]}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[`We utelize microk8s for easly local developement to work with managed k8s ( AKS or EKS ) you may need to add extra annotations to the ingress or add a loadbalancer.
But for small scale deployment microk8s can also work `,t.jsx(e.a,{href:"https://blog.t1m.me/blog/microk8s-on-vps",children:"checkout tim's blog post on how this can be set-up"})]}),`
`]}),`
`,t.jsx(e.h3,{children:"Build & Install Helm"}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsxs(e.li,{children:["Setup the env, ",t.jsx(e.code,{children:"vim .env"})]}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`IMAGE_PREFIX="localhost:32000/open-chat-"
IMAGE_TAG="latest"
`})}),`
`,t.jsxs(e.ol,{start:"2",children:[`
`,t.jsx(e.li,{children:"Build Backend & Frontend"}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`docker compose -f docker-compose.pro.yaml build
`})}),`
`,t.jsxs(e.ol,{start:"3",children:[`
`,t.jsx(e.li,{children:"Push to local micok8s registry"}),`
`]}),`
`,t.jsx(e.p,{children:"Setup and install microk8s on your system, then:"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`microk8s enable registry
docker compose -f docker-compose.pro.yaml push
`})}),`
`,t.jsxs(e.ol,{start:"4",children:[`
`,t.jsxs(e.li,{children:["Check default helm ",t.jsx(e.code,{children:"values.yaml"})," ( should be good to go )"]}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`microk8s helm install -f ./helm/values.yaml open-chat ./helm
`})}),`
`,t.jsx(e.h4,{children:"Deploying services individually"}),`
`,t.jsxs(e.p,{children:["Currently ",t.jsx(e.code,{children:"frontend"})," & ",t.jsx(e.code,{children:"backend"})," services may be deployed seperately."]}),`
`,t.jsxs(e.ol,{children:[`
`,t.jsx(e.li,{children:"Build & Push only one service"}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`docker compose -f docker-compose.pro.yaml <service-name> build
docker compose -f docker-compose.pro.yaml <service-name> push
`})}),`
`,t.jsxs(e.ol,{start:"2",children:[`
`,t.jsxs(e.li,{children:["Update OR retrieve the current helm ",t.jsx(e.code,{children:"values.yaml"})]}),`
`]}),`
`,t.jsxs(e.p,{children:["Either edit ",t.jsx(e.code,{children:"helm/values.yaml"}),` to include you already deployed images.
Or retrieve the current image url's:`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`microk8s helm get values open-chat -o yaml > ./helm/values.yaml
`})}),`
`,t.jsxs(e.ol,{start:"3",children:[`
`,t.jsxs(e.li,{children:["Update the image url in ",t.jsx(e.code,{children:"helm/values.yaml"})," and install the service"]}),`
`]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`microk8s helm upgrade -f ./helm/values.yaml open-chat ./helm
`})}),`
`,t.jsx(e.h3,{children:"Uninstall Helm"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-bash",children:`microk8s helm uninstall open-chat
`})})]})}function et(r={}){const{wrapper:e}=r.components||{};return e?t.jsx(e,{...r,children:t.jsx(ve,{...r})}):ve(r)}const be={sidebarNav:[{title:"Getting Started",baseurl:"/docs",items:[{title:"Introduction",href:"/",items:[]},{title:"Docker Development",href:"/dev-docker",items:[]},{title:"Local Installation",href:"/dev-local",items:[]},{title:"Helm deployment",href:"/helm-deployment",items:[]}]}]},Ht=[{route:"",component:Qe},{route:"dev-docker",component:Ze},{route:"helm-deployment",component:et}];var je=1,tt=.9,rt=.8,nt=.17,te=.1,re=.999,lt=.9999,at=.99,ot=/[\\\/_+.#"@\[\(\{&]/,st=/[\\\/_+.#"@\[\(\{&]/g,ct=/[\s-]/,Re=/[\s-]/g;function le(r,e,n,o,s,d,m){if(d===e.length)return s===r.length?je:at;var f=`${s},${d}`;if(m[f]!==void 0)return m[f];for(var g=o.charAt(d),p=n.indexOf(g,s),u=0,x,N,k,E;p>=0;)x=le(r,e,n,o,p+1,d+1,m),x>u&&(p===s?x*=je:ot.test(r.charAt(p-1))?(x*=rt,k=r.slice(s,p-1).match(st),k&&s>0&&(x*=Math.pow(re,k.length))):ct.test(r.charAt(p-1))?(x*=tt,E=r.slice(s,p-1).match(Re),E&&s>0&&(x*=Math.pow(re,E.length))):(x*=nt,s>0&&(x*=Math.pow(re,p-s))),r.charAt(p)!==e.charAt(d)&&(x*=lt)),(x<te&&n.charAt(p-1)===o.charAt(d+1)||o.charAt(d+1)===o.charAt(d)&&n.charAt(p-1)!==o.charAt(d))&&(N=le(r,e,n,o,p+1,d+2,m),N*te>x&&(x=N*te)),x>u&&(u=x),p=n.indexOf(g,p+1);return m[f]=u,u}function ye(r){return r.toLowerCase().replace(Re," ")}function dt(r,e,n){return r=n&&n.length>0?`${r+" "+n.join(" ")}`:r,le(r,e,ye(r),ye(e),0,0,{})}var z='[cmdk-group=""]',ne='[cmdk-group-items=""]',it='[cmdk-group-heading=""]',ce='[cmdk-item=""]',ke=`${ce}:not([aria-disabled="true"])`,ae="cmdk-item-select",A="data-value",ut=(r,e,n)=>dt(r,e,n),De=l.createContext(void 0),V=()=>l.useContext(De),Ie=l.createContext(void 0),de=()=>l.useContext(Ie),Ae=l.createContext(void 0),_e=l.forwardRef((r,e)=>{let n=F(()=>{var a,i;return{search:"",value:(i=(a=r.value)!=null?a:r.defaultValue)!=null?i:"",filtered:{count:0,items:new Map,groups:new Set}}}),o=F(()=>new Set),s=F(()=>new Map),d=F(()=>new Map),m=F(()=>new Set),f=Me(r),{label:g,children:p,value:u,onValueChange:x,filter:N,shouldFilter:k,loop:E,disablePointerSelection:L=!1,vimBindings:C=!0,...q}=r,B=l.useId(),U=l.useId(),Y=l.useId(),R=l.useRef(null),b=kt();_(()=>{if(u!==void 0){let a=u.trim();n.current.value=a,y.emit()}},[u]),_(()=>{b(6,ie)},[]);let y=l.useMemo(()=>({subscribe:a=>(m.current.add(a),()=>m.current.delete(a)),snapshot:()=>n.current,setState:(a,i,h)=>{var c,v,j;if(!Object.is(n.current[a],i)){if(n.current[a]=i,a==="search")Q(),P(),b(1,H);else if(a==="value"&&(h||b(5,ie),((c=f.current)==null?void 0:c.value)!==void 0)){let S=i??"";(j=(v=f.current).onValueChange)==null||j.call(v,S);return}y.emit()}},emit:()=>{m.current.forEach(a=>a())}}),[]),X=l.useMemo(()=>({value:(a,i,h)=>{var c;i!==((c=d.current.get(a))==null?void 0:c.value)&&(d.current.set(a,{value:i,keywords:h}),n.current.filtered.items.set(a,T(i,h)),b(2,()=>{P(),y.emit()}))},item:(a,i)=>(o.current.add(a),i&&(s.current.has(i)?s.current.get(i).add(a):s.current.set(i,new Set([a]))),b(3,()=>{Q(),P(),n.current.value||H(),y.emit()}),()=>{d.current.delete(a),o.current.delete(a),n.current.filtered.items.delete(a);let h=K();b(4,()=>{Q(),(h==null?void 0:h.getAttribute("id"))===a&&H(),y.emit()})}),group:a=>(s.current.has(a)||s.current.set(a,new Set),()=>{d.current.delete(a),s.current.delete(a)}),filter:()=>f.current.shouldFilter,label:g||r["aria-label"],disablePointerSelection:L,listId:B,inputId:Y,labelId:U,listInnerRef:R}),[]);function T(a,i){var h,c;let v=(c=(h=f.current)==null?void 0:h.filter)!=null?c:ut;return a?v(a,n.current.search,i):0}function P(){if(!n.current.search||f.current.shouldFilter===!1)return;let a=n.current.filtered.items,i=[];n.current.filtered.groups.forEach(c=>{let v=s.current.get(c),j=0;v.forEach(S=>{let I=a.get(S);j=Math.max(I,j)}),i.push([c,j])});let h=R.current;O().sort((c,v)=>{var j,S;let I=c.getAttribute("id"),W=v.getAttribute("id");return((j=a.get(W))!=null?j:0)-((S=a.get(I))!=null?S:0)}).forEach(c=>{let v=c.closest(ne);v?v.appendChild(c.parentElement===v?c:c.closest(`${ne} > *`)):h.appendChild(c.parentElement===h?c:c.closest(`${ne} > *`))}),i.sort((c,v)=>v[1]-c[1]).forEach(c=>{let v=R.current.querySelector(`${z}[${A}="${encodeURIComponent(c[0])}"]`);v==null||v.parentElement.appendChild(v)})}function H(){let a=O().find(h=>h.getAttribute("aria-disabled")!=="true"),i=a==null?void 0:a.getAttribute(A);y.setState("value",i||void 0)}function Q(){var a,i,h,c;if(!n.current.search||f.current.shouldFilter===!1){n.current.filtered.count=o.current.size;return}n.current.filtered.groups=new Set;let v=0;for(let j of o.current){let S=(i=(a=d.current.get(j))==null?void 0:a.value)!=null?i:"",I=(c=(h=d.current.get(j))==null?void 0:h.keywords)!=null?c:[],W=T(S,I);n.current.filtered.items.set(j,W),W>0&&v++}for(let[j,S]of s.current)for(let I of S)if(n.current.filtered.items.get(I)>0){n.current.filtered.groups.add(j);break}n.current.filtered.count=v}function ie(){var a,i,h;let c=K();c&&(((a=c.parentElement)==null?void 0:a.firstChild)===c&&((h=(i=c.closest(z))==null?void 0:i.querySelector(it))==null||h.scrollIntoView({block:"nearest"})),c.scrollIntoView({block:"nearest"}))}function K(){var a;return(a=R.current)==null?void 0:a.querySelector(`${ce}[aria-selected="true"]`)}function O(){var a;return Array.from((a=R.current)==null?void 0:a.querySelectorAll(ke))}function Z(a){let i=O()[a];i&&y.setState("value",i.getAttribute(A))}function ee(a){var i;let h=K(),c=O(),v=c.findIndex(S=>S===h),j=c[v+a];(i=f.current)!=null&&i.loop&&(j=v+a<0?c[c.length-1]:v+a===c.length?c[0]:c[v+a]),j&&y.setState("value",j.getAttribute(A))}function ue(a){let i=K(),h=i==null?void 0:i.closest(z),c;for(;h&&!c;)h=a>0?jt(h,z):yt(h,z),c=h==null?void 0:h.querySelector(ke);c?y.setState("value",c.getAttribute(A)):ee(a)}let me=()=>Z(O().length-1),pe=a=>{a.preventDefault(),a.metaKey?me():a.altKey?ue(1):ee(1)},he=a=>{a.preventDefault(),a.metaKey?Z(0):a.altKey?ue(-1):ee(-1)};return l.createElement(D.div,{ref:e,tabIndex:-1,...q,"cmdk-root":"",onKeyDown:a=>{var i;if((i=q.onKeyDown)==null||i.call(q,a),!a.defaultPrevented)switch(a.key){case"n":case"j":{C&&a.ctrlKey&&pe(a);break}case"ArrowDown":{pe(a);break}case"p":case"k":{C&&a.ctrlKey&&he(a);break}case"ArrowUp":{he(a);break}case"Home":{a.preventDefault(),Z(0);break}case"End":{a.preventDefault(),me();break}case"Enter":if(!a.nativeEvent.isComposing&&a.keyCode!==229){a.preventDefault();let h=K();if(h){let c=new Event(ae);h.dispatchEvent(c)}}}}},l.createElement("label",{"cmdk-label":"",htmlFor:X.inputId,id:X.labelId,style:Nt},g),J(r,a=>l.createElement(Ie.Provider,{value:y},l.createElement(De.Provider,{value:X},a))))}),mt=l.forwardRef((r,e)=>{var n,o;let s=l.useId(),d=l.useRef(null),m=l.useContext(Ae),f=V(),g=Me(r),p=(o=(n=g.current)==null?void 0:n.forceMount)!=null?o:m==null?void 0:m.forceMount;_(()=>{if(!p)return f.item(s,m==null?void 0:m.id)},[p]);let u=Le(s,d,[r.value,r.children,d],r.keywords),x=de(),N=M(b=>b.value&&b.value===u.current),k=M(b=>p||f.filter()===!1?!0:b.search?b.filtered.items.get(s)>0:!0);l.useEffect(()=>{let b=d.current;if(!(!b||r.disabled))return b.addEventListener(ae,E),()=>b.removeEventListener(ae,E)},[k,r.onSelect,r.disabled]);function E(){var b,y;L(),(y=(b=g.current).onSelect)==null||y.call(b,u.current)}function L(){x.setState("value",u.current,!0)}if(!k)return null;let{disabled:C,value:q,onSelect:B,forceMount:U,keywords:Y,...R}=r;return l.createElement(D.div,{ref:G([d,e]),...R,id:s,"cmdk-item":"",role:"option","aria-disabled":!!C,"aria-selected":!!N,"data-disabled":!!C,"data-selected":!!N,onPointerMove:C||f.disablePointerSelection?void 0:L,onClick:C?void 0:E},r.children)}),pt=l.forwardRef((r,e)=>{let{heading:n,children:o,forceMount:s,...d}=r,m=l.useId(),f=l.useRef(null),g=l.useRef(null),p=l.useId(),u=V(),x=M(k=>s||u.filter()===!1?!0:k.search?k.filtered.groups.has(m):!0);_(()=>u.group(m),[]),Le(m,f,[r.value,r.heading,g]);let N=l.useMemo(()=>({id:m,forceMount:s}),[s]);return l.createElement(D.div,{ref:G([f,e]),...d,"cmdk-group":"",role:"presentation",hidden:x?void 0:!0},n&&l.createElement("div",{ref:g,"cmdk-group-heading":"","aria-hidden":!0,id:p},n),J(r,k=>l.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":n?p:void 0},l.createElement(Ae.Provider,{value:N},k))))}),ht=l.forwardRef((r,e)=>{let{alwaysRender:n,...o}=r,s=l.useRef(null),d=M(m=>!m.search);return!n&&!d?null:l.createElement(D.div,{ref:G([s,e]),...o,"cmdk-separator":"",role:"separator"})}),ft=l.forwardRef((r,e)=>{let{onValueChange:n,...o}=r,s=r.value!=null,d=de(),m=M(u=>u.search),f=M(u=>u.value),g=V(),p=l.useMemo(()=>{var u;let x=(u=g.listInnerRef.current)==null?void 0:u.querySelector(`${ce}[${A}="${encodeURIComponent(f)}"]`);return x==null?void 0:x.getAttribute("id")},[]);return l.useEffect(()=>{r.value!=null&&d.setState("search",r.value)},[r.value]),l.createElement(D.input,{ref:e,...o,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":g.listId,"aria-labelledby":g.labelId,"aria-activedescendant":p,id:g.inputId,type:"text",value:s?r.value:m,onChange:u=>{s||d.setState("search",u.target.value),n==null||n(u.target.value)}})}),xt=l.forwardRef((r,e)=>{let{children:n,label:o="Suggestions",...s}=r,d=l.useRef(null),m=l.useRef(null),f=V();return l.useEffect(()=>{if(m.current&&d.current){let g=m.current,p=d.current,u,x=new ResizeObserver(()=>{u=requestAnimationFrame(()=>{let N=g.offsetHeight;p.style.setProperty("--cmdk-list-height",N.toFixed(1)+"px")})});return x.observe(g),()=>{cancelAnimationFrame(u),x.unobserve(g)}}},[]),l.createElement(D.div,{ref:G([d,e]),...s,"cmdk-list":"",role:"listbox","aria-label":o,id:f.listId},J(r,g=>l.createElement("div",{ref:G([m,f.listInnerRef]),"cmdk-list-sizer":""},g)))}),gt=l.forwardRef((r,e)=>{let{open:n,onOpenChange:o,overlayClassName:s,contentClassName:d,container:m,...f}=r;return l.createElement($e,{open:n,onOpenChange:o},l.createElement(Se,{container:m},l.createElement(oe,{"cmdk-overlay":"",className:s}),l.createElement(se,{"aria-label":r.label,"cmdk-dialog":"",className:d},l.createElement(_e,{ref:e,...f}))))}),vt=l.forwardRef((r,e)=>M(n=>n.filtered.count===0)?l.createElement(D.div,{ref:e,...r,"cmdk-empty":"",role:"presentation"}):null),bt=l.forwardRef((r,e)=>{let{progress:n,children:o,label:s="Loading...",...d}=r;return l.createElement(D.div,{ref:e,...d,"cmdk-loading":"",role:"progressbar","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":s},J(r,m=>l.createElement("div",{"aria-hidden":!0},m)))}),w=Object.assign(_e,{List:xt,Item:mt,Input:ft,Group:pt,Separator:ht,Dialog:gt,Empty:vt,Loading:bt});function jt(r,e){let n=r.nextElementSibling;for(;n;){if(n.matches(e))return n;n=n.nextElementSibling}}function yt(r,e){let n=r.previousElementSibling;for(;n;){if(n.matches(e))return n;n=n.previousElementSibling}}function Me(r){let e=l.useRef(r);return _(()=>{e.current=r}),e}var _=typeof window>"u"?l.useEffect:l.useLayoutEffect;function F(r){let e=l.useRef();return e.current===void 0&&(e.current=r()),e}function G(r){return e=>{r.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}function M(r){let e=de(),n=()=>r(e.snapshot());return l.useSyncExternalStore(e.subscribe,n,n)}function Le(r,e,n,o=[]){let s=l.useRef(),d=V();return _(()=>{var m;let f=(()=>{var p;for(let u of n){if(typeof u=="string")return u.trim();if(typeof u=="object"&&"current"in u)return u.current?(p=u.current.textContent)==null?void 0:p.trim():s.current}})(),g=o.map(p=>p.trim());d.value(r,f,g),(m=e.current)==null||m.setAttribute(A,f),s.current=f}),s}var kt=()=>{let[r,e]=l.useState(),n=F(()=>new Map);return _(()=>{n.current.forEach(o=>o()),n.current=new Map},[r]),(o,s)=>{n.current.set(o,s),e({})}};function wt(r){let e=r.type;return typeof e=="function"?e(r.props):"render"in e?e.render(r.props):r}function J({asChild:r,children:e},n){return r&&l.isValidElement(e)?l.cloneElement(wt(e),{ref:e.ref},n(e.props.children)):n(e)}var Nt={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"};const $t=$e,St=Se,qe=l.forwardRef(({className:r,...e},n)=>t.jsx(oe,{ref:n,className:$("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",r),...e}));qe.displayName=oe.displayName;const Pe=l.forwardRef(({className:r,children:e,...n},o)=>t.jsxs(St,{children:[t.jsx(qe,{}),t.jsxs(se,{ref:o,className:$("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",r),...n,children:[e,t.jsxs(We,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[t.jsx(Ge,{className:"h-4 w-4"}),t.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));Pe.displayName=se.displayName;const Et=l.forwardRef(({className:r,...e},n)=>t.jsx(Ee,{ref:n,className:$("text-lg font-semibold leading-none tracking-tight",r),...e}));Et.displayName=Ee.displayName;const Ct=l.forwardRef(({className:r,...e},n)=>t.jsx(Ce,{ref:n,className:$("text-sm text-muted-foreground",r),...e}));Ct.displayName=Ce.displayName;const Fe=l.forwardRef(({className:r,...e},n)=>t.jsx(w,{ref:n,className:$("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",r),...e}));Fe.displayName=w.displayName;const Rt=({children:r,...e})=>t.jsx($t,{...e,children:t.jsx(Pe,{className:"overflow-hidden p-0",children:t.jsx(Fe,{className:"[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",children:r})})}),Xe=l.forwardRef(({className:r,...e},n)=>t.jsxs("div",{className:"flex items-center border-b px-3","cmdk-input-wrapper":"",children:[t.jsx(Ve,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),t.jsx(w.Input,{ref:n,className:$("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",r),...e})]}));Xe.displayName=w.Input.displayName;const He=l.forwardRef(({className:r,...e},n)=>t.jsx(w.List,{ref:n,className:$("max-h-[300px] overflow-y-auto overflow-x-hidden",r),...e}));He.displayName=w.List.displayName;const Ke=l.forwardRef((r,e)=>t.jsx(w.Empty,{ref:e,className:"py-6 text-center text-sm",...r}));Ke.displayName=w.Empty.displayName;const Dt=l.forwardRef(({className:r,...e},n)=>t.jsx(w.Group,{ref:n,className:$("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",r),...e}));Dt.displayName=w.Group.displayName;const It=l.forwardRef(({className:r,...e},n)=>t.jsx(w.Separator,{ref:n,className:$("-mx-1 h-px bg-border",r),...e}));It.displayName=w.Separator.displayName;const At=l.forwardRef(({className:r,...e},n)=>t.jsx(w.Item,{ref:n,className:$("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r),...e}));At.displayName=w.Item.displayName;function _t(){const[r,e]=l.useState(!1);return l.useEffect(()=>{const n=o=>{o.key==="k"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),e(s=>!s))};return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)},[]),t.jsxs(Rt,{open:r,onOpenChange:e,children:[t.jsx(Xe,{placeholder:"(NOT IMPLEMENTED) Type a command or search..."}),t.jsx(He,{children:t.jsx(Ke,{children:"No results found."})})]})}function we({items:r,pathname:e}){return r.length?t.jsx("div",{className:"w-full",children:r.map((n,o)=>{var s;return t.jsxs("div",{className:$("pb-4"),children:[t.jsx("h4",{className:"mb-1 rounded-md px-2 py-1 font-semibold",children:n.title}),((s=n==null?void 0:n.items)==null?void 0:s.length)&&t.jsx(Mt,{baseurl:n.baseurl,items:n.items,pathname:e})]},o)})}):null}function Mt({baseurl:r,items:e,pathname:n}){return e!=null&&e.length?t.jsx("div",{className:"grid grid-flow-row auto-rows-max",children:e.map((o,s)=>o.href&&!o.disabled?t.jsxs("a",{href:r+o.href,className:$("group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",o.disabled&&"cursor-not-allowed opacity-60",n===o.href?"font-medium text-foreground":"text-muted-foreground"),target:o.external?"_blank":"",rel:o.external?"noreferrer":"",children:[o.title,o.label&&t.jsx("span",{className:"ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 leading-none text-[#000000] no-underline group-hover:no-underline",children:o.label})]},s):t.jsxs("span",{className:$("flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",o.disabled&&"cursor-not-allowed opacity-60"),children:[o.title,o.label&&t.jsx("span",{className:"ml-2 rounded-md bg-muted px-1.5 py-0.5 leading-none text-muted-foreground no-underline group-hover:no-underline",children:o.label})]},s))}):null}const Oe="ScrollArea",[ze,Kt]=Be(Oe),[Lt,Ot]=ze(Oe),Ne=l.forwardRef((r,e)=>{const{__scopeScrollArea:n,type:o="hover",dir:s,scrollHideDelay:d=600,...m}=r,[f,g]=l.useState(null),[p,u]=l.useState(null),[x,N]=l.useState(null),[k,E]=l.useState(null),[L,C]=l.useState(null),[q,B]=l.useState(0),[U,Y]=l.useState(0),[R,b]=l.useState(!1),[y,X]=l.useState(!1),T=Ue(e,H=>g(H)),P=Ye(s);return l.createElement(Lt,{scope:n,type:o,dir:P,scrollHideDelay:d,scrollArea:f,viewport:p,onViewportChange:u,content:x,onContentChange:N,scrollbarX:k,onScrollbarXChange:E,scrollbarXEnabled:R,onScrollbarXEnabledChange:b,scrollbarY:L,onScrollbarYChange:C,scrollbarYEnabled:y,onScrollbarYEnabledChange:X,onCornerWidthChange:B,onCornerHeightChange:Y},l.createElement(D.div,Te({dir:P},m,{ref:T,style:{position:"relative","--radix-scroll-area-corner-width":q+"px","--radix-scroll-area-corner-height":U+"px",...r.style}})))}),qt="ScrollAreaScrollbar";ze(qt);function zt({children:r,pathname:e}){return t.jsxs(t.Fragment,{children:[t.jsx(_t,{}),t.jsx(Je,{children:t.jsx(Ne,{className:"h-full py-6 pl-8 pr-6 lg:py-8",children:t.jsx(we,{items:be.sidebarNav,pathname:e})})}),t.jsx("div",{className:"border-b",children:t.jsxs("div",{className:"container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] md:text-xl lg:gap-10",children:[t.jsx("aside",{className:"fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.7rem)] w-full shrink-0 md:sticky md:block bg-base-200 rounded-xl",children:t.jsx(Ne,{className:"h-full py-6 pl-8 pr-6 lg:py-8",children:t.jsx(we,{items:be.sidebarNav,pathname:e})})}),t.jsx("div",{className:"article prose pt-10",children:r})]})})]})}export{zt as D,Qe as M,Ht as p};
