// template
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="breath-out" options={{ headerShown: false }} />
      <Stack.Screen name="welcom" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding1" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding4" options={{ headerShown: false }} />
      <Stack.Screen name="free-trial" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}