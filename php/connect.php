<?php
	/* connect to database */
	
	$tablename="beatthebuzzword_challenges";
	$unlocks_table = "beatthebuzzword_unlocks";
	$timeout_table = "beatthebuzzword_timeout";
	
	
	$dbname = "beatthebuzzword";
	
	//@mysql_connect("localhost", "berthauser", "berthapass") or die("Could not connect to MySQL server");
	@mysql_connect("localhost", "root", "") or die("Could not connect to MySQL server");
	$db = @mysql_select_db($dbname) or die("Could not select the database");
	
	
	
?>