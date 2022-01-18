const paymentsParams = paymentsConfigParams();

// We declare these values here to only need to change them in one place
const countryCode = paymentsParams.countryCode;
var gcAmount = null;
var orderAmount = null;
var amount = {
            currency: paymentsParams.currency,
            value: paymentsParams.value
        };
const shopperLocale = paymentsParams.shopperLocale;
const shopperReference = paymentsParams.shopperReference;
const reference = paymentsParams.reference;
const storePaymentMethod = paymentsParams.storePaymentMethod
const shopperInteraction = paymentsParams.shopperInteraction
const recurringProcessingModel = paymentsParams.recurringProcessingModel

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
    amount
};

const paymentsDefaultConfig = {
    amount,
    shopperReference,
    reference,
    countryCode,
    shopperLocale,
    shopperName: 'John Doe',
    shopperEmail: 's.hopper@adyen.com',
    channel: 'Web',
    returnUrl: setReturnUrl(),
    origin: setOrigin(),
    storePaymentMethod,
    shopperInteraction,
    recurringProcessingModel,
    lineItems: lineItems(),
    additionalData: {
        allow3DS2: true,
        executeTheeD: true
    }
};
