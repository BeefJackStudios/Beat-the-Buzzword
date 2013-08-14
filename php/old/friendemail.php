<?php
	require_once( 'emailclass.php' );

	//if( !isset( $_POST['my_email'] ) || !isset( $_POST['score'] ) )
	//{
	//	print "no email or score, complete=0, $my_email";
		//exit;
	//}

	$from = trim( $_POST['my_email'] );
	$my_name = trim( $_POST['my_name'] );
	$subject = 'Play Santa Game!';
	$count = 0;
	$friends = array();
	for( $i=1; $i<6; ++$i )
	{
		if( isset( $_POST['mates_email' . $i] ) )
		{
			$s = trim( $_POST['mates_email' . $i] );
			//$n= trim( $_POST['mates_name' . $i] );
			$n= "Guys";
			$message = "\nPlay Game. Have a go yourself at http://www.channel4.com/games/metro/ and we could be sitting in the front row at T4 on the beach!\n\n";
			if( validateEmail( $s ) )
			{
				array_push( $friends, $s );
			}
			++$count;
		}
	}
	
	//if( $count == 0 )
	//{
		//print "$mates_email1";
		//exit;
	//}

	$mail = new Email();
	// to force UNIX line endings in mail headers uncomment the folowing line
	// $mail->setLineEnd( "\n" );
	$mail->setSubject( $subject );
	$mail->setFrom( $from );
	$mail->setMessage( $message );
	foreach( $friends as $key=>$address )
	{
		$mail->addTo($address);
	}
	$mail->send();
	print "complete=1";
	exit;
	
	//---------------------------------------------------------
	// is s an email address
	//---------------------------------------------------------
	function validateEmail( $s )
	{
		return ( strlen( $s ) >= 5 && strlen( $s ) <= 64 && preg_match( "/^[-^!#$%&'*+\/=?`{|}~.\w]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+$/", $s ) );
	}
?>
