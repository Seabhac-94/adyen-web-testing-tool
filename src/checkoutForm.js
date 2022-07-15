// Creates the options for the front end based on available options
// for each component/error/payment method

// Parameters fro the paymentMethods/payments call
const parametersConfig = {
  value: ["input"],
  currency: ["input"],
  shopperReference: ["input"],
  reference: ["input"],
  countryCode: ["input"],
  shopperLocale: ["input"],
  blockedPaymentMethods: ["input"],
  storePaymentMethod: [false, true, ""],
  shopperInteraction: ["ContAuth", "Ecommerce", ""],
  recurringProcessingModel: ["Subscription", "UnscheduledCardOnFile", "CardOnFile", ""],
  allow3DS2: [false, true],
  executeThreeD: [false, true],
};

// Select the component to be mounted
const flavourConfig = {
  flavour: [
    "bankTransfer_IBAN",
    "boletobancario",
    "alipay",
    "clearpay",
    "directdebit_GB",
    "bcmc_mobile",
    "sepadirectdebit",
    "trustly",
    "ach",
    "klarna_account",
    "klarna_paynow",
    "klarna",
    "bcmc",
    "paypal",
    "paywithgoogle",
    "ideal",
    "card",
    "dropin",
  ],
};

// Configuration for dropin
const dropinConfig = {
  openFirstPaymentMethod: [false, true],
  locale: ["input"],
  openFirstStoredPaymentMethod: [false, true],
  showStoredPaymentMethods: [false, true],
  showRemovePaymentMethodButton: [true, false],
  showPaymentMethods: [false, true],
  setStatusAutomatically: [false, true],
  instantPaymentTypes: ["paywithgoogle", null],
  showPayButton: [false, true],
};

// Payment methods configuration
const cardConfig = {
  name: ["input"],
  showStoredPaymentMethods: [false, true],
  brands: ["input"],
  showBrandIcon: [false, true],
  enableStoreDetails: [true, false],
  hasHolderName: [true, false],
  holderNameRequired: [true, false],
  positionHolderNameOnTop: [true, false],
  showBrandsUnderCardNumber: [true, false],
  hideCVC: [true, false],
  socialSecurityNumberMode: ["show", "hide", "auto"],
  billingAddressRequired: [true, false],
  billingAddressAllowedCountries: ["input"],
  minimumExpiryDate: ["input"],
};

const paypalConfig = {
  layout: ["horizontal", "vertical"],
  color: ["white", "black", "silver", "blue", "gold"],
  shape: ["pill", "rect"],
  label: ["checkout", "buynow", "pay", "paypal"],
  blockPayPalCreditButton: [true, false],
  blockPayPalPayLaterButton: [true, false],
};

const idealConfig = {
  showImage: [false, true],
  issuer: ["input"],
  highlightedIssuers: ["input"],
  placeholder: ["input"],
};

const googlePayConfig = {
  buttonType: ["book", "checkout", "donate", "order", "pay", "plain", "subscribe", "buy"],
  buttonColor: ["black", "white", "default"],
  buttonLocale: [
    "ar",
    "bg",
    "ca",
    "cs",
    "da",
    "de",
    "el",
    "es",
    "et",
    "fi",
    "fr",
    "hr",
    "id",
    "it",
    "ja",
    "ko",
    "ms",
    "nl",
    "no",
    "pl",
    "pt",
    "ru",
    "sk",
    "sl",
    "sr",
    "sv",
    "th",
    "tr",
    "zh",
    "uk",
    "en",
  ],
  buttonSizeMode: ["static", "fill"],
  emailRequired: [true, false],
  shippingAddressRequired: [true, false],
  billingAddressRequired: [true, false],
};

// Specific/common errors
const errorTesting = {
  noInvoiceLines: [true, false],
  threeDS2Timeout: [true, false],
  noBrowserInfoProvided: [true, false],
  invalidLanguageTag: [true, false],
};

const componentParameters = document.getElementById("componentParameters");

// Creates the dropdown options and the wrappers for the checkout form
function createCheckoutForm(x, y, z) {
  const a = document.createElement("div");
  a.className = "configWrapper";
  a.id = y;

  const b = document.createElement("button");
  b.className = "configObjTitle";
  b.innerHTML = z;
  a.append(b);

  const c = document.createElement("div");
  c.className = "checkoutDropdownWrapper hiddenForm";
  a.append(c);

  for (let [key, option] of Object.entries(x)) {
    const d = document.createElement("div");
    d.innerHTML = `<span>${key}: </span>`;
    c.append(d);

    if (option == "input") {
      var e = document.createElement("input");
    } else {
      var e = document.createElement("select");

      for (var i = option.length - 1; i >= 0; i--) {
        var f = document.createElement("option");
        f.className = "checkoutOptionDropdown";
        f.innerHTML = option[i];
        e.append(f);
      }
    }

    e.id = z + "_" + key;
    e.className = "checkoutDropdown";
    d.append(e);
  }

  b.addEventListener("click", function () {
    const g = b.nextElementSibling;
    g.classList.toggle("hiddenForm");
  });

  componentParameters.append(a);
}

// Create forms below
(function assignCheckoutForm() {
  const createCheckoutFormParams = {
    parametersConfig: [parametersConfig, "parametersConfiguration", "parameters"],
    flavourConfig: [flavourConfig, "flavourConfiguration", "flavour"],
    dropinConfig: [dropinConfig, "dropinConfiguration", "dropin"],
    cardConfig: [cardConfig, "cardConfiguration", "card"],
    paypalConfig: [paypalConfig, "paypalConfiguration", "paypal"],
    idealConfig: [idealConfig, "idealConfiguration", "ideal"],
    googlePayConfig: [googlePayConfig, "googlePayConfiguration", "paywithgoogle"],
    errorTesting: [errorTesting, "errorTestingConfiguration", "error"],
  };

  for (let [key, params] of Object.entries(createCheckoutFormParams)) {
    createCheckoutForm(params[0], params[1], params[2]);
    // Example of what this function is calling:
    // createCheckoutForm(cardConfig, "cardConfiguration", "card");
  }
})();

// Create headings on form
(function makeHeadings(b, c, d, e) {
  const headings = {
    parametersConfig: ["h4", "Parameters", "parametersConfiguration", true],
    componentHeading: ["h4", "Component Selection", "flavourConfiguration", true],
    dropinConfigHeading: ["h4", "Dropin Configuration", "dropinConfiguration", true],
    pmConfigHeading: ["h4", "Payment Method Configuration", "cardConfiguration"],
    errorHeading: ["h4", "Error Recreation (version dependant - select one only)", "errorTestingConfiguration", true],
  };

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
