import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Animated, 
  Pressable 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function InternshipDetailsScreen({ route }) {
  const { internship } = route.params;

  // Animation references
  const titleScale = useRef(new Animated.Value(1)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  // Animation handlers
  const handlePressIn = (animRef) => {
    Animated.timing(animRef, {
      toValue: 1.1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (animRef) => {
    Animated.timing(animRef, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/image.png')}
          style={styles.image}
        />
      </View>

      {/* Internship Details Section */}
      <ScrollView style={styles.detailsContainer}>
        {/* Centered Title with Animation */}
        <Pressable
          onPressIn={() => handlePressIn(titleScale)}
          onPressOut={() => handlePressOut(titleScale)}
        >
          <Animated.Text
            style={[styles.title, { transform: [{ scale: titleScale }] }]}
          >
            {internship.title}
          </Animated.Text>
        </Pressable>

        {/* Date and Time with Animated Calendar Icon */}
        <View style={styles.infoRow}>
          <Pressable
            onPressIn={() => handlePressIn(iconScale)}
            onPressOut={() => handlePressOut(iconScale)}
          >
            <Animated.View style={{ transform: [{ scale: iconScale }] }}>
              <MaterialIcons name="event" size={24} color="#007BFF" />
            </Animated.View>
          </Pressable>
          <Text style={styles.infoText}>{internship.date}</Text>
        </View>

        {/* Location with Animated Location Icon */}
        <View style={styles.infoRow}>
          <Pressable
            onPressIn={() => handlePressIn(iconScale)}
            onPressOut={() => handlePressOut(iconScale)}
          >
            <Animated.View style={{ transform: [{ scale: iconScale }] }}>
              <MaterialIcons name="location-on" size={24} color="#007BFF" />
            </Animated.View>
          </Pressable>
          <Text style={styles.infoText}>{internship.location}</Text>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* About Internship */}
        <Text style={styles.sectionTitle}>About Internship</Text>
        <Text style={styles.description}>
          Gain hands-on experience and enhance your skills in this exciting internship opportunity. Prepare for a bright future and success in your field.
        </Text>
    
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  imageContainer: {
    height: 220,
    backgroundColor: '#ddd',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00509E',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00509E',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  highlightedDescription: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 21,
  },
});
