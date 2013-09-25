<?php

if(isset($_POST['file_data']))
{
	@session_start();
	$_SESSION['file_data'] = $_POST['file_data'];
	echo '1';
}
else
{
	echo '2';
}

?>