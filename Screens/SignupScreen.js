import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { auth } from '../firebaseConfig'; // Import the auth service from firebaseConfig
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth method

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [buttonScale] = useState(new Animated.Value(1)); 

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to validate the email domain
  const validateUniversityEmail = (email) => {
    const validDomains = ['uog.edu.pk', 'se.fjwu.edu.pk','students.nust.ac.zw','students.uettaxila.edu.pk'];
    const emailDomain = email.split('@')[1];
    return validDomains.includes(emailDomain);
  };

  const handleSignUp = () => {
    if (!formData.termsAccepted) {
      Alert.alert('Error', 'You must accept the Terms of Service to sign up.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!validateUniversityEmail(formData.email)) {
      Alert.alert('Error', 'Please use a valid university email (e.g., @uog.edu.pk).');
      return;
    }

    // Firebase Sign Up
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        Alert.alert('Success', `Welcome, ${user.email}!`);
        // Optionally navigate to another screen
        navigation.navigate('LoginScreen'); // Assuming you have this screen
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage); // Show Firebase error message
      });
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const toggleTerms = () => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: !prevData.termsAccepted,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={formData.firstname}
          onChangeText={(text) => handleInputChange('firstname', text)}
          placeholderTextColor="#B0BEC5"
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={formData.lastname}
          onChangeText={(text) => handleInputChange('lastname', text)}
          placeholderTextColor="#B0BEC5"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholderTextColor="#B0BEC5"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholderTextColor="#B0BEC5"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          placeholderTextColor="#B0BEC5"
        />

        {/* Custom Terms and Conditions "Checkbox" */}
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={toggleTerms} style={styles.customCheckbox}>
            {formData.termsAccepted && <View style={styles.checkedBox}></View>}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTerms} style={styles.termsTextContainer}>
            <Text style={styles.termsText}>
              {formData.termsAccepted ? '✓ Accepted' : 'Accept Terms and Conditions'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <Animated.View
          style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Existing Account */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  formContainer: {
    marginTop: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00509E',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 45,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#00509E',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderColor: '#00509E',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: '#00509E',
  },
  termsTextContainer: {
    marginLeft: 10,
  },
  termsText: {
    color: '#00509E',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#00509E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#00509E',
    marginTop: 20,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#002F6C',
  },
});

export default SignUpScreen;
