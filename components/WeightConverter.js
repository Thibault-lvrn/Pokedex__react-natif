import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

const WeightConverter = ({ weightInHectograms }) => {
    // Convert hectograms to kilograms
    const weightInKilograms = weightInHectograms / 10;

    return (
        <Text style={styles.info_content_sup}>{weightInKilograms}kg</Text>
    );
};

export default WeightConverter;


const styles = StyleSheet.create({
    info_content_sup: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#1b1c1c',
    }
});