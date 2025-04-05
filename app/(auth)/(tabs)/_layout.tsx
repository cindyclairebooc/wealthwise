import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function AuthLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{ headerShown: false }}
      />
    </Tabs>
  );
}
