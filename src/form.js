var parametersForm = document.getElementById('parameters');

let selectSdkVersionEl = document.createElement('select');
selectSdkVersionEl.id = "selectSdkVersion";

parametersForm.append(selectSdkVersionEl);

let selectApiVersionEl = document.createElement('select');
selectApiVersionEl.id = "selectApiVersion";

parametersForm.append(selectApiVersionEl);

var sdkVersionOption = [
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

var apiVersionOption = [
						68,
						67,
						66,
						64
						]

for (var i = 0; i < sdkVersionOption.length; i++) {
	var sdkOption = document.createElement('option');
	sdkOption.innerHTML = sdkVersionOption[i]
	selectSdkVersionEl.append(sdkOption)
}

for (var i = 0; i < apiVersionOption.length; i++) {
	var apiOption = document.createElement('option');
	apiOption.innerHTML = apiVersionOption[i]
	selectApiVersionEl.append(apiOption)
}
