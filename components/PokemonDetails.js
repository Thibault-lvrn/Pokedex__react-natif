import React, { useState, useEffect, map } from "react";
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
        // console.log(PokemonDetails.types[0].type.name)
    }, []);

    return (
        <View style={styles.item}>
            <View style={styles.text_container}>
                <Text style={styles.text}>{PokemonDetails.name}</Text>
                {/* <Text style={styles.text}>{PokemonDetails.types[0].type.name}</Text> */}
            </View>
        {/* <Text style={styles.text}>{PokemonDetails.types}</Text> */}
            {/* {PokemonDetails.types.map((type, index) => (
                <Text key={index}>{type.name}</Text>
            ))} */}
            <View>
                {PokemonDetails.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
                ))}
            </View>
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
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        height: 200,
        zIndex: 0,
    },
    text_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        backgroundColor: 'green',
    },
    Logo: {
        height: 200,
        width: 200,
        position: 'absolute',
        right: 20,
        zIndex: 1,
        bottom: 0,
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: 'black',
        // fontFamily: 'pokemon_pixel_font',
    },
});