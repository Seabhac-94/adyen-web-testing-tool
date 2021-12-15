// This will retrieve values from the returnUrl
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString)
const checkoutVersionOnRedirect = urlParams.get('sdkVersion')


// We retrieve this value as a function, and not natively so that it can be used in multiple pages
// If there's no value from the URL, then it presumes a new checkout allowing the user to select
// Else it automatically selects it
function retrieveVersionValue() {
	if (!checkoutVersionOnRedirect) {
		var checkoutVersion = document.getElementById("selectVersion").value;
	} else {
		var checkoutVersion = checkoutVersionOnRedirect
	}
	return checkoutVersion
};


function loadCheckoutScripts(){

	var checkoutVersion = retrieveVersionValue();
	var baseStyle = document.createElement("link");
	baseStyle.rel = "stylesheet";
	baseStyle.href = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + checkoutVersion + "/adyen.css";
	document.getElementsByTagName('head')[0].append(baseStyle);

	var baseScript = document.createElement("script");
	baseScript.src = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/" + checkoutVersion + "/adyen.js";
	document.body.appendChild(baseScript);

	var demoScript = document.createElement("script");
	demoScript.src = "../demo.js";
	document.body.appendChild(demoScript);

	var utilsScript = document.createElement("script");
	utilsScript.src = "../utils.js";
	document.body.appendChild(utilsScript);

	// We use this timeout function to ensure the checkoutscript has loaded
	// so that we don't receive a console error
	setTimeout(function(){
		var dropinScript = document.createElement("script");
		dropinScript.src = "/dropin/dropin.js"
		document.body.appendChild(dropinScript);
	}, 1000)
	
};


// If there's no value from the URL, then it presumes a new checkout allowing the user to select
// Else it automatically selects it and calls loadCheckoutScripts() automatically

if (!checkoutVersionOnRedirect) {
	var loadCheckout = document.getElementById("loadCheckout");
	loadCheckout.addEventListener('click', function(){
		loadCheckoutScripts()
	});	
} else {
	var loadCheckout = document.getElementById("loadCheckout");
	var selectCheckoutVersion = document.getElementById("selectVersion")
	var optionCheckoutVersion = selectCheckoutVersion.getElementsByTagName('option')[0];
	optionCheckoutVersion.innerText = checkoutVersionOnRedirect;
	selectCheckoutVersion.disabled = true;
	loadCheckout.disabled = true;
	optionCheckoutVersion.disabled = true;
	loadCheckoutScripts()
}


