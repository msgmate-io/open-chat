import{j as n,e as F,r as l}from"./chunk-5736cc52.js";import{$ as D,j as Re,k as De,l as oe,m as ce,a as S,n as We,o as Ye,p as $e,q as Ie,M as ze,r as Je,s as Qe,t as Ze,_ as en,D as nn}from"./chunk-7f37d256.js";function fe(r){const e={blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Welcome to Open Chat Docs!"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"Docs are still work in progress feel free to open a PR"}),`
`]}),`
`,n.jsx(e.p,{children:"Generaly the repo comes with 3 services:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"backend"}),": ",n.jsx(F,{href:"https://www.djangoproject.com/",target:"_blank",children:"Django"})," + Rest-Framework + Django-Channels"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"frontend"}),": Express + Vike"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"proxy"}),": Nginx"]}),`
`]}),`
`,n.jsxs(e.p,{children:["All components are containerized, check ",n.jsx(F,{href:"/docs/dev-docker",children:"docker development"}),"."]})]})}function rn(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(fe,{...r})}):fe(r)}function ge(r){const e={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Docker Development"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"✅ recommended way to develop for web!"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`docker compose up --build
`})}),`
`,n.jsxs(e.p,{children:["Visit ",n.jsx(e.code,{children:"localhost"})," ( http port 80 ), live reload & dev mode enabled by default."]}),`
`,n.jsx(e.h2,{children:"Build the docs"}),`
`,n.jsxs(e.p,{children:["Creates a full static export of docs in ",n.jsx(e.code,{children:"./docs"}),"."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`docker compose build frontend
docker compose run --entrypoint sh frontend -c "npm install && npm run build:docs"
`})}),`
`,n.jsxs(e.p,{children:["Then view it with any statics server, e.g.: ",n.jsx(e.code,{children:"cd ./docs && php -S localhost:8080"})]}),`
`,n.jsx(e.h2,{children:"Capacitor Development"}),`
`,n.jsx(e.p,{children:"Be sure to have all required android build tools installed, check capacitor docs for more info."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npx cap sync
npx cap run android -l --external
`})}),`
`,n.jsx(e.h2,{children:"Shell in container"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Shell on container ",n.jsx(e.code,{children:"docker compose exec <service> sh"})]}),`
`,n.jsxs(e.li,{children:["Do stuff e.g.: ",n.jsx(e.em,{children:"Install Packages"})," ",n.jsx(e.code,{children:"pip3 install ..."})," / ",n.jsx(e.code,{children:"npm run dev"})]}),`
`]}),`
`,n.jsx(e.h2,{children:"Updating Api Client"}),`
`,n.jsxs(e.p,{children:["Generate typed api client outside the container: ",n.jsx(e.code,{children:"cd frontend && npm run generate-api"}),", consider:"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"updates to the api client should be commited"}),`
`,n.jsxs(e.li,{children:["Api is generated based in infered types from ",n.jsx(e.code,{children:"rest_framework"})," and ",n.jsx(e.code,{children:"drf_spectacular"})]}),`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"rest_framework.serializers"})," ( and ",n.jsx(e.code,{children:"ModelSerializer"})," ) where possible"]}),`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"drf_spectacular.utils.extend_schema"})," to extend incomplete schemas"]}),`
`]}),`
`,n.jsxs(e.p,{children:["View the swagger-ui at ",n.jsx(e.code,{children:"/api/schema/swagger-ui/"})]})]})}function tn(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(ge,{...r})}):ge(r)}function je(r){const e={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Capacitor Native App"}),`
`,n.jsx(e.p,{children:"Covenient for live-reload capacitor development."}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Manually start a proxy:"}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.code,{children:"docker run -it --rm -d -p 80:80 --name proxy -v ./local.nginx.conf:/etc/nginx/nginx.conf nginx"})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsxs(e.li,{children:["Start Backend & Redis service ",n.jsx(e.code,{children:"docker compose up backend redis"})]}),`
`,n.jsxs(e.li,{children:["Start the frontend: ",n.jsx(e.code,{children:"cd ./frontend/ && npm run dev"})]}),`
`]}),`
`,n.jsx(e.p,{children:"(optional) Native development:"}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["Prerender frontend ",n.jsx(e.code,{children:"npm run build && node ./preRender.js"})]}),`
`,n.jsx(e.li,{children:"Start native apps:"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npx cap sync
npx cap run android -l --external
`})})]})}function ln(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(je,{...r})}):je(r)}function be(r){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Helm deployment"}),`
`,n.jsx(e.p,{children:"Backend & Frontend can be deployed seperately but a current image url for both must be provided."}),`
`,n.jsxs(e.h2,{children:["Locally using ",n.jsx(e.code,{children:"microk8s"})]}),`
`,n.jsxs(e.p,{children:["Make sure you have ",n.jsx(e.a,{href:"https://microk8s.io/docs/getting-started",children:"setup & installed"})," ",n.jsx(e.code,{children:"microk8s"}),"."]}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:[`We utelize microk8s for easly local developement to work with managed k8s ( AKS or EKS ) you may need to add extra annotations to the ingress or add a loadbalancer.
But for small scale deployment microk8s can also work `,n.jsx(e.a,{href:"https://blog.t1m.me/blog/microk8s-on-vps",children:"checkout tim's blog post on how this can be set-up"})]}),`
`]}),`
`,n.jsx(e.h3,{children:"Build & Install Helm"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Setup the env, ",n.jsx(e.code,{children:"vim .env"})]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`IMAGE_PREFIX="localhost:32000/open-chat-"
IMAGE_TAG="latest"
`})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"Build Backend & Frontend"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`docker compose -f docker-compose.pro.yaml build
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"Push to local micok8s registry"}),`
`]}),`
`,n.jsx(e.p,{children:"Setup and install microk8s on your system, then:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`microk8s enable registry
docker compose -f docker-compose.pro.yaml push
`})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsxs(e.li,{children:["Check default helm ",n.jsx(e.code,{children:"values.yaml"})," ( should be good to go )"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`microk8s helm install -f ./helm/values.yaml open-chat ./helm
`})}),`
`,n.jsx(e.h4,{children:"Deploying services individually"}),`
`,n.jsxs(e.p,{children:["Currently ",n.jsx(e.code,{children:"frontend"})," & ",n.jsx(e.code,{children:"backend"})," services may be deployed seperately."]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Build & Push only one service"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`docker compose -f docker-compose.pro.yaml <service-name> build
docker compose -f docker-compose.pro.yaml <service-name> push
`})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsxs(e.li,{children:["Update OR retrieve the current helm ",n.jsx(e.code,{children:"values.yaml"})]}),`
`]}),`
`,n.jsxs(e.p,{children:["Either edit ",n.jsx(e.code,{children:"helm/values.yaml"}),` to include you already deployed images.
Or retrieve the current image url's:`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`microk8s helm get values open-chat -o yaml > ./helm/values.yaml
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsxs(e.li,{children:["Update the image url in ",n.jsx(e.code,{children:"helm/values.yaml"})," and install the service"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`microk8s helm upgrade -f ./helm/values.yaml open-chat ./helm
`})}),`
`,n.jsx(e.h3,{children:"Uninstall Helm"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`microk8s helm uninstall open-chat
`})})]})}function sn(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(be,{...r})}):be(r)}function ve(r){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Github Actions CI/CD"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:"This section is WIP"}),`
`]}),`
`,n.jsx(e.p,{children:"A collection of github actions and a k8s cluster maybe be used to manage the CI/CD process."}),`
`,n.jsxs(e.h2,{children:["Running workflows locally using ",n.jsx(e.code,{children:"act"})]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Fill ",n.jsx(e.code,{children:".secrets"})]}),`
`]}),`
`,n.jsxs(e.p,{children:["Depending on the workflow you might need to add ",n.jsx(e.code,{children:"GITHUB_TOKEN"})," - scoped depending on your task objective - to the ",n.jsx(e.code,{children:".env"})," file."]}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"act workflow_dispatch --secret-file .env -W .github/workflows/<workflow>.yml"})}),`
`]}),`
`,n.jsxs(e.p,{children:["Incase you require to provide dispatch params, create a ",n.jsx(e.code,{children:"event.json"})," and use the ",n.jsx(e.code,{children:"--eventpath"}),` flag.
But most of the time just using `,n.jsx(e.code,{children:"--input"})," should be sufficient."]}),`
`,n.jsx(e.p,{children:"e.g.: this will install the open-chat helm chart to any kubernetes cluster:"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:".secrets"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`BOT_TOKEN="change me"
REGISTRY_HOST="change me"
REGISTRY_USER="change me"
REGISTRY_PASSWORD="change me"
DEPLOYMENT_VALUES_B64="change me"
INGRESS_HOST="change me"
`})}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(F,{href:"/docs/example-values-helm-install",children:"see here"})," for an exmple ",n.jsx(e.code,{children:"values.yaml"})," setup, use ",n.jsx(e.code,{children:"base64 -w 0"})," to encode it."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`act workflow_dispatch --input BUILD_TARGET=backend --secret-file .secrets -W .github/workflows/build-docker-image.yaml
act workflow_dispatch --input BUILD_TARGET=frontend --secret-file .secrets -W .github/workflows/build-docker-image.yaml
act workflow_dispatch --input DEPLOYMENT_TARGET=staging --input FRONTEND_IMAGE_URL="change me" --input BACKEND_IMAGE_URL="change me" --secret-file .secrets -W .github/workflows/install-helm.yaml
`})}),`
`,n.jsx(e.h1,{children:"Open Chat Repo CI/CD"}),`
`,n.jsx(e.p,{children:"Section discusses how the CI/CD process is managed for the open-chat repo / how it can be managed in a fork."}),`
`,n.jsx(e.h2,{children:"Setting up environment"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:["As this is a public repo it has access to ",n.jsx(e.a,{href:"https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment",children:"github environments"}),`
If you are using this in context of a private repo you may need to adjust the github actions.`]}),`
`]}),`
`,n.jsx(e.h3,{children:"Environment Secrets"}),`
`,n.jsx(e.p,{children:"You are required to configure the following:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"KUBECONFIG_B64"}),": a base64 encoded kubeconfig file"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"REGISTRY_PASSWORD"}),": a docker registry password"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"REGISTRY_HOST"}),": a docker registry host"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"REGISTRY_USER"}),": a docker registry user"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"DEPLOYMENT_VALUES_B64"}),": a base64 encoded helm values file ( can be deleted after installation )"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"BOT_TOKEN"}),": a scoped github token of bot account"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"INGRESS_HOST"}),": the ingress host for the k8s cluster"]}),`
`]}),`
`,n.jsxs(e.p,{children:["Since they are environment scoped, all workflows accessing this enviroment require prior approval of ",n.jsx(F,{href:"https://github.com/tbscode",target:"_blank",children:"tbscode"})," or another autorized maintainer."]})]})}function an(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(ve,{...r})}):ve(r)}function ye(r){const e={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Backend"}),`
`,n.jsx(e.p,{children:`The backend is a containerized django app.
It serves as:`}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Authentication server"}),`
`,n.jsx(e.li,{children:"REST API server"}),`
`,n.jsx(e.li,{children:"Websocket server"}),`
`]}),`
`,n.jsx(e.h2,{children:"Creating a api"}),`
`,n.jsxs(e.p,{children:["Chat related apis belong in the ",n.jsx(e.code,{children:"chat"}),` app.
User and profile related apis belong in the `,n.jsx(e.code,{children:"core"})," app."]}),`
`,n.jsxs(e.p,{children:["Use ",n.jsx(e.code,{children:"@api_view"}),` decorator views for basic apis.
Use `,n.jsx(e.code,{children:"ModelViewSet"}),` for CRUD apis,
combine with `,n.jsx(e.code,{children:"@action"})," decorator for custom actions."]}),`
`,n.jsx(e.p,{children:"checkout the folling apis as examples:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"chat/api/messages.py"}),": A Model View Set with some basic operations"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"core/api/login.py"}),": A simple decorator api view for logging in a user"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Setup Linting for development"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"setup venv"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`python3 -m venv venv
`})}),`
`,n.jsxs(e.ol,{start:"2",children:[`
`,n.jsx(e.li,{children:"activate venv"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`source venv/bin/activate
`})}),`
`,n.jsxs(e.ol,{start:"3",children:[`
`,n.jsx(e.li,{children:"install dependencies"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`pip install -r ./backend/requirements.txt
`})}),`
`,n.jsxs(e.ol,{start:"4",children:[`
`,n.jsx(e.li,{children:"make sure you have a linting extension installed in your editor"}),`
`]}),`
`,n.jsxs(e.p,{children:["E.g.: for vscode, you can use ",n.jsx(e.code,{children:"pylint"})," or ",n.jsx(e.code,{children:"flake8"}),"."]})]})}function on(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(ye,{...r})}):ye(r)}function ke(r){const e={code:"code",p:"p",pre:"pre",...r.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.p,{children:["An example helm values file for the ",n.jsx(e.code,{children:"backend"})," and ",n.jsx(e.code,{children:"frontend"})," charts."]}),`
`,n.jsxs(e.p,{children:["See also ",n.jsx(F,{href:"/docs/helm-deployment",children:"Helm deployment guide"})]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`namespace: autoreplaced
registry:
  use: false
  host: "ghcr.io"
  authToken: "token"
certmanager:
  use: true
  name: change me
redis:
  use: true
  port: 6379
  serviceName: redis-db-svc
ingress:
  use: true
  host: autoreplaced
backend:
  replicas: 1
  imageURL: autoreplaced
  registry:
    authRequired: false
    secretName: dockerconfigjson-github-com
  env:
    DJANGO_DEBUG: "false"
    PRODUCTION: "true"
    ROOT_URL: "change me"
    ROOT_HOST: "change me"
    EXTRA_TRUSTED_ORIGINS: "change me"
    DJANGO_SECRET_KEY: "change me"
    DJANGO_ALLOWED_HOSTS: "change me"
    REDIS_URL: "autoreplaced"
    BASE_ADMIN_USERNAME: "change me"
    BASE_ADMIN_USER_PASSWORD: "change me"
frontend:
  replicas: 1
  imageURL: autoreplaced
  registry:
    authRequired: false
    secretName: dockerconfigjson-github-com
  env:
    INTERNAL_BACKEND_ROUTE: "autoreplaced"
    PUBLIC_ENV__GUEST_LOGIN_ALLOWED: "true"
    PUBLIC_ENV__GUEST_USERNAME: "testUser1"
    PUBLIC_ENV__GUEST_PASSWORD: "Test123!"
    PUBLIC_ENV__FRONTNED_BACKEND_ROUTE: "autoreplaced"
    PUBLIC_ENV__WEBSOCKET_PROTOCOLL: "autoreplaced"
    PUBLIC_ENV__WEBSOCKET_HOST: "autoreplaced"
    PUBLIC_ENV__WEBSOCKET_PATH: "/api/core/ws"
    PUBLIC_ENV__STATIC_EXPORT: "false"
    PUBLIC_ENV__ROUTE_PREFIX: ""
`})})]})}function cn(r={}){const{wrapper:e}=r.components||{};return e?n.jsx(e,{...r,children:n.jsx(ke,{...r})}):ke(r)}const we={sidebarNav:[{title:"Getting Started",baseurl:"/docs",items:[{title:"Introduction",href:"/",items:[]},{title:"Docker Development",href:"/dev-docker",items:[]},{title:"Github Actions",href:"/workflows",items:[]},{title:"Capacitor Native App",href:"/dev-capacitor",items:[]},{title:"Helm deployment",href:"/helm-deployment",items:[]}]},{title:"Frontend",baseurl:"/docs",items:[{title:"Introduction",href:"/frontend",items:[]}]},{title:"Backend",baseurl:"/docs",items:[{title:"Introduction",href:"/backend",items:[]}]}]},dn=[{route:"example-values-helm-install",component:cn}],Yn=[{route:"",component:rn},{route:"dev-docker",component:tn},{route:"dev-capacitor",component:ln},{route:"helm-deployment",component:sn},{route:"workflows",component:an},{route:"backend",component:on},...dn];var Ee=1,un=.9,hn=.8,pn=.17,re=.1,te=.999,mn=.9999,xn=.99,fn=/[\\\/_+.#"@\[\(\{&]/,gn=/[\\\/_+.#"@\[\(\{&]/g,jn=/[\s-]/,Ae=/[\s-]/g;function se(r,e,t,a,o,i,h){if(i===e.length)return o===r.length?Ee:xn;var x=`${o},${i}`;if(h[x]!==void 0)return h[x];for(var g=a.charAt(i),p=t.indexOf(g,o),u=0,f,E,k,N;p>=0;)f=se(r,e,t,a,p+1,i+1,h),f>u&&(p===o?f*=Ee:fn.test(r.charAt(p-1))?(f*=hn,k=r.slice(o,p-1).match(gn),k&&o>0&&(f*=Math.pow(te,k.length))):jn.test(r.charAt(p-1))?(f*=un,N=r.slice(o,p-1).match(Ae),N&&o>0&&(f*=Math.pow(te,N.length))):(f*=pn,o>0&&(f*=Math.pow(te,p-o))),r.charAt(p)!==e.charAt(i)&&(f*=mn)),(f<re&&t.charAt(p-1)===a.charAt(i+1)||a.charAt(i+1)===a.charAt(i)&&t.charAt(p-1)!==a.charAt(i))&&(E=se(r,e,t,a,p+1,i+2,h),E*re>f&&(f=E*re)),f>u&&(u=f),p=t.indexOf(g,p+1);return h[x]=u,u}function Se(r){return r.toLowerCase().replace(Ae," ")}function bn(r,e,t){return r=t&&t.length>0?`${r+" "+t.join(" ")}`:r,se(r,e,Se(r),Se(e),0,0,{})}var X='[cmdk-group=""]',le='[cmdk-group-items=""]',vn='[cmdk-group-heading=""]',ie='[cmdk-item=""]',_e=`${ie}:not([aria-disabled="true"])`,ae="cmdk-item-select",I="data-value",yn=(r,e,t)=>bn(r,e,t),Te=l.createContext(void 0),K=()=>l.useContext(Te),Me=l.createContext(void 0),de=()=>l.useContext(Me),Le=l.createContext(void 0),Oe=l.forwardRef((r,e)=>{let t=U(()=>{var s,d;return{search:"",value:(d=(s=r.value)!=null?s:r.defaultValue)!=null?d:"",filtered:{count:0,items:new Map,groups:new Set}}}),a=U(()=>new Set),o=U(()=>new Map),i=U(()=>new Map),h=U(()=>new Set),x=Ue(r),{label:g,children:p,value:u,onValueChange:f,filter:E,shouldFilter:k,loop:N,disablePointerSelection:M=!1,vimBindings:C=!0,...L}=r,V=l.useId(),W=l.useId(),Y=l.useId(),R=l.useRef(null),b=In();A(()=>{if(u!==void 0){let s=u.trim();t.current.value=s,y.emit()}},[u]),A(()=>{b(6,ue)},[]);let y=l.useMemo(()=>({subscribe:s=>(h.current.add(s),()=>h.current.delete(s)),snapshot:()=>t.current,setState:(s,d,m)=>{var c,j,v;if(!Object.is(t.current[s],d)){if(t.current[s]=d,s==="search")Z(),O(),b(1,P);else if(s==="value"&&(m||b(5,ue),((c=x.current)==null?void 0:c.value)!==void 0)){let _=d??"";(v=(j=x.current).onValueChange)==null||v.call(j,_);return}y.emit()}},emit:()=>{h.current.forEach(s=>s())}}),[]),B=l.useMemo(()=>({value:(s,d,m)=>{var c;d!==((c=i.current.get(s))==null?void 0:c.value)&&(i.current.set(s,{value:d,keywords:m}),t.current.filtered.items.set(s,z(d,m)),b(2,()=>{O(),y.emit()}))},item:(s,d)=>(a.current.add(s),d&&(o.current.has(d)?o.current.get(d).add(s):o.current.set(d,new Set([s]))),b(3,()=>{Z(),O(),t.current.value||P(),y.emit()}),()=>{i.current.delete(s),a.current.delete(s),t.current.filtered.items.delete(s);let m=G();b(4,()=>{Z(),(m==null?void 0:m.getAttribute("id"))===s&&P(),y.emit()})}),group:s=>(o.current.has(s)||o.current.set(s,new Set),()=>{i.current.delete(s),o.current.delete(s)}),filter:()=>x.current.shouldFilter,label:g||r["aria-label"],disablePointerSelection:M,listId:V,inputId:Y,labelId:W,listInnerRef:R}),[]);function z(s,d){var m,c;let j=(c=(m=x.current)==null?void 0:m.filter)!=null?c:yn;return s?j(s,t.current.search,d):0}function O(){if(!t.current.search||x.current.shouldFilter===!1)return;let s=t.current.filtered.items,d=[];t.current.filtered.groups.forEach(c=>{let j=o.current.get(c),v=0;j.forEach(_=>{let $=s.get(_);v=Math.max($,v)}),d.push([c,v])});let m=R.current;q().sort((c,j)=>{var v,_;let $=c.getAttribute("id"),J=j.getAttribute("id");return((v=s.get(J))!=null?v:0)-((_=s.get($))!=null?_:0)}).forEach(c=>{let j=c.closest(le);j?j.appendChild(c.parentElement===j?c:c.closest(`${le} > *`)):m.appendChild(c.parentElement===m?c:c.closest(`${le} > *`))}),d.sort((c,j)=>j[1]-c[1]).forEach(c=>{let j=R.current.querySelector(`${X}[${I}="${encodeURIComponent(c[0])}"]`);j==null||j.parentElement.appendChild(j)})}function P(){let s=q().find(m=>m.getAttribute("aria-disabled")!=="true"),d=s==null?void 0:s.getAttribute(I);y.setState("value",d||void 0)}function Z(){var s,d,m,c;if(!t.current.search||x.current.shouldFilter===!1){t.current.filtered.count=a.current.size;return}t.current.filtered.groups=new Set;let j=0;for(let v of a.current){let _=(d=(s=i.current.get(v))==null?void 0:s.value)!=null?d:"",$=(c=(m=i.current.get(v))==null?void 0:m.keywords)!=null?c:[],J=z(_,$);t.current.filtered.items.set(v,J),J>0&&j++}for(let[v,_]of o.current)for(let $ of _)if(t.current.filtered.items.get($)>0){t.current.filtered.groups.add(v);break}t.current.filtered.count=j}function ue(){var s,d,m;let c=G();c&&(((s=c.parentElement)==null?void 0:s.firstChild)===c&&((m=(d=c.closest(X))==null?void 0:d.querySelector(vn))==null||m.scrollIntoView({block:"nearest"})),c.scrollIntoView({block:"nearest"}))}function G(){var s;return(s=R.current)==null?void 0:s.querySelector(`${ie}[aria-selected="true"]`)}function q(){var s;return Array.from((s=R.current)==null?void 0:s.querySelectorAll(_e))}function ee(s){let d=q()[s];d&&y.setState("value",d.getAttribute(I))}function ne(s){var d;let m=G(),c=q(),j=c.findIndex(_=>_===m),v=c[j+s];(d=x.current)!=null&&d.loop&&(v=j+s<0?c[c.length-1]:j+s===c.length?c[0]:c[j+s]),v&&y.setState("value",v.getAttribute(I))}function he(s){let d=G(),m=d==null?void 0:d.closest(X),c;for(;m&&!c;)m=s>0?Dn(m,X):$n(m,X),c=m==null?void 0:m.querySelector(_e);c?y.setState("value",c.getAttribute(I)):ne(s)}let pe=()=>ee(q().length-1),me=s=>{s.preventDefault(),s.metaKey?pe():s.altKey?he(1):ne(1)},xe=s=>{s.preventDefault(),s.metaKey?ee(0):s.altKey?he(-1):ne(-1)};return l.createElement(D.div,{ref:e,tabIndex:-1,...L,"cmdk-root":"",onKeyDown:s=>{var d;if((d=L.onKeyDown)==null||d.call(L,s),!s.defaultPrevented)switch(s.key){case"n":case"j":{C&&s.ctrlKey&&me(s);break}case"ArrowDown":{me(s);break}case"p":case"k":{C&&s.ctrlKey&&xe(s);break}case"ArrowUp":{xe(s);break}case"Home":{s.preventDefault(),ee(0);break}case"End":{s.preventDefault(),pe();break}case"Enter":if(!s.nativeEvent.isComposing&&s.keyCode!==229){s.preventDefault();let m=G();if(m){let c=new Event(ae);m.dispatchEvent(c)}}}}},l.createElement("label",{"cmdk-label":"",htmlFor:B.inputId,id:B.labelId,style:Tn},g),Q(r,s=>l.createElement(Me.Provider,{value:y},l.createElement(Te.Provider,{value:B},s))))}),kn=l.forwardRef((r,e)=>{var t,a;let o=l.useId(),i=l.useRef(null),h=l.useContext(Le),x=K(),g=Ue(r),p=(a=(t=g.current)==null?void 0:t.forceMount)!=null?a:h==null?void 0:h.forceMount;A(()=>{if(!p)return x.item(o,h==null?void 0:h.id)},[p]);let u=Be(o,i,[r.value,r.children,i],r.keywords),f=de(),E=T(b=>b.value&&b.value===u.current),k=T(b=>p||x.filter()===!1?!0:b.search?b.filtered.items.get(o)>0:!0);l.useEffect(()=>{let b=i.current;if(!(!b||r.disabled))return b.addEventListener(ae,N),()=>b.removeEventListener(ae,N)},[k,r.onSelect,r.disabled]);function N(){var b,y;M(),(y=(b=g.current).onSelect)==null||y.call(b,u.current)}function M(){f.setState("value",u.current,!0)}if(!k)return null;let{disabled:C,value:L,onSelect:V,forceMount:W,keywords:Y,...R}=r;return l.createElement(D.div,{ref:H([i,e]),...R,id:o,"cmdk-item":"",role:"option","aria-disabled":!!C,"aria-selected":!!E,"data-disabled":!!C,"data-selected":!!E,onPointerMove:C||x.disablePointerSelection?void 0:M,onClick:C?void 0:N},r.children)}),wn=l.forwardRef((r,e)=>{let{heading:t,children:a,forceMount:o,...i}=r,h=l.useId(),x=l.useRef(null),g=l.useRef(null),p=l.useId(),u=K(),f=T(k=>o||u.filter()===!1?!0:k.search?k.filtered.groups.has(h):!0);A(()=>u.group(h),[]),Be(h,x,[r.value,r.heading,g]);let E=l.useMemo(()=>({id:h,forceMount:o}),[o]);return l.createElement(D.div,{ref:H([x,e]),...i,"cmdk-group":"",role:"presentation",hidden:f?void 0:!0},t&&l.createElement("div",{ref:g,"cmdk-group-heading":"","aria-hidden":!0,id:p},t),Q(r,k=>l.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":t?p:void 0},l.createElement(Le.Provider,{value:E},k))))}),En=l.forwardRef((r,e)=>{let{alwaysRender:t,...a}=r,o=l.useRef(null),i=T(h=>!h.search);return!t&&!i?null:l.createElement(D.div,{ref:H([o,e]),...a,"cmdk-separator":"",role:"separator"})}),Sn=l.forwardRef((r,e)=>{let{onValueChange:t,...a}=r,o=r.value!=null,i=de(),h=T(u=>u.search),x=T(u=>u.value),g=K(),p=l.useMemo(()=>{var u;let f=(u=g.listInnerRef.current)==null?void 0:u.querySelector(`${ie}[${I}="${encodeURIComponent(x)}"]`);return f==null?void 0:f.getAttribute("id")},[]);return l.useEffect(()=>{r.value!=null&&i.setState("search",r.value)},[r.value]),l.createElement(D.input,{ref:e,...a,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":g.listId,"aria-labelledby":g.labelId,"aria-activedescendant":p,id:g.inputId,type:"text",value:o?r.value:h,onChange:u=>{o||i.setState("search",u.target.value),t==null||t(u.target.value)}})}),_n=l.forwardRef((r,e)=>{let{children:t,label:a="Suggestions",...o}=r,i=l.useRef(null),h=l.useRef(null),x=K();return l.useEffect(()=>{if(h.current&&i.current){let g=h.current,p=i.current,u,f=new ResizeObserver(()=>{u=requestAnimationFrame(()=>{let E=g.offsetHeight;p.style.setProperty("--cmdk-list-height",E.toFixed(1)+"px")})});return f.observe(g),()=>{cancelAnimationFrame(u),f.unobserve(g)}}},[]),l.createElement(D.div,{ref:H([i,e]),...o,"cmdk-list":"",role:"listbox","aria-label":a,id:x.listId},Q(r,g=>l.createElement("div",{ref:H([h,x.listInnerRef]),"cmdk-list-sizer":""},g)))}),Nn=l.forwardRef((r,e)=>{let{open:t,onOpenChange:a,overlayClassName:o,contentClassName:i,container:h,...x}=r;return l.createElement(Re,{open:t,onOpenChange:a},l.createElement(De,{container:h},l.createElement(oe,{"cmdk-overlay":"",className:o}),l.createElement(ce,{"aria-label":r.label,"cmdk-dialog":"",className:i},l.createElement(Oe,{ref:e,...x}))))}),Cn=l.forwardRef((r,e)=>T(t=>t.filtered.count===0)?l.createElement(D.div,{ref:e,...r,"cmdk-empty":"",role:"presentation"}):null),Rn=l.forwardRef((r,e)=>{let{progress:t,children:a,label:o="Loading...",...i}=r;return l.createElement(D.div,{ref:e,...i,"cmdk-loading":"",role:"progressbar","aria-valuenow":t,"aria-valuemin":0,"aria-valuemax":100,"aria-label":o},Q(r,h=>l.createElement("div",{"aria-hidden":!0},h)))}),w=Object.assign(Oe,{List:_n,Item:kn,Input:Sn,Group:wn,Separator:En,Dialog:Nn,Empty:Cn,Loading:Rn});function Dn(r,e){let t=r.nextElementSibling;for(;t;){if(t.matches(e))return t;t=t.nextElementSibling}}function $n(r,e){let t=r.previousElementSibling;for(;t;){if(t.matches(e))return t;t=t.previousElementSibling}}function Ue(r){let e=l.useRef(r);return A(()=>{e.current=r}),e}var A=typeof window>"u"?l.useEffect:l.useLayoutEffect;function U(r){let e=l.useRef();return e.current===void 0&&(e.current=r()),e}function H(r){return e=>{r.forEach(t=>{typeof t=="function"?t(e):t!=null&&(t.current=e)})}}function T(r){let e=de(),t=()=>r(e.snapshot());return l.useSyncExternalStore(e.subscribe,t,t)}function Be(r,e,t,a=[]){let o=l.useRef(),i=K();return A(()=>{var h;let x=(()=>{var p;for(let u of t){if(typeof u=="string")return u.trim();if(typeof u=="object"&&"current"in u)return u.current?(p=u.current.textContent)==null?void 0:p.trim():o.current}})(),g=a.map(p=>p.trim());i.value(r,x,g),(h=e.current)==null||h.setAttribute(I,x),o.current=x}),o}var In=()=>{let[r,e]=l.useState(),t=U(()=>new Map);return A(()=>{t.current.forEach(a=>a()),t.current=new Map},[r]),(a,o)=>{t.current.set(a,o),e({})}};function An(r){let e=r.type;return typeof e=="function"?e(r.props):"render"in e?e.render(r.props):r}function Q({asChild:r,children:e},t){return r&&l.isValidElement(e)?l.cloneElement(An(e),{ref:e.ref},t(e.props.children)):t(e)}var Tn={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"};const Mn=Re,Ln=De,Pe=l.forwardRef(({className:r,...e},t)=>n.jsx(oe,{ref:t,className:S("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",r),...e}));Pe.displayName=oe.displayName;const Ge=l.forwardRef(({className:r,children:e,...t},a)=>n.jsxs(Ln,{children:[n.jsx(Pe,{}),n.jsxs(ce,{ref:a,className:S("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",r),...t,children:[e,n.jsxs(We,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[n.jsx(Ye,{className:"h-4 w-4"}),n.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));Ge.displayName=ce.displayName;const On=l.forwardRef(({className:r,...e},t)=>n.jsx($e,{ref:t,className:S("text-lg font-semibold leading-none tracking-tight",r),...e}));On.displayName=$e.displayName;const Un=l.forwardRef(({className:r,...e},t)=>n.jsx(Ie,{ref:t,className:S("text-sm text-muted-foreground",r),...e}));Un.displayName=Ie.displayName;const qe=l.forwardRef(({className:r,...e},t)=>n.jsx(w,{ref:t,className:S("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",r),...e}));qe.displayName=w.displayName;const Bn=({children:r,...e})=>n.jsx(Mn,{...e,children:n.jsx(Ge,{className:"overflow-hidden p-0",children:n.jsx(qe,{className:"[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",children:r})})}),Xe=l.forwardRef(({className:r,...e},t)=>n.jsxs("div",{className:"flex items-center border-b px-3","cmdk-input-wrapper":"",children:[n.jsx(ze,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),n.jsx(w.Input,{ref:t,className:S("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",r),...e})]}));Xe.displayName=w.Input.displayName;const Fe=l.forwardRef(({className:r,...e},t)=>n.jsx(w.List,{ref:t,className:S("max-h-[300px] overflow-y-auto overflow-x-hidden",r),...e}));Fe.displayName=w.List.displayName;const He=l.forwardRef((r,e)=>n.jsx(w.Empty,{ref:e,className:"py-6 text-center text-sm",...r}));He.displayName=w.Empty.displayName;const Pn=l.forwardRef(({className:r,...e},t)=>n.jsx(w.Group,{ref:t,className:S("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",r),...e}));Pn.displayName=w.Group.displayName;const Gn=l.forwardRef(({className:r,...e},t)=>n.jsx(w.Separator,{ref:t,className:S("-mx-1 h-px bg-border",r),...e}));Gn.displayName=w.Separator.displayName;const qn=l.forwardRef(({className:r,...e},t)=>n.jsx(w.Item,{ref:t,className:S("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r),...e}));qn.displayName=w.Item.displayName;function Xn(){const[r,e]=l.useState(!1);return l.useEffect(()=>{const t=a=>{a.key==="k"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),e(o=>!o))};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[]),n.jsxs(Bn,{open:r,onOpenChange:e,children:[n.jsx(Xe,{placeholder:"(NOT IMPLEMENTED) Type a command or search..."}),n.jsx(Fe,{children:n.jsx(He,{children:"No results found."})})]})}function Ne({items:r,pathname:e}){return r.length?n.jsx("div",{className:"w-full",children:r.map((t,a)=>{var o;return n.jsxs("div",{className:S("pb-4"),children:[n.jsx("h4",{className:"mb-1 rounded-md px-2 py-1 font-semibold",children:t.title}),((o=t==null?void 0:t.items)==null?void 0:o.length)&&n.jsx(Fn,{baseurl:t.baseurl,items:t.items,pathname:e})]},a)})}):null}function Fn({baseurl:r,items:e,pathname:t}){return e!=null&&e.length?n.jsx("div",{className:"grid grid-flow-row auto-rows-max",children:e.map((a,o)=>a.href&&!a.disabled?n.jsxs("a",{href:r+a.href,className:S("group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",a.disabled&&"cursor-not-allowed opacity-60",t===a.href?"font-medium text-foreground":"text-muted-foreground"),target:a.external?"_blank":"",rel:a.external?"noreferrer":"",children:[a.title,a.label&&n.jsx("span",{className:"ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 leading-none text-[#000000] no-underline group-hover:no-underline",children:a.label})]},o):n.jsxs("span",{className:S("flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",a.disabled&&"cursor-not-allowed opacity-60"),children:[a.title,a.label&&n.jsx("span",{className:"ml-2 rounded-md bg-muted px-1.5 py-0.5 leading-none text-muted-foreground no-underline group-hover:no-underline",children:a.label})]},o))}):null}const Ke="ScrollArea",[Ve,zn]=Je(Ke),[Hn,Jn]=Ve(Ke),Ce=l.forwardRef((r,e)=>{const{__scopeScrollArea:t,type:a="hover",dir:o,scrollHideDelay:i=600,...h}=r,[x,g]=l.useState(null),[p,u]=l.useState(null),[f,E]=l.useState(null),[k,N]=l.useState(null),[M,C]=l.useState(null),[L,V]=l.useState(0),[W,Y]=l.useState(0),[R,b]=l.useState(!1),[y,B]=l.useState(!1),z=Qe(e,P=>g(P)),O=Ze(o);return l.createElement(Hn,{scope:t,type:a,dir:O,scrollHideDelay:i,scrollArea:x,viewport:p,onViewportChange:u,content:f,onContentChange:E,scrollbarX:k,onScrollbarXChange:N,scrollbarXEnabled:R,onScrollbarXEnabledChange:b,scrollbarY:M,onScrollbarYChange:C,scrollbarYEnabled:y,onScrollbarYEnabledChange:B,onCornerWidthChange:V,onCornerHeightChange:Y},l.createElement(D.div,en({dir:O},h,{ref:z,style:{position:"relative","--radix-scroll-area-corner-width":L+"px","--radix-scroll-area-corner-height":W+"px",...r.style}})))}),Kn="ScrollAreaScrollbar";Ve(Kn);function Qn({children:r,pathname:e}){return n.jsxs(n.Fragment,{children:[n.jsx(Xn,{}),n.jsx(nn,{children:n.jsx(Ce,{className:"h-full py-6 pl-8 pr-6 lg:py-8",children:n.jsx(Ne,{items:we.sidebarNav,pathname:e})})}),n.jsx("div",{className:"border-b",children:n.jsxs("div",{className:"container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] md:text-xl lg:gap-10",children:[n.jsx("aside",{className:"fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.7rem)] w-full shrink-0 md:sticky md:block bg-base-200 rounded-xl",children:n.jsx(Ce,{className:"h-full py-6 pl-8 pr-6 lg:py-8",children:n.jsx(Ne,{items:we.sidebarNav,pathname:e})})}),n.jsx("div",{className:"article prose pt-10",children:r})]})})]})}export{Qn as D,rn as M,Yn as p};
