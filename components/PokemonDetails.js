import React, { useState, useEffect, map } from "react";
import { StyleSheet, View, FlatList, Text, Image, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function PokemonList({item}) {
    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState('');
    const navigation = useNavigation() 

    const getPokemonDetails = async (url) => {
        try {
            const response = await axios.get(url);
            setPokemonDetails(response.data);
            setPokemonImg(response.data.sprites.other["official-artwork"].front_default);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPokemonDetails(item.url);
    }, []);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('PokemonInfo', { itemUrl: item.url })}>
            <View style={styles.item}>
                <View style={styles.text_container}>
                    <Text style={styles.text}>{PokemonDetails.name}</Text>
                </View>
                
                { PokemonImg ? (
                    <Image style={styles.Logo} source={{ uri: PokemonImg }} />
                    ) : (
                        <Image style={styles.Logo} source={require('../assets/pokemonPlaceholder.gif')} />
                        )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        marginTop: 30,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        height: 180,
        zIndex: 0,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
    },
    text_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '50%',
        paddingLeft: 24,
    },
    button: {
        paddingTop: 10,  
        paddingBottom: 10,
        paddingLeft: 25,  
        paddingRight: 25,  
        marginTop: 20
    },
    Logo: {
        height: 150,
        width: 200,
        position: 'absolute',
        right: 20,
        zIndex: 1,
        bottom: 0,
        objectFit: "contain"
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: 'black',
        // fontFamily: 'pokemon_pixel_font',
    },
});