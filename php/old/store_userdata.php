<?php

	header('Access-Control-Allow-Origin: *');
	//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');
	
	include_once("connect.php");
	
	$userid = $_REQUEST['userid'];
	
	$avatar = $_REQUEST['avatar'];
	$bank = $_REQUEST['bank'];
	$location = $_REQUEST['location'];
	$health = $_REQUEST['health'];
	$satchel = $_REQUEST['satchel'];
	
	//$result =  mysql_query("SELECT * FROM valley_coins WHERE userid=$userid AND sceneid=$sceneid") or die(mysql_error());
	//$num_rows = mysql_num_rows($result);
	
	//if ($num_rows>0) {
	
	$queryStart = "UPDATE members SET ";
	$queryMid = null;
	$queryEnd = " WHERE id=$userid";
	
	function checkMid($queryMid) {
		if (strlen($queryMid)>0) {
			$queryMid = $queryMid.",";
		} else {
			$queryMid = "";
		};
		return $queryMid;
	};
	
	if (isset($avatar)) {
		$queryMid = checkMid($queryMid);
		$queryMid = $queryMid."avatar=$avatar";
	};
	if (isset($bank)) {
		$queryMid = checkMid($queryMid);
		$queryMid = $queryMid."bank=$bank";
	};
	if (isset($location)) {
		$queryMid = checkMid($queryMid);
		$queryMid = $queryMid."location=$location";
	};
	if (isset($health)) {
		$queryMid = checkMid($queryMid);
		$queryMid = $queryMid."health=$health";
	};
	if (isset($satchel)) {
		$queryMid = checkMid($queryMid);
		$queryMid = $queryMid."satchel=$satchel";
	};
	
	$query = $queryStart.$queryMid.$queryEnd;
	print $query;
	$result = mysql_query($query);
?>	
