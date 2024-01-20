import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Home, Login, Profile, Sale, Quiz, Score } from "../screens"




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Profil, Home ve Satın Alma sayfalarını içeren Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Sale') {
          iconName = focused ? 'ios-cart' : 'ios-cart-outline';
        } else if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person-outline';
        }

        // You can customize the icon size and color here
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        display: 'flex',
        borderTopWidth: 0, // Üst çizgiyi kaldırmak için sıfıra ayarlayın
      },
      tabBarActiveTintColor: '#FCFCFC', // etkin durumda simge rengi
      tabBarInactiveTintColor: '#FCFCFC', // etkin olmayan durumda simge rengi
      tabBarActiveBackgroundColor: '#2E388F', // etkin durumda arka plan rengi
      tabBarInactiveBackgroundColor: '#32167C', // etkin olmayan durumda arka plan rengi
      tabBarLabelStyle: {
        fontSize: 12,
      },
    })}
  >

      <Tab.Screen name="Sale" component={Sale} options={{headerShown: false}}/>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />

    </Tab.Navigator>
  );
}



function AppRouter() {
  return (
    <NavigationContainer >


      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, }} >
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Main" component={TabNavigator}  />
        <Stack.Screen name="Quiz" component={Quiz}  />
        <Stack.Screen name="Score" component={Score}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter