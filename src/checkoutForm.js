// Creates the options for the front end based on available options
// for each component

const cardConfig = {

	name: ["Cards", "Payment Card", "Credit Card"],
	hasHolderName: [true, false],
	holderNameRequired: [true, false],
	positionHolderNameOnTop: [true, false]

};

const paypalConfig = {

	color: ["silver", "blue", "gold" ],
	shape: ["pill", "rect"]

};

const componentParameters = document.getElementById("componentParameters");


// Creates the dropdown options and the wrappers for the checkout form
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

		const optionElDiv = document.createElement('div');
		optionElDiv.innerHTML = `${key}: `;
		optionElDiv.hidden = true
		checkoutDropdownWrapper.append(optionElDiv);

		const selectEl = document.createElement("select");
		selectEl.id = component+"_"+key;
		selectEl.className = "checkoutDropdown";
		optionElDiv.append(selectEl);

  		for (var i = option.length - 1; i >= 0; i--) {
	  		var optionEl = document.createElement("option");
			optionEl.className = "checkoutOptionDropdown"
			optionEl.innerHTML = option[i];
			selectEl.append(optionEl);
  		}
	  	configObjTitle.addEventListener('click', function(){
			if (optionElDiv.hidden) {
				optionElDiv.hidden = false
			} else {
				optionElDiv.hidden = true
			}
		});
	}
	componentParameters.append(configObjEl);


};

// Create forms below

createCheckoutForm(cardConfig, "cardConfiguration", "card");
createCheckoutForm(paypalConfig, "paypalConfiguration", "paypal")
