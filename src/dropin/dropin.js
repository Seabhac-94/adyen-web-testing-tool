// This calls the retrieveVersionValue() function and converts it to a number
// We will use this to determine which instance of AdyenCheckout to create 
var sdkVersion = parseInt(apiSdkVersions.sdkVersion[0]);

var componentFlavour = getValueOfConfig('flavour', 'flavour');

// Custom elements for support of components which don't use setStatus()
const componentSuccess = `<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>`;
const componentError = `<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Something went wrong." height="88"><span class="adyen-checkout__status__text">Something went wrong.</span></div>`;


function showFinalResponse(resultCode, component) {
    if (resultCode === "Authorised" || resultCode === "Received") {
        // We check to see if there's no flavour so that it can handle redirects as well
        if (componentFlavour === 'dropin' || !componentFlavour) {
            component.setStatus('success', {
                message: 'Payment successful!'
            });
        } else {
            component.unmount();
            const result = document.getElementById("dropin-container");
            result.innerHTML = componentSuccess;
        }
    } else {
        if (componentFlavour === 'dropin' || !componentFlavour) {
            component.setStatus('error', {
                message: 'Something went wrong.'
            });
        } else {
            component.unmount();
            const result = document.getElementById("dropin-container");
            result.innerHTML = componentError;
        }
    }
}


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
                            } else {
                                showFinalResponse(response.resultCode, component)
                            }
                        })
                },
                onAdditionalDetails: (state, component) => {
                    updateRequestContainer(state.data);
                    makeDetailsCall(state.data)
                        .then(response => {
                            updateResponseContainer(response);
                            showFinalResponse(response.resultCode, component);
                        })
                }
            };

            (function checkCheckoutVersion() {
                if (sdkVersion < 5) {
                    // 1. Create an instance of AdyenCheckou
                    const checkout = new AdyenCheckout(configuration);

                    // 2. Create and mount the Component
                    const selectedComponent = checkout
                        .create(componentFlavour, dropinOptionalConfig())
                        .mount('#dropin-container');

                    // Called if custom button is used
                    document.getElementById('customPayButton').addEventListener('click', function() {
                        selectedComponent.submit()
                    })
                } else {
                    (async function initiateCheckout() {
                        // 1. Create an instance of AdyenCheckout
                        const checkout = await AdyenCheckout(configuration);

                        // 2. Create and mount the Component
                        const selectedComponent = checkout
                            .create(componentFlavour, dropinOptionalConfig())
                            .mount('#dropin-container');

                        // Called if custom button is used
                        document.getElementById('customPayButton').addEventListener('click', function() {
                            selectedComponent.submit()
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
                    showFinalResponse(response.resultCode, dropin)
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
                        showFinalResponse(response.resultCode, dropin)
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