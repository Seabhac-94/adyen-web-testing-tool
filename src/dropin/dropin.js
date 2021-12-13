// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(async paymentMethodsResponse => {
        const configuration = {
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            removePaymentMethods: ['paysafecard', 'c_cash'],
            paymentMethodsConfiguration :{
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
                            dropin.setStatus('success', { message: 'Payment successful!' });
                        } else {
                          dropin.setStatus('error', { message: 'Something went wrong.'});
                        }
                    })
            }
        };

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

    });
});
