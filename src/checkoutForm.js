const cardConfig = {

	hasHolderName: [true, false],
	holderNameRequired: [true, false],
	positionHolderNameOnTop: [true, false]

};


const paypalConfig = {

	color: ["silver", "blue", "gold" ],
	shape: ["pill", "rect"]

};


const componentParameters = document.getElementById("componentParameters");

// Creates the dropdown options for the checkout form
function createCheckoutForm(configObj, optionEl, component) {
	
	const configObjEl = document.createElement('div');
	configObjEl.className = "configWrapper"

	const configObjTitle = document.createElement('p');
	configObjTitle.className = "configObjTitle";
	configObjTitle.innerHTML = component;
	configObjEl.append(configObjTitle);

	const checkoutDropdownWrapper = document.createElement('div');
	checkoutDropdownWrapper.className = "checkoutDropdownWrapper";
	configObjEl.append(checkoutDropdownWrapper);
	
	for (let [key, option] of Object.entries(configObj)) {

		const optionElSpan = document.createElement('span');
		optionElSpan.innerHTML = key;
		checkoutDropdownWrapper.append(optionElSpan);

		const selectEl = document.createElement("select");
		selectEl.id = component+"_"+key;
		selectEl.className = "checkoutDropdown";
		checkoutDropdownWrapper.append(selectEl);

  		for (var i = option.length - 1; i >= 0; i--) {
	  		var optionEl = document.createElement("option");
			optionEl.className = "checkoutOptionDropdown"
			optionEl.innerHTML = option[i];
			selectEl.append(optionEl);
  		}
	}
	componentParameters.append(configObjEl)
};

// Create paypal
createCheckoutForm(paypalConfig, "paypalConfiguration", "paypal")

// Create card
createCheckoutForm(cardConfig, "cardConfiguration", "card");

