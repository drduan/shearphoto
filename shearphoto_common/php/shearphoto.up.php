<?php
/*************ShearPhoto2.1免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*********
 
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

****************ShearPhoto2.1 免费，开源，兼容目前所有浏览器，纯原生JS和PHP编写,完美兼容linux和WINDOW服务器*******/

/*.......................注意.............HTML5上传截图，非HTML浏览器上传，拍照上传都会用到该文件哦，加入逻辑代码后。所有功能都要确保正确！............................注意......文件最后修改时间2015年9月日..作者：明哥先生......................*/

 $ini_set = array(
    'max_size' => 2 * 1024 * 1024,  //文件大小限制设置  M单位
    'out_time' => 30,                //上传超时设置
    'list' =>  $ShearPhoto["config"]["temp"].DIRECTORY_SEPARATOR, //上传路径
    'whitelist' => array(
                   ".jpeg",
                   ".gif",
                   ".png",
                   ".jpg")//上传的文件后缀
 );
/*设置部份结束*/
ini_set('max_execution_time', $ini_set['out_time']);
function HandleError($erro = '系统错误') {
	 die('{"erro":"'.$erro.'"}');
}
if (!isset($_FILES['UpFile'])) {
    HandleError();
}
if (isset($_FILES['UpFile']['error']) && $_FILES['UpFile']['error'] != 0) {
    $uploadErrors = array(
        0 => '文件上传成功',
        1 => '上传的文件超过了 php.ini 文件中的 upload_max_filesize directive 里的设置',
        2 => '上传的文件超过了 HTML form 文件中的 MAX_FILE_SIZE directive 里的设置',
        3 => '上传的文件仅为部分文件',
        4 => '没有文件上传',
        6 => '缺少临时文件夹'
    );
    HandleError($uploadErrors[$_FILES['UpFile']['error']]);
}
if (!isset($_FILES['UpFile']['tmp_name']) || !@is_uploaded_file($_FILES['UpFile']['tmp_name'])) {
    HandleError('无法找到上传的文件，上传失败');
 }
if (!isset($_FILES['UpFile']['name'])) {
    HandleError('上传空名字文件名');
}
$POST_MAX_SIZE = ini_get('post_max_size');
$unit = strtoupper(substr($POST_MAX_SIZE, -1));
$multiplier = $unit == 'M' ? 1048576 : ($unit == 'K' ? 1024 : ($unit == 'G' ? 1073741824 : 1));
if ((int)$_SERVER['CONTENT_LENGTH'] > $multiplier * (int)$POST_MAX_SIZE && $POST_MAX_SIZE) {
    HandleError('超过POST_MAX_SIZE的设置值，请查看PHP.ini的设置');
}
$file_size = @filesize($_FILES['UpFile']['tmp_name']);
if (!$file_size || $file_size > $ini_set['max_size']) {
  HandleError('零字节文件 或 上传的文件已经超过所设置最大值');
}
$UpFile = array();
$int_type = getimagesize($_FILES['UpFile']['tmp_name']); 
$str_type = image_type_to_extension($int_type[2]);
if (!in_array(strtolower($str_type) , $ini_set['whitelist'])) {
    HandleError('不允许上传此类型文件');
}
$str_type==".jpeg" && ($str_type=".jpg");
$UpFile['filename']=uniqid("temp_")."_".mt_rand(100,999).$str_type;

$UpFile['file_url'] = $ini_set['list'] . $UpFile['filename'];

file_exists($ini_set['list']) or @mkdir($ini_set['list'], 511,true);
?>