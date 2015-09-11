//拍照FLASH的AS脚本已全部重写，这是摄象头拍照的JS接口，感谢网友“ROC”对这个拍照FLASH提供开发帮助
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

/*-----------------------------------------------------这是FLASH拍照接口文件-----------------------------*/
window.webcam = {
          version:"shearphoto2.1",
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
                              html += '<embed id="webcam_movie" src="' + this.swf_url + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="webcam_movie" align="middle" allowScriptAccess="always" wmode="opaque" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" />';
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
                    timingId.innerHTML = time;
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