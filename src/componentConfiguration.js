function dropinOptionalConfig() {
  const component = "dropin";

  // Supports array for instantPaymentTypes
  var instantPaymentTypesValue = getValueOfConfig(component, "instantPaymentTypes");

  if (instantPaymentTypesValue != "") {
    var instantPaymentTypes = instantPaymentTypesValue.split(", ");
  }

  var showPayButton = getValueOfConfig(component, "showPayButton");

  if (!showPayButton) {
    const customPay = document.getElementById("customPayButton");
    customPay.classList.remove("hiddenForm");
  }

  return {
    //Configuration
    openFirstPaymentMethod: getValueOfConfig(component, "openFirstPaymentMethod"),
    openFirstStoredPaymentMethod: getValueOfConfig(component, "openFirstStoredPaymentMethod"),
    showStoredPaymentMethods: getValueOfConfig(component, "showStoredPaymentMethods"),
    showRemovePaymentMethodButton: getValueOfConfig(component, "showRemovePaymentMethodButton"),
    showPaymentMethods: getValueOfConfig(component, "showPaymentMethods"),
    setStatusAutomatically: getValueOfConfig(component, "setStatusAutomatically"),
    instantPaymentTypes,
    showPayButton,
    // Events
    onSelect: (activeComponent) => {
      if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
    },
    onReady: (component) => {
      console.info("Dropin ready");
    },
    onError: (error, component) => {
      console.info("Error thrown at: " + timeAndDate.toUTCString());
      console.error(error);
    },
    onDisableStoredPaymentMethod: async function (storedPaymentMethodId, resolve, reject) {
      let disableData = {
        recurringDetailReference: storedPaymentMethodId,
        shopperReference,
      };
      const disableRec = await disable(disableData);

      if (disableRec.response === "[detail-successfully-disabled]") {
        resolve();
      } else {
        reject();
      }
    },
  };
}

// Payment methods configuration, called in dropin.js
function cardConfiguration(paymentMethodsResponse) {
  const component = "card";

  // Defaults to brands in paymentMethods response if none provided
  for (let [key, value] of Object.entries(paymentMethodsResponse)) {
    for (var i = 0; i < value.length; i++) {
      let pm = value[i];
      if (pm["type"] === "scheme" && !pm["id"]) {
        var brands = pm["brands"];
      }
    }
  }
  var brandsValue = getValueOfConfig(component, "brands");
  if (brandsValue != "") {
    brands = brandsValue.split(", ");
  }

  // Defaults to credit card if no name is selected
  var name = getValueOfConfig(component, "name");
  if (name == "") {
    name = "Credit Card";
  }

  return {
    name,
    showStoredPaymentMethods: getValueOfConfig(component, "showStoredPaymentMethods"),
    brands,
    showBrandIcon: getValueOfConfig(component, "showBrandIcon"),
    enableStoreDetails: getValueOfConfig(component, "enableStoreDetails"),
    hasHolderName: getValueOfConfig(component, "hasHolderName"),
    holderNameRequired: getValueOfConfig(component, "holderNameRequired"),
    positionHolderNameOnTop: getValueOfConfig(component, "positionHolderNameOnTop"),
    hideCVC: getValueOfConfig(component, "hideCVC"),
    socialSecurityNumberMode: getValueOfConfig(component, "socialSecurityNumberMode"),
    billingAddressRequired: getValueOfConfig(component, "billingAddressRequired"),
    billingAddressAllowedCountries: getValueOfConfig(component, "billingAddressAllowedCountries"),
    minimumExpiryDate: getValueOfConfig(component, "minimumExpiryDate"),
    onBinLookup: (state, dropin) => {
      console.log("onBinLookup", state);
    },
    onBinValue: (state, dropin) => {
      console.log("onBinValue", state);
    },
  };
}

function paypalConfiguration() {
  const component = "paypal";

  return {
    amount,
    showPayButton: true,
    style: {
      layout: getValueOfConfig(component, "layout"),
      shape: getValueOfConfig(component, "shape"),
      color: getValueOfConfig(component, "color"),
      label: getValueOfConfig(component, "label"),
    },
    vault: true,
    blockPayPalCreditButton: getValueOfConfig(component, "blockPayPalCreditButton"),
    blockPayPalPayLaterButton: getValueOfConfig(component, "blockPayPalPayLaterButton"),
    // Support for v5.0.0 onwards
    onError: (error, component) => {
      console.info("Error thrown at: " + timeAndDate.toUTCString());
      console.error(error);
      component.closeActivePaymentMethod();
    },
    // Support for v4
    onCancel: (error, component) => {
      console.info("Cancel thrown at: " + timeAndDate.toUTCString());
      console.error(error);
      component.closeActivePaymentMethod();
    },
    onShippingChange: function (data, actions) {
      // Listen to shipping changes.
      console.log("New shipping address: ", data.shipping_address);
      actions.resolve(data);
    },
    onInit: (data, actions) => {
      console.log("onInit", data);
      actions.enable(data);
    },
    onClick: () => {
      console.log("PayPal Initiated");
    },
  };
}

function idealConfiguration() {
  const component = "ideal";

  var placeholder = getValueOfConfig(component, "placeholder");
  if (placeholder == "") {
    var placeholder = "Select your bank";
  }

  return {
    showImage: getValueOfConfig(component, "showImage"),
    issuer: getValueOfConfig(component, "issuer"),
    highlightedIssuers: getValueOfConfig(component, "highlightedIssuers"),
    placeholder,
  };
}

function googlePayConfiguration() {
  const component = "paywithgoogle";

  return {
    environment: "TEST",
    amount,
    buttonType: getValueOfConfig(component, "buttonType"),
    buttonColor: getValueOfConfig(component, "buttonColor"),
    buttonLocale: getValueOfConfig(component, "buttonLocale"),
    buttonSizeMode: getValueOfConfig(component, "buttonSizeMode"),
    emailRequired: getValueOfConfig(component, "emailRequired"),
    shippingAddressRequired: getValueOfConfig(component, "shippingAddressRequired"),
    billingAddressRequired: getValueOfConfig(component, "billingAddressRequired"),
    billingAddressParameters: {
      format: "MIN",
    },
    onAuthorized: function (event) {
      console.log(event); // Demo purposes only
    },
  };
}
