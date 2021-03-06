<?php
/**
 * Adyen Checkout Example (https://www.adyen.com/)
 * Copyright (c) 2019 Adyen BV (https://www.adyen.com/)
 */

require('api/paymentMethods.php');
require('api/paymentMethodsBalance.php');
require('api/orders.php');
require('api/orderCancel.php');
require('api/payments.php');
require('api/paymentsDetails.php');
require('api/paymentLinks.php');
require('api/listRecurringDetails.php');
require('api/disable.php');
require('api/originKeys.php');
require('api/clientKeys.php');
require('api/sessions.php');
require('api/saveCase.php');
require('api/donations.php');

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

    // /paymentMethods/balance
    case '/paymentMethodsBalance':
        header('Content-Type: application/json');
        echo getBalance();
        break;

    // /orders
    case '/orders':
        header('Content-Type: application/json');
        echo makeOrder();
        break;

    // /orders
    case '/orders/cancel':
        header('Content-Type: application/json');
        echo cancelOrder();
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

    case '/donations':
        header('Content-Type: application/json');
        echo makeDonation();
        break;

    // /paymentLinks
    case '/paymentLinks':
        header('Content-Type: application/json');
        echo createPaymentLink();
        break;

    // /listRecurringDetails
    case '/listRecurringDetails':
        header('Content-Type: application/json');
        echo listRecurringDetails();
        break;

    // /disable
    case '/disable':
        header('Content-Type: application/json');
        echo disable();
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
