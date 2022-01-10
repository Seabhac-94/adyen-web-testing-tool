// This sets the returnUrl, for standard Drop-in and Components, return to standard redirect page,
// else redirect back to sessions where we handle the redirectResult
function setReturnUrl() {

    return `${window.location.href}&shopperReference=${shopperReference}`

};


// Sets the origin based on the test case
function setOrigin() {
    var origin = window.location.origin
    var threeDS2Timeout = getValueOfConfig('error', 'threeDS2Timeout')
    if (threeDS2Timeout) {
        origin = "https://adyen.com"
    }
    return origin
};


// This creates a unique reference for the payment and shopper
function makeReference(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};


function paymentsConfigParams() {

    var countryCode = getValueOfConfig('parameters', 'countryCode');
    if (countryCode === '') {countryCode = 'NL'}

    var currency = getValueOfConfig('parameters', 'currency');
    if (currency === '') {currency = 'EUR'}

    var value = getValueOfConfig('parameters', 'value');
    if (value === '') {value = 11800;} else {value = parseInt(value)}

    var shopperLocale = getValueOfConfig('parameters', 'shopperLocale');
    if (shopperLocale === '') {shopperLocale = 'en_GB'}

    var shopperReference = getValueOfConfig('parameters', 'shopperReference');
    if (shopperReference === '') {shopperReference = 'shopper_' + makeReference(10)}

    var reference = getValueOfConfig('parameters', 'reference');
    if (reference === '') {reference = 'testPayment_' + shopperReference}

    return {

        countryCode,
        currency,
        value,
        shopperLocale,
        shopperReference,
        reference,
    
    }

}


// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());


// Get all available payment methods from the local server
const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);


// Get all available payment methods from the local server
const getBalance = (data) =>
    httpPost('paymentMethodsBalance', data)
        .then(response => {
            if (response.error) throw 'Call failed';

            return response;
        })
        .catch(console.error);


// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };

    updateRequestContainer(paymentRequest);

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';
            updateResponseContainer(response);
            return response;
        })
        .catch(console.error);
};


// Get all available payment methods from the local server
const makeDetailsCall = (details) =>
    httpPost('paymentsDetails', details)
        .then(response => {
            return response;
        })
        .catch(console.error);


// Get all recurring payment methods from the local server
const listRecurringDetails = (data) =>
    httpPost('listRecurringDetails', data)
        .then(response => {
            return response;
        })
        .catch(console.error);


// Get all recurring payment methods from the local server
const disable = (data) =>
    httpPost('disable', data)
        .then(response => {
            return response;
        })
        .catch(console.error);


// Posts a new payment into the local server
const sessions = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const sessionRequest = { ...paymentsConfig, ...paymentMethod };

    return httpPost('sessions', sessionRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';
            return response;
        })
        .catch(console.error);
};


// Function in progress that will save the saved details for the next running of server
const saveCase = () => 
    httpPost('saveCase')
        .catch(console.error);

// // Calls saveCase - commenting out temporarily
// document.getElementById('saveCase').addEventListener('click', function(){
//     saveCase()
// });

// // Test call to savedCases.js
// document.getElementById('displaySavedCase').addEventListener('click', function(){
//     console.log(savedCases)
// });


// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);


// Fetches a clientKey from the 
const getClientKey = () =>
    httpPost('clientKeys')
        .then(response => {
            if (response.error || !response.clientKey) throw 'No clientKey available';

            return response.clientKey;
        })
        .catch(console.error);
