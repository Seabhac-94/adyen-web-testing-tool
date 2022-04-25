function setParams() {

    const paymentsParams = paymentsConfigParams();

    // Values from utils.paymentsConfigParams are returned here so that utils can be used for other integrations
    const { countryCode,
            shopperLocale,
            currency,
            value,
            shopperReference, 
            reference, 
            blockedPaymentMethods, 
            storePaymentMethod, 
            shopperInteraction, 
            recurringProcessingModel, 
            executeThreeD, 
            allow3DS2 } = paymentsParams

    var remainingAmount = null
    var gcAmount = null;
    var orderAmount = null;
    var amount = {
                currency,
                value
            };

    function lineItems() {
        var lineItems = [
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
        ]

        const noLines = getValueOfConfig('error', 'noInvoiceLines')
        if (noLines) {
            lineItems = []
        }
        return lineItems
    }

    const paymentMethodsConfig = {
        shopperReference,
        shopperLocale,
        reference,
        countryCode,
        amount,
        blockedPaymentMethods
    };

    const paymentsDefaultConfig = {
        amount,
        shopperReference,
        reference,
        countryCode,
        shopperLocale,
        shopperName: {
            firstName: "John",
            lastName: "Doe"
        },
        shopperEmail: 's.hopper@adyen.com',
        telephoneNumber: "+31 20 779 1846",
        channel: 'Web',
        returnUrl: setReturnUrl(shopperReference),
        origin: setOrigin(),
        storePaymentMethod,
        shopperInteraction,
        recurringProcessingModel,
        lineItems: lineItems(),
        additionalData: {
            allow3DS2,
            executeThreeD
        }
    };

    return {
        gcAmount,
        orderAmount,
        remainingAmount,
        paymentMethodsConfig,
        paymentsDefaultConfig
    }

}
