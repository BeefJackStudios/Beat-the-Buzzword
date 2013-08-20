<?php
	/* connect to database */
	
	$tablename = "beatthebuzzword_challenges";
	$users_table = "beatthebuzzword_users";
	$questions_table = "beatthebuzzword_questions";
	$head2head_table = "beatthebuzzword_head2head";
	
	
	$dbname = "beatthebuzzword";
	
	//@mysql_connect("localhost", "berthauser", "berthapass") or die("Could not connect to MySQL server");
	@mysql_connect("localhost", "root", "") or die("Could not connect to MySQL server");
	$db = @mysql_select_db($dbname) or die("Could not select the database");
	
	
	
?>