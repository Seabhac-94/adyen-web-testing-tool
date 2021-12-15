<?php

function saveCase() {

	// Will write a json object to savedCases.js.
	// This will be called when opening the checkout to preload the test cases

	$myfile = fopen("src/savedCases.js", "w") or die("Unable to open file!");
	$data = '';
	fwrite($myfile, $data);
	fclose($myfile);

    $result = json_encode($data);

    return $result;

}

?>