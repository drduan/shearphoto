/*************ShearPhoto2.2 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*********
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

                                                                                                         2015  年  9月  25 日  
                                                                                                         shearphoto作者：明哥先生
                                                                                                         版本号:shearphoto2.2
                                                                                                         shearphoto官网：www.shearphoto.com
                                                                                                         shearphoto官方QQ群：461550716  

****************ShearPhoto2.2 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写*******/

     /*----------------------------注释结束--程序开始-----------------------------------------------------------*/
window.ShearPhoto.MINGGE(function() {
		          //██████████重要设置████████████████
		
	               var relativeUrl= "shearphoto_common"; //你不要在后面加斜杠，系统会自动给你加上斜杠，不信看下面！   index.html的JS引用路径自己改，很简单的说
	
	/*
			        relativeUrl有必要详细讲一下，这是1.4新加入的API
			        相对路径设置(后面不要有斜杠)！
		            当index.html位置变动时，要填入写正确此值，否则会抱出图片无法读取，后端无法连接等情况的情况。专门为TP和YII等框架而加入的
		            ----------------------------------------------------------------------------------------------------------------------
		            relativeUrl 相对路径是相对什么而言呢？
		            index.html 所在的目录位置   与 shearphoto/file 之间的相对目录
		            这样讲好像你们不太明白?
		            -----------------------------------------------------------------------------
		            示例1：假如：index.htm        位于  http://xxx.com/abc/index.html
		            shearphoto/file  则位于  http://xxx.com/abc/shearphoto/file
					那么relativeUrl就要写成    relativeUrl:"shearphoto/shearphoto_common"
					-----------------------------------------------------------------------------
					 示例2：假如：index.htm        位于  http://xxx.com/abc/shearphot/def/index.html
		            shearphoto/file  则位于  http://xxx.com/abc/shearphoto/file
					那么relativeUrl就要写成    relativeUrl:"../shearphoto_common"
					-----------------------------------------------------------------------------
					  ，	表达能力有限，如果不懂，请到官网论坛 QQ群向作者资询	
	 */
	
	           	//█████████重要设置█████████████████
	      relativeUrl = relativeUrl.replace(/(^\s*)|(\s*$)/g, "");//去掉相对路径的所有空格
          relativeUrl === "" || (relativeUrl += "/");//在相对地址后面加斜框，不需要用户自己加
		  var publicRelat= document.getElementById("relat");     //"relat"对像     
	      var publicRelatImg=publicRelat.getElementsByTagName("img");  //"relat"下的两张图片对像   
	      var Shear = new ShearPhoto;
          Shear.config({
			     	/*---------------用户设置部份开始-----------------------------------------------------------------------*/ 
			            relativeUrl:relativeUrl,  //取回相对路径，不懂原理的话，你不要改动哦，否则你又鸡巴痛了
					 
					    traverse:true,//可选 true,false 。 是否在拖动或拉伸时允许历遍全图（是否让大图动呢）,
					
		/*HTML5重点功能*/	translate3d:false,  //是否开启3D移动，CPU加速。可选true  false。默认关闭的，作者认为PC端没必要！在PC端开启后，有部份浏览器页面走位的问题。主要是各大浏览器不统一所致，手机端效果会明显！PC端没什么感觉。 原来是采用left top进行定位的，那么3D移动就是CSS3的translate3d属性。去百度一下translate3D吧
					
		/*HTML5重点功能*/HTML5:true,//可选 true,false  是否使用HTML5进行切图 ，支持HTML5浏览器会使用HTML5进行切图，没有HTML5浏览器则采用原始的方式(先上传大图再截取)，SHEARPHOTO这个方案无可挑剔了吧！
					
		/*HTML5重点功能*/HTML5MAX:500, //默认请设0 (最大尺寸做事)， HTML上传截图最大宽度， 宽度越大，HTML5截出来的图片容量越大，服务器压力就大，截图就更清淅！ 设得越小 HTML5截出来的图片容量越小.但是造成一定程序的不清淅，请适量设置 当然开启HTML5切图，该设置才有效
					
	    /*HTML5重点功能*/ HTML5Quality:0.9,	//截好的截图  0至1范围可选（可填小数）   HTML5切图的质量   为1时 最高	，当然开启HTML5切图，该设置才有效,设得越高，越清淅，但文件体积越大，同上！		
				
		 /*HTML5重点功能*/ HTML5FilesSize:50,      //如果是HTML5切图时，选择的图片不能超过多少，单位M，,你设大点都不怕，        ------因为HTML5ZIP会对原图进行压缩处理
				
		/*HTML5重点功能*/	 HTML5Effects:true,//是否开启图片特效功能给用户  可选true false,  提示：有HTML5浏览器才会开启的！当然开启HTML5切图，该设置才有效
					
		/*HTML5重点功能*/	 HTML5ZIP:[900,0.9],//HTML5截图前载入的大图 是否压缩图片(数组成员 是数字) ，如果不压缩的话填false，在处理特效时或者拉伸时会明显出卡顿,不流畅！官方强烈建意你进行设置 ，默认填写的是[900,0.9] ,代表宽和高都不能大于900，质量是0.9（最大是1） 
				
				/*记住 preview (预览图片功能) 尽量设false*/
				
					      preview:[150],// 开启动态预览图片 (数组成员整数型，禁止含小数点 可选false 和数组)     数组内是宽度设置，没有高度设！因为高度会按比例做事 ，此设置代表预览150 大小的预览图（你可以增加多个预览图,如[100,70,50]），设置越多预览图,shearphoto性能越差！官方不建意你开启这个功能，尽可能请设为preview:false
			      
			   /*记住 preview 尽量设false*/ 
			      
					          url:relativeUrl+"php/shearphoto.php",   //后端处理地址，保证正确哦，这是常识，连这个地址都能写错，你就是菜B，已经在本版本中帮你加入相对路径，你基本不用改这里了
			        
					    scopeWidth:500,                 //可拖动范围宽  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致  
                    
					   scopeHeight:500,                //可拖动范围高  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致      
                    
				      proportional:[1,               <!--截框的宽高比例（宽除以高的比例值，这个设置其实就是1，对！你可以直接写1  如填3/4 那么就是0.75的比例,不设比例请设为0，注意更改比例后，后端也要进行相应设置，否则系统会给你抱出错误-->
					 
					 100,                      //必须整数！启动后的截框初始宽度(整数型，禁止含小数点)  
					
					 133                       //比例设置后，这个高度无效，由宽和比例来决定(整数型，禁止含小数点)  
					  ],   
				   
				               Min:50,                 //截框拉伸或拖拽不能少于多少PX(整数型，禁止含小数点)  
					
					           Max:500,                //一开始启动时，图片的宽和高，有时候图片会很大的，必须要设置一下(整数型，禁止含小数点)，尽可能和scopeWidth值 一致  
					
				   backgroundColor:"#000",   //遮层色
					
			     backgroundOpacity:0.6, //遮层透明度-数字0-1 可选
					
					        Border:0,               //截框的边框大小 0代表动态边框。大于0表示静态边框，大于0时也代表静态边框的粗细值
                    
				       BorderStyle:"solid",    //只作用于静态边框，截框的边框类型，其实是引入CSS的border属性，和CSS2的border属性是一样的
                    
				       BorderColor:"#09F",  //只作用于静态边框，截框的边框色彩
					/*---------------用户设置截图功能部份..还没结束----------------------页面下面还有一些细节设置，去看一下-------------------------------------------------*/ 
					relat:publicRelat,              //请查看 id:"relat"对象 
					scope:document.getElementById("main"),//main范围对象 
					ImgDom:publicRelatImg[0],         //截图图片对象（小）  
                    ImgMain:publicRelatImg[1],         //截图图片对象（大）
					black:document.getElementById("black"),//黑色遮层对象
					form:document.getElementById("smallbox"),//截框对象
                    ZoomDist:document.getElementById("ZoomDist"),//放大工具条,可从HTML查看此对象，不作详细解释了
                    ZoomBar:document.getElementById("ZoomBar"), //放大工具条，可从HTML查看此对象
                      to:{
                              BottomRight:document.getElementById("BottomRight"),//拉伸点中右
                              TopRight:document.getElementById("TopRight"),//拉伸点上右，下面如此类推，一共8点进行拉伸,下面不再作解释
                              Bottomleft:document.getElementById("Bottomleft"),
                              Topleft:document.getElementById("Topleft"),
                              Topmiddle:document.getElementById("Topmiddle"),
                              leftmiddle:document.getElementById("leftmiddle"),
                              Rightmiddle:document.getElementById("Rightmiddle"),
                              Bottommiddle:document.getElementById("Bottommiddle")
                     },
					 Effects:document.getElementById("shearphoto_Effects") || false,
					 DynamicBorder:[document.getElementById("borderTop"),document.getElementById("borderLeft"),document.getElementById("borderRight"),document.getElementById("borderBottom")],
                     SelectBox:document.getElementById("SelectBox"),         //选择图片方式的对象
					 Shearbar:document.getElementById("Shearbar"),          //截图工具条对象
                     UpFun:function() {                   //鼠标健松开时执行函数
                              Shear.MoveDiv.DivWHFun();   //把截框现时的宽高告诉JS    
                     }
                    
          });
		/*--------------------------------------------------------------截图成功后，返回来的callback-------------------------*/  
		Shear.complete=function(serverdata) {//截图成功完成时，由shearphoto.php返回数据过来的成功包
                    // alert(serverdata);//你可以调试一下这个返回包
                    var point = this.arg.scope.childNodes[0];
                    point.className === "point" && this.arg.scope.removeChild(point);
                    var complete = document.createElement("div");
                    complete.className = "complete";
                    complete.style.height = this.arg.scopeHeight + "px";
                    this.arg.scope.insertBefore(complete, this.arg.scope.childNodes[0]);
                    var length = serverdata.length,creatImg;
					for (var i = 0; i < length; i++)  
					{
					creatImg = document.createElement("img");	
				    complete.appendChild(creatImg);
					creatImg.src=this.arg.relativeUrl + serverdata[i]["ImgUrl"];
				    }
					this.HTML5.EffectsReturn();
		            this.HTML5.BOLBID	&&   this.HTML5.URL.revokeObjectURL(this.HTML5.BOLBID);
					creatImg = document.createElement("DIV");	
					creatImg.className=	"completeTxt";
					creatImg.innerHTML='<strong><i></i>恭喜你！截图成功</strong> <p>以上是你图片的' + length + '种尺寸</p><a href="javascript:;" id="completeA">完成</a>';
					complete.appendChild(creatImg);
					var completeA = document.getElementById("completeA");
                    var this_ = this;
                    this_.preview.close_();
                    completeA.onclick || (completeA.onclick = function() {
                              completeA.onclick = null;
                              this_.arg.scope.removeChild(complete);
                              this_.again();
                              this_.pointhandle(3e3, 10, "截图完成！已返回！", 2, "#fbeb61", "#3a414c");
                    });
          }  
		/*--------------------------------------------------------------截图成功后，返回来的callback-------------------------*/  	  
var photoalbum = document.getElementById("photoalbum");//相册对象


/*.................................................选择图片上传的设置...............................................................*/

var ShearPhotoForm = document.getElementById("ShearPhotoForm");//FORM对象
ShearPhotoForm.UpFile.onclick=function(){return false}//一开始时先不让用户点免得事件阻塞
var up = new ShearPhoto.frameUpImg({
	
	         url:relativeUrl+"php/upload.php",            //HTML5切图时，不会用到该文件，后端处理地址，保证正确哦，这是常识，连这个地址都能写错，你就是菜B，已经在本版本中帮你加入相对路径，你基本不用改这里了
		   
		    FORM:ShearPhotoForm,                         //FORM对象传到设置
		   
		  UpType:new Array("jpg", "jpeg", "png", "gif"),//图片类限制，上传的一定是图片，你就不要更改了
          
	   FilesSize:2,                             //选择的图片不能超过 单位M（注意：是非HTML5时哦）
		  
		   HTML5:Shear.HTML5,                       //切匆改动这句，不然你他妈又问为什么出错
			
  HTML5FilesSize:Shear.arg.HTML5FilesSize,//切匆改动这句 如果是HTML5切图时，选择的图片不能超过 单位M，设太大话，如果客户端HTML5加截超大图片时，会卡爆的
         
	    HTML5ZIP:Shear.arg.HTML5ZIP,      //切匆改动这句, 把压缩设置转移到这里
		  
	        erro:function(msg) {
                    Shear.pointhandle(3e3, 10, msg, 0, "#f82373", "#fff");
		  },
         fileClick:function(){//先择图片被点击时，触发的事件
		   Shear.pointhandle(-1);//关闭提示，防止线程阻塞事件冒泡
			 },
		  preced:function(fun) { //点击选择图，载入图片时的事件
                  try{
				  photoalbum.style.display = "none"; //什么情况下都关了相册
                  camClose.onclick(); //什么情况下都关了视频
				  }catch (e){console.log("在加载图片时，发现相册或拍照的对象检测不到，错误代码："+e);}
				 Shear.pointhandle(0, 10, "正在为你加载图片，请你稍等哦......", 2, "#307ff6", "#fff",fun);
          }
});

up.run(function(data,True) {//upload.php成功返回数据后
         //alert(data);你可以调试一下这个返回包
          True ||  (data = ShearPhoto.JsonString.StringToJson(data));
          if (data === false) {
                    Shear.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff",  true,true);
                    return;
          }
          if (data["erro"]) {
                    Shear.SendUserMsg("错误：" + data["erro"], 5e3, 0, "#f4102b", "#fff",  true,true);
                    return;
          }
          Shear.run(data["success"],true);
});
/*.................................................选择图片上传的设置结束...............................................................*/


/*.................................................相册部份....看好作者是怎么调用方法的...........................................................*/
try{
var AllType= {".jpg":"image/jpeg",  ".jpeg":"image/jpeg",  ".gif":"image/jpeg", ".png":"image/png"};
var	URLType =function(url){
             return AllType[/\.[^.]+$/.exec(url)] || "image/jpeg";
             }
var DE = document.documentElement;
var PhotoLoading = document.getElementById("PhotoLoading");
var photoalbumLi = photoalbum.getElementsByTagName("li");
var photoalbumLifun = function() {
	      var serveUrl= this.getElementsByTagName("img")[0].getAttribute("serveUrl");
	      Shear.HTML5.ImagesType=URLType(serveUrl);//告诉HTML5，图片的类型
          Shear.run(serveUrl);       
          photoalbum.style.display = "none";
};

for (var i = 0; i < photoalbumLi.length; i++) photoalbumLi[i].onclick = photoalbumLifun;//为相册的每张照加入一个点击事件
PhotoLoading.onclick = function() {             //从相册选取事件
          photoalbum.style.display = "block";
         
};
 document.getElementById("close").onclick = function() {     //关闭相册事件
          photoalbum.style.display = "none";
};
}catch (e){console.log("相册对象检测有误，默认你抱弃这个功能，错误代码："+e );}
/*.................................................相册部份结束.......看好作者是怎么调用方法的.........................................................*/



 /*............................截图，左旋，右旋，重新选择..................开始.........看好怎么调用截图，左旋，右旋，重新选择..........................................*/
  Shear.addEvent(document.getElementById("saveShear"), "click", function() { //按下截图事件，提交到后端的shearphoto.php接收
   Shear.SendPHP({shearphoto:"我要传参数到服端",mingge:"我要传第二个参数到服务器"});//我们示例截图并且传参数，后端文件shearphoto.php用 示例：$_POST["shearphoto"] 接收参数，不需要传参数请清空Shear.SendPHP里面的参数示例 Shear.SendPHP();
   
});

 Shear.addEvent(document.getElementById("LeftRotate"), "click", function() {//向左旋转事件
          Shear.Rotate("left");
});
 
  Shear.addEvent(document.getElementById("RightRotate"), "click", function() { //向右旋转事件
          Shear.Rotate("right");
});
 
 Shear.addEvent(document.getElementById("againIMG"), "click", function() {     //重新选择事件
           Shear.preview.close_();
		   Shear.again();
		   Shear.HTML5.EffectsReturn();
		   Shear.HTML5.BOLBID	&&   Shear.HTML5.URL.revokeObjectURL(Shear.HTML5.BOLBID);
           Shear.pointhandle(3e3, 10, "已取消！重新选择", 2, "#fbeb61", "#3a414c");
});
 
 /*............................截图，左旋，右旋，重新选择.................................................结束....................*/
 
 
/*----------------------------------拍照-----------拍照功能在这设置---------------------------------------------------------------------------------*/
try{
 webcam.init_config={
		
		width  : 500,                 //摄像头像素宽度，也就是说后端生成图片的大小
		
		height : 500,                 //摄像头像素高度，也就是说后端生成图片的大小
		
		server_width : 450,            //网页中flash的显示宽度
		
		server_height : 450,           //网页中flash的显示高度
		
		uploadfield : "UpFile",       //上传的FORMDATA名称， 不理解你就不要改，否则报错又问为什么了
		
		postargs:{mingge:"shearphoto我爱你",shearphoto:"shearphoto好"}//示例传入POST参数到后端。后端示例$_POST['XXXX'] 接收！如果！ 不需要传参数，请把postargs删除，需填参数请保证参数格式
	 },

webcam.set_api_url(relativeUrl+"php/upload.php"); //拍照连接后端的URL文件，后端处理地址，保证正确哦，这是常识，连这个地址都能写错，你就是菜B，已经在本版本中帮你加入相对路径，你基本不用改这里了    
webcam.set_swf_url(relativeUrl+"images/webcam.swf");//拍照是FLASH的，那么你懂的，已经在本版本中帮你加入相对路径，你基本不用改这里了
webcam.set_shutter_sound(true,relativeUrl+"images/shutter.mp3")//拍照声音，参数1 是否开启， 参数2：声音路径,设置错误，后果是拍照失败，已经在本版本中帮你加入相对路径，你基本不用改这里了
webcam.set_quality(95);//拍照的图片质量
					 
var CamFlash = document.getElementById("CamFlash");
var timing = document.getElementById("timing");
var CamOk = document.getElementById("CamOk");
var CamBox = document.getElementById("CamBox");
var camerasImage = document.getElementById("camerasImage");
var camClose = document.getElementById("camClose");
var setCam = document.getElementById("setCam");

 webcam.noCamcall=function(msg){
	 Shear.SendUserMsg(msg, 5e3, 0, "#f4102b", "#fff", true,true);
	 camClose.onclick(); 
	 }
	 
setCam.onclick =function() {webcam.configure();}//点击拍照设置按钮事件
camClose.onclick = function() { //拍照点关闭后
          webcam.Homing(timing);
          CamFlash.innerHTML = "";
          CamBox.style.display = "none";
		  camerasImage.onclick=camerasImageOnclick;
};
var camerasImageOnclick = function() {            //按下弹出拍照框事件
       CamBox.style.display = "block";
	     CamFlash.innerHTML = webcam.get_html();
         webcam.newsnap(timing, CamFlash, CamOk);
		 camerasImage.onclick=null;
};
camerasImage.onclick=camerasImageOnclick;


webcam.set_hook("onComplete", function(data) {//拍照服务器返回数据事件
         //alert(data);你可以调试一下这个返回包
         camClose.onclick();
		 data = ShearPhoto.JsonString.StringToJson(data);
          if (data === false) {
                    Shear.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff", true,true);
                    return;
          }
          if (data["erro"]) {
                    Shear.SendUserMsg("错误：" + data["erro"], 5e3, 0, "#f4102b", "#fff", true,true);
					return;
          }
		  Shear.HTML5.ImagesType="image/jpeg";//告诉HTML5，图片的类型
          Shear.run(data["success"]);
});
}catch (e){console.log("拍照对象检测不到，默认你抱弃这个功能，错误代码："+e);}
 /*----------------------------------拍照-----------拍照功能在这设置-----------结束----------------------------------------------------------------------*/
 
 /*...........2.2加入的缓冲效果............................*/
var shearphoto_loading=document.getElementById("shearphoto_loading");
var shearphoto_main=document.getElementById("shearphoto_main");
shearphoto_loading && shearphoto_loading.parentNode.removeChild(shearphoto_loading);
shearphoto_main.style.visibility="visible";
  /*................2.2加入的缓冲效果结束..................*/
 });
