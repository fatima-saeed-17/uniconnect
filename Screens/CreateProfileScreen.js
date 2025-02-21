import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker'; // React Native Image Picker
import { supabase } from '../supabaseConfig'; // Ensure you have Supabase configured
import { app } from '../firebaseConfig'; // Ensure Firebase is configured
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker'; // Ensure you have expo-image-picker installed

const auth = getAuth(app);
const db = getFirestore(app);

const CreateProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [imageUri, setImageUri] = useState(null); // To store the image URI
  const [imageUrl, setImageUrl] = useState(''); // To store the public URL of the uploaded image
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [gender, setGender] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [field, setField] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const interests = [
    'Graphics Designer',
    'Web Developer',
    'Mobile Developer',
    'Data Scientist',
    'Content Writer',
    'Marketing Specialist',
  ];

  const fields = ['Sciences', 'Designing', 'Arts'];

  const params = route.params;
  const userType = params?.data.selectedUser;
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setEmail(data.email || '');
            setUsername(data.username || '');
            setUniversity(data.university || '');
            setGender(data.gender || '');
            setField(data.field || '');
            setSelectedInterests(data.interests || []);
            setImageUrl(data.profilePicture || '');
          } else {
            console.warn('No profile data found.');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, userType]);

  const selectImage = async () => {
    // Request permission to access the gallery
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    const uri = result.assets[0].uri;
    setImageUri(uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();

    const fileName = `${Date.now()}.jpg`;

    try {
      // Upload the image to Supabase storage
      const { error } = await supabase.storage.from('pictures')
        .upload(fileName, arrayBuffer, { contentType: 'image/jpeg', upsert: false });

      if (error) {
        throw new Error(error.message);
      }

      // Get the public URL for the uploaded image
      const { data } = await supabase.storage.from('pictures').getPublicUrl(fileName);

      console.log([data])
      setImageUrl(data.publicUrl);
      Alert.alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image:', error.message);
    }
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const createProfile = async () => {
    try {
      if (!user) {
        Alert.alert('User not authenticated.');
        return;
      }

      const profileData = {
        email,
        username,
        university,
        gender,
        field,
        interests: selectedInterests,
        profilePicture: imageUrl,
        createdAt: new Date(),
      };

      // Set the document with the user's UID as the document ID
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, profileData);
      Alert.alert('Profile created successfully!');
      navigation.replace('UserProfile');
    } catch (error) {
      Alert.alert('Error creating profile:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.imageHolder} onPress={selectImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.uploadText}>Upload Picture</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#4A90E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#B0C4DE"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#4A90E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#B0C4DE"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="school" size={24} color="#4A90E2" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="University"
          value={university}
          onChangeText={setUniversity}
          placeholderTextColor="#B0C4DE"
        />
      </View>

      <Text style={styles.sectionTitle}>Gender:</Text>
      <View style={styles.genderContainer}>
        {['Female', 'Male', 'Other'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGender(item)}
            style={[styles.genderOption, gender === item && styles.selectedGender]}
          >
            <Text
              style={[styles.genderOptionText, gender === item && styles.selectedGenderText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Field:</Text>
      <TouchableOpacity
        onPress={() => setShowDropdown(!showDropdown)}
        style={[styles.dropdownButton, showDropdown && styles.dropdownButtonActive]}
      >
        <Text style={styles.dropdownText}>{field || 'Select a Field'}</Text>
        <Icon
          name={showDropdown ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={24}
          color="#4A90E2"
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownMenu}>
          {fields.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setField(item);
                setShowDropdown(false);
              }}
              style={styles.dropdownOption}
            >
              <Text style={styles.dropdownOptionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Interests:</Text>
      <View style={styles.interestContainer}>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[styles.interestItem, selectedInterests.includes(interest) && styles.selectedInterest]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={[styles.interestText, selectedInterests.includes(interest) && styles.selectedInterestText]}>
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={createProfile}>
        <Text style={styles.buttonText}>Create User Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3F2FD',
    padding: 30,
  },
  imageHolder: {
    alignSelf: 'center',
    backgroundColor: '#B0D8FF',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    elevation: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  uploadText: {
    color: '#4A90E2',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#00509E',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: '#00509E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedGender: {
    backgroundColor: '#00509E',
  },
  genderOptionText: {
    color: '#00509E',
    fontSize: 16,
  },
  selectedGenderText: {
    color: '#fff',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B0D8FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  dropdownButtonActive: {
    borderColor: '#00509E',
    backgroundColor: '#E3F2FD',
  },
  dropdownText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#B0D8FF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  interestItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00509E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedInterest: {
    backgroundColor: '#00509E',
  },
  interestText: {
    color: '#00509E',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedInterestText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#00509E',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default CreateProfileScreen