const paymentsDefaultConfig = {
    reference: "reference",
    countryCode: "NL",
    shopperName: 'John Doe',
    shopperEmail: 's.hopper@adyen.com',
    channel: 'Web',
    amount: {
        value: 100,
        currency: "EUR"
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