// We retrieve this value as a function, and not natively so that it can be used in multiple pages
function retrieveVersionValue() {
	var checkoutVersion = document.getElementById("selectVersion").value;
	return checkoutVersion
};


function selectVersion(){

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

	// We use this timout function to ensure the checkoutscript has loaded
	// so that we don't receive a console error
	setTimeout(function(){
		var dropinScript = document.createElement("script");
		dropinScript.src = "/dropin/dropin.js"
		document.body.appendChild(dropinScript);
	}, 1500)
	
};

var loadCheckout = document.getElementById("loadCheckout");
loadCheckout.addEventListener('click', function(){
	selectVersion()
});
