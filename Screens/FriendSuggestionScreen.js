import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";

// Import images
const profile1 = require("../assets/profile1.jpg");
const profile2 = require("../assets/profile2.jpg");
const profile3 = require("../assets/profile3.jpg");
const profile4 = require("../assets/profile4.jpg");
const logo1 = require("../assets/logo1.png");

const FriendSuggestionsScreen = ({ navigation }) => {
  const connections = [
    { id: "1", name: "Mushaf", field: "Software Engineering", image: profile1 },
    { id: "2", name: "Sarah", field: "Software Engineering", image: profile2 },
    { id: "3", name: "Ziya", field: "Software Engineering", image: profile3 },
    { id: "4", name: "Fatima", field: "Software Engineering", image: profile4 },
    { id: "5", name: "Mushaf", field: "Software Engineering", image: profile1 },
    { id: "6", name: "Sarah", field: "Software Engineering", image: profile2 },
  ];

  // Animation reference
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderConnection = ({ item }) => (
    <Animated.View style={[styles.connectionCard, { opacity: fadeAnim }]}>
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
        <Image source={logo1} style={styles.logo} />
      </View>

      {/* Friend Suggestions */}
      <Text style={styles.title}>Friend Suggestions</Text>
      <FlatList
        data={connections}
        numColumns={2}
        renderItem={renderConnection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FriendSuggestionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fcff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    padding:10,
  },
  backArrow: {
    fontSize: 20,
    color: "#000",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color:'#00509E',
  },
  listContainer: {
    paddingHorizontal: 8,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  connectionField: {
    fontSize: 14,
    color: "#666",
  },
});
