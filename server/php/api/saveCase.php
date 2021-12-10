<?php

function saveCase() {

	// Will write a json object to savedCases.js.
	// This will be called when opening the checkout to preload the test cases

	$myfile = fopen("src/savedCases.js", "w") or die("Unable to open file!");
	$txt = "var savedCases = 'Saved Cases Here' ";
	fwrite($myfile, $txt);
	fclose($myfile);

    $data = [];

    $result = json_encode($data);

    return $result;

}

?>