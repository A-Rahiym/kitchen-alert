import { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" 
      options={{ headerShown: false }} 
      />
      <Stack.Screen name="settings" 
      options={{ headerShown: false }}
       />
      {/* <Stack.Screen name="pantry" 
      options={{ headerShown: false }} 
      /> */}

      <Stack.Screen name="mealtable"
        options={{ 
          headerShown: false,

        }}/>
      <Stack.Screen name="(modals)"
        options={{
          presentation: "formSheet",
          animation: "slide_from_bottom",
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
    </Stack>
  );
}