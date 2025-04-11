import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import CustomHeader from '@/components/header';
import Icon from 'react-native-vector-icons/Feather';

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#4680F3',     
          height: 60,                  
          paddingBottom: 10,           
          elevation: 10,               
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader/> ,
          headerStyle: { 
            backgroundColor: "#4C6EE8", 
            height: 80,
            elevation: 0
          },
          headerTitleContainerStyle: {
            position: "absolute", 
            left: -5, 
            right: 0, 
            width: "100%",
            bottom: 0, 
            alignItems: "flex-start",
          },
          tabBarLabel: ({ focused }: { color: string; focused: boolean }) => (
            <Text
              style={{
                color: focused ? 'white' : '#b1c2e6',  // Change color based on focus
                fontSize: 10,  
                fontWeight: 'bold', 
                marginTop: 4,  
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }: { color: string; focused: boolean }) => (
            <Icon
              size={24}  
              name="home" 
              color={focused ? 'white' : '#b1c2e6'}  // Change color based on focus
              style={{ marginTop: 5 }}  
            />
          ),
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader/> ,
          headerStyle: { 
            backgroundColor: "#4C6EE8", 
            height: 80,
            elevation: 0
          },
          headerTitleContainerStyle: {
            position: "absolute", 
            left: -5, 
            right: 0, 
            width: "100%",
            bottom: 0, 
            alignItems: "flex-start",
          },
          tabBarLabel: ({ focused }: { color: string; focused: boolean }) => (
            <Text
              style={{
                color: focused ? 'white' : '#b1c2e6',  // Change color based on focus
                fontSize: 10,  
                fontWeight: 'bold', 
                marginTop: 4,  
              }}
            >
              Todo
            </Text>
          ),
          tabBarIcon: ({ focused }: { color: string; focused: boolean }) => (
            <Icon
              size={24}  
              name="check-square" 
              color={focused ? 'white' : '#b1c2e6'}  // Change color based on focus
              style={{ marginTop: 5 }}  
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader/> ,
          headerStyle: { 
            backgroundColor: "#4C6EE8", 
            height: 80,
            elevation: 0
          },
          headerTitleContainerStyle: {
            position: "absolute", 
            left: -5, 
            right: 0, 
            width: "100%",
            bottom: 0, 
            alignItems: "flex-start",
          },
          tabBarLabel: ({ focused }: { color: string; focused: boolean }) => (
            <Text
              style={{
                color: focused ? 'white' : '#b1c2e6',  // Change color based on focus
                fontSize: 10,  
                fontWeight: 'bold', 
                marginTop: 4,  
              }}
            >
              Transactions
            </Text>
          ),
          tabBarIcon: ({ focused }: { color: string; focused: boolean }) => (
            <Icon
              size={24}  
              name="clipboard" 
              color={focused ? 'white' : '#b1c2e6'}  // Change color based on focus
              style={{ marginTop: 5 }}  
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader/> ,
          headerStyle: { 
            backgroundColor: "#4C6EE8", 
            height: 80,
            elevation: 0
          },
          headerTitleContainerStyle: {
            position: "absolute", 
            left: -5, 
            right: 0, 
            width: "100%",
            bottom: 0, 
            alignItems: "flex-start",
          },
          tabBarLabel: ({ focused }: { color: string; focused: boolean }) => (
            <Text
              style={{
                color: focused ? 'white' : '#b1c2e6',  // Change color based on focus
                fontSize: 10,  
                fontWeight: 'bold', 
                marginTop: 4,  
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }: { color: string; focused: boolean }) => (
            <Icon
              size={24}  
              name="user" 
              color={focused ? 'white' : '#b1c2e6'}  // Change color based on focus
              style={{ marginTop: 5 }}  
            />
          ),
        }}
      />
    </Tabs>
  );
}
