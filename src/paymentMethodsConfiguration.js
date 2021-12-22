function convertToBoolean(a) {
	if (a === "true") {
		return true
	} else {
		return false
	}
};

function cardConfiguration() {

	var hasHolderName = document.getElementById('card_hasHolderName').value;
	// console.log(typeof hasHolderName);
	var holderNameRequired = document.getElementById('card_holderNameRequired').value;
	// console.log(holderNameRequired);
	var positionHolderNameOnTop = document.getElementById('card_positionHolderNameOnTop').value;
	// console.log(positionHolderNameOnTop);

	return {
		name: "Cards",
		hasHolderName: convertToBoolean(hasHolderName),
		holderNameRequired: convertToBoolean(holderNameRequired),
		positionHolderNameOnTop: convertToBoolean(positionHolderNameOnTop)
	}
};

function paypalConfiguration() {

	var paypalColor = document.getElementById('paypal_color').value;
	var paypalShape = document.getElementById('paypal_shape').value;
	
	return {
		amount: {
			currency: currency,
			value: value
		},
		style: {
	      shape: paypalShape,
	      color: paypalColor
  		}
	}

};
