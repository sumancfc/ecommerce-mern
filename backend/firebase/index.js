const admin = require("firebase-admin");

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-react-ed5b0.firebaseio.com",
});

module.exports = admin;
