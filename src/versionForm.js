const sdkVersionOption = [
						"5.3.0",
						"5.2.0",
						"5.1.0", 
						"5.0.0", 
						"4.9.0", 
						"4.7.0", 
						"4.5.0", 
						"4.2.0", 
						"4.0.0"
						]


const apiVersionOption = [
						68,
						67
						]


const parameters = document.getElementById("parameters");


// Creates the dropdown options for the form
function createForm(selectElement, elId, options, optionEl) {

	const selectEl = document.createElement("select");
	selectEl.id = elId;
	selectEl.className = "selectDropdown";
	parameters.append(selectEl);

	for (var i = 0; i < options.length; i++) {

		var optionEl = document.createElement("option");
		optionEl.className = "optionDropdown";
		optionEl.innerHTML = options[i];
		selectEl.append(optionEl);
		
	}

};


// Create the SDK dropdown
createForm("selectSdkVersionEl", "selectSdkVersion", sdkVersionOption, "sdkOption");

// Create the API dropdown
createForm("selectApiVersionEl", "selectApiVersion", apiVersionOption, "apiOption");


const loadScriptsButton = document.createElement("button");
loadScriptsButton.innerHTML = "Load Versioned Scripts";
loadScriptsButton.id = "loadScripts";
parameters.append(loadScriptsButton);
