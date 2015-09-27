<?php 
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

/*.......................注意.............所有图片的截取，缩放都要用到该文件............................注意.......文件最后修改时间2015年9月日..作者：明哥先生.................*/
header('Content-type:text/html;charset=utf-8');   //编码
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING); //关闭错误提示
require ("shearphoto.config.php");              //加载设置文件
/*..................................类开始了...........................*/
class ShearPhoto {
    public $erro = false;
    protected function rotate($src, $R) {
        $arr = array(90, 180, 270);
        if (in_array($R, $arr)) {  
            $rotatesrc = imagerotate($src, $R, 0);
            imagedestroy($src);
        } else {
            return $src;
        }
        return $rotatesrc;
    }
	public function html5_run(&$PHPconfig,&$JSconfig){
	      $ShearPhoto["config"]=$PHPconfig; 
		  if ($PHPconfig["proportional"] != $JSconfig["P"]) {
            $this->erro = "JS设置的比例和PHP设置不一致!";
            return false;
        }
        require("shearphoto.up.php");
		$tempurl = $PHPconfig["temp"] . DIRECTORY_SEPARATOR . "shearphoto.lock";
        !file_exists($tempurl) && file_put_contents($tempurl, "ShearPhoto Please don't delete");
        $this->delTempImg($PHPconfig["temp"], $PHPconfig["tempSaveTime"]);
	    $imagecreatefrom=$this->imagecreatefrom($_FILES['UpFile']['tmp_name'],$int_type[2]);
		        if(!$imagecreatefrom)return false;
		        list($src,$GdFun)= $imagecreatefrom;
                 return      $this->compression($src, $PHPconfig, $JSconfig, $int_type[2], $GdFun);
        }
	protected function delTempImg($temp, $deltime) {
        if ($deltime == 0) return;
        $dir = opendir($temp);
        $time = time();
        while (($file = readdir($dir)) !== false) {
            if ($file != "." and $file != ".." and $file != "shearphoto.lock") {
                $fileUrl = $temp . DIRECTORY_SEPARATOR . $file;
                $pastTime = $time - filemtime($fileUrl);
                if ($pastTime < 0 || $pastTime > $deltime) @unlink($fileUrl);
            }
        }
        closedir($dir);
    }
    public function run(&$JSconfig, &$PHPconfig) {
        $tempurl = $PHPconfig["temp"] . DIRECTORY_SEPARATOR . "shearphoto.lock";
        !file_exists($tempurl) && file_put_contents($tempurl, "ShearPhoto Please don't delete");
        $this->delTempImg($PHPconfig["temp"], $PHPconfig["tempSaveTime"]);
        if (!isset($JSconfig["url"]) || !isset($JSconfig["R"]) || !isset($JSconfig["X"]) || !isset($JSconfig["Y"]) || !isset($JSconfig["IW"]) || !isset($JSconfig["IH"]) || !isset($JSconfig["P"]) || !isset($JSconfig["FW"]) || !isset($JSconfig["FH"])) {
            $this->erro = "服务端接收到的数据缺少参数";
            return false;
        }
        if (!file_exists($JSconfig["url"])) {
            $this->erro = "此图片路径有误";
            return false;
        }
        foreach ($JSconfig as $k => $v) {
            if ($k !== "url") { //验证是否为数字除了url参数之外
                if (!is_numeric($v)) {
                    $this->erro = "传递的参数有误";
                    return false;
                }
            }
        }
        if ($PHPconfig["proportional"] !== $JSconfig["P"]) {
            $this->erro = "JS设置的比例和PHP设置不一致";
            return false;
        }
        list($w, $h, $type) = getimagesize($JSconfig["url"]);  
		$strtype = image_type_to_extension($type);
        $type_array = array(
            ".jpeg",
            ".gif",
            ".png",
            ".jpg"
        );
        if (!in_array(strtolower($strtype) , $type_array)) {
            $this->erro = "无法读取图片";
            return false;
        }
        
        if ($JSconfig["R"] ==  90 || $JSconfig["R"] ==  270) {
            list($w, $h) = array(
                $h,
                $w
            );
        }
        return $this->createshear($PHPconfig, $w, $h, $type , $JSconfig);
    }
	 protected  function imagecreatefrom($url,$type){
		switch ($type) {
            case 1:
                $src = @imagecreatefromgif($url);
                $GdFun = array(
                    "imagegif",
                    ".gif"
                );
                break;

            case 2:
                $src = @imagecreatefromjpeg($url);
                $GdFun = array(
                    "imagejpeg",
                    ".jpg"
                );
                break;

            case 3:
                $src = @imagecreatefrompng($url);
                $GdFun = array(
                    "imagepng",
                    ".png"
                );
                break;

            default:
			    $this->erro="不支持的类型";
                return false;
                break;
        } 
		return array($src,$GdFun);
		 }
	
    protected function createshear(&$PHPconfig, $w, $h, $type , &$JSconfig) { 
        $imagecreatefrom=$this->imagecreatefrom($JSconfig["url"],$type);
		if(!$imagecreatefrom)return false;
		list($src,$GdFun)= $imagecreatefrom;
        $src = $this->rotate($src, $JSconfig["R"]);
        $dest = imagecreatetruecolor($JSconfig["IW"], $JSconfig["IH"]);
        $white = imagecolorallocate($dest, 255, 255, 255);
        imagefill($dest, 0, 0, $white);
        imagecopy($dest, $src, 0, 0, $JSconfig["X"], $JSconfig["Y"], $w, $h);
        imagedestroy($src);
        return $this->compression($dest, $PHPconfig, $JSconfig, $type, $GdFun);
    }
    protected function CreateArray(&$PHPconfig, &$JSconfig) {
        $arr = array();
        if ($PHPconfig["proportional"] > 0) {
            $proportion = $PHPconfig["proportional"];
        } else {
            $proportion = $JSconfig["IW"] / $JSconfig["IH"];
        }
        $water_or = isset($PHPconfig["water"]) && $PHPconfig["water"] && file_exists($PHPconfig["water"]) && is_numeric($PHPconfig["water_scope"]);
        if (!file_exists($PHPconfig["saveURL"])) {
            if (!mkdir($PHPconfig["saveURL"], 0777, true)) {
                $this->erro = "目录权限有问题";
                return false;
            }
        }
	    $file_url =	$PHPconfig["saveURL"] . $PHPconfig["filename"];
        foreach ($PHPconfig["width"] as $k => $v) {
            ($v[0] == 0) ? ($v[0] = $JSconfig["FW"]):($v[0] == -1) and ($v[0] = $JSconfig["IW"]);
            $height = $v[0] / $proportion;
			$suffix=isset($v[2])?$v[2]:"0";
             $arr[$k] = array(
                $v[0],
                $height,
                $file_url.$suffix,
                ($v[1] === true and $water_or === true and $v[0] > $PHPconfig["water_scope"] and $height > $PHPconfig["water_scope"])
            );
        }
        return array(
            $water_or,
            $arr
        );
    }
    protected function compression($DigShear, &$PHPconfig, &$JSconfig, $type, $GdFun) {
        require 'zip_img.php';
        $arrimg = $this->CreateArray($PHPconfig, $JSconfig);
        if (count($arrimg[1]) < 1) {$this->erro = "系统没有检测到处理截图的命令！";return false;}
        $arrimg[0] and $arrimg[0] = $PHPconfig["water"];
        $zip_photo = new zip_img(array(
            "dest" => $DigShear,
            "GdFun" => $GdFun,
            "quality" => isset($PHPconfig["quality"]) ? $PHPconfig["quality"] : false,  
            "force_jpg" => isset($PHPconfig["force_jpg"]) && $PHPconfig["force_jpg"],  
            "water" => $arrimg[0],
            "water_scope" => $PHPconfig["water_scope"],
            "w" => $JSconfig["IW"],
            "h" => $JSconfig["IH"],
            "type" => $type,
            "zip_array" => $arrimg[1]
        ));
        return $zip_photo->run($this);
    }
}
/*..................................类结束了...........................*/

                                  /*........................普通截取时开始..........................*/

if(isset($_POST["JSdate"])){//普通截取时 
          $ShearPhoto["JSdate"] =	json_decode(trim(stripslashes($_POST["JSdate"])) , true);
		  $Shear = new ShearPhoto; //类实例开始
          $result = $Shear->run($ShearPhoto["JSdate"], $ShearPhoto["config"]); //传入参数运行
          if ($result === false) { //切图失败时
             echo '{"erro":"' . $Shear->erro . '"}'; //把错误发给JS /请匆随意更改"erro"的编写方式，否则JS出错
             exit;
		  } else{
			      $dirname = pathinfo($ShearPhoto["JSdate"]["url"]);
                  $ShearPhotodirname = $dirname["dirname"] . DIRECTORY_SEPARATOR . "shearphoto.lock"; //认证删除的密钥
                  file_exists($ShearPhotodirname) && @unlink($ShearPhoto["JSdate"]["url"]); //密钥存在，当然就删掉原图
			     }
		  
	}
	
                                     /*........................普通截取时结束..........................*/	
											 
	
/*......................上面普通截取时........................................我是华丽分割线................下面是HTML5截取时取时.........................................*/



	
	                                   /*........................HTML5截取时..........................*/
	
	   elseif (isset($_POST["ShearPhotoIW"]) && 
               isset($_POST["ShearPhotoIH"]) &&
               isset($_POST["ShearPhotoFW"]) && 
               isset($_POST["ShearPhotoFH"]) &&
			   isset($_POST["ShearPhotoP"]) &&
			   is_numeric($JSconfig["P"]=trim($_POST["ShearPhotoP"]))&&
               is_numeric($JSconfig["IW"]=trim($_POST["ShearPhotoIW"]))&&
               is_numeric($JSconfig["IH"]=trim($_POST["ShearPhotoIH"]))&&
               is_numeric($JSconfig["FW"]=trim($_POST["ShearPhotoFW"]))&&
               is_numeric($JSconfig["FH"]=trim($_POST["ShearPhotoFH"]))){
				          $Shear = new ShearPhoto; //类实例开始
	                      $result =$Shear->html5_run($ShearPhoto["config"],$JSconfig);//加载HTML5已切好的图片独有方法
						  if ($result === false) { //切图失败时
                              echo '{"erro":"' . $Shear->erro . '"}'; //把错误发给JS /请匆随意更改"erro"的编写方式，否则JS出错
                              exit;
		                   }
	            }
                                           /*........................HTML5截取时结束..........................*/
			  
			  /*........错误的操作................*/
			    else {die('{"erro":"错误的操作！或缺少参数或错误参数"}');}
			 /*........错误的操作................*/			
			 
			 
			 		
/*..........................................................结果输出给JS..............................................................*/	
    /*
     到此程序已运行完毕，并成功！你可以在这里愉快地写下你的逻辑代码
    $result[X]["ImgUrl"] //图片URL路径  X是数字
    $result[X]["ImgName"] //纯图片名字  X是数字
    $result[X]["ImgWidth"]//图片宽度    X是数字
    $result[X]["ImgHeight"] //图片高度    X是数字
	
    用var_dump($result)展开，你便一目了然！
	
	很多人问怎么把截好图片写到数据库， $result[X]["ImgUrl"]是完整的URL地址（包含文件名），不适宜写到数据库，因为图片路径一旦变动你会很麻烦
	一般写到数据库都是纯图片名字写进为好，那么正确的做法是把 $result[X]["ImgName"]  写进去数据库
    */
    //ShearPhoto 作者:明哥先生 QQ399195513
  $str_result = json_encode($result);
  echo str_replace("\/", "/", $str_result); //去掉无用的字符修正URL地址，再把数据传弟给JS
?>
