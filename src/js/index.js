//判断是否登录,显示用户
if(cookie_getdata('username')) {
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a class="user" href="###">' + cookie_getdata('username') + '</a><a class="quit" href="###">退出</a>');
} else {
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a href="###" class="head-login">请登录</a>');
};
//我的
$('.user').click(function() {
	//location.href = 'html/my.html';
});
//退出
$('.quit').click(function() {
	cookie_del('username');
	cookie_del('userid');
	location.href = 'indexxx.html';
});

/*
	搜索框 
*/
$('.searchBtn').click(function() {
	let searchVal = $('.searchBtn').prev().val();
	window.open('html/list.html?searchVal=' + searchVal);
});

var banner = document.querySelector('.banner');
var big_pic = banner.querySelector('.big_pic');
var biglis = big_pic.querySelectorAll('li'); //大li


//侧栏购物车数量：已登录才显示，为登录不显示
//if(){
//	
//}












/*
	大图轮播：
		每两秒切换一次图片:通过改变层级才显示新图
		图片效果：渐现（透明度opacity）或从上到下（高度从0到全部） 
*/

//定时器
var timer = setInterval(next, 3000);
var num = 0;
var zindex = 2;

//
//下一张
function next() {
	num++;
	if(num >= biglis.length) {
		zindexreset();
	}
	/*
		轮到第二张且层级为2（层架++），轮到第三张且层级为3（因为上一轮zindex++）
	*/
	biglis[num].style.zIndex = zindex;
	biglis[num].style.opacity = 0;
	startMove(biglis[num], {
		'opacity': 100
	});
	zindex++;

	//			small();
}

//上一张
function prev() {
	num--;
	if(num < 0) {
		num = biglis.length - 1;
		for(let val of biglis) {
			val.style.zIndex = 0;
		}
		biglis[num].style.zIndex = 1;
		zindex = 2;
	} else {
		/*
			轮到第二张且层级为2（层级++），轮到第三张且层级为3（因为上一轮zindex++过）（层级++）
			所以即使每次切图，下一张的层级都会大于当前层级，才不会被覆盖
		*/
		biglis[num].style.zIndex = zindex;
		zindex++;
	}
	biglis[num].style.opacity = 0;
	startMove(biglis[num], {
		'opacity': 100
	});

	//			small();
}

//左右按钮：切换上下张
$('.big_pic').on('click', '.preBtn', function() {
		prev();
	})
	.on('click', '.nextBtn', function() {
		next();
	});;

//层级重置
function zindexreset() {
	//清零
	for(let val of biglis) {
		val.style.zIndex = 0;
	}
	biglis[0].style.zIndex = 1; //保证能显示第一图
	num = 0; //恢复
	zindex = 1; //恢复
}

//登录
$('.head-login').click(function() {
	location.href = 'html/login.html';
});
//注册
$('.head-register').click(function() {
	location.href = 'html/register.html';
});
//购物车
//$('.head-cart').click(function(){
//	location.href = 'html/register.html';
//});

/*
	部分数据渲染：限时购
		
*/
packageAjax_2({
	type: 'post',
	url: 'api/index1.php',
	data: '',
	success: function(str) {
		//console.log(str);
		var arrObj = JSON.parse(str);
		//console.log(arrObj);//多维数组
		let html = arrObj.map(function(item) {
			return `<li goods-id="${item.goods_id}">
						<a href="###">
							<figure>
								<img src="${item.index_imgsrc}" />
								<figcaption>
									<p class="limitBuy-goods-c-name">${item.seller}</p>
									<p class="limitBuy-goods-c-price1">
										<span>7折</span>
										<span>￥${item.price1}</span>
									</p>
									<p class="limitBuy-goods-c-price2">￥${item.price2}</p>
								</figcaption>
							</figure>
						</a>
					</li>`;
		});
		$('.limitBuy-goods-c_').html(html);
	}
});

/*
	点击商品进入详情页 ：
		
*/
var limitGoods = document.querySelector('.limitBuy-goods-c_');
//事件委托
limitGoods.onclick = function(ev) {
	if(ev.target.tagName.toLowerCase() == 'img') {
		let id = ev.target.parentNode.parentNode.parentNode.getAttribute('goods-id');
		//console.log(id);
		location.href = 'html/detail.html?goods-id=' + id;
	}
}

/*
	选项卡：
		1、事件委托
			移入事件，ev.target高亮，排他 
*/

var box = document.querySelector('.daRen-tabs');
var ul = box.children[0].children;
var lis = box.querySelectorAll('li');
//console.log(lis);
//console.log(ul);

//初始渲染
var darenHtml = `<div class="daRen-l fl">
					<a href="###">
						<img src="css/img/daren-select1-l.jpg" />
						<div class="daRen-l-text">
							<h4>Longines浪琴表：优雅态度，真我个性</h4>
							<p>赵丽颖、彭于晏明星推荐品牌</p>
						</div>
					</a>
				</div>
				<ul class="daRen-r fl">
					<li>
						<a href="###">
							<img src="css/img/daren-select1-r1.jpg" />
						</a>
					</li>
					<li>
						<a href="###">
							<img src="css/img/daren-select1-r2.jpg" />
						</a>
					</li>
					<li>
						<a href="###">
							<img src="css/img/daren-select1-r3.jpg" />
						</a>
					</li>
					<li>
						<a href="###">
							<img src="css/img/daren-select1-r4.jpg" />
						</a>
					</li>
				</ul>`;
$('.daRen-').html(darenHtml);

box.onmouseover = function(ev) {
	//1、排他
	if(ev.target.tagName.toLowerCase() == 'li') {
		for(let i = 0; i < lis.length; i++) {
			lis[i].className = '';
		}
		//2、高亮
		ev.target.className = 'daRen-tabs-active';
		//3、渲染:拿li的id，用id从数组里找数据
		let suoyin = ev.target.getAttribute('select-id');
		//console.log(suoyin)
		//大图
		$('.daRen-l').find('a').find('img').attr('src', darenArr[suoyin].bigimg);
		//文字
		$('.daRen-l-text').find('h4').html(darenArr[suoyin].imgtxt1);
		$('.daRen-l-text').find('p').html(darenArr[suoyin].imgtxt2);
		//小图
		$('.daRen-r').find('a').eq(0).find('img').attr('src', darenArr[suoyin].smallimg1);
		$('.daRen-r').find('a').eq(1).find('img').attr('src', darenArr[suoyin].smallimg2);
		$('.daRen-r').find('a').eq(2).find('img').attr('src', darenArr[suoyin].smallimg3);
		$('.daRen-r').find('a').eq(3).find('img').attr('src', darenArr[suoyin].smallimg4);
	}
};

//多维数组:储存选项卡数据
var darenArr = [{
	bigimg: 'css/img/daren-select1-l.jpg',
	imgtxt1: 'Longines浪琴表：优雅态度，真我个性',
	imgtxt2: '赵丽颖、彭于晏明星推荐品牌',
	smallimg1: 'css/img/daren-select1-r1.jpg',
	smallimg2: 'css/img/daren-select1-r2.jpg',
	smallimg3: 'css/img/daren-select1-r3.jpg',
	smallimg4: 'css/img/daren-select1-r4.jpg'
}, {
	bigimg: 'css/img/daren-select2-l.jpg',
	imgtxt1: '限量赠送表带  详询客服',
	imgtxt2: '豪利时 Oris-65复制潜水系列',
	smallimg1: 'css/img/daren-select2-r1.jpg',
	smallimg2: 'css/img/daren-select2-r2.jpg',
	smallimg3: 'css/img/daren-select2-r3.jpg',
	smallimg4: 'css/img/daren-select2-r4.jpg'
}, {
	bigimg: 'css/img/daren-select3-l.jpg',
	imgtxt1: '田馥甄同款',
	imgtxt2: '田馥甄同款',
	smallimg1: 'css/img/daren-select3-r1.jpg',
	smallimg2: 'css/img/daren-select3-r2.jpg',
	smallimg3: 'css/img/daren-select3-r3.jpg',
	smallimg4: 'css/img/daren-select3-r4.jpg'
}, {
	bigimg: 'css/img/daren-select4-l.jpg',
	imgtxt1: '海洋冒险者专业配备',
	imgtxt2: '赫柏林Michel Herbelin深海潜水款',
	smallimg1: 'css/img/daren-select4-r1.jpg',
	smallimg2: 'css/img/daren-select4-r2.jpg',
	smallimg3: 'css/img/daren-select4-r3.jpg',
	smallimg4: 'css/img/daren-select4-r4.jpg'
}];

//选项卡-排行榜 
var rankBox = document.querySelector('.rank-tabs');
var lis2 = rankBox.querySelectorAll('li');
rankBox.onmouseover = function(ev) {
	//1、排他
	if(ev.target.tagName.toLowerCase() == 'li') {
		for(let i = 0; i < lis2.length; i++) {
			lis2[i].className = '';
		}
		//2、高亮
		ev.target.className = 'daRen-tabs-active';
		//3、渲染:拿li的id，用id从数组里找数据
		//let suoyin = ev.target.getAttribute('select-id');
		//console.log(suoyin)
		//大图
		//$('.daRen-l').find('a').find('img').attr('src', darenArr[suoyin].bigimg);
		//文字
		//$('.daRen-l-text').find('h4').html(darenArr[suoyin].imgtxt1);
		//$('.daRen-l-text').find('p').html(darenArr[suoyin].imgtxt2);
		//小图
		//$('.daRen-r').find('a').eq(0).find('img').attr('src', darenArr[suoyin].smallimg1);
		//$('.daRen-r').find('a').eq(1).find('img').attr('src', darenArr[suoyin].smallimg2);
		//$('.daRen-r').find('a').eq(2).find('img').attr('src', darenArr[suoyin].smallimg3);
		//$('.daRen-r').find('a').eq(3).find('img').attr('src', darenArr[suoyin].smallimg4);
	}
};

//选项卡-品牌馆
var brandBox = document.querySelector('.brandHall-tabs');
var lis3 = brandBox.querySelectorAll('li');
brandBox.onmouseover = function(ev) {
	//1、排他
	if(ev.target.tagName.toLowerCase() == 'li') {
		for(let i = 0; i < lis3.length; i++) {
			lis3[i].className = '';
		}
		//2、高亮
		ev.target.className = 'daRen-tabs-active';
		//3、渲染:拿li的id，用id从数组里找数据
		//let suoyin = ev.target.getAttribute('select-id');
		//console.log(suoyin)
		//大图
		//$('.daRen-l').find('a').find('img').attr('src', darenArr[suoyin].bigimg);
		//文字
		//$('.daRen-l-text').find('h4').html(darenArr[suoyin].imgtxt1);
		//$('.daRen-l-text').find('p').html(darenArr[suoyin].imgtxt2);
		//小图
		//$('.daRen-r').find('a').eq(0).find('img').attr('src', darenArr[suoyin].smallimg1);
		//$('.daRen-r').find('a').eq(1).find('img').attr('src', darenArr[suoyin].smallimg2);
		//$('.daRen-r').find('a').eq(2).find('img').attr('src', darenArr[suoyin].smallimg3);
		//$('.daRen-r').find('a').eq(3).find('img').attr('src', darenArr[suoyin].smallimg4);
	}
};









/*
 		限时购
				1、设置最终时间（抢购时间）
				2、最终时间 - 系统时间：
						获取系统时间：Date now()
						转化为毫秒：parse()
						再转化成日、时、分、秒:单位换算：用另一个函数写
				3、设置定时器：1秒获取一次系统时间
				4、函数：判断时间差是否为0
					*为0就停止计时器，切换图片：商品、购买按钮
					*不为0：使调用计时器，计算时间差
			*/

var countDown = document.querySelector('.limitBuy-countDown-time');
var strTime = '2019-5-20 20:30:00'; //设置最终时间
var buytime = Date.parse(strTime); //变成毫秒


showtime(); //函数入口
var set = setInterval(showtime, 1000); //每一秒执行一次showtime


//倒计时
function showtime() {
	let _nowtime = new Date();
	let nowtime = Date.parse(_nowtime); //变成毫秒
	var time = parseInt(buytime - nowtime) / 1000;
	if(time <= 0) { //时间差为0:去掉倒计时，
		clearInterval(set);
		countDown.innerHTML = '欢迎下次抢购！';
	} else { //时间差不为0：显示倒计时
		//var fin = timer(time); //得到一个对象
		let sec = time % 60;
		let min = parseInt(time / 60) % 60;
		let hour = parseInt(time / 3600) % 24;
		let days = parseInt((time / 3600) / 24);
		countDown.innerHTML = `倒计时 : ${days}天${hour}时${min}分${sec}秒`;
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
				$('.topBtn').click(function(){
					var timer = null;
					timer = setInterval(slowTop,30);
					function slowTop(){
						let scrollY = window.scrollY;
						let speed = scrollY / 20;
						let target = scrollY - speed;
						window.scrollTo(0,target);
						window.onmousewheel = function(){
							clearInterval(timer);
						}
					}
				});


