import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import axios from "axios";

export default function PokemonList(name, url) {

    // console.log(name.url)
    // console.log(name.name);

    const [PokemonDetails, setPokemonDetails] = useState([]);
    const [PokemonImg, setPokemonImg] = useState([]);
    // const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        // console.log(name);
        // console.log("hello");
        // console.log(url);
        getPokemonDetails = async (url) => {
            console.log(url)
            try {
                const response = await axios.get(url);
                console.log(response.data.sprites.front_default)
                setPokemonDetails(response.data);
                setPokemonImg(response.data.sprites.front_default);
                // console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getPokemonDetails(name.url);
    }, []);

    return (
        <View style={styles.content}>
            {/* <Text style={styles.text}>{ this.name }</Text> */}
            <Text style={styles.text}>{PokemonDetails.name}</Text>
            <Text style={styles.text}>{PokemonImg}</Text>
            {/* <Image
                source={{uri: {PokemonImg}}}
                style={{width: 40, height: 40}}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        // display: 'flex',
        width: '50%',
        height: '100%',
        backgroundColor: 'red',
    },
    // text: {
    //     fontSize: 30,
    //     padding: 140,
    //     textAlign: "center",
    //     backgroundColor: 'orange',
    // },
});