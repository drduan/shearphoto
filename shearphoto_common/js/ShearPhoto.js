/*************ShearPhoto2.1 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*********
    从shearphoto 1.5直接跳跃到shearphoto 2.0，这是shearphoto重大革新。本来我是想shearphoto 1.6 、1.7、 1.8 慢慢升的，但是这样升级只会让shearphoto慢慢走向灭亡！
结果我又辛苦了一个多星期，把shearphoto 2.0升级完成！
shearphoto2.0之前，我认为没必要加入HTML5，兼容IE6 7 8就够。但是直到后来！我知道这是我一个错误的决定
因为用户并没有为shearphoto 1.5埋单，原因shearphoto 1.5没有采用HTML5截取，用户觉得会增加服务器负载！而且又不是本地加载图片！我一个错误的决定！导致用户份额一直没有明显大增。

   shearphoto 2.0是收集所有用户的意见开发而成的！

   重大的特性就是全面支持HTML5
 
1：支持translate3d 硬件加速移动

2：加入图片预览功能
 
3：加入了压缩数码相机图片， 以及HTML5 canvas本地切图,截图
   但依然继续支持IE6 7  8 哦！有人问IE6 7 8不兼容HTML5啊，你骗人吗？
   先不要急！shearphoto 2.0的机制是这样的：有HTML5则使用HTML5 canvas切图，截图，JS先会截取一张最合理化的截图，然后交给后端，根据用户设置，进行压缩截图
   没有HTML5的浏览器则采用先上传再截取的策略，就是原先1.5的策略。
   当然有些用户如果不喜欢HTML5，也可以根据接口自行关闭

4：加HTML5图片特效，就一如美图秀秀这样的特效！shearphoto一共提供14种漂亮特效，感谢腾讯AI对图片特效提供支持
   shearphoto 2.0增添很多接口，大部份是HTML5的设置！请下载源码体验


  shearphoto外忧内患，已经没退路了。在WEB截图界，shearphoto必须要干个第一！.shearphoto不再局限于头像截取，shearphoto更可用于商城的商品图片编辑。
  shearphoto含HTML5图片压缩功能！一张十M 二十M的图，照样能帮你压成你要的容量和尺寸，
一般情况下！商城的商品图片都是通过数码相机拍摄后，要用PHOTOshop把数码相机内几十M的图片，压缩，截取，然后才能上传到商城服务器！
这样的操作是不是太麻烦了！ 如果你使用shearphoto你就快捷很多了，shearphoto你只需要直接选择图片，就会帮你进行压缩截取，上传，添加到数据库。这样的一条龙服务！
shearphoto 2.0的机制是无可挑剔的！但是不排除有BUG存在，如果用户遇到BUG情况，请到论坛 或官方QQ群进行反馈，我会第一时间发布补丁！
 shearphoto支持PHP和JAVA，JAVA由网友所写，但是JAVA版并不是太完善，使用的是以前的shearphoto1.3！我 一直很想把NET  python nodejs  JAVA的很完善地做出来！
可惜个人能力有限，如果你喜欢shearphoto，你又会玩 NET  python nodejs  JAVA，又想为互联网做贡献，那么你可以加入shearphoto团队，把这些后端版本做出来。但shearphoto没有薪水给你！
shearphoto免费开源的，没有利润可图，纯粹是抱着为互联网做贡献的心态！如果你跟我一样，请加入到shearphoto后端开发



浏览器支持：
兼容IE 6 及以上的所有浏览器

后端支持：
支持PHP5.X 至 PHP7.0或以上
支持JAVA后端（shearphoto1.3开发）

系统支持：
支持linux WINDOW服务器
shearphoto采用原生JS面向对象 + 原生PHP面向对象开发，绝对不含JQ插件，对JQ情有独忠的，这个插件不合适你                                                     

                                                                                                         2015  年  9月  5 日  
                                                                                                         shearphoto作者：明哥先生
                                                                                                         版本号:shearphoto2.1
                                                                                                         shearphoto官网：www.shearphoto.com
                                                                                                         shearphoto官方QQ群：461550716  

****************ShearPhoto2.1 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*******/

     /*----------------------------注释结束--程序开始-----------------------------------------------------------*/

/*--------------------------拉伸，截图.HTML5的压缩，剪图的处理核心部份-----------------------------------------------------------------------------*/
window.ShearPhoto = function() {
          this.transform = this.DomMoveEve = this.DomUpEve = this.MoveDivEve = this.zoomEve = this.eveMold = false;
          this.DivDownEVe = {};
          this.transformFun();
          !this.addevent && window.addEventListener ? (this.addevent = "add", this.selectionempty = function() {
                    window.getSelection().removeAllRanges();
          }) :(this.addevent = "att", this.selectionempty = function() {
                    document.selection.empty();
          });
          this.MyAjax = new window.ShearPhoto.MyAjax();
};

window.ShearPhoto.prototype = {
          transformFun:function() {
                    var Imgstyle = document.body.style, arr = new Array("MsTransform", "MozTransform", "WebkitTransform", "WebkitTransform", "OTransform", "transform");
                    for (var i = 0; i < arr.length; i++) {
                              if (arr[i] in Imgstyle) {
                                        this.transform = arr[i];
                                        break;
                              }
                    }
          },
          HTML5:{
                    Reg:new RegExp("translate3d\\((.*?)\\)", "i"),
                    HTML5LT:function(Transform) {
                              if (Transform) {
                                        this.getLT = function(dom) {
                                                  domstyleTransform = this.Reg.exec(dom.style[Transform]);
                                                  if (domstyleTransform) {
                                                            return domstyleTransform[1].split(",", 2);
                                                  } else {
                                                            return [ 0, 0 ];
                                                  }
                                        };
                                        this.setLT = function(dom, L, T) {
                                                  var domstyle = dom.style, RegTrue = true, domstyleTransform = domstyle[Transform], txt = "translate3d(" + L + "," + T + ",0)", str = domstyleTransform.replace(this.Reg, function(a) {
                                                            RegTrue = false;
                                                            return txt;
                                                  });
                                                  domstyle[Transform] = RegTrue ? domstyleTransform + " " + txt :str;
                                        };
                                        this.setL = function(dom, L) {
                                                  var domstyle = dom.style, RegTrue = true, domstyleTransform = domstyle[Transform], str = domstyleTransform.replace(this.Reg, function(a, b) {
                                                            RegTrue = false;
                                                            var T = b.split(",", 2)[1];
                                                            return "translate3d(" + L + "," + T + ",0)";
                                                  });
                                                  domstyle[Transform] = RegTrue ? domstyleTransform + " " + "translate3d(" + L + ",0,0)" :str;
                                        };
                                        this.setT = function(dom, T) {
                                                  var domstyle = dom.style, RegTrue = true, domstyleTransform = domstyle[Transform], str = domstyleTransform.replace(this.Reg, function(a, b) {
                                                            RegTrue = false;
                                                            var L = b.split(",", 2)[0];
                                                            return "translate3d(" + L + "," + T + ",0)";
                                                  });
                                                  domstyle[Transform] = RegTrue ? domstyleTransform + " " + "translate3d(0," + T + ",0)" :str;
                                        };
                              } else {
                                        this.getLT = function(dom) {
                                                  var domstyle = dom.style;
                                                  return [ domstyle.left || 0, domstyle.top || 0 ];
                                        };
                                        this.setLT = function(dom, L, T) {
                                                  var domstyle = dom.style;
                                                  domstyle.left = L, domstyle.top = T;
                                        };
                                        this.setL = function(dom, L) {
                                                  dom.style.left = L;
                                        };
                                        this.setT = function(dom, T) {
                                                  dom.style.top = T;
                                        };
                              }
                    },
                    URL:window.URL || window.webkitURL || window.mozURL || window.msURL || false,
                    canvas:false,
                    Images:false,
                    ImagesType:"image/jpeg",
                    HTML5PHP:false,
                    HTML5MAX:false,
                    HandleRotation:function(this_, MyR, SendArry, newcanvas, ctx, p, W, H) {
                              var ImgH = this_.ImgOHeight, ImgW = this_.ImgOWidth, ImgRW, ImgRH, ImgslateX, ImgslateY, MyRR, imgData, arrIMGWH = [ Math.ceil(ImgW * p), Math.ceil(ImgH * p) ];
                              switch (MyR) {
                                   case 90:
                                        ImgRW = arrIMGWH[1];
                                        ImgRH = arrIMGWH[0];
                                        ImgslateX = 0;
                                        ImgslateY = ImgRH;
                                        break;

                                   case 180:
                                        ImgRW = arrIMGWH[0];
                                        ImgRH = arrIMGWH[1];
                                        ImgslateX = ImgRW;
                                        ImgslateY = ImgRH;
                                        break;

                                   case 270:
                                        ImgRW = arrIMGWH[1];
                                        ImgRH = arrIMGWH[0];
                                        ImgslateX = ImgRW;
                                        ImgslateY = 0;
                                        break;
                              }
                              newcanvas.width = ImgRW;
                              newcanvas.height = ImgRH;
                              ctx.translate(ImgslateX, ImgslateY);
                              ctx.rotate((360 - MyR) * Math.PI / 180);
                              ctx.drawImage(this_.arg.ImgMain, 0, 0, ImgW, ImgH, 0, 0, arrIMGWH[0], arrIMGWH[1]);
                              imgData = ctx.getImageData(0, 0, ImgRW, ImgRH);
                              ctx.clearRect(0, 0, arrIMGWH[0], arrIMGWH[1]);
                              ctx.fillStyle = "#FFFFFF";
                              ctx.fillRect(0, 0, arrIMGWH[0], arrIMGWH[1]);
                              newcanvas.width = SendArry.IW = W;
                              newcanvas.height = SendArry.IH = H;
                              ctx.putImageData(imgData, -SendArry.X * p, -SendArry.Y * p);
                              delete imgData;
                    },
                    zipImg:function(DataUrl, maxs, type, functions) {
                              var Image64 = new Image(), this_ = this;
                              Image64.onload = function() {
                                        var newcanvas = document.createElement("canvas");
                                        newcanvas.style.display = "none";
                                        var bodys = document.body;
                                        bodys.appendChild(newcanvas);
                                        var ctx = newcanvas.getContext("2d"), width = this.width, height = this.height;
                                        if (maxs) {
                                                  var P = width / height;
                                                  if (width > maxs[0]) {
                                                            width = maxs[0];
                                                            height = Math.round(maxs[0] / P);
                                                  }
                                                  if (height > maxs[0]) {
                                                            height = maxs[0];
                                                            width = Math.round(maxs[0] * P);
                                                            if (width > maxs[0]) {
                                                                      width = maxs[0];
                                                                      height = Math.round(maxs[0] / P);
                                                            }
                                                  }
                                        }
                                        newcanvas.width = width;
                                        newcanvas.height = height;
                                        ctx.fillStyle = "#FFFFFF";
                                        ctx.fillRect(0, 0, width, height);
                                        ctx.drawImage(Image64, 0, 0, this.width, this.height, 0, 0, width, height);
                                        var DATA64 = newcanvas.toDataURL(type, maxs ? maxs[1] :.85);
                                        if (this_.URL) {
                                                  this_.BOLBID && this_.URL.revokeObjectURL(this_.BOLBID);
                                                  this_.BOLBID = this_.URL.createObjectURL(this_.FormBlob(DATA64));
                                                  typeof functions === "function" && functions(this_.BOLBID);
                                        } else {
                                                  typeof functions === "function" && functions(DATA64);
                                        }
                                        ctx.clearRect(0, 0, width, height);
                                        bodys.removeChild(newcanvas);
                                        delete DATA64;
                                        delete Image64;
                              };
                              Image64.src = DataUrl;
                              delete DataUrl;
                    },
                    CtxDrawImage:function(ctx, SendArry, newcanvas, this_) {
                              var MyR = SendArry.R, arg = this_.arg;
                              if (this.HTML5MAX) {
                                        var W = SendArry.IW, WW = W, H = SendArry.IH, p = W / H;
                                        W > this.HTML5MAX ? (W = this.HTML5MAX, H = Math.round(W / p), H > this.HTML5MAX && (H = this.HTML5MAX, 
                                        W = Math.round(H * p))) :H > this.HTML5MAX && (H = this.HTML5MAX, W = Math.round(H * p), 
                                        W > this.HTML5MAX && (W = this.HTML5MAX, H = Math.round(W / p)));
                                        p = W / WW;
                                        if (MyR === 0) {
                                                  var twx = this_.ImgOWidth - SendArry.X, twy = this_.ImgOHeight - SendArry.Y, IMGWx = twx * p, IMGHy = twy * p;
                                                  newcanvas.width = SendArry.IW = W;
                                                  newcanvas.height = SendArry.IH = H;
                                                  ctx.fillStyle = "#FFFFFF";
                                                  ctx.fillRect(0, 0, IMGWx, IMGHy);
                                                  ctx.drawImage(arg.ImgMain, SendArry.X, SendArry.Y, twx, twy, 0, 0, IMGWx, IMGHy);
                                        } else {
                                                  this.HandleRotation(this_, MyR, SendArry, newcanvas, ctx, p, W, H);
                                        }
                              } else {
                                        if (MyR === 0) {
                                                  newcanvas.width = SendArry.IW;
                                                  newcanvas.height = SendArry.IH;
                                                  ctx.fillStyle = "#FFFFFF";
                                                  ctx.fillRect(0, 0, SendArry.IW, SendArry.IH);
                                                  ctx.drawImage(arg.ImgMain, -SendArry.X, -SendArry.Y);
                                        } else {
                                                  this.HandleRotation(this_, MyR, SendArry, newcanvas, ctx, 1, SendArry.IW, SendArry.IH);
                                        }
                              }
                    },
                    lock:false,
                    PhotoHTML5True:false,
                    SetSrc:function(newsrc, ImgMain, ImgDom, domimg) {
                               ImgMain.src = ImgDom.src = newsrc;
                              for (var i = 0; i < domimg[1]; i++) {
                                        domimg[0][i].src = newsrc;
                              }
                              delete newsrc;
                    },
                    BOLBID:false,
                    Aclick:false,
                    artwork:false,
                    EffectsReturn:function() {
                              this.Aclick && (this.Aclick.className = "");
                              this.Aclick = this.artwork;
                              this.artwork && (this.artwork.className = "Aclick");
                    },
                    Effects:function(StrEvent, HTML5) {
                              var ImgMain = this.arg.ImgMain, ImgDom = this.arg.ImgDom, AP;
                              var preview = this.preview;
                              var this_ = this;
                              return function() {
                                        if (HTML5.lock) return;
                                        if (HTML5.Aclick === this) {
                                                  this_.pointhandle(1500, 1, "亲！现在已经是" + StrEvent + "效果了,吃饱饭没事干吗？", 2, "#307ff6", "#fff");
                                                  return;
                                        }
                                        HTML5.lock = true;
                                        AP = window.ShearPhoto.psLib(HTML5.Images);
                                        HTML5.Aclick && (HTML5.Aclick.className = "");
                                        HTML5.Aclick = this;
                                        this.className = "Aclick";
                                        this_.pointhandle(0, 1, "正在加载" + StrEvent + "效果！稍等....，不要动鼠标，可能有点卡", 2, "#fbeb61", "#3a414c", function() {
                                                  setTimeout(function() {
                                                            var domimg = preview.domimg, DATA64;
                                                            if (StrEvent === "原图") {
                                                                      DATA64 = AP.save(false, HTML5.ImagesType);
                                                            } else {
                                                                      DATA64 = AP.ps(StrEvent).save(false, HTML5.ImagesType);
                                                            }
                                                            if (HTML5.URL) {
                                                                      HTML5.BOLBID && HTML5.URL.revokeObjectURL(HTML5.BOLBID);
                                                                      HTML5.BOLBID = HTML5.URL.createObjectURL(HTML5.FormBlob(DATA64));
                                                                      HTML5.SetSrc(HTML5.BOLBID, ImgMain, ImgDom, domimg);
                                                            } else {
                                                                      HTML5.SetSrc(DATA64, ImgMain, ImgDom, domimg);
                                                            }
                                                            delete DATA64;
                                                            this_.pointhandle(1500, 1, StrEvent + "效果加载成功！提示：如果机器配置差，效果加载时间会更长哦", 1, "#307ff6", "#fff");
                                                            HTML5.lock = false;
                                                            HTML5.PhotoHTML5True = true;
                                                  }, 1);
                                        });
                              };
                    },
                    BlobRegExp:new RegExp("^data:.*base64,"),
                    FormBlob:function(dataURI) {
                              var byteString, splits = false, splits1 = dataURI.replace(this.BlobRegExp, function() {
                                        splits = true;
                                        return "";
                              });
                              if (splits) byteString = atob(splits1); else byteString = unescape(splits1);
                              var byteStringlength = byteString.length, ia = new Uint8Array(byteStringlength);
                              for (var i = 0; i < byteStringlength; i++) {
                                        ia[i] = byteString.charCodeAt(i);
                              }
                              return new Blob([ ia ], {
                                        type:this.ImagesType
                              });
                    },
                    IfHTML5:function(transform, H5True, HTML5MAX) {
                              try {
                                        new Blob([ "1" ], {
                                                  type:"text/plain"
                                        });
                              } catch (e) {
                                        H5True = false;
                              }
                              transform && H5True && (this.canvas = true, this.HTML5MAX = HTML5MAX);
                    },
                    CanvasImg:function(SendArry, postArgs, this_) {
                              var newcanvas = document.createElement("canvas"), bodys = document.body;
                              newcanvas.style.display = "none";
                              bodys.appendChild(newcanvas);
                              var ctx = newcanvas.getContext("2d");
                              this.CtxDrawImage(ctx, SendArry, newcanvas, this_);
                              var blob = this.FormBlob(newcanvas.toDataURL(this.ImagesType, this_.arg.HTML5Quality));
                              ctx.clearRect(0, 0, SendArry.IW, SendArry.IH);
                              bodys.removeChild(newcanvas);
                              var readerForm = new FormData();
                              readerForm.append("ShearPhotoHTML5", "True");
                              readerForm.append("IW", SendArry.IW);
                              readerForm.append("IH", SendArry.IH);
                              readerForm.append("FW", SendArry.FW);
                              readerForm.append("FH", SendArry.FH);
                              if (Object.prototype.toString.call(postArgs) === "[object Object]") {
                                        for (var key in postArgs) {
                                                  readerForm.append(key, postArgs[key]);
                                        }
                              }
                              readerForm.append("UpFile", blob);
                              return readerForm;
                    }
          },
          _ieexchange_:function() {
                    var this_ = this;
                    function e(a, b) {
                              var exchange = new Array(this_[a], this_[b]);
                              this_[a] = exchange[1];
                              this_[b] = exchange[0];
                    }
                    e("ImgWidth", "ImgHeight");
          },
          SetRote:{
                    ROReg:new RegExp("rotate\\((.*?)\\)", "i"),
                    SLReg:new RegExp("translate\\((.*?)\\)", "i"),
                    run:function(DOM, Transform, RO, SL) {
                              var domstyle = DOM.style, RegTrue = true, domstyleTransform = domstyle[Transform], ROstr = domstyleTransform.replace(this.ROReg, function() {
                                        RegTrue = false;
                                        return RO;
                              }), txt = RegTrue ? domstyleTransform + " " + RO :ROstr, RegTrue = true, SLstr = txt.replace(this.SLReg, function() {
                                        RegTrue = false;
                                        return SL;
                              }), txt = RegTrue ? txt + " " + SL :SLstr;
                              return txt;
                    },
                    runSL:function(DOM, Transform, SL) {
                              var domstyle = DOM.style, RegTrue = true, domstyleTransform = domstyle[Transform], SLstr = domstyleTransform.replace(this.SLReg, function() {
                                        RegTrue = false;
                                        return SL;
                              });
                              return RegTrue ? domstyleTransform + " " + SL :SLstr;
                    }
          },
          _exchange_:function() {
                    var this_ = this;
                    this._ieexchange_();
                    var IfRotate = this.rotate;
                    if (IfRotate === 90 || IfRotate === 270) {
                              var consts = {
                                        90:-1,
                                        270:1
                              }[IfRotate];
                              this.ImgRotateFun = function(W, H) {
                                        var ImgRotateLT = consts * Math.round((H - W) * .5) + "px", arg = this.arg, str = "translate(" + ImgRotateLT + "," + ImgRotateLT + ")";
                                        arg.ImgMain.style[this_.transform] = this_.SetRote.runSL(arg.ImgMain, this_.transform, str);
                                        arg.ImgDom.style[this_.transform] = this_.SetRote.runSL(arg.ImgDom, this_.transform, str);
                                        return [ H, W ];
                              };
                              return function(ImgMain, ImgDom, rotate) {
                                        var slate = consts * Math.round((this_.ImgWidth - this_.ImgHeight) * .5), str = "translate(" + slate + "px," + slate + "px)";
                                        ImgMain.style[this_.transform] = this_.SetRote.run(ImgMain, this_.transform, rotate, str);
                                        ImgDom.style[this_.transform] = this_.SetRote.run(ImgDom, this_.transform, rotate, str);
                                        return slate;
                              };
                              this.preview.WH = [ this_.ImgHeight, this_.ImgWidth ];
                    } else {
                              this.preview.WH = [ this_.ImgWidth, this_.ImgHeight ];
                              this.ImgRotateFun = function(W, H) {
                                        return [ W, H ];
                              };
                              return function(ImgMain, ImgDom, rotate) {
                                        ImgMain.style[this_.transform] = this_.SetRote.run(ImgMain, this_.transform, rotate, "translate(0,0)");
                                        ImgDom.style[this_.transform] = this_.SetRote.run(ImgDom, this_.transform, rotate, "translate(0,0)");
                                        return 0;
                              };
                    }
          },
          preview:{
                    isW:new Array(),
                    isH:new Array(),
                    run:function(arg, thisMain) {
                              var _this = this;
                              if (Object.prototype.toString.call(arg.preview) === "[object Array]") {
                                        var leng = arg.preview.length, EmptyFun = function() {}, srcDefault = arg.relativeUrl + "images/default.gif";
                                        if (leng > 0) {
                                                  arg.scope.parentNode.insertAdjacentHTML("afterEnd", '<div id="preview" style="display:none;margin-left:8px;"></div>');
                                                  var HTML = "", proportionFun = EmptyFun, p = false;
                                                  arg.proportional[0] ? p = arg.proportional[0] :proportionFun = function(d, w, i, pro) {
                                                            d[1][i].style.height = Math.round(w[i] / pro[0] * pro[1]) + "px";
                                                  };
                                                  var margin_right = 10, borderW = 5, MBall = margin_right + borderW * 2;
                                                  for (var i = 0; i < leng; i++) {
                                                            this.domWidth += arg.preview[i] + MBall;
                                                            var height = p ? Math.round(arg.preview[i] / p) + "px;" :"auto;";
                                                            HTML += '<a href="javascript:;" style="width:' + arg.preview[i] + "px;height:" + height + "margin-right:" + margin_right + "px;background-color: #F5F5F5;border: " + borderW + "px solid #F5F5F5;" + '"><img src="' + srcDefault + '"/></a>';
                                                  }
                                                  this.dom = document.getElementById("preview");
                                                  this.dom.innerHTML = HTML;
                                                  this.dom.parentNode.style.width = arg.scopeWidth + 2 + "px";
                                                  var domimg = [ this.dom.getElementsByTagName("img"), this.dom.getElementsByTagName("a") ], imgUrlFun = function(d, u) {
                                                            d.src = u;
                                                  }, imgWHFun = function(d, WH, pro, i) {
                                                            var W = Math.round(WH[0] * pro), H = Math.round(WH[1] * pro), True = false;
                                                            _this.isW[i] === W || (d.style.width = W + "px", _this.isW[i] = W, True = true);
                                                            _this.isH[i] === H || (d.style.height = H + "px", _this.isH[i] = H, True = true);
															
                                                            if (True && thisMain.rotate > 10 && thisMain.rotate !== 180) { 
															       var  mylt = (_this.isW[i] - _this.isH[i]) / (thisMain.rotate===270?-2:2) + "px";
                                                                      d.style[thisMain.transform] = thisMain.SetRote.runSL(d, thisMain.transform, "translate(" + mylt + "," + mylt + ")");
                                                            }
                                                  }, RFun = function(d, styleR, R, pro) {
                                                            if (thisMain.transform) {
                                                                      var SL = R[1] * pro + "px";
                                                                      d.style[styleR] = thisMain.SetRote.run(d, styleR, R[0], "translate(" + SL + "," + SL + ")");
                                                            } else {
                                                                      d.style[styleR] = R;
                                                            }
                                                  }, funone, funtwo, funthree, domimgA = domimg[0], pro, leftBorder, topBorder, domimgi;
                                                  this.domimg = [ domimg[0], leng ], this.close_ = function() {
                                                            for (var i = 0; i < leng; i++) {
                                                                      domimgi = domimgA[i];
                                                                      domimgi.src = srcDefault;
                                                                      if ("cssText" in domimgi.style) domimgi.style.cssText = ""; else domimgi.setAttribute("style", "");
                                                            }
                                                            this.dom.style.display = "none";
                                                            arg.Effects && (arg.Effects.style.display = "none");
                                                            this.dom.parentNode.style.width = arg.scopeWidth + 2 + "px";
                                                  };
                                                  this.handle = function(argarr, True, TrueHTML5, args) {
                                                            True && this.open_(args || arg, TrueHTML5);
                                                            var left = argarr.left, top = argarr.top, formAllW = argarr.formAllW, imgUrl = argarr.imgUrl, TF = argarr.TF, styleR = argarr.styleR, R = argarr.R, formAllH = argarr.formAllH, HTML3D = argarr.HTML3D;
                                                            typeof imgUrl === "boolean" ? funone = EmptyFun :funone = imgUrlFun;
                                                            TF ? funtwo = imgWHFun :funtwo = EmptyFun;
                                                            typeof R === "boolean" ? funthree = EmptyFun :funthree = RFun;
                                                            typeof left === "boolean" ? left = EmptyFun :(leftBorder = left + arg.Border, topBorder = top + arg.Border, 
                                                            left = function(pro) {
                                                                      HTML3D.setLT(domimgi, leftBorder * pro + "px", topBorder * pro+ "px");
                                                            });
															for (var i = 0; i < leng; i++) {
                                                                      domimgi = domimgA[i];
                                                                      pro = arg.preview[i] / formAllW;
                                                                      left(pro);
                                                                      proportionFun(domimg, arg.preview, i, [ formAllW, formAllH ]);
                                                                      funone(domimgi, imgUrl);
                                                                      funtwo(domimgi, this.WH, pro, i);
                                                                      funthree(domimgi, styleR, R, pro);
                                                            }
                                                  };
                                        }
                              }
                    },
                    dom:false,
                    domWidth:0,
                    domimg:false,
                    WH:new Array(2),
                    parentNodes:false,
                    EffTrue:false,
                    handle:function(argarr, True, arg) {
                              True && this.open_(arg);
                    },
                    close_:function() {
                              this.arg.Effects && (this.arg.Effects.style.display = "none");
                              this.parentNodes && (this.parentNodes.style.width = this.arg.scopeWidth + 2 + "px");
                    },
                    open_:function(arg) {
                              var efffwidth = 0;
                              this.arg = arg;
                              if (this.EffTrue) {
                                        arg.Effects.style.display = "block";
                                        arg.Effects.scrollTop = 0;
                                        arg.Effects.style.height = arg.scopeHeight + "px";
                                        this.parentNodes = arg.Effects.parentNode;
                                        efffwidth = arg.Effects.offsetWidth;
                              } else {
                                        arg.Effects && (arg.Effects.parentNode.removeChild(arg.Effects), arg.Effects = false);
                              }
                              if (this.dom) {
                                        var this_ = this;
                                        this.dom.style.display = "block";
                                        this.dom.parentNode.style.width = arg.scopeWidth + this.domWidth + efffwidth + 10 + "px";
                              } else {
                                        arg.Effects && (arg.Effects.parentNode.style.width = arg.scopeWidth + this.domWidth + efffwidth + 2 + "px");
                              }
                    }
          },
          Rotate:function(arg) {
                    var rotate;
                    if (this.transform) {
                              arg === "left" ? this.rotate -= 90 :this.rotate += 90;
                              this.rotate = {
                                        "-90":270,
                                        0:0,
                                        "-270":90,
                                        360:0,
                                        180:180,
                                        90:90,
                                        270:270,
                                        "-360":0,
                                        "-180":180
                              }[this.rotate] || 0;
                              rotate = "rotate(" + this.rotate + "deg)";
                              var fun = this._exchange_();
                              this.setinitial(this.arg, true);
                              var SL = fun(this.arg.ImgMain, this.arg.ImgDom, rotate);
                              this.preview.handle({
                                        left:this.ImgDomL,
                                        top:this.ImgDomT,
                                        formAllW:this.formAllW,
                                        formAllH:this.formAllH,
                                        imgUrl:false,
                                        styleR:this.transform,
                                        R:[ rotate, SL ],
                                        HTML3D:this.HTML5
                              });
                    } else {
                              arg === "left" ? this.rotate -= 1 :this.rotate += 1;
                              this.rotate = this.rotate > 3 ? 0 :this.rotate < 0 ? 3 :this.rotate;
                              if (this.rotate === 1 || this.rotate === 3) {
                                        this.ImgRotateFun = function(W, H) {
                                                  return [ H, W ];
                                        };
                              } else {
                                        this.ImgRotateFun = function(W, H) {
                                                  return [ W, H ];
                                        };
                              }
                              this.arg.ImgMain.style.filter = this.arg.ImgDom.style.filter = rotate = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + this.rotate + ")";
                              this._ieexchange_();
                              this.preview.handle({
                                        left:false,
                                        top:false,
                                        formAllW:this.formAllW,
                                        formAllH:this.formAllH,
                                        imgUrl:false,
                                        styleR:"filter",
                                        R:rotate,
                                        HTML3D:this.HTML5
                              });
                              this.setinitial(this.arg, true);
                    }
          },
          pointhandle:function(residencetime, speed, txt, Position, backgroundColor, color, functions) {
                    var point = this.arg.scope.children[0];
                    point.className === "point" && this.arg.scope.removeChild(point);
                    if (residencetime === -1) return;
                    point = document.createElement("div");
                    point.className = "point";
                    this.arg.scope.insertBefore(point, this.arg.scope.childNodes[0]);
                    var this_ = this, num = -35, HTML53D = this.HTML5;
                    function show(begin, end, speed, cmd) {
                              begin += cmd;
                              if (begin > end && 0 < cmd) {
                                        HTML53D.setT(point, end + "px");
                                        if (residencetime) {
                                                  setTimeout(function() {
                                                            show(end, num, speed, -1);
                                                  }, residencetime);
                                        } else {
                                                  typeof functions === "function" && functions();
                                        }
                                        return;
                              } else {
                                        if (end > begin && 0 > cmd) {
                                                  try {
                                                            this_.arg.scope.removeChild(point);
                                                  } catch (e) {}
                                                  return;
                                        }
                              }
                              HTML53D.setT(point, begin + "px");
                              setTimeout(function() {
                                        show(begin, end, speed, cmd);
                              }, speed);
                    }
                    point.style.color = color;
                    point.style.backgroundColor = backgroundColor;
                    point.innerHTML = "<i></i>" + txt;
                    var pointI = point.getElementsByTagName("i")[0];
                    switch (Position) {
                         case 0:
                              pointI.style.backgroundPosition = "-16px 0";
                              break;

                         case 1:
                              pointI.style.backgroundPosition = "0 0";
                              break;

                         case 2:
                              pointI.style.backgroundPosition = "-31px 0";
                              break;
                    }
                    show(num, 0, speed, 1);
          },
          setinitial:function(arg, TF) {
                    var cl = 0, ct = 0, TrueTraverse = !arg.traverse, HTML53D = this.HTML5, RL, BL, RT, BT;
                    if (this.BoxW > this.ImgWidth) {
                              this.relatW = this.ImgWidth;
                              arg.relat.style.width = this.ImgWidth + "px";
                              var BiW = Math.round((this.BoxW - this.ImgWidth) * .5);
                              RL = (this.relatL = BiW) + "px";
                              BL = -BiW + "px";
                    } else {
                              arg.relat.style.width = this.BoxW + "px";
                              this.relatW = this.BoxW;
                              RL = BL = this.relatL = 0;
                              TrueTraverse && (cl = (this.BoxW - this.ImgWidth) / 2);
                    }
                    if (this.BoxH > this.ImgHeight) {
                              this.relatH = this.ImgHeight;
                              arg.relat.style.height = this.ImgHeight + "px";
                              var BiH = Math.round((this.BoxH - this.ImgHeight) * .5);
                              this.relatT = BiH;
                              RT = BiH + "px";
                              BT = -BiH + "px";
                    } else {
                              this.relatH = this.BoxH;
                              arg.relat.style.height = this.BoxH + "px";
                              RT = BT = this.relatT = 0;
                              TrueTraverse && (ct = (this.BoxH - this.ImgHeight) / 2);
                    }
                    HTML53D.setLT(arg.relat, RL, RT);
                    HTML53D.setLT(arg.black, BL, BT);
                    this.AmendOffset();
                    this.MovePhoto(TF, cl, ct, TrueTraverse);
          },
          MovePhoto:function(TF, cl, ct, True) {
                    var arg = this.arg, ImgDom = arg.ImgDom, ImgMain = arg.ImgMain, also, scale, ImgMainL, ImgMainT, ImgDomL, ImgDomT, HTML3D = this.HTML5;
                    if (arg.traverse && this.BoxW < this.ImgWidth) {
                              var MinusImgWBoxW = this.ImgWidth - this.BoxW;
                              also = this.BoxW - this.formAllW;
                              scale = also && MinusImgWBoxW / also;
                              var L = Math.round(-this.formLeft * scale);
                              ImgMainL = L;
                              ImgDomL = L - this.formLeft - this.Border;
                    } else {
                              ImgMainL = cl = arg.traverse ? 0 :True ? cl :this.ImgMainL;
                              ImgDomL = cl - this.formLeft - this.Border;
                    }
                    if (arg.traverse && this.BoxH < this.ImgHeight) {
                              var MinusImgHBoxH = this.ImgHeight - this.BoxH;
                              also = this.BoxH - this.formAllH;
                              scale = also && MinusImgHBoxH / also;
                              var T = Math.round(-this.formTop * scale);
                              ImgMainT = T;
                              ImgDomT = T - this.formTop - this.Border;
                    } else {
                              ImgMainT = ct = arg.traverse ? 0 :True ? ct :this.ImgMainT;
                              ImgDomT = ct - this.formTop - this.Border;
                    }
                    this.ImgMainT = ImgMainT, this.ImgMainL = ImgMainL;
                    this.ImgDomL = ImgDomL, this.ImgDomT = ImgDomT;
                    HTML3D.setLT(ImgMain, ImgMainL + "px", ImgMainT + "px");
                    HTML3D.setLT(ImgDom, ImgDomL + "px", ImgDomT + "px");
                    this.preview.handle({
                              left:ImgDomL,
                              top:ImgDomT,
                              formAllW:this.formAllW,
                              formAllH:this.formAllH,
                              imgUrl:false,
                              TF:TF,
                              styleR:false,
                              R:false,
                              HTML3D:HTML3D
                    });
          },
          AmendOffset:function() {
                    var HTML53D = this.HTML5, LT3D = HTML53D.getLT(this.formParent);
                    typeof this.formLeft === "boolean" && (this.formLeft = parseFloat(LT3D[0]));
                    typeof this.formTop === "boolean" && (this.formTop = parseFloat(LT3D[1]));
                    if (this.saveL) {
                              this.formLeft = this.saveL - this.relatL;
                              this.formTop = this.saveT - this.relatT;
                    } else {
                              this.formLeft -= this.relatL;
                              this.formTop -= this.relatT;
                    }
                    this.formLeft < 0 && (this.formLeft = 0, this.saveL = this.relatL);
                    this.formTop < 0 && (this.formTop = 0, this.saveT = this.relatT);
                    HTML53D.setLT(this.formParent, this.formLeft + "px", this.formTop + "px");
                    var formWL = this.formLeft + this.formAllW, formHT = this.formTop + this.formAllH, PL = false, PT = false;
                    if (formWL > this.relatW) {
                              var FrL = formWL - this.relatW;
                              if (FrL > this.formLeft) {
                                        this.formW = this.formW - (FrL - this.formLeft);
                                        this.formLeft = 0;
                                        PL = 0 + "px";
                                        this.saveL = this.relatL;
                                        this.formAllW = this.formW + this.Mdouble;
                              } else {
                                        this.formLeft -= FrL;
                                        PL = this.formLeft + "px";
                                        this.saveL = this.formLeft + this.relatL;
                              }
                    }
                    if (formHT > this.relatH) {
                              var FrT = formHT - this.relatH;
                              if (FrT > this.formTop) {
                                        this.formH = this.formH - (FrT - this.formTop);
                                        this.formTop = 0;
                                        PT = 0 + "px";
                                        this.saveT = this.relatT;
                                        this.formAllH = this.formH + this.Mdouble;
                              } else {
                                        this.formTop = this.formTop - FrT;
                                        PT = this.formTop + "px";
                                        this.saveT = this.formTop + this.relatT;
                              }
                    }
                    if (PL && PT) {
                              HTML53D.setLT(this.formParent, PL, PT);
                    } else {
                              if (PL) {
                                        HTML53D.setL(this.formParent, PL);
                              } else if (PT) {
                                        HTML53D.setT(this.formParent, PT);
                              }
                    }
                    if (this.arg.proportional[0]) {
                              var H = Math.round(this.formAllW / this.arg.proportional[0]);
                              if (H > this.formAllH) {
                                        this.formAllW = Math.round(this.formAllH * this.arg.proportional[0]);
                                        this.formW = this.formAllW - this.Mdouble;
                              } else {
                                        this.formAllH = H;
                                        this.formH = H - this.Mdouble;
                              }
                    }
                    this.arg.form.style.width = this.formW + "px", this.arg.form.style.height = this.formH + "px";
                    this.ie6(this.formParent, this.formAllW, this.formAllH);
          },
          MaxMinLimit:function(this_) {
                    this_.ImgWidth = this_.ImgOWidth = this.width;
                    this_.ImgHeight = this_.ImgOHeight = this.height;
                    if (typeof this_.arg.Max === "number") {
                              this_.ImgWidth > this_.arg.Max && (this_.ImgWidth = this_.arg.Max, this_.ImgHeight = Math.round(this_.ImgWidth / this_.ImgScales));
                              this_.ImgHeight > this_.arg.Max && (this_.ImgHeight = this_.arg.Max, this_.ImgWidth = Math.round(this_.ImgHeight * this_.ImgScales));
                    }
                    var MH, MW;
                    if (this_.arg.proportional[0]) {
                              MH = this_.Min;
                              MW = Math.round(MH * this_.arg.proportional[0]);
                              if (MW < this_.Min) {
                                        MW = this_.Min;
                                        MH = Math.round(MW / this_.arg.proportional[0]);
                              }
                    } else {
                              MW = MH = this_.Min;
                    }
                    this_.ImgWidth < MW && (this_.ImgWidth = MW, this_.ImgHeight = Math.round(this_.ImgWidth / this_.ImgScales));
                    this_.ImgHeight < MH && (this_.ImgHeight = MH, this_.ImgWidth = Math.round(this_.ImgHeight * this_.ImgScales));
                    this_.artworkW = this_.ImgWidth, this_.artworkH = this_.ImgHeight;
          },
          run:function(ImgUrl, Trues) {
                    this.HTML5.HTML5PHP = Trues;
                    var this_ = this, arg = this.arg, relatImgUrl = this.HTML5.canvas && Trues ? ImgUrl :arg.relativeUrl + ImgUrl, image = this.HTML5.Images = new Image();
                    this.defaultShear();
                    this.arg = arg;
                    this.HTML5.canvas && Trues || (this.ImgUrl = ImgUrl);
                    image.onload = function() {
                              if (!(this.width = Math.round(this.width)) > 0 || !(this.height = Math.round(this.height)) > 0) {
                                        this_.pointhandle(3e3, 10, "请选择正确图片", 0, "#f82373", "#fff");
                                        return;
                              }
                              arg.ImgMain.src = arg.ImgDom.src = relatImgUrl;
                              arg.black.style.zIndex = 99;
                              this_.ImgScales = this.width / this.height;
                              this_.Min = arg.Min;
                              this_.MaxMinLimit.call(this, this_);
                              arg.ImgMain.style.width = arg.ImgDom.style.width = this_.artworkW + "px", arg.ImgMain.style.height = arg.ImgDom.style.height = this_.artworkH + "px";
                              this_.BoxW = arg.scope.offsetWidth - 2;
                              this_.BoxH = arg.scope.offsetHeight - 2;
                              this_.Border = arg.Border;
                              this_.Mdouble = arg.Border * 2;
                              var W, H;
                              if (arg.proportional[0]) {
                                        W = arg.proportional[1] - this_.Mdouble;
                                        H = arg.proportional[1] / arg.proportional[0] - this_.Mdouble;
                              } else {
                                        W = arg.proportional[1] - this_.Mdouble;
                                        H = arg.proportional[2] - this_.Mdouble;
                              }
                              this_.formW = W = Math.round(W);
                              this_.formH = H = Math.round(H);
                              this_.formAllW = W + this_.Mdouble;
                              this_.formAllH = H + this_.Mdouble;
                              this_.preview.WH = [ this_.artworkW, this_.artworkH ];
                              this_.formParent = arg.form.offsetParent;
                              this_.et();
                              this_.setinitial(arg);
                              this_.preview.handle({
                                        left:false,
                                        top:false,
                                        formAllW:this_.formAllW,
                                        formAllH:this_.formAllH,
                                        TF:true,
                                        imgUrl:relatImgUrl,
                                        styleR:false,
                                        R:false,
                                        HTML3D:this_.HTML5
                              }, true, arg);
                              var str = this_.MoveDiv = new window.ShearPhoto.MoveDiv();
                              str.reckon(arg.relat, false);
                              str.selectionempty = this_.selectionempty;
                              str.addevent = this_.addevent;
                              str.HTML5 = this_.HTML5;
                              str.run({
                                        to:new Array(arg.form),
                                        form:this_.formParent,
                                        MoveWidth:this_.relatW,
                                        MoveHeight:this_.relatH,
                                        shifting:new Array(),
                                        center:1,
                                        centerFront:function() {
                                                  return [ this_.relatW, this_.relatH ];
                                        },
                                        DivDownFun:function(t) {
                                                  t.arg.MoveWidth = this_.relatW;
                                                  t.arg.MoveHeight = this_.relatH;
                                                  t.DivW = this_.formW + this_.Mdouble;
                                                  t.DivH = this_.formH + this_.Mdouble;
                                        },
                                        centerfun:function(l, t, tt) {
                                                  this_.formLeft = l;
                                                  this_.formTop = t;
                                                  this_.MovePhoto(false, 0, 0);
                                                  tt.arg.MoveWidth = this_.relatW;
                                                  tt.arg.MoveHeight = this_.relatH;
                                                  tt.DivW = this_.formW + this_.Mdouble;
                                                  tt.DivH = this_.formH + this_.Mdouble;
                                        },
                                        zIndex:100,
                                        MoveFun:function(iL, iT, MoveScale) {
                                                  this_.formLeft = iL;
                                                  this_.formTop = iT;
                                                  this_.MovePhoto(true, 0, 0);
                                        }
                              });
                              this_.MoveDivEve = function() {
                                        str.delDownEve();
                              };
                              arg.Shearbar.style.display = "block";
                              arg.SelectBox.style.visibility = "hidden";
                              this_.zoom();
                              this_.pointhandle(2e3, 10, "可以拖动或拉伸蓝边框进行截图", 1, "#fbeb61", "#3a414c");
                              delete relatImgUrl;
                              delete ImgUrl;
                    };
                    image.onerror = function() {
                              this_.pointhandle(0, 10, "无法读取图片。图片类型或路径不正确 或 relativeUrl参数是否存在问题", 0, "#f82373", "#fff");
                    };
					 this.pointhandle(0, 1, "图片已加载，正在创建截图环境，请稍等........", 2, "#fbeb61", "#3a414c", function() {
                              image.src = relatImgUrl;
                    });
          },
          config:function(arg) {
                    this.arg = arg;
                    arg.Shearbar.style.display = "none";
                    arg.scope.style.width = arg.black.style.width = arg.SelectBox.style.width = arg.scopeWidth + "px";
                    arg.scope.style.height = arg.black.style.height = arg.SelectBox.style.height = arg.scopeHeight + "px";
                    var scopeparentNode = arg.scope.parentNode;
                    scopeparentNode.style.width = scopeparentNode.parentNode.style.width = arg.scopeWidth + 2 + "px";
                    var opacityFun;
                    this.HTML5.IfHTML5(this.transform, arg.HTML5, arg.HTML5MAX);
                    this.HTML5.HTML5LT(arg.translate3d && this.transform);
                    if (this.transform) opacityFun = function(t, n) {
                              t.style.opacity = n;
                    }; else opacityFun = function(t, n) {
                              t.style.filter = "alpha(opacity=" + n * 100 + ")";
                    };
                    if (arg.Border > 0) {
                              arg.DynamicBorder[0].style.display = arg.DynamicBorder[1].style.display = arg.DynamicBorder[2].style.display = arg.DynamicBorder[3].style.display = "none";
                              arg.DynamicBorder[0].style.background = arg.DynamicBorder[1].style.background = arg.DynamicBorder[2].style.background = arg.DynamicBorder[3].style.background = "#FFF";
                              for (var a in arg.to) {
                                        arg.to[a].style.border = "1px solid" + " " + arg.BorderColor;
                                        arg.to[a].style.background = arg.BorderColor;
                                        opacityFun(arg.to[a], 1);
                              }
                              arg.form.style.border = arg.Border + "px" + "  " + arg.BorderStyle + "  " + arg.BorderColor;
                    }
                    arg.black.style.background = arg.backgroundColor;
                    opacityFun(arg.black, arg.backgroundOpacity);
                    this.preview.run(arg, this);
                    arg.scope.ondragstart = function() {
                              return false;
                    };
                    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 && arg.Border === 0) this.ie6 = function(a, b, c) {
                              a.style.height = arg.DynamicBorder[1].style.height = arg.DynamicBorder[2].style.height = c + "px";
                              a.style.width = b + "px";
                    }; else this.ie6 = function() {};
                    if (this.preview.EffTrue = arg.HTML5Effects && this.HTML5.canvas && arg.Effects) {
                              var EffectsA = arg.Effects.getElementsByTagName("a"), EffectsAi, EffectsAiclick = this.HTML5.Effects;
                              this.HTML5.artwork = this.HTML5.Aclick = EffectsA[0];
                              for (var i = 0; i < EffectsA.length; i++) {
                                        EffectsAi = EffectsA[i];
                                        EffectsAi.onclick = EffectsAiclick.call(this, EffectsAi.getAttribute("StrEvent"), this.HTML5);
                              }
                    }
                    this.pointhandle(3e3, 10, "请选择本地照片、相册、拍照，进行截取头像", 2, "#307ff6", "#fff");
          },
          zoom:function() {
                    var this_ = this, zoom = new window.ShearPhoto.MoveDiv();
                    zoom.reckon(this_.arg.ZoomDist, false);
                    zoom.selectionempty = this_.selectionempty;
                    zoom.addevent = this_.addevent;
                    zoom.HTML5 = this.HTML5;
                    var Draggable = this_.arg.ZoomBar, MH, MW;
                    if (this_.arg.proportional[0]) {
                              MH = this_.Min;
                              MW = Math.round(MH * this_.arg.proportional[0]);
                              if (MW < this_.Min) {
                                        MW = this_.Min;
                                        MH = Math.round(MW / this_.arg.proportional[0]);
                              }
                    } else {
                              MW = MH = this_.Min;
                    }
                    zoom.run({
                              to:[ Draggable ],
                              form:Draggable,
                              MoveWidth:zoom.ReckonWH.W,
                              MoveHeight:zoom.ReckonWH.H,
                              shifting:new Array(),
                              center:1,
                              zIndex:100,
                              DivDownFun:function() {
                                        this_.saveL = this_.formLeft + this_.relatL;
                                        this_.saveT = this_.formTop + this_.relatT;
                              },
                              cursor:"pointer",
                              MoveFun:function(L) {
                                        var schedule;
                                        if (L < bisect) schedule = Math.round(Zoomout * L + 10) / 100; else schedule = Math.round(L * magnify - 100) / 100;
                                        var W = Math.round(this_.artworkW * schedule), H = Math.round(this_.artworkH * schedule);
                                        W < MW && (W = MW, H = Math.round(W / this_.ImgScales));
                                        H < MH && (H = MH, W = Math.round(H * this_.ImgScales));
                                        var IMGWH = this_.ImgRotateFun(W, H);
                                        this_.ImgWidth = IMGWH[0];
                                        this_.ImgHeight = IMGWH[1];
                                        this_.arg.ImgMain.style.width = this_.arg.ImgDom.style.width = W + "px";
                                        this_.arg.ImgMain.style.height = this_.arg.ImgDom.style.height = H + "px";
                                        this_.preview.WH = [ W, H ];
                                        this_.setinitial(this_.arg, true);
                              }
                    });
                    this_.zoomEve = function() {
                              zoom.delDownEve();
                    };
                    var zoomMAx = zoom.ReckonWH.W - zoom.DivW, bisect = zoomMAx * .5, magnify = 200 / bisect, Zoomout = 90 / bisect;
          },
          PointerShape:function(Shape) {
                    this.arg.scope.style.cursor = this.arg.form.style.cursor = Shape;
          },
          DelPointerShape:function() {
                    this.arg.scope.style.cursor = "";
                    this.arg.form.style.cursor = "move";
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
                    for (var a in this.arg.to) {
                              if (this.addevent === "add") {
                                        if (typeof this.DivDownEVe[a] !== "function") {
                                                  this.DivDownEVe[a] = this.DivDown(a);
                                        } else {
                                                  this.delShearPhotoDown(this.arg.to[a], this.DivDownEVe[a]);
                                        }
                                        this.ShearPhotoDown(this.arg.to[a], this.DivDownEVe[a]);
                              } else {
                                        this.arg.to[a].onmousedown = this.DivDown(a);
                              }
                    }
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
          DomUp:function(dom) {
                    var this_ = this;
                    return function() {
                              typeof this_.arg.UpFun === "function" && this_.arg.UpFun();
                              dom.releaseCapture && dom.releaseCapture();
                              this_.DelPointerShape();
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
          setWHfalse:function(argform, iW, iH, proportional, MaxW, MaxH) {
                    iW > MaxW && (iW = MaxW);
                    iH > MaxH && (iH = MaxH);
                    iW < this.Min && (iW = this.Min);
                    iH < this.Min && (iH = this.Min);
                    return [ iW, iH ];
          },
          setWfalse:function(argform, iW, iH, proportional, MaxW, MaxH) {
                    iW > MaxW && (iW = MaxW);
                    iW < this.Min && (iW = this.Min);
                    return [ iW, this.formAllH ];
          },
          setHfalse:function(argform, iW, iH, proportional, MaxW, MaxH) {
                    iH > MaxH && (iH = MaxH);
                    iH < this.Min && (iH = this.Min);
                    return [ this.formAllW, iH ];
          },
          CycleCalculation:function(iW, iH, proportional, MaxW, MaxH) {
                    if (iH > MaxH) {
                              iH = MaxH;
                              iW = Math.round(iH * proportional);
                              return this.CycleCalculation.apply(this, arguments);
                    }
                    if (iW > MaxW) {
                              iW = MaxW;
                              iH = Math.round(iW / proportional);
                              return this.CycleCalculation.apply(this, arguments);
                    }
                    if (iH < this.Min) {
                              iH = this.Min;
                              iW = Math.round(iH * proportional);
                              return this.CycleCalculation.apply(this, arguments);
                    }
                    if (iW < this.Min) {
                              iW = this.Min;
                              iH = Math.round(iW / proportional);
                              return this.CycleCalculation.apply(this, arguments);
                    }
                    return [ iW, iH ];
          },
          setHtrue:function(argform, iW, iH, proportional, MaxW, MaxH) {
                    iW = Math.round(iH * proportional);
                    return this.CycleCalculation(iW, iH, proportional, MaxW, MaxH);
          },
          setWtrue:function(argform, iW, iH, proportional, MaxW, MaxH) {
                    iH = Math.round(iW / proportional);
                    return this.CycleCalculation(iW, iH, proportional, MaxW, MaxH);
          },
          amend:function(iW, iH, formParent, strLL, strTT) {
                    var L = iW - this.formAllW, T = iH - this.formAllH, Left, Top, ImgLeft, ImgTop, this_ = this, HTML5 = this.HTML5, fun = {
                              LL:function() {
                                        Left = Math.round(this_.formLeft - L);
                                        this_.formLeft = Left;
                                        HTML5.setL(formParent, Left + "px");
                              },
                              TT:function() {
                                        Top = Math.round(this_.formTop - T);
                                        this_.formTop = Top;
                                        HTML5.setT(formParent, Top + "px");
                              },
                              ML:function() {
                                        L *= .5;
                                        Left = this_.formLeft - L;
                                        this_.formLeft = Left;
                                        HTML5.setL(formParent, Left + "px");
                              },
                              MT:function() {
                                        T *= .5;
                                        Top = this_.formTop - T;
                                        this_.formTop = Top;
                                        HTML5.setT(formParent, Top + "px");
                              },
                              NO:function() {}
                    };
                    fun[strLL](), fun[strTT]();
          },
          DomMove:function(this_, dom, disX, disY, PNW, PNH, formParent, MaxW, MaxH, strLL, strTT) {
                    var eveclientX, eveclientY, drawWH, iW, iH, argform, iHH, iWW, ImgMain = this_.arg.ImgMain, ImgDom = this_.arg.ImgDom;
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
                    return function(eve) {
                              eve = eve || window.event;
                              if (eve.button > 1) {
                                        this_.DomUp(this)();
                                        return false;
                              }
                              eveclientX = this_.eveMold[3](eve, "clientX"), eveclientY = this_.eveMold[3](eve, "clientY"), 
                              argform = this_.arg.form;
                              setTimeout(function() {
                                        iW = PNW * (eveclientX - disX);
                                        iH = PNH * (eveclientY - disY);
                                        this_.selectionempty();
                                        drawWH = this_.drawfun(argform, iW, iH, this_.arg.proportional[0], MaxW, MaxH);
                                        iW = drawWH[0];
                                        iH = drawWH[1];
                                        this_.amend(iW, iH, formParent, strLL, strTT);
                                        this_.formAllW = iW;
                                        this_.formAllH = iH;
                                        iW = this_.formW = iW - this_.Mdouble;
                                        iH = this_.formH = iH - this_.Mdouble;
                                        argform.style.width = iW + "px", argform.style.height = iH + "px";
                                        this_.ie6(formParent, iW, iH);
                                        this_.MovePhoto(true, 0, 0);
                              }, 1);
                              return false;
                    };
          },
          defaultShear:function() {
                    this.arg.Shearbar.style.display = "none";
                    typeof this.MoveDivEve === "function" && this.MoveDivEve();
                    typeof this.zoomEve === "function" && this.zoomEve();
                    if ("cssText" in this.arg.ImgMain.style) this.arg.ImgMain.style.cssText = this.arg.ImgDom.style.cssText = ""; else {
                              this.arg.ImgMain.setAttribute("style", "");
                              this.arg.ImgDom.setAttribute("style", "");
                    }
                    this.arg = this.ImgUrl = this.formW = this.formH = this.formAllW = this.formAllH = this.drawfun = this.formParent = this.ImgWidth = this.ImgHeight = this.artworkW = this.artworkH = this.BoxW = this.BoxH = this.Border = this.Mdouble = this.ImgScales = this.Min = this.formLeft = this.formTop = this.relatL = this.relatT = this.relatW = this.relatH =  this.saveL = this.ImgOWidth = this.ImgOHeight = this.saveT = this.HTML5.lock = this.HTML5.PhotoHTML5True = false;
                    this.rotate = this.ImgMainT = this.ImgDomT = this.ImgMainL = this.ImgDomL = 0;
				     this.preview.isW=[];
					 this.preview.isH=[];
					  
                    this.ImgRotateFun = function(W, H) {
                              return [ W, H ];
                    };
          },
          SendUserMsg:function(msg, n, p, b, c, i, k) {
                    this.arg.black.style.zIndex = i ? 199 :99;
                    this.pointhandle(n, 10, msg, p, b, c);
                    k ? this.arg.Shearbar.style.display = "none" :this.arg.Shearbar.style.display = "block";
          },
          again:function() {
                    this.arg.SelectBox.style.visibility = "visible";
                    this.arg.Shearbar.style.display = "none";
                    this.arg.ImgDom.src = this.arg.ImgMain.src = this.arg.relativeUrl + "images/default.gif";
          },
          CoordinateData:function(True) {
                    var SendPHPSmaller = function(W, H, P) {
                              if (W < 1) {
                                        W = 1;
                                        H = Math.round(1 / P);
                              }
                              if (H < 1) {
                                        H = 1;
                                        W = Math.round(P);
                              }
                              return [ W, H ];
                    }, SendArry = {};
                    True || (SendArry.url = "../" + this.ImgUrl);
                    var R = {
                              1:270,
                              2:180,
                              3:90,
                              "90":270,
                              "180":180,
                              "270":90
                    }[this.rotate] || (R = this.rotate), LT = this.ImgWidth, TL = this.ImgHeight, XYWH = {
                              0:LT,
                              90:TL,
                              180:LT,
                              270:TL
                    }, XYWHP = this.ImgOWidth / XYWH[R];
                    SendArry.R = R;
                    SendArry.X = Math.round((Math.abs(this.ImgDomL) - this.Border) * XYWHP);
                    SendArry.Y = Math.round((Math.abs(this.ImgDomT) - this.Border) * XYWHP);
                    SendArry.P = this.arg.proportional[0];
                    var P = this.formAllW / this.formAllH, Smaller = SendPHPSmaller(Math.round(this.formAllW * XYWHP), Math.round(this.formAllH * XYWHP), P);
                    SendArry.IW = Smaller[0];
                    SendArry.IH = Smaller[1];
                    Smaller = SendPHPSmaller(this.formAllW, this.formAllH, P);
                    SendArry.FW = Smaller[0];
                    SendArry.FH = Smaller[1];
                    return SendArry;
          },
          SendPHP:function(postArgs) {
                    this.SendUserMsg("正在为你处理截图，稍等...", 0, 2, "#fbeb61", "#3a414c", true, true);
                    var this_ = this, SendArry, HTML5 = this.HTML5, ResultData;
                    if ((HTML5.HTML5PHP || HTML5.PhotoHTML5True) && HTML5.canvas) {
                              try {
                                        HTML5.BOLBID && HTML5.URL.revokeObjectURL(HTML5.BOLBID);
                                        SendArry = this.CoordinateData(true);
                                        ResultData = HTML5.CanvasImg(SendArry, postArgs, this);
                              } catch (e) {
                                        this_.SendUserMsg("错误：切割图片时严重报错,请更换浏览器试试，或者换张图片", 5e3, 0, "#f4102b", "#fff", false);
                                        return;
                              }
                    } else {
                              var POSTHTML = "";
                              if (Object.prototype.toString.call(postArgs) === "[object Object]") {
                                        for (var key in postArgs) {
                                                  POSTHTML += "&" + key + "=" + postArgs[key];
                                        }
                              }
                              SendArry = this.CoordinateData();
                              ResultData = "JSdate=" + window.ShearPhoto.JsonString.JsonToString(SendArry) + POSTHTML;
                    }
                    this.MyAjax.carry({
                              url:this_.arg.url,
                              data:ResultData,
                              type:"POST",
                              timeout:1e4,
                              async:true,
                              lock:true,
                              complete:false,
                              success:function(serverdata) {
                                        serverdata = window.ShearPhoto.JsonString.StringToJson(serverdata);
                                        if (serverdata === false) {
                                                  this_.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff", false);
                                                  return;
                                        }
                                        if (serverdata["erro"]) {
                                                  this_.SendUserMsg("错误：" + serverdata["erro"], 5e3, 0, "#f4102b", "#fff", false);
                                                  return;
                                        }
                                        typeof this_.complete === "function" && this_.complete(serverdata);
                                         delete this_.HTML5.Images;
                              },
                              error:function(ErroMsg) {
                                        this_.SendUserMsg("错误：连接后端失败，可能原因，超时！或者后端环境无法运行", 5e3, 0, "#f4102b", "#fff", false);
                              },
                              cache:false
                    });
          },
          DivDown:function(a) {
                    var this_ = this, PNW = 1, PNH = 1, strLL = "NO", strTT = "NO", MaxW, MaxH, W, H, formParentoffsetLeft, formParent, formParentoffsetTop;
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
                                        W = this_.formAllW, H = this_.formAllH, formParent = this_.formParent, formParentoffsetLeft = this_.formLeft, 
                                        formParentoffsetTop = this_.formTop;
                                        switch (a) {
                                             case "BottomRight":
                                                  MaxW = this_.relatW - formParentoffsetLeft, MaxH = this_.relatH - formParentoffsetTop;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setWHfalse;
                                                  this_.PointerShape("nw-resize");
                                                  break;

                                             case "TopRight":
                                                  PNH = -1;
                                                  strTT = "TT";
                                                  MaxW = this_.relatW - formParentoffsetLeft, MaxH = formParentoffsetTop + this_.formAllH;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setWHfalse;
                                                  this_.PointerShape("ne-resize");
                                                  break;

                                             case "Bottomleft":
                                                  PNW = -1;
                                                  strLL = "LL";
                                                  MaxW = formParentoffsetLeft + this_.formAllW;
                                                  MaxH = this_.relatH - formParentoffsetTop;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setWHfalse;
                                                  this_.PointerShape("ne-resize");
                                                  break;

                                             case "Topleft":
                                                  PNH = PNW = -1;
                                                  strLL = "LL";
                                                  strTT = "TT";
                                                  MaxW = formParentoffsetLeft + this_.formAllW;
                                                  MaxH = formParentoffsetTop + this_.formAllH;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setWHfalse;
                                                  this_.PointerShape("nw-resize");
                                                  break;

                                             case "Topmiddle":
                                                  strLL = "ML";
                                                  var MaxWA = formParentoffsetLeft, MaxWB = this_.relatW - MaxWA - this_.formAllW;
                                                  MaxW = Math.min(MaxWA, MaxWB) * 2 + this_.formAllW;
                                                  strTT = "TT";
                                                  MaxH = formParentoffsetTop + this_.formAllH;
                                                  PNH = -1;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setHfalse;
                                                  this_.PointerShape("n-resize");
                                                  break;

                                             case "leftmiddle":
                                                  PNH = PNW = -1;
                                                  MaxW = formParentoffsetLeft + this_.formAllW;
                                                  var MaxHA = formParentoffsetTop, MaxHB = this_.relatH - MaxHA - this_.formAllH;
                                                  MaxH = Math.min(MaxHA, MaxHB) * 2 + this_.formAllH;
                                                  strTT = "MT";
                                                  strLL = "LL";
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setWtrue :this_.drawfun = this_.setWfalse;
                                                  this_.PointerShape("e-resize");
                                                  break;

                                             case "Rightmiddle":
                                                  MaxW = this_.relatW - formParentoffsetLeft;
                                                  var MaxHA = formParentoffsetTop, MaxHB = this_.relatH - MaxHA - this_.formAllH;
                                                  MaxH = Math.min(MaxHA, MaxHB) * 2 + this_.formAllH;
                                                  strTT = "MT";
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setWtrue :this_.drawfun = this_.setWfalse;
                                                  this_.PointerShape("e-resize");
                                                  break;

                                             case "Bottommiddle":
                                                  var MaxWA = formParentoffsetLeft, MaxWB = this_.relatW - MaxWA - this_.formAllW;
                                                  MaxW = Math.min(MaxWA, MaxWB) * 2 + this_.formAllW;
                                                  MaxH = this_.relatH - formParentoffsetTop;
                                                  this_.arg.proportional[0] ? this_.drawfun = this_.setHtrue :this_.drawfun = this_.setHfalse;
                                                  strLL = "ML";
                                                  this_.PointerShape("n-resize");
                                                  break;

                                             default:
                                                  break;
                                        }
                                        var disX = clientX - PNW * W, disY = clientY - PNH * H;
                                        this.setCapture && this.setCapture();
                                        typeof this_.DomMoveEve === "function" && this_.delEvent(document, this_.eveMold[1], this_.DomMoveEve);
                                        this_.DomMoveEve = this_.DomMove(this_, this, disX, disY, PNW, PNH, formParent, MaxW, MaxH, strLL, strTT);
                                        this_.addEvent(document, this_.eveMold[1], this_.DomMoveEve);
                              } else {
                                        this_.DomUp(this)();
                              }
                              return false;
                    };
          }
};

window.ShearPhoto.MINGGE = function(a) {
          function b() {
                    try {
                              document.documentElement.doScroll("left");
                    } catch (c) {
                              return setTimeout(b, 13), void 0;
                    }
                    a();
          }
          "function" == typeof a && (document.addEventListener ? document.addEventListener("DOMContentLoaded", a, !1) :window.attachEvent ? b() :alert("MINGGE  ERRO"));
};
/*--------------------------拉伸，截图.HTML5的压缩，剪图的处理核心部份结束-----------------------------------------------------------------------------*/





/*--------------------------拖拽移动处理开始-----------------------------------------------------------------------------*/

window.ShearPhoto.MoveDiv = function() {
          this.arg = new Array(), this.ReckonWH = this.DivW = this.DivH = this.selectionempty = this.addevent = this.DivDownEVe = this.DomMoveEve = this.DomUpEve = this.eveMold = false;
};

window.ShearPhoto.MoveDiv.prototype = {
          ZeroSetting:function() {
                    var getLT = this.HTML5.getLT(this.arg.form),
                        left = parseFloat(getLT[0]), top = parseFloat(getLT[1]),
                        size = this._size_(window, true),
                        leftfun = function() {}, topfun = function() {}, tf = false;
                    if (!isNaN(left)) {
                              tf = true;
                              this.HTML5.setL(this.arg.form, 0);
                              leftfun = function(a, b) {
                                        a < 0 && (a = 0);
                                        this_.HTML5.setL(b, left - a + "px");
                              };
                    }
                    if (!isNaN(top)) {
                              tf = true;
                              this.HTML5.setT(this.arg.form, 0);
                              topfun = function(a, b) {
                                        a < 0 && (a = 0);
                                        this_.HTML5.setT(b, top - a + "px");
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
                    var argform = this_.arg.form, DivW = this_.DivW, DivH = this_.DivH, MoveScale, MoveFun = function() {},
                        shifting = this_.arg.shifting = Object.prototype.toString.call(this_.arg.shifting) === "[object Array]" && this_.arg.shifting.length > 1 ? this_.arg.shifting :new Array(0, 0),
                        argMoveWidth = this_.arg.MoveWidth - shifting[0],
                        argMoveHeight = this_.arg.MoveHeight - shifting[1];
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
                                        this_.HTML5.setLT(argform, iL + "px", iT + "px");
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
                                        var getLT = this_.HTML5.getLT(this_.arg.form), formLeft = parseFloat(getLT[0]), formTop = parseFloat(getLT[1]), disX = clientX - formLeft, disY = clientY - formTop;
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
                    var DivT = Math.round((CH - this.DivH) / 2);
                    DivT = DivT < 0 ? 0 :DivT;
                    var DivL = Math.round((CW - this.DivW) / 2);
                    DivL = DivL < 0 ? 0 :DivL;
                    this.HTML5.setLT(argform, DivL + "px", DivT + "px");
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

/*--------------------------拖拽移动处理结束--------------------------------------------------------------------------------------*/

/*--------------------------与服务器交互数据JS部份开始-------------------------------------------------------------------------------*/

window.ShearPhoto.JsonString = {
          _json_:null,
          JsonToString:function(arr) {
                    try {
                              this._json_ = new Array();
                              this._read_(arr, true);
                              var JsonJoin = this._json_.join("");
                              JsonJoin = JsonJoin.replace(/,([\}\]])/g, function(a, b) {
                                        return b;
                              });
                              this._json_ = null;
                              return JsonJoin;
                    } catch (e) {
                              alert("发生错误，错误代码--" + e);
                              return "";
                    }
          },
          StringToJson:function(arrtxt) {
                    if (typeof arrtxt !== "string") {
                              alert("请传入JSON字串符,看清楚demo.html是怎么操作的");
                              return;
                    }
                    try {
                              var array = new Function("return " + "(" + arrtxt + ")")();
                              var type = this._type_(array);
                              if (type !== "[object Object]" && type !== "[object Array]") {
                                        alert("严重报错：后端没返回到JSON，而是一串无效字符串。\n\n你是在调试吗？\n\n那么按确定，查看那串无效字符串吧");
                                        alert(arrtxt);
                                        return false;
                              }
                              return array;
                    } catch (e) {
                              alert("严重报错：后端没返回到JSON，而是一串无效字符串。\n\n你是在调试吗？\n\n那么按确定，查看那串无效字符串吧");
                              alert(arrtxt);
                              return false;
                    }
          },
          _type_:function(arr) {
                    if (typeof arr.nodeType === "number") return "[object document]";
                    var Types = Object.prototype.toString.call(arr);
                    return Types;
          },
          _addjson_:function(types, txt, txt2, TrueFalse) {
                    var run = {
                              "[object Object]":txt,
                              "[object Array]":txt2
                    };
                    this._json_.push(run[types]);
          },
          _addstring_:function(parameter) {
                    var of = typeof parameter;
                    if (of === "string") return '"' + parameter + '"'; else if (of === "number") return parameter;
                    var types = this._type_(parameter);
                    if (types === "[object Object]" || types === "[object Array]") {
                              return false;
                    } else return '""';
          },
          _read_:function(arr, TrueFalse) {
                    var types = this._type_(arr);
                    if (TrueFalse && types !== "[object Object]" && types !== "[object Array]") {
                              alert("你传入不是数组或JSON,看清楚demo.html是怎么操作的");
                              this._json_ = null;
                              return false;
                    }
                    this._addjson_(types, "{", "[", TrueFalse);
                    for (var a in arr) {
                              if (typeof arr.constructor.prototype[a] === "undefined") {
                                        var ArrA = this._addstring_(arr[a]);
                                        if (typeof ArrA !== "boolean") {
                                                  this._addjson_(types, '"' + a + '":' + ArrA + ",", ArrA + ",");
                                        } else {
                                                  this._addjson_(types, '"' + a + '":', "");
                                                  this._read_(arr[a], false);
                                        }
                              }
                    }
                    TrueFalse = TrueFalse ? "" :",";
                    this._addjson_(types, "}" + TrueFalse, "]" + TrueFalse);

          }
};

window.ShearPhoto.MyAjax = function() {
          this.serverdata = this.erromsg = this.timeout = this.stop = this.xmlhttp = false;
          this.transit = true;
};

window.ShearPhoto.MyAjax.prototype.handle = function(xmlhttp, arg) {
          if (4 == xmlhttp.readyState) {
                    if (this.stop === true) return;
                    this.transit = true;
                    if (arg.timeout && arg.async) {
                              clearTimeout(this.timeout);
                              this.timeout = false;
                    }
                    if (200 == xmlhttp.status) {
                              var responseText = this.serverdata = xmlhttp.responseText.replace(/(^\s*)|(\s*$)/g, "");
                              typeof arg.success === "function" && arg.success(responseText);
                    } else {
                              this.erromsg = xmlhttp.status;
                              typeof arg.error === "function" && arg.error(xmlhttp.status);
                    }
          } else {
                    if (0 == xmlhttp.readyState) {
                              if (this.stop === true) return;
                              if (arg.timeout && arg.async) {
                                        clearTimeout(this.timeout);
                                        this.timeout = false;
                              }
                              this.erromsg = xmlhttp.readyState;
                              this.transit = true;
                              typeof arg.error === "function" && arg.error(xmlhttp.readyState);
                    }
          }
};

window.ShearPhoto.MyAjax.prototype.out = function(arg) {
          this.transit = true;
          this.erromsg = 504;
          this.stop = true;
          typeof arg.error === "function" && arg.error(504);
};

window.ShearPhoto.MyAjax.prototype.carry = function(arg) {
          if (arg.lock && !this.transit) return false;
          this.transit = false;
          this.stop = this.erromsg = false;
          var xmlhttp;
          if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
          } else {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          arg.type = arg.type.toUpperCase();
          var ContentType = function() {};
          if (typeof arg.data === "string") {
                    arg.data = arg.data.replace(/(^\s*)|(\s*$)/g, "");
                    ContentType = function() {
                              xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    };
          } else {
                    if (Object.prototype.toString.call(arg.data) !== "[object FormData]") {
                              arg.data = "";
                              ContentType = function() {
                                        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                              };
                    } else {
                              typeof arg.progress === "function" && xmlhttp.upload.addEventListener("progress", arg.progress, false);
                              arg.type = "POST";
                    }
          }
          var SendArg = arg.data == "" ? [ null, "" ] :[ arg.data, "?" + arg.data ];
          var self = this;
          typeof arg.complete === "function" && arg.complete();
          arg.timeout && arg.async && (this.timeout = setTimeout(function() {
                    self.out(arg);
          }, arg.timeout));
          if (arg.async === true) {
                    xmlhttp.onreadystatechange = function() {
                              self.handle(xmlhttp, arg);
                    };
          }
          try {
                    switch (arg.type) {
                         case "POST":
                              xmlhttp.open("POST", arg.url, arg.async);
                              ContentType();
                              break;

                         default:
                              xmlhttp.open("GET", arg.url + SendArg[1], arg.async);
                              arg.cache === true || xmlhttp.setRequestHeader("If-Modified-Since", "0");
                              break;
                    }
          } catch (e2) {
                    this.erromsg = 505;
                    if (arg.timeout && arg.async) {
                              clearTimeout(this.timeout);
                              this.timeout = false;
                    }
                    this.transit = true;
                    typeof arg.error === "function" && arg.error(505);
                    return;
          }
          xmlhttp.send(SendArg[0]);
          if (arg.async === false) {
                    self.handle(xmlhttp, arg);
          }
};

/*--------------------------与服务器交互数据JS部份结束-------------------------------------------------------------------------------*/





/*--------------------------选择上传截图的JS部份开始-------------------------------------------------------------------------------*/
window.ShearPhoto.frameUpImg = function(config) {
          this.BodyDom = document.body;
          this.FORM = config.FORM;
          this.upfile = this.FORM.UpFile;
          this.config = config;
          this.upfileclick = false;
          typeof config.erro !== "function" && (config.erro = function() {});
          this.FORM.action = config["url"];
          var this_ = this;
          this.parentNodes = this.upfile.parentNode;
          if (window.attachEvent) {
                    this.parentNodes.onmousemove = function() {
                              var offsetX = window.event.offsetX + 5;
                              offsetX < 0 && (offsetX = 0);
                              offsetX > 224 && (offsetX = 224);
                              this_.upfile.style.width = offsetX + "px";
                    };
          }
};

window.ShearPhoto.frameUpImg.prototype = {
          createframe:function() {
                    this.BodyDom.insertAdjacentHTML("afterBegin", '<iframe name="POSTiframe"   class="displayNone"  ></iframe>');
                    this.iframe = document.getElementsByName("POSTiframe")[0];
                    this.createEve(this.iframe, window.frames["POSTiframe"]);
          },
          createEve:function(iframe, windowframes) {
                    var this_ = this;
                    if (this.upfile.files) {
                              iframe.onload = function() {
                                        iframe.onload = null;
                                        var windowframesbody = windowframes.document.getElementsByTagName("BODY")[0];
                                        var html = windowframesbody.innerHTML;
                                        this_.Evebubbling(html);
                              };
                    } else {
                              iframe.onreadystatechange = function() {
                                        if (iframe.readyState === "complete") {
                                                  iframe.onreadystatechange = null;
                                                  var windowframesbody = windowframes.document.getElementsByTagName("BODY")[0];
                                                  var html = windowframesbody.innerHTML;
                                                  this_.Evebubbling(html);
                                        }
                              };
                    }
          },
          delframe:function() {
                    this.BodyDom.removeChild(this.iframe);
                    this.DelCreateUpfile();
          },
          Evebubbling:function(html) {
                    if (html != "") {
                              this.upfile.onclick = this.upfileclick;
                              typeof this.fun === "function" && this.fun(html);
                              this.delframe();
                    }
          },
          inArray:function(elem, array) {
                    if (array.indexOf) {
                              return array.indexOf(elem);
                    }
                    for (var i = 0, length = array.length; i < length; i++) {
                              if (array[i] === elem) {
                                        return i;
                              }
                    }
                    return -1;
          },
          DelCreateUpfile:function() {
                    var change = this.upfile.onchange;
                    this.upfile.onchange = this.upfile.onclick= null;
                    this.parentNodes.removeChild(this.upfile);
                    var inputfile = document.createElement("input");
                    inputfile.setAttribute("type", "file");
                    inputfile.setAttribute("name", "UpFile");
                    this.parentNodes.appendChild(inputfile);
                    this.upfile = inputfile;
                    this.upfile.onchange = change;
                    this.upfile.onclick = this.upfileclick;
          },
          Upsubmit:function(upfile) {
                    try {
                              var filestype = upfile.value.split(".");
                              filestype = Object.prototype.toString.call(filestype) === "[object Array]" ? filestype[filestype.length - 1] :"";
                              if (this.inArray(filestype.toLowerCase(), this.config.UpType) == -1) {
                                        this.DelCreateUpfile();
                                        this.config.erro("请选择正确图片类型");
                                        return;
                              }
                              var files = upfile.files;
                              if (files) {
                                        files = files[0];
                                        files.type && (this.config.HTML5.ImagesType = files.type);
                                        if (files.size <= 0) {
                                                  this.DelCreateUpfile();
                                                  this.config.erro("错误：不能选择空字节文件");
                                                  return;
                                        }
                                        if (this.config.HTML5.canvas) {
                                                  if (files.size > this.config.HTML5FilesSize * 1024 * 1024) {
                                                            this.DelCreateUpfile();
                                                            this.config.erro("错误：HTML5上传不能大于" + this.config.HTML5FilesSize + "M");
                                                            return;
                                                  }
                                        } else if (files.size > this.config.FilesSize * 1024 * 1024) {
                                                  this.DelCreateUpfile();
                                                  this.config.erro("错误：文件不能大于" + this.config.FilesSize + "M");
                                                  return;
                                        }
                              }
							  var  this_ =this;
                              typeof this.config.preced === "function"
							   && this.config.preced(function(){
								           if (this_.config.HTML5.canvas) {
                                        var reader = new FileReader();
                                        reader.onload = function() {
                                                  this_.DelCreateUpfile();
                                                  this_.config.HTML5.zipImg(this.result, this_.config.HTML5ZIP, files.type, function(DataUrl) {
                                                            typeof this_.fun === "function" && this_.fun({
                                                                      success:DataUrl
                                                            }, true);
															delete (reader);
                                                  });
                                        };
                                        reader.readAsDataURL(files);
                                        return;
                              }
                              this_.createframe();
                              this_.FORM.submit();
								    });
							  
                    } catch (e) {
                              this.DelCreateUpfile();
                              this.config.erro("你选择了非图片类型，或 图片路径有误");
                              return;
                    }
          },
          run:function(fun) {
                    var this_ = this;
                    this.fun = fun;
                    this.upfile.onclick = this.upfileclick = function() {
                              typeof this_.config.fileClick === "function" && this_.config.fileClick();
                    };
                    this.upfile.onchange = function() {
                              if (this.value == "") return false;
                              this.onclick = function() {
                                        return false;
                              };
                              this_.Upsubmit(this);
                    };
          }
};

/*--------------------------选择上传截图的JS部份结束-------------------------------------------------------------------------------*/
