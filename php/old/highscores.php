<?php

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com');

/*
Used to create the highscore table
*/
	require_once( 'connect.php' );
	
	$start_at=0;
	$end_at=51;
	$pagedata_result =  mysql_query("SELECT username, 
	MAX(score) AS pooscore FROM $tablename WHERE score<999999 GROUP BY username 
	ORDER BY pooscore DESC LIMIT $start_at, $end_at") or die(mysql_error());
	$flashOut="";
	while ($row = mysql_fetch_assoc($pagedata_result)) {
		$flashOut.=ltrim($row["username"].":".$row["pooscore"].",");
	}
	//echo $flashOut;
	print $flashOut;
	mysql_close();
	exit;

?>
