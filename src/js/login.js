$('.login-logo').click(function() {
	location.href = '../indexxx.html';
});

//选项卡-头：切换登录方式
$('.form-login').on('click', '.memberLogin', function() {
		$('.input').css('display', 'block');
		$('.input2').css('display', 'none');
		$('._input').css('display', 'none');
		$(this).addClass('active');
		$('.codeLogin').removeClass('active');
	})
	.on('click', '.codeLogin', function() {
		$('.input2').css('display', 'block').addClass('active');
		$('.input').css('display', 'none').removeClass('active');
		$('._input').css('display', 'none');
		$(this).addClass('active');
		$('.memberLogin').removeClass('active');
	})
	//选项卡-底：切换登录方式
	.on('click', '.login-psw', function() {
		$('._input').css('display', 'block');
		$('.input2').css('display', 'none');
		$('.input').css('display', 'none');
	})
	.on('click', '.login-phoneCode', function() {
		$('.input').css('display', 'block');
		$('._input').css('display', 'none');
		$('.input2').css('display', 'none');
	});

//图片随机码
var randomCode = $('.randomCode').html(randomNum());
$('.randomCode').click(function() {
	$('.randomCode').html(randomNum())
});

/*
	表单验证 
*/
var resObj = {
	/*
		key1 : true     把每次的验证状态存起来，键值代表验证状态
		key2 : false 
	*/
};
$('._input').on('blur', '.userphone', function() {
		let test1 = /^1[345678]\d{9}$/;
		let val1 = $('.userphone').val();
		if(test1.test(val1)) {
			$('.userphone-tips').html('');
			resObj.phone = true;
		} else if(!(test1.test(val1))) {
			$('.userphone-tips').html('手机号码有误，请重填！').css('color', 'red');
			resObj.phone = false;
		}
	})
	.on('blur', '.loginpsw', function() {
		if(/^.{6,18}$/.test($('.loginpsw').val().trim())) {
			$('.loginpsw-tips').html('');
			resObj.loginpsw = true;
		} else {
			$('.loginpsw-tips').html('请输入正确的密码！').css('color', 'red');
			resObj.loginpsw = false;
		}
	});

//登录按钮：跳转注册页
var num = 0;
var res = null;
$('.loginBtn-').click(function() {
	for(let val in resObj) {
		if(resObj[val]) {
			num++;
			res = true;
		} else {
			res = false;
		}
	}
	if(res && num == 2) {
		//登录
		packageAjax_2({
			type : 'post',
			url : '../api/login.php',
			data : 'username=' + $('.userphone').val().trim() + '&psw=' + $('.loginpsw').val().trim(),
			success : function(str){
				//console.log(str);
				if(str == 'yes'){//账号密码正确
					//查看是否已登录
					if(cookie_getdata('username') == $('.userphone').val().trim()){//已登录
						alert('此账号已登录！');
					}else{
						//设置cookie值
						cookie_set('username',$('.userphone').val().trim(),1);
						packageAjax_2({
							type : 'post',
							url : '../api/userid.php',
							data : 'userphone=' + $('.userphone').val().trim(),
							success : function(str){
								//console.log(str);//{"id":"1"}
								let obj = JSON.parse(str);
								let uid = obj.id;
								//console.log(uid);
								cookie_set('userid',uid,1);
								location.href = '../indexxx.html';
							}
						});
					}
				}else if(str == 'no'){//账号密码有误
					alert('账号或密码有误！');
				}
			}
		});
		num = 0;
		res = null;
	} else {
		alert('账号或密码错误，请重填！');
	}
	//console.log(resObj);
});

//回到首页
$('.freeRegister').click(function() {
	location.href = 'register.html';
});

//验证账号规范
$('.userphone').blur(function() {
	
});

