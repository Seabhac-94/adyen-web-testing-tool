// const plFormData = [

//                 "pl-reference",
//                 "pl-currency",
//                 "pl-value",
//                 "pl-shopperReference",
//                 "pl-description",
//                 "pl-countryCode",
//                 "pl-shopperLocale",

//                 ]


function collectFormData(plId) {

    var formData = document.getElementById(plId);
    return formData.value;
    
}


// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());


// Make a paymentLink
const createPaymentLink = (data) =>
    httpPost('paymentLinks', data)
        .then(response => {
            return response;
        })
        .catch(console.error);