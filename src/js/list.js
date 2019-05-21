//判断是否登录,显示用户
if(cookie_getdata('username')){
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a class="user" href="###">'+cookie_getdata('username')+'</a><a class="quit" href="###">退出</a>');
}else{
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a href="###" class="head-login">请登录</a>');
};
//我的
$('.user').click(function(){
	//location.href = 'html/my.html';
});
//退出
$('.quit').click(function(){
	cookie_del('username');
	cookie_del('userid');
	location.href = '../indexxx.html';
});



var box = document.querySelector('.main-aside-ad');
var imglist = box.querySelector('.main-aside-ad-');
var lis = box.querySelectorAll('li');
var images = imglist.querySelectorAll('img');
var lightbox = box.querySelector('.light'); //高亮盒子
var lights = lightbox.querySelectorAll('span'); //高亮
var iw = lis[0].offsetWidth;

/*
 	轮播图:
 		把所有图片放在右边（最后一张会在最上面）
 		开定时器：
 			每一张图往左边运动：改变left值
 			旧的往可视左边挪，新的从右边往可视挪
*/
for(let i = 0; i < lis.length; i++) {
	lis[i].style.left = iw + 'px';
}
lis[0].style.left = 0;
var timer = setInterval(next, 4000);
var num = 0;

//下一张
function next() {
	startMove(lis[num], {
		'left': -iw
	});
	num++;
	if(num >= lis.length) {
		num = 0; //重置num，得以循环
	}
	lis[num].style.left = iw + 'px'; //使新图都是从右边开始进入
	startMove(lis[num], {
		'left': 0
	});
	//排他
	lightMove();
}
//上一张:把当前图片往右挪，左边的图往右挪
function prev() {
	startMove(lis[num], {
		'left': iw
	});
	num--;
	if(num < 0) {
		num = lis.length - 1;
	}
	lis[num].style.left = -iw + 'px'; //使要出现的图都是从左边开始进入
	startMove(lis[num], {
		'left': 0
	});
	//排他
	lightMove();
}
//创建节点
var html = '';
for(let j = 0; j < lis.length; j++) {
	html += `<span>${j + 1}</span>`;
}
lightbox.innerHTML = html
lightbox.children[0].className = 'active';

//高亮
function lightMove() {
	//排他
	for(let i = 0; i < lightbox.children.length; i++) {
		lightbox.children[i].className = '';
	}
	//给新图添加高亮
	lightbox.children[num].className = 'active';
}

//移入
box.onmouseover = function() {
	clearInterval(timer);
}
//移出
box.onmouseout = function() {
	timer = setInterval(next, 4000);
}

/*
 	焦点：
	下面的小图的高亮跟着大图：利用num，active
		点击小图可以切换大图
			点击的序号大于原来的就从右边进
			点击的序号小于原来的就从左边进
*/
//点击切换大图:旧图挪走，新图进场
for(let i = 0; i < lis.length; i++) {
	lightbox.children[i].onclick = function() {
		//点击的序号大于原来的就从右边进
		if(i > num) {
			//旧图挪走：左
			startMove(lis[num], {
				'left': -iw
			});
			//把第i张迅速放到右边
			lis[i].style.left = iw + 'px';
			//焦点跟随
		} else if(i < num) {
			//点击的序号小于原来的就从左边进
			//旧图挪走：右
			startMove(lis[num], {
				'left': iw
			});
			//把第i张迅速放到右边
			lis[i].style.left = -iw + 'px';
		}
		//新图出场
		startMove(lis[i], {
			'left': 0
		});
		/*
			新图变旧图：
			因为一直用的方法里都是num，所以要想改变当前图片显示和焦点跟随，
			就要把点击的i赋给num才能执行
		*/
		num = i;
		//此时num等于i，点击的那个i焦点才会高亮
		lightMove();
	}
}

/*
 	1、接收数据（网址）
 	2、发送请求得到数据
	3、数据渲染：
		1、数据库拿数据：多维数组型的字符串
		2、转化成多维数组
*/

//ajax封装

function init(val,saleOrder, priceOrder, price1, price2) {
	packageAjax_2({
		type: 'post',
		url: '../api/order.php',
		data: 'searchVal=' + val + '&saleOrder=' + saleOrder + '&priceOrder=' + priceOrder + '&price1=' + price1 + '&price2=' + price2,
		success: function(str) {
			//console.log(str);
			//渲染数据
			create(str);
		}
	});
}

//1、接收数据（网址）
var myurl = location.search.slice(1);
var val = myurl.split('=')[1]; //%E4%BD%B3%E6%98%8E
//console.log(val);
//转码
var searchVal = decodeURI(val);
//console.log(searchVal);
var val = searchVal;
var saleOrder = '';
var priceOrder = '';
var price1 = '';
var price2 = '';
//初始化
init(val,saleOrder, priceOrder, price1, price2);

/*
	1、价格区间
		
	2、升降序：销量、价格
	
*/

/*
 	1、价格区间
 		获取表单内容
 		发送ajax请求拿数据
 		数据渲染
*/
var ok1 = '';
var ok2 = '';

$('.priceBtn').click(function() {
	let price1 = $('.price1').val().trim();
	let price2 = $('.price2').val().trim();
	//console.log($price1,$price2);
	if(ok1 == 'saleFirst'){
		console.log('3');
		priceOrder = '';
		init(val,'saleOrder', priceOrder, price1, price2);
	}else if(ok2 == 'priceSort'){
		console.log('2');
		saleOrder = '';
		init(val,saleOrder, 'priceOrder', price1, price2);
	}else{
		console.log('1');
		saleOrder = '';
		priceOrder = '';
		init(val,saleOrder, priceOrder, price1, price2);
	}
});

/*
	2、升降序：销量
*/
$('.saleFirst').click(function() {
	//高亮
	$('.saleFirst').css('border-bottom','3px solid #CC9952');
	$('.priceSort').css('border-bottom','');
	
	let price1 = $('.price1').val().trim();
	let price2 = $('.price2').val().trim();
	
	ok1 = 'saleFirst';
	ok2 = '';
	priceOrder = '';
	init(val,'saleOrder', priceOrder, price1, price2);
});
/*
	2、降序：价格
*/
$('.priceSort').click(function() {
	$('.priceSort').css('border-bottom','3px solid #CC9952');
	$('.saleFirst').css('border-bottom','');
	
	let price1 = $('.price1').val().trim();
	let price2 = $('.price2').val().trim();
	
	ok1 = '';
	ok2 = 'priceSort';
	saleOrder = '';
	init(val,saleOrder, 'priceOrder', price1, price2);

});

//数据渲染封装
function create(data){
	let arrObj = JSON.parse(data);
	let html = arrObj.map(function(item) {
		return `<li goods-id="${item.goods_id}">
					<figure>
						<a href="###">
							<img src="${item.list_imgsrc}"/>
						</a>
						<figcaption>
							<p>
								<span class="goodsprice1">
									￥<em>${item.price1}</em>
								</span>
								<span class="goodsprice2">￥${item.price2}</span>
							</p>
							<a href="###" class="goodstext">
								${item.describe}
							</a>
							<p>
								<em class="goodsSale">销量${item.saled}</em>
							</p>
							<p>
								<a href="###" class="gooodsBrand">${item.seller}</a>
							</p>
						</figcaption>
					</figure>
				</li>`;
	}).join('');
	$('.goodslist').html(html);
}

/*
 	跳转详情页：
 		点击后传输id过去
*/
var goodslist = document.querySelector('.goodslist');

goodslist.onclick = function(ev) {
	if(ev.target.tagName.toLowerCase() == 'img' || ev.target.className == 'goodstext') {
		let id = ev.target.parentNode.parentNode.parentNode.getAttribute('goods-id');
		//console.log(id);
		location.href = 'detail.html?goods-id=' + id;
	}
}