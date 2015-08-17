<?php
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
header('Content-type:text/html;charset=utf-8');
require("shearphoto.config.php");
$ShearPhoto["JSdate"]=isset($_POST["JSdate"])?json_decode(trim(stripslashes($_POST["JSdate"])),true):die('{"erro":"致命错误"}');
//类开始
 class ShearPhoto {
    public $erro = false;
    protected function rotate($src, $R) {
        $arr = array(
            -90, 
            -180, 
            -270
        );
        if (in_array($R, $arr)) {
			 $rotatesrc = imagerotate($src, $R, 0);
            imagedestroy($src);
        } else {
            return $src;
        }
      return $rotatesrc;
    }
	
    protected function delTempImg($temp,$deltime) {
		if($deltime==0)  return;
	$dir = opendir($temp);
	$time=time();
	   while (($file = readdir($dir)) !== false)
       {
	      if($file!="." and $file!=".." and $file!="shearphoto.lock"){
		     $fileUrl= $temp.DIRECTORY_SEPARATOR.$file;
	         $pastTime=$time-filemtime($fileUrl);
	          if($pastTime<0 || $pastTime>$deltime)@unlink($fileUrl);
	      }
       }
           closedir($dir);
	}
    public function run($JSconfig, $PHPconfig) {
	 $tempurl=$PHPconfig["temp"].DIRECTORY_SEPARATOR."shearphoto.lock";
	!file_exists($tempurl)	&& file_put_contents($tempurl,"ShearPhoto Please don't delete");
	 $this->delTempImg($PHPconfig["temp"],$PHPconfig["tempSaveTime"]);
	 if (!isset($JSconfig["url"]) || 
    !isset($JSconfig["R"]) || !isset($JSconfig["X"]) || !isset($JSconfig["Y"]) || !isset($JSconfig["IW"]) || !isset($JSconfig["IH"]) || !isset($JSconfig["P"]) || !isset($JSconfig["FW"]) || !isset($JSconfig["FH"]) ) {
     $this->erro = "服务端接收到的数据缺少参数";
            return false;
        } 
		
		
		
        if (!file_exists($JSconfig["url"])) { 
            $this->erro = "此图片路径有误";
            return false;
        }
	
		 
        foreach ($JSconfig as $k => $v) { 
            if ($k !== "url") {
				if (!is_numeric($v)) {
                    $this->erro = "传递的参数有误";
                    return false;
                }
            }
        } //验证是否为字除了url
        if ($PHPconfig["proportional"] !== $JSconfig["P"]) {
            $this->erro = "JS设置的比例和PHP设置不一致";
            return false;
        }
        list($w, $h, $type) = getimagesize($JSconfig["url"]); //验证是否真图片！
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
		if($JSconfig["R"]==-90 || $JSconfig["R"]==-270){ list($w,$h)= array($h,$w);}
		return $this->createshear($PHPconfig, $w, $h, $type, $strtype, $JSconfig);
    }
    protected function createshear($PHPconfig, $w, $h, $type, $strtype, $JSconfig) {
        switch ($type) {
            case 1:  
                $src = @imagecreatefromgif($JSconfig["url"]);
                break;

            case 2:  
                $src = @imagecreatefromjpeg($JSconfig["url"]);
				
                break;

            case 3:  
                $src = @imagecreatefrompng($JSconfig["url"]);
                break;

            default:
                return false;
                break;
				 
				
        }
        $src = $this->rotate($src, $JSconfig["R"]);
		
			 
        $dest = imagecreatetruecolor($JSconfig["IW"], $JSconfig["IH"]); 
        imagecopy($dest, $src, 0, 0, $JSconfig["X"],  $JSconfig["Y"], $w, $h);
	     imagedestroy($src);
        return $this->compression($dest, $PHPconfig, $JSconfig["IW"], $JSconfig["IH"], $type, $strtype, $JSconfig);
    }
    protected function CreateArray($PHPconfig, $JSconfig, $strtype) {
        $arr = array();
        if ($PHPconfig["proportional"] > 0) {
            $proportion = $PHPconfig["proportional"];
        } else {
            $proportion = $JSconfig["IW"] / $JSconfig["IH"];
        }
		  
		  if (isset($PHPconfig["water"]) &&  $PHPconfig["water"]  && file_exists($PHPconfig["water"])) {
              $water_or = true;
        }else{
			 $water_or=false;
		}
		if(!file_exists($PHPconfig["saveURL"])) 
		if(!mkdir($PHPconfig["saveURL"],0777,true)){
			$this->erro = "目录权限有问题";
            return false;
			}
        foreach ($PHPconfig["width"] as $k => $v) {
            ($v[0] == 0) and ($v[0] = $JSconfig["FW"]);
            $height = $v[0] / $proportion;
            $strtype == ".jpeg" and $strtype = ".jpg";
            $file_url = $PHPconfig["saveURL"] .DIRECTORY_SEPARATOR. $PHPconfig["filename"] . $k . $strtype;
            $water = ($v[1] === true && $water_or === true) ? true : false;
            $arr[$k] = array(
                $v[0],
                $height,
                $file_url,
                $water
            );
        }
        return $arr;
    }
    protected function compression($DigShear,$PHPconfig, $w, $h, $type, $strtype, $JSconfig) {
        require 'zip_img.php'; 
		$arrimg=$this->CreateArray($PHPconfig, $JSconfig, $strtype);
		if(!$arrimg) return false;
        $zip_photo = new zip_img(array(
            "dest" => $DigShear,
            "water" => $PHPconfig["water"],
            "water_scope" => $PHPconfig["water_scope"],
            "w" => $w,
            "h" => $h,
            "type" => $type,
            "strtype" => $strtype,
            "zip_array" => $arrimg
        ));
        return $zip_photo->run();
    }
}
//类结束

$Shear =new ShearPhoto;//类实例开始
$result = $Shear->run($ShearPhoto["JSdate"],$ShearPhoto["config"]);//传入参数运行
if($result===false){       //切图失败时
 echo '{"erro":"'.$Shear->erro.'"}';            //把错误发给JS /请匆随意更改"erro"的编写方式，否则JS出错
}
else //切图成功时
 {
	 $dirname=pathinfo($ShearPhoto["JSdate"]["url"]);
	 $ShearPhotodirname=$dirname["dirname"].DIRECTORY_SEPARATOR."shearphoto.lock";//认证删除的密钥
	 file_exists($ShearPhotodirname) && @unlink($ShearPhoto["JSdate"]["url"]);//密钥存在，当然就删掉原图
	 $result = json_encode($result); 
	 echo str_replace(array("\\\\","\/",ShearURL,"\\"),array("\\","/","","/"),$result);//去掉无用的字符修正URL地址，再把数据传弟给JS
      /*
     到此程序已运行完毕，并成功！你可以在这里愉快地写下你的逻辑代码
	 $result[X]["ImgUrl"] //图片路径  X是数字
	 $result[X]["ImgName"] //图片文件名字  X是数字
	 $result[X]["ImgWidth"]//图片宽度    X是数字
	 $result[X]["ImgHeight"] //图片高度    X是数字
	 用var_dump($result)展开，你便一目了然！  
      */
     //ShearPhoto 作者:明哥先生 QQ399195513		
  }
?>