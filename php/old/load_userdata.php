<?php

	header('Access-Control-Allow-Origin: *');
	//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');
	
	include_once("connect.php");
	
	$userid = $_REQUEST['userid'];
	
	$result =  mysql_query("SELECT * FROM members WHERE id=$userid") or die(mysql_error());
	
	$output = "complete=1";
	
	while ($row = mysql_fetch_assoc($result)) {
		$output = $output."&avatar=".ltrim($row["avatar"]);
		$output = $output."&bank=".ltrim($row["bank"]);
		$output = $output."&location=".ltrim($row["location"]);
		$output = $output."&health=".ltrim($row["health"]);
		$output = $output."&satchel=".ltrim($row["satchel"]);
	}
	/**/
	
	print $output;
	
	mysql_close();
	exit;
?>	
