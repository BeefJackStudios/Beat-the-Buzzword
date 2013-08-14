<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>MaxPower - create data table</title>
</head>
<body bgcolor="#FFFFFF" text="#000000">

<h1>Maxpower</h1>

<h2>Create data table</h2>

<div>
<?php
	if ( !@($_GET['create']) ) {
		print '<p><a href="create_games.php?create=yes">Create table</a></p>';
	} else {

		require_once( 'connect.php' );
		
		$query = "create table beatthebuzzword_games (
						id mediumint unsigned not null auto_increment,
						genre char(64) not null,
						category char(64) not null,
						status char(64) not null,
						idPlayer1 char(64) not null,
						idPlayer2 char(64) not null,
						answersPlayer1 char(64) not null,
						answersPlayer2 char(64) not null,
						scorePlayer1 char(64) not null,
						scorePlayer2 char(64) not null,
						primary key (id)
		)";
		$result = mysql_query($query);
		if (!$result) { 
			print(mysql_error());
		} else {
			print 'table created<br \>';
		}
		
		mysql_close();
	}
?>

</div>
</body>
</html>
