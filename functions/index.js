const functions = require("firebase-functions");
// eslint-disable-next-line func-call-spacing
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51IMNIME5NOi7OAe06ZUqVRykm2P8PAMhMOEZfeYGDO2hqFWUy5hAh4pI1W86EyHX8enMZvmWIg6CE45wUkkUlTc200atcxaoqx");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.payWithStripe = functions.https.onRequest((request, response) => {
  stripe.charges.create({
    amount: request.body.amount,
    currency: request.body.currency,
    source: "tok_mastercard",
    metadata: {"token": request.body.token},
  }).then((charge) => {
    // asynchronously called
    response.send(charge);
  })
      .catch((err) =>{
        response.send(err);
        console.log(err);
      });
});
