//判断是否登录,显示用户
if(cookie_getdata('username')) {
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a class="user" href="login.html">' + cookie_getdata('username') + '</a><a class="quit" href="###">退出</a>');
} else {
	$('.head-t-r').find('li').eq(0).eq(0).empty();
	$('.head-t-r').find('li').eq(0).append('<a href="login.html" class="head-login">请登录</a>');
};
//我的
$('.user').click(function() {
	//location.href = 'html/my.html';
});
//退出
$('.quit').click(function() {
	cookie_del('username');
	cookie_del('userid');
	location.href = '../indexxx.html';
});

//购物车基本功能
if(cookie_getdata('username')) {
	//渲染数据：ajax
	packageAjax_2({
		type: "post",
		url: "../api/cart.php",
		data: 'uid=' + cookie_getdata('userid'),
		success: function(str) {
			//console.log(str);
			let arrObj = JSON.parse(str);
			console.log(arrObj); //uid,gid和数量
			//			let arr1 = [];
			//			let map1 = arrObj.map(function(item){
			//				
			//			});
			//用gid发送ajax拿商品数据
			let html = '';
			let gids = arrObj.map(function(item) {
				let gidCart = item.gid;
				let count = item.count;
				let zongjia = 0;
				//console.log(uidCart);
				packageAjax_2({
					type: "post",
					url: "../api/cartData.php",
					data: 'gids=' + item.gid,
					success: function(str) {
						//数量渲染进页面
						let obj = JSON.parse(str);
						//console.log(obj);
						zongjia = count * obj.price1;
						html += `<div class="cartBox"> 
						<div class="shop_info">
							<div class="all_check">
								<input type="checkbox" class="shopChoice">
							</div>
							<div class="shop_name">
								全选
							</div>
						</div>
						<div class="order_content">
							<ul class="order_lists">
								<li class="list_chk">
									<input type="checkbox" class="son_check">
								</li>
								<li class="list_con">
									<div class="list_img">
										<a href="javascript:;"><img src="${obj.list_imgsrc}" alt=""></a>
									</div>
									<div class="list_text">
										<a href="javascript:;">${obj.describe}</a>
									</div>
								</li>
								<li class="list_info">
									<p>规格：默认</p>
									<p>尺寸：16*16*3(cm)</p>
								</li>
								<li class="list_price">
									<p class="price">￥${obj.price1}</p>
								</li>
								<li class="list_amount">
									<div class="amount_box">
										<a href="javascript:;" class="reduce">-</a>
										<input type="text" value="${count}" class="sum">
										<a href="javascript:;" class="plus">+</a>
										<span>${gidCart}</span>
									</div>
								</li>
								<li class="list_sum">
									<p class="sum_price">￥${zongjia}</p>
								</li>
								<li class="list_op">
									<p class="del">
										<a href="javascript:;" class="delBtn">移除商品</a>
									</p>
									
								</li>
							</ul>
						</div>
					</div>`;
						//console.log(html)	
//						$('.shopChoice').eq(1).attr('id','shop_b');
//						$('.shopChoice').eq(1).next().attr('for','shop_b');
						$('.bigBox').html(html);
						//基本功能：加减数量，全选反选
						gongneng();
						//修改数量
						//修改数据库数量
						//console.log(uidCart);
						
					}
				});
				//渲染到购物车：dom，字符串模板
			}).join('');
			var cartMain = document.querySelector('.cartMain');
			cartMain.onclick = function(ev) {
							if(ev.target.className == 'reduce') {
								let countCart = ev.target.parentNode.children[1].value;
								let gidCart = ev.target.parentNode.children[3].innerHTML;
								console.log(countCart,gidCart);
								packageAjax_2({
									type: 'post',
									url: '../api/cartCount.php',
									data: 'countCart=' + countCart + '&uidCart=' + cookie_getdata('userid') + '&gidCart=' + gidCart,
									success: function(str) {
										let res1 = JSON.parse(str).count;
										console.log(res1);
										//提示
										if(res1) {
											ev.target.parentNode.children[1].value = res1;
											$('.tanchuang').css('display', 'block');
											let timer = setTimeout(function() {
												$('.tanchuang').css('display', 'none');
											}, 500);
										} else {
											alert('修改失败');

										}
									}
								});
							} else if(ev.target.className == 'plus') {
								let countCart = ev.target.parentNode.children[1].value;
								let gidCart = cookie_getdata('gid');
								
								packageAjax_2({
									type: 'post',
									url: '../api/cartCount.php',
									data: 'countCart=' + countCart + '&uidCart=' + cookie_getdata('userid') + '&gidCart=' + gidCart,
									success: function(str) {
										let res2 = JSON.parse(str).count;
										console.log(res2);										//提示
										if(res2) {
											ev.target.parentNode.children[1].value = res2;
											$('.tanchuang').css('display', 'block');
											let timer = setTimeout(function() {
												$('.tanchuang').css('display', 'none');
											}, 500);
										} else {
											alert('修改失败');

										}
									}
								});
							}
						}
		}
	});
} else {
	$('.bigBox').html('空空如也，请先登录账号！').css({
		'height': '100px',
		'text-align': 'center',
		'line-height': '100px',
		'font-size': '24px',
		'color': 'grey'
	});
}

//增减数量存进数据库
function count() {
	var cartMain = document.querySelector('.cartMain');

	//修改数据库数量
	packageAjax_2({
		type: 'post',
		url: '../api/cartData.php',
		data: 'countCart=' + $count + '&uidCart=' + cookie_getdata('userid') + '&gidCart=' + uidCart,
		success: function(str) {
			console.log(str);
		}
	});
}

//基本功能：加减数量，全选反选
function gongneng() {
	//全局的checkbox选中和未选中的样式
	var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
		$wholeChexbox = $('.whole_check'),
		$cartBox = $('.cartBox'), //每个商铺盒子
		$shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
		$sonCheckBox = $('.son_check');
	//每个商铺下的商品的checkbox

	//	$('#cartMain').on('click','input[type="checkbox"]',function(){
	//		if($(this).is(':checked')) {
	//			$(this).next('label').addClass('mark');
	//		} else {
	//			$(this).next('label').removeClass('mark')
	//		}
	//	});

	$allCheckbox.click(function() {
		if($(this).is(':checked')) {
			$(this).next('label').addClass('mark');
		} else {
			$(this).next('label').removeClass('mark')
		}
	});

	//===============================================全局全选与单个商品的关系================================
	$wholeChexbox.click(function() {
		var $checkboxs = $cartBox.find('input[type="checkbox"]');
		if($(this).is(':checked')) {
			$checkboxs.prop("checked", true);
			$checkboxs.next('label').addClass('mark');
		} else {
			$checkboxs.prop("checked", false);
			$checkboxs.next('label').removeClass('mark');
		}
		totalMoney();
	});

	$sonCheckBox.each(function() {
		$(this).click(function() {
			if($(this).is(':checked')) {
				//判断：所有单个商品是否勾选
				var len = $sonCheckBox.length;
				var num = 0;
				$sonCheckBox.each(function() {
					if($(this).is(':checked')) {
						num++;
					}
				});
				if(num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}
			} else {
				//单个商品取消勾选，全局全选取消勾选
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');
			}
		})
	})

	//=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

	//店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
	$shopCheckbox.each(function() {
		$(this).click(function() {
			if($(this).is(':checked')) {
				//判断：店铺全选中，则全局全选按钮打对勾。
				var len = $shopCheckbox.length;
				var num = 0;
				$shopCheckbox.each(function() {
					if($(this).is(':checked')) {
						num++;
					}
				});
				if(num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}

				//店铺下的checkbox选中状态
				$(this).parents('.cartBox').find('.son_check').prop("checked", true);
				$(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
			} else {
				//否则，全局全选按钮取消对勾
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');

				//店铺下的checkbox选中状态
				$(this).parents('.cartBox').find('.son_check').prop("checked", false);
				$(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
			}
			totalMoney();
		});
	});

	//========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

	//店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
	$cartBox.each(function() {
		var $this = $(this);
		var $sonChecks = $this.find('.son_check');
		$sonChecks.each(function() {
			$(this).click(function() {
				if($(this).is(':checked')) {
					//判断：如果所有的$sonChecks都选中则店铺全选打对勾！
					var len = $sonChecks.length;
					var num = 0;
					$sonChecks.each(function() {
						if($(this).is(':checked')) {
							num++;
						}
					});
					if(num == len) {
						$(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
						$(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
					}

				} else {
					//否则，店铺全选取消
					$(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
					$(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
				}
				totalMoney();
			});
		});
	});

	//=================================================商品数量==============================================
	var $plus = $('.plus'),
		$reduce = $('.reduce'),
		$all_sum = $('.sum');
	$plus.click(function() {
		var $inputVal = $(this).prev('input'),
			$count = parseInt($inputVal.val()) + 1,
			$obj = $(this).parents('.amount_box').find('.reduce'),
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
			$price = $(this).parents('.order_lists').find('.price').html(), //单价
			$priceTotal = $count * parseInt($price.substring(1));
		$inputVal.val($count);
		$priceTotalObj.html('￥' + $priceTotal);
		if($inputVal.val() > 1 && $obj.hasClass('reSty')) {
			$obj.removeClass('reSty');
		}
		totalMoney();

	});

	$reduce.click(function() {
		var $inputVal = $(this).next('input'),
			$count = parseInt($inputVal.val()) - 1,
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
			$price = $(this).parents('.order_lists').find('.price').html(), //单价
			$priceTotal = $count * parseInt($price.substring(1));
		if($inputVal.val() > 1) {
			$inputVal.val($count);
			$priceTotalObj.html('￥' + $priceTotal);
		}
		if($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
			$(this).addClass('reSty');
		}
		totalMoney();
	});

	$all_sum.keyup(function() {
		var $count = 0,
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
			$price = $(this).parents('.order_lists').find('.price').html(), //单价
			$priceTotal = 0;
		if($(this).val() == '') {
			$(this).val('1');
		}
		$(this).val($(this).val().replace(/\D|^0/g, ''));
		$count = $(this).val();
		$priceTotal = $count * parseInt($price.substring(1));
		$(this).attr('value', $count);
		$priceTotalObj.html('￥' + $priceTotal);
		totalMoney();
	})

	//======================================移除商品========================================

	var $order_lists = null;
	var $order_content = '';
	$('.delBtn').click(function() {
		$order_lists = $(this).parents('.order_lists');
		$order_content = $order_lists.parents('.order_content');
		$('.model_bg').fadeIn(300);
		$('.my_model').fadeIn(300);
	});

	//关闭模态框
	$('.closeModel').click(function() {
		closeM();
	});
	$('.dialog-close').click(function() {
		closeM();
	});

	function closeM() {
		$('.model_bg').fadeOut(300);
		$('.my_model').fadeOut(300);
	}
	//确定按钮，移除商品
	$('.dialog-sure').click(function() {
		$order_lists.remove();
		if($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
			$order_content.parents('.cartBox').remove();
		}
		closeM();
		$sonCheckBox = $('.son_check');
		totalMoney();
	})

	//======================================总计==========================================

	function totalMoney() {
		var total_money = 0;
		var total_count = 0;
		var calBtn = $('.calBtn a');
		$sonCheckBox.each(function() {
			if($(this).is(':checked')) {
				var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
				var num = parseInt($(this).parents('.order_lists').find('.sum').val());
				total_money += goods;
				total_count += num;
			}
		});
		$('.total_text').html('￥' + total_money);
		$('.piece_num').html(total_count);

		// console.log(total_money,total_count);

		if(total_money != 0 && total_count != 0) {
			if(!calBtn.hasClass('btn_sty')) {
				calBtn.addClass('btn_sty');
			}
		} else {
			if(calBtn.hasClass('btn_sty')) {
				calBtn.removeClass('btn_sty');
			}
		}
	}
}