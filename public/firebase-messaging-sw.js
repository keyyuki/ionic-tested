// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD8fdMdwRe_jtkNdvzLXIDs5J66BGu8tsU",
  authDomain: "testtg-5cea9.firebaseapp.com",
  databaseURL: "https://testtg-5cea9.firebaseio.com",
  projectId: "testtg-5cea9",
  storageBucket: "testtg-5cea9.appspot.com",
  messagingSenderId: "588106777673",
  appId: "1:588106777673:web:ab8b42ff246f869f192b98",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
