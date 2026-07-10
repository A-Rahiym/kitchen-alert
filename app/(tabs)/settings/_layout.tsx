import { Stack , useSegments } from "expo-router";
import {useNavigation} from "expo-router";
import {useLayoutEffect} from "react";
export default function SettingsLayout() {
  const navigation = useNavigation();
  const segments = useSegments();


  useLayoutEffect(() => {
   const parent = navigation.getParent();
   if (!parent) return;
   const isChild = segments.length > 1;
    parent.setOptions({
      tabBarStyle: isChild ? { display: "none" } : undefined,
    });
  }, [navigation, segments]);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}