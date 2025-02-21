import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LottieView from 'lottie-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scaleAnim = new Animated.Value(1);
  const headerAnim = new Animated.Value(0);

  useLayoutEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Success', `Welcome back, ${user.email}!`);
        navigation.navigate('CreateProfileScreen');
      })
      .catch(() => {
        setErrorMessage('The password you entered is wrong');
      });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Header with animated text */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#00509E" />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerText, { opacity: headerAnim }]}>
          Login
        </Animated.Text>
      </View>

      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/animations/Animation - 1733758929641.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#00509E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#B0C4DE"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={[styles.inputContainer, errorMessage && styles.errorBorder]}>
        <Icon name="lock" size={24} color="#00509E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#B0C4DE"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="#00509E"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            animateButton();
            handleLogin();
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Google Login */}
      <TouchableOpacity
        style={[styles.socialButton, { marginTop: 10 }]}
        onPress={() => Alert.alert('Login with Google', 'This feature is under development.')}
      >
        <FontAwesome name="google" size={18} color="#EA4335" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* LinkedIn Login */}
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => Alert.alert('Login with LinkedIn', 'This feature is under development.')}
      >
        <FontAwesome name="linkedin" size={18} color="#0077B5" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Login with LinkedIn</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignupScreen')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 25,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the left
    marginBottom: 20, // Reduced space between header and other elements
  },
  headerText: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    color: '#00509E',
    marginLeft: 15, // Reduced space between arrow and text
    marginStart:90
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#00509E',
    paddingVertical: 10,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#00509E',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00509E',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 16, // Increased for a larger height
    marginBottom: 10,
    elevation: 3,
    marginHorizontal: 25, // Reduced to make the button wider
    justifyContent: 'center', // Center text inside the button
},

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 15,
    elevation: 3,
    marginHorizontal: 40,
  },
  socialIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#00509E',
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#00509E',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
