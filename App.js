import * as React from 'react';
import PokemonScreen from './navigation/PokemonScreen';
import PokemonInfo from './components/PokemonInfo';
import DetailScreen from './navigation/DetailScreen';
import SearchScreen from './navigation/SearchScreen';
import PokemonTeam from './components/PokemonTeam';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
    );
}

function PokemonStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pokemon list" component={PokemonScreen} />
            <Stack.Screen name="Pokemon Info" component={PokemonInfo} />
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
                    tabBarLabel: 'Search Pokemon',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                    ),
                }} 
                />
                <Tab.Screen 
                name="Pokedex"
                component={PokemonTeam}
                options={{
                    tabBarLabel: 'Team',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="star" color={color} size={26} />
                    ),
                    unmountOnBlur: true
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