<?php


include_once("connect.php");

$mode = $_REQUEST['mode'];

if ( $mode == "getUser") 
{
	$player_id = $_REQUEST['player_id'];
	$first_name = $_REQUEST['first_name'];
	$last_name = $_REQUEST['last_name'];
	$picture = $_REQUEST['picture'];
	
	$score = 0;
	$prev_unlocked_cats = "";
	$unlocked_cats = "";
	$achievements = "";
	$badges = 1;
	$last_play_time = 0;
	$number_of_cats = 1;
	$new_user = true;
	
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
	
	$achievements_scors = array(500, 500, 500, 500, 500, 2000, 700, 700, 200);
	
	//print $player_id . " / " . $first_name . " / " . $last_name . " / " . $picture;
	//return;

	$query = mysql_query("SELECT * FROM `".$users_table."` WHERE player_id='".$player_id."'") or die($myQuery."<br/>".mysql_error());
	while($row = mysql_fetch_array($query))
	{
		$score = getScoreFromQuestions($player_id, $questions_table);
		
		$cnt = 0;
		$prev_unlocked_cats = $row['unlocked_cats'];
		
		for ($i = 1; $i < 10; $i++)
		{
			$achievement = $row['achievement_'.$i];
			$achievements .= $achievement . ",";
			if ($achievement == 1) 
				$score += $achievements_scors[$i-1];
		}
		
		/*
		Description	At
		Select from two categories	3000
		Select from three categories	7000
		Select from four categories	8000
		Select from five categories	9000
		*/
		if ($score >= 3000)
			$badges = 2;
		if ($score >= 7000)
			$badges = 3;
		if ($score >= 8000)	
			$badges = 4;
		if ($score >= 9000)		
			$badges = 5;
			
		$number_of_cats = $badges;
			
		$last_play_time = $row['last_play_time'];
			
		if ($new_user)
			$new_user = false;
	}

	if ($new_user)
		$query = mysql_query("INSERT INTO `".$users_table."` (`player_id`, `first_name`, `last_name`, `picture`, `last_play_time`) VALUES ('".$player_id."', '".$first_name."', '".$last_name."', '".$picture."', '".time()."')") or die($myQuery."<br/>".mysql_error());

	
	$diff = time() - $last_play_time;
	
	
	$next_category_time = 300;
	if ($diff >= $next_category_time || $prev_unlocked_cats == "" || $prev_unlocked_cats == null)
	{
		$diff = 0;
		$arr = array();
		while ( count($arr) < $number_of_cats ) 
		{
			$x = mt_rand(1,7);
			if ( !in_array($x,$arr) ) 
			{ 
				$arr[] = $x; 
				$unlocked_cats .= "$x,";
			}
		}

		$query = mysql_query("UPDATE `".$users_table."` SET unlocked_cats='".$unlocked_cats."', last_play_time='".time()."' WHERE player_id='".$player_id."'") or die($myQuery."<br/>".mysql_error());
	}
	else
		$unlocked_cats = $prev_unlocked_cats;
		
		
	$time_to_next_category =  $next_category_time - $diff;
	
	$diff_time_min = gmdate("i", $time_to_next_category);
	if ($diff_time_min < 60)
		$diff_time_min = substr($diff_time_min, 1);
	
	
	$diff_time_sec = gmdate("s", $time_to_next_category);
	
	$diff_time = $diff_time_min . ":" . $diff_time_sec;

	if ($unlocked_cats == "" || $unlocked_cats == null)
	{
		$unlocked_cats = "1,";
		$query = mysql_query("UPDATE `".$users_table."` SET unlocked_cats='".$unlocked_cats."', last_play_time='".time()."' WHERE player_id='".$player_id."'") or die($myQuery."<br/>".mysql_error());
	}
			
	$notification_list = getHeadToHeadNotification($player_id, $head2head_table, $users_table);
	
	print $score . ";" . $unlocked_cats . ";" . $achievements . ";" . $badges . ";" . $diff_time . ";" . $notification_list;
}

function getScoreFromQuestions($player_id, $table)
{
	$query = "SELECT * FROM `".$table."` WHERE player_id='".$player_id."'";
	$result = mysql_query($query) or die(mysql_error());
	$score = 0;
	while ($row = mysql_fetch_assoc($result)) 
	{
		$score = $score + $row["score"];
	}

	return $score;
}

function getHeadToHeadNotification($player_id, $table, $table1)
{
	$query = "SELECT * FROM `".$table."` WHERE player_id_2='".$player_id."'";
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
	
	// Delete notifications after 2 days
	$rand = mt_rand(0, 20);
	if ($rand < 4)
	{
		$expire_time_day = 2; //days
		$expire_time_sec = $expire_time_day * 24 * 60 * 60; //secs
		$query = "SELECT * FROM `".$table."`";
		$result = mysql_query($query) or die(mysql_error());
		while ($row = mysql_fetch_assoc($result)) 
		{
			$time = $row["time"];
			$diff = time() - $time;
			if ($diff > $expire_time_sec || $time == "" || $time == null)
				$query = mysql_query("DELETE FROM `".$table."` WHERE `time`='".$time."'") or die($myQuery."<br/>".mysql_error());
		}
	}
	


	return $notification_list;
}


?>