const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var shopperReference = urlParams.get('shopperReference');
const recurringDetails = document.querySelector('.recurringWrapper');
const refInput = document.getElementById('recurringShopperReference');
const sendRecurringReq = document.getElementById('sendRecurringReq');


function makeRecurringCall() {

	// shopperReference = refInput.value
	
	const rData = {
		shopperReference: shopperReference
	}

	updateRequestContainer(rData);
	listRecurringDetails(rData)
		.then(res => {
			updateResponseContainer(res);	
			// recurringDetails.innerHTML = `<pre>${JSON.stringify(res, null, 1)}</pre>`;
			const details = res['details']
			// console.log(details)

				for (var i = 0; i < details.length; i++) {
					
					const a = document.createElement('div')
					a.classList.add('shopperDetails')
					recurringDetails.appendChild(a)
					var b = details[i]['RecurringDetail']
					
					// Reference for now
					console.log(b)

					var savedPm = ''

					if (b['bank']) {
						savedPm = `
									<strong>Bank:</strong>
										<p class='pmDetailsP'>Owner: ${b['bank']['ownerName']}</p>
										<p class='pmDetailsP'>Bank Name: ${b['bank']['bankName']}</p>
										<p class='pmDetailsP'>BIC: ${b['bank']['bic']}</p>
										<p class='pmDetailsP'>Country: ${b['bank']['countryCode']}</p>
										<p class='pmDetailsP'>IBAN: ${b['bank']['iban']}</p>



								  `
					} else {
						savedPm = `
									<strong>Card: </strong>
										<p class='pmDetailsP'>Holder Name: ${b['card']['holderName']}</p>
										<p class='pmDetailsP'>Card Bin: ${b['additionalData']['cardBin']}</p>
										<p class='pmDetailsP'>Last 4 Digits: ${b['card']['number']}</p>
										<p class='pmDetailsP'>Expiry Date: ${b['card']['expiryMonth']}/${b['card']['expiryYear']}</p>
								  `
					}

					a.innerHTML = `
									<p><strong>Variant: </strong>${b['variant']}</p>
									<p> ${savedPm} </p>
									<p><strong>Recurring Detail Reference: </strong>${b['recurringDetailReference']}</p>
								  `
				}
		})
};


if (shopperReference) {

	refInput.value = shopperReference;
	makeRecurringCall();

}


sendRecurringReq.addEventListener('click', function () {

	window.location.href = `http://localhost:3000/recurring?shopperReference=${refInput.value}`

})

