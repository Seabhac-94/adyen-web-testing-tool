// This calls the retrieveVersionValue() function and converts it to a number
// We will use this to determine which instance of AdyenCheckout to create 
var checkoutVersion = parseInt(retrieveVersionValue()[0])

// Check URL for redirectResult
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString)
const redirectResult = urlParams.get('redirectResult')


function initiateCheckout() {
    // 0. Get clientKey
    getClientKey().then(clientKey => {
        getPaymentMethods().then(paymentMethodsResponse => {
            const configuration = {
                environment: 'test',
                clientKey: clientKey, // Mandatory. clientKey from Customer Area
                paymentMethodsResponse,
                removePaymentMethods: ['paysafecard', 'c_cash'],
                paymentMethodsConfiguration: {
                    paypal: {
                        amount: {
                            value: value,
                            currency: currency
                        }
                    }
                },
                onChange: state => {
                    updateStateContainer(state); // Demo purposes only
                },
                onSubmit: (state, dropin) => {
                    makePayment(state.data)
                        .then(response => {
                            if (response.action) {
                                dropin.handleAction(response.action)
                            } else {
                                showFinalResult(response)
                            }
                        })
                },
                onAdditionalDetails: (state, dropin) => {
                    updateRequestContainer(state.data);
                    makeDetailsCall(state.data)
                        .then(response => {
                            updateResponseContainer(response)
                            if (response.resultCode === 'Authorised' || response.resultCode === 'Received') {
                                dropin.setStatus('success', {
                                    message: 'Payment successful!'
                                });
                            } else {
                                dropin.setStatus('error', {
                                    message: 'Something went wrong.'
                                });
                            }
                        })
                }
            };

            (function checkCheckoutVersion() {
                if (checkoutVersion < 5) {
                    // 1. Create an instance of AdyenCheckou
                    const checkout = new AdyenCheckout(configuration);

                    // 2. Create and mount the Component
                    const dropin = checkout
                        .create('dropin', {
                            // Events
                            onSelect: activeComponent => {
                                if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                            }
                        })
                        .mount('#dropin-container');
                } else {
                    (async function initiateCheckout() {
                        // 1. Create an instance of AdyenCheckout
                        const checkout = await AdyenCheckout(configuration);

                        // 2. Create and mount the Component
                        const dropin = checkout
                            .create('dropin', {
                                // Events
                                onSelect: activeComponent => {
                                    if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                                }
                            })
                            .mount('#dropin-container');
                    })();
                }
            })();

        });
    });
};


function handleRedirect() {
    
    const detailsCall = {
        'details': {
            'redirectResult': redirectResult
        }
    }

    const configuration = {
        environment: 'test'
    };

    (function checkCheckoutVersionOnRedirect() {
        if (checkoutVersion < 5) {
            // Create an instance of AdyenCheckout using the configuration object.
            const checkout = new AdyenCheckout(configuration);

            // Create an instance of Drop-in and mount it to the container you created.
            const dropin = checkout.create('dropin').mount('#dropin-container');
            
            makeDetailsCall(detailsCall)
                .then(response => {
                    if (response.resultCode === 'Authorised' || response.resultCode === 'Received') {
                        dropin.setStatus('success', {
                            message: 'Payment successful!'
                        })
                    } else {
                        dropin.setStatus('error', {
                            message: 'Something went wrong.'
                        })
                    }
                })
  
        } else {
            (async function setDropinStatus() {

            // Create an instance of AdyenCheckout using the configuration object.
            const checkout = await AdyenCheckout(configuration);

            // Create an instance of Drop-in and mount it to the container you created.
            const dropin = checkout.create('dropin').mount('#dropin-container');

            makeDetailsCall(detailsCall)
                .then(response => {
                    if (response.resultCode === 'Authorised' || response.resultCode === 'Received') {
                        dropin.setStatus('success', {
                            message: 'Payment successful!'
                        })
                    } else {
                        dropin.setStatus('error', {
                            message: 'Something went wrong.'
                        })
                    }
                })

            })();
        }
    })();



};

if (!redirectResult) {
    initiateCheckout()
} else {
    handleRedirect()
}