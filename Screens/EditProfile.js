import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Ensure to import Firebase config

const db = getFirestore(app);

const EditProfile = ({ navigation, route }) => {
  const { profileData } = route.params; // Get the passed profile data
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [field, setField] = useState(profileData.field);
  const [university, setUniversity] = useState(profileData.university);

  const auth = getAuth(); // Firebase Authentication instance
  const userId = auth.currentUser?.uid; // Get current user ID

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "User is not authenticated. Please login again.");
      return;
    }

    try {
      // Reference to the user document in Firestore using the authenticated user's ID
      const userDocRef = doc(db, 'users', userId);
      
      await updateDoc(userDocRef, { 
        name,
        email,
        field,
        university,
      });

      Alert.alert("Profile Updated", "Your profile has been successfully updated.");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={field}
        onChangeText={setField}
        placeholder="Field"
      />
      <TextInput
        style={styles.input}
        value={university}
        onChangeText={setUniversity}
        placeholder="University"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;
