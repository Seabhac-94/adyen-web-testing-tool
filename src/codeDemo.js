const implmentationDiv = document.querySelector('.implementation');

const configurationObjects = {

	dropin: dropinOptionalConfig(),
	card: cardConfiguration(),
	paypal: paypalConfiguration()

}

var selImpCode = document.createElement("select");
selImpCode.id = "selectImpCode"

implmentationDiv.appendChild(selImpCode);

var selImpCodeButton = document.createElement("button");
selImpCodeButton.id = "showComponent";
selImpCodeButton.innerText = "Display Code";

implmentationDiv.appendChild(selImpCodeButton);

for (let [key, object] of Object.entries(configurationObjects)) {

	var optImpCode = document.createElement("option");
	optImpCode.innerText = key;
	optImpCode.id = `${key}_config`;
	// optImpCode.classList.add('implementationOption')
	optImpCode.value = JSON.stringify(object, null, 2);
	selImpCode.appendChild(optImpCode)
	console.log(optImpCode.value)

}

const implmentationButton = document.querySelector('#showComponent');

implmentationButton.addEventListener('click', function () {

	var impConfig = document.getElementById('selectImpCode').value;
	updateImplementationContainer(impConfig);

});
