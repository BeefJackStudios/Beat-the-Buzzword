<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "setAchievement") 
{
	$player_id = $_REQUEST['player_id'];
	$achievement_id = $_REQUEST['achievement_id'];
	$query = mysql_query("UPDATE `".$users_table."` SET achievement_".$achievement_id."='1'  WHERE player_id='".$player_id."'") or die($myQuery."<br/>".mysql_error());
	print $achievement_id;
}

?>