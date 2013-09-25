<?php

if(isset($_GET['v']))
{
	$filePath = urldecode($_GET['v']);
	echo file_get_contents($filePath);
}
else
{
	echo '2';
}

?>