<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据id
	$uid = isset($_POST['uid']) ?  $_POST['uid'] : '';
	$gid = isset($_POST['gid']) ?  $_POST['gid'] : '';
	$count = isset($_POST['count']) ?  $_POST['count'] : '';
	echo $uid.$gid.$count;
	
	/*
		把数据存进表里：wb_cart
			作判断：如果同一用户购买相同商品，就增加数量，否则直接存进数据库 
	*/
	
	$sql1 = "SELECT `count` FROM wb_cart WHERE uid = $uid AND gid = $gid";
	$res1 = $connect->query($sql1);//结果集
	$sql2 = "INSERT INTO wb_cart (uid,gid,`count`) VALUES('$uid','$gid','$count')";
	
	$data = $res1->num_rows;//是否含有结果
	if($data){
		$content1 = $res1->fetch_all(MYSQLI_ASSOC);//提取结果集内容
		$oldCount = (int)$content1[0]['count'];//数量
		$newCount = $oldCount + $count;
		//刷新原有数据
		$sql3 = "UPDATE wb_cart SET count = $newCount WHERE uid = $uid AND gid = $gid";
		$res3 = $connect->query($sql3);//结果集
	}else{
		$res2 = $connect->query($sql2);//结果集
	}
	
?>