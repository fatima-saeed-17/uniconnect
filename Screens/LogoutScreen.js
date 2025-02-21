import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Animated } from 'react-native';
import { auth } from '../firebaseConfig';  // Import auth from firebaseConfig

const LogoutScreen = ({ navigation }) => {
  const scaleAnimation = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnimation]);

  const handleLogout = () => {
    // Perform Firebase logout
    auth.signOut()
      .then(() => {
        // Show success message after logout
        Alert.alert("Logged Out", "You have been logged out successfully!");

        // Navigate to login screen
        navigation.replace('LoginScreen');  // Make sure 'Login' is the name of your login screen
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert("Error", "An error occurred during logout. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      {/* Outer Container */}
      <View style={styles.innerContainer}>
        {/* Animated Logout Icon */}
        <Animated.Image
          source={{
            uri: 'https://img.icons8.com/ios-filled/100/00509E/logout-rounded-left.png',
          }}
          style={[styles.image, { transform: [{ scale: scaleAnimation }] }]}
        />

        {/* Logout Confirmation Text */}
        <Text style={styles.title}>Logout</Text>
        <Text style={styles.description}>
          Are you sure? Do you want to Logout?
        </Text>

        {/* Logout Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00509E',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00509E',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
