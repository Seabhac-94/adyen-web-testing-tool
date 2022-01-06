const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString);
var shopperReference = urlParams.get('shopperReference');
const recurringDetails = document.querySelector('.recurringWrapper');
const refInput = document.getElementById('recurringShopperReference');
const sendRecurringReq = document.getElementById('sendRecurringReq');


if (shopperReference) {
	refInput.value = shopperReference
}

function makeRecurringCall() {

	shopperReference = refInput.value
	
	const rData = {
		shopperReference: shopperReference
	}

	updateRequestContainer(rData);
	listRecurringDetails(rData)
		.then(res => {
			updateResponseContainer(res);	
			// recurringDetails.innerText = JSON.stringify(res, null, 1);
			const details = res['details']

				for (var i = 0; i < details.length; i++) {
					
					const a = document.createElement('pre')
					a.classList.add('shopperDetails')
					a.innerText = JSON.stringify(details[i]['RecurringDetail'], null, 1)
					recurringDetails.appendChild(a)
					console.log(details[i]['RecurringDetail']['recurringDetailReference'])
					
				}
		})

}

sendRecurringReq.addEventListener('click', function () {makeRecurringCall()})

