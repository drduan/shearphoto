/*************ShearPhoto1.3 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*********

      经过数20天的开发，shearphoto的第一个版本终于完成，
我开发shearphoto的全因是切图，截图这类WEB插件实在太少，我特此还专门在网上下载过几个关于截图插件，
基本上互联网上所有的截图插件我都看过了一遍，压根没有令我满意的，要不功能太小，要不BUG超多
要不都基于FLASH的，基于FLASH的截图很不好，扩展性非常差，不方便二次开发这是一个重点问题。
还有些截图插件是收费200块去版权，本来就不怎么让人满意，还收费呢！我就不点名是哪个截图插件了。
于是就想到自己开发一个这样的插件。
本人开发shearphoto前提，首先是不会对代码进行加密，所有代码都是开源的，必须兼容目前所有浏览器（包括IE6）。
也就是说你可以对shearphoto任意修改！另外shearphoto不会对你收取任何费用，当然如果你要找本人定制开发就另谈了！

        再说说这20天开发，那简直就是人间炼狱，每天12小时，烟量不段增加，无数的开发难题困扰着，光插件内的JS方法重写，就超过5次。
重写又重写，重写又有BUG，很多时候，真的无法解决了，我想过放弃，做这种插件首先不赚钱，还占用大量的时间。
每次想到放弃，我都想安慰自己"都开发了一大半了，放弃了就什么都没了，放弃就输了"，正是我这种不屈服的精神，shearphoto终于完成了，
shearphoto是我内心挣扎和汗水交织而成的作品，我不敢说shearphoto没有BUG，也不敢说shearphoto的代码没有问题。目前shearphoto还处于公测阶段，如果你发现有BUG或者某些代码写得不好，请第一时间联系我
QQ399195513

      shearphoto是JS面向对象开发，绝对不含JQUERY，更不含第三方代码，更更没有第三方插件，全部采用原生JS和原生PHP开发。
为什么shearphoto不使用JQUERY，本人玩了JQUERY三年，对JQUERY一点好感也没有，反而造就了一批懒人，对技术的提升没有半点好处。
再者，JQUERY是一个类库，很多方法都帮你写好了，如果使用了JQUERY，那插件的功劳是不是要算上JQUERY一份呢，因此shearphoto在开发前就严重拒绝JQUERY驾入
以后的后续升级也不会有JQUERY的存在！shearphoto的原则：免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写。
有人问：为什么只有PHP后端，没有JAVA和NET，很遗含告诉你，本人不懂JAVA和NET，但是以后的升级我会加上去的，当然你JAVA和NET玩得牛B，你可以在我的JS基础上编写。
目前shearphoto只支持PHP，如果你把JAVA或NET写了，可以发我一份,那么你就是shearphoto开发者之一！呵呵！
      
      shearphoto的应用范围：
1：网站会员头像截取，shearphoto能自由设置按比例截图或不按比例截图，也可以对图片旋转，在线拍照，你可以截取不同比例的，不同大小，各种旋转的图片。后台 前台均有设置接口，非常简单
2：商城商品图片切割，例如这个商品图片，有的图像部份我要去掉，那么shearphoto就能帮助你进行切割，又例如这个图片太大了，我想切小点，shearphoto也能帮你实现
3：在线美工切图等
shearphoto的用途非常广，shearphoto截图灵敏，拉伸或拖拽时都非常流畅，不像FLASH的截图插件那么卡，半于反应不过来，shearphoto易于二次开发，所有代码都是开源的HTML,JS PHP编写，二次非常简单
shearphoto的官方网站：www.shearphoto.com,网站有开发文档，以及shearphoto讨论区，大家可以在官网进行交流心得或者定制开发
你也可以加入shearphoto官方QQ群：461550716，分享与我进行交流。

    shearphoto是属于大家的，shearphoto创造崭新截图环境，希望大家喜欢shearphoto  本程序版本号：shearphoto1.3
    
                                                        版本号:shearphoto1.3
                                                        shearphoto官网：www.shearphoto.com
                                                        shearphoto官方QQ群：461550716
                                                                                                              2015年8月7日
                                                                                                                  明哥先生


****************ShearPhoto1.3 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*******/

ShearPhoto.MoveDiv = function() {
          this.arg = new Array(), this.ReckonWH = this.DivW = this.DivH = this.selectionempty = this.addevent = this.DivDownEVe = this.DomMoveEve = this.DomUpEve = this.eveMold = false;
};

ShearPhoto.MoveDiv.prototype = {
          ZeroSetting:function() {
                    var left = parseFloat(this.arg.form.style.left), top = parseFloat(this.arg.form.style.top);
                    var size = this._size_(window, true);
                    var leftfun = function() {}, topfun = function() {}, tf = false;
                    if (!isNaN(left)) {
                              tf = true;
                              this.arg.form.style.left = 0;
                              leftfun = function(a, b) {
                                        a < 0 && (a = 0);
                                        b.style.left = left - a + "px";
                              };
                    }
                    if (!isNaN(top)) {
                              tf = true;
                              this.arg.form.style.top = 0;
                              topfun = function(a, b) {
                                        a < 0 && (a = 0);
                                        b.style.top = top - a + "px";
                              };
                    }
                    if (tf === true) {
                              var size2 = this._size_(window, true);
                              leftfun(size.W - size2.W, this.arg.form);
                              topfun(size.H - size2.H, this.arg.form);
                    }
          },
          reckon:function(obj, se) {
                    this._size_(obj);
                    var this_ = this;
                    if (se === true) {
                              var addfun = function() {
                                        this_.ZeroSetting();
                                        this_._size_(obj);
                                        this_.arg.MoveWidth = this_.ReckonWH.W;
                                        this_.arg.MoveHeight = this_.ReckonWH.H;
                                        this_.SetCenter(this_.arg);
                              };
                              this.addEvent(window, "resize", addfun);
                    }
          },
          _size_:function(obj, t) {
                    var w, h, ReckonWH;
                    if (obj === window) {
                              var DE = {
                                        add:document.documentElement,
                                        att:document.body
                              }[this.addevent];
                              w = DE.clientWidth;
                              h = DE.clientHeight;
                              ReckonWH = {
                                        W:Math.max(DE.scrollWidth, w),
                                        H:Math.max(DE.scrollHeight, h),
                                        CW:w,
                                        CH:h
                              };
                    } else {
                              w = obj.offsetWidth;
                              h = obj.offsetHeight;
                              ReckonWH = {
                                        W:w,
                                        H:h,
                                        CW:w,
                                        CH:h
                              };
                    }
                    if (t === true) return ReckonWH;
                    this.ReckonWH = ReckonWH;
          },
          DomUp:function(dom) {
                    var this_ = this;
                    return function() {
                              dom.releaseCapture && dom.releaseCapture();
                              typeof this_.DomMoveEve === "function" && this_.delEvent(document, this_.eveMold[1], this_.DomMoveEve);
                              if (typeof this_.DomUpEve === "function") {
                                        this_.delEvent(document, this_.eveMold[2], this_.DomUpEve);
                                        this_.delEvent(window, this_.eveMold[2], this_.DomUpEve);
                                        this_.delEvent(window, "blur", this_.DomUpEve);
                                        this_.delEvent(dom, "losecapture", this_.DomUpEve);
                              }
                              return false;
                    };
          },
          DivWHFun:function() {
                    this.DivW = this.arg.form.offsetWidth;
                    this.DivH = this.arg.form.offsetHeight;
          },
          DomMove:function(this_, dom, disX, disY, formLeft, formTop) {
                    var argform = this_.arg.form, DivW = this_.DivW, DivH = this_.DivH, MoveScale, MoveFun = function() {};
                    var shifting = this_.arg.shifting = Object.prototype.toString.call(this_.arg.shifting) === "[object Array]" && this_.arg.shifting.length > 1 ? this_.arg.shifting :new Array(0, 0);
                    var argMoveWidth = this_.arg.MoveWidth - shifting[0];
                    var argMoveHeight = this_.arg.MoveHeight - shifting[1];
                    if (typeof this_.DomUpEve === "function") {
                              this_.delEvent(document, this_.eveMold[2], this_.DomUpEve);
                              this_.delEvent(window, this_.eveMold[2], this_.DomUpEve);
                              this_.delEvent(window, "blur", this_.DomUpEve);
                              this_.delEvent(dom, "losecapture", this_.DomUpEve);
                    }
                    this_.DomUpEve = this_.DomUp(dom);
                    this_.addEvent(document, this_.eveMold[2], this_.DomUpEve);
                    this_.addEvent(window, this_.eveMold[2], this_.DomUpEve);
                    this_.addEvent(window, "blur", this_.DomUpEve);
                    this_.addEvent(dom, "losecapture", this_.DomUpEve);
                    var maxL = argMoveWidth - DivW, maxT = argMoveHeight - DivH, iL, iT, eveclientX, eveclientY;
                    typeof this_.arg.MoveFun === "function" && (MoveFun = this_.arg.MoveFun);
                    MoveScale = [ maxL, maxT ];
                    return function(eve) {
                              eve = eve || window.event;
                              if (eve.button > 1) {
                                        this_.DomUp(this)();
                                        return false;
                              }
                              eveclientX = this_.eveMold[3](eve, "clientX"), eveclientY = this_.eveMold[3](eve, "clientY");
                              setTimeout(function() {
                                        iL = eveclientX - disX;
                                        iT = eveclientY - disY;
                                        this_.selectionempty();
                                        iL = iL < -shifting[0] ? -shifting[0] :iL;
                                        iL = iL > maxL ? maxL :iL;
                                        iT = iT < -shifting[1] ? -shifting[1] :iT;
                                        iT = iT > maxT ? maxT :iT;
                                        argform.style.left = iL + "px", argform.style.top = iT + "px";
                                        MoveFun(iL, iT, MoveScale);
                              }, 1);
                              return false;
                    };
          },
          DivDown:function() {
                    var this_ = this;
                    return function(event) {
                              var event = event || window.event, eventbutton = event.button, typebutton = typeof eventbutton, clientX, clientY;
                              event.preventDefault && event.preventDefault();
                              if (typebutton !== "number") {
                                        this_.eveMold = [ "touchstart", "touchmove", "touchend", function(events, clientXY) {
                                                  return events.touches[0][clientXY];
                                        } ];
                                        clientX = event.touches[0].clientX;
                                        clientY = event.touches[0].clientY;
                              } else {
                                        this_.eveMold = [ "mousedown", "mousemove", "mouseup", function(events, clientXY) {
                                                  return events[clientXY];
                                        } ];
                                        clientX = event.clientX;
                                        clientY = event.clientY;
                              }
                              if (eventbutton < 2 || typebutton !== "number") {
                                        var formLeft = parseFloat(this_.arg.form.style.left) || 0;
                                        var formTop = parseFloat(this_.arg.form.style.top) || 0;
                                        var disX = clientX - formLeft;
                                        var disY = clientY - formTop;
                                        this.setCapture && this.setCapture();
                                        typeof this_.arg.DivDownFun === "function" && this_.arg.DivDownFun(this_);
                                        typeof this_.DomMoveEve === "function" && this_.delEvent(document, this_.eveMold[1], this_.DomMoveEve);
                                        this_.DomMoveEve = this_.DomMove(this_, this, disX, disY, formLeft, formTop);
                                        this_.addEvent(document, this_.eveMold[1], this_.DomMoveEve);
                              } else {
                                        this_.DomUp(this)();
                              }
                              return false;
                    };
          },
          ShearPhotoDown:function(obj, fun) {
                    this.addEvent(obj, "mousedown", fun);
                    this.addEvent(obj, "touchstart", fun);
          },
          delShearPhotoDown:function(obj, fun) {
                    this.delEvent(obj, "mousedown", fun);
                    this.delEvent(obj, "touchstart", fun);
          },
          et:function() {
                    var this_ = this;
                    var cursor = this.arg.cursor || "move";
                    this_ = this;
                    for (var i = 0; i < this.arg.to.length; i++) {
                              if (this.addevent === "add") {
                                        if (typeof this.DivDownEVe !== "function") {
                                                  this.DivDownEVe = this.DivDown();
                                        } else {
                                                  this.delShearPhotoDown(this.arg.to[i], this.DivDownEVe);
                                        }
                                        this.ShearPhotoDown(this.arg.to[i], this.DivDownEVe);
                              } else {
                                        this.arg.to[i].onmousedown = this.DivDown();
                              }
                              this.arg.to[i].style["cursor"] = cursor;
                    }
          },
          delDownEve:function() {
                    for (var i = 0; i < this.arg.to.length; i++) {
                              if (this.addevent === "add") {
                                        if (typeof this.DivDownEVe === "function") {
                                                  this.delShearPhotoDown(this.arg.to[i], this.DivDownEVe);
                                        }
                              }
                    }
          },
          setdiv:function(argform, CW, CH, arg) {
                    if (typeof arg.centerFront === "function") {
                              var CWCH = arg.centerFront();
                              CW = CWCH[0];
                              CH = CWCH[1];
                    }
                    var DivT = (CH - this.DivH) / 2;
                    DivT = DivT < 0 ? 0 :DivT;
                    var DivL = (CW - this.DivW) / 2;
                    DivL = DivL < 0 ? 0 :DivL;
                    argform.style.top = DivT + "px", argform.style.left = DivL + "px";
                    typeof arg.centerfun === "function" && arg.centerfun(DivL, DivT, this);
          },
          addEvent:function(obj, evetype, fun) {
                    var addevent = {
                              add:function() {
                                        obj.addEventListener(evetype, fun, false);
                              },
                              att:function() {
                                        obj.attachEvent("on" + evetype, fun);
                              }
                    };
                    addevent[this.addevent] && addevent[this.addevent]();
          },
          delEvent:function(obj, evetype, fun) {
                    var delevent = {
                              add:function() {
                                        obj.removeEventListener(evetype, fun, false);
                              },
                              att:function() {
                                        obj.detachEvent("on" + evetype, fun);
                              }
                    };
                    delevent[this.addevent] && delevent[this.addevent]();
          },
          SetCenter:function(arg) {
                    if (arg.center) {
                              if (arg.center === 1) {
                                        var CW = this.ReckonWH.CW, CH = this.ReckonWH.CH;
                              } else {
                                        var ReckonWH = this._size_(arg.center, true);
                                        var CW = ReckonWH.CW, CH = ReckonWH.CH;
                              }
                              this.setdiv(arg.form, CW, CH, arg);
                    }
          },
          run:function(arg) {
                    this.arg = arg;
                    this.DivW = arg.form.offsetWidth;
                    this.DivH = arg.form.offsetHeight;
                    this.SetCenter(arg);
                    typeof arg.zIndex === "number" && (arg.form.style.zIndex = arg.zIndex);
                    this.et();
          }
};
