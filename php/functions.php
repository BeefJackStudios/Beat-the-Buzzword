<?php

include_once("connect.php");

$mode = $_REQUEST['mode'];

//-----------------------------------------------------------
// CREATE
//-----------------------------------------------------------
if ( $mode == "createGame") {
	$idPlayer1 = $_REQUEST['idPlayer1'];
	$idPlayer2 = $_REQUEST['idPlayer2'];
	$genre = $_REQUEST['genre'];
	$category = $_REQUEST['category'];
	$answers = $_REQUEST['answers'];
	$score = $_REQUEST['score'];
	$correct = $_REQUEST['correct'];
	$incorrect = $_REQUEST['incorrect'];
	
	$query = "	INSERT INTO $tablename
				SET user='1', playerId='$idPlayer1', genre='$genre', category='$category', answers='$answers', score='$score', correct='$correct', incorrect='$incorrect'";
	$result = mysql_query($query) or die(mysql_error());
	
	$id = mysql_insert_id();
	
	if (isset($id)) {
		$query = "	INSERT INTO $tablename
					SET  user='2', gameId='$id', playerId='$idPlayer2', genre='$genre', category='$category'";
		$result = mysql_query($query) or die(mysql_error());
		
		$query = "	UPDATE $tablename
					SET gameId = '$id'
					WHERE id = '$id'"; // set gamid of 1st entry
		
		$result = mysql_query($query) or die(mysql_error());
	}
	
	print($id." ".$mode." ".$query);

	
	
//-----------------------------------------------------------
// SUBMIT ANSWSERS
//-----------------------------------------------------------
} else if ( $mode == "submitAnswers") {
	$playerId = $_REQUEST['playerId'];
	$gameId = $_REQUEST['gameId'];
	
	$answers = $_REQUEST['answers'];
	$score = $_REQUEST['score'];
	$correct = $_REQUEST['correct'];
	$incorrect = $_REQUEST['incorrect'];
	
	$query = "	UPDATE $tablename 
				SET answers='$answers', score='$score', correct='$correct', incorrect='$incorrect' 
				WHERE playerId='$playerId' AND gameId='$gameId'";
	$result = mysql_query($query) or die(mysql_error());
		
	print($mode." ".$query);

//-----------------------------------------------------------
// GET USERS WITH SCORES
//-----------------------------------------------------------
} else if ( $mode == "getUsersWithScores") {
	
	//$playerIdsString = "'N9IqeIebx0', '9uO5CsXr5p'";
	$playerIdsString = $_REQUEST['playerIdsString'];
	$category = $_REQUEST['category'];
	
	if ($category == "All" || $category == "undefined") {
		$query = "SELECT * FROM $tablename WHERE user='0' AND playerId IN (".$playerIdsString.") GROUP BY playerId";
	} else {
		$query = "SELECT * FROM $tablename WHERE user='0' AND category='$category' AND playerId IN (".$playerIdsString.") GROUP BY playerId";
		//$query = "SELECT * FROM $tablename WHERE user='0' AND playerId IN (".$playerIdsString.") GROUP BY playerId";
	}
	
	//print $query;
	/* $arr = array($playerIdsString);
	$str = "";
	foreach ($arr as &$value) {
		$str = $str."'".$value."'";
	} */
	
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["playerId"]).":".ltrim($row["category"]).",";
	}
	
//-----------------------------------------------------------
// GET OPEN CHALLENGES
//-----------------------------------------------------------
} else if ( $mode == "getOpenChallenges") {

	$playerId = $_REQUEST['playerId'];	
	$nul = '0';
	
	// http://localhost/btbw/php/functions.php?mode=getOpenChallenges&playerId=ZpszIAy6KL
	
	/*
	$query = "SELECT gameId FROM $tablename WHERE playerId='$playerId'"; //   
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["gameId"]).",";
	}
	*/
	
	//get list of players with active games
	//
	//AND playerId
	// AND 
	$query = "SELECT playerId FROM $tablename WHERE user=1 AND gameId in(SELECT gameId FROM $tablename WHERE playerId='$playerId' AND user=2)"; //  AND answers=$nul
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["playerId"]).",";
	}
	/**/

//-----------------------------------------------------------
// GET USER CHALLENGES
//-----------------------------------------------------------
} else if ( $mode == "getUserChallenges") {
	// http://localhost/btbw/php/functions.php?mode=getUserChallenges&playerIdOpp=tM-P24RY3l&playerIdMe=ZpszIAy6KL
	$playerIdMe = $_REQUEST['playerIdMe'];	
	$playerIdOpp = $_REQUEST['playerIdOpp'];	

	//$query = "SELECT * FROM $tablename WHERE playerId='$playerIdMe' AND gameId in(SELECT gameId FROM $tablename WHERE playerId='$playerIdOpp') "; //  AND answers=$nul
	$query = "SELECT * FROM $tablename WHERE playerId='$playerIdOpp' AND gameId in(SELECT gameId FROM $tablename WHERE playerId='$playerIdMe') "; //  AND answers=$nul
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["gameId"]).":".ltrim($row["genre"]).":".ltrim($row["correct"]).":".ltrim($row["score"]).":".ltrim($row["answers"])."#";
	}
	
//-----------------------------------------------------------
// SAVE SCORES
//-----------------------------------------------------------

} else if ( $mode == "saveScores") {
	$playerId = $_REQUEST['playerId'];
	$genre = $_REQUEST['genre'];
	$category = $_REQUEST['category'];
	$answers = $_REQUEST['answers'];
	$score = $_REQUEST['score'];
	$correct = $_REQUEST['correct'];
	$incorrect = $_REQUEST['incorrect'];
	
	$query = "	INSERT INTO $tablename
				SET user='0', playerId='$playerId', genre='$genre', category='$category', answers='$answers', score='$score', correct='$correct', incorrect='$incorrect'";
	$result = mysql_query($query) or die(mysql_error());
	

//-----------------------------------------------------------
// GET SCORES
//-----------------------------------------------------------

} else if ( $mode == "getScores") {

	$playerId = $_REQUEST['playerId'];
	$category = $_REQUEST['category'];
	
	
	if ($category == "All" || $category == "undefined") {
		$query = "SELECT playerId, genre, category, correct, MAX(score) AS pooscore FROM $tablename GROUP BY score ORDER BY pooscore DESC"; // playerId='$playerId'		
	} else {
		$query = "SELECT playerId, genre, category, correct, MAX(score) AS pooscore FROM $tablename WHERE category='$category' GROUP BY score ORDER BY pooscore DESC"; // playerId='$playerId' AND 
	}
	
	$result = mysql_query($query) or die(mysql_error());
	
	while ($row = mysql_fetch_assoc($result)) {
		
		/*
		$genre = ltrim($row["genre"]);
		$query2 = "SELECT * FROM $tablename WHERE playerId='$playerId' AND genre='$genre'"; 
		$result2 = mysql_query($query2) or die(mysql_error());
		$num_rows = mysql_num_rows($result2);
		*/
		
		print ltrim($row["playerId"]).":".ltrim($row["category"]).":".ltrim($row["pooscore"])."#"; // .":".$num_rows."#";
		
		//print ltrim(ltrim($row["playerId"]).":".$row["genre"]).":".ltrim($row["pooscore"]).":".ltrim($row["pooscore"])).":".$num_rows."#";
		
		//print ltrim(ltrim($row["genre"]).":".ltrim($row["correct"]).":".ltrim($row["pooscore"])).":".$num_rows."#";
	}
	
	
	//if (isset($playerId1)){
	//$query = "SELECT scorePlayer AS d, COUNT(*) FROM $tablename WHERE idPlayer = '$playerId' GROUP BY d ORDER BY d ";
	//SET @running_played := 0;
	
	/*
	$query = "
	
	SELECT t.id, t.score,
		@running_played := @running_played + 1 AS cumulative_played,
		@running_total1 := @running_total1 + t.score AS cumulative_score,
		@running_total2 := @running_total2 + t.correct AS cumulative_correct,
		@running_total3 := @running_total3 + t.incorrect AS cumulative_incorrect
	FROM $tablename t
	JOIN (SELECT @running_played := 1, @running_total1 := 0, @running_total2 := 0, @running_total3 := 0) r
	ORDER BY t.id
	";
	
	//WHERE playerId='$playerId'
	
	//} else if (isset($playerId2)) {
	//	$query = "SELECT * FROM $tablename WHERE idPlayer2 = '$playerId2' AND answersPlayer2 = '' ";
//	}
	
	$result = mysql_query($query) or die(mysql_error());
	
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["cumulative_played"]).":".ltrim($row["cumulative_score"]).":".ltrim($row["cumulative_correct"]).":".ltrim($row["cumulative_incorrect"]).",";
	}
	
	*/

	
	
} else if ( $mode == "getScore") {

	$playerId = $_REQUEST['playerId'];
	$query = "SELECT * FROM $tablename WHERE playerId='$playerId'";
	$result = mysql_query($query) or die(mysql_error());
	$score = 0;
	while ($row = mysql_fetch_assoc($result)) {
		$score = $score + $row["score"];
	}
	print $score;
	
} else if ( $mode == "getRandomNumbers") {
	$totalCat = 1;
	$arr = array();
	while ( count($arr) < $totalCat ) {
		$x = mt_rand(1,7);
		if ( !in_array($x,$arr) ) { $arr[] = $x; echo "$x,"; }
	}
}



?>