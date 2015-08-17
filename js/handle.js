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
ShearPhoto.MINGGE(function() {
       var publicRelat= document.getElementById("relat");     //"relat"对像     
	   var publicRelatImg=publicRelat.getElementsByTagName("img");  //"relat"下的两张图片对像   
	   var Shear = new ShearPhoto;
          Shear.config({
			     	/*---------------用户设置部份开始-----------------------------------------------------------------------*/  
			        url:"php/shearphoto.php",//后端处理地址
			        scopeWidth:500,                 //可拖动范围宽  也就是"main"对象的初始大小  
                    scopeHeight:500,                //可拖动范围高  也就是"main"对象的初始大小  
                    relat:publicRelat,                //请查看 id:"relat"对象 
                    proportional:[3/4,               //截框的宽高比例（宽除以高的比例值，这个设置其实就是3/4,不设比例请设为0，注意更改比例后，后端也要进行相应设置，否则系统会给你抱出错误）
					 100,                             //启动后的截框初始宽度
					 133.33333                        //比例设置后，这个高度无效，由宽和比例来决定
					  ],   
				    Min:50,                 //截框拉伸或拖拽不能少于多少PX
					Max:500,                //一开始启动时，图片的宽和高，有时候图片会很大的，必须要设置一下
					Border:1,               //截框的边框大小
                    BorderStyle:"solid",    //截框的边框类型，其实是引入CSS的border属性，和入CSS的border属性是一样的
                    BorderColor:"#04B7FB",  //截框的边框色彩
					/*---------------用户设置部份结束-----------------------------------------------------------------------*/ 
					scope:document.getElementById("main"),//范围对象 
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
                     SelectBox:document.getElementById("SelectBox"),         //选择图片方式的对象
					Shearbar:document.getElementById("Shearbar"),          //截图工具条对象
                    UpFun:function() {                   //鼠标健松开时执行函数
                              Shear.MoveDiv.DivWHFun();   //把截框现时的宽高告诉JS    
                    }
                    
          });
var photoalbum = document.getElementById("photoalbum");//相册对象
/*选择图片上传*/
var up = new ShearPhoto.frameUpImg({
          UpType:new Array("jpg", "jpeg", "png", "gif"),//图片类限制，上传的一定是图片，你就不要更改了
          FilesSize:2,
          url:"php/upload.php",
          erro:function(msg) {
                    Shear.pointhandle(3e3, 10, msg, 0, "#f82373", "#fff");
          },
          preced:function() {
                    photoalbum.style.display = "none"; //什么情况下都关了相册
                    camClose.onclick(); //什么情况下都关了视频
                    Shear.pointhandle(0, 10, "正在为你加载图片，请你稍等哦......", 2, "#307ff6", "#fff");
          }
});

up.run(function(data) {//upload.php成功返回数据后
          data = ShearPhoto.JsonString.StringToJson(data);
          if (data === false) {
                    Shear.SendUserMsg("错误:请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff",  true,true);
                    return;
          }
          if (data["erro"]) {
                    Shear.SendUserMsg("错误:" + data["erro"], 5e3, 0, "#f4102b", "#fff",  true,true);
                    return;
          }
          Shear.run(data["success"]);
});
/*选择图片上传*/
/*相册*/
var DE = document.documentElement;
var PhotoLoading = document.getElementById("PhotoLoading");
var photoalbumLi = photoalbum.getElementsByTagName("li");
var photoalbumLifun = function() {
          Shear.run(this.getElementsByTagName("img")[0].getAttribute("serveUrl"));
          photoalbum.style.display = "none";
};

for (var i = 0; i < photoalbumLi.length; i++) photoalbumLi[i].onclick = photoalbumLifun;//为相册的每张照加入一个点击事件
PhotoLoading.onclick = function() {             //从相册选取事件
          photoalbum.style.display = "block";
         
};
 document.getElementById("close").onclick = function() {     //关闭相册事件
          photoalbum.style.display = "none";
};

 /*相册*/
 /*截图，左旋，右旋，重新选择*/
  Shear.addEvent(document.getElementById("saveShear"), "click", function() { //按下截图事件，提交到后端的shearphoto.php接收
   Shear.SendPHP({shearphoto:"我要传参数到服端",mingge:"我要传第二个参数到服务器"});//我们示例截图并且传参数，后端文件shearphoto.php用 示例：$_POST["shearphoto"] 接收参数，不需要传参数请清空Shear.SendPHP里面的参数示例 Shear.SendPHP();
});

 Shear.addEvent(document.getElementById("LeftRotate"), "click", function() {//向左旋转事件
          Shear.Rotate("left");
});
 
  Shear.addEvent(document.getElementById("RightRotate"), "click", function() { //向右旋转事件
          Shear.Rotate("right");
});
 
     Shear.addEvent(document.getElementById("againIMG"), "click", function() {          //重新选择事件
          Shear.again();
          Shear.pointhandle(3e3, 10, "已取消！重新选择", 2, "#fbeb61", "#3a414c");
});
 
 /*截图，左旋，右旋，重新选择*/
/*拍照*/
 webcam.init_config={
		width  : 500,                 //摄像头像素宽度，也就是说后端生成图片的大小
		height : 500,                 //摄像头像素高度，也就是说后端生成图片的大小
		server_width : 450,            //网页中flash的显示宽度
		server_height : 450,           //网页中flash的显示高度
		uploadfield : "UpFile",       //上传的FORMDATA名称， 不理解你就不要改，否则报错又问为什么了
		postargs:{mingge:"shearphoto我爱你",shearphoto:"shearphoto好"}//示例传入POST参数到后端。后端示例$_POST['XXXX'] 接收！如果！ 不需要传参数，请把postargs删除，需填参数请保证参数格式
	 },
                     webcam.set_api_url("php/upload.php"); //拍照连接后端的URL文件    
                     webcam.set_quality(95);//拍照的图片质量
                     webcam.set_shutter_sound(true);//拍照声音
					 
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
	 
setCam.onclick =function() {webcam.configure();}//点击设置按钮事件
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
         camClose.onclick();
		 data = ShearPhoto.JsonString.StringToJson(data);
          if (data === false) {
                    Shear.SendUserMsg("错误:请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff", true,true);
                    return;
          }
          if (data["erro"]) {
                    Shear.SendUserMsg("错误:" + data["erro"], 5e3, 0, "#f4102b", "#fff", true,true);
					return;
          }
          Shear.run(data["success"]);
});
 });