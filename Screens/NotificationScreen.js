import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("All");

  const notifications = [
    {
      id: "1",
      sender: "Director IT Services.uog",
      subject: "Fwd: Open seminar of PhD scholar",
      date: "1st Jan 2025, 2pm",
      unread: false,
      icon: require("../assets/calender.jpg"),
    },
    {
      id: "2",
      sender: "Director IT Services.uog",
      subject: "Fwd: Open seminar of PhD scholar",
      date: "1st Jan 2025, 2pm",
      unread: true,
      icon: require("../assets/calender.jpg"),
    },
    {
      id: "3",
      sender: "Director Student Affairs.giftuni",
      subject: "Fwd: Invitation to Participate in M. Phil",
      date: "12th Jan 2025, 2pm",
      unread: false,
      icon: require("../assets/invitation.jpg"),
    },
    {
      id: "4",
      sender: "Director Student Affairs.giftuni",
      subject: "Fwd: Invitation to Participate in M. Phil",
      date: "2h",
      unread: true,
      icon: require("../assets/invitation.jpg"),
    },
  ];

  const filteredNotifications = activeTab === "All"
    ? notifications
    : notifications.filter((notification) => notification.unread);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Image source={item.icon} style={styles.notificationIcon} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={20} color="#A0A0A0" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Image source={require("../assets/logo1.png")} style={styles.headerLogo} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "All" && styles.activeTab]}
          onPress={() => setActiveTab("All")}
        >
          <Text style={[styles.tabText, activeTab === "All" && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Unread" && styles.activeTab]}
          onPress={() => setActiveTab("Unread")}
        >
          <Text style={[styles.tabText, activeTab === "Unread" && styles.activeTabText]}>Unread</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Ionicons name="home-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Ionicons name="search-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Ionicons name="person-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('NotificationScreen')}
        >
          <Ionicons name="notifications-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ChatInbox')}
        >
          <Ionicons name="chatbubble-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerLogo: {
    width: 60,
    height: 70,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00509E",
  },
  activeTab: {
    backgroundColor: "#00509E",
    borderColor: "#00509E0",
  },
  tabText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  notificationTextContainer: {
    flex: 1,
  },
  sender: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subject: {
    fontSize: 13,
    color: "#606060",
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  navItem: {
    padding: 10,
  },
});

export default NotificationScreen;
