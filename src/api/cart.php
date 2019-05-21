<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据id
	$uid = isset($_POST['uid']) ?  $_POST['uid'] : '';
	
	//操作数据库
	$sql = "SELECT * FROM wb_cart WHERE uid = $uid";
	$res = $connect->query($sql);
	
	//提取结果集内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	//转化
	$obj = JSON_encode($content,JSON_UNESCAPED_UNICODE);
	
	//返回数据
	echo $obj;
	
	
?>