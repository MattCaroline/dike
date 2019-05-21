<?php
	//连上连接数据库的php,相当于拷贝过来
	include('connectMysql.php');
	
	//接收数据
	$searchVal = isset($_POST['searchVal']) ?  $_POST['searchVal'] : '';
	$price1 = isset($_POST['price1']) ?  $_POST['price1'] : '';
	$price2 = isset($_POST['price2']) ?  $_POST['price2'] : '';
	$saleOrder = isset($_POST['saleOrder']) ?  $_POST['saleOrder'] : '';
	$priceOrder = isset($_POST['priceOrder']) ?  $_POST['priceOrder'] : '';
	
	//操作数据库
	//1模糊查询
	$sql1 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%'";
	//2模糊查询，价格排序
	$sql2 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%' ORDER BY `price1`";
	//3模糊查询，销售优先
	$sql3 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%' ORDER BY `saled` DESC";
	//4模糊查询，价格区间
	$sql4 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%' AND `price1` BETWEEN '$price1' and '$price2'";
	//5模糊查询，价格区间，销售优先
	$sql5 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%' AND `price1` BETWEEN '$price1' and '$price2' ORDER BY `saled` DESC;";
	//6模糊查询，价格区间，价格排序
	$sql6 = "SELECT * FROM wb_goodslist WHERE `describe` LIKE '%$searchVal%' AND `price1` BETWEEN '$price1' and '$price2' ORDER BY `price1`";
	
	
	
	if($searchVal){
		if($price1 && $price2 && $saleOrder){
			//5模糊查询，价格区间，销售优先
			$res = $connect->query($sql5);
		}else if($price1 && $price2 && $priceOrder){
			//6模糊查询，价格区间，价格排序
			$res = $connect->query($sql6);
		}else if($price1 && $price2){
			//4模糊查询，价格区间
			$res = $connect->query($sql4);
		}else if($saleOrder){
			//模糊查询，销售优先
			$res = $connect->query($sql3);
		}else if($priceOrder){
			//模糊查询，价格排序
			$res = $connect->query($sql2);
		}else{
			//模糊查询
			$res = $connect->query($sql1);
		}
	}
	//var_dump($res);//结果集
	//获取结果集里面的内容
	$content = $res->fetch_all(MYSQLI_ASSOC);//数组
	
	//返回给前端
	//处理结果集，转成复合数组的字符串[{},{}]
	echo json_encode($content,JSON_UNESCAPED_UNICODE);//转化成字符串
	
	
?>