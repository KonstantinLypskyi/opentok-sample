(this["webpackJsonpopen-took-sample-2"]=this["webpackJsonpopen-took-sample-2"]||[]).push([[0],{14:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),i=n(6),o=n.n(i),c=(n(14),n(9)),a=n(3),u=n.n(a),p=n(7),d=n(8),l=n(4),b=n.n(l),h=n(0),j=function(e){var t=e.apiKey,n=e.sessionId,s=e.token,i=Object(r.useRef)(null),o=function(e){e&&alert(e.message)};return Object(r.useEffect)((function(){i.current=b.a.initSession(t,n);var e=b.a.initPublisher("original-publisher",{insertMode:"append",width:"100%",height:"100%",publishVideo:!1,videoSource:!1},o);e.on("mediaStopped",(function(){return console.log("media stopped event fired")})),i.current.connect(s,(function(t){t?o(t):i.current.publish(e,o)})),i.current.on("streamCreated",(function(e){setTimeout((function(){i.current.subscribe(e.stream,"original-subscriber",{insertMode:"append",width:"100%",height:"100%",audioVolume:100},o)}),0)})),i.current.on("streamDestroyed",(function(e){console.log("subscriber stream destroyed: ",e)}))}),[]),Object(h.jsx)("div",{className:"app",children:Object(h.jsxs)("div",{className:"wrapper",children:[Object(h.jsx)("div",{id:"original-publisher",className:"original-publisher"}),Object(h.jsx)("div",{id:"original-subscriber",className:"original-subscriber"})]})})},f=function(){var e=Object(r.useState)(null),t=Object(d.a)(e,2),n=t[0],s=t[1],i=function(){var e=Object(p.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://opentok-routed.herokuapp.com/",e.next=3,fetch("https://opentok-routed.herokuapp.com//session");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,s(n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)(i,[]),n?Object(h.jsx)(j,Object(c.a)({},n)):Object(h.jsx)("div",{children:"Loader..."})};o.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(f,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.9a268f4d.chunk.js.map