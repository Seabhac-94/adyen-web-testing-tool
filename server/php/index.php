<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

require('api/paymentMethods.php');
require('api/payments.php');
require('api/paymentsDetails.php');
require('api/paymentLinks.php');
require('api/originKeys.php');
require('api/clientKeys.php');
require('api/sessions.php');
require('api/saveCase.php');

// Basic routing
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

switch($request_uri[0]) {
    // /saveCase
    case '/saveCase':
        header('Content-Type: application/json');
        echo saveCase();
        break;

    // /paymentMethods
    case '/paymentMethods':
        header('Content-Type: application/json');
        echo getPaymentMethods();
        break;

    // /payments
    case '/payments':
        header('Content-Type: application/json');
        echo initiatePayment();
        break;

    // /paymentsDetails
    case '/paymentsDetails':
        header('Content-Type: application/json');
        echo makeDetailsCall();
        break;

    // /paymentsDetails
    case '/paymentLinks':
        header('Content-Type: application/json');
        echo createPaymentLink();
        break;

    // /originKeys
    case '/originKeys':
        header('Content-Type: application/json');
        echo getOriginKey();
        break;

    // /clientKeys (there is no API, this is a mock)
    case '/clientKeys':
        header('Content-Type: application/json');
        echo getClientKey();
        break;
            
    // /sessions
    case '/sessions':
        header('Content-Type: application/json');
        echo initiateSessions();
        break;
    // default
    default:
        return false;

}
