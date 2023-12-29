import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import axios from "axios";

export default function PokemonList(name, url) {
    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState([]);

    useEffect(() => {
        getPokemonDetails = async (url) => {
            try {
                const response = await axios.get(url);
                setPokemonDetails(response.data);
                setPokemonImg(response.data.sprites.front_default);
            } catch (error) {
                console.error(error);
            }
        };
        getPokemonDetails(name.url);
    }, []);

    return (
        <View style={styles.item}>
            <Text style={styles.Text}>{PokemonDetails.name}</Text>
            {PokemonDetails.sprites && PokemonDetails.sprites.front_default ? (
                <Image style={styles.Logo} source={{ uri: PokemonDetails.sprites.front_default }} />
            ) : (
                <Image style={styles.Logo} source={require('../assets/pokemonPlaceholder.gif')} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '48%',
        margin: '1%',
        minHeight: 200,
        padding: 20,
        backgroundColor: 'red',
    },
    Logo: {
        minHeight: 120,
        width: '100%',
    },
    text: {
        fontSize: 30,
        padding: 140,
        textAlign: "center",
        backgroundColor: 'orange',
    },
});