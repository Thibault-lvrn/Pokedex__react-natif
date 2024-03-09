import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import TypeImage from "../assets/img/TypeImages";
import { LinearGradient } from 'expo-linear-gradient';
import StarButton from './AddFav';
import SizeConverter from './SizeConverter';
import WeightConverter from './WeightConverter';

export default function PokemonList({ route }) {
    const { itemUrl } = route.params;
    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState('');

    useEffect(() => {
        getPokemonDetails(itemUrl);
    }, [itemUrl]);

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
            setPokemonDetails(url.PokemonDetails);
            setPokemonImg(url.PokemonDetails.sprites.other["official-artwork"].front_default);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <View style={styles.pokemon_fiche}>
            {Array.isArray(determineStyle().colors) ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    {...determineStyle()}
                    style={styles.color_header}
                >
                </LinearGradient>
            ) : (
                <View style={[determineStyle(), styles.color_header]}>
                </View>
            )}
            {PokemonDetails && (
                <>
                    <View style={styles.image_container}>
                        {PokemonImg ? (
                            <Image style={styles.image} source={{ uri: PokemonImg }} />
                        ) : (
                            <Image style={styles.image} source={require('../assets/pokemonPlaceholder.gif')} />
                        )}
                    </View>

                    <View style={styles.text_container}>
                        <View style={styles.name_container}>
                            <Text style={styles.title}>{PokemonDetails.name}</Text>
                            <View style={styles.starButton}>
                                <StarButton pokemonData={PokemonDetails} />
                            </View>
                        </View>

                        <View style={styles.list}>
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

                        <View style={styles.info_container}>
                            <View style={styles.info_content}>
                                <SizeConverter style={styles.info_content_sup} sizeInDecimeters={PokemonDetails.height} />
                                <Text style={styles.info_content_sub}>height</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <View style={styles.info_content}>
                                <WeightConverter style={styles.info_content_sup} weightInHectograms={PokemonDetails.weight} />
                                <Text style={styles.info_content_sub}>Weight</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pokemon_fiche: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        zIndex: 0,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
    },
    color_header: {
        position: 'absolute',
        top: 0,
        height: 200,
        width: '100%',
        borderBottomEndRadius: 90,
        borderBottomRightRadius: 90
    },
    image_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    image: {
        height: '58%',
        width: '50%',
        objectFit: 'cover',
    },
    text_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        textAlign: 'center',
        marginTop: -100,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        color: 'black',
        fontWeight: "bold",
        height: 50,
        display: 'flex',
        textTransform: 'capitalize',
        alignItems: 'center',
    },
    name_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        width: '100%',
        alignItems: 'flex-end',
    },
    starButton: {
        position: 'absolute',
        right: 10,
        top: -75,
    },  
    typeImage: {
        height: 50,
        width: 50,
        objectFit: 'contain',
        margin: 5,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    typeObject: {
        fontSize: 20,
        textAlign: "center",
        color: 'white',
        borderRadius: 10,
        textTransform: 'uppercase',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    info_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    separator: {
        height: 25,
        width: 2,
        backgroundColor: 'black',
    },
    info_content: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        textAlign: 'center',
    },
    info_content_sup: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        color: 'black',
    },
    info_content_sub: {
        fontSize: 15,
        textAlign: "center",
        color: 'black',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'grey',
    },
});