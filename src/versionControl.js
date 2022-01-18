// This will retrieve values from the returnUrl
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var sdkVersionOnLoad = urlParams.get('sdkVersion');
var apiVersionOnLoad = urlParams.get('apiVersion');
const redirectResult = urlParams.get('redirectResult');


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
		scriptToAdd.src = `../${additionalScripts[i]}.js`;
		document.body.appendChild(scriptToAdd);

	}

};


function loadComponentScript() {
		
	var componentScripts = ["/utils.js", "dropin/componentParams.js", "/dropin/dropin.js", "/codeDemo.js"]

	for (var i = 0; i < componentScripts.length; i++) {

		var scriptToAdd =  document.createElement("script");
		scriptToAdd.src = `${componentScripts[i]}`;
		document.body.appendChild(scriptToAdd);

	}

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

	const resetButton = document.createElement("button");
	resetButton.innerHTML = "Reset";
	resetButton.id = "resetButton";
	parameters.append(resetButton);
	const reset = document.getElementById("resetButton");

	reset.addEventListener("click", function() {
		location.href = "http://localhost:3000/dropin"
	})

	// If there's sdkVersions then we can present the loadCheckout button
	var loadComponentsDiv = document.getElementById('loadComponents');
	var loadCheckoutButton = document.createElement("button");
	loadCheckoutButton.innerHTML = "Load Checkout";
	loadCheckoutButton.id = "loadCheckout";
	loadComponentsDiv.append(loadCheckoutButton);

	// Disables the forms for version selection once the version configuration has been chosen

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


	// Inserts the correct scripts

	loadInitialCheckoutScripts();

	
	var loadCheckout = document.getElementById("loadCheckout");
	loadCheckout.addEventListener('click', function(){

		// Once the "loadCheckout" button is clicked, the form will hide and load the final scripts

		var hideCheckoutForm = document.getElementById('componentParameters');

		hideCheckoutForm.classList.add('hiddenForm');

		loadCheckout.classList.add('hiddenForm');
		infoPara.classList.add('hiddenForm')
		icon.classList.remove('fa-angle-double-down')
		icon.classList.add('fa-angle-double-right')

		// Loads the drop-in script
		loadComponentScript();

	});	

} else {

	loadInitialCheckoutScripts();

	setTimeout(function(){

		loadComponentScript();
	
	}, 200);

	const getParametersForm = document.getElementById("configurationParametersWrapper");
	getParametersForm.classList.add("hiddenForm");

	const copyConfiguration = document.getElementById("copyConfiguration");
	copyConfiguration.classList.add("hiddenForm")
	
}
