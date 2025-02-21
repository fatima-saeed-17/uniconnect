import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'; // Updated import for Firebase

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    
    const user = auth.currentUser; // Get the current authenticated user
    if (!user) {
      console.log('User is not authenticated');
      Alert.alert('Error', 'No user is logged in.');
      return;
    }
  
    console.log('Starting password change process...');
    console.log('Current User:', user.email);
  
    // Reauthenticate the user with Firebase using the old password
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    console.log('Reauthentication Credential:', credential);
  
    try {
      // Reauthenticate the user
      await reauthenticateWithCredential(user, credential);
      console.log('Reauthentication successful!');
  
      // Check if the password is weak
      if (newPassword.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long.');
        return;
      }
  
      // Update the password in Firebase
      console.log('Attempting to update password...');
      await updatePassword(user, newPassword);
      console.log('Password updated successfully!');
  
      // Show success modal
      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Error during password change:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Change Password</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      {/* Old Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry={!showOldPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowOldPassword(!showOldPassword)}
        >
          <Ionicons
            name={showOldPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#00509E"
          />
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Ionicons
            name={showNewPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#00509E"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#8E8E8E"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#00509E"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Create Password</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={successModalVisible}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
            <Text style={styles.modalText}>Password Changed Successfully!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#00509E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#00509E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
