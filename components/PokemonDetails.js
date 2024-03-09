import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import TypeImage from "../assets/img/TypeImages";

export default function PokemonList({ item }) {
    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState('');
    const [PokemonType, setPokemonType] = useState('');
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

    const determineStyle = () => {
        if (PokemonDetails && PokemonDetails.types) {
            if (PokemonDetails.types.length === 1) {
                const singleColor = TypeImage.GetColor(PokemonDetails.types[0].type.name);
                return { ...styles.color_header, backgroundColor: singleColor };
            } else if (PokemonDetails.types.length === 2) {
                const color1 = TypeImage.GetColor(PokemonDetails.types[0].type.name);
                const color2 = TypeImage.GetColor(PokemonDetails.types[1].type.name);
                return {
                    ...styles.linearGradient,
                    colors: [color1, color2]
                };
            }
        }
        return styles.color_header;
    };

    const getPokemonDetails = async (url) => {
        try {
            const response = await axios.get(url);
            setPokemonDetails(response.data);
            setPokemonType(response.data.types[0].type.name);
            console.log(PokemonType);
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
                    <View style={styles.text_container}>
                        <Text style={styles.text}>{PokemonDetails.name}</Text>
                        <View style={styles.type_list}>
                            {PokemonDetails.types && (
                                PokemonDetails.types.map((item) => (
                                    <View key={item.type.name} style={styles.TypeContent}>
                                        <Text style={[styles.typeObject, { backgroundColor: TypeImage.GetColor(item.type.name) }]}>
                                            {item.type.name}
                                        </Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '47%',
        marginTop: 20,
        marginBottom: 20,
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
        position: 'relative',
        top: -50
    },
    text_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        position: 'relative',
        top: -35
    },
    type_list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        marginTop: 4,
        height: 30
    },
    typeObject: {
        textAlign: "center",
        color: 'white',
        borderRadius: 10,
        paddingTop: 2,
        paddingBottom: 3,
        paddingLeft: 9,
        paddingRight: 9
    },
});