import { useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const verifyPermission = useCallback(async () => {
    const { granted } = await Notifications.requestPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant notification permission to use this app"
      );
    }
    return granted;
  }, []);

  useEffect(() => {
    const retrievePushToken = async () => {
      const hasPermission = await verifyPermission();
      if (!hasPermission) return;

      const pushToken = await Notifications.getExpoPushTokenAsync();
      console.log(pushToken);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.LOW,
        });
      }
    };

    retrievePushToken();
  }, [verifyPermission]);

  useEffect(() => {
    const notificationSubscriber =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION RECEIVED");
        console.log(notification);
        console.log(notification.request.content.data.username);
      });

    const notificationResponseHandlerSubscriber =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED");
        console.log(response);
        const username = response.notification.request.content.data.username;
        console.log(username);
      });

    return () => {
      notificationSubscriber.remove();
      notificationResponseHandlerSubscriber.remove();
    };
  }, []);

  const sendPushNotificationHandler = async () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "Expo Token String Received",
        title: "Test - sent from a device!",
        body: "This is a test!",
      }),
    });
  };

  const scheduleNotificationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of notification.",
        data: { username: "Leo" },
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
