// This will retrieve values from the returnUrl
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var sdkVersionOnLoad = urlParams.get('sdkVersion');
var apiVersionOnLoad = urlParams.get('apiVersion');


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

	var sdkVersion = apiSdkVersions.sdkVersion;
	var baseStyle = document.createElement("link");
	baseStyle.rel = "stylesheet";
	baseStyle.href = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + sdkVersion + "/adyen.css";
	document.getElementsByTagName('head')[0].append(baseStyle);

	var baseScript = document.createElement("script");
	baseScript.src = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + sdkVersion + "/adyen.js";
	document.body.appendChild(baseScript);

	var demoScript = document.createElement("script");
	demoScript.src = "../demo.js";
	document.body.appendChild(demoScript);

	var utilsScript = document.createElement("script");
	utilsScript.src = "../utils.js";
	document.body.appendChild(utilsScript);

	var checkoutForm = document.createElement("script");
	checkoutForm.src = "../checkoutForm.js";
	document.body.appendChild(checkoutForm);

	var paymentMethodsConfiguration = document.createElement("script");
	paymentMethodsConfiguration.src = "../paymentMethodsConfiguration.js";
	document.body.appendChild(paymentMethodsConfiguration);

};

function loadComponentScript() {
		var dropinScript = document.createElement("script");
		dropinScript.src = "/dropin/dropin.js"
		document.body.appendChild(dropinScript);
}


// If there's no value from the URL, then it presumes a new checkout allowing the user to select
// Else it automatically selects it and calls loadCheckoutScripts() automatically

if (!sdkVersionOnLoad) {
	var loadScripts = document.getElementById("loadScripts");
	loadScripts.addEventListener('click', function(){
		retrieveVersionValue();
		var apiSdkVersions = retrieveVersionValue();
		location.href = "http://localhost:3000/dropin?apiVersion="+apiSdkVersions.apiVersion+"&sdkVersion="+apiSdkVersions.sdkVersion
	});	
} else {

	const loadComponentsDiv = document.getElementById('loadComponents');
	const loadCheckoutButton = document.createElement("button");
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
	selectApiVersion.disabled = true

	var optionApiVersion = selectApiVersion.getElementsByTagName('option')[0];
	optionApiVersion.innerText = apiVersionOnLoad;
	optionApiVersion.disabled = true
	loadInitialCheckoutScripts();

	var loadCheckout = document.getElementById("loadCheckout");
	loadCheckout.addEventListener('click', function(){
		loadComponentScript();
	});	

}


