(self.webpackChunkxbox_dashboard=self.webpackChunkxbox_dashboard||[]).push([[216],{6741:function(e,t,n){var a,r=n(1109).default,l=n(4575).default,o=n(3913).default,u=n(1506).default,i=n(2205).default,s=n(9842).default,p=n(3269).default,c=Object.create,y=Object.defineProperty,d=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyNames,h=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty,m=function(e,t,n,a){if(t&&"object"===typeof t||"function"===typeof t){var r,l=p(f(t));try{var o=function(){var l=r.value;v.call(e,l)||l===n||y(e,l,{get:function(){return t[l]},enumerable:!(a=d(t,l))||a.enumerable})};for(l.s();!(r=l.n()).done;)o()}catch(u){l.e(u)}finally{l.f()}}return e},P=function(e,t,n){return function(e,t,n){t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n}(e,"symbol"!==typeof t?t+"":t,n),n},b={};!function(e,t){for(var n in t)y(e,n,{get:t[n],enumerable:!0})}(b,{default:function(){return T}}),e.exports=(a=b,m(y({},"__esModule",{value:!0}),a));var E=function(e,t,n){return n=null!=e?c(h(e)):{},m(!t&&e&&e.__esModule?n:y(n,"default",{value:e,enumerable:!0}),e)}(n(2791)),g=n(135),k=n(365),L="twitch-player-",T=function(e){"use strict";i(n,e);var t=s(n);function n(){var e;return l(this,n),e=t.apply(this,arguments),P(u(e),"callPlayer",g.callPlayer),P(u(e),"playerID",e.props.config.playerId||"".concat(L).concat((0,g.randomString)())),P(u(e),"mute",(function(){e.callPlayer("setMuted",!0)})),P(u(e),"unmute",(function(){e.callPlayer("setMuted",!1)})),e}return o(n,[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e,t){var n=this,a=this.props,l=a.playsinline,o=a.onError,u=a.config,i=a.controls,s=k.MATCH_URL_TWITCH_CHANNEL.test(e),p=s?e.match(k.MATCH_URL_TWITCH_CHANNEL)[1]:e.match(k.MATCH_URL_TWITCH_VIDEO)[1];t?s?this.player.setChannel(p):this.player.setVideo("v"+p):(0,g.getSDK)("https://player.twitch.tv/js/embed/v1.js","Twitch").then((function(t){n.player=new t.Player(n.playerID,r({video:s?"":p,channel:s?p:"",height:"100%",width:"100%",playsinline:l,autoplay:n.props.playing,muted:n.props.muted,controls:!!s||i,time:(0,g.parseStartTime)(e)},u.options));var a=t.Player,o=a.READY,c=a.PLAYING,y=a.PAUSE,d=a.ENDED,f=a.ONLINE,h=a.OFFLINE,v=a.SEEK;n.player.addEventListener(o,n.props.onReady),n.player.addEventListener(c,n.props.onPlay),n.player.addEventListener(y,n.props.onPause),n.player.addEventListener(d,n.props.onEnded),n.player.addEventListener(v,n.props.onSeek),n.player.addEventListener(f,n.props.onLoaded),n.player.addEventListener(h,n.props.onLoaded)}),o)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){this.callPlayer("pause")}},{key:"seekTo",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("seek",e),t||this.pause()}},{key:"setVolume",value:function(e){this.callPlayer("setVolume",e)}},{key:"getDuration",value:function(){return this.callPlayer("getDuration")}},{key:"getCurrentTime",value:function(){return this.callPlayer("getCurrentTime")}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){return E.default.createElement("div",{style:{width:"100%",height:"100%"},id:this.playerID})}}]),n}(E.Component);P(T,"displayName","Twitch"),P(T,"canPlay",k.canPlay.twitch),P(T,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerTwitch.b2d7d346.chunk.js.map