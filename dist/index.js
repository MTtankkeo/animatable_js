class e{constructor(e){this.callback=e,this.isDisposed=!1,this.id=requestAnimationFrame(this.handle=this.handle.bind(this))}handle(e){var t;if(this.isDisposed)return;const s=e-(null!==(t=this.previousElapsed)&&void 0!==t?t:e);this.previousElapsed=e,this.callback(s),this.id=requestAnimationFrame(this.handle)}dispose(){this.isDisposed=!0,cancelAnimationFrame(this.id)}}var t;!function(e){e[e.NONE=0]="NONE",e[e.FORWARD=1]="FORWARD",e[e.FORWARDED=2]="FORWARDED",e[e.BACKWARD=3]="BACKWARD",e[e.BACKWARDED=4]="BACKWARDED"}(t||(t={}));class s{}class i extends s{get status(){return this._status}set status(e){this._status!=e&&this.notifyStatusListeners(this._status=e)}get value(){return this._value}set value(e){this._value!=e&&this.notifyListeners(this._value=e)}constructor(e,s=0,i=1){if(super(),this.duration=e,this.lowerValue=s,this.upperValue=i,this.listeners=[],this.statusListeners=[],this._status=t.NONE,this.lowerValue>this.upperValue)throw new Error("The lowerValue must be less than the upperValue.");this._value=this.lowerValue}addListener(e){console.assert(!this.listeners.includes(e),"Already a given listener does exist."),this.listeners.push(e)}removeListener(e){console.assert(this.listeners.includes(e),"Already a given listener does not exist."),this.listeners=this.listeners.filter((t=>t!=e))}addStatusListener(e){console.assert(!this.statusListeners.includes(e),"Already a given status listener does exist."),this.statusListeners.push(e)}removeStatusListener(e){console.assert(this.statusListeners.includes(e),"Already a given status listener does not exist."),this.statusListeners=this.statusListeners.filter((t=>t!=e))}notifyListeners(e){this.listeners.forEach((t=>t(e)))}notifyStatusListeners(e){this.statusListeners.forEach((t=>t(e)))}get range(){return this.upperValue-this.lowerValue}get relValue(){return(this.value-this.lowerValue)/this.range}get progressValue(){const e=this.tween.begin,t=this.tween.end-e;return(this.relValue-e)/t}forward(e){this.animateTo(this.upperValue,e)}backward(e){this.animateTo(this.lowerValue,e)}animateTo(e,t){this.animate(this.value,e,t)}animate(s,i,n=this.duration){var r;if(i==s)return;console.assert(s>=this.lowerValue,"A given [from] is less than the min-range."),console.assert(i<=this.upperValue,"A given [to] is larger than the max-range."),this.value=s,this.tween={begin:s,end:i};const a=i>s;this.status=a?t.FORWARD:t.BACKWARD;const h=n/this.range;null===(r=this.activeTicker)||void 0===r||r.dispose(),this.activeTicker=new e((e=>{const n=e/h,r=a?n:-n,o=this.consume(s,i,r);if(Math.abs(r-o)>1e-10)return this.value=i,this.dispose(),void(this.status=a?t.FORWARDED:t.BACKWARDED);this.value+=o}))}consume(e,t,s){const i=t-(this.value+s);return t>e?i<=0?i:s:i>=0?i:s}dispose(){var e;null===(e=this.activeTicker)||void 0===e||e.dispose(),this.activeTicker=null}reset(){this.value=this.lowerValue,this.tween=null}}class n{constructor(e,t,s,i=1){if(this.red=e,this.green=t,this.blue=s,this.alpha=i,this.red>255||this.red<0||this.green>255||this.green<0||this.blue>255||this.blue<0||this.alpha>1||this.alpha<0)throw new Error("The color values given is extent overflowed. ex: new Color(0~255, 0~255, 0~255, 0~1)")}toHex(){const e=e=>{const t=Math.round(e).toString(16);return 1==t.length?"0"+t:t};return`#${e(this.red)}${e(this.green)}${e(this.blue)}${e(255*this.alpha)}`}static var(e,t){const s=window.getComputedStyle(t||document.documentElement).getPropertyValue(e).trim();if(""===s)throw new Error("The hex color format of the given name could not be found.");return this.parse(s)}static parse(e){const t=e.startsWith("#")?e.slice(1,e.length):e;let s=0,i=0,r=0,a=8==t.length?parseInt(t.slice(6,8),16)/255:1;if(6!=t.length&&8!=t.length)throw new Error("The given string is unvalid. (ex: #202020 or #202020FF)");return s=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16),new n(s,i,r,a)}toString(){return this.toHex()}}class r{}class a extends r{constructor(e,t){super(),this.begin=e,this.end=t}transform(e){return this.begin+(this.end-this.begin)*e}}class h extends r{constructor(e,t){super(),this.begin=e,this.end=t}transform(e){const t=this.begin,s=this.end,i=(e,t,s)=>e+(t-e)*s;return new n(i(t.red,s.red,e),i(t.green,s.green,e),i(t.blue,s.blue,e),i(t.alpha,s.alpha,e))}}class o extends s{constructor(e,t){super(),this.curve=t,this.listeners=[],this.statusListeners=[],this.value=0,this.parent=new i(e,0,1),this.parent.addListener((e=>{const s=this.parent.progressValue;if(null==t)return void this.notifyListeners(this.value=this.tween.transform(s));const i=t.transform(s),n=this.tween.end-this.tween.begin,r=this.tween.begin+n*i;this.notifyListeners(this.value=r)}))}addListener(e){console.assert(!this.listeners.includes(e),"Already a given listener does exist."),this.listeners.push(e)}removeListener(e){console.assert(this.listeners.includes(e),"Already a given listener does not exist."),this.listeners=this.listeners.filter((t=>t!=e))}addStatusListener(e){throw new Error("Method not implemented.")}removeStatusListener(e){throw new Error("Method not implemented.")}notifyListeners(e){this.listeners.forEach((t=>t(e)))}animateTo(e){this.animate(this.value,e)}animate(e,t){this.tween=new a(e,t),this.parent.reset(),this.parent.forward()}dispose(){this.tween=null,this.parent.dispose(),this.parent=null}}class u{constructor(e,t){this.x=e,this.y=t}lerp(e,t){const s=this.x+(e.x-this.x)*t,i=this.y+(e.y-this.y)*t;return new u(s,i)}}class l{constructor(e,t,s,i,n=new u(0,0),r=new u(1,1),a=1e-4){this.errorBound=a,this.p1=n,this.p2=new u(e,t),this.p3=new u(s,i),this.p4=r}get flipped(){return new l(1-this.p2.x,1-this.p2.y,1-this.p3.x,1-this.p3.y,this.p1,this.p4,this.errorBound)}at(e){const t=this.p1,s=this.p2,i=this.p3,n=this.p4,r=t.lerp(s,e),a=s.lerp(i,e),h=i.lerp(n,e),o=r.lerp(a,e),u=a.lerp(h,e);return o.lerp(u,e)}transform(e){if(e<0||e>1)throw new Error("In the transform function of the Cubic, t must be given from 0 to 1.");if(0==e)return this.p1.y;if(1==e)return this.p4.y;let t=0,s=1;for(;;){const i=(t+s)/2,n=this.at(i);if(Math.abs(e-n.x)<this.errorBound)return n.y;n.x<e?t=i:s=i}}static var(e,t){const s=window.getComputedStyle(t||document.documentElement).getPropertyValue(e).trim();if(""===s)throw new Error("The cubic format value of the given name could not be found.");return this.parse(s)}static parse(e){const t=e.match(/([0-9.]+)/g).map(Number);if(4!=t.length)throw new Error("The given [str] format is invalid. (ex: cubic-bezier(0,1,0,1))");return new l(t[0],t[1],t[2],t[3])}toString(){return`Cubic(${this.p2.x}, ${this.p2.y}, ${this.p3.x}, ${this.p3.y})`}}const c={Linear:new l(0,0,1,1),Ease:new l(.25,.1,.25,1),EaseIn:new l(.42,0,1,1),EaseOut:new l(0,0,.58,1),EaseInOut:new l(.42,0,.58,1),EaseInSine:new l(.12,0,.39,0),EaseOutSine:new l(.61,1,.88,1),EaseInQuad:new l(.11,0,.5,0),EaseOutQuad:new l(.5,1,.89,1),EaseInOutQuad:new l(.45,0,.55,1),EaseInOutSine:new l(.37,0,.63,1),EaseInCubic:new l(.32,0,.67,0),EaseOutCubic:new l(.33,1,.68,1),EaseInOutCubic:new l(.65,0,.35,1),EaseInQuart:new l(.5,0,.75,0),EaseOutQuart:new l(.25,1,.5,1),EaseInOutQuart:new l(.76,0,.24,1),EaseInQuint:new l(.64,0,.78,0),EaseOutQuint:new l(.22,1,.36,1),EaseInOutQuint:new l(.83,0,.17,1),EaseInExpo:new l(.7,0,.84,0),EaseOutExpo:new l(.16,1,.3,1),EaseInOutExpo:new l(.87,0,.13,1),EaseInCirc:new l(.55,0,1,.45),EaseOutCirc:new l(0,.55,.45,1),EaseInOutCirc:new l(.85,0,.15,1),EaseInBack:new l(.36,0,.66,-.56),EaseOutBack:new l(.34,1.56,.64,1),EaseInOutBack:new l(.68,-.6,.32,1.6)};export{s as Animatable,o as Animation,i as AnimationController,t as AnimationStatus,n as Color,h as ColorTween,l as Cubic,u as CubicPoint,c as Curve,a as NumberTween,e as Ticker,r as Tween};
//# sourceMappingURL=index.js.map
