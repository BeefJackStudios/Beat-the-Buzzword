<?php

	header('Access-Control-Allow-Origin: *');
	//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');

	include_once("connect.php");
	
	$userid = $_REQUEST['userid'];
	$sceneid = $_REQUEST['sceneid'];
	$value = $_REQUEST['value'];
	
	$result =  mysql_query("SELECT * FROM valley_coins WHERE userid=$userid AND sceneid=$sceneid") or die(mysql_error());
	$num_rows = mysql_num_rows($result);
	
	if ($num_rows>0) {
		$query = "UPDATE valley_coins SET value=$value WHERE userid=$userid AND sceneid=$sceneid";
	} else {
		$query = "INSERT INTO valley_coins SET userid = $userid, sceneid = $sceneid, value = $value";
	};
	
	$result = mysql_query($query);
?>	
