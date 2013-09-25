<?php

if(isset($_POST['file_data']))
{
	$type = $_POST['file_type'];
	$img = $_POST['file_data'];
	$img = str_replace('data:image/'.$type.';base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = 'img-'.time().'-'.rand(0,100).'.'.$type;
	header('content-type: application/octet-stream');
	header('content-Disposition: attachment; filename='.$file);
	header('Pragma: no-cache');
	header('Expires: 0');
	echo $data;
}
else
{
	echo '2';
}

?>