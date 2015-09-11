shearphoto2.1  是HTML5头像截图插件，拍照截图，JS截图，美工切图插件，能直接压缩数码相机图片进行截图！是互联网上写得最好的一个同类型插件 ShearPhoto 完美支持Linux Windows 服务器，国外空间等完美通过。 兼容IE6及所有浏览器,兼容PHP5.2X至PHP7.0！ ShearPhoto拖动拉伸超准，超流畅，在互联网同类型软件绝对排行第一，除了shearphoto，你别无选择！

shearphoto2.1 版本升级概况


  1： 这个版本并没有新功能的加入，主要修复shearphoto2.0遗留的BUG，而且修复的BUG较多也较为严重，那就不再一一列举了！
  2： 对程序再次进行深度优化一遍！
  3： 生成的截图的截图名称以前是写死0 1 2 3... 修改后，能自定义截图尾部的名称
  3： 对部份表述不清的注释，重新整理了一下

请下载2.1源码体验  2005年9月9日升 11：54分


JAVA用户请到http://git.oschina.net/alexyang/JFinal-shearphoto 下载

------------------------------------------------------------------------

 从shearphoto 1.5直接跳跃到shearphoto 2.0，这是shearphoto重大革新。本来我是想shearphoto 1.6 、1.7、 1.8 慢慢升的，但是这样升级只会让shearphoto慢慢走向灭亡！结果我又辛苦了一个多星期，把shearphoto 2.0升级完成！
shearphoto2.0之前，我认为没必要加入HTML5，兼容IE6 7 8就够。但是直到后来！我知道这是我一个错误的决定
因为用户并没有为shearphoto 1.5埋单，原因shearphoto 1.5没有HTML5截取，用户觉得会增加服务器负载！而且又不是本地加载图片！我一个错误的决定！导致用户份额一直没有明显大增。

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

shearphoto采用原生JS + 原生PHP所写，绝对不含JQ插件，对JQ情有独忠的，这个插件不合适你                                                     

                                                                                                         2015  年  9月  5 日  
                                                                                                         shearphoto作者：明哥先生
                                                                                                         版本号:shearphoto1.5
                                                                                                                                                            shearphoto官网：www.shearphoto.com
                                                                                                                                              shearphoto官方QQ群：461550716                                                                         

