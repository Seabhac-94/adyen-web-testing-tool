// Same here. maybe moving this to an async function ?
// I see some async functions inside this function.

getClientKey().then((clientKey) => {
  // Check URL for redirectResult and sessionId
  const queryResultString = window.location.search;
  const urlParams = new URLSearchParams(queryResultString);
  const redirectResult = urlParams.get("redirectResult");
  const sessionId = urlParams.get("sessionId");
  // Support for redirectFromIssuerMethod for split payments.
  const md = urlParams.get("MD");
  const paRes = urlParams.get("PaRes");

  function initiateSession() {
    sessions().then(async (session) => {
      const configuration = {
        environment: "test", // Change to 'live' for the live environment.
        clientKey: clientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        session: {
          id: session.id, // Unique identifier for the payment session.
          sessionData: session.sessionData, // The payment session data.
        },
        onPaymentCompleted: (result, component) => {
          console.log(result);
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        onChange: (state, component) => {
          updateStateContainer(state); // Demo purposes only
        },
        beforeSubmit: (data, component, actions) => {
          updateRequestContainer(data);
          actions.resolve(data);
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
          card: {
            // Optional configuration
            hasHolderName: true,
            holderNameRequired: true,
          },
        },
      };
      // Create an instance of AdyenCheckout using the configuration object.
      const checkout = await AdyenCheckout(configuration);

      // Create an instance of Drop-in and mount it to the container you created.
      const dropinComponent = checkout
        .create("dropin", {
          onSelect: (activeComponent) => {
            if (activeComponent.state && activeComponent.state.data)
              updateStateContainer(activeComponent.data); // Demo purposes only
          },
        })
        .mount("#dropin-container");
    });
  }

  async function handleRedirect() {
    const configuration = {
      environment: "test", // Change to 'live' for the live environment.
      clientKey: clientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      session: {
        id: sessionId, // Retreived identifier for the payment completion on redirect.
      },
      onPaymentCompleted: (result, component) => {
        console.info(result);
        const paymentResult = result.resultCode;
        if (paymentResult === "Authorised" || paymentResult === "Received") {
          dropinComponent.setStatus("success");
        } else {
          dropinComponent.setStatus("error");
        }
        updateResponseContainer(result);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
    };
    // Create an instance of AdyenCheckout to handle the shopper returning to your website.
    // Configure the instance with the sessionId you extracted from the returnUrl.

    // const checkoutRedirect = await AdyenCheckout(configuration)
    // const checkout = await AdyenCheckout(configuration, configuration.session = { id:sessionId });
    const checkout = await AdyenCheckout(configuration);

    const dropinComponent = checkout
      .create("dropin")
      .mount("#dropin-container");

    // Submit the redirectResult value you extracted from the returnUrl.
    if (redirectResult) {
      checkout.submitDetails({ details: { redirectResult } });
    } else if (md && paRes) {
      // Or redirectResult is not present, submit the MD and PaRes in place of the redirectResult
      checkout.submitDetails({
        details: {
          MD: md,
          PaRes: paRes,
        },
      });
    }
  }

  // If no paramters are present in the URL, mount the Drop-in
  if (!redirectResult && !sessionId) {
    initiateSession();
    // Otherwise, handle the redirect
  } else {
    handleRedirect();
  }
});
