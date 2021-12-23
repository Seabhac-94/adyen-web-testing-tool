// As the value from HTML gets passed as a string, but Drop-in requires booleans-
// we use this function to convert either true or false values to Booleans
function convertToBoolean(v) {
	if (v === "true") {
		return true
	} else if (v === "false"){
		return false
	} else {
		return v
	}
};


// Short hand function which will target the id and get the HTML value,
// uses convertToBoolean() so the value can be passed directly to the config function
function getValueOfConfig(component, param) {
	
	a = `${component}_${param}`;
	var b = document.getElementById(a).value;
	c = convertToBoolean(b);

	return c
};


// Payment methods configuration, called in dropin.js
function cardConfiguration() {

	var component = 'card'

	return {
		name: getValueOfConfig(component, 'name'),
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
