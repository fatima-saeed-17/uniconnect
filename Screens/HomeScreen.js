import React, { useState } from 'react';
// import HomeScreen from './HomeScreen';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const eventData = [
  {
    id: '1',
    title: 'Seminar on Coding Essentials for All',
    date: 'Thu 26 May, 09:00 am',
    location: 'UOG',
    type: 'Physical',
    price: 'Free',
    image: require('../assets/firstimage.jpg'),
  },
  {
    id: '2',
    title: 'Saturdays AI Workshop',
    date: 'Thu 28 May, 02:00 pm',
    location: 'UET',
    type: 'Online',
    price: 'Free',
    image: require('../assets/firstimage.jpg'),
  },
];

const internshipData = [
  {
    id: '1',
    title: 'Internships regarding skill-building and career growth.',
    lastDate: '20 May 2025',
    location: 'Mindstorm studio',
    type: 'Physical',
    price: 'Paid',
    image: require('../assets/internshipimage.jpg'),
  },
];

const fundraisingData = [
  {
    id: '1',
    title: 'Give Funds to the deserving students',
    description: 'Your payment will be forwarded to the deserving students. Pay Now!',
    actionText: 'Click here!',
    image: require('../assets/fundraisingimage.jpg'),
  },
];

export default function App({ navigation }) {
  const [category, setCategory] = useState('events'); // Track selected category
  const [events, setEvents] = useState(eventData); // State for selected category data

  // Animated values for button press effect and logo size
  const scale = new Animated.Value(1);
  const logoScale = new Animated.Value(1);

  // Change category when clicked
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (selectedCategory === 'internship') {
      setEvents(internshipData); // Switch to internship data
    } else if (selectedCategory === 'fundraising') {
      setEvents(fundraisingData); // Switch to fundraising data
    } else {
      setEvents(eventData); // Switch back to events data
    }
  };

  // Animate button press effect
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Animate logo size on focus
  const animateLogo = () => {
    Animated.spring(logoScale, {
      toValue: 1.2,  // Increase size
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const resetLogoSize = () => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  // Render event, internship, or fundraising items

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{item.date || item.lastDate}</Text>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventInfo}>{item.date || item.lastDate}</Text>
        <Text style={styles.eventInfo}>{item.location} • {item.type} • {item.price}</Text>

        {/* Fundraising specific */}
        {category === 'fundraising' && (
  <View style={styles.fundraisingDetails}>
    <Text style={styles.eventInfo}>{item.description}</Text>
    <TouchableOpacity 
      style={styles.payNowButton} 
      onPress={() => navigation.navigate('DonationScreen')}  // Navigate to DonationScreen
    >
      <Text style={styles.payNowText}>{item.actionText}</Text>
    </TouchableOpacity>
  </View>
)}

        {/* Like and Share Buttons */}
        <View style={styles.eventOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="heart-outline" size={20} color="#000" />
            <Text style={styles.optionText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="share-social-outline" size={20} color="#000" />
            <Text style={styles.optionText}></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Animated.Image
          source={require('../assets/logo1.png')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}/>

        <Text style={styles.headerTitle}>UniConnect!</Text>
        <TouchableOpacity 
        style={styles.chatButton} 
        onPress={() => navigation.navigate('ChatInbox')}
>
  <Icon name="chatbubble-outline" size={24} color="#000" />
</TouchableOpacity>

      </View>

      {/* Category Buttons */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterButton, category === 'events' && styles.filterButtonActive]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCategoryChange('events')}
        >
          <Text style={category === 'events' ? styles.filterTextActive : styles.filterText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, category === 'internship' && styles.filterButtonActive]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCategoryChange('internship')}
        >
          <Text style={category === 'internship' ? styles.filterTextActive : styles.filterText}>Internships</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, category === 'fundraising' && styles.filterButtonActive]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCategoryChange('fundraising')}
        >
          <Text style={category === 'fundraising' ? styles.filterTextActive : styles.filterText}>Fundraising</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.eventSection}>
  <Text style={styles.sectionTitle}>
    Latest {category === 'events' ? 'Events' : category === 'internship' ? 'Internships' : ''}
  </Text>

  {category !== 'fundraising' && (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            category === 'events' ? 'EventListScreen' : category === 'internship' ? 'internshipListScreen' :''
          )
        }
      >
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </>
  )}
</View>



      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Icon name="home-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.navItem}
         onPress={() => navigation.navigate('SearchScreen')} 
        >
          <Icon name="search-outline" size={26} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('UserProfile')} 
          
        >
          <Icon name="person-outline" size={26} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.navItem}
         onPress={() => navigation.navigate('NotificationScreen')} 
        >
          <Icon name="notifications-outline" size={26} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.navItem}
         onPress={() => navigation.navigate('ChatInbox')} 
        >
        <Icon name="chatbubble-outline" size={26} color="#000" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    fontSize: 24,
    color: '#00509E',
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: '#000',
  },
  filterText: {
    color: '#000',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontSize: 14,
  },
  eventSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#00509E',
  },
  eventCard: {
    marginLeft: 15,
    width: 250,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  eventDetails: {
    padding: 10,
  },
  eventDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  eventInfo: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  fundraisingDetails: {
    marginTop: 10,
  },
  payNowButton: {
    backgroundColor: '#00509E',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  payNowText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  eventOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionButton: {
    padding: 5,
  },
  optionText: {
    fontSize: 12,
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    padding: 5,
  },
});


