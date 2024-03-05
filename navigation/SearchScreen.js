import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import PokemonDetails from "../components/PokemonDetails";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [emptyMessage, setemptyMessage] = useState('Search for a Pokemon');
    const [loading, setLoading] = useState(false);
    const [isFirstSearch, setIsFirstSearch] = useState(true);

    useEffect(() => {
        let timeout;

        if (searchTerm.trim().length > 1) {
            if (isFirstSearch) {
                // Si c'est la première recherche, lancez la recherche immédiatement
                searchPokemon();
                setIsFirstSearch(false);
            } else {
                // Sinon, attendez 0.5 secondes avant de déclencher la recherche
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    searchPokemon();
                }, 500);
            }
        } else {
            setSearchResults([]);
            setemptyMessage('Search for a Pokemon');
            setIsFirstSearch(true); // Réinitialiser isFirstSearch lorsqu'il n'y a aucun terme de recherche
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    const searchPokemon = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const allPokemon = response.data.results;

            const filteredPokemon = allPokemon.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );

            setSearchResults(filteredPokemon);

            if (filteredPokemon.length === 0) {
                setemptyMessage('No results found');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de Pokémon', error);
            setemptyMessage('No results found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.search_container}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10, width: '70%' }}
                    placeholder="Enter Pokemon name"
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                />
            </View>
            <View style={styles.list_container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : searchResults.length > 0 ? (
                    <FlatList
                        style={styles.list}
                        columnWrapperStyle={styles.list_wrapper}
                        data={searchResults}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                        renderItem={({ item }) => <PokemonDetails item={item} />}
                    />
                ) : (
                    <Text style={styles.text}>{emptyMessage}</Text>
                )}
            </View>
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    search_container: {
        backgroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        height: '15%',
        minHeight: 120,
    },
    list_container: {
        marginLeft: 20,
        marginRight: 20,
    },
    list: {
        marginBottom: 100,
        height: '85%',
    },
    list_wrapper: {
        justifyContent: 'space-between',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
});
