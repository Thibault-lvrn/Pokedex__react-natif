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
        numColumns={2}
        onEndReached={() => getpokemon(nextPage)}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
            <PokemonDetails name={item.name} url={item.url} />
            // <Text style={styles.text}>{item.url}</Text>
        )}
        keyExtractor={(item) => item.name}
    />
    </View>
);
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        width: '100%',
    },
    text: {
        fontSize: 30,
        padding: 140,
        textAlign: "center",
        backgroundColor: 'orange',
    },
    list: {
        backgroundColor: '#FFB7A7',
        margin: 10,
    },
    listWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue', 
        margin: 10,
    },
});