import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Component, ReactNode, useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { ref, onValue, query, orderByChild, startAt, endBefore, get, set } from "@firebase/database";

import { useColorScheme } from '@/hooks/useColorScheme';
import { BrownTheme } from '@/constants/BrownTheme';
import { addNotificationReceivedListener, addNotificationResponseReceivedListener, AndroidImportance, EventSubscription, getDevicePushTokenAsync, getExpoPushTokenAsync, getPermissionsAsync, Notification, removeNotificationSubscription, requestPermissionsAsync, scheduleNotificationAsync, setNotificationCategoryAsync, setNotificationChannelAsync, setNotificationHandler } from 'expo-notifications';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { db } from '@/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';


SplashScreen.preventAutoHideAsync();

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  console.log(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#ff0000',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      console.log("pushTokenString");
      console.log(pushTokenString);
      try {
        const dataRef = ref(db, 'pushToken');
        set(dataRef, pushTokenString);
      } catch (e) {
        console.log('error');
        console.log(e);
      }

      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<EventSubscription>();
  const responseListener = useRef<EventSubscription>();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    const subscription = addNotificationReceivedListener(notification => {
      // Update the data instead of showing a new notification
      // setNotificationData(notification.request.content.data);
      console.log("notification");
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={BrownTheme}>
      <Stack>
        <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// export default RootLayout;
export default RootLayout;