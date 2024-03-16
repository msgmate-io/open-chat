import{i as o}from"../chunks/chunk-8188229c.js";import{j as e,r as i,i as a,a as l,b as s}from"../chunks/chunk-05bfc087.js";import{D as d}from"../chunks/chunk-835c2b19.js";import"../chunks/chunk-f90b45d4.js";import"../chunks/chunk-edb2da2a.js";import"../chunks/chunk-5a2f32c8.js";import"../chunks/chunk-5225eac5.js";function t(r){const n={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Local Development"}),`
`,e.jsx(n.p,{children:"Covenient for live-reload capacitor development."}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Manually start a proxy:"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"docker run -it --rm -d -p 80:80 --name proxy -v ./local.nginx.conf:/etc/nginx/nginx.conf nginx"})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Start Backend & Redis service ",e.jsx(n.code,{children:"docker compose up backend redis"})]}),`
`,e.jsxs(n.li,{children:["Start the frontend: ",e.jsx(n.code,{children:"cd ./frontend/ && npm run dev"})]}),`
`]}),`
`,e.jsx(n.p,{children:"(optional) Native development:"}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["Prerender frontend ",e.jsx(n.code,{children:"npm run build && node ./preRender.js"})]}),`
`,e.jsx(n.li,{children:"Start native apps:"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npx cap sync
npx cap run android -l --external
`})})]})}function c(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}function p(){const r=i.createElement(c);return e.jsx(d,{children:r})}const u=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"})),P=[{configName:"onHydrationEnd",importPath:"/renderer/+onHydrationEnd.js",isValueFile:!0,exportValues:o},{configName:"onRenderClient",importPath:"/renderer/+onRenderClient.tsx",isValueFile:!0,exportValues:a},{configName:"onPageTransitionEnd",importPath:"/pages/+onPageTransitionEnd.js",isValueFile:!0,exportValues:l},{configName:"onPageTransitionStart",importPath:"/pages/+onPageTransitionStart.js",isValueFile:!0,exportValues:s},{configName:"Page",importPath:"/pages/docs/dev-local/+Page.tsx",isValueFile:!0,exportValues:u}],S={onBeforeRenderEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},dataEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},hydrationCanBeAborted:{definedAt:{filePathToShowToUser:"/renderer/+config.h.js",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:"true"}};export{P as configValuesImported,S as configValuesSerialized};
