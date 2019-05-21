<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//获取前端数据
	$username = isset($_POST['username']) ? $_POST['username'] : '';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '';
	
	//操作数据库
	$sql = "SELECT * FROM register WHERE userphone = $username AND psw = $psw";
	$res = $connect->query($sql);
	
	//做判断，返回数据给前端
	if($res->num_rows){
		//为true，账号密码正确
		echo 'yes';
	}else{
		//false，账号密码不正确
		echo 'no';
	}
	
?>