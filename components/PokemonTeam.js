import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonDetails from "../components/PokemonDetails";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [teamCount, setTeamCount] = useState(0);

    useEffect(() => {
        getPokemonTeam();
    }, []);

    const getPokemonTeam = async () => {
        try {
            const pokemonTeamString = await AsyncStorage.getItem('pokemonTeam');
            if (pokemonTeamString) {
                const parsedPokemonTeam = JSON.parse(pokemonTeamString);
                const arrayOfPokemonData = Object.values(parsedPokemonTeam).flat();

                setPokemonList(arrayOfPokemonData);
                setTeamCount(arrayOfPokemonData.length);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de pokemonTeam depuis AsyncStorage', error);
        }
    };

    const refreshPage = () => {
        getPokemonTeam();
    };

    return (
        <View>
            <View style={styles.title_container}>
                <Text style={styles.title}>Your Team ({teamCount}/6)</Text>
            </View>
            <View style={styles.list_container}>
                <FlatList
                    data={pokemonList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    styles={styles.list}
                    columnWrapperStyle={styles.list_wrapper}
                    renderItem={({ item }) => {
                        return item.height ? (
                            <PokemonDetails item={item} />
                        ) : <Text>taille : {item.height}</Text>;
                    }}
                />
            </View>
        </View>
    );
};

export default PokemonList;

const styles = StyleSheet.create({
    title_container: {
        paddingTop: 65,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    list_container: {
        marginLeft: 20,
        marginRight: 20,
    },
    list: {
        marginBottom: 100,
        height: '100%',
    },
    list_wrapper: {
        justifyContent: 'space-between',
    },
});
