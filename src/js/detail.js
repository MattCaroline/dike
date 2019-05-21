//判断是否登录,显示用户
if(cookie_getdata('username')){
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a class="user" href="###">'+cookie_getdata('username')+'</a><a class="quit" href="###">退出</a>');
}else{
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a href="login.html" class="head-login">请登录</a>');
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


/*
	1、拿到列表页传过来的商品id
		切割字符串网址拿id
	2、用ajax发送请求传送id，拿对应的数据，
	3、数据渲染
*/

//1、拿到列表页传过来的商品id
var myurl = location.search;//?goods-id=1
//console.log(myurl);
var id = myurl.slice(1).split('=')[1];
//console.log(id);

//2、用ajax发送请求传送id，拿对应的数据，
packageAjax_2({
	type : 'post',
	url : '../api/detail.php',
	data : 'id=' + id,
	success : function(str){
		//console.log(str);
		let obj = JSON.parse(str);
		//console.log(obj);
		//大图
		$('.goods-img-big').find('img').eq(0).attr('src',obj.list_imgsrc);
		//小图
		let imgsSrc = obj.imgs.split(',');
		let imgs = imgsSrc.map(function(item){
			return `<li>
						<img src="${item}"/>
					</li>`;
		});
		$('.goods-img-small').find('ul').html(imgs);
		//第一个小图高亮
		$('.goods-img-small').find('ul').children('li').first().attr('class','goods-img-small-active');
		
		//描述
		$('.goods-detail-type').find('h3').html(obj.describe);
		//价格1
		$('.price1').html('￥'+obj.price1);
		//价格2
		$('.price2').html('￥'+obj.price2);
		//款式
		
		
	}
});



//放大镜插件参数
$(".example").imagezoomsl({
    cursorshade: true,
    magnifycursor: 'crosshair',
    cursorshadecolor: '#fff',
    cursorshadeopacity: 0.3,
    cursorshadeborder: '1px solid black',
    zindex: '',
    stepzoom: 0.5,
    zoomrange: [2, 2],
    zoomstart: 2,
    disablewheel: true
});


//数量增减
$('.jian').click(function(){
	let jian = $('.jian').next().val() - 1;
	if(jian <= 1){
		jian = 1;
	}
	$('.jian').next().val(jian);
});
$('.jia').click(function(){
	let jia = $('.jia').prev().val() * 1 + 1;
	$('.jia').prev().val(jia);
});
//登陆后才能加入，加入购物车:需要传输的数据 : 商品id ， 用户id  ，数量
	$('.buy-cart').click(function(){
		if(cookie_getdata('username')){
		let count = $('.jian').next().val();
		let uid = cookie_getdata('userid');
		cookie_set('gid',id,1);
		packageAjax_2({
			type : 'post',
			url : '../api/tocart.php',
			data : 'uid=' + uid + '&gid=' + id + '&count=' + count,
			success : function(str){
	//			console.log(str);
//				let data = str;
				$('.tanchuang').css('display','block');
				$('.tanchuang').html('成功加入购物车！');
				let timer = setTimeout(function(){
					$('.tanchuang').css('display','none');
				},500);
			}
		});
		}else {
			alert('添加失败!请先登录');	
		}
});
