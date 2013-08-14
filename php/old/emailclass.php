<?php
//---------------------------------------------------------
// Generic Email Object
//---------------------------------------------------------
// Richard Lord
// richard@bigroom.co.uk
//---------------------------------------------------------
// Copyright Big Room Ventures Limited 2003-2004
// http://www.bigroom.co.uk/
//---------------------------------------------------------
// Last updated October 2004
//---------------------------------------------------------

class Email
{
  	var $to = array();
  	var $subject = "";
  	var $message = "";
  	var $from = "";
  	var $ret = "";
	var $cc = array();
	var $bcc = array();
	var $ishtml = false;
	var $lineEnd = "\r\n";
  	
  	function addTo($email, $name='')
	{
		$email = $this->tidyUp( $email );
		$name = $this->tidyUp( $name );
		if( !$this->isEmail( $email ) )
		{
			return false;
		}
		
  		if ($name!='')
		{
  			array_push( $this->to, $name . ' <' . $email . '>' );
  		}
		else
		{
  			array_push( $this->to, $email );
  		}
		return true;
  	}
	
  	function setSubject( $par )
	{
  		$this->subject = $this->tidyUp( $par );
  	}
	
  	function setMessage( $par )
	{
  		$this->message = $par;
  	}
	
  	function addMessage( $par )
	{
  		$this->message .= $par;
  	}
	
  	function setFrom($email, $name='')
	{
		$email = $this->tidyUp( $email );
		$name = $this->tidyUp( $name );
		if( !$this->isEmail( $email ) )
		{
			$this->from = "";
			return false;
		}
		
  		if ($name)
		{
  			$this->from = $name . ' <' . $email . '>';
  		}
		else
		{
  			$this->from = $email;
  		}
		return true;
  	}
	
  	function setReturn( $email )
	{
		$email = $this->tidyUp( $email );
		if( !$this->isEmail( $email ) )
		{
			$this->ret = "";
			return false;
		}
  		$this->ret = $email;
		return true;
  	}
  	
  	function addCc($email, $name='')
	{
		$email = $this->tidyUp( $email );
		$name = $this->tidyUp( $name );
		if( !$this->isEmail( $email ) )
		{
			return false;
		}

  		if( $name!='' )
		{
  			array_push( $this->cc, $name . ' <' . $email . '>' );
  		}
		else
		{
  			array_push( $this->cc, $email );
  		}
  	}
	
   function addBcc($email, $name='')
	{
		$email = $this->tidyUp( $email );
		$name = $this->tidyUp( $name );
		if( !$this->isEmail( $email ) )
		{
			return false;
		}

  		if( $name!='' )
		{
  			array_push( $this->bcc, $name . ' <' . $email . '>' );
  		} else {
  			array_push( $this->bcc, $email );
  		}
  	}
	
	function setHTML( $b )
	{
		$this->ishtml = $b;
	}
	
	function tidyUp( $s )
	{
		return trim( str_replace( "\n", " ", str_replace( "\r", " ", $s ) ) );
	}
	
	function isEmail( $s )
	{
		return ( strlen( $s ) >= 5 && strlen( $s ) <= 64 && preg_match( "/^[-^!#$%&'*+\/=?`{|}~.\w]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+$/", $s ) );
	}
	
	function setLineEnd( $s )
	{
		$this->lineEnd = $s;
	}
	
	function getHeader()
	{
		$headers = "";
		$headers .= "X-Mailer: PHP mailer" . $this->lineEnd;
		if( $this->ishtml )
		{
			$headers  = "MIME-Version: 1.0" . $this->lineEnd;
			$headers .= "Content-type: text/html; charset=iso-8859-1" . $this->lineEnd;
		}
  		if( $this->from )
		{
			$headers .= "From: ".$this->from . $this->lineEnd;
		}
  		if( $this->ret )
		{
			$headers .= "Return-Path: ".$this->ret . $this->lineEnd;
		}
		if( count( $this->cc ) )
		{
			$headers .= "Cc: " . implode( ", ", $this->cc ) . $this->lineEnd;
		}
		if( count( $this->bcc ) )
		{
			$headers .= "Bcc: " . implode( ", ", $this->bcc ) . $this->lineEnd;
		}
		return $headers;
	}
	
 	function send()
	{
		if( count( $this->to ) )
		{
			if( $this->ret )
			{
				mail( implode( ", ", $this->to ), $this->subject, $this->message, $this->getHeader(), "-f".$this->ret );
			}
			else
			{
				mail( implode( ", ", $this->to ), $this->subject, $this->message, $this->getHeader() );
			}
		}
  	}
}
?>