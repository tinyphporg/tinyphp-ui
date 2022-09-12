!function(a){"use strict";function e(e,s,d){var n=a("<select />",{class:d?"custom-select mb-3 border-0":"custom-select mb-3 text-light border-0 "+e[0].replace(/accent-|navbar-/,"bg-")});if(d){var i=a("<option />",{text:"None Selected"});s&&i.on("click",s),n.append(i)}return e.forEach((function(e){var d,i=a("<option />",{class:("object"==typeof e?e.join(" "):e).replace("navbar-","bg-").replace("accent-","bg-"),text:(d=("object"==typeof e?e.join(" "):e).replace(/navbar-|accent-|bg-/,"").replace("-"," "),d.charAt(0).toUpperCase()+d.slice(1))});n.append(i),i.data("color",e),s&&i.on("click",s)})),n.on("change",(function(){a(this).find("option:selected").click()})),n}var s=a(".offcanvas"),d=a("<div />",{class:"p-3 coffcanvas-body"});s.append(d),d.append('<h5>整体风格</h5><hr class="mb-2"/>');var n=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("dark-mode"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("dark-mode"):a("body").removeClass("dark-mode")})),i=a("<div />",{class:"mb-4"}).append(n).append("<span>Dark Mode</span>");d.append(i),d.append("<h6>Header Options</h6>");var c=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("layout-navbar-fixed"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("layout-navbar-fixed"):a("body").removeClass("layout-navbar-fixed")})),r=a("<div />",{class:"mb-1"}).append(c).append("<span>Fixed</span>");d.append(r);var l=a("<input />",{type:"checkbox",value:1,checked:a(".main-header").hasClass("dropdown-legacy"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".main-header").addClass("dropdown-legacy"):a(".main-header").removeClass("dropdown-legacy")})),t=a("<div />",{class:"mb-1"}).append(l).append("<span>Dropdown Legacy Offset</span>");d.append(t);var o=a("<input />",{type:"checkbox",value:1,checked:a(".main-header").hasClass("border-bottom-0"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".main-header").addClass("border-bottom-0"):a(".main-header").removeClass("border-bottom-0")})),p=a("<div />",{class:"mb-4"}).append(o).append("<span>No border</span>");d.append(p),d.append("<h6>Sidebar Options</h6>");var b=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("sidebar-collapse"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?(a("body").addClass("sidebar-collapse"),a(window).trigger("resize")):(a("body").removeClass("sidebar-collapse"),a(window).trigger("resize"))})),h=a("<div />",{class:"mb-1"}).append(b).append("<span>Collapsed</span>");d.append(h),a(document).on("collapsed.lte.pushmenu",'[data-widget="pushmenu"]',(function(){b.prop("checked",!0)})),a(document).on("shown.lte.pushmenu",'[data-widget="pushmenu"]',(function(){b.prop("checked",!1)}));var v=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("layout-fixed"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?(a("body").addClass("layout-fixed"),a(window).trigger("resize")):(a("body").removeClass("layout-fixed"),a(window).trigger("resize"))})),m=a("<div />",{class:"mb-1"}).append(v).append("<span>Fixed</span>");d.append(m);var u=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("sidebar-mini"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("sidebar-mini"):a("body").removeClass("sidebar-mini")})),k=a("<div />",{class:"mb-1"}).append(u).append("<span>Sidebar Mini</span>");d.append(k);var C=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("sidebar-mini-md"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("sidebar-mini-md"):a("body").removeClass("sidebar-mini-md")})),g=a("<div />",{class:"mb-1"}).append(C).append("<span>Sidebar Mini MD</span>");d.append(g);var f=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("sidebar-mini-xs"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("sidebar-mini-xs"):a("body").removeClass("sidebar-mini-xs")})),y=a("<div />",{class:"mb-1"}).append(f).append("<span>Sidebar Mini XS</span>");d.append(y);var x=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("nav-flat"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("nav-flat"):a(".nav-sidebar").removeClass("nav-flat")})),w=a("<div />",{class:"mb-1"}).append(x).append("<span>Nav Flat Style</span>");d.append(w);var E=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("nav-legacy"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("nav-legacy"):a(".nav-sidebar").removeClass("nav-legacy")})),S=a("<div />",{class:"mb-1"}).append(E).append("<span>Nav Legacy Style</span>");d.append(S);var O=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("nav-compact"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("nav-compact"):a(".nav-sidebar").removeClass("nav-compact")})),N=a("<div />",{class:"mb-1"}).append(O).append("<span>Nav Compact</span>");d.append(N);var L=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("nav-child-indent"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("nav-child-indent"):a(".nav-sidebar").removeClass("nav-child-indent")})),F=a("<div />",{class:"mb-1"}).append(L).append("<span>Nav Child Indent</span>");d.append(F);var D=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("nav-collapse-hide-child"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("nav-collapse-hide-child"):a(".nav-sidebar").removeClass("nav-collapse-hide-child")})),j=a("<div />",{class:"mb-1"}).append(D).append("<span>Nav Child Hide on Collapse</span>");d.append(j);var M=a("<input />",{type:"checkbox",value:1,checked:a(".main-sidebar").hasClass("sidebar-no-expand"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".main-sidebar").addClass("sidebar-no-expand"):a(".main-sidebar").removeClass("sidebar-no-expand")})),V=a("<div />",{class:"mb-4"}).append(M).append("<span>Disable Hover/Focus Auto-Expand</span>");d.append(V),d.append("<h6>Footer Options</h6>");var z=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("layout-footer-fixed"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("layout-footer-fixed"):a("body").removeClass("layout-footer-fixed")})),A=a("<div />",{class:"mb-4"}).append(z).append("<span>Fixed</span>");d.append(A),d.append("<h6>Small Text Options</h6>");var B=a("<input />",{type:"checkbox",value:1,checked:a("body").hasClass("text-sm"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a("body").addClass("text-sm"):a("body").removeClass("text-sm")})),H=a("<div />",{class:"mb-1"}).append(B).append("<span>Body</span>");d.append(H);var I=a("<input />",{type:"checkbox",value:1,checked:a(".main-header").hasClass("text-sm"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".main-header").addClass("text-sm"):a(".main-header").removeClass("text-sm")})),Q=a("<div />",{class:"mb-1"}).append(I).append("<span>Navbar</span>");d.append(Q);var T=a("<input />",{type:"checkbox",value:1,checked:a(".brand-link").hasClass("text-sm"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".brand-link").addClass("text-sm"):a(".brand-link").removeClass("text-sm")})),U=a("<div />",{class:"mb-1"}).append(T).append("<span>Brand</span>");d.append(U);var X=a("<input />",{type:"checkbox",value:1,checked:a(".nav-sidebar").hasClass("text-sm"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".nav-sidebar").addClass("text-sm"):a(".nav-sidebar").removeClass("text-sm")})),q=a("<div />",{class:"mb-1"}).append(X).append("<span>Sidebar Nav</span>");d.append(q);var G=a("<input />",{type:"checkbox",value:1,checked:a(".main-footer").hasClass("text-sm"),class:"mr-1"}).on("click",(function(){a(this).is(":checked")?a(".main-footer").addClass("text-sm"):a(".main-footer").removeClass("text-sm")})),J=a("<div />",{class:"mb-4"}).append(G).append("<span>Footer</span>");d.append(J);var K=["navbar-primary","navbar-secondary","navbar-info","navbar-success","navbar-danger","navbar-indigo","navbar-purple","navbar-pink","navbar-navy","navbar-lightblue","navbar-teal","navbar-cyan","navbar-dark","navbar-gray-dark","navbar-gray"],P=["bg-primary","bg-warning","bg-info","bg-danger","bg-success","bg-indigo","bg-lightblue","bg-navy","bg-purple","bg-fuchsia","bg-pink","bg-maroon","bg-orange","bg-lime","bg-teal","bg-olive"],R=["accent-primary","accent-warning","accent-info","accent-danger","accent-success","accent-indigo","accent-lightblue","accent-navy","accent-purple","accent-fuchsia","accent-pink","accent-maroon","accent-orange","accent-lime","accent-teal","accent-olive"],W=["sidebar-dark-primary","sidebar-dark-warning","sidebar-dark-info","sidebar-dark-danger","sidebar-dark-success","sidebar-dark-indigo","sidebar-dark-lightblue","sidebar-dark-navy","sidebar-dark-purple","sidebar-dark-fuchsia","sidebar-dark-pink","sidebar-dark-maroon","sidebar-dark-orange","sidebar-dark-lime","sidebar-dark-teal","sidebar-dark-olive","sidebar-light-primary","sidebar-light-warning","sidebar-light-info","sidebar-light-danger","sidebar-light-success","sidebar-light-indigo","sidebar-light-lightblue","sidebar-light-navy","sidebar-light-purple","sidebar-light-fuchsia","sidebar-light-pink","sidebar-light-maroon","sidebar-light-orange","sidebar-light-lime","sidebar-light-teal","sidebar-light-olive"];d.append("<h6>Navbar Variants</h6>");var Y=a("<div />",{class:"d-flex"}),Z=K.concat(["navbar-light","navbar-warning","navbar-white","navbar-orange"]),$=e(Z,(function(){var e=a(this).data("color"),s=a(".main-header");s.removeClass("navbar-dark").removeClass("navbar-light"),Z.forEach((function(a){s.removeClass(a)})),a(this).parent().removeClass().addClass("custom-select mb-3 text-light border-0 "),K.indexOf(e)>-1?(s.addClass("navbar-dark"),a(this).parent().addClass(e).addClass("text-light")):(s.addClass("navbar-light"),a(this).parent().addClass(e)),s.addClass(e)})),_=null;a(".main-header")[0].classList.forEach((function(a){Z.indexOf(a)>-1&&null===_&&(_=a.replace("navbar-","bg-"))})),$.find("option."+_).prop("selected",!0),$.removeClass().addClass("custom-select mb-3 text-light border-0 ").addClass(_),Y.append($),d.append(Y),d.append("<h6>Accent Color Variants</h6>");var aa=a("<div />",{class:"d-flex"});d.append(aa),d.append(e(R,(function(){var e=a(this).data("color"),s=a("body");R.forEach((function(a){s.removeClass(a)})),s.addClass(e)}),!0));var ea=null;a("body")[0].classList.forEach((function(a){R.indexOf(a)>-1&&null===ea&&(ea=a.replace("navbar-","bg-"))})),d.append("<h6>Dark Sidebar Variants</h6>");var sa=a("<div />",{class:"d-flex"});d.append(sa);var da=e(P,(function(){var e=a(this).data("color"),s="sidebar-dark-"+e.replace("bg-",""),d=a(".main-sidebar");W.forEach((function(a){d.removeClass(a),ca.removeClass(a.replace("sidebar-dark-","bg-")).removeClass("text-light")})),a(this).parent().removeClass().addClass("custom-select mb-3 text-light border-0").addClass(e),ca.find("option").prop("selected",!1),d.addClass(s),a(".sidebar").removeClass("os-theme-dark").addClass("os-theme-light")}),!0);d.append(da);var na=null;a(".main-sidebar")[0].classList.forEach((function(a){var e=a.replace("sidebar-dark-","bg-");P.indexOf(e)>-1&&null===na&&(na=e)})),da.find("option."+na).prop("selected",!0),da.removeClass().addClass("custom-select mb-3 text-light border-0 ").addClass(na),d.append("<h6>Light Sidebar Variants</h6>");var ia=a("<div />",{class:"d-flex"});d.append(ia);var ca=e(P,(function(){var e=a(this).data("color"),s="sidebar-light-"+e.replace("bg-",""),d=a(".main-sidebar");W.forEach((function(a){d.removeClass(a),da.removeClass(a.replace("sidebar-light-","bg-")).removeClass("text-light")})),a(this).parent().removeClass().addClass("custom-select mb-3 text-light border-0").addClass(e),da.find("option").prop("selected",!1),d.addClass(s),a(".sidebar").removeClass("os-theme-light").addClass("os-theme-dark")}),!0);d.append(ca);var ra=null;a(".main-sidebar")[0].classList.forEach((function(a){var e=a.replace("sidebar-light-","bg-");P.indexOf(e)>-1&&null===ra&&(ra=e)})),null!==ra&&(ca.find("option."+ra).prop("selected",!0),ca.removeClass().addClass("custom-select mb-3 text-light border-0 ").addClass(ra));var la=Z;d.append("<h6>Brand Logo Variants</h6>");var ta=a("<div />",{class:"d-flex"});d.append(ta);var oa=a("<a />",{href:"#"}).text("clear").on("click",(function(e){e.preventDefault();var s=a(".brand-link");la.forEach((function(a){s.removeClass(a)}))})),pa=e(la,(function(){var e=a(this).data("color"),s=a(".brand-link");"navbar-light"===e||"navbar-white"===e?s.addClass("text-black"):s.removeClass("text-black"),la.forEach((function(a){s.removeClass(a)})),e?a(this).parent().removeClass().addClass("custom-select mb-3 border-0").addClass(e).addClass("navbar-light"!==e&&"navbar-white"!==e?"text-light":""):a(this).parent().removeClass().addClass("custom-select mb-3 border-0"),s.addClass(e)}),!0).append(oa);d.append(pa);var ba=null;a(".brand-link")[0].classList.forEach((function(a){la.indexOf(a)>-1&&null===ba&&(ba=a.replace("navbar-","bg-"))})),ba&&(pa.find("option."+ba).prop("selected",!0),pa.removeClass().addClass("custom-select mb-3 text-light border-0 ").addClass(ba))}(jQuery);