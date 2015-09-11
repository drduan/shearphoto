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


/*.........................shearphoto专用类................................................注意......文件最后修改时间2015年9月5日..作者：明哥先生.............................. */

class zip_img {
    protected $arg;
    protected $waterimg = false;
    protected $GDfun = false;
    protected $result = array();
    protected $quality = false;
    final function __construct($arg) {
        $this->arg = $arg;
        $this->quality = $arg["quality"];
        if ($arg["force_jpg"]) {
            $this->GDfun = array(
                "imagejpeg",
                ".jpg"
            );
        } else {
            $this->GDfun = $arg["GdFun"];
			$this->quality =0;
        }
        if ($arg["water"]) {
            list($W, $H, $type) = @getimagesize($arg["water"]);
            if ($type == 3) {
                $this->waterimg = array(
                    imagecreatefrompng($arg["water"]) ,
                    $W,
                    $H
                );
            }
        }
    }
    protected function zip_img($dest, $width, $height, $save_url, $water) {
        $createsrc = imagecreatetruecolor($width, $height);  
        imagecopyresampled($createsrc, $dest, 0, 0, 0, 0, $width, $height, $this->arg["w"], $this->arg["h"]);
        $water and $createsrc = $this->add_water($createsrc, $width, $height);
        return $this->saveimg($createsrc, $save_url, $width, $height);
    }
    protected function add_water($src, $width, $height) {
        imagecopy($src, $this->waterimg[0], $width - $this->waterimg[1] - 10, $height - $this->waterimg[2] - 10, 0, 0, $this->waterimg[1], $this->waterimg[2]);
        return $src;
    }
    protected function saveimg($createsrc, $save_url, $width, $height) {
        $save_url.= $this->GDfun[1];
        $GDW = $this->quality ? @call_user_func($this->GDfun[0], $createsrc, $save_url, $this->quality) : @call_user_func($this->GDfun[0], $createsrc, $save_url);
        imagedestroy($createsrc);
        array_push($this->result, array(
            "ImgUrl" => str_replace(array(
                ShearURL,
                "\\"
            ) , array(
                "",
                "/"
            ) , $save_url) ,
            "ImgName" => basename($save_url) ,
            "ImgWidth" => $width,
            "ImgHeight" => $height
        ));
        return $GDW;
    }
    final function __destruct() {
        @imagedestroy($this->arg["dest"]);
        $this->waterimg[0] and @imagedestroy($this->waterimg[0]);
    }
    public function run($this_) {
        $dest = $this->arg["dest"];
        $zip_array = $this->arg["zip_array"];
        foreach ($zip_array as $k => $v) {
            list($width, $height, $save_url, $water) = $v;
            if (!$this->zip_img($dest, $width, $height, $save_url, $this->waterimg and $water)) {
			   $this_->erro = "后端获取不到文件写入权限。原因：" . $this->GDfun[0] . "()函数-无法写入文件";
			   return false;
            }
        }
        return $this->result;
    }
}
?>        
