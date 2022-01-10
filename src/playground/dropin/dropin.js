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
            amount: {
                currency: "EUR",
                amount: paymentMethodsConfig.amount
            },
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onBalanceCheck: function (resolve, reject, data) {
               // Call /paymentMethods/balance
               getBalance(data)
                .then(balanceResponse => {
                    console.log(balanceResponse)
                    resolve(balanceResponse);
                })
            },
            onSubmit: (state, dropin) => {
                makePayment(state.data)
                    .then(response => {
                        if (response.action) {
                            dropin.handleAction(response.action)
                        } else if (response.resultCode === "Authorised" || response.resultCode === "Received") {
                            dropin.setStatus('success')
                        } else {
                            dropin.setStatus('error')
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
                    },
                    showPayButton: true
                })
                .mount('#dropin-container');

    });
});


