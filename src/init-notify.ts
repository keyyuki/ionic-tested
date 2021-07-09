import { getPlatforms } from "@ionic/react";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import firebase from "firebase";
import { firebaseConfig } from "./firebase-config";

export function initNotification(onChangeToken: (token: string) => void) {
  if (getPlatforms().includes("desktop")) {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.getToken().then((rs) => {
      console.log("I have a token", rs);
      onChangeToken(rs);
    });
    messaging.onMessage((rs) => {
      console.log("recieve mesage", rs);
    });
    console.log("it web");
    return;
  }
  console.log("Initializing HomePage");

  // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", (token: Token) => {
    alert("Push registration success, token: " + token.value);
    onChangeToken(token.value);
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener("registrationError", (error: any) => {
    alert("Error on registration: " + JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener(
    "pushNotificationReceived",
    (notification: PushNotificationSchema) => {
      alert("Push received: " + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      alert("Push action performed: " + JSON.stringify(notification));
    }
  );
}
