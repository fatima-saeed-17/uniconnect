import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('ManageNotificationScreen')}
      >
        <Text style={styles.optionText}>Manage Notification</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('ChangePasswordScreen')}
      >
        <Text style={styles.optionText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} 
      onPress={() => navigation.navigate('LogoutScreen')}
      >
        <Text style={styles.optionText}>Logout</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SettingsScreen;
