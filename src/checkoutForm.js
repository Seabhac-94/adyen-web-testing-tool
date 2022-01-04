// Parameters fro the paymentMethods/payments call

const parametersConfig = {

	value: ["input"],
	currency: ["input"],
	shopperReference: ["input"],
	reference: ["input"],
	countryCode: ["input"],
	shopperLocale: ["input"]

};


// Select the component to be mounted
const flavourConfig = {
	
	flavour: [ "klarna", "paypal", "paywithgoogle", "ideal", "card", "dropin"],

};


// Configuration for dropin
const dropinConfig = {

	openFirstPaymentMethod: [false, true],
	openFirstStoredPaymentMethod: [false, true],
	showStoredPaymentMethods: [false, true],
	showRemovePaymentMethodButton: [true, false],
	showPaymentMethods: [false, true],
	setStatusAutomatically: [false, true],
	instantPaymentTypes: ["paywithgoogle", null],
	showPayButton: [false, true]

};


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

(function assignCheckoutForm() {

	const createCheckoutFormParams = {

		parametersConfig: [parametersConfig, "parametersConfiguration", "parameters"],
		flavourConfig: [flavourConfig, "flavourConfiguration", "flavour"],
		dropinConfig: [dropinConfig, "dropinConfiguration", "dropin"],
		cardConfig: [cardConfig, "cardConfiguration", "card"],
		paypalConfig: [paypalConfig, "paypalConfiguration", "paypal"],
		idealConfig: [idealConfig, "idealConfiguration", "ideal"],
		googlePayConfig: [googlePayConfig, 'googlePayConfiguration', "paywithgoogle"]

	}

	for (let [key, params] of Object.entries(createCheckoutFormParams)) {

		createCheckoutForm(params[0], params[1], params[2]);
		// Example of what this function is calling:
		// createCheckoutForm(cardConfig, "cardConfiguration", "card");
	}

})();


// Create headings on form

(function makeHeadings(b, c, d, e) {

	const headings = {
		componentHeading: ["h4", "Component Selection", "flavourConfiguration", true],
		dropinConfigHeading: ["h4", "Dropin Configuration", "dropinConfiguration", true],
		pmConfigHeading: ["h4", "Payment Method Configuration", "cardConfiguration"],
		parametersConfig: ["h4", "Parameters", "parametersConfiguration", true]
	}


	for (let [key, params] of Object.entries(headings)) {

		var a = document.createElement(params[0]);
		a.innerText = params[1];
		if (params[3]) {
			a.classList.add("inline-header");
		}
		var aParent = document.getElementById(params[2]).parentNode;
		var aChild = document.getElementById(params[2]);
		aParent.insertBefore(a, aChild);
		// Example of what this function is calling:
		// makeHeadings("h4", "Component Selection", "flavourConfiguration")
	}

})();
