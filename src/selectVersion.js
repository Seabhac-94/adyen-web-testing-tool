function selectVersion(){

	var version = document.getElementById("selectVersion").value

	console.log(version)

	var baseStyle = document.createElement("link");
	baseStyle.rel = "stylesheet";
	baseStyle.href = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/"+version+"/adyen.css";
	document.getElementsByTagName('head')[0].append(baseStyle);

	var baseScript = document.createElement("script");
	baseScript.src = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/"+version+"/adyen.js";
	document.body.appendChild(baseScript);

	var demoScript = document.createElement("script");
	demoScript.src = "../demo.js"
	document.body.appendChild(demoScript);

	var utilsScript = document.createElement("script");
	utilsScript.src = "../utils.js"
	document.body.appendChild(utilsScript);

	setTimeout(function(){

	var dropinScript = document.createElement("script");
	dropinScript.src = "/dropin/dropin.js"
	document.body.appendChild(dropinScript);

	}, 1500)
	
}

var loadCheckout = document.getElementById("loadCheckout")
loadCheckout.addEventListener('click', function(){
	selectVersion()
}) 
