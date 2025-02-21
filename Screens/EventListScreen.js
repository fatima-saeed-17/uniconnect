import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const events = [
  {
    id: '1',
    title: 'Seminar on Coding Essentials for All',
    date: 'Wed, Apr 28 • 5:30 PM',
    location: 'uog',
    image: require('../assets/event1.png'),
  },
  {
    id: '2',
    title: 'Seminar on Coding Essentials for All',
    date: 'Sat, May 1 • 2:00 PM',
    location: 'giftuni',
    image: require('../assets/event2.png'),
  },
  {
    id: '3',
    title: 'Women\'s Leadership Conference 2025',
    date: 'Sat, Apr 24 • 1:30 PM',
    location: 'uog',
    image: require('../assets/event3.png'),
  },
  {
    id: '4',
    title: 'Seminar on Coding Essentials for All',
    date: 'Sat, May 1 • 2:00 PM',
    location: 'giftuni',
    image: require('../assets/event2.png'),
  },
  {
  id: '5',
  title: 'Seminar on Coding Essentials for All',
  date: 'Wed, Apr 28 • 5:30 PM',
  location: 'uog',
  image: require('../assets/event1.png'),
},
  
];

export default function EventListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.details}>{item.date}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  location: {
    fontSize: 12,
    color: '#999',
  },
});
