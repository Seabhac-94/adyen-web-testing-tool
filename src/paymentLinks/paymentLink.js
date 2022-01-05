
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



