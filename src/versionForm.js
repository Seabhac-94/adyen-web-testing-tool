const sdkVersionOption = [
						"5.5.0",
						"5.4.0",
						"5.3.0",
						"5.2.0",
						"5.1.0", 
						"5.0.0", 
						"4.9.0",
						"4.8.0",
						"4.7.0",
						"4.6.0", 
						"4.5.0",
						"4.4.0",
						"4.3.0", 
						"4.2.0",
						"4.1.0", 
						"4.0.0"
					]


const apiVersionOption = [68, 67]


const parameters = document.getElementById("parameters");


// Creates the dropdown options for the form
function createForm(x, y, z) {

	const a = document.createElement("select");
	a.id = x;
	a.className = "selectDropdown";
	parameters.append(a);

	for (var i = 0; i < y.length; i++) {

		var z = document.createElement("option");
		z.className = "optionDropdown";
		z.innerHTML = y[i];
		a.append(z);
		
	}

};


// Create the SDK dropdown
createForm( "selectSdkVersion", sdkVersionOption, "sdkOption");

// Create the API dropdown
createForm( "selectApiVersion", apiVersionOption, "apiOption");


const loadScriptsButton = document.createElement("button");
loadScriptsButton.innerHTML = "Load Versioned Scripts";
loadScriptsButton.id = "loadScripts";
parameters.append(loadScriptsButton);
