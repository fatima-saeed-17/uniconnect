import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo1.png')} style={styles.logo} />

      {/* App Name */}
      <Text style={styles.appName}>UniConnect</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>One platform endless connections</Text>

      {/* Arrow Button */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
        
          navigation.navigate('SplashScreen'); 
        }}
      >
        <Text style={styles.arrowText}>&rarr;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCF2FF', // Light blue gradient
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150, // Adjust dimensions as per your logo
    height: 150,
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00509E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  arrowButton: {
    width: 60,
    height: 60,
    backgroundColor: '#B2EBF2', // Circular arrow button background
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add shadow for better appearance
  },
  arrowText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
});
