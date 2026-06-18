import{j as t}from"./index-D_CiwiqF.js";function c({steps:n,current:l,onStep:a}){return t.jsx("nav",{"aria-label":"Progress langkah",className:"mb-6",children:t.jsx("ol",{className:"flex items-center gap-1 overflow-x-auto pb-2",children:n.map((i,s)=>{const r=s===l,e=s<l;return t.jsxs("li",{className:"flex items-center shrink-0",children:[t.jsxs("button",{type:"button",onClick:()=>e&&(a==null?void 0:a(s)),disabled:!e,className:`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition
                  ${r?"bg-blue-600 text-white shadow-md":""}
                  ${e?"bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer":""}
                  ${!r&&!e?"bg-gray-100 text-gray-400":""}`,"aria-current":r?"step":void 0,children:[t.jsx("span",{className:`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black
                  ${r?"bg-white text-blue-600":""}
                  ${e?"bg-green-500 text-white":""}
                  ${!r&&!e?"bg-gray-300 text-white":""}`,children:e?"✓":s+1}),t.jsx("span",{className:"hidden sm:inline",children:i})]}),s<n.length-1&&t.jsx("div",{className:`w-4 sm:w-8 h-0.5 mx-1 ${e?"bg-green-300":"bg-gray-200"}`})]},s)})})})}export{c as B};
