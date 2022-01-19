// This is where we generate the dropin/component/payment method code for the exmaple container

setTimeout(async function(){
	const implmentationDiv = document.querySelector('.implementation');
	const pm = await paymentMethodsResponse
	const configurationObjects = {

		dropin: dropinOptionalConfig(),
		card: cardConfiguration(pm),
		ideal: idealConfiguration(),
		paywithgoogle: googlePayConfiguration(),
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
		optImpCode.value = key
		selImpCode.appendChild(optImpCode)

	}

	const implmentationButton = document.querySelector('#showComponent');

	implmentationButton.addEventListener('click', function () {

		var impConfig = document.getElementById('selectImpCode').value;

		var impConfigCode = configurationObjects[`${impConfig}`]
		
		updateImplementationContainer(JSON.stringify(impConfigCode,null, 2));

	});
},100)

