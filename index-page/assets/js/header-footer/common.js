//流布局
(function(t){"use strict";function e(t){return RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e){var i=n(t,e)?r:o;i(t,e)}var n,o,r;"classList"in document.documentElement?(n=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(n=function(t,i){return e(i).test(t.className)},o=function(t,e){n(t,e)||(t.className=t.className+" "+e)},r=function(t,i){t.className=t.className.replace(e(i)," ")});var s={hasClass:n,addClass:o,removeClass:r,toggleClass:i,has:n,add:o,remove:r,toggle:i};"function"==typeof define&&define.amd?define(s):t.classie=s})(window),function(t){"use strict";function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(n=function(t,i,n){t[i+n]=n.handleEvent?function(){var i=e(t);n.handleEvent.call(n,i)}:function(){var i=e(t);n.call(t,i)},t.attachEvent("on"+i,t[i+n])});var o=function(){};i.removeEventListener?o=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(o=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var r={bind:n,unbind:o};"function"==typeof define&&define.amd?define(r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){"use strict";function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==o.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var n=0,s=r.length;s>n;n++){var a=r[n];a()}}}function n(n){return n.bind(o,"DOMContentLoaded",i),n.bind(o,"readystatechange",i),n.bind(t,"load",i),e}var o=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define(["eventie/eventie"],n)):t.docReady=n(t.eventie)}(this),function(t){"use strict";function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(){"use strict";function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype,o=this,r=o.EventEmitter;n.getListeners=function(t){var e,i,n=this._getEvents();if(t instanceof RegExp){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),r="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e){var i,n,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("eventEmitter"),require("eventie")):t.imagesLoaded=e(t,t.EventEmitter,t.eventie)}(this,function(t,e,i){"use strict";function n(t,e){for(var i in e)t[i]=e[i];return t}function o(t){return"[object Array]"===d.call(t)}function r(t){var e=[];if(o(t))e=t;else if("number"==typeof t.length)for(var i=0,n=t.length;n>i;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,i){if(!(this instanceof s))return new s(t,e);"string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=r(t),this.options=n({},this.options),"function"==typeof e?i=e:n(this.options,e),i&&this.on("always",i),this.getImages(),h&&(this.jqDeferred=new h.Deferred);var o=this;setTimeout(function(){o.check()})}function a(t){this.img=t}function u(t){this.src=t,l[t]=this}var h=t.jQuery,c=t.console,p=c!==void 0,d=Object.prototype.toString;s.prototype=new e,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var t=0,e=this.elements.length;e>t;t++){var i=this.elements[t];"IMG"===i.nodeName&&this.addImage(i);for(var n=i.querySelectorAll("img"),o=0,r=n.length;r>o;o++){var s=n[o];this.addImage(s)}}},s.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},s.prototype.check=function(){function t(t,o){return e.options.debug&&p&&c.log("confirm",t,o),e.progress(t),i++,i===n&&e.complete(),!0}var e=this,i=0,n=this.images.length;if(this.hasAnyBroken=!1,!n)return this.complete(),void 0;for(var o=0;n>o;o++){var r=this.images[o];r.on("confirm",t),r.check()}},s.prototype.progress=function(t){this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;var e=this;setTimeout(function(){e.emit("progress",e,t),e.jqDeferred&&e.jqDeferred.notify&&e.jqDeferred.notify(e,t)})},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var e=this;setTimeout(function(){if(e.emit(t,e),e.emit("always",e),e.jqDeferred){var i=e.hasAnyBroken?"reject":"resolve";e.jqDeferred[i](e)}})},h&&(h.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(h(this))}),a.prototype=new e,a.prototype.check=function(){var t=l[this.img.src]||new u(this.img.src);if(t.isConfirmed)return this.confirm(t.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var e=this;t.on("confirm",function(t,i){return e.confirm(t.isLoaded,i),!0}),t.check()},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emit("confirm",this,e)};var l={};return u.prototype=new e,u.prototype.check=function(){if(!this.isChecked){var t=new Image;i.bind(t,"load",this),i.bind(t,"error",this),t.src=this.src,this.isChecked=!0}},u.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},u.prototype.onload=function(t){this.confirm(!0,"onload"),this.unbindProxyEvents(t)},u.prototype.onerror=function(t){this.confirm(!1,"onerror"),this.unbindProxyEvents(t)},u.prototype.confirm=function(t,e){this.isConfirmed=!0,this.isLoaded=t,this.emit("confirm",this,e)},u.prototype.unbindProxyEvents=function(t){i.unbind(t.target,"load",this),i.unbind(t.target,"error",this)},s}),function(t){"use strict";function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if("string"==typeof o){for(var s=n.call(arguments,1),a=0,u=this.length;u>a;a++){var h=this[a],c=t.data(h,e);if(c)if(t.isFunction(c[o])&&"_"!==o.charAt(0)){var p=c[o].apply(c,s);if(void 0!==p)return p}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+o+"'")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),o(t,e)},t.bridget}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define(["jquery"],i):i(t.jQuery)}(window),function(t){"use strict";function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var n=s[e];t[n]=0}return t}function n(t){function n(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var n=r(t);if("none"===n.display)return i();var o={};o.width=t.offsetWidth,o.height=t.offsetHeight;for(var c=o.isBorderBox=!(!h||!n[h]||"border-box"!==n[h]),p=0,d=s.length;d>p;p++){var l=s[p],f=n[l];f=a(t,f);var m=parseFloat(f);o[l]=isNaN(m)?0:m}var y=o.paddingLeft+o.paddingRight,g=o.paddingTop+o.paddingBottom,v=o.marginLeft+o.marginRight,b=o.marginTop+o.marginBottom,E=o.borderLeftWidth+o.borderRightWidth,w=o.borderTopWidth+o.borderBottomWidth,L=c&&u,S=e(n.width);S!==!1&&(o.width=S+(L?0:y+E));var x=e(n.height);return x!==!1&&(o.height=x+(L?0:g+w)),o.innerWidth=o.width-(y+E),o.innerHeight=o.height-(g+w),o.outerWidth=o.width+v,o.outerHeight=o.height+b,o}}function a(t,e){if(o||-1===e.indexOf("%"))return e;var i=t.style,n=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=n,s&&(r.left=s),e}var u,h=t("boxSizing");return function(){if(h){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[h]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var n=r(t);u=200===e(n.width),i.removeChild(t)}}(),n}var o=t.getComputedStyle,r=o?function(t){return o(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define(["get-style-property/get-style-property"],n):"object"==typeof exports?module.exports=n(require("get-style-property")):t.getSize=n(t.getStyleProperty)}(window),function(t,e){"use strict";function i(t,e){return t[a](e)}function n(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){n(t);for(var i=t.parentNode.querySelectorAll(e),o=0,r=i.length;r>o;o++)if(i[o]===t)return!0;return!1}function r(t,e){return n(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,n=t.length;n>i;i++){var o=t[i],r=o+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),h=i(u,"div");s=h?i:r}else s=o;"function"==typeof define&&define.amd?define(function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){"use strict";function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function o(t,o,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),h=r("transform"),c=u&&h,p=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],l=["transform","transition","transitionDuration","transitionProperty"],f=function(){for(var t={},e=0,i=l.length;i>e;e++){var n=l[e],o=r(n);o&&o!==n&&(t[n]=o)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=o(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var n=f[i]||i;e[n]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,n=e.isOriginTop,o=parseInt(t[i?"left":"right"],10),r=parseInt(t[n?"top":"bottom"],10);o=isNaN(o)?0:o,r=isNaN(r)?0:r;var a=this.layout.size;o-=i?a.paddingLeft:a.paddingRight,r-=n?a.paddingTop:a.paddingBottom,this.position.x=o,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var m=p?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-n,h={},c=this.layout.options;a=c.isOriginLeft?a:-a,u=c.isOriginTop?u:-u,h.transform=m(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=c?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var y=h&&n(h)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:y,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],o):(t.Outlayer={},t.Outlayer.Item=o(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){"use strict";function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===p.call(t)}function n(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var n=0,o=t.length;o>n;n++)e.push(t[n]);else e.push(t);return e}function o(t,e){var i=l(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,p,l,f,m){function y(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var n=++g;this.element.outlayerGUID=n,v[n]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return y.namespace="outlayer",y.Item=m,y.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(y.prototype,p.prototype),y.prototype.option=function(t){e(this.options,t)},y.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},y.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},y.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0,r=e.length;r>o;o++){var s=e[o],a=new i(s,this);n.push(a)}return n},y.prototype._filterFindItemElements=function(t){t=n(t);for(var e=this.options.itemSelector,i=[],o=0,r=t.length;r>o;o++){var s=t[o];if(d(s))if(e){f(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,h=a.length;h>u;u++)i.push(a[u])}else i.push(s)}return i},y.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},y.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},y.prototype._init=y.prototype.layout,y.prototype._resetLayout=function(){this.getSize()},y.prototype.getSize=function(){this.size=l(this.element)},y.prototype._getMeasurement=function(t,e){var i,n=this.options[t];n?("string"==typeof n?i=this.element.querySelector(n):d(n)&&(i=n),this[t]=i?l(i)[e]:n):this[t]=0},y.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},y.prototype._getItemsForLayout=function(t){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i];o.isIgnored||e.push(o)}return e},y.prototype._layoutItems=function(t,e){function i(){n.emitEvent("layoutComplete",[n,t])}var n=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var o=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,o.push(u)}this._processLayoutQueue(o)},y.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},y.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];this._positionItem(n.item,n.x,n.y,n.isInstant)}},y.prototype._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},y.prototype._postLayout=function(){this.resizeContainer()},y.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},y.prototype._getContainerSize=c,y.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},y.prototype._itemsOn=function(t,e,i){function n(){return o++,o===r&&i.call(s),!0}for(var o=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var h=t[a];h.on(e,n)}},y.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},y.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},y.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var n=t[e];this.ignore(n)}}},y.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var n=t[e];o(n,this.stamps),this.unignore(n)}},y.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n(t)):void 0},y.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},y.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},y.prototype._manageStamp=c,y.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=l(t),o={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return o},y.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},y.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},y.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},y.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},y.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},y.prototype.needsResizeLayout=function(){var t=l(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},y.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},y.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},y.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},y.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var n=t[i];n.reveal()}},y.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var n=t[i];n.hide()}},y.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];if(n.element===t)return n}},y.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],r=this.getItem(o);r&&e.push(r)}return e}},y.prototype.remove=function(t){t=n(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),o(s,this.items)}}},y.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var n=this.items[e];n.destroy()}this.unbindResize(),delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},y.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},y.create=function(t,i){function n(){y.apply(this,arguments)}return Object.create?n.prototype=Object.create(y.prototype):e(n.prototype,y.prototype),n.prototype.constructor=n,n.defaults=e({},y.defaults),e(n.defaults,i),n.prototype.settings={},n.namespace=t,n.data=y.data,n.Item=function(){m.apply(this,arguments)},n.Item.prototype=new m,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),o="data-"+e+"-options",s=0,c=i.length;c>s;s++){var p,d=i[s],l=d.getAttribute(o);try{p=l&&JSON.parse(l)}catch(f){u&&u.error("Error parsing "+o+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+f);continue}var m=new n(d,p);h&&h.data(d,t,m)}}),h&&h.bridget&&h.bridget(t,n),n},y.Item=m,y}var a=t.document,u=t.console,h=t.jQuery,c=function(){},p=Object.prototype.toString,d="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},l=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){"use strict";function e(t,e){var n=t.create("masonry");return n.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},n.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},n.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},n.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,n=e&&1>e?"round":"ceil",o=Math[n](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var r=this._getColGroup(o),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},h=s+t.size.outerHeight,c=this.cols+1-r.length,p=0;c>p;p++)this.colYs[a+p]=h;return u},n.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},n.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this.options.isOriginLeft?n.left:n.right,r=o+i.outerWidth,s=Math.floor(o/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?n.top:n.bottom)+i.outerHeight,h=s;a>=h;h++)this.colYs[h]=Math.max(u,this.colYs[h])},n.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},n.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},n}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++){var o=t[i];if(o===e)return i}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){"use strict";function e(t,e){t[s]=e}var i=t.MD={};i.pages={};var n;docReady(function(){n=document.querySelector("#notification");var t=document.body.getAttribute("data-page");t&&"function"==typeof i[t]&&i[t]()}),i.getSomeItemElements=function(){for(var t=document.createDocumentFragment(),e=[],i=0;3>i;i++){var n=document.createElement("div"),o=Math.random(),r=o>.85?"w4":o>.7?"w2":"",s=Math.random(),a=s>.85?"h4":s>.7?"h2":"";n.className="item "+r+" "+a,t.appendChild(n),e.push(n)}};var o,r=document.documentElement,s=void 0!==r.textContent?"textContent":"innerText",a=getStyleProperty("transition"),u=a?1e3:1500;i.notify=function(t,r){e(n,t),a&&(n.style[a]="none"),n.style.display="block",n.style.opacity="1",r&&(o&&clearTimeout(o),o=setTimeout(i.hideNotify,u))},i.hideNotify=function(){a?(n.style[a]="opacity 1.0s",n.style.opacity="0"):n.style.display="none"}}(window),function(t){"use strict";function e(){var t=new Date,e=t.getMinutes();e=10>e?"0"+e:e;var i=t.getSeconds();return i=10>i?"0"+i:i,[t.getHours(),e,i].join(":")}function i(t){n.notify(t+" at "+e(),!0)}var n=t.MD;n.events=function(){(function(){var t=document.querySelector("#layout-complete-demo .masonry"),e=new Masonry(t,{columnWidth:60});e.on("layoutComplete",function(t,e){i("Masonry layout completed on "+e.length+" items")}),eventie.bind(t,"click",function(t){classie.has(t.target,"item")&&(classie.toggle(t.target,"gigante"),e.layout())})})(),function(){var t=document.querySelector("#remove-complete-demo .masonry"),e=new Masonry(t,{columnWidth:60});e.on("removeComplete",function(t,e){i("Removed "+e.length+" items")}),eventie.bind(t,"click",function(t){classie.has(t.target,"item")&&e.remove(t.target)})}()}}(window),function(t){"use strict";var e=t.MD,i=getStyleProperty("transition"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i];e.faq=function(){(function(){var t=document.querySelector("#animate-item-size .masonry"),e=new Masonry(t,{columnWidth:60});eventie.bind(t,"click",function(t){var i=t.target;if(classie.has(i,"item-content")){var n=i.parentNode;classie.toggleClass(n,"is-expanded"),e.layout()}})})(),function(){var t=document.querySelector("#animate-item-size-responsive .masonry"),e=new Masonry(t,{columnWidth:".grid-sizer",itemSelector:".item"});eventie.bind(t,"click",function(t){var o=t.target;if(classie.has(o,"item-content")){var r=getSize(o);o.style[i]="none",o.style.width=r.width+"px",o.style.height=r.height+"px";var s=o.parentNode;classie.toggleClass(s,"is-expanded");var a=o.offsetWidth;if(o.style[i]="",i){var u=function(){o.style.width="",o.style.height="",o.removeEventListener(n,u,!1)};o.addEventListener(n,u,!1)}var h=getSize(s);o.style.width=h.width+"px",o.style.height=h.height+"px",a=null,e.layout()}})}()}}(window),function(t){"use strict";function e(){for(var t=[],e=document.createDocumentFragment(),r=a,s=0,u=r.length;u>s;s++){var h=i(r[s]);t.push(h),e.appendChild(h)}imagesLoaded(e).on("progress",function(t,e){var i=e.img.parentNode.parentNode;n.appendChild(i),o.appended(i)
})}function i(t){var e=document.createElement("div");e.className="hero-item has-example is-hidden";var i=document.createElement("a");i.href=t.url;var n=document.createElement("img");n.src=t.image;var o=document.createElement("p");return o.className="example-title",o.textContent=t.title,i.appendChild(n),i.appendChild(o),e.appendChild(i),e}var n,o,r,s=t.MD;s.index=function(){(function(){var t=document.querySelector("#hero");n=t.querySelector(".hero-masonry"),o=new Masonry(n,{itemSelector:".hero-item",columnWidth:".grid-sizer"}),e()})(),r=document.querySelector("#load-more-examples")};var a=[{title:"Erik Johansson",url:"http://erikjohanssonphoto.com/work/imagecats/personal/",image:"http://i.imgur.com/6Lo8oun.jpg"},{title:"Tumblr Staff: Archive",url:"http://staff.tumblr.com/archive",image:"http://i.imgur.com/igjvRa3.jpg"},{title:"Halcyon theme",url:"http://halcyon-theme.tumblr.com/",image:"http://i.imgur.com/A1RSOhg.jpg"},{title:"RESIZE.THATSH.IT",url:"http://resize.thatsh.it/",image:"http://i.imgur.com/00xWxLG.png"},{title:"Vox Media",url:"http://www.voxmedia.com",image:"http://i.imgur.com/xSiTFij.jpg"},{title:"Kristian Hammerstad",url:"http://www.kristianhammerstad.com/",image:"http://i.imgur.com/Zwd7Sch.jpg"},{title:"Loading Effects for Grid Items | Demo 2",url:"http://tympanus.net/Development/GridLoadingEffects/index2.html",image:"http://i.imgur.com/iFBSB1t.jpg"}]}(window),function(t){"use strict";function e(){var t=document.createElement("div"),e=Math.random(),i=Math.random(),n=e>.92?"w4":e>.8?"w3":e>.6?"w2":"",o=i>.85?"h4":i>.6?"h3":i>.35?"h2":"";return t.className="item "+n+" "+o,t}var i=t.MD;i.methods=function(){(function(){var t=document.querySelector("#appended-demo"),i=t.querySelector(".masonry"),n=t.querySelector("button"),o=new Masonry(i,{columnWidth:60});eventie.bind(n,"click",function(){for(var t=[],n=document.createDocumentFragment(),r=0;3>r;r++){var s=e();n.appendChild(s),t.push(s)}i.appendChild(n),o.appended(t)})})(),function(){var t=document.querySelector("#destroy-demo"),e=t.querySelector(".masonry"),i=t.querySelector("button"),n=new Masonry(e,{columnWidth:60}),o=!0;eventie.bind(i,"click",function(){o?n.destroy():n=new Masonry(e),o=!o})}(),function(){var t=document.querySelector("#layout-demo .masonry"),e=new Masonry(t,{columnWidth:60});eventie.bind(t,"click",function(t){classie.has(t.target,"item")&&(classie.toggle(t.target,"gigante"),e.layout())})}(),function(){var t=document.querySelector("#prepended-demo"),i=t.querySelector(".masonry"),n=t.querySelector("button"),o=new Masonry(i,{columnWidth:60});eventie.bind(n,"click",function(){for(var t=[],n=document.createDocumentFragment(),r=0;3>r;r++){var s=e();n.appendChild(s),t.push(s)}i.insertBefore(n,i.firstChild),o.prepended(t)})}(),function(){var t=document.querySelector("#stamp-demo"),e=t.querySelector(".stamp"),i=t.querySelector("button"),n=new Masonry(t.querySelector(".masonry"),{columnWidth:60,itemSelector:".item"}),o=!1;eventie.bind(i,"click",function(){o?n.unstamp(e):n.stamp(e),n.layout(),o=!o})}(),function(){var t=document.querySelector("#remove-demo .masonry"),e=new Masonry(t,{columnWidth:60});eventie.bind(t,"click",function(t){classie.has(t.target,"item")&&(e.remove(t.target),e.layout())})}()}}(window);

//固定js
//svg处理js
!function(t,e){"use strict";function r(t){t=t.split(" ");for(var e={},r=t.length,n=[];r--;)e.hasOwnProperty(t[r])||(e[t[r]]=1,n.unshift(t[r]));return n.join(" ")}var n="file:"===t.location.protocol,i=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),o=Array.prototype.forEach||function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;var r,n=this.length>>>0;for(r=0;n>r;++r)r in this&&t.call(e,this[r],r,this)},a={},l=0,s=[],u=[],c={},f=function(t){return t.cloneNode(!0)},p=function(t,e){u[t]=u[t]||[],u[t].push(e)},d=function(t){for(var e=0,r=u[t].length;r>e;e++)!function(e){setTimeout(function(){u[t][e](f(a[t]))},0)}(e)},v=function(e,r){if(void 0!==a[e])a[e]instanceof SVGSVGElement?r(f(a[e])):p(e,r);else{if(!t.XMLHttpRequest)return r("Browser does not support XMLHttpRequest"),!1;a[e]={},p(e,r);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===i.readyState){if(404===i.status||null===i.responseXML)return r("Unable to load SVG file: "+e),n&&r("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),r(),!1;if(!(200===i.status||n&&0===i.status))return r("There was a problem injecting the SVG: "+i.status+" "+i.statusText),!1;if(i.responseXML instanceof Document)a[e]=i.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var t;try{var o=new DOMParser;t=o.parseFromString(i.responseText,"text/xml")}catch(l){t=void 0}if(!t||t.getElementsByTagName("parsererror").length)return r("Unable to parse SVG file: "+e),!1;a[e]=t.documentElement}d(e)}},i.open("GET",e),i.overrideMimeType&&i.overrideMimeType("text/xml"),i.send()}},h=function(e,n,a,u){var f=e.getAttribute("data-src")||e.getAttribute("src");if(!/\.svg/i.test(f))return void u("Attempted to inject a file with a non-svg extension: "+f);if(!i){var p=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(p?(e.setAttribute("src",p),u(null)):a?(e.setAttribute("src",a+"/"+f.split("/").pop().replace(".svg",".png")),u(null)):u("This browser does not support SVG and no PNG fallback was defined."))}-1===s.indexOf(e)&&(s.push(e),e.setAttribute("src",""),v(f,function(i){if("undefined"==typeof i||"string"==typeof i)return u(i),!1;var a=e.getAttribute("id");a&&i.setAttribute("id",a);var p=e.getAttribute("title");p&&i.setAttribute("title",p);var d=[].concat(i.getAttribute("class")||[],"injected-svg",e.getAttribute("class")||[]).join(" ");i.setAttribute("class",r(d));var v=e.getAttribute("style");v&&i.setAttribute("style",v);var h=[].filter.call(e.attributes,function(t){return/^data-\w[\w\-]*$/.test(t.name)});o.call(h,function(t){t.name&&t.value&&i.setAttribute(t.name,t.value)});var g,m,b,y,A,w={clipPath:["clip-path"],"color-profile":["color-profile"],cursor:["cursor"],filter:["filter"],linearGradient:["fill","stroke"],marker:["marker","marker-start","marker-mid","marker-end"],mask:["mask"],pattern:["fill","stroke"],radialGradient:["fill","stroke"]};Object.keys(w).forEach(function(t){g=t,b=w[t],m=i.querySelectorAll("defs "+g+"[id]");for(var e=0,r=m.length;r>e;e++){y=m[e].id,A=y+"-"+l;var n;o.call(b,function(t){n=i.querySelectorAll("["+t+'*="'+y+'"]');for(var e=0,r=n.length;r>e;e++)n[e].setAttribute(t,"url(#"+A+")")}),m[e].id=A}}),i.removeAttribute("xmlns:a");for(var x,S,k=i.querySelectorAll("script"),j=[],G=0,T=k.length;T>G;G++)S=k[G].getAttribute("type"),S&&"application/ecmascript"!==S&&"application/javascript"!==S||(x=k[G].innerText||k[G].textContent,j.push(x),i.removeChild(k[G]));if(j.length>0&&("always"===n||"once"===n&&!c[f])){for(var M=0,V=j.length;V>M;M++)new Function(j[M])(t);c[f]=!0}var E=i.querySelectorAll("style");o.call(E,function(t){t.textContent+=""}),e.parentNode.replaceChild(i,e),delete s[s.indexOf(e)],e=null,l++,u(i)}))},g=function(t,e,r){e=e||{};var n=e.evalScripts||"always",i=e.pngFallback||!1,a=e.each;if(void 0!==t.length){var l=0;o.call(t,function(e){h(e,n,i,function(e){a&&"function"==typeof a&&a(e),r&&t.length===++l&&r(l)})})}else t?h(t,n,i,function(e){a&&"function"==typeof a&&a(e),r&&r(1),t=null}):r&&r(0)};"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=g:"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof t&&(t.SVGInjector=g)}(window,document);

$(document).ready(function(){
	//svg图片处理
	if (!(/msie [6|7|8]/i.test(navigator.userAgent))){
		SVGInjector(document.querySelectorAll("img.inject-svg"));	
	}else{
		$("img.inject-svg").remove();
	}
	
	$(".header .menubtn").addClass("tip");
	$(".header .menubtn").click(function(){
		if($(this).hasClass("tip")){
			$(this).removeClass("tip");
		}
	})
	$(".header .menubtn").click(function(){
		if($(this).hasClass("close")){
			$(this).removeClass("close").addClass("open");
			$(".mobilemenu").show();
		}else{
			$(this).removeClass("open").addClass("close");
			$(".mobilemenu").fadeOut();
		}
		
	});
	$(window).scroll(function(){
		if($(window).scrollTop()>$("header").height()+1){
			$("body").addClass("headerfixed");
		}else{
			$("body").removeClass("headerfixed");
		}
	});

	if($("body").hasClass("hidefooter")){
	    $(".footer .footercontent").hide();
		$(".footer .bar .icon").removeClass("shang").addClass("xia");
	}
   	$(".footer .bar .icon").click(function(){
		if($(".footer .footercontent").is(":hidden")){
			
			$(".footer .footercontent").slideDown(0,function(){
				$("html,body").animate({scrollTop: $(document).height()-$(".footer").height()+$(".footer .bar").outerHeight()-$(".header").height()}, 1000);
				$(".footer .bar .icon").removeClass("xia").addClass("shang");
			});
			
		}else{

			$(".footer .bar .icon").removeClass("shang").addClass("xia");
			$(".footer .footercontent").slideUp(1000);
		}
	 });

    
    
     $(".dialogofcode .codeopr .item.prev img").click(function(){
		  var currentobj=$(".dialogofcode .codeitem.active").removeClass("active").prev();
		  if(currentobj.hasClass("codeitem")){
			  currentobj.addClass("active");
		  }else{
			  $(".dialogofcode .codeitem:last").addClass("active");
		  }
	  });
	  $(".dialogofcode .codeopr .item.next img").click(function(){
		  var currentobj=$(".dialogofcode .codeitem.active").removeClass("active").next();
		  if(currentobj.hasClass("codeitem")){
			  currentobj.addClass("active");
		  }else{
			  $(".dialogofcode .codeitem:first").addClass("active");
		  }
	  });

    //侧边栏begin
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1) $('.sb-top').fadeIn(500);
        else if ($(window).scrollTop() < 900) $('.sb-top').fadeOut(500);
        else if ($(window).scrollTop() == $(window).height()) $('.sb-top').hide()
      });
	
	$('.sb-top,.toplink').click(function() {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});
	$('.sb-top').hover(function() {
		$('.sider-bar .sb-top .arrow').css('background', 'gray')
	}, function() {
		$('.sider-bar .sb-top .arrow').css('background', '#ccc')
	});
	$('#app').hover(function() {
		$(this).find('.sb-w').show()
	}, function() {
		$(this).find('.sb-w').hide()
	});
    //侧边栏end
    //移动端展开与隐藏
    if($(window).width()<=650){
    	$(".txtlist .listitem:eq(0)").addClass("open");
    	$(".txtlist .listitem .l-title").click(function(){
    		$(this).next().slideToggle();
    		$(this).parent().toggleClass("open");
    	});
    }
});
$(document).ready(function(){
    $(".theightbox").each(function(){
      var currentbox=$(this);
      currentbox.imagesLoaded(function() {
        var maxheight=0;
        $(currentbox).find(".theight").each(function(){
          if($(this).height()>maxheight){
            maxheight=$(this).height();
          }
        });
        $(currentbox).find(".theight").height(maxheight);
      });
    });
    $(".setheightbox").each(function(){

      var currentbox=$(this);
      currentbox.imagesLoaded(function() {
        $(currentbox).find(".setheight").height(function(){

        	return $(this).width()*parseFloat($(this).attr("bili"));
        });
      });
    });

});
$(window).resize(function() {
  $(".theightbox").each(function(){
      var currentbox=$(this);
      currentbox.imagesLoaded(function() {
        var maxheight=0;
        $(currentbox).find(".theight").css("height","auto");
        $(currentbox).find(".theight").each(function(){
          if($(this).height()>maxheight){
            maxheight=$(this).height();
          }
        });
        $(currentbox).find(".theight").height(maxheight);
      });
    });
  $(".setheightbox").each(function(){
      var currentbox=$(this);
      currentbox.imagesLoaded(function() {
        var maxheight=0;
        $(currentbox).find(".setheight").height(function(){
        	return $(this).width()*parseFloat($(this).attr("bili"));
        });
      });
    });

});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function gototop(){
     $('body,html').animate({scrollTop:0},1000);
}

function showcodedialog(){
	$(".dialog").hide();
	$(".overback").show();
	$(".dialogofcode").fadeIn();
	    	
}
function hidecodeidalog(){
	$(".overback").hide();
	$(".dialogofcode").hide();
}

function hidedetailinfodialog(){
	$(".overback").hide();
	$(".dialogofdetailinfo").hide();
}
function showsearchdialog(){
	$(".dialog").hide();
	$(".overback").show();
	$(".dialogofsearch").fadeIn();
	    	
}
function hidesearchdialog(){
	$(".overback").hide();
	$(".dialogofsearch").hide();
}
function showmoremenudialog(){
	$(".dialog").hide();
	$(".overback").show();
	$(".dialogofmoremenu").fadeIn();
	    	
}
function hidemoremenudialog(){
	$(".overback").hide();
	$(".dialogofmoremenu").hide();
}
$(document).ready(function(){
	$(".dialogofsearch .btn.enter").click(function(){
		console.log($(".dialogofsearch .dialogofsearch-input").val());
		hidesearchdialog();
	});
	
	//公用选项卡切换

	$(document).on("click", ".tab-box .tab-a", function () {
	    $(this).addClass("on").siblings().removeClass("on");
	    var ii = $(this).index();
	    $(this).parents(".tab-box").find(".tab-b").eq(ii).show().siblings().hide();
	    $(".auto-img img").one('load', function () {
	        mainBgResize(this, 1, 1);
	    }).each(function () {
	        if (this.complete) $(this).load();
	    });
	})
	//
	$(".tab-box").each(function (i) {
	    $(this).find(".tab-a:eq(0)").click();
	});



	


	//分享
	  
	$(".share .icon.pic_16").click(function () {//微博
	        var url = $(this).data("txt");
	        var url = window.location.href;
	        var title = document.title;
	        var op = "http://service.weibo.com/share/share.php?title=" + title + "&url=" + encodeURIComponent(url) + "";
	        window.open(op)
	})
	    
	$(".share .icon.pic_17").click(function () {//QQ
	    var url = $(this).data("txt");
	    var url = window.location.href;
	    var title = document.title;
	    var op = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(url) + "";
	    window.open(op);
	})
	    
	$(".share .icon.pic_18").click(function () {//Facebook
	    var url = $(this).data("txt");
	    var url = window.location.href;
	    var title = document.title;
	    var op = "https://www.facebook.com/sharer.php?s=100&p[title]=" + title + "&p[summary]=!&p[url]=" + encodeURIComponent(url) + ""
	    window.open(op)
	})
	    

	$(".share .icon.pic_19").click(function () {//Twitter
	    var url = $(this).data("txt");
	    var url = window.location.href;
	    var title = document.title;
	    var op = "https://www.tumblr.com/login?redirect_to=https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=" + encodeURIComponent(url) + "&title=" + title + "";
	    window.open(op)
	})
	    

	$(".share .icon.pic_20").click(function () {//Google+
	 
	    var url = $(this).data("txt");
	    var url = window.location.href;
	    var title = document.title;
	    var op = "https://plus.google.com/share?url=" + encodeURIComponent(url) + "&t=" + title + "";
	    window.open(op)
	})
	    
	$(".share .icon.pic_14,.share .icon.pic_15").click(function () {//微信
	        var url = $(this).attr("data-qrcode")
	        //alert(url)
	        var title = ""
	        title += "<div class='weixin'>"
	        title += "<i class='c'>x</i>"
	        title += "<h2>二维码</h2>"
	        title += "<div class='img'><img src='" + url + "' width='100px;' height='100px;'></div>"
	        title += "<p>扫一扫</p>"
	        title += "</div>"
	        $("body").remove(".weixin");
	        $("body").append(title)
	        //var op="http://service.weibo.com/share/share.php?url='"+ url +"'&title='"+ title +"'&searchPic=false"
	        //window.open(op)
	})
	$(document).on("click", ".weixin .c", function () {
	    //alert(0)
	    $(".weixin").remove();
	})
});

   






//检查JS是否兼容css属性
function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
    i,
    humpString = [],
    htmlStyle = document.documentElement.style,
    _toHumb = function (string) {
        return string.replace(/-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}
window._bd_share_config = {
        common : {
            bdText : '三人形思企划致力于品牌标志vi系统,网站建设,影视宣传片,画册折页,包装设计,环境导视,空间展示,庆典活动等品牌建立、推广、体验设计服务.屡次获奖,您的最佳设计合作伙伴,值得浏览 。', 
            bdDesc : '三人形思企划致力于品牌标志vi系统,网站建设,影视宣传片,画册折页,包装设计,环境导视,空间展示,庆典活动等品牌建立、推广、体验设计服务.屡次获奖,您的最佳设计合作伙伴,值得浏览 。', 
            bdUrl : 'http://www.sense-bd.com',  
            bdPic : 'http://www.sense-bd.com/images/banner-800.gif'
        },
        share : [{
            "bdSize" : 16
        }],
    }
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
function stopBodyScroll() {
	var e = $("body").width();
	$("body, html").addClass("-lock-scroll");
	var t = $("body").width(),
		r = t - e;
	r && $("body").width(e + "px")
}
function startBodyScroll() {
	$("body, html").removeClass("-lock-scroll"), $("body").css("width", "100%")
}
function scrollTo(e,t){
	$("html,body").animate({scrollTop: e.offset().top-$(".header").height()}, t);
}