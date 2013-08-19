<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "setAnaswer") 
{
	$question = $_REQUEST['question'];
	$player_id = $_REQUEST['player_id'];
	$is_correct = $_REQUEST['is_correct'];
	//$category = $_REQUEST['category'];
	//$genre = $_REQUEST['genre'];
	
	$question = substr($question, 0, 36);
	
	//$query = mysql_query("INSERT INTO `".$questions_table."` (`question`, `player_id`, `is_correct`, `category`, `genre`) VALUES ('".$question."', '".$player_id."', '".$is_correct."', '".$category."', '".$genre."')
	//ON DUPLICATE KEY UPDATE question = '".$question."', player_id = '".$player_id."', is_correct = '".$is_correct."', category = '".$category."', genre = '".$genre."'") or die($myQuery."<br/>".mysql_error());

	$query = mysql_query("INSERT INTO `".$questions_table."` (`question`, `player_id`, `is_correct`) VALUES ('".$question."', '".$player_id."', '".$is_correct."')
	ON DUPLICATE KEY UPDATE question = '".$question."', player_id = '".$player_id."', is_correct = '".$is_correct."'") or die($myQuery."<br/>".mysql_error());

	//print $question . "/" . $player_id . "/" . $is_correct . "/" . $category  . "/" . $genre;
	//print $question . "/" . $player_id . "/" . $is_correct;
}

?>