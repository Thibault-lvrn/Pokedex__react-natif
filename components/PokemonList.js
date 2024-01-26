import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import axios from "axios";
import PokemonDetails from "../components/PokemonDetails";

export default function PokemonList() {
const [pokemon, setPokemon] = useState([]);
const [nextPage, setNextPage] = useState(null);
const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

useEffect(() => {
    getpokemon = async (url) => {
    try {
        const response = await axios.get(url);

        setPokemon((prevPokemon) => {
        const updatedPokemon = [...prevPokemon, ...response.data.results];
        return updatedPokemon;
        });

        setNextPage(response.data.next);
    } catch (error) {
        console.error(error);
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
            <PokemonDetails name={item.name} url={item.url} />
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