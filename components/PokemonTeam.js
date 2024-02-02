import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Button } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import PokemonDetails from "../components/PokemonDetails";

export default function PokemonList({ navigation }) {
const [pokemon, setPokemon] = useState([]);
const [nextPage, setNextPage] = useState(null);
const [isLoaded, setIsLoaded] = useState(true);

useEffect(() => {
    getPokemonTeam = async () => {
        if (isLoaded) {
            setIsLoaded(false);
            try {

                const pokemonTeamString = await AsyncStorage.getItem('pokemonTeam');
                const pokemonTeam = JSON.parse(pokemonTeamString);
                setPokemon(pokemonTeam)
                console.log(Object.keys(pokemonTeam).length)
                console.log(pokemonTeam)
    
                setIsLoaded(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    getPokemonTeam();
}, []);

return (
    <View style={styles.content}>
        <Text>My Team</Text>
        <FlatList
            style={styles.list}
            data={pokemon}
            numColumns={2}
            renderItem={({ item }) => (
                <View>
                 
                    <Text>test</Text>
                </View>
            )}
            keyExtractor={(item) => item.name}
        />
    </View>
);
}

const styles = StyleSheet.create({
    content: {
        // display: 'flex',
        width: '100%',
    },
    list: {
        margin: 10,
        zIndex: 0,
    },
});