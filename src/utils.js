// This sets the returnUrl, for standard Drop-in and Components, return to standard redirect page,
// else redirect back to sessions where we handle the redirectResult
function setReturnUrl() {
    if(window.location.pathname === '/sessions/') {
        return window.location.href
    } else {
        return 'http://localhost:3000/paymentCompletion.html'
    }
}


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


// We declare these values here to only need to change them in one place
const countryCode = 'NL';
const currency = 'EUR';
const value = 11800;
const shopperLocale = 'en_GB';
const shopperReference = 'shopper_' + makeReference(10);
const reference = 'testPayment_' + shopperReference;


const paymentMethodsConfig = {
    shopperReference: shopperReference,
    shopperLocale: shopperLocale,
    reference: reference,
    countryCode: countryCode,
    amount: {
        value: value,
        currency: currency
    }
};

const paymentsDefaultConfig = {
    shopperReference: shopperReference,
    reference: reference,
    countryCode: countryCode,
    shopperLocale: shopperLocale,
    shopperName: 'John Doe',
    shopperEmail: 's.hopper@adyen.com',
    channel: 'Web',
    returnUrl: setReturnUrl(),
    amount: {
        value: value,
        currency: currency
    },
    lineItems: [
        {
            id: '1',
            description: 'Test Item 1',
            amountExcludingTax: 10000,
            amountIncludingTax: 11800,
            taxAmount: 1800,
            taxPercentage: 1800,
            quantity: 1,
            taxCategory: 'High'
        }
    ],
    additionalData: {
        allow3DS2: true,
        executeTheeD: true
    }
};


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
