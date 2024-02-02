import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const GameVersion = ({ PokemonDetails }) => {
  // Convert hectograms to kilograms
  const GameVersion = PokemonDetails['game_indices'][0].version.name;

  return (
    <Text style={styles.info_content_sup}>{GameVersion}</Text>
  );
};

export default GameVersion;


const styles = StyleSheet.create({
  info_content_sup: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#1b1c1c',
    // fontFamily: 'pokemon_pixel_font',
  }
});