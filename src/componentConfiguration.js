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


function dropinOptionalConfig() {

	var component = 'dropin';

	// Supports array for instantPaymentTypes
	var instantPaymentTypesValue = getValueOfConfig(component, 'instantPaymentTypes');
	if (instantPaymentTypesValue != "") {
		var instantPaymentTypes = instantPaymentTypesValue.split(", ");
	} else {
		var instantPaymentTypes = null;
	}


	return {

		//Configuration
		openFirstPaymentMethod: getValueOfConfig(component, 'openFirstPaymentMethod'),
		openFirstStoredPaymentMethod: getValueOfConfig(component, 'openFirstStoredPaymentMethod'),
		showStoredPaymentMethods: getValueOfConfig(component, 'showStoredPaymentMethods'),
		showRemovePaymentMethodButton: getValueOfConfig(component, 'showRemovePaymentMethodButton'),
		showPaymentMethods: getValueOfConfig(component, 'showPaymentMethods'),
		setStatusAutomatically: getValueOfConfig(component, 'setStatusAutomatically'),
		instantPaymentTypes,
		
		// Events
        onSelect: activeComponent => {
        	if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
        }
    }
}



// Payment methods configuration, called in dropin.js
function cardConfiguration() {

	var component = 'card';

	// Supports array for brands
	var brandsValue = getValueOfConfig(component, 'brands');
	if (brandsValue != "") {
		var brands = brandsValue.split(", ");
	} else {
		var brands = ["visa", "mc", "amex", "maestro", "jcb", "cup", "discover", "diners"]
	};

	// Defaults to credit card if no name is selected
	var name = getValueOfConfig(component, 'name');
	if (name == '') {
		var name = 'Credit Card'
	};

	return {
		name,
		showStoredPaymentMethods: getValueOfConfig(component, 'showStoredPaymentMethods'),
		brands,
		showBrandIcon: getValueOfConfig(component, 'showBrandIcon'),
		enableStoreDetails: getValueOfConfig(component, 'enableStoreDetails'),
		hasHolderName: getValueOfConfig(component, 'hasHolderName'),
		holderNameRequired: getValueOfConfig(component, 'holderNameRequired'),
		positionHolderNameOnTop: getValueOfConfig(component, 'positionHolderNameOnTop'),
		hideCVC: getValueOfConfig(component, 'hideCVC'),
		socialSecurityNumberMode: getValueOfConfig(component, 'socialSecurityNumberMode'),
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
	}

	return {
		showImage: getValueOfConfig(component, 'showImage'),
		issuer: getValueOfConfig(component, 'issuer'),
		highlightedIssuers: getValueOfConfig(component, 'highlightedIssuers'),
		placeholder
	}

};


function googlePayConfiguration() {

	var component = 'paywithgoogle'

	return {

		environment: "TEST",

		amount: {
			value: value,
			currency: currency
		},

		buttonType: getValueOfConfig(component, 'buttonType'),
		buttonColor: getValueOfConfig(component, 'buttonColor'),
		buttonLocale: getValueOfConfig(component, 'buttonLocale'),
		buttonSizeMode: getValueOfConfig(component, 'buttonSizeMode')


	}

}

