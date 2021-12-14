// Check URL for redirectResult and sessionId
const queryResultString = window.location.search;
const urlParams = new URLSearchParams(queryResultString)
const redirectResult = urlParams.get('redirectResult')

const detailsCall = {
    'details': {
        'redirectResult': redirectResult
    }   
}

const configuration = {
    environment: 'test'
};

(async function setDropinStatus() {
    // Create an instance of AdyenCheckout using the configuration object.
    const checkout = await AdyenCheckout(configuration);

    // Create an instance of Drop-in and mount it to the container you created.
    const dropin = checkout.create('dropin').mount('#result')


makeDetailsCall(detailsCall)
    .then(response => {
        if (response.resultCode === 'Authorised' || response.resultCode === 'Received') {
            dropin.setStatus('success', { message: 'Payment successful!' })
        } else {
            dropin.setStatus('error', { message: 'Something went wrong.'})
        }
    })
})();

