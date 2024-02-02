import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const SizeConverter = ({ sizeInDecimeters }) => {
  // Convert decimeters to meters
  const sizeInMeters = sizeInDecimeters / 10;

  return (
    <Text style={styles.info_content_sup}>{sizeInMeters}m</Text>
  );
};

export default SizeConverter;

const styles = StyleSheet.create({
  info_content_sup: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#1b1c1c',
    // fontFamily: 'pokemon_pixel_font',
  }
});

