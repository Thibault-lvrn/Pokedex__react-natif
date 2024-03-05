import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function PokemonList({ item }) {
    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
        if (item.url) {
            getPokemonDetails(item.url);
        } else {
            setPokemonDetails(item);
            setPokemonImg(item.sprites.other["official-artwork"].front_default);
            return;
        }
    }, []);

    const getPokemonDetails = async (url) => {
        try {
            const response = await axios.get(url);
            setPokemonDetails(response.data);
            setPokemonImg(response.data.sprites.other["official-artwork"].front_default);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={() => navigation.navigate('Pokemon Info', { itemUrl: { PokemonDetails } })}>
                <View style={[styles.item, styles.shadowProp]}>
                    <View style={styles.image_container}>
                        {PokemonImg ? (
                            <Image style={styles.Logo} source={{ uri: PokemonImg }} />
                        ) : (
                            <Image style={styles.Logo} source={require('../assets/pokemonPlaceholder.gif')} />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.text_container}>
                <Text style={styles.text}>{PokemonDetails.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '47%',
        marginBottom: 10,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: '100%',
        aspectRatio: '1/1',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    Logo: {
        width: '100%',
        height: '100%',
        objectFit: "contain"
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        color: 'black',
    },
    image_container: {
        width: '100%',
        height: '100%',
    },
});