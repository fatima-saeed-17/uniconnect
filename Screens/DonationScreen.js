import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const DonationScreen = () => {
  const navigation = useNavigation(); // Use navigation hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("Easypaisa");
  const [isThankYouVisible, setThankYouVisible] = useState(false);

  // Animation for selected payment option
  const [scale] = useState(new Animated.Value(1));

  const handlePaymentOptionPress = (method) => {
    setPaymentMode(method);

    // Trigger animation
    Animated.spring(scale, {
      toValue: 1.1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (isThankYouVisible) {
            setThankYouVisible(false); // Hide Thank You Screen and show Donation Screen
          } else {
            navigation.goBack(); // Navigate back to Fundraising Screen
          }
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={isThankYouVisible ? "#6f6f6f" : "#fff"}
        />
      </TouchableOpacity>

      {/* Donation Screen */}
      {!isThankYouVisible && (
        <View>
          <Image source={require("../assets/image2.jpg")} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Payment Mode</Text>
          <View style={styles.paymentContainer}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMode === "Easypaisa" && styles.selectedOption,
              ]}
              onPress={() => handlePaymentOptionPress("Easypaisa")}
            >
              <Animated.View style={{ transform: [{ scale }] }}>
                <Text style={styles.paymentText}>Easypaisa</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMode === "Debit/Credit Card" && styles.selectedOption,
              ]}
              onPress={() => handlePaymentOptionPress("Debit/Credit Card")}
            >
              <Animated.View style={{ transform: [{ scale }] }}>
                <Text style={styles.paymentText}>Debit/Credit Card</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => setThankYouVisible(true)}
          >
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Thank You Screen */}
      {isThankYouVisible && (
        <View style={styles.thankYouContent}>
          <View style={styles.card}>
            <Text style={styles.checkIcon}>✅</Text>
            <Text style={styles.thankYouText}>
              Thank you for your generous{" "}
              <Text style={styles.boldText}>DONATION!</Text>
            </Text>
            <Text style={styles.emoji}>👍⭐</Text>
          </View>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setThankYouVisible(false)} // Navigate back to Donation Screen
          >
            <Text style={styles.doneButtonText}>DONE</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:5,
    flex: 1,
    backgroundColor: "#f4f8fb",
    padding: 20,
    top:20,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#D1E9FC",
    borderColor: "#007AFF",
  },
  paymentText: {
    fontSize: 16,
    color: "#333",
  },
  donateButton: {
    backgroundColor: "#00509E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  thankYouContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  checkIcon: {
    fontSize: 50,
    color: "#4CAF50",
    marginBottom: 15,
  },
  thankYouText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#00509E",
  },
  emoji: {
    fontSize: 40,
    marginBottom: 15,
  },
  doneButton: {
    backgroundColor: "#00509E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    marginTop: 20,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DonationScreen;
