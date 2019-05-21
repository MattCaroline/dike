<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据id
	$searchVal = isset($_POST['searchVal']) ?  $_POST['searchVal'] : '';
	
	//直接拿数据库数据
	$sql = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%'";
	$res = $connect->query($sql);
	//var_dump($res);//结果集
	//获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);//数组
//	var_dump($content);
	
	//返回给前端
	//处理结果集，转成复合数组的字符串[{},{}]
	echo json_encode($content,JSON_UNESCAPED_UNICODE);//转化成字符串
	
?>