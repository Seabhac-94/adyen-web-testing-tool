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
const paymentLinkTable = document.getElementById('paymentLinkTable');

(function createPblForm() {

	for (let [key, value] of Object.entries(pblFormParams)) {
		
		let a = document.createElement("tr");
		a.classList.add("pl-inputs");
		paymentLinkTable.append(a);
		a.innerHTML = `<td type='text'>${key}</td> <td><input id='pl-${key}' type='text' name=${key} value=${value}></td>`;

	}

})();

var additionalData = {};

var extraFieldId = 0;

function addDataToRequest() {
	
	let newField = document.createElement('tr');
	newField.classList.add('pl-inputs');

	let buttonId = `extraField_${extraFieldId}`;
	let paramKey = `paramKey_${extraFieldId}`;
	let valueKey = `valueKey_${extraFieldId}`;
	extraFieldId += 1;

	newField.innerHTML = `<td><input id=${paramKey} type='text' placeholder='Parameter'></td> <td><input id=${valueKey} type='text' placeholder='Value'></td> <td><button id=${buttonId} class='addField'>Add field</button></td>`;
	paymentLinkTable.append(newField);

	var addFieldButton = document.getElementsByClassName('addField');

	for (var i = 0; i < addFieldButton.length; i++) {
		
		let aFBtn= addFieldButton[i];

		aFBtn.addEventListener('click', () => {
			
			let keyId = aFBtn.id.split('_');
			let addedParam = collectFormData(`paramKey_${keyId[1]}`);
			let addedValue = collectFormData(`valueKey_${keyId[1]}`);

			if (addedParam !== '') {

				newField.innerHTML = `<td><span id="paramField_${keyId[1]}" value='${addedParam}'>${addedParam}</span></td> <td><span id="valueField_${keyId[1]}" value="${addedValue}">${addedValue}</span></td> <td><button id="removeField_${keyId[1]}" class='removeField'>Delete Field</button></td>`;
				newField.id = `newField_${keyId[1]}`;
				additionalData[`${addedParam}`] = addedValue;

				// Calls functions to process the querySelector
				deleteField.call();
				
			} else {

				document.getElementById(paramKey).className = 'formError';
				alert(`Parameter needed! Go to https://docs.adyen.com/api-explorer/#/CheckoutService/v68/post/paymentLinks to see available parameters`);

			};
		});
	};
};


function deleteField() {

	var removeFieldButton = document.querySelectorAll('.removeField');
	
	for (var i = 0; i < removeFieldButton.length; i++) {
		let rFBtn = removeFieldButton[i];
		rFBtn.addEventListener('click', () => {
			let keyId = rFBtn.id.split('_');
			let param = document.getElementById(`paramField_${keyId[1]}`);
			let field = document.getElementById(`newField_${keyId[1]}`);
			try {
				delete additionalData[`${param.innerText}`];
				field.remove();
			} catch (error) {
				console.log(error);
			};
		});
	};
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

	const a = document.querySelector('.paymentLinkData');

		createPaymentLink(paymentLinkRequest)
			.then(response => {
				a.innerText = JSON.stringify(response, null, 2);
				console.log(response);
			});

});
