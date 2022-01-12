const paymentMethodsConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'NL',
    amount: {
        value: 1000000,
        currency: 'EUR'
    }
};

const paymentsDefaultConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'NL',
    channel: 'Web',
    returnUrl:"http://localhost:3000/playground/dropin?apiVersion=67",
    amount: {
        value: 1000000,
        currency: 'EUR'
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
    ]
};