import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import LottieView from 'lottie-react-native'; // Import LottieView

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [resendEnabled, setResendEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email. Please check your inbox.');
      setResendEnabled(false);
    } catch (error) {
      console.error('Error resetting password:', error);

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('No user found with this email. Please check the email address or sign up.');
        setResendEnabled(true);
      } else {
        Alert.alert('Error', 'Failed to send reset email. Please try again later.');
      }
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Animation */}
      <LottieView
        source={require('../assets/animations/resetPasswordAnimation.json')} // Updated path to animation
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>Enter your email, and we will send you a reset link.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Email Here!"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#00509E',
    paddingHorizontal: 20, // Add padding for better text alignment
  },
  input: {
    width: '90%', 
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#00509E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%', 
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#00509E',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
