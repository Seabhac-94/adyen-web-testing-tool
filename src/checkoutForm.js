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

	color: ["silver", "blue", "gold" ],
	shape: ["pill", "rect"]

};


// const idealConfig = {
// 	showImage: [false, true],
// 	issuer: ["1161"]
// }

const componentParameters = document.getElementById("componentParameters");


// Creates the dropdown options and the wrappers for the checkout form
function createCheckoutForm(configObj, optionEl, component) {
	
	const configObjEl = document.createElement('div');
	configObjEl.className = "configWrapper"

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
		  		var optionEl = document.createElement("option");
				optionEl.className = "checkoutOptionDropdown"
				optionEl.innerHTML = option[i];
				selectEl.append(optionEl);
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

createCheckoutForm(cardConfig, "cardConfiguration", "card");
createCheckoutForm(paypalConfig, "paypalConfiguration", "paypal");
// createCheckoutForm(idealConfig, "idealConfiguration", "ideal");

