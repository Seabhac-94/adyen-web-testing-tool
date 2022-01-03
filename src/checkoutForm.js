const dropinConfig = {

	openFirstPaymentMethod: [false, true],
	openFirstStoredPaymentMethod: [false, true],
	showStoredPaymentMethods: [false, true],
	showRemovePaymentMethodButton: [true, false],
	showPaymentMethods: [false, true],
	setStatusAutomatically: [false, true],
	instantPaymentTypes: ["paywithgoogle", null]

}

// Creates the options for the front end based on available options
// for each component

const cardConfig = {

	name: ["input"],
	showStoredPaymentMethods: [false, true],
	brands: ["input"],
	showBrandIcon: [false, true],
	enableStoreDetails: [true, false],
	hasHolderName: [true, false],
	holderNameRequired: [true, false],
	positionHolderNameOnTop: [true, false],
	hideCVC: [true, false],
	socialSecurityNumberMode: ["show", "hide", "auto"],
	billingAddressRequired: [true, false],
	billingAddressAllowedCountries: ["input"],
	minimumExpiryDate: ["input"]

};

const paypalConfig = {

	layout: ["horizontal", "vertical"],
	color: ["white", "black", "silver", "blue", "gold"],
	shape: ["pill", "rect"],
	label: ["checkout", "buynow", "pay", "paypal"],

};


const idealConfig = {
	showImage: [false, true],
	issuer: ["input"],
	highlightedIssuers: ["input"],
	placeholder: ["input"]
};


const googlePayConfig = {

	buttonType: ["book", "checkout", "donate", "order", "pay", "plain", "subscribe", "buy"],
	buttonColor: ["black", "white", "default"],
	buttonLocale: ["ar", "bg", "ca", "cs", "da", "de", "el", "es", "et", "fi", "fr", "hr", "id", "it", "ja", "ko", "ms", "nl", "no", "pl", "pt", "ru", "sk", "sl", "sr", "sv", "th", "tr", "zh", "uk", "en"],
	buttonSizeMode: ["fill", "static"]

};


const componentParameters = document.getElementById("componentParameters");


// Creates the dropdown options and the wrappers for the checkout form
function createCheckoutForm(configObj, optionEl, component) {
	
	const configObjEl = document.createElement('div');
	configObjEl.className = "configWrapper";
	configObjEl.id = optionEl

	const configObjTitle = document.createElement('button');
	configObjTitle.className = "configObjTitle";
	configObjTitle.innerHTML = component;
	configObjEl.append(configObjTitle);

	const checkoutDropdownWrapper = document.createElement('div');
	checkoutDropdownWrapper.className = "checkoutDropdownWrapper hiddenForm";
	configObjEl.append(checkoutDropdownWrapper);
	
	for (let [key, option] of Object.entries(configObj)) {

		const optionElDiv = document.createElement('div');
		optionElDiv.innerHTML = `<span>${key}: </span>`;
		checkoutDropdownWrapper.append(optionElDiv);

		if (option == "input") {
			var selectEl = document.createElement("input");
		}
		else {
			var selectEl = document.createElement("select");
			
			for (var i = option.length - 1; i >= 0; i--) {
		  		var optionElement = document.createElement("option");
				optionElement.className = "checkoutOptionDropdown"
				optionElement.innerHTML = option[i];
				selectEl.append(optionElement);
  			}
		}
		selectEl.id = component+"_"+key;
		selectEl.className = "checkoutDropdown";
		optionElDiv.append(selectEl);
	};

  	configObjTitle.addEventListener('click', function(){

  		var childConfig = configObjTitle.nextElementSibling;
  		childConfig.classList.toggle("hiddenForm");
	
	});

	componentParameters.append(configObjEl);

};

// Create forms below

createCheckoutForm(dropinConfig, "dropinConfiguration", "dropin");
createCheckoutForm(cardConfig, "cardConfiguration", "card");
createCheckoutForm(paypalConfig, "paypalConfiguration", "paypal");
createCheckoutForm(idealConfig, "idealConfiguration", "ideal");
createCheckoutForm(googlePayConfig, 'googlePayConfiguration', "paywithgoogle")

