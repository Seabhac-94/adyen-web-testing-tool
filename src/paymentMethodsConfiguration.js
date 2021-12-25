// As the value from HTML gets passed as a string, but Drop-in requires booleans-
// we use this function to convert either true or false values to Booleans
function convertToBoolean(v) {

	if (v === "true") {
		return true;
	} else if (v === "false"){
		return false;
	} else {
		return v;
	}

};


// Short hand function which will target the id and get the HTML value,
// uses convertToBoolean() so the value can be passed directly to the config function
function getValueOfConfig(component, param) {
	
	a = `${component}_${param}`;
	var b = document.getElementById(a).value;
	c = convertToBoolean(b);

	return c;

};


// Payment methods configuration, called in dropin.js
function cardConfiguration() {

	var component = 'card';

	// Supports array for brands
	var brands = getValueOfConfig(component, 'brands');
	if (brands != "") {
		var brandsArray = brands.split(", ");
	} else {
		var brandsArray = ["visa", "mc", "amex", "maestro", "jcb", "cup", "discover", "diners"]
	};

	// Defaults to credit card if no name is selected
	var name = getValueOfConfig(component, 'name');
	if (name == '') {
		var name = 'Credit Card'
	} else {
		var name = getValueOfConfig(component, 'name');
	};

	return {
		name: name,
		showStoredPaymentMethods: getValueOfConfig(component, 'showStoredPaymentMethods'),
		brands: brandsArray,
		showBrandIcon: getValueOfConfig(component, 'showBrandIcon'),
		enableStoreDetails: getValueOfConfig(component, 'enableStoreDetails'),
		hasHolderName: getValueOfConfig(component, 'hasHolderName'),
		holderNameRequired: getValueOfConfig(component, 'holderNameRequired'),
		positionHolderNameOnTop: getValueOfConfig(component, 'positionHolderNameOnTop'),
		hideCVC: getValueOfConfig(component, 'hideCVC'),
		socialSecurityNumberMode: "show",
		billingAddressRequired: getValueOfConfig(component, 'billingAddressRequired'),
		billingAddressAllowedCountries: getValueOfConfig(component, 'billingAddressAllowedCountries'),
		minimumExpiryDate: getValueOfConfig(component, 'minimumExpiryDate')
	}

};


function paypalConfiguration() {

	var component = 'paypal';
	
	return {
		amount: {
			currency: currency,
			value: value
		},
		style: {
			layout: getValueOfConfig(component, 'layout'),
	    	shape: getValueOfConfig(component, 'shape'),
	    	color: getValueOfConfig(component, 'color'),
	    	label: getValueOfConfig(component, 'label'),
  		}
	}

};

function idealConfiguration () {
	
	var component = 'ideal';

	var placeholder = getValueOfConfig(component, 'placeholder');
	if (placeholder == '') {
		var placeholder = 'Select your bank';
	} else {
		var placeholder = getValueOfConfig(component, 'placeholder');
	};


	return {
		showImage: getValueOfConfig(component, 'showImage'),
		issuer: getValueOfConfig(component, 'issuer'),
		highlightedIssuers: getValueOfConfig(component, 'highlightedIssuers'),
		placeholder: placeholder
	}

};
