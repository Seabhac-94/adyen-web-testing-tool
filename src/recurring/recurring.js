const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var shopperReference = urlParams.get('shopperReference');
const recurringDetails = document.querySelector('.recurringWrapper');
const refInput = document.getElementById('recurringShopperReference');
const sendRecurringReq = document.getElementById('sendRecurringReq');

// Create a Map
const pmType = new Map([

  ["ideal", "sepadirectdebit"],
  ["visa", "scheme"],
  ["mc", "scheme"],
  ["amex", "scheme"],
  ["maestro", "scheme"],
  ["jcb", "scheme"],
  ["cup", "scheme"],
  ["discover", "scheme"],
  ["diners", "scheme"],
  ["bcmc", "sepadirectdebit"],
  ["paypal", "paypal"],
  ["sepadirectdebit", "sepadirectdebit"]

]);


function recurringPayment(type, storedPaymentMethodId) {

    const container = document.getElementById('recurringContainer')
    const modal = document.createElement('div')
    modal.classList.add('modal')
    container.appendChild(modal)

    modal.innerHTML = `
    							<div class="modal-content">
										<div class="recForm">
											<label for="recInteraction">Shopper Interaction</label>
											<input id="recInteraction" name="recInteraction" type="text" value="ContAuth"/>
										</div>
										<div class="recForm">
											<label for="recProcessModel">Recurring Processing Model</label>
											<input id="recProcessModel" name="recProcessModel" type="text" value="Subscription"/>
										</div>
										<div class="recForm">
											<label for="recValue">Value</label>
											<input id="${storedPaymentMethodId}_recValue" name="recValue" type="number" value="1000"/>
										</div>
										<div class="recForm">
											<label for="recCurrency">Currency</label>
											<input id="${storedPaymentMethodId}_recCurrency" name="recCurrency" type="text" value="EUR"/>
										</div>
										<div class="recButton">
											<button id="closeModal" class="makeRecPayment">Close</button>
											<button id="${storedPaymentMethodId}_payment" class="makeRecPayment">Submit Payment</button>
    								</div>
    							</div>
									`

		const payButton = document.getElementById(`${storedPaymentMethodId}_payment`)

		const closeModal = document.getElementById('closeModal')

		closeModal.addEventListener('click', function () {
			modal.remove()
		})

		payButton.addEventListener('click', function(){

			const value = document.getElementById(`${storedPaymentMethodId}_recValue`).value
			const currency = document.getElementById(`${storedPaymentMethodId}_recCurrency`).value
			const shopperInteraction = document.getElementById('recInteraction').value
			const recurringProcessingModel = document.getElementById('recProcessModel').value

	    let rPaymentData = {
	        amount: {
	            value: parseInt(value),
	            currency: currency
	        },
	        paymentMethod: {
	            type,
	            storedPaymentMethodId,
	        },
	        reference: "RECURRING_PAYMENT_" + shopperReference,
	        shopperInteraction,
	        recurringProcessingModel,
	        shopperReference
	    };

	    makePayment(rPaymentData)
	    	.then(res => {
		    	modal.remove()
	    })


		})

}


function makeRecurringCall() {

	const rData = {
		shopperReference: shopperReference
	}

	updateRequestContainer(rData);
	listRecurringDetails(rData)
		.then(res => {
			updateResponseContainer(res);	
			const details = res['details']

			const recContent = document.createElement('div')
			recContent.classList.add('recContent')
			recurringDetails.appendChild(recContent)

				for (var i = 0; i < details.length; i++) {
					
					const a = document.createElement('div')
					a.classList.add('shopperDetails')
					recContent.appendChild(a)
					var b = details[i]['RecurringDetail']
					var savedPm = null

					if (b['bank']) {

						savedPm = `<strong>Bank:</strong>
									<p class='pmDetailsP'>Owner: ${b['bank']['ownerName']}</p>
									<p class='pmDetailsP'>Bank Name: ${b['bank']['bankName']}</p>
									<p class='pmDetailsP'>BIC: ${b['bank']['bic']}</p>
									<p class='pmDetailsP'>Country: ${b['bank']['countryCode']}</p>
									<p class='pmDetailsP'>IBAN: ${b['bank']['iban']}</p>`
					
					} else if(b['card']) {

						savedPm = `<strong>Card: </strong>
									<p class='pmDetailsP'>Holder Name: ${b['card']['holderName']}</p>
									<p class='pmDetailsP'>Card Bin: ${b['additionalData']['cardBin']}</p>
									<p class='pmDetailsP'>Last 4 Digits: ${b['card']['number']}</p>
									<p class='pmDetailsP'>Expiry Date: ${b['card']['expiryMonth']}/${b['card']['expiryYear']}</p>`
					
					} else if(b['variant'] === 'paypal'){

						savedPm = `<strong>Token Details:</strong>
									<p class='pmDetailsP'>Billing Agreement: ${b['tokenDetails']['tokenData']['BillingAgreementId']}</p>
									<p class='pmDetailsP'>Email: ${b['tokenDetails']['tokenData']['EmailId']}</p>
									<p class='pmDetailsP'>PayerId: ${b['tokenDetails']['tokenData']['PayPal.PayerId']}</p>`						
					
					}

					a.innerHTML = `<p><strong>Variant: </strong>${b['variant']}</p>
									<p><strong>Recurring Detail Reference: </strong>${b['recurringDetailReference']}</p>
									<p><strong>Creation Date: </strong> ${b['creationDate']}</p>
									${savedPm}
									<p><strong>Contract Type: </strong> ${b['contractTypes']}
									<p class="recActions">
									<button class="makeRecPayment" id="pay_${b['recurringDetailReference']}" value="${b['variant']}_${b['recurringDetailReference']}">Make a payment</button>
									<button class="diasbleRecRef" id="disable_${b['recurringDetailReference']}" value="${b['recurringDetailReference']}">Disable</button></p>`
				
				}

			var makeRecPayment = document.getElementsByClassName('makeRecPayment');

			for (var i = 0; i < makeRecPayment.length; i++) {

				let y = makeRecPayment[i];
				y.addEventListener('click', function () {

					var type = pmType.get(y.value.split('_')[0])
					var storedPaymentMethodId = y.value.split('_')[1]

					const startRecPayment = recurringPayment(type, storedPaymentMethodId)

				})

			}

			var disableRecPayment = document.getElementsByClassName('diasbleRecRef');
			
				for (var i = 0; i < disableRecPayment.length; i++) {

				let x = disableRecPayment[i];
				x.addEventListener('click', function () {
					
					let disableData = {
						recurringDetailReference: x.value,
					    shopperReference: shopperReference
					}
					updateRequestContainer(disableData)
					disable(disableData)
						.then(res => {
							updateResponseContainer(res)
							setTimeout(function () {
								window.location.href = window.location.href
							},1000)

						})
				})
			}

		})

};


if (shopperReference) {

	refInput.value = shopperReference;
	makeRecurringCall();

}


sendRecurringReq.addEventListener('click', function () {

	window.location.href = `http://localhost:3000/recurring?apiVersion=68&shopperReference=${refInput.value}`

})

