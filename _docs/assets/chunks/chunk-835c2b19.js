import{j as e,r as a}from"./chunk-05bfc087.js";import{a as s,j as Y,k as H,l as M,$ as O,_ as P,L as W}from"./chunk-f90b45d4.js";function q({items:l}){const o="was";return l.length?e.jsx("div",{className:"w-full",children:l.map((r,n)=>{var t;return e.jsxs("div",{className:s("pb-4"),children:[e.jsx("h4",{className:"mb-1 rounded-md px-2 py-1 font-semibold",children:r.title}),((t=r==null?void 0:r.items)==null?void 0:t.length)&&e.jsx(I,{items:r.items,pathname:o})]},n)})}):null}function I({items:l,pathname:o}){return l!=null&&l.length?e.jsx("div",{className:"grid grid-flow-row auto-rows-max",children:l.map((r,n)=>r.href&&!r.disabled?e.jsxs("a",{href:r.href,className:s("group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",r.disabled&&"cursor-not-allowed opacity-60",o===r.href?"font-medium text-foreground":"text-muted-foreground"),target:r.external?"_blank":"",rel:r.external?"noreferrer":"",children:[r.title,r.label&&e.jsx("span",{className:"ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 leading-none text-[#000000] no-underline group-hover:no-underline",children:r.label})]},n):e.jsxs("span",{className:s("flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",r.disabled&&"cursor-not-allowed opacity-60"),children:[r.title,r.label&&e.jsx("span",{className:"ml-2 rounded-md bg-muted px-1.5 py-0.5 leading-none text-muted-foreground no-underline group-hover:no-underline",children:r.label})]},n))}):null}const i="ScrollArea",[u,Q]=Y(i),[z,U]=u(i),F=a.forwardRef((l,o)=>{const{__scopeScrollArea:r,type:n="hover",dir:t,scrollHideDelay:p=600,...x}=l,[h,f]=a.useState(null),[m,g]=a.useState(null),[$,S]=a.useState(null),[v,j]=a.useState(null),[C,y]=a.useState(null),[N,w]=a.useState(0),[_,A]=a.useState(0),[E,D]=a.useState(!1),[k,X]=a.useState(!1),L=H(o,R=>f(R)),c=M(t);return a.createElement(z,{scope:r,type:n,dir:c,scrollHideDelay:p,scrollArea:h,viewport:m,onViewportChange:g,content:$,onContentChange:S,scrollbarX:v,onScrollbarXChange:j,scrollbarXEnabled:E,onScrollbarXEnabledChange:D,scrollbarY:C,onScrollbarYChange:y,scrollbarYEnabled:k,onScrollbarYEnabledChange:X,onCornerWidthChange:w,onCornerHeightChange:A},a.createElement(O.div,P({dir:c},x,{ref:L,style:{position:"relative","--radix-scroll-area-corner-width":N+"px","--radix-scroll-area-corner-height":_+"px",...l.style}})))}),V="ScrollAreaScrollbar";u(V);function d(l){const o={blockquote:"blockquote",h1:"h1",p:"p",...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{children:"Welcome to Open Chat Docs!"}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsx(o.p,{children:"Docs are still work in progress feel free to open a PR!"}),`
`]})]})}function B(l={}){const{wrapper:o}=l.components||{};return o?e.jsx(o,{...l,children:e.jsx(d,{...l})}):d(l)}const G={sidebarNav:[{title:"Getting Started",items:[{title:"Introduction",href:"/docs",items:[]},{title:"Docker Development",href:"/docs/dev-docker",items:[]},{title:"Local Installation",href:"/docs/dev-local",items:[]}]}]};function b({children:l}){return e.jsxs(e.Fragment,{children:[e.jsx(W,{}),e.jsx("div",{className:"border-b",children:e.jsxs("div",{className:"container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] md:text-xl lg:gap-10",children:[e.jsx("aside",{className:"fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.7rem)] w-full shrink-0 md:sticky md:block bg-base-200 rounded-xl",children:e.jsx(F,{className:"h-full py-6 pl-8 pr-6 lg:py-8",children:e.jsx(q,{items:G.sidebarNav})})}),e.jsx("div",{className:"article prose pt-10",children:l})]})})]})}function T(){return e.jsx(b,{children:e.jsx(B,{})})}const Z=Object.freeze(Object.defineProperty({__proto__:null,DocsLayout:b,Page:T},Symbol.toStringTag,{value:"Module"}));export{b as D,Z as i};
