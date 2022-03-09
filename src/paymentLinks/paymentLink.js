function collectFormData(plId) {
	var formData = document.getElementById(plId);
    return formData.value;    
}


const pblFormParams = {

	currency: ["EUR"],
	value: [1000],
	countryCode: ["NL"],
	reference: ["AdyenPaymentLinkTest"],
	shopperReference: ["adyenShopper"],
	description: ["Adyen Payment Link"],
	shopperLocale: ["en_GB"]

};

const paymentLinkForm = document.getElementById('paymentLinkForm');

function createPblForm() {

	for (let [key, value] of Object.entries(pblFormParams)) {
		
		let a = document.createElement("div");
		a.classList.add("pl-inputs");
		paymentLinkForm.append(a);
		a.innerHTML = `<label type='text'>${key}</label><input id='pl-${key}' type='text' name=${key} value=${value}>`;

	}

};

createPblForm.call();

var additionalData = {};

var extraFieldId = 0;

function addDataToRequest() {
	
	let newField = document.createElement('div')
	newField.classList.add('pl-inputs')

	let buttonId = `extraField_${extraFieldId}`;
	let paramKey = `paramKey_${extraFieldId}`;
	let valuKey = `valueKey_${extraFieldId}`;
	extraFieldId += 1;

	newField.innerHTML = `<input id=${paramKey} type='text' placeholder='Parameter'> <input id=${valuKey} type='text' placeholder='Value'> <button id=${buttonId} class='addField'>Add field</button>`
	paymentLinkForm.append(newField)

	var addFieldButton = document.getElementsByClassName('addField')

	for (var i = 0; i < addFieldButton.length; i++) {
		let aFBtn= addFieldButton[i]

		aFBtn.addEventListener('click', () => {
			
			let keyId = aFBtn.id.split('_');
			let addedParam = collectFormData(`paramKey_${keyId[1]}`);
			let addedValue = collectFormData(`valueKey_${keyId[1]}`);

			if (addedParam !== '') {

				newField.innerHTML = `<label>${addedParam}</label> <span>${addedValue}</span>`;
				additionalData[`${addedParam}`] = addedValue;

			} else {
				
				document.getElementById(paramKey).className = 'formError';
				alert(`Parameter needed! Go to https://docs.adyen.com/api-explorer/#/CheckoutService/v68/post/paymentLinks to see available parameters`);

			}

		});
	};

	// var removeField = document.getElementsByClassName('removeField');

	// for (var i = 0; i < removeField.length; i++) {
	// 	// console.log(removeField[i])
	// }

};


const addDataButton = document.getElementById('addDataButton');

addDataButton.addEventListener('click', () => {	addDataToRequest.call() });


const createLink = document.getElementById('createPaymentLink');

createLink.addEventListener('click', function() {

	var standardData = {

	  reference: collectFormData("pl-reference"),
	  amount: {
	  	currency: collectFormData("pl-currency"),
	    value: collectFormData("pl-value")
	  },

	  shopperReference: collectFormData("pl-shopperReference"),
	  description: collectFormData("pl-description"),
	  countryCode: collectFormData("pl-countryCode"),
	  shopperLocale: collectFormData("pl-shopperLocale")

	}

	var paymentLinkRequest = { ...standardData, ...additionalData };

	const a = document.querySelector('.paymentLinkData')

		createPaymentLink(paymentLinkRequest)
			.then(response => {
				a.innerText = JSON.stringify(response, null, 2);
				console.log(response);

				// setTimeout(function (argument) {
				// 	window.location.href = response.url
				// }, 2000)
			});

});
