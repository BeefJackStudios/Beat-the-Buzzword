<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "setAnaswer") 
{
	$question = $_REQUEST['question'];
	$player_id = $_REQUEST['player_id'];
	$category = $_REQUEST['category'];
	$score = $_REQUEST['score'];
	$genre = $_REQUEST['genre'];
	
	$question = substr($question, 0, 36);
	
	$query = mysql_query("INSERT INTO `".$questions_table."` (`question`, `player_id`, `category`, `score`, `genre`) VALUES ('".$question."', '".$player_id."', '".$category."', '".$score."', '".$genre."')
	ON DUPLICATE KEY UPDATE question = '".$question."', player_id = '".$player_id."', category = '".$category."', score = '".$score."', genre = '".$genre."'") or die($myQuery."<br/>".mysql_error());

	//print $question . "/" . $player_id . "/" . $category . "/" . $score  . "/" . $genre;
}

?>