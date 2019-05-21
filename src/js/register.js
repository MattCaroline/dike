$(function() {
	
	$('.back-index').click(function(){
		location.href = '../indexxx.html';
	});
	
	
	//图片随机码
	var randomCode = $('.randomCode').html(randomNum());
	$('.randomCode').click(function() {
		$('.randomCode').html(randomNum())
	});

	//表单验证
	var resObj = {
		/*
			key1 : true     把每次的验证状态存起来，键值代表验证状态
			key2 : false 
		*/
	};

	$('.form-register')
		.on('blur', '.tel', function() {
			//console.log('tel');
			let test1 = /^1[345678]\d{9}$/;
			let val1 = $('.tel').val();
			if(test1.test(val1)) {
				$('.tel-tips').html('');
				packageAjax_2({
					type : 'post',
					url : '../api/checkUser.php',
					data : 'username=' + $('.tel').val().trim(),
					success : function(str){
						if(str == 'yes'){//可以注册
							$('.tel-tips').html('');
						}else if(str == 'no'){//已被注册
							$('.tel-tips').html('此账号已被注册！').css('color','red');
						}
					}
				});
				resObj.tel = true;
			} else if(!(test1.test(val1))) {
				$('.tel-tips').html('手机号码有误，请重填！').css('color', 'red');
				resObj.tel = false;
			}
			//console.log(resObj);
		})
		.on('blur', '.imgCode', function() {
			//console.log('imgCode');
			if($('.randomCode').html() == $('.imgCode').val()) {
				$('.imgCode-tips').html('');
				resObj.imgCode = true;
			} else {
				$('.imgCode-tips').html('验证码有误！').css('color', 'red');
				resObj.imgCode = false;
			}
		})
		//			.on('blur','.messageCode',function(){
		//				console.log('messageCode');
		//			})
		.on('blur', '.password1', function() {
			//console.log('password1');
			if(/^.{6,18}$/.test($('.password1').val().trim())) {
				//console.log('ok');
				$('.psw1-tips').html('');
				resObj.password1 = true;
			} else {
				$('.psw1-tips').html('请输入6-18位任意字符的密码！').css('color', 'red');
				resObj.password1 = false;
			}
		})
		.on('blur', '.password2', function() {
			//console.log('password2');
			if($('.password1').val() == $('.password2').val()) {
				$('.psw2-tips').html('');
				resObj.password2 = true;
			} else {
				$('.psw2-tips').html('请输入一致的密码！').css('color', 'red');
				resObj.password2 = false;
			}
		})
		.on('blur', '.referrerTel', function() {
			//console.log('referrerTel');
		});

	//注册账号
	var num = 0;
	var res = null;
	$('.registerBtn').click(function() {
		for(let val in resObj) {
			if(resObj[val]) {
				num++;
				res = true;
			} else {
				res = false;
			}
		}
		//console.log(num,res);
		if(res && num == 4) {
			packageAjax_2({
				type : 'post',
				url : '../api/register.php',
				data : 'username=' + $('.tel').val().trim() + '&psw1=' + $('.password1').val().trim(),
				success : function(str){
					if(str == 'yes'){//可以注册
						location.href = 'login.html';
					}else if(str == 'no'){//已被注册
						alert('此账号已被注册！');
					}
				}
			});
		} else {
			alert('信息有误，请按规定正确填写完整！');
		}
		//				console.log(resObj);
	});

	//点击用户协议跳转页面：不用做
});
