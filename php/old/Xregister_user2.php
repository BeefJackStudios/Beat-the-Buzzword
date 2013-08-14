<?php

	include_once("connect.php");
	
	$username=$_REQUEST['username'];
	$score=$_REQUEST['score'];
	
	$query = "insert into $tablename set
	username='$username',
	score=$score
	";

	$start_at=0;
	$end_at=500;
	$pagedata_result =  mysql_query("SELECT username, 
	MAX(score) AS pooscore FROM $tablename WHERE score<999999 GROUP BY username 
	ORDER BY pooscore DESC LIMIT $start_at, $end_at") or die(mysql_error());
	
	$flashOut="";
	$c = 1;
	while ($row = mysql_fetch_assoc($pagedata_result)) {
		//$flashOut.=ltrim($row["username"].":".$row["pooscore"].",");
		if (ltrim($row["username"]) == $username) {
			$flashOut = $c;
		}
		$c = $c + 1;
	}
	echo $flashOut;
	mysql_close();
	exit;
	
	
	
?>	
