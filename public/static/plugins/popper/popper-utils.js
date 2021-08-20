/*! For license information please see popper-utils.js.LICENSE.txt */
function getStyleComputedProperty(e,t){if(1!==e.nodeType)return[];const n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function getParentNode(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function getScrollParent(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}const{overflow:t,overflowX:n,overflowY:o}=getStyleComputedProperty(e);return/(auto|scroll|overlay)/.test(t+o+n)?e:getScrollParent(getParentNode(e))}function getReferenceNode(e){return e&&e.referenceNode?e.referenceNode:e}var isBrowser="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator;const isIE11=isBrowser&&!(!window.MSInputMethodContext||!document.documentMode),isIE10=isBrowser&&/MSIE 10/.test(navigator.userAgent);function isIE(e){return 11===e?isIE11:10===e?isIE10:isIE11||isIE10}function getOffsetParent(e){if(!e)return document.documentElement;const t=isIE(10)?document.body:null;let n=e.offsetParent||null;for(;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;const o=n&&n.nodeName;return o&&"BODY"!==o&&"HTML"!==o?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===getStyleComputedProperty(n,"position")?getOffsetParent(n):n:e?e.ownerDocument.documentElement:document.documentElement}function isOffsetContainer(e){const{nodeName:t}=e;return"BODY"!==t&&("HTML"===t||getOffsetParent(e.firstElementChild)===e)}function getRoot(e){return null!==e.parentNode?getRoot(e.parentNode):e}function findCommonOffsetParent(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;const n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?e:t,r=n?t:e,i=document.createRange();i.setStart(o,0),i.setEnd(r,0);const{commonAncestorContainer:s}=i;if(e!==s&&t!==s||o.contains(r))return isOffsetContainer(s)?s:getOffsetParent(s);const f=getRoot(e);return f.host?findCommonOffsetParent(f.host,t):findCommonOffsetParent(e,getRoot(t).host)}function getScroll(e,t="top"){const n="top"===t?"scrollTop":"scrollLeft",o=e.nodeName;if("BODY"===o||"HTML"===o){const t=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||t)[n]}return e[n]}function includeScroll(e,t,n=!1){const o=getScroll(t,"top"),r=getScroll(t,"left"),i=n?-1:1;return e.top+=o*i,e.bottom+=o*i,e.left+=r*i,e.right+=r*i,e}function getBordersSize(e,t){const n="x"===t?"Left":"Top",o="Left"===n?"Right":"Bottom";return parseFloat(e[`border${n}Width`])+parseFloat(e[`border${o}Width`])}function getSize(e,t,n,o){return Math.max(t[`offset${e}`],t[`scroll${e}`],n[`client${e}`],n[`offset${e}`],n[`scroll${e}`],isIE(10)?parseInt(n[`offset${e}`])+parseInt(o["margin"+("Height"===e?"Top":"Left")])+parseInt(o["margin"+("Height"===e?"Bottom":"Right")]):0)}function getWindowSizes(e){const t=e.body,n=e.documentElement,o=isIE(10)&&getComputedStyle(n);return{height:getSize("Height",t,n,o),width:getSize("Width",t,n,o)}}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};function getClientRect(e){return _extends({},e,{right:e.left+e.width,bottom:e.top+e.height})}function getBoundingClientRect(e){let t={};try{if(isIE(10)){t=e.getBoundingClientRect();const n=getScroll(e,"top"),o=getScroll(e,"left");t.top+=n,t.left+=o,t.bottom+=n,t.right+=o}else t=e.getBoundingClientRect()}catch(e){}const n={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},o="HTML"===e.nodeName?getWindowSizes(e.ownerDocument):{},r=o.width||e.clientWidth||n.width,i=o.height||e.clientHeight||n.height;let s=e.offsetWidth-r,f=e.offsetHeight-i;if(s||f){const t=getStyleComputedProperty(e);s-=getBordersSize(t,"x"),f-=getBordersSize(t,"y"),n.width-=s,n.height-=f}return getClientRect(n)}function getOffsetRectRelativeToArbitraryNode(e,t,n=!1){const o=isIE(10),r="HTML"===t.nodeName,i=getBoundingClientRect(e),s=getBoundingClientRect(t),f=getScrollParent(e),d=getStyleComputedProperty(t),c=parseFloat(d.borderTopWidth),l=parseFloat(d.borderLeftWidth);n&&r&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));let u=getClientRect({top:i.top-s.top-c,left:i.left-s.left-l,width:i.width,height:i.height});if(u.marginTop=0,u.marginLeft=0,!o&&r){const e=parseFloat(d.marginTop),t=parseFloat(d.marginLeft);u.top-=c-e,u.bottom-=c-e,u.left-=l-t,u.right-=l-t,u.marginTop=e,u.marginLeft=t}return(o&&!n?t.contains(f):t===f&&"BODY"!==f.nodeName)&&(u=includeScroll(u,t)),u}function getViewportOffsetRectRelativeToArtbitraryNode(e,t=!1){const n=e.ownerDocument.documentElement,o=getOffsetRectRelativeToArbitraryNode(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),s=t?0:getScroll(n),f=t?0:getScroll(n,"left");return getClientRect({top:s-o.top+o.marginTop,left:f-o.left+o.marginLeft,width:r,height:i})}function isFixed(e){const t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===getStyleComputedProperty(e,"position"))return!0;const n=getParentNode(e);return!!n&&isFixed(n)}function getFixedPositionOffsetParent(e){if(!e||!e.parentElement||isIE())return document.documentElement;let t=e.parentElement;for(;t&&"none"===getStyleComputedProperty(t,"transform");)t=t.parentElement;return t||document.documentElement}function getBoundaries(e,t,n,o,r=!1){let i={top:0,left:0};const s=r?getFixedPositionOffsetParent(e):findCommonOffsetParent(e,getReferenceNode(t));if("viewport"===o)i=getViewportOffsetRectRelativeToArtbitraryNode(s,r);else{let n;"scrollParent"===o?(n=getScrollParent(getParentNode(t)),"BODY"===n.nodeName&&(n=e.ownerDocument.documentElement)):n="window"===o?e.ownerDocument.documentElement:o;const f=getOffsetRectRelativeToArbitraryNode(n,s,r);if("HTML"!==n.nodeName||isFixed(s))i=f;else{const{height:t,width:n}=getWindowSizes(e.ownerDocument);i.top+=f.top-f.marginTop,i.bottom=t+f.top,i.left+=f.left-f.marginLeft,i.right=n+f.left}}const f="number"==typeof(n=n||0);return i.left+=f?n:n.left||0,i.top+=f?n:n.top||0,i.right-=f?n:n.right||0,i.bottom-=f?n:n.bottom||0,i}function getArea({width:e,height:t}){return e*t}function computeAutoPlacement(e,t,n,o,r,i=0){if(-1===e.indexOf("auto"))return e;const s=getBoundaries(n,o,i,r),f={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},d=Object.keys(f).map((e=>_extends({key:e},f[e],{area:getArea(f[e])}))).sort(((e,t)=>t.area-e.area)),c=d.filter((({width:e,height:t})=>e>=n.clientWidth&&t>=n.clientHeight)),l=c.length>0?c[0].key:d[0].key,u=e.split("-")[1];return l+(u?`-${u}`:"")}const timeoutDuration=function(){const e=["Edge","Trident","Firefox"];for(let t=0;t<e.length;t+=1)if(isBrowser&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();function microtaskDebounce(e){let t=!1;return()=>{t||(t=!0,window.Promise.resolve().then((()=>{t=!1,e()})))}}function taskDebounce(e){let t=!1;return()=>{t||(t=!0,setTimeout((()=>{t=!1,e()}),timeoutDuration))}}const supportsMicroTasks=isBrowser&&window.Promise;var debounce=supportsMicroTasks?microtaskDebounce:taskDebounce;function find(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function findIndex(e,t,n){if(Array.prototype.findIndex)return e.findIndex((e=>e[t]===n));const o=find(e,(e=>e[t]===n));return e.indexOf(o)}function getOffsetRect(e){let t;if("HTML"===e.nodeName){const{width:n,height:o}=getWindowSizes(e.ownerDocument);t={width:n,height:o,left:0,top:0}}else t={width:e.offsetWidth,height:e.offsetHeight,left:e.offsetLeft,top:e.offsetTop};return getClientRect(t)}function getOuterSizes(e){const t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),o=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+o,height:e.offsetHeight+n}}function getOppositePlacement(e){const t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(e=>t[e]))}function getPopperOffsets(e,t,n){n=n.split("-")[0];const o=getOuterSizes(e),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),s=i?"top":"left",f=i?"left":"top",d=i?"height":"width",c=i?"width":"height";return r[s]=t[s]+t[d]/2-o[d]/2,r[f]=n===f?t[f]-o[c]:t[getOppositePlacement(f)],r}function getReferenceOffsets(e,t,n,o=null){return getOffsetRectRelativeToArbitraryNode(n,o?getFixedPositionOffsetParent(t):findCommonOffsetParent(t,getReferenceNode(n)),o)}function getSupportedPropertyName(e){const t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1);for(let o=0;o<t.length;o++){const r=t[o],i=r?`${r}${n}`:e;if(void 0!==document.body.style[i])return i}return null}function isFunction(e){return e&&"[object Function]"==={}.toString.call(e)}function isModifierEnabled(e,t){return e.some((({name:e,enabled:n})=>n&&e===t))}function isModifierRequired(e,t,n){const o=find(e,(({name:e})=>e===t)),r=!!o&&e.some((e=>e.name===n&&e.enabled&&e.order<o.order));if(!r){const e=`\`${t}\``,o=`\`${n}\``;console.warn(`${o} modifier is required by ${e} modifier in order to work, be sure to include it before ${e}!`)}return r}function isNumeric(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function getWindow(e){const t=e.ownerDocument;return t?t.defaultView:window}function removeEventListeners(e,t){return getWindow(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((e=>{e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function runModifiers(e,t,n){return(void 0===n?e:e.slice(0,findIndex(e,"name",n))).forEach((e=>{e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");const n=e.function||e.fn;e.enabled&&isFunction(n)&&(t.offsets.popper=getClientRect(t.offsets.popper),t.offsets.reference=getClientRect(t.offsets.reference),t=n(t,e))})),t}function setAttributes(e,t){Object.keys(t).forEach((function(n){!1!==t[n]?e.setAttribute(n,t[n]):e.removeAttribute(n)}))}function setStyles(e,t){Object.keys(t).forEach((n=>{let o="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&isNumeric(t[n])&&(o="px"),e.style[n]=t[n]+o}))}function attachToScrollParents(e,t,n,o){const r="BODY"===e.nodeName,i=r?e.ownerDocument.defaultView:e;i.addEventListener(t,n,{passive:!0}),r||attachToScrollParents(getScrollParent(i.parentNode),t,n,o),o.push(i)}function setupEventListeners(e,t,n,o){n.updateBound=o,getWindow(e).addEventListener("resize",n.updateBound,{passive:!0});const r=getScrollParent(e);return attachToScrollParents(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}var index={computeAutoPlacement:computeAutoPlacement,debounce:debounce,findIndex:findIndex,getBordersSize:getBordersSize,getBoundaries:getBoundaries,getBoundingClientRect:getBoundingClientRect,getClientRect:getClientRect,getOffsetParent:getOffsetParent,getOffsetRect:getOffsetRect,getOffsetRectRelativeToArbitraryNode:getOffsetRectRelativeToArbitraryNode,getOuterSizes:getOuterSizes,getParentNode:getParentNode,getPopperOffsets:getPopperOffsets,getReferenceOffsets:getReferenceOffsets,getScroll:getScroll,getScrollParent:getScrollParent,getStyleComputedProperty:getStyleComputedProperty,getSupportedPropertyName:getSupportedPropertyName,getWindowSizes:getWindowSizes,isFixed:isFixed,isFunction:isFunction,isModifierEnabled:isModifierEnabled,isModifierRequired:isModifierRequired,isNumeric:isNumeric,removeEventListeners:removeEventListeners,runModifiers:runModifiers,setAttributes:setAttributes,setStyles:setStyles,setupEventListeners:setupEventListeners};export{computeAutoPlacement,debounce,findIndex,getBordersSize,getBoundaries,getBoundingClientRect,getClientRect,getOffsetParent,getOffsetRect,getOffsetRectRelativeToArbitraryNode,getOuterSizes,getParentNode,getPopperOffsets,getReferenceOffsets,getScroll,getScrollParent,getStyleComputedProperty,getSupportedPropertyName,getWindowSizes,isFixed,isFunction,isModifierEnabled,isModifierRequired,isNumeric,removeEventListeners,runModifiers,setAttributes,setStyles,setupEventListeners};export default index;