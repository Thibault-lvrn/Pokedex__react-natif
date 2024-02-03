import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PokemonButton = ({ pokemonData }) => {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [pokemonId, setPokemonId] = useState(null);
    const [isTeamFull, setisTeamFull] = useState(false);

    useEffect(() => {
        if (pokemonData && pokemonData.id) {
            setPokemonId(pokemonData.id);
        }
    }, [pokemonData]);

    useEffect(() => {
        if (pokemonId) {
            checkPokemonInTeam();
        }
    }, [pokemonId]);

    const checkPokemonInTeam = async () => {
        console.log("Vérification de l'existence du Pokémon dans l'équipe");
        try {
            const pokemonTeamString = await AsyncStorage.getItem('pokemonTeam');

            if (pokemonTeamString && pokemonTeamString.length > 2) {
                console.log("L'équipe existe");
                const pokemonTeam = JSON.parse(pokemonTeamString);

                if (pokemonTeam.hasOwnProperty(pokemonId)) {
                    console.log("Le Pokémon est dans l'équipe");
                    setIsButtonActive(true);
                }
            } else {
                console.log("L'équipe n'existe pas");
                setIsButtonActive(false);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de pokemonTeam depuis AsyncStorage', error);
        }
    };

    const handleButtonClick = async () => {
        try {
            console.log("click")
            const pokemonTeamString = await AsyncStorage.getItem('pokemonTeam');
            const pokemonTeam = pokemonTeamString ? JSON.parse(pokemonTeamString) : {};
            const isPokemonInTeam = pokemonTeam.hasOwnProperty(pokemonData.id);

            console.log("isPokemonInTeam", isPokemonInTeam)
            if (isPokemonInTeam) {
                delete pokemonTeam[pokemonData.id];
                console.log("on delete le pokemon")
                await AsyncStorage.setItem('pokemonTeam', JSON.stringify(pokemonTeam));
                setIsButtonActive(!isPokemonInTeam);
                setisTeamFull(false);
            } else {
                console.log("on ajoute le pokemon")
                if (Object.keys(pokemonTeam).length < 6) {
                    const test = {
                        "abilities": [
                            {
                                "ability": {
                                    "name": "overgrow",
                                    "url": "https://pokeapi.co/api/v2/ability/65/"
                                },
                                "is_hidden": false,
                                "slot": 1
                            },
                            {
                                "ability": {
                                    "name": "chlorophyll",
                                    "url": "https://pokeapi.co/api/v2/ability/34/"
                                },
                                "is_hidden": true,
                                "slot": 3
                            }
                        ],
                        "id": pokemonData.id,
                        "base_experience": 64
                    };
                    console.log(typeof test)
                    console.log(typeof pokemonData)
                    console.log(test)
                    console.log(pokemonData)
                    pokemonTeam[pokemonData.id] = pokemonData;
                    await AsyncStorage.setItem('pokemonTeam', JSON.stringify(pokemonTeam));
                    setIsButtonActive(!isPokemonInTeam);
                } else {
                    setisTeamFull(true);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du clic sur le bouton', error);
        }
    };

    return (
        <TouchableOpacity style={styles.star_container} onPress={handleButtonClick} >
            <View style={{ padding: 10 }}>
                <Icon
                    name={isButtonActive ? 'star' : 'star-outline'}
                    size={50}
                    color="#FFD700"
                />
            </View>
            <View style={styles.info_sup}>
                {isTeamFull && (
                    <Text style={styles.info_sup_text}>Team Complete</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default PokemonButton;

const styles = StyleSheet.create({
    star_container: {
        position: 'relative',
    },
    info_sup: {
        position: 'absolute',
        bottom: -20,
        left: '4%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info_sup_text: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});