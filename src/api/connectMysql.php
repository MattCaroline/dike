<?php
	//主机名，数据库登录名，登录密码，数据库名
	$servername = 'localhost';
	$loginname = 'root';
	$loginpsw = '';
	$sqlname = 'qianfeng-h5-1903';
	
	//创建连接
	$connect = new mysqli($servername,$loginname,$loginpsw,$sqlname);
	
	//检测连接
	if($connect->connect_error){
		die('连接失败：' + $connect->connect_error);	
	}
	//echo '连接成功';
	
?>