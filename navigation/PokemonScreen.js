import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import axios from "axios";
import PokemonDetails from "../components/PokemonDetails";

export default function PokemonList(navigation) {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const url = "https://pokeapi.co/api/v2/pokemon?limit=16";

    useEffect(() => {
        getpokemon = async (url) => {
            if (isLoaded) {
                setIsLoaded(false);
                try {
                    const response = await axios.get(url);

                    setPokemon((prevPokemon) => {
                        const updatedPokemon = [...prevPokemon, ...response.data.results];
                        return updatedPokemon;
                    });

                    setNextPage(response.data.next);
                    // setIsLoaded(true);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        getpokemon(url);
    }, []);

    return (
        <View style={styles.list_container}>
            <FlatList
                style={styles.list}
                columnWrapperStyle={styles.list_wrapper}
                data={pokemon}
                numColumns={2}
                onEndReached={() => {
                    getpokemon(nextPage)}
                }
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <PokemonDetails navigation={navigation} item={item} />
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list_container: {
        marginLeft: 20,
        marginRight: 20,
        // height: '100%',
    },
    list: {
        marginBottom: 100,
        maxHeight: '100%',
    },
    list_wrapper: {
        justifyContent: 'space-between',
    },
});