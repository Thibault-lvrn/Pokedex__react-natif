import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import PokemonList from './components/PokemonList';
import HomeScreen from './navigation/HomeScreen';
import DetailScreen from './navigation/DetailScreen';
import SearchScreen from './navigation/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={() => ({
          tabBarIcon: () => {
            const icons = {
              Home: 'home',
              Profile: 'account',
              color: 'black',
              size: 30
            };
      
            return (
              <MaterialCommunityIcons
                name={icons.Profile}
                color={icons.color}
                size={icons.size}
              />
            );
          },
          headerShown: false
        })} 
      >
        <Tab.Screen
          name="Main vue"
          component={StackNavigation}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          />
        <Tab.Screen 
          name="PokemonList" 
          component={PokemonList}
          options={{
            tabBarLabel: 'Pokemon List',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pokeball" color={color} size={26} />
            ),
          }} 
          />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            tabBarLabel: 'Pokemon List',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }} 
          />
        <Tab.Screen 
          name="Pokedex" 
          component={SearchScreen}
          options={{
            tabBarLabel: 'Pokedex',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="polaroid" color={color} size={26} />
            ),
          }} 
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
