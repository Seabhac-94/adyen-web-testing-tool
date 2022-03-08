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

const paymentLinkForm = document.getElementById('paymentLinkForm')

function createPblForm() {

	for (let [key, value] of Object.entries(pblFormParams)) {
		
		let a = document.createElement("div");
		a.classList.add("pl-inputs")
		paymentLinkForm.append(a)
		let b = document.createElement("label");
		let c = document.createElement("input");
		a.append(b);
		a.append(c);
		b.innerHTML = key;
		c.type = "text"
		c.name = key;
		c.value = value;
		c.id = `pl-${key}`

	}

};

createPblForm.call()

var additionalData = {}

var extraFieldId = 0

function addDataToRequest() {
	
	let a = document.createElement('div')
	a.classList.add('pl-inputs')

	let buttonId = `extraField_${extraFieldId}`
	let paramKey = `paramKey_${extraFieldId}`
	let valuKey = `valueKey_${extraFieldId}`
	extraFieldId += 1

	a.innerHTML = `<input id=${paramKey} type="text"> <input id=${valuKey} type="text"> <button id=${buttonId} class="addField">Add field</button>`
	paymentLinkForm.append(a)

	var addFieldButton = document.getElementsByClassName('addField')

	for (var i = 0; i < addFieldButton.length; i++) {
		let y = addFieldButton[i]

		y.addEventListener('click', () => {
			let x = y.id.split('_')

			let addedParam = collectFormData(`paramKey_${x[1]}`)
			let addedValue = collectFormData(`valueKey_${x[1]}`)

			// console.log(y.id, `valueKey_${x[1]}`, `paramKey_${x[1]}`)
			a.innerHTML = `<label>${addedParam}</label> <span>${addedValue}</span>`

			let z = `{'${addedParam}': '${addedValue}'}`

			console.log(z)
			additionalData[`${addedParam}`] = addedValue
		})
	}

}


const addDataButton = document.getElementById('addDataButton')

addDataButton.addEventListener('click', () => {

	addDataToRequest.call()

})


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

	var paymentLinkRequest = {...standardData, ...additionalData}

	const a = document.querySelector('.paymentLinkData')

		createPaymentLink(paymentLinkRequest)
			.then(response => {
				a.innerText = JSON.stringify(response, null, 2)
				console.log(response)

				// setTimeout(function (argument) {
				// 	window.location.href = response.url
				// }, 2000)
			})

})
