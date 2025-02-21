import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import EventListScreen from './EventListScreen';
import EventDetailsScreen from './DetailScreen'; 
import InternshipListScreen from './internshipListScreen';
import InternshipDetailsScreen from './internshipDetailScreen';
import DonationScreen from './DonationScreen';
import ChatInbox from './ChatInbox';
import NotificationScreen from './NotificationScreen';
import SearchScreen from './SearchScreen';
import UserProfile from './UserProfile';
import FriendSuggestionsScreen from './FriendSuggestionScreen';
import CreateProfileScreen from './CreateProfileScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import SettingsScreen from './SettingsScreen';
import ManageNotificationsScreen from './ManageNotificationScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import LogoutScreen from './LogoutScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import EditProfile from './EditProfile';
import ChatScreen from './ChatScreen';


const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen  name="MainScreen" component={MainScreen} 
        options={{
            headerShown:false,
        }} />
        <Stack.Screen  name="SplashScreen" component={SplashScreen} 
        options={{
            headerShown:false,
        }} />

      <Stack.Screen  name="LoginScreen" component={LoginScreen} 
        options={{
            headerShown:false, }}/>

         <Stack.Screen name='HomeScreen' component={HomeScreen}
      options={{headerShown:false,}}/>

       <Stack.Screen  name="SignupScreen" component={SignupScreen} 
        options={{
            headerShown:false,
        }}
        />

         <Stack.Screen  name="CreateProfileScreen" component={CreateProfileScreen} 
        options={{
            headerShown:false,
        }}/>

        <Stack.Screen name="EventListScreen" component={EventListScreen} 
        options={{headerTitle:'Events'}}/>
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name='internshipListScreen'component={InternshipListScreen}
        options={{headerTitle:'Internships'}}/>
         <Stack.Screen name='internshipDetailScreen' component={InternshipDetailsScreen}
        options={{headerTitle:'Details'}}/>
        
        <Stack.Screen name='DonationScreen' component={DonationScreen}
        options={{
          headerShown:false,
        }}/>
        <Stack.Screen name='ChatInbox' component={ChatInbox}
        options={{headerShown:false,
        }}/>
       <Stack.Screen 
        name="NotificationScreen" component={NotificationScreen} 
        options={{headerShown:false,
           }} />

        <Stack.Screen 
        name="SearchScreen" component={SearchScreen} 
        options={{headerShown:false,
           }} />

        <Stack.Screen name='UserProfile' component={UserProfile}
        options={{headerShown:false,  
        }}/>
        <Stack.Screen name='FriendSuggestionScreen' component={FriendSuggestionsScreen}
        options={{headerShown:false,  
        }}/>
        <Stack.Screen name='SettingsScreen' component={SettingsScreen}
        options={{headerTitle:'',  
        }}/>
        <Stack.Screen name='ManageNotificationScreen' component={ManageNotificationsScreen}
        options={{headerTitle:'Settings',   
        }}/>
        <Stack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen}
        options={{headerTitle:'Settings',  
        }}/>
        <Stack.Screen name='LogoutScreen' component={LogoutScreen}
        options={{headerTitle:'',  
        }}/>
         <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}
        options={{headerTitle:'Forget Password',  
        }}/>
         <Stack.Screen name='EditProfile' component={EditProfile}
        options={{headerTitle:'',  
        }}/>
        <Stack.Screen name='ChatScreen' component={ChatScreen}
        options={{headerTitle:'',  
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
