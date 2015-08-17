//拍照FLASH的AS脚本已全部重写，这是摄象头拍照的JS接口，感谢网友“ROC”对这个拍照FLASH提供开发帮助
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
window.webcam = {
          version:"shearphoto1.3",
          // globals
          ie:!!navigator.userAgent.match(/MSIE/),
          protocol:location.protocol.match(/https/i) ? "https" :"http",
          callback:null,
          // user callback for completed uploads
          swf_url:"images/webcam.swf",
          // URI to webcam.swf movie (defaults to cwd)
          shutter_url:"images/shutter.mp3",
          // URI to shutter.mp3 sound
          api_url:"",
          // URL to upload script
          loaded:false,
          // true when webcam movie finishes loading
          quality:90,
          // JPEG quality (1 - 100)
          shutter_sound:true,
          // shutter sound effect on/off
          stealth:true,
          // stealth mode (do not freeze image upon capture)
          hooks:{
                    onLoad:null,
                    onAllow:null,
                    onComplete:null,
                    onError:null
          },
          // callback hook functions
          set_hook:function(name, callback) {
                    // set callback hook
                    // supported hooks: onLoad, onComplete, onError
                    if (typeof this.hooks[name] == "undefined") return alert("Hook type not supported: " + name);
                    this.hooks[name] = callback;
          },
          fire_hook:function(name, value) {
                    // fire hook callback, passing optional value to it
                    if (this.hooks[name]) {
                              if (typeof this.hooks[name] == "function") {
                                        // callback is function reference, call directly
                                        this.hooks[name](value);
                              } else if (typeof this.hooks[name] == "array") {
                                        // callback is PHP-style object instance method
                                        this.hooks[name][0][this.hooks[name][1]](value);
                              } else if (window[this.hooks[name]]) {
                                        // callback is global function name
                                        window[this.hooks[name]](value);
                              }
                              return true;
                    }
                    return false;
          },
          set_api_url:function(url) {
                    // set location of upload API script
                    this.api_url = url;
          },
          set_swf_url:function(url) {
                    // set location of SWF movie (defaults to webcam.swf in cwd)
                    this.swf_url = url;
          },
          configure:function() {
                    this.get_movie()._configure("camera");
          },
          get_html:function() {
                    var html = "";
                    var width = this.init_config.server_width, height = this.init_config.server_height;
                    var flashvars = "shutter_enabled=" + (this.shutter_sound ? 1 :0) + "&shutter_url=" + escape(this.shutter_url) + "&width=" + this.init_config.width + "&height=" + this.init_config.height + "&server_width=" + width + "&server_height=" + height + "&uploadfield=" + this.init_config.uploadfield;
                    if (this.ie) {
                              html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + this.protocol + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="webcam_movie" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + this.swf_url + "?bugid=" + Math.random() + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="opaque"/></object>';
                    } else {
                              html += '<embed id="webcam_movie" src="' + this.swf_url + '?bugid=1.3" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="webcam_movie" align="middle" allowScriptAccess="always" wmode="opaque" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" />';
                    }
                    this.loaded = false;
                    return html;
          },
          get_movie:function() {
                    // get reference to movie object/embed in DOM
                    if (!this.loaded) return this.noCamcall();
                    var movie = document.getElementById("webcam_movie");
                    if (!movie) alert("ERROR: Cannot locate movie 'webcam_movie' in DOM");
                    return movie;
          },
          set_stealth:function(stealth) {
                    // set or disable stealth mode
                    this.stealth = stealth;
          },
          Homing:function(timingId) {
                    clearInterval(this.timer);
                    this.timer = null;
                    timingId.style.display = "none";
          },
          timingfun:function(timingId, CamFlash, CamOk, fun) {
                    if (!this.CamTrue) {
                              alert("请问：你敢允许摄像头启动吗");
                              return false;
                    }
                    CamOk.innerHTML = "取消";
                    var time = 3;
                    var this_ = this;
                    var argumentss = arguments;
                    CamOk.onclick = function() {
                              this_.Homing(timingId);
                              CamOk.innerHTML = "拍照";
                              CamOk.onclick = function() {
                                        this_.timingfun.apply(this_, argumentss);
                              };
                    };
                    timingId.style.display = "block";
                    timingId.innerHTML = 3;
                    this.timer = setInterval(function() {
                              time--;
                              if (time === 0) {
                                        this_.Homing(timingId);
                                        fun.call(this_);
                                        CamOk.innerHTML = "处理中...";
									    CamOk.onclick = null;
                                        return;
                              }
                              timingId.innerHTML = time;
                    }, 800);
          },
          newsnap:function(timingId, CamFlash, CamOk) {
                    this.CamTrue = false;
                    var this_ = this;
                    CamOk.innerHTML = "拍照";
                    CamOk.onclick = function() {
                              this_.timingfun(timingId, CamFlash, CamOk, this_.snap);
                    };
          },
          snap:function(url, callback, stealth) {
                    // take snapshot and send to server
                    // specify fully-qualified URL to server API script
                    // and callback function (string or function object)
                    if (callback) this.set_hook("onComplete", callback);
                    if (url) this.set_api_url(url);
                    if (typeof stealth != "undefined") this.set_stealth(stealth);
                    var flashObj = this.get_movie();
                    this.init_config.postargs && flashObj.SetPostParams(this.init_config.postargs);
                    flashObj._snap(this.api_url, this.quality, this.shutter_sound ? 1 :0, this.stealth ? 1 :0);
          },
          freeze:function() {
                    this.get_movie()._snap("", this.quality, this.shutter_sound ? 1 :0, 0);
          },
          upload:function(url, callback) {
                    // upload image to server after taking snapshot
                    // specify fully-qualified URL to server API script
                    // and callback function (string or function object)
                    if (callback) this.set_hook("onComplete", callback);
                    if (url) this.set_api_url(url);
                    this.get_movie()._upload(this.api_url);
          },
          reset:function() {
                    // reset movie after taking snapshot
                    this.get_movie()._reset();
          },
          configure:function(panel) {
                    // open flash configuration panel -- specify tab name:
                    // "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
                    if (!panel) panel = "camera";
                    this.get_movie()._configure(panel);
          },
          set_quality:function(new_quality) {
                    // set the JPEG quality (1 - 100)
                    // default is 90
                    this.quality = new_quality;
          },
          set_shutter_sound:function(enabled, url) {
                    // enable or disable the shutter sound effect
                    // defaults to enabled
                    this.shutter_sound = enabled;
                    this.shutter_url = url ? url :"images/shutter.mp3";
          },
          flash_notify:function(type, msg) {
                    switch (type) {
                         case "security":
                              if (msg === "Camera.Muted") {
                                        this.noCamcall("你已拒绝了摄像头启动！");
                                        return;
                              }
                              this.CamTrue = msg === "Camera.Unmuted";
                              this.fire_hook("onAllow", this.CamTrue);
                              break;

                         case "flashLoadComplete":
                              // movie loaded successfully
                              this.loaded = true;
                              this.fire_hook("onLoad");
                              break;

                         case "error":
                              // HTTP POST error most likely
                              if (!this.fire_hook("onError", msg)) {
                                        this.noCamcall("没检测到摄像头启动，拍照失败,检查是否其他程序占用了摄象头");
                              }
                              break;

                         case "success":
                              // upload complete, execute user callback function
                              // and pass raw API script results to function
                              this.fire_hook("onComplete", msg.toString());
                              break;

                         default:
                              // catch-all, just in case
                              alert("flash_notify: " + type + ": " + msg);
                              break;
                    }
          }
};