(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),u=n(16),i=n.n(u),o=(n(21),n(7)),a=n(3),l=n(4),s=n.n(l),d="api/persons",j=function(){return s.a.get(d).then((function(e){return e.data}))},f=function(e){return s.a.post(d,e).then((function(e){return e.data}))},h=function(e){return s.a.delete("".concat(d,"/").concat(e))},b=function(e,t){return s.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},m=n(0),O=function(e){var t=e.filter,n=e.filterHandler;return Object(m.jsxs)("div",{children:["Kirjoita t\xe4h\xe4n filteri rajoittamaan henkil\xf6it\xe4  ",Object(m.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]})},x=function(e){var t=e.name,n=e.nameHandler,r=e.number,c=e.numberHandler,u=e.addPersonHandler;return Object(m.jsxs)("form",{onSubmit:u,children:[Object(m.jsxs)("div",{children:["Nimi: ",Object(m.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]}),Object(m.jsxs)("div",{children:["Puhelinnumero: ",Object(m.jsx)("input",{value:r,onChange:function(e){return c(e.target.value)}})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"Lis\xe4t\xe4"})})]})},p=function(e){var t=e.handler,n=e.id;return Object(m.jsx)("button",{onClick:function(){return t(n)},children:"Poistaa"})},v=function(e){var t=e.toShow,n=e.deleteHandler;return Object(m.jsx)("div",{class:"persons",children:t.map((function(e){return Object(m.jsxs)("p",{className:"list",children:[e.name,": ",e.number," ",Object(m.jsx)(p,{handler:n,id:e.id})]})}))})},g=function(e){var t=e.text,n=e.type;return null===t||null===n?null:Object(m.jsx)("div",{className:n,children:t})},w=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),i=Object(a.a)(u,2),l=i[0],s=i[1],d=Object(r.useState)(""),p=Object(a.a)(d,2),w=p[0],S=p[1],H=Object(r.useState)(""),k=Object(a.a)(H,2),C=k[0],L=k[1],y=Object(r.useState)(null),P=Object(a.a)(y,2),T=P[0],z=P[1],N=Object(r.useState)(null),E=Object(a.a)(N,2),J=E[0],A=E[1],B=function(e,t){"add"===e&&(A("success"),z(t),setTimeout((function(){z(null),A(null)}),2e3)),"delete"===e&&(A("success"),z(t),setTimeout((function(){z(null),A(null)}),2e3)),"change"===e&&(A("success"),z(t),setTimeout((function(){z(null),A(null)}),2e3)),"error"===e&&(A("error"),z(t),setTimeout((function(){z(null),A(null)}),2e3))};Object(r.useEffect)((function(){j().then((function(e){return c(e)}))}),[]);var D=""===C?n:n.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));return Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{style:{fontSize:50,textAlign:"center",color:"Chocolate"},children:"PuhelinLuettelo"}),Object(m.jsx)(O,{filter:C,filterHandler:L}),Object(m.jsx)("hr",{}),Object(m.jsx)(g,{type:J,text:T}),Object(m.jsx)("h2",{style:{fontSize:40,margin:10,color:"chocolate"},children:"Lis\xe4t\xe4 uuden henkil\xf6n"}),Object(m.jsx)(x,{name:l,nameHandler:s,number:w,numberHandler:S,addPersonHandler:function(e){if(e.preventDefault(),n.some((function(e){return e.name.toLowerCase()===l.toLowerCase().trim()}))){if(window.confirm("".concat(l," on jo listassa, haluatko muuttaa henkil\xf6n numeron?"))){var t=n.find((function(e){return e.name.toLowerCase()===l.toLowerCase().trim()})),r=Object(o.a)(Object(o.a)({},t),{},{number:w});b(r.id.toString(),r).then((function(e){c(n.map((function(n){return n.id!==t.id?n:e}))),B("change","".concat(l," on muokattu"))})).catch((function(e){return B("error",e.response.data.error)}))}}else{var u={name:l.trim(),number:w.trim()};f(u).then((function(e){c(n.concat(e)),B("add","".concat(e.name," on lis\xe4tty"))})).catch((function(e){B("error",e.response.data.error)}))}s(""),S("")}}),Object(m.jsx)("hr",{}),Object(m.jsx)("h2",{style:{fontSize:40,margin:10,color:"chocolate"},children:"Henkil\xf6t"}),Object(m.jsx)(v,{toShow:D,deleteHandler:function(e){window.confirm("Haluatko poistaa henkil\xf6n listasta?")&&h(e).then((function(t){return B("delete","".concat(n.find((function(t){return t.id===e})).name," on poistettu!"))})).then((function(){return c(n.filter((function(t){return t.id!==e})))}))}})]})};i.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(w,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.32fb4740.chunk.js.map