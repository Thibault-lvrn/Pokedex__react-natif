import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Button } from "react-native";
import axios from "axios";
import PokemonDetails from "../components/PokemonDetails";

export default function PokemonList(navigation) {
const [pokemon, setPokemon] = useState([]);
const [nextPage, setNextPage] = useState(null);
const [isLoaded, setIsLoaded] = useState(true);
const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

useEffect(() => {
    getpokemon = async (url) => {
        if (isLoaded) {
            setIsLoaded(false);
            console.log(isLoaded)
            try {
                const response = await axios.get(url);
    
                setPokemon((prevPokemon) => {
                const updatedPokemon = [...prevPokemon, ...response.data.results];
                return updatedPokemon;
                });
    
                setNextPage(response.data.next);
                setIsLoaded(true);
            } catch (error) {
                console.error(error);
            }
        }
    };

    getpokemon(url);
}, []);

return (
    <View style={styles.content}>
    <FlatList
        style={styles.list}
        contentContainerStyle={styles.listWrapper}
        data={pokemon}
        onEndReached={() => getpokemon(nextPage)}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
            <View>
                <PokemonDetails navigation={navigation} item={item}/>
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