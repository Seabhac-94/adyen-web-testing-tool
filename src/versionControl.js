// This will retrieve values from the returnUrl
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var sdkVersionOnLoad = urlParams.get('sdkVersion');
var apiVersionOnLoad = urlParams.get('apiVersion');
const redirectResult = urlParams.get('redirectResult')


// We retrieve this value as a function, and not natively so that it can be used in multiple pages
// If there's no value from the URL, then it presumes a new checkout allowing the user to select
// Else it automatically selects it
function retrieveVersionValue() {
	if (!sdkVersionOnLoad) {
		var sdkVersion = document.getElementById("selectSdkVersion").value;
		var apiVersion = document.getElementById("selectApiVersion").value
	} else {
		var sdkVersion = sdkVersionOnLoad
		var apiVersion = apiVersionOnLoad
	}

	return {
		sdkVersion,
		apiVersion
	}
};


// Global to make it accessible in other scripts when needed
var apiSdkVersions = retrieveVersionValue()


function loadInitialCheckoutScripts(){

	var additionalScripts = ["demo", "checkoutForm", "componentConfiguration"]

	var sdkVersion = apiSdkVersions.sdkVersion;
	var baseStyle = document.createElement("link");
	baseStyle.rel = "stylesheet";
	baseStyle.href = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + sdkVersion + "/adyen.css";
	document.getElementsByTagName('head')[0].append(baseStyle);

	var baseScript = document.createElement("script");
	baseScript.src = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + sdkVersion + "/adyen.js";
	document.body.appendChild(baseScript);

	for (var i = 0; i < additionalScripts.length; i++) {
		var scriptToAdd = document.createElement("script");
		scriptToAdd.src = `../${additionalScripts[i]}.js`
		document.body.appendChild(scriptToAdd)
	}

};

async function loadComponentScript() {
		
		var utilsScript = await document.createElement("script");
		utilsScript.src = await "/utils.js"
		document.body.appendChild(utilsScript);
		
		// setTimeout(function() {
			var dropinScript = await document.createElement("script");
			dropinScript.src = await "/dropin/dropin.js"
			document.body.appendChild(dropinScript);
		// }, 150)
		
};


// If there's no value from the URL, then it presumes a new checkout allowing the user to select
// Else it automatically selects it and calls loadCheckoutScripts() automatically

if (!sdkVersionOnLoad) {

	var loadScripts = document.getElementById("loadScripts");

	loadScripts.addEventListener('click', function(){

		retrieveVersionValue();
		var apiSdkVersions = retrieveVersionValue();
		location.href = "http://localhost:3000/dropin?apiVersion="+apiSdkVersions.apiVersion+"&sdkVersion="+apiSdkVersions.sdkVersion
	});	

} else if (!redirectResult) {

	var loadComponentsDiv = document.getElementById('loadComponents');
	var loadCheckoutButton = document.createElement("button");
	loadCheckoutButton.innerHTML = "Load Checkout";
	loadCheckoutButton.id = "loadCheckout";
	loadComponentsDiv.append(loadCheckoutButton);

	var loadScripts = document.getElementById("loadScripts");
	loadScripts.disabled = true;

	var selectCheckoutVersion = document.getElementById("selectSdkVersion");
	selectCheckoutVersion.disabled = true;

	var optionCheckoutVersion = selectCheckoutVersion.getElementsByTagName('option')[0];
	optionCheckoutVersion.innerText = sdkVersionOnLoad;
	optionCheckoutVersion.disabled = true;

	var selectApiVersion = document.getElementById("selectApiVersion");
	selectApiVersion.disabled = true;

	var optionApiVersion = selectApiVersion.getElementsByTagName('option')[0];
	optionApiVersion.innerText = apiVersionOnLoad;
	optionApiVersion.disabled = true;

	loadInitialCheckoutScripts();

	// If there's sdkVersions then we can present the loadComponent button
	var loadCheckout = document.getElementById("loadCheckout");
	loadCheckout.addEventListener('click', function(){

		// Disables the forms for checkout once the version configuration has been chosen
		var disableCheckout = document.getElementsByClassName('checkoutDropdown');

		for (var i = disableCheckout.length - 1; i >= 0; i--) {
		
			disableCheckout[i].disabled = true
		
		}

		var hideForms = document.getElementsByClassName('checkoutDropdownWrapper');

		for (var i = hideForms.length - 1; i >= 0; i--) {
			hideForms[i].classList.add("hiddenForm");
		}
		loadCheckout.disabled = true;

		// Loads the drop-in script
		loadComponentScript();
	});	

} else {

	loadInitialCheckoutScripts();

	setTimeout(function(){

		loadComponentScript();
	
	}, 200);

	var getParametersForm = document.getElementById('configurationParametersWrapper');
	getParametersForm.classList.add("hiddenForm");
	
}


