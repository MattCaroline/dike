<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//cart数据
	$countCart = isset($_POST['countCart']) ?  $_POST['countCart'] : '';
	$uidCart = isset($_POST['uidCart']) ?  $_POST['uidCart'] : '';
	$gidCart = isset($_POST['gidCart']) ?  $_POST['gidCart'] : '';
	
	//操作数据库
	$sql = "UPDATE wb_cart SET count= $countCart WHERE uid = $uidCart AND gid = $gidCart";
	$res = $connect->query($sql);
//	
	$sql2 = "SELECT `count` FROM wb_cart WHERE uid = $uidCart AND gid = $gidCart";
	$res2 = $connect->query($sql2);
//	
//	//提取结果集内容:多维数组型
	$content = $res2->fetch_all(MYSQLI_ASSOC);
//	
//	//转化：数组型的字符串
	$obj = JSON_encode($content[0],JSON_UNESCAPED_UNICODE);
//	
//	//返回数据
	echo $obj;
?>