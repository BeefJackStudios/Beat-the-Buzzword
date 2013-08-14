<?php

	header('Access-Control-Allow-Origin: *');
	//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');

	include_once("connect.php");
	
	$userid = $_REQUEST['userid'];
	$sceneid = $_REQUEST['sceneid'];
	
	$result =  mysql_query("SELECT * FROM valley_coins WHERE userid=$userid AND sceneid=$sceneid") or die(mysql_error());
	
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["value"]);
	}
	
	mysql_close();
	exit;
?>	
