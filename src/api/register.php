<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//获取前端数据
	$username = isset($_POST['username']) ? $_POST['username'] : '';
	$psw1 = isset($_POST['psw1']) ? $_POST['psw1'] : '';
	//echo $username.$psw1;
	//查看数据库是否存在此账号
	$sql = "SELECT * FROM register WHERE userphone = '$username'";
	$res = $connect->query($sql);
	//var_dump($res);
	
	//做判断，返回数据给前端
	if($res->num_rows){
		//为true，存在，不能创建
		echo 'no';
	}else{
		//不存在，允许
		$insert = "INSERT INTO register (userphone,psw) VALUES('$username','$psw1')";
		$res2 = $connect->query($insert);
		echo 'yes';
	}
?>