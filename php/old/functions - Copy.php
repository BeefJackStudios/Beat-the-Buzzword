<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];


if ( $mode == "create") {
	$idPlayer1 = $_REQUEST['idPlayer1'];
	$idPlayer2 = $_REQUEST['idPlayer2'];
	$genre = $_REQUEST['genre'];
	$category = $_REQUEST['category'];
	$query = "INSERT INTO $tablename SET status='1', idPlayer1='$idPlayer1', idPlayer2='$idPlayer2', genre='$genre', category='$category'";
	$result = mysql_query($query);
	print($mode." ".$query);

	
} else if ( $mode == "submitAnswers") {
	$gameId = $_REQUEST['gameId'];
	$answers = $_REQUEST['answers'];
	$score = $_REQUEST['score'];
	$playerId1 = $_REQUEST['playerId1'];
	$playerId2 = $_REQUEST['playerId2'];
	
	if (isset($playerId1)){
		$query = "UPDATE $tablename SET answersPlayer1 = '$answers', scorePlayer1 = '$score' WHERE idPlayer1 = '$playerId1' AND id = '$gameId'";
		$result = mysql_query($query);
	} else if (isset($playerId2)) {
		$query = "UPDATE $tablename SET answersPlayer2 = '$answers', scorePlayer2 = '$score' WHERE idPlayer2 = '$playerId2' AND id = '$gameId'";
		$result = mysql_query($query);
	}
	print($mode." ".$query);

	
} else if ( $mode == "getOpenGames") {
	$playerId1 = $_REQUEST['playerId1'];
	$playerId2 = $_REQUEST['playerId2'];
	
	if (isset($playerId1)){
		$query = "SELECT * FROM $tablename WHERE idPlayer1 = '$playerId1' AND answersPlayer1 = '' ";
	} else if (isset($playerId2)) {
		$query = "SELECT * FROM $tablename WHERE idPlayer2 = '$playerId2' AND answersPlayer2 = '' ";
	}
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["id"]).",";
	}
	
	
} else if ( $mode == "getScores") {
	$playerId1 = $_REQUEST['playerId1'];
	$playerId2 = $_REQUEST['playerId2'];
	

	//if (isset($playerId1)){
		//$query = "SELECT scorePlayer1 AS d, COUNT(*) FROM $tablename WHERE idPlayer1 = '$playerId1' GROUP BY d ORDER BY d ";
		
		$query = "
		SELECT t.id, t.scorePlayer1, @running_total := @running_total + t.scorePlayer1 AS cumulative_sum
		FROM $tablename t
		JOIN (SELECT @running_total := 0) r
		ORDER BY t.id
		";
	
	
	//} else if (isset($playerId2)) {
	//	$query = "SELECT * FROM $tablename WHERE idPlayer2 = '$playerId2' AND answersPlayer2 = '' ";
//	}
	
	$result = mysql_query($query) or die(mysql_error());
	
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["cumulative_sum"]).",";
	}
}



?>