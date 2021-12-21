function cardConfiguration() {
	return {
		name: "Cards",
		hasHolderName: true,
		holderNameRequired: true,
		positionHolderNameOnTop: true
	}
};

function paypalConfiguration() {
	var paypalColor = document.getElementById('paypalColor').value;
	return {
		amount: {
			currency: currency,
			value: value
		},
		style: {
	      layout: "vertical",
	      color: paypalColor
  		}
	}
};
