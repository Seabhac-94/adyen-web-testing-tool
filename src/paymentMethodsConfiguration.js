function convertToBoolean(v) {
	if (v === "true") {
		return true
	} else if (v === "false"){
		return false
	} else {
		return v
	}
};


function getValueOfConfig(component, param) {
	
	a = `${component}_${param}`;
	var b = document.getElementById(a).value;
	c = convertToBoolean(b);

	return c
};


function cardConfiguration() {

	var component = 'card'
	return {
		name: "Cards",
		hasHolderName: getValueOfConfig(component, 'hasHolderName'),
		holderNameRequired: getValueOfConfig(component, 'holderNameRequired'),
		positionHolderNameOnTop: getValueOfConfig(component, 'positionHolderNameOnTop')
	}
};


function paypalConfiguration() {
	var component = 'paypal'
	
	return {
		amount: {
			currency: currency,
			value: value
		},
		style: {
	      shape: getValueOfConfig(component, 'shape'),
	      color: getValueOfConfig(component, 'color')
  		}
	}

};
