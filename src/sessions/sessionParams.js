const sessionDefaultConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'NL',
    channel: 'Web',
    returnUrl: window.location.href,
    amount: {
        value: 1000,
        currency: 'EUR'
    },
    storePaymentMethod: true,
    billingAddress: {
        street: "Main Street",
        houseNumberOrName: "1",
        postalCode: "1234AB",
        city: "Amsterdam",
        stateOrProvince: "North Holland",
        country: "NL"
    },
    redirectFromIssuerMethod: "GET",
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
