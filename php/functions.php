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
	
	//echo $playerIdsString;
	//$playerIdsString = "'N9IqeIebx0', '9uO5CsXr5p'";
	$playerIdsString = $_REQUEST['playerIdsString'];
	
	
	/*
	
	$arr = array($playerIdsString);
	$str = "";
	foreach ($arr as &$value) {
		$str = $str."'".$value."'";
	}
	
	*/
	
	$query = "SELECT * FROM $tablename WHERE user='0' AND playerId IN (".$playerIdsString.") GROUP BY playerId";
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		print ltrim($row["playerId"]).",";
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
	$query = "SELECT genre, correct, MAX(score) AS pooscore FROM $tablename WHERE playerId='$playerId' GROUP BY genre ORDER BY pooscore DESC";
	$result = mysql_query($query) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
	
		$genre = ltrim($row["genre"]);
		$query2 = "SELECT * FROM $tablename WHERE playerId='$playerId' AND genre='$genre'"; 
		$result2 = mysql_query($query2) or die(mysql_error());
		$num_rows = mysql_num_rows($result2);
		
		print ltrim(ltrim($row["genre"]).":".ltrim($row["correct"]).":".ltrim($row["pooscore"])).":".$num_rows."#";
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
	$score_from_questions = getScoreFromQuestions($playerId, $tablename);
	$score_from_unlocks = getScoreFromUnlocks($playerId, $unlocks_table);
	$total_score = $score_from_questions + $score_from_unlocks;
	print $total_score;
	
} else if ( $mode == "getRandomNumbers") {
	
	$playerId = $_REQUEST['playerId'];
	$isNewUser = false;
	
	$lastTime = time();
	$randomNumbers = "1,";
	$totalNumbers = 1;

	if (getIfNewUser($playerId, $timeout_table))
	{
		$query = mysql_query("INSERT INTO `".$timeout_table."` (`playerId`, `lastTime`, `randomNumbers`, `totalNumbers`) VALUES ('".$playerId."', '".time()."', '".$randomNumbers."', '".$totalNumbers."')") or die($myQuery."<br/>".mysql_error());
	}
	else
	{
		$query = mysql_query("SELECT * FROM `".$timeout_table."` WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
		$query = mysql_fetch_array($query);
		$lastTime = $query['lastTime'];
		if ($query['randomNumbers'] != "" || $query['randomNumbers'] != null)
		{
			$randomNumbers = $query['randomNumbers'];
		}
		
		$totalNumbers = $query['totalNumbers'];
		$query = mysql_query("UPDATE `".$timeout_table."` SET lastTime='".time()."' WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	}
	
	
	

	$diff =  time() - $lastTime;
	

	//print time() . " - " . $lastTime . " = " . $diff . " :: ";
	
	if ($diff > 10 && !$isNewUser)
	{
		$randomNumbers = "";
		//$totalNumbers == number of badges
		
		$totalNumbers = 1;	
		$arr = array();
		while ( count($arr) < $totalNumbers ) {
			$x = mt_rand(1,7);
			if ( !in_array($x,$arr) ) 
			{ 
				$arr[] = $x; 
				$randomNumbers .= "$x,";
			}
		}
		

		$query = mysql_query("UPDATE `".$timeout_table."` SET randomNumbers='".$randomNumbers."'  WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	}
	

	print $randomNumbers;
	
} else if ( $mode == "getAchievements") {
	$playerId = $_REQUEST['playerId'];
	$unlocks_table = "beatthebuzzword_unlocks";
	
	$query = mysql_query("SELECT * FROM `".$unlocks_table."` WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	$query = mysql_fetch_array($query);
	$achievements = $query['achievements'];

	print $achievements;
	
} else if ( $mode == "setAchievement") {
	$playerId = $_REQUEST['playerId'];
	$achievementID = $_REQUEST['achievementID'];
	$achievements = "";
	$achievements_score = 0;
	/*
	Description	Points
	1. Complete one full game of beat the buzzwords	500
	2. Complete one full game of head to head	500
	3. Complete one full game of CEO	500
	4. Complete one full game of Entrepenuer	500
	5. Answer a question in under 3 seconds	500
	6. All questions right in on session	2000
	7. Create questions for Entrepenuer Mode	700
	8. Beat an opponent from the same company	700
	9. Two questions in a row	300
	*/
	
	if (getIfNewUser($playerId, $unlocks_table))
	{
		$achievements = $achievementID . ",";
		$query = mysql_query("INSERT INTO `".$unlocks_table."` (`playerId`, `achievements`, `badges`, `modes`, `score`) VALUES ('".$playerId."', '".$achievements."', '0,', '0', '0')") or die($myQuery."<br/>".mysql_error());
		//print "new user :: ";
	}
	else
	{
		$query = mysql_query("SELECT * FROM `".$unlocks_table."` WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
		$query = mysql_fetch_array($query);
		$achievements = $query['achievements'];
		$achievements_score = $query['score'];
		
		$achievements_array = explode(",",$achievements);
		
		for ($i = 0; $i < count($achievements_array); $i++)
		{
			if ($i == $achievementID) // User already got the achievement
			{
				print "-1";
				return;
			}
		}
		
		$achievements .= $achievementID . ",";
		$query = mysql_query("UPDATE `".$unlocks_table."` SET achievements='".$achievements."'  WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	}
	

	$score_increase_amount = 0;
	if ($achievementID == 1 || $achievementID == 2 || $achievementID == 3 || $achievementID == 5)
		$score_increase_amount = 500;
	else if ($achievementID == 6)
		$score_increase_amount = 2000;
	else if ($achievementID == 7 || $achievementID == 8)	
		$score_increase_amount = 700;
	else if ($achievementID == 9)
		$score_increase_amount = 300;	
	
	$new_score = $score_increase_amount + $achievements_score;
	
	setScoreFromUnlocks($playerId, $unlocks_table, $new_score);
	
	//print "achievements: "." " .$achievements . " : new_score : " . $new_score . " :: achievements_score: " . $achievements_score;
	print $achievementID;
}


function getIfNewUser($playerId, $table)
{
	$query = mysql_query("SELECT count(playerId) as total FROM `".$table."` WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	$query = mysql_fetch_array($query);
	if ($query['total'] > 0)
		return false;
		
	return true;
}

function getScoreFromQuestions($playerId, $table)
{
	$query = "SELECT * FROM `".$table."` WHERE playerId='".$playerId."'";
	$result = mysql_query($query) or die(mysql_error());
	$score = 0;
	while ($row = mysql_fetch_assoc($result)) {
		$score = $score + $row["score"];
	}
	
	return $score;
}


function getScoreFromUnlocks($playerId, $table)
{
	$query = mysql_query("SELECT * FROM `".$table."` WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
	$query = mysql_fetch_array($query);
	return $query["score"];
}

function setScoreFromUnlocks($playerId, $table, $score)
{
	$query = mysql_query("UPDATE `".$table."` SET score='".$score."'  WHERE playerId='".$playerId."'") or die($myQuery."<br/>".mysql_error());
}

?>