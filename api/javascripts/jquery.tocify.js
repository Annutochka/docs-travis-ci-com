/* jquery Tocify - v1.9.0 - 2013-10-01
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT */
!function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,i,s){"use strict";var n="tocify",o="tocify-focus",a="tocify-hover",r="tocify-hide",l="tocify-header",d="."+l,h="tocify-subheader",u="."+h,c="tocify-item",f="."+c,p="tocify-extend-page",g="."+p;t.widget("toc.tocify",{version:"1.9.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var i=this;i.extendPageScroll=!0,i.items=[],i._generateToc(),i._addCSSClasses(),i.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),i._setEventHandlers(),t(e).load(function(){i._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){i.extendPageScroll=!1},0)})})},_generateToc:function(){var e,i,s=this,o=s.options.ignoreSelector;return e=-1!==this.options.selectors.indexOf(",")?t(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):t(this.options.context).find(this.options.selectors.replace(/ /g,"")),e.length?(s.element.addClass(n),void e.each(function(e){t(this).is(o)||(i=t("<ul/>",{id:l+e,"class":l}).append(s._nestElements(t(this),e)),s.element.append(i),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(s.options.selectors).length?t(this).filter(s.options.selectors).each(function(){t(this).is(o)||s._appendSubheaders.call(this,s,i)}):t(this).find(s.options.selectors).each(function(){t(this).is(o)||s._appendSubheaders.call(this,s,i)})}))})):void s.element.addClass(r)},_setActiveElement:function(t){var i=this,s=e.location.hash.substring(1),n=i.element.find('li[data-unique="'+s+'"]');return s.length?(i.element.find("."+i.focusClass).removeClass(i.focusClass),n.addClass(i.focusClass),i.options.showAndHide&&n.click()):(i.element.find("."+i.focusClass).removeClass(i.focusClass),!s.length&&t&&i.options.highlightDefault&&i.element.find(f).first().addClass(i.focusClass)),i},_nestElements:function(e,i){var s,n,o;return s=t.grep(this.items,function(t){return t===e.text()}),s.length?this.items.push(e.text()+i):this.items.push(e.text()),o=this._generateHashValue(s,e,i),n=t("<li/>",{"class":c,"data-unique":o}).append(t("<a/>",{text:e.text()})),e.before(t("<div/>",{name:o,"data-unique":o})),n},_generateHashValue:function(t,e,i){var s="",n=this.options.hashGenerator;if("pretty"===n){for(s=e.text().toLowerCase().replace(/\s/g,"-");s.indexOf("--")>-1;)s=s.replace(/--/g,"-");for(;s.indexOf(":-")>-1;)s=s.replace(/:-/g,"-")}else s="function"==typeof n?n(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(s+=""+i),s},_appendSubheaders:function(e,i){var s=t(this).index(e.options.selectors),n=t(e.options.selectors).eq(s-1),o=+t(this).prop("tagName").charAt(1),a=+n.prop("tagName").charAt(1);a>o?e.element.find(u+"[data-tag="+o+"]").last().append(e._nestElements(t(this),s)):o===a?i.find(f).last().after(e._nestElements(t(this),s)):i.find(f).last().after(t("<ul/>",{"class":h,"data-tag":o})).next(u).append(e._nestElements(t(this),s))},_setEventHandlers:function(){var s=this;this.element.on("click.tocify","li",function(i){if(s.options.history&&(e.location.hash=t(this).attr("data-unique")),s.element.find("."+s.focusClass).removeClass(s.focusClass),t(this).addClass(s.focusClass),s.options.showAndHide){var n=t('li[data-unique="'+t(this).attr("data-unique")+'"]');s._triggerShow(n)}s._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(s.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==s.options.theme&&t(this).removeClass(s.hoverClass)}}),(s.options.extendPage||s.options.highlightOnScroll||s.options.scrollHistory||s.options.showAndHideOnScroll)&&t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var n,o,a,r,l=t(e).scrollTop(),d=t(e).height(),h=t(i).height(),u=t("body")[0].scrollHeight;if(s.options.extendPage&&(s.webkit&&l>=u-d-s.options.extendPageOffset||!s.webkit&&d+l>h-s.options.extendPageOffset)&&!t(g).length){if(o=t('div[data-unique="'+t(f).last().attr("data-unique")+'"]'),!o.length)return;a=o.offset().top,t(s.options.context).append(t("<div />",{"class":p,height:Math.abs(a-l)+"px","data-unique":p})),s.extendPageScroll&&(r=s.element.find("li.active"),s._scrollTo(t('div[data-unique="'+r.attr("data-unique")+'"]')))}setTimeout(function(){var i,o=null,a=null,r=t(s.options.context).find("div[data-unique]");r.each(function(e){var i=Math.abs((t(this).next().length?t(this).next():t(this)).offset().top-l-s.options.highlightOffset);return null==o||o>i?(o=i,void(a=e)):!1}),i=t(r[a]).attr("data-unique"),n=t('li[data-unique="'+i+'"]'),s.options.highlightOnScroll&&n.length&&(s.element.find("."+s.focusClass).removeClass(s.focusClass),n.addClass(s.focusClass)),s.options.scrollHistory&&e.location.hash!=="#"+i&&e.location.replace("#"+i),s.options.showAndHideOnScroll&&s.options.showAndHide&&s._triggerShow(n,!0)},0)})})},show:function(e,i){var s=this;if(!e.is(":visible"))switch(e.find(u).length||e.parent().is(d)||e.parent().is(":visible")?e.children(u).length||e.parent().is(d)||(e=e.closest(u)):e=e.parents(u).add(e),s.options.showEffect){case"none":e.show();break;case"show":e.show(s.options.showEffectSpeed);break;case"slideDown":e.slideDown(s.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(s.options.showEffectSpeed);break;default:e.show()}return e.parent().is(d)?s.hide(t(u).not(e)):s.hide(t(u).not(e.closest(d).find(u).not(e.siblings()))),s},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var i=this;return t.parent().is(d)||t.next().is(u)?i.show(t.next(u),e):t.parent().is(u)&&i.show(t.parent(),e),i},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(d+","+u).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=o,this.hoverClass=a),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var i=this,s=i.options.smoothScroll||0,n=i.options.scrollTo,o=t('div[data-unique="'+e.attr("data-unique")+'"]');return o.length?(t("html, body").promise().done(function(){t("html, body").animate({scrollTop:o.offset().top-(t.isFunction(n)?n.call():n)+"px"},{duration:s})}),i):i}})});