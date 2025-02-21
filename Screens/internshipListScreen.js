import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const internships = [
  {
    id: '1',
    title: 'Internships regarding skill-building',
    date: 'Tue, Jun 14 • 9:00 AM - 1:00 PM',
    location: 'UOG Alam Iqbal Auditorium',
    image: require('../assets/image.png'),
  },
  {
    id: '2',
    title: 'Tech Internships for Fresh Graduates',
    date: 'Mon, Jun 20 • 10:00 AM - 4:00 PM',
    location: 'GIFT University, Auditorium',
    image: require('../assets/image.png'),
  },
];

export default function InternshipListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={internships}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('internshipDetailScreen', { internship: item })}
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
