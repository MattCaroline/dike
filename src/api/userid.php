<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//获取前端数据
	$userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '';
	
	//操作数据库
	$sql = "SELECT id FROM register WHERE userphone = '$userphone'";
	$res = $connect->query($sql);
	
	//提取结果集内容
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	//转化
	$uid = JSON_encode($content[0],JSON_UNESCAPED_UNICODE);
	//返回数据给前端
	echo $uid;
	
?>