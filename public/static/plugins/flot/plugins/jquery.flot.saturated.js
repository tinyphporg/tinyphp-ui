!function(t){"use strict";var r={saturate:function(t){return t===1/0?Number.MAX_VALUE:t===-1/0?-Number.MAX_VALUE:t},delta:function(t,r,u){return(r-t)/u==1/0?r/u-t/u:(r-t)/u},multiply:function(t,u){return r.saturate(t*u)},multiplyAdd:function(t,u,n){if(isFinite(t*u))return r.saturate(t*u+n);for(var e=n,a=0;a<u;a++)e+=t;return r.saturate(e)},floorInBase:function(t,r){return r*Math.floor(t/r)}};t.plot.saturated=r}(jQuery);