//这是FLASHJS拍照JS部份，，后期加入，很多人想要拍照功能，非本人原创
/* JPEGCam v1.0.9 */
/* Webcam library for capturing JPEG images and submitting to a server */
/* Copyright (c) 2008 - 2009 Joseph Huckaby <jhuckaby@goldcartridge.com> */
/* Licensed under the GNU Lesser Public License */
/* http://www.gnu.org/licenses/lgpl.html */

/* Usage:
	<script language="JavaScript">
		document.write( webcam.get_html(320, 240) );
		webcam.set_api_url( 'test.php' );
		webcam.set_hook( 'onComplete', 'my_callback_function' );
		function my_callback_function(response) {
			alert("Success! PHP returned: " + response);
		}
	</script>
	<a href="javascript:void(webcam.snap())">Take Snapshot</a>
*/
// Everything is under a 'webcam' Namespace
window.webcam = {
	 version: '1.0.9',
	 // globals
	ie: !!navigator.userAgent.match(/MSIE/),
	protocol: location.protocol.match(/https/i) ? 'https' : 'http',
	callback: null, // user callback for completed uploads
	swf_url: 'images/webcam.swf', // URI to webcam.swf movie (defaults to cwd)
	shutter_url: 'images/shutter.mp3', // URI to shutter.mp3 sound
	api_url: '', // URL to upload script
	loaded: false, // true when webcam movie finishes loading
	quality: 90, // JPEG quality (1 - 100)
	shutter_sound: true, // shutter sound effect on/off
	stealth: false, // stealth mode (do not freeze image upon capture)
	hooks: {
		onLoad: null,
		onComplete: null,
		onError: null
	}, // callback hook functions
	
	set_hook: function(name, callback) {
		// set callback hook
		// supported hooks: onLoad, onComplete, onError
		if (typeof(this.hooks[name]) == 'undefined')
			return alert("Hook type not supported: " + name);
		
		this.hooks[name] = callback;
	},
	
	fire_hook: function(name, value) {
		// fire hook callback, passing optional value to it
		if (this.hooks[name]) {
			if (typeof(this.hooks[name]) == 'function') {
				// callback is function reference, call directly
				this.hooks[name](value);
			}
			else if (typeof(this.hooks[name]) == 'array') {
				// callback is PHP-style object instance method
				this.hooks[name][0][this.hooks[name][1]](value);
			}
			else if (window[this.hooks[name]]) {
				// callback is global function name
				window[ this.hooks[name] ](value);
			}
			return true;
		}
		return false; // no hook defined
	},
	
	set_api_url: function(url) {
		// set location of upload API script
		this.api_url = url;
	},
	
	set_swf_url: function(url) {
		// set location of SWF movie (defaults to webcam.swf in cwd)
		this.swf_url = url;
	},
	
	get_html: function(width, height, server_width, server_height) {
		// Return HTML for embedding webcam capture movie
		// Specify pixel width and height (640x480, 320x240, etc.)
		// Server width and height are optional, and default to movie width/height
		if (!server_width) server_width = width;
		if (!server_height) server_height = height;
		
		var html = '';
		var flashvars = 'shutter_enabled=' + (this.shutter_sound ? 1 : 0) + 
			'&shutter_url=' + escape(this.shutter_url) + 
			'&width=' + width + 
			'&height=' + height + 
			'&server_width=' + server_width + 
			'&server_height=' + server_height;
		
		if (this.ie) {
			html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+this.protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="webcam_movie" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+this.swf_url+'?bugid='+Math.random()+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="opaque"/></object>';
		}
		else {
			html += '<embed id="webcam_movie" src="'+this.swf_url+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="webcam_movie" align="middle" allowScriptAccess="always" wmode="opaque" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" />';
		}
		this.loaded = false;
		return html;
	},
	
	get_movie: function() {
		// get reference to movie object/embed in DOM
		
		if (!this.loaded) return   this.noCamcall();
		var movie = document.getElementById('webcam_movie');
		if (!movie) alert("ERROR: Cannot locate movie 'webcam_movie' in DOM");
		return movie;
	},
	
	set_stealth: function(stealth) {
		// set or disable stealth mode
		this.stealth = stealth;
	},
	Homing:function(timingId){
		 clearInterval(this.timer);
		 this.timer=null;	
		 timingId.style.display="none";
	  }
		,
		
	timingfun:function(timingId,CamFlash,CamOk,fun){
		CamOk.innerHTML="取消";
		var time=3;
		var	this_=this;
		 CamOk.onclick=function(){
			 this_.Homing(timingId);
			 CamOk.innerHTML="拍照";
			 CamOk.onclick=function(){ 
	         this_.timingfun(timingId,CamFlash,CamOk,fun);
	 }
		};
		timingId.style.display="block";
		timingId.innerHTML=3;
	  this.timer= setInterval(
	function(){
	 time--;
	if(time===0){
		 this_.Homing(timingId);
		fun.call(this_);
		 CamOk.innerHTML="处理中...";
		 CamOk.onclick=null;
		 return;}
	timingId.innerHTML=time;
	}
	,800);
  	},
	newsnap:function(timingId,CamFlash,CamOk){
	var	this_=this;
	CamOk.innerHTML="拍照";
	 CamOk.onclick=function(){ 
	 this_.timingfun(timingId,CamFlash,CamOk,this_.snap);
	 }
		},
	snap: function(url, callback, stealth) {
		// take snapshot and send to server
		// specify fully-qualified URL to server API script
		// and callback function (string or function object)
		if (callback) this.set_hook('onComplete', callback);
		if (url) this.set_api_url(url);
		if (typeof(stealth) != 'undefined') this.set_stealth( stealth );
		this.get_movie()._snap( this.api_url, this.quality, this.shutter_sound ? 1 : 0, this.stealth ? 1 : 0 );
	 },
	 freeze: function() {
		 this.get_movie()._snap('', this.quality, this.shutter_sound ? 1 : 0, 0 );
	},
	 upload: function(url, callback) {
		// upload image to server after taking snapshot
		// specify fully-qualified URL to server API script
		// and callback function (string or function object)
		if (callback) this.set_hook('onComplete', callback);
		if (url) this.set_api_url(url);
		
		this.get_movie()._upload( this.api_url );
	},
	
	reset: function() {
		// reset movie after taking snapshot
		this.get_movie()._reset();
	},
	
	configure: function(panel) {
		// open flash configuration panel -- specify tab name:
		// "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
		if (!panel) panel = "camera";
		this.get_movie()._configure(panel);
	},
	
	set_quality: function(new_quality) {
		// set the JPEG quality (1 - 100)
		// default is 90
		this.quality = new_quality;
	},
	
	set_shutter_sound: function(enabled, url) {
		// enable or disable the shutter sound effect
		// defaults to enabled
		this.shutter_sound = enabled;
		this.shutter_url = url ? url : 'images/shutter.mp3';
	},
	
	flash_notify: function(type, msg) { 
		 switch (type) {
			case 'flashLoadComplete': 
				// movie loaded successfully
				this.loaded = true;
				this.fire_hook('onLoad');
				break;
			
			case 'error':
				// HTTP POST error most likely
				if (!this.fire_hook('onError', msg)) {
					this.noCamcall();
				}
				break;

			case 'success':
				// upload complete, execute user callback function
				// and pass raw API script results to function
				this.fire_hook('onComplete', msg.toString());
				break;

			default:
				// catch-all, just in case
				alert("flash_notify: " + type + ": " + msg);
				break;
		}
	}
};
