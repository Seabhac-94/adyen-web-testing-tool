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
                        currency: "EUR",
                        amount: "1000"
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
                            alert(response.resultCode)
                        }
                    })
            },
            onAdditionalDetails: (state, dropin) => {
                makeDetailsCall(state.data)
                    .then(response => {
                        if (response.action) {
                            dropin.handleAction(response.action)
                        } else {
                            alert(response.resultCode)
                        }
                    })
            }
        };

        // 1. Create an instance of AdyenCheckout
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

    });
});


