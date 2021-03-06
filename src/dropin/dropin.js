// This calls the retrieveVersionValue() function and converts it to a number
// We will use this to determine which instance of AdyenCheckout to create
var sdkVersion = parseInt(apiSdkVersions.sdkVersion[0]);

// Custom elements for support of components which don't use setStatus()
const componentSuccess = `<div class="adyen-checkout__status adyen-checkout__status--success"><img height="88" class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.gif" alt="Payment successful!"><span class="adyen-checkout__status__text">Payment successful!</span></div>`;
const componentError = `<div class="adyen-checkout__status adyen-checkout__status--error"><img class="adyen-checkout__status__icon adyen-checkout__image adyen-checkout__image--loaded" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.gif" alt="Something went wrong." height="88"><span class="adyen-checkout__status__text">Something went wrong.</span></div>`;

var paymentMethodsResponse = null;
var amount = null;

// Presents the recurring element when applicable
function handleRecurring(ref) {
  const recWrapper = document.querySelector(".response-recurring");
  recWrapper.classList.remove("hiddenForm");

  const proceedRecurring = document.getElementById("proceedRecurring");
  proceedRecurring.addEventListener("click", function (argument) {
    window.location.href = `http://localhost:3000/recurring?apiVersion=68&shopperReference=${ref}`;
  });
}

// Handles the final response and lets user proceed to recurring if applicable
function showFinalResponse(response, component, componentFlavour) {
  const result = response["resultCode"];

  if (result === "Authorised" || result === "Received") {
    try {
      // We should only check for the shopper reference for recurring
      // if the result is positive
      const recurringSR = response.additionalData["recurring.shopperReference"];
      const queriedSF = urlParams.get("shopperReference");
      var recurringShopperReference = "";

      // Supports the handleRecurring function for native and redirect
      if (recurringSR) {
        recurringShopperReference = recurringSR;
      } else {
        recurringShopperReference = queriedSF;
      }
    } catch (err) {
      console.error(err);
    } finally {
      // We check to see if there's no flavour so that it can handle redirects as well
      if (componentFlavour === "dropin" || !componentFlavour) {
        component.setStatus("success", {
          message: "Payment successful!",
        });
      } else {
        component.unmount();
        const result = document.getElementById("dropin-container");
        result.innerHTML = componentSuccess;
      }

      if (recurringShopperReference) {
        handleRecurring(recurringShopperReference);
      }
    }
  } else {
    if (componentFlavour === "dropin" || !componentFlavour) {
      component.setStatus("error", {
        message: "Something went wrong.",
      });
    } else {
      component.unmount();
      const result = document.getElementById("dropin-container");
      result.innerHTML = componentError;
    }
  }
}

async function handleDonation(response, component) {
  const donationWrapper = document.getElementById("donation-wrapper");
  donationWrapper.classList.remove("hiddenForm");

  const { donationToken, pspReference } = response;

  const donationRequest = {
    reference: `donation`,
    returnUrl: window.location.origin,
    paymentMethod: {
      type: "scheme",
    },
    donationToken,
    donationOriginalPspReference: pspReference,
    shopperInteraction: "ContAuth",
  };

  function handleOnDonate(state, component) {
    updateStateContainer(state);

    if (state.isValid) {
      var req = { ...donationRequest, ...state.data };
      updateRequestContainer(req);
      makeDonation(req).then(async (res) => {
        updateResponseContainer(res);
        const { payment, status, reference } = res;
        if (payment.resultCode === "Authorised") {
          component.setStatus("success");
        } else {
          component.setStatus("error");
        }
      });
    }
  }

  function handleOnCancel(state, component) {
    updateStateContainer(state);
    donation.unmount();
  }

  const donationConfig = {
    amounts: {
      currency: "EUR",
      values: [300, 500, 1000],
    },
    backgroundUrl: "../donationBanner.jpeg",
    description: "The Charitable Foundation is Adyen Giving Demo",
    logoUrl: "../donationLogo.png",
    name: "The Charitable Foundation",
    url: "https://adyen.com/",
    showCancelButton: true,
    onDonate: handleOnDonate,
    onCancel: handleOnCancel,
  };

  var checkout = null;

  if (sdkVersion < 5) {
    checkout = new AdyenCheckout();
  } else {
    checkout = await AdyenCheckout();
  }

  const donation = checkout.create("donation", donationConfig);

  const donationButton = document.getElementById("donate");
  donationButton.addEventListener("click", () => {
    donationWrapper.firstChild.nextSibling.classList.add("hiddenForm");
    component.unmount();
    donation.mount("#donation-container");
  });
}

async function initiateCheckout(paymentsDefaultConfig) {
  // 0. Get clientKey
  getClientKey().then(async (clientKey) => {
    const componentFlavour = await getValueOfConfig("flavour", "flavour");
    const pm = await paymentMethodsResponse;
    var locale = await getValueOfConfig("dropin", "locale");
    if (!locale) {
      locale = "en_GB";
    }
    const configuration = {
      environment: "test",
      clientKey: clientKey,
      paymentMethodsResponse: pm,
      removePaymentMethods: ["paysafecard", "c_cash"],
      amount,
      locale,
      paymentMethodsConfiguration: {
        paypal: paypalConfiguration(),
        card: cardConfiguration(pm),
        ideal: idealConfiguration(),
        paywithgoogle: googlePayConfiguration(),
      },
      onChange: async (state) => {
        updateStateContainer(state); // Demo purposes only
      },
      onSubmit: async (state, component) => {
        browserInfoError(state.data);
        try {
          const response = await makePayment(paymentsDefaultConfig, state.data);
          if (response.action) {
            component.handleAction(response.action);
          } else if (response.order && response.order.remainingAmount.value > 0) {
            // This handles the flow when there is an order in place for split payments
            const order = {
              orderData: response.order.orderData,
              pspReference: response.order.pspReference,
            };

            const gcPm = await getPaymentMethods({
              order,
              amount,
              countryCode,
            });

            var remainingAmount = response.order.remainingAmount;

            checkout.update({
              paymentMethodsResponse: gcPm,
              order,
              amount: remainingAmount,
            });
          } else {
            showFinalResponse(response, component, componentFlavour);
            if (response.donationToken) {
              handleDonation(response, component);
            }
          }
        } catch (e) {
          console.error(e);
        }
      },
      onError: async (error, component) => {
        console.info("Error thrown at: " + timeAndDate.toUTCString());
        console.error(error);
      },
      onBalanceCheck: async (resolve, reject, data) => {
        // Call /paymentMethods/balance
        try {
          const balanceResponse = await getBalance(amount, data);
          resolve(await balanceResponse);
          gcAmount = balanceResponse.balance;
          return gcAmount;
        } catch (e) {
          console.error(e);
        }
      },
      onOrderRequest: async (resolve, reject, data) => {
        // Call /orders
        try {
          const orderRequest = await makeOrder({ amount });
          resolve(await orderRequest);
          orderAmount = orderRequest.amount;
          return orderAmount;
        } catch (e) {
          console.error(e);
        }
      },
      onOrderCancel: async (order) => {
        // cancel the order
        try {
          const cancelReq = await cancelOrder(order);
          if (cancelReq.resultCode) {
            gcAmount = null;
            orderAmount = null;
            checkout.update({
              pm,
              order: null,
              amount,
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      onAdditionalDetails: async (state, component) => {
        updateRequestContainer(state.data);
        console.info("payment/details call attempt made at: " + timeAndDate.toUTCString());
        try {
          const detailsResponse = await makeDetailsCall(state.data);
          console.info("payment/details response at: " + timeAndDate.toUTCString());
          updateResponseContainer(detailsResponse);
          if (detailsResponse.action) {
            component.handleAction(detailsResponse.action);
          } else {
            showFinalResponse(detailsResponse, component);
            if (detailsResponse.donationToken) {
              handleDonation(detailsResponse, component);
            }
          }
        } catch (e) {
          console.error(e);
        }
      },
    };

    var checkout = null;

    if (sdkVersion < 5) {
      checkout = new AdyenCheckout(configuration);
    } else {
      checkout = await AdyenCheckout(configuration);
    }
    // 2. Create and mount the Component
    const selectedComponent = checkout.create(componentFlavour, dropinOptionalConfig()).mount("#dropin-container");

    // Called if custom button is used
    document.getElementById("customPayButton").addEventListener("click", function () {
      selectedComponent.submit();
    });
  });
}

async function handleRedirect(redirectResult) {
  var checkout = null;

  // Redirect result retreived from versionControl.js:6
  const detailsCall = {
    details: {
      redirectResult: await redirectResult,
    },
  };

  const configuration = {
    environment: "test",
  };

  async function sdkVersionRedirect(a) {
    if (a < 5) {
      checkout = new AdyenCheckout(configuration);
    } else {
      checkout = await AdyenCheckout(configuration);
    }
    return checkout;
  }

  updateRequestContainer(detailsCall);

  checkout = await sdkVersionRedirect(sdkVersion);

  const dropin = await checkout.create("dropin").mount("#dropin-container");

  console.info("payment/details call made at: " + timeAndDate.toUTCString());

  try {
    const detailsResponse = await makeDetailsCall(detailsCall);
    updateResponseContainer(await detailsResponse);
    console.info("payment/details response at: " + timeAndDate.toUTCString());
    showFinalResponse(await detailsResponse, dropin);
    if (detailsResponse.donationToken) {
      handleDonation(detailsResponse, dropin);
    }
  } catch (e) {
    console.log(e);
  }
}

// Selects which flow based on result of urlParams
if (!redirectResult) {
  var loadCheckout = document.getElementById("loadCheckout");
  loadCheckout.addEventListener("click", async function () {
    var hideCheckoutForm = document.getElementById("componentParameters");

    hideCheckoutForm.classList.add("hiddenForm");

    loadCheckout.classList.add("hiddenForm");
    infoPara.classList.add("hiddenForm");
    icon.classList.remove("fa-angle-double-down");
    icon.classList.add("fa-angle-double-right");

    const params = await setParams();
    var paymentMethodsConfig = await params.paymentMethodsConfig;
    var paymentsDefaultConfig = await params.paymentsDefaultConfig;
    amount = paymentMethodsConfig.amount;
    gcAmount = setParams.gcAmount;
    orderAmount = setParams.orderAmount;
    remainingAmount = setParams.remainingAmount;
    countryCode = paymentsDefaultConfig.countryCode;
    shopperReference = paymentsDefaultConfig.shopperReference;
    paymentMethodsResponse = await getPaymentMethods(paymentMethodsConfig);
    const initiate = await initiateCheckout(paymentsDefaultConfig);
    const demo = showCodeDemo();
  });
} else {
  // temporary fix for open issue
  // (async () => {
  //    const handleRedirectFlow = await handleRedirect(redirectResult)
  // })();

  setTimeout(() => {
    handleRedirect(redirectResult);
  }, 250);
}
