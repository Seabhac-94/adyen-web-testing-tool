// This calls the retrieveVersionValue() function and converts it to a number
// We will use this to determine which instance of AdyenCheckout to create 
var sdkVersion = parseInt(apiSdkVersions.sdkVersion[0])

var component = getValueOfConfig('flavour', 'flavour');

console.log(component);

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
                    paypal: paypalConfiguration(),
                    card: cardConfiguration(),
                    ideal: idealConfiguration(),
                    paywithgoogle: googlePayConfiguration()
                },
                onChange: state => {
                    updateStateContainer(state); // Demo purposes only
                },
                onSubmit: (state, component) => {
                    makePayment(state.data)
                        .then(response => {
                            if (response.action) {
                                component.handleAction(response.action)
                            } else if (response.resultCode === "Authorised" || response.resultCode === "Received") {
                                component.setStatus('success', {
                                    message: 'Payment successful!'
                                })
                            } else {
                                component.setStatus('error', {
                                    message: 'Something went wrong.'
                                })
                            }
                        })
                },
                onAdditionalDetails: (state, component) => {
                    updateRequestContainer(state.data);
                    makeDetailsCall(state.data)
                        .then(response => {
                            updateResponseContainer(response)
                            if (response.resultCode === 'Authorised' || response.resultCode === 'Received') {
                                component.setStatus('success', {
                                    message: 'Payment successful!'
                                });
                            } else {
                                component.setStatus('error', {
                                    message: 'Something went wrong.'
                                });
                            }
                        })
                }
            };

            (function checkCheckoutVersion() {
                if (sdkVersion < 5) {
                    // 1. Create an instance of AdyenCheckou
                    const checkout = new AdyenCheckout(configuration);

                    // 2. Create and mount the Component
                    const selectedComponent = checkout
                        .create(component, dropinOptionalConfig())
                        .mount('#dropin-container');

                    // Called if custom button is used
                    document.getElementById('customPayButton').addEventListener('click', function(){
                        component.submit()
                    })
                } else {
                    (async function initiateCheckout() {
                        // 1. Create an instance of AdyenCheckout
                        const checkout = await AdyenCheckout(configuration);

                        // 2. Create and mount the Component
                        const selectedComponent = checkout
                            .create(component, dropinOptionalConfig())
                            .mount('#dropin-container');

                        // Called if custom button is used
                        document.getElementById('customPayButton').addEventListener('click', function(){
                        component.submit()
                    })
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


    updateRequestContainer(detailsCall);

    (function checkSdkVersionOnRedirect() {
        if (sdkVersion < 5) {
            // Create an instance of AdyenCheckout using the configuration object.
            const checkout = new AdyenCheckout(configuration);

            // Create an instance of Drop-in and mount it to the container you created.
            const dropin = checkout.create('dropin').mount('#dropin-container');
            
            makeDetailsCall(detailsCall)
                .then(response => {
                    updateResponseContainer(response);
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
                    updateResponseContainer(response);
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

// Selects which flow based on result of urlParams
if (!redirectResult) {
    initiateCheckout()
} else {
    handleRedirect()
}
