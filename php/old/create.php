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
		print '<p><a href="create.php?create=yes">Create table</a></p>';
	} else {

		require_once( 'connect.php' );
		
		$query = "create table beatthebuzzword_games (
						id mediumint unsigned not null auto_increment,
						player1_id char(64) not null,
						player2_id char(64) not null,
									
						player2_id char(64) not null,
						score mediumint unsigned,
						
						primary key (id),
						key score (score),
						key optin (optin)
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
