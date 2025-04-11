import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/Feather';

export default function CustomHeader() {
  return (
    <View style={styles.homeheader}>
      {/* Left section: Profile and greeting */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80" }}
            style={styles.pfpheader}
          />
        </TouchableOpacity>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Good day</Text>
          <Text style={styles.nameText}>Katelyn!</Text>
        </View>
      </View>

      {/* Right section: Three dots icon */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Icon name="log-out" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    homeheader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
      backgroundColor: '#4C6EE8',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    pfpheader: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    greetingContainer: {
      flexDirection: 'column',
    },
    greetingText: {
      fontSize: 13,
      color: '#fff',
      
    },
    nameText: {
      fontSize: 18,
      fontWeight: "bold",
      color: '#fff',
    },
    moreIcon: {
     
    },
  });
  