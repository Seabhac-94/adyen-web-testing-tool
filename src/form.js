const sdkVersionOption = [
						"5.3.0",
						"5.2.0",
						"5.1.0", 
						"5.0.0", 
						"4.9.0", 
						"4.7.0", 
						"4.5.0", 
						"4.2.0", 
						"4.0.0",
						]
						

const apiVersionOption = [
						68,
						67,
						66,
						64
						]


// Creates the dropdown options for the form
function createForm(selectElement, elId, options, optionEl) {

	const parametersForm = document.getElementById('parameters');
	const selectEl = document.createElement('select');
	selectEl.id = elId;
	parametersForm.append(selectEl);

	for (var i = 0; i < options.length; i++) {
		var optionEl = document.createElement('option');
		optionEl.innerHTML = options[i];
		selectEl.append(optionEl);
		
	}
};

createForm("selectSdkVersionEl", "selectSdkVersion", sdkVersionOption, "sdkOption");

createForm("selectApiVersionEl", "selectApiVersion", apiVersionOption, "apiOption");