import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import PokemonScreen from './navigation/PokemonScreen';
import PokemonInfo from './components/PokemonInfo';
import HomeScreen from './navigation/HomeScreen';
import DetailScreen from './navigation/DetailScreen';
import SearchScreen from './navigation/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function PokemonStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="PokemonInfo" component={PokemonInfo} />
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
          name="PokemonList" 
          component={PokemonStackNavigation}
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
            tabBarLabel: 'Team',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
          }} 
        />
        <Tab.Screen
          name="Parameters"
          component={HomeStackNavigation}
          options={{
            tabBarLabel: 'Parameters',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
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
