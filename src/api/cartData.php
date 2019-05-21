<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据id
	$gid = isset($_POST['gids']) ?  $_POST['gids'] : '';
	
	//操作数据库
	$sql = "SELECT * FROM wb_goodslist WHERE goods_id = $gid";
	$res = $connect->query($sql);
	
	//提取结果集内容:多维数组型
	$content = $res->fetch_all(MYSQLI_ASSOC);
	//转化：数组型的字符串
	$arr = JSON_encode($content[0],JSON_UNESCAPED_UNICODE);
	
	//返回数据
	echo $arr;
?>