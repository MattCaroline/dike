/*
 	公共函数库：自己封装各种常用的函数，以后直接调用即可，提高开发效率

 */


/*
 *      ranNum：功能是产生一个1-100的随机整数的函数
 *      参数：无
 * 		返回值：返回一个1-100的随机整数
 */

//			1、得到一个1-100的随机整数的函数
			var ranNum = function(){
//				得到随机数
				var Num = parseInt(Math.random() * 100);
//				console.log(Num);
				return Num;//（返回值）把Num这个值返回给ranNum
			}




/*
 *      factorial()：功能是实现任意数字的阶乘
 *      参数：a（形参）
 * 		返回值：返回一个阶乘后的结果
 */
//			1、创建一个叫函数名叫factorial的函数。传参（形参：形式参数）
			function factorial(a){
//				实现任意数字阶乘
//				var val = num.value;
				var res = 1;
//				用for循环,使res从1x1累乘到res 乘  a
				for(var i = 1;i <= a;i ++){
					res = res * i;
				}
				return res;
			}
//			调用时,把输入值与参数连接起来即可
			
			
/*
 *      randomNum()：功能随机生成一个四位数字的组合
 *      参数：无
 * 		返回值：返回一个四位数
 */		
			//			声明体
			function randomNum(){
				var num = '';//用于储存四个数字，若num = 0，得出的num为四个数字的和
				for(var i = 1;i <= 4;i ++) {
//					组合四个随机数
					num += parseInt(Math.random() * 10);
				}
				return num;//返回值到randomCode();这个函数
			}



/*
 *      randomCode()：功能随机生成一个四位数字与字母的组合
 *      参数：无
 * 		返回值：返回四个字母与数字中的随机值
 */
//			声明体
			function randomCode() {
//				字母与数字的组合
				var html ='1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
//				选择随机值
				var code = '';
//				组合四个随机值
				for(var i = 1;i <= 4; i ++) {
//					每个随机值。随机数范围：0到html.length-1。比如有里面10个数，但长度为0-9，0表示第一个
					var ran = parseInt(Math.random() * html.length);//长度为html.length-1
//					拼接每个随机值，html[ran]中ran相当于html的下标（即为html中的第几项）
					code += html[ran];
				}
				return code;
			}
			
//			randomCode();
//			var suiji = randomCode();
//			console.log(suiji);
			
//			需要调用时,在另一个文档中引入此文件,并写上对应的函数名




/*
 *      objToStr()：把一个对象转换成字符串
 *      参数：有，obj
 * 		返回值：返回除最后一个字符的字符串
 */
					function objToStr(obj){
						var str = ''
						for(var key in obj){
							str += key + '=' + obj[key] + '&'; 
						}
						return str.slice(0,-1);
					}

/*
 *      strToObj()：把一个对象转换成字符串
 *      参数：有，str
 * 		返回值：返回除最有一个字符的字符串
 */
					function strToObj(str){
						var obj = {};
						var a = str.split('&');
						for(var i = 0;i < a.length; i ++){
							var st = a[i].split('=');
							obj[st[0]] = st[1];
						}
						return obj;
					}
/*
 	ajax()
 	参数一：请求方式  get  post
 	参数二：url接口路径不同
 	参数三：传输给后台的数据不同data
	参数四：回调函数
*/

function packageAjax(type,url,data,fn) {
	
	//1.创建对象
	var xhr = new XMLHttpRequest();
	
	//2.参数设置  open('')
	if(type.toLowerCase() == 'get') {
		if(data) {
			//如果是get方式并且有数据
			url = url +'?'+ data;
		}
		xhr.open(type,url,true);
		xhr.send(null);
	}else{
		//post方式
		xhr.open(type,url,true);
		//请求头设置
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	//接收数据
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				//成功接收数据
//				var str = xhr.responseText;
				if(fn) {
					//把数据传到前端使用
					fn(xhr.responseText);
				}
			}else{
				//如果出错给个提示
				alert('出错了，状态码是：' + xhr.status);
			}
		}
	}
}

/*
 ajax2({
	type : 'get',//传输方式
	url : 'api/02checkname_get.php',//接口的路径
	data : 'name=' + username.value,//传输给后台的数据
//	async : true,//选填的，默认是异步 true
	success : function(str) {//成功的回调，能够拿到后端的数据

	}
});
*/

function packageAjax_2(opt){
	//继承函数：obj2继承obj1的功能
	function extend(obj1,obj2){
		for(var key in obj1){
			obj2[key] = obj1[key];
		}
	}
	
	
	var defaults = {//默认参数
		//true为异步
		async : true
	}
	
	
	extend(opt,defaults);
	
	var xhr = new XMLHttpRequest;//创建对象
	
	//get传输方式
	if(defaults.type.toLowerCase() == 'get'){
		defaults.url += '?' + defaults.data;  
		xhr.open('get',defaults.url,defaults.async);
		xhr.send(null);
	}else if(defaults.type.toLowerCase() == 'post'){
		xhr.open('post',defaults.url,defaults.async);
		//post方式要在open方法后设置请求头
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); 
		xhr.send(defaults.data);//要传送的数据
	}
	
	//接收参数
	xhr.onreadystatechange = function(){
		//判断state和status和情况
		if(xhr.readyState == 4) {//（完成）响应内容解析完成，可以在客户端调用了
			if(xhr.status == 200) {//（OK）：服务器成功返回了页面
				defaults.success(xhr.responseText);
			}else{
				alert('错误：http为：' + xhr.status);
			}
		}
	}
}

/*
	cookie:
		完整格式：//[]表示该值是可选
		document.cookie = name=value[;expires=date][;path=路径][;domain=域名]
		
		1、设置：
			document.cookie = 'name=laoxie';
		2、获取
			var cookies = document.cookie;
		3、删除
			利用设置过期时间达到删除的效果。
*/
//拿cookie中的用户名
		function cookie_getdata(inf){
			var str = document.cookie;//psw=123; name=wudi
			var arr1 = str.split('; ');//[psw=123,name=wudi]
			for(let ele of arr1){
				let arr2 = ele.split('=');//psw,123  name,wudi
				if(inf == arr2[0]){
					return arr2[1];
				}
			}
		}		
//设置cookie数据
function cookie_set(keyname,keyval,time){
				let now = new Date();
				now.setDate(now.getDate() + time);
				document.cookie = keyname + '=' + keyval +';expires=' + now + ';path=/';
			}

//删除cookie数据：把有效时间设置为失效时间即可
function cookie_del(keyname){
	//登陆时是根据是否存在用户名，所以删除用户名即可起到退出作用
	cookie_set(keyname,'',-2);
}

function getid(id) {
	return document.getElementById(id);
}

/*
	把毫秒转化成年月日时分秒
	times为毫秒
	返回一个对象：年月日时分秒
*/
function nowDate(times){
				let time = new Date(times);
				let year= time.getFullYear();
				let mon = time.getMonth() + 1;//月份从0开始，0代表1月份
				let day = time.getDate();
				let hour = time.getHours();
				let min = time.getMinutes();
				let sec = time.getSeconds();
				return {
					years : year,
					mons : mon,
					dates : day,
					hours : hour,
					mins : min,
					secs : sec
				};
			}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) { //key:键名   json[key] :键值
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') { //初始值
				cur = getStyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getStyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6; //出现小数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			//保证上一个属性全部都达到目标值了
			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100; //0-1
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}

		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) { //可选参数的由来
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器

}
//获取样式的方法

function getStyle(ele, cls) {
	//ele节点  cls：属性名
	if(getComputedStyle(ele, false)) {
		//高级浏览器
		return getComputedStyle(ele, false)[cls];
	} else {
		//低版本的IE8-
		return ele.currentStyle[cls];
	}
}


/*
	缓慢返回顶部：
		当到达一定距离height时出现返回顶部按钮
		点击按钮缓慢返回顶部
			返回途中，若滚动滚轮，停止返回顶部，再次点击才能返回顶部
			当window.scrollY小于height时隐藏按钮
			
	btn：按钮
	height：临界点
	num: 调整速度，越大速度越慢
	second：控制定时器的快慢
*/
			function toTop(btn,height,num,second){
				let h = height;
				window.onmousewheel = function(){
					let where = window.scrollY;
					if(where >= h) {
						btn.style.display = 'block';
					}else if(where < h){
						btn.style.display = 'none';
					}
				}
				btn.onclick = function() {
					var timer = null;
					timer = setInterval(slowTop,second);
					function slowTop(){
						let scrollY = window.scrollY;
						let speed = scrollY / num;
						let target = scrollY - speed;
						window.scrollTo(0,target);
						if(scrollY >= h) {
							btn.style.display = 'block';
						}else if(scroll < h){
							btn.style.display = 'none';
						}
						window.onmousewheel = function(){
							clearInterval(timer);
						}
					}
				}
			}