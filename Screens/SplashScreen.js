import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const SplashScreen = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const navigation = useNavigation();
  const [loginPressed, setLoginPressed] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);

  useEffect(() => {
    // Animating scale and opacity on mount
    scale.value = withTiming(1, { duration: 1000 });
    opacity.value = withDelay(500, withTiming(1, { duration: 800 }));
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Back Arrow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.imageContainer, imageStyle]}>
        <Image
          source={require('../assets/splashimage.png')} // Replace with actual splash image
          style={styles.image}
        />
      </Animated.View>
      <Animated.Text style={[styles.title, textStyle]}>
        Let's get started!
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, textStyle]}>
        Login to enjoy the features we've provided, and stay connected
      </Animated.Text>
      <Animated.View style={textStyle}>
        <TouchableOpacity
          style={[
            styles.loginButton,
            loginPressed && styles.buttonPressed, // Change color on press
          ]}
          onPress={() => {
            setLoginPressed(true);
            navigation.navigate('LoginScreen'); // Navigate to LoginScreen
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.signupButton,
            signupPressed && styles.buttonPressed, // Change color on press
          ]}
          onPress={() => {
            setSignupPressed(true);
            navigation.navigate('SignupScreen'); // Navigate to SignUpScreen
          }}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCF2FF', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 26,
    color: '',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#5A95FF',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00509E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#5A95FF',
   
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: '#5A95FF',
    borderColor: '#5A95FF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonPressed: {
    backgroundColor: '#D9EFFF', // Lighter blue on press
  },
});

export default SplashScreen;
