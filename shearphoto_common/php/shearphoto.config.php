<?php
/*.......................注意.............所有的shearphoto设置都几乎在这里.请细心品味...........................注意...文件最后修改时间2015年9月日..作者：明哥先生.........................*/
define('IOURL',dirname(dirname(__FILE__)));   //锁定相对目录   

define('ShearURL',IOURL.DIRECTORY_SEPARATOR); //DIRECTORY_SEPARATOR 是斜杠符，为兼容WINDOW和LINUX

$ShearPhoto["config"]=array(

"proportional"=>1,//比例截图，JS端也要相应设置哦，不然系统会给你抱出错误,不设比例填0，如填比例 ：3/4  代表宽和高的比例是3/4(3除以4的意思懂吗，菜菜，你可直接填0.75，没错)

"quality"=>85,// 截图质量，0为一般质量（质量大概75左右），  0-100可选 ！ 整数型，质量越高，越清淅，缺点是文件体积越大，不是太严格追求图片高清，设0就可以,提示：PNG图片不带此效果

"force_jpg"=>true,// 是否强制截好的图片是JPG格式  可选 true false

"width"=>array(//自定义设置生成截图的张数，大小，在这设，看好下面！

             //array(0,true,"name0"),//此时的0   代表以用户取当时截取框的所截的大小为宽
			 
			 //array(-1,true,"name1"),//此时的-1   代表以原图为基准，获得截图
            
			 array(150,true,"big"),//@参数1要生成的宽 （高度不用设，系统会按比例做事），    @参数2：是否为该图加水印，water参数要有水印地址才有效true或false  @参数3：图片后面添加字符串 （用以区分其他截图名称),填写字符串，不要含中文，不然能又鸡巴痛了 ，不定义的话默认为“0”
             
			 array(100,true,"centre"),//@参数1要生成的宽 （高度不用设，系统会按比例做事），   @参数2：是否为该图加水印，water参数要有水印地址才有效true或false  @参数3：图片后面添加字符串 （用以区分其他截图名称),填写字符串，不要含中文，不然能又鸡巴痛了，不定义的话默认为"0" 
             
			 array(70,true,"small")//你可以继续增加多张照片,也可以删除不要的，默认是删除3张哦
			 ),

"water"=>"../images/waterimg2.png",//只接受PNG水印，当然你对PHP熟练，你可以对主程序进行修改支持其他类型水印,不设就"water"=>false	   

"water_scope"=>100,       //图片少于多少不添加水印！没填水印地址，这里不起任何作用

"temp"=>ShearURL."file".DIRECTORY_SEPARATOR."temp",  //等待截图的大图文件。就是上传图片的临时目录，截图后，图片会被删除,非HTML5切图就会用到它

"tempSaveTime"=>600,//临时图片（也就是temp内的图片）保存时间，需要永久保存请设为0。单位秒

"saveURL"=>ShearURL."file".DIRECTORY_SEPARATOR."shearphoto_file".DIRECTORY_SEPARATOR,//截好后的图片。储存的目录位置，后面不要加斜杠，系统会自动给补上！不要使用中文

"filename"=>uniqid("shearphoto_")."_".mt_rand(100,999)."_"//截好后的图片的文件名字定义！要生成多个文件时 系统会自动在后面补上  "width"=>array()参数定义的名称,请查看上面的"width"=>array()
);
/*************ShearPhoto2.2免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*********
 
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

****************ShearPhoto2.2 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*******/
?>