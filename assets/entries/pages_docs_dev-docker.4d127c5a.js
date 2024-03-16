import{i}from"../chunks/chunk-8188229c.js";import{j as e,r as t,i as s,a,b as l}from"../chunks/chunk-9f04795d.js";import{D as d}from"../chunks/chunk-f05bb37f.js";import"../chunks/chunk-75dabdee.js";import"../chunks/chunk-edb2da2a.js";import"../chunks/chunk-5a2f32c8.js";import"../chunks/chunk-5225eac5.js";function o(r){const n={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Docker Development"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"✅ recommended way to develop for web!"}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`docker compose up --build
`})}),`
`,e.jsxs(n.p,{children:["Visit ",e.jsx(n.code,{children:"localhost"})," ( http port 80 ), live reload & dev mode enabled by default."]}),`
`,e.jsx(n.h2,{children:"Capacitor Development"}),`
`,e.jsx(n.p,{children:"Be sure to have all required android build tools installed, check capacitor docs for more info."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npx cap sync
npx cap run android -l --external
`})}),`
`,e.jsx(n.h2,{children:"Shell in container"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Shell on container ",e.jsx(n.code,{children:"docker compose exec <service> sh"})]}),`
`,e.jsxs(n.li,{children:["Do stuff e.g.: ",e.jsx(n.em,{children:"Install Packages"})," ",e.jsx(n.code,{children:"pip3 install ..."})," / ",e.jsx(n.code,{children:"npm run dev"})]}),`
`]}),`
`,e.jsx(n.h2,{children:"Updating Api Client"}),`
`,e.jsxs(n.p,{children:["Generate typed api client outside the container: ",e.jsx(n.code,{children:"cd frontend && npm run generate-api"}),", consider:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"updates to the api client should be commited"}),`
`,e.jsxs(n.li,{children:["Api is generated based in infered types from ",e.jsx(n.code,{children:"rest_framework"})," and ",e.jsx(n.code,{children:"drf_spectacular"})]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"rest_framework.serializers"})," ( and ",e.jsx(n.code,{children:"ModelSerializer"})," ) where possible"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"drf_spectacular.utils.extend_schema"})," to extend incomplete schemas"]}),`
`]}),`
`,e.jsxs(n.p,{children:["View the swagger-ui at ",e.jsx(n.code,{children:"/api/schema/swagger-ui/"})]})]})}function c(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}function p(){const r=t.createElement(c);return e.jsx(d,{children:r})}const h=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"})),P=[{configName:"onHydrationEnd",importPath:"/renderer/+onHydrationEnd.js",isValueFile:!0,exportValues:i},{configName:"onRenderClient",importPath:"/renderer/+onRenderClient.tsx",isValueFile:!0,exportValues:s},{configName:"onPageTransitionEnd",importPath:"/pages/+onPageTransitionEnd.js",isValueFile:!0,exportValues:a},{configName:"onPageTransitionStart",importPath:"/pages/+onPageTransitionStart.js",isValueFile:!0,exportValues:l},{configName:"Page",importPath:"/pages/docs/dev-docker/+Page.tsx",isValueFile:!0,exportValues:h}],_={onBeforeRenderEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},dataEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},hydrationCanBeAborted:{definedAt:{filePathToShowToUser:"/renderer/+config.h.js",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:"true"}};export{P as configValuesImported,_ as configValuesSerialized};
