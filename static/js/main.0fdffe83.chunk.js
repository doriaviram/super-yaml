(this["webpackJsonpsuper-yaml-playground"]=this["webpackJsonpsuper-yaml-playground"]||[]).push([[0],{26:function(e,n,t){},27:function(e,n,t){},48:function(e,n,t){"use strict";t.r(n);var a=t(1),l=t(0),c=t.n(l),s=t(19),o=t.n(s),r=(t(26),t(12)),i=(t(27),t(11)),m=t.n(i),p=t(50),d=t(20);t(45),t(46),t(47);var j=function(){var e=Object(l.useState)("\n_types:\n  MyCoolType:\n    properties:\n        names:\n            englishName: $name\n            britishName: $name\n        age: $age:25 # default value\nCoolExample1<MyCoolType>:\n  name: SuperYaml\nCoolExample2<MyCoolType>:\n  name: Syml\n  age: 27\n\n"),n=Object(r.a)(e,2),t=n[0],c=n[1],s=Object(l.useState)("Loading.."),o=Object(r.a)(s,2),i=o[0],j=o[1];return Object(l.useEffect)((function(){try{j(Object(d.compile)(t))}catch(e){j(e.message)}}),[t]),Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)("header",{className:"App-header",children:[Object(a.jsxs)("p",{children:["Super-YAML",Object(a.jsx)("p",{children:"super-yaml is a tool that helps you write enhanced yaml's and compile them to regular yaml `.yml` files."})]}),Object(a.jsxs)("div",{style:{display:"flex",justifyContent:"space-evenly",width:"100%",alignItems:"center"},children:[Object(a.jsxs)("div",{children:["Input",Object(a.jsx)(m.a,{mode:"yaml",theme:"chrome",onChange:c,name:"yamlInput",editorProps:{$blockScrolling:!0},value:t})]}),Object(a.jsx)("div",{children:Object(a.jsx)(p.a,{})}),Object(a.jsxs)("div",{children:["Output",Object(a.jsx)(m.a,{readOnly:!0,mode:"yaml",theme:"chrome",onChange:function(){},name:"yamlOutput",editorProps:{$blockScrolling:!0},value:i})]})]})]})})};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(j,{})}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.0fdffe83.chunk.js.map