<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据id
	$goodsid = isset($_POST['id']) ?  $_POST['id'] : '';
	//echo $goodsid;
	
	//根据id从数据库拿对应id数据
	$sql = "SELECT * FROM wb_goodslist WHERE goods_id = '$goodsid'";
	$res = $connect->query($sql);//结果集
	
	//提取结果集内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	//转化
	$obj = JSON_encode($content[0],JSON_UNESCAPED_UNICODE);
	
	//返回id的商品数据
	echo $obj;
	
?>