<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "setHeadToHead") 
{
	$player_id_1 = $_REQUEST['player_id_1'];
	$player_id_2 = $_REQUEST['player_id_2'];
	$genre_id = $_REQUEST['genre_id'];
	$is_complete = $_REQUEST['is_complete'];
	
	if ($is_complete == 1)
	{
		// reverse the players for deleting
		$query = mysql_query("DELETE FROM `".$head2head_table."` WHERE `player_id_1`='".$player_id_2."' AND `player_id_2`='".$player_id_1."'") or die($myQuery."<br/>".mysql_error());
	}
	else
	{
		$query = mysql_query("INSERT INTO `".$head2head_table."` (`player_id_1`, `player_id_2`, `genre_id`, `time`) VALUES ('".$player_id_1."', '".$player_id_2."', '".$genre_id."', '".time()."')
		ON DUPLICATE KEY UPDATE player_id_1 = '".$player_id_1."', player_id_2 = '".$player_id_2."', genre_id = '".$genre_id."', time = '".time()."'") or die($myQuery."<br/>".mysql_error());
	}
	print $player_id_1 . "/" . $player_id_2 . "/" . $genre_id . "/" . time() . "/" . $is_complete;
}

?>