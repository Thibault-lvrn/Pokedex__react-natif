import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonDetails from "../components/PokemonDetails";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        getPokemonTeam();
    }, []);

    useEffect(() => {
        console.log('Page Pokedex est affichée');
    }, []);

    const getPokemonTeam = async () => {
        try {
            const pokemonTeamString = await AsyncStorage.getItem('pokemonTeam');
            if (pokemonTeamString) {
                const parsedPokemonTeam = JSON.parse(pokemonTeamString);
                const arrayOfPokemonData = Object.values(parsedPokemonTeam).flat();

                setPokemonList(arrayOfPokemonData);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de pokemonTeam depuis AsyncStorage', error);
        }
    };

    return (
        <View>
            <View style={styles.title_container}>
                <Text style={styles.title}>Your Team</Text>
            </View>
            <FlatList
                data={pokemonList}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    return item.height ? (
                        <View>
                            <PokemonDetails item={item} />
                        </View>
                    ) : <Text>taille : {item.height}</Text>;
                }}
            />
        </View>
    );
};

export default PokemonList;


const styles = StyleSheet.create({
    title_container: {
        paddingTop: 100,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    }
});