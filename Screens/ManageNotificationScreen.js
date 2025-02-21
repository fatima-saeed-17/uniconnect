import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManageNotificationsScreen = () => {
  const [chatNotifications, setChatNotifications] = useState(false);
  const [eventNotifications, setEventNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Notification</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Chat Notifications</Text>
        <Switch value={chatNotifications} onValueChange={setChatNotifications} />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Events & Internship Notifications</Text>
        <Switch value={eventNotifications} onValueChange={setEventNotifications} />
      </View>
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
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ManageNotificationsScreen;
