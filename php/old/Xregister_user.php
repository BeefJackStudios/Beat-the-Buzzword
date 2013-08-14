<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');


	include_once("connect.php");
	
	$username=$_REQUEST['username'];
	$score=$_REQUEST['score'];
	
	$query = "insert into $tablename set
	username='$username',
	score=$score
	";

	$result = mysql_query($query);
?>	
