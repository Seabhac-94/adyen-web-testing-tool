const implmentationDiv = document.querySelector('.implementation');
const implmentationButton = document.querySelector('#showComponent');

const configurationObjects = {

	dropin: dropinOptionalConfig(),
	card: cardConfiguration(),
	paypal: paypalConfiguration()

}

var selImpCode = document.createElement("select");
selImpCode.id = "selectImpCode"

implmentationDiv.appendChild(selImpCode);

for (let [key, object] of Object.entries(configurationObjects)) {

	var optImpCode = document.createElement("option");
	optImpCode.innerText = key;
	optImpCode.id = `${key}_config`;
	// optImpCode.classList.add('implementationOption')
	optImpCode.value = JSON.stringify(object, null, 2);
	selImpCode.appendChild(optImpCode)
	console.log(optImpCode.value)

}


implmentationButton.addEventListener('click', function () {

	var impConfig = document.getElementById('selectImpCode').value;
	updateImplementationContainer(impConfig);

});
