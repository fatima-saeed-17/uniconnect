import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import Images
const profile1 = require("../assets/profile1.jpg");
const profile4 = require("../assets/profile4.jpg");
const logo1 = require("../assets/logo1.png");

const auth = getAuth();

const UserProfile = ({ navigation }) => {
  const [userID, setUserID] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        fetchUserProfile(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    if (!userId) return;
    try {
      const userRef = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setUserProfile(userSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Animate Friend Suggestions
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Sample Connections Data
  const connections = [
    { id: "1", name: "John Doe", field: "Computer Science", image: profile1 },
    { id: "2", name: "Sarah Smith", field: "Software Engineering", image: profile4 },
  ];

  const renderConnection = ({ item }) => (
    <Animated.View
      style={[
        styles.connectionCard,
        {
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Image source={item.image} style={styles.connectionImage} />
      <Text style={styles.connectionName}>{item.name}</Text>
      <Text style={styles.connectionField}>{item.field}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <Image source={logo1} style={styles.headerLogo} />
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Icon name="settings-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

     {/* Profile Section */}
<View style={styles.profileSection}>
  {userProfile ? (
    <>
      <Image
        source={{ uri: userProfile.profilePicture || "https://via.placeholder.com/150" }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{userProfile.username}</Text>
      <Text style={styles.profileEmail}>{userProfile.email}</Text>
      <Text style={styles.profileField}>{userProfile.field}</Text>
      <Text style={styles.profileUniversity}>{userProfile.university}</Text>
      
      {/* Interests */}
      <Text style={styles.skillsTitle}>Interests:</Text>
      <View style={styles.skillsContainer}>
        {userProfile.interests && userProfile.interests.length > 0 ? (
          userProfile.interests.map((interest, index) => (
            <View style={styles.skillChip} key={index}>
              <Text style={styles.skillText}>{interest}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.skillText}>N/A</Text>
        )}
      </View>
      {/* Edit Profile Button */}
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate("")}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </>
    
  ) : (
    <Text>Loading profile...</Text>
  )}
</View>


      {/* Connections Section */}
      <View style={styles.connectionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.connectionsTitle}>Friend Suggestions</Text>
          <TouchableOpacity onPress={() => navigation.navigate("FriendSuggestionScreen")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={connections}
          horizontal
          renderItem={renderConnection}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HomeScreen")}>
          <Icon name="home-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("SearchScreen")}>
          <Icon name="search-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("UserProfile")}>
          <Icon name="person-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("NotificationScreen")}>
          <Icon name="notifications-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ChatInbox")}>
          <Icon name="chatbubble-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Reduced padding
    paddingVertical: 25, // Reduced vertical padding
    backgroundColor: "#ffffff",
  },
  backArrow: {
    color: "#00509E",
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00509E",
    marginLeft:25, // Reduce space between title and logo
    flexGrow: 1, // Allow title to take available space
    textAlign: "center",
  },
  headerLogo: {
    width: 60, // Reduced logo size
    height: 80, // Reduced logo size
    marginRight: 10, // Reduced space between logo and settings icon
  },
  profileSection: {
    alignItems: "center",
    padding: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "gray",
  },
  profileField: {
    fontSize: 14,
    color: "#00509E",
  },
  profileUniversity: {
    fontSize: 14,
    fontWeight: "bold",
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  skillChip: {
    backgroundColor: "#E8F0FE", // Light blue background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    color: "#007BFF", // Blue color for the text
  },
  editButton: {
    backgroundColor: "#007BFF", // Blue background color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center", // Centering the button
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  connectionsSection: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  connectionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#007BFF",
  },
  connectionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 8,
    alignItems: "center",
    flex: 1,
  },
  connectionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  connectionName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  connectionField: {
    fontSize: 12,
    color: "gray",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  navItem: {
    padding: 5,
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserProfile;
