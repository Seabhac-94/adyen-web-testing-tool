<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 * /payments Documentation: https://docs.adyen.com/api-explorer/#/PaymentSetupAndVerificationService/v40/payments
 */

/**
 * Make a payment
 */
function makeDonation() {
    if (file_get_contents('php://input') != '') {
        $request = json_decode(file_get_contents('php://input'), true);
    } else {
        $request = array();
    }

    $getVersion = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_QUERY);
    parse_str($getVersion, $output);
    $version = (int) $output['apiVersion'];

    $apikey = getenv('CHECKOUT_APIKEY');
    $merchantAccount = getenv('MERCHANT_ACCOUNT');
    $url = "https://checkout-test.adyen.com/v68/donations";

    $data = [
        'merchantAccount' => $merchantAccount,
        'donationAccount' => 'AdyenGivingDemo'
    ];

    // Convert data to JSON
    $json_data = json_encode(array_merge($data, $request));

    //  Initiate curl
    $curlAPICall = curl_init();

    // Set to POST
    curl_setopt($curlAPICall, CURLOPT_CUSTOMREQUEST, "POST");

    // Will return the response, if false it print the response
    curl_setopt($curlAPICall, CURLOPT_RETURNTRANSFER, true);

    // Add JSON message
    curl_setopt($curlAPICall, CURLOPT_POSTFIELDS, $json_data);

    // Set the url
    curl_setopt($curlAPICall, CURLOPT_URL, $url);

    // Api key
    curl_setopt($curlAPICall, CURLOPT_HTTPHEADER,
        array(
            "X-Api-Key: " . $apikey,
            "Content-Type: application/json",
            "Content-Length: " . strlen($json_data)
        )
    );

    // Execute
    $result = curl_exec($curlAPICall);

    // Error Check
    if ($result === false){
      throw new Exception(curl_error($curlAPICall), curl_errno($curlAPICall));
    }

    // Closing
    curl_close($curlAPICall);

    // This file returns a JSON object
    return $result;
}
