const pblFormParams = {

	currency: ["EUR"],
	value: [1000],
	countryCode: ["NL"],
	reference: ["AdyenPaymentLinkTest"],
	shopperReference: ["adyenShopper"],
	description: ["Adyen Payment Link"],
	shopperLocale: ["en_GB"]

}

function createPblForm() {

	const paymentLinkForm = document.getElementById('paymentLinkForm')

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

}

createPblForm()

function collectFormData(plId) {

    var formData = document.getElementById(plId);
    return formData.value;
    
}

const createLink = document.getElementById('createPaymentLink');

createLink.addEventListener('click', function() {

	var paymentLinkRequest = {

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
