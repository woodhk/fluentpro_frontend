// app/_layout.tsx
import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import './globals.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </>
  );
}