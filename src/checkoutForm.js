const cardConfig = {
	hasHolderName: [true, false],
	holderNameRequired: [true, false],
	positionHolderNameOnTop: [true, false]
};

const paypalConfig = {
	color: ["blue", "gold", "silver"],
	shape: ["rect", "pill"]
};

const componentParameters = document.getElementById("componentParameters");

// Creates the dropdown options for the checkout form
function createCheckoutForm(configObj, optionEl, component) {
	const configObjEl = document.createElement('div');
	for (let [key, option] of Object.entries(configObj)) {
		const selectEl = document.createElement("select");
		selectEl.id = component+"_"+key;
		selectEl.className = "checkoutDropdown";
		configObjEl.append(selectEl);

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

