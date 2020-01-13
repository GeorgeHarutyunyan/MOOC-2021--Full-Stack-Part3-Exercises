(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),l=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"DELETE"))},i=function(e){var n=e.persons,t=e.query,a=e.deletePerson,u=n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())});return r.a.createElement("ul",null,u.map(function(e){return r.a.createElement(l,{person:e,deletePerson:function(){return a(e.id)},key:e.name})}))},s=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},m=t(3),f=t.n(m),d="/api/persons",b=function(){return f.a.get(d).then(function(e){return console.log("persons:",e.data),e.data})},E=function(e){return f.a.post("".concat(d),e).then(function(e){return e.data})},h=function(e){return f.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"success"},n)},v=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),l=Object(c.a)(o,2),m=l[0],f=l[1],d=Object(a.useState)(""),g=Object(c.a)(d,2),j=g[0],O=g[1],w=Object(a.useState)(""),k=Object(c.a)(w,2),S=k[0],y=k[1],C=Object(a.useState)(null),P=Object(c.a)(C,2),N=P[0],q=P[1],D=Object(a.useState)(null),L=Object(c.a)(D,2),J=L[0],T=L[1];Object(a.useEffect)(function(){b().then(function(e){u(e),console.log("Persons in front: ",e)}).catch(function(e){console.log("Error getting persons",e)})},[]);var x=function(){setTimeout(function(){T(null),q(null)},5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:J}),r.a.createElement(v,{message:N}),r.a.createElement(s,{value:S,onChange:function(e){y(e.target.value)}}),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:m,number:j};t.some(function(e){return e.name===m})?(q("Names must be unique!"),x()):E(n).then(function(e){T("Successfully added ".concat(n.name," to the phonebook!")),x(),u(t.concat(n)),f(""),O("")}).catch(function(e){q("Failed to add ".concat(n.name," to the phonebook!")),x(),u(t.filter(function(e){return e.name!==n.name})),f(""),O("")})}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:m,onChange:function(e){f(e.target.value)}}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:j,onChange:function(e){O(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{persons:t,deletePerson:function(e){if(window.confirm("Delete ".concat(t.find(function(n){return e===n.id}).name," from the phonebook?"))){var n=t.find(function(n){return n.id===e});h(e).then(function(a){T("Successfully deleted ".concat(n.name)),x(),u(t.filter(function(n){return n.id!==e}))}).catch(function(a){q("".concat(n.name," is already deleted from the phonebook!")),x(),u(t.filter(function(n){return n.id!==e}))})}},query:S}))};t(37);o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.ba9da504.chunk.js.map