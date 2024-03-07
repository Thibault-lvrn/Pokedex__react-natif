import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'; // Importation de ScreenOrientation
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    const [orientationLocked, setOrientationLocked] = useState(false); // Ajout de l'état pour suivre l'état de verrouillage de l'orientation

    useEffect(() => {
        (async () => {
            await ScreenOrientation.unlockAsync();
        })();
    }, []);

    const toggleScreenOrientation = async () => { // Fonction pour basculer l'orientation de l'écran
        if (orientationLocked) {
            await ScreenOrientation.unlockAsync(); // Déverrouiller l'orientation de l'écran
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT); // Verrouiller l'orientation de l'écran
        }
        setOrientationLocked(!orientationLocked); // Inverser l'état de verrouillage de l'orientation
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.orientationButton} onPress={toggleScreenOrientation}>
                <Icon name='rotate-3d-variant' size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orientationButton: {
        backgroundColor: 'blue',
        borderRadius: 50,
        padding: 20,
    },
});
