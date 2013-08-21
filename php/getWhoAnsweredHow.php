<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "getWhoAnsweredHow") 
{
	$questions = $_REQUEST['questions'];
	$whoAnsweredHow = "";
	
	$temp = explode("::", $questions);
	$cnt = 0;
	for ($i = 0; $i < count($temp) - 1; $i++)
	{
		$query = "SELECT * FROM `".$questions_table."` WHERE question='".$temp[$i]."'";
		$result = mysql_query($query) or die(mysql_error());
		while ($row = mysql_fetch_assoc($result)) 
		{
			//$whoAnsweredHow .= $row["player_id"] . "," . $row["score"] . "::";
			//$whoAnsweredHow = $row["score"];
		}
		
	} 
	
	print $whoAnsweredHow;
	
	
	/*
	$query = "SELECT * FROM `".$questions_table."` WHERE player_id_2='".$player_id."'";
	$result = mysql_query($query) or die(mysql_error());
	$notification_list = "";
	while ($row = mysql_fetch_assoc($result)) 
	{
		$query1 = "SELECT * FROM `".$table1."` WHERE player_id='".$row["player_id_1"]."'";
		$result1 = mysql_query($query1) or die(mysql_error());
		while ($row1 = mysql_fetch_assoc($result1)) 
		{
			$notification_list .= $row1["player_id"] . "::" . $row1["first_name"] . "::" . $row1["last_name"] . "::" . $row1["picture"] . "::" . $row["genre_id"] . "::" . $row["random_questions"] . ",";
		}
	}
	*/
	
	//print $questions;
}

?>