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
			// recurringDetails.innerText = JSON.stringify(res, null, 1);
			const details = res['details']
			console.log(details)

				for (var i = 0; i < details.length; i++) {
					
					const a = document.createElement('div')
					a.classList.add('shopperDetails')

					for(let [key, value] of Object.entries(details[i])) {
						console.log(key)
						console.log(value)
					}
					a.innerText = JSON.stringify(details[i]['RecurringDetail'], null, 1)
					recurringDetails.appendChild(a)

					console.log(details[i]['RecurringDetail']['recurringDetailReference'])
					
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

