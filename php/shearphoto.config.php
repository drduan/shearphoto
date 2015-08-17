<?php
define('IOURL',dirname(dirname(__FILE__)));   //锁定相对目录   
define('ShearURL',IOURL.DIRECTORY_SEPARATOR); //DIRECTORY_SEPARATOR 是斜杠符，为兼容WINDOW和LINUX
$ShearPhoto["config"]=array(
"proportional"=>3/4,//比例截图，JS端也要相应设置哦，不然系统会给你抱出错误,不设比例填0，如填比例 ：3/4  代表宽和高的比例是3/4
"width"=>array(
             //array(0,true),//此时的0   代表以用户取当时截取框的所截的大小为宽
             array(150,true),//@参数1要生成的宽 （高度不用设，系统会按比例做事），    @参数2：是否为该图加水印，water参数要有水印地址才有效true或false
             array(100,true),//@参数1要生成的宽 （高度不用设，系统会按比例做事），   @参数2：是否为该图加水印，water参数要有水印地址才有效true或false
			 array(70,true)),//你可以继续增加多张照片
"water"=>"../images/waterimg2.png",//只接受PNG水印，当然你对PHP熟练，你可以对主程序进行修改		   
"water_scope"=>100,       //图片少于多少不添加水印！没填水印地址，这里不起任何作用
"temp"=>ShearURL."file".DIRECTORY_SEPARATOR."temp",  //等待截图的大图文件。就是上传图片的临时目录，截图后，图片会被删除
"tempSaveTime"=>600,//临时图片（也就是temp内的图片）保存时间，需要永久保存请设为0。单位秒
"saveURL"=>ShearURL."file".DIRECTORY_SEPARATOR."shearphoto_file",//后面不要加斜杠，系统会自动给补上！不要使用中文
"filename"=>uniqid("shearphoto_")."_".mt_rand(100,999)."_"//文件名字定义！要生成多个文件时 系统会自动在后面补0 1 2  3.....;
);
/*************ShearPhoto1.3 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*********

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

    shearphoto是属于大家的，shearphoto创造崭新截图环境，希望大家喜欢shearphoto  本程序版本号：ShearPhoto1.3
    
                                                        版本号:ShearPhoto1.3
                                                        shearphoto官网：www.shearphoto.com
                                                        shearphoto官方QQ群：461550716
                                                                                                              2015年8月7日
                                                                                                                  明哥先生


****************ShearPhoto1.3 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*******/
?>