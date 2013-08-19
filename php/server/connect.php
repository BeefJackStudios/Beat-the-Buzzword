<?php
	/* connect to database */
	
	$tablename = "beatthebuzzword_challenges";
	$users_table = "beatthebuzzword_users";
	$questions_table = "beatthebuzzword_questions";

	$dbname = "beefjack_btbw";
	
	//@mysql_connect("localhost", "berthauser", "berthapass") or die("Could not connect to MySQL server");
	@mysql_connect("localhost", "beefjack_btbw", "#-K8l;BuS+)&") or die("Could not connect to MySQL server");
	$db = @mysql_select_db($dbname) or die("Could not select the database");
	
	
	
?>