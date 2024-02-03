import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: 135, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/img/pokemon_logo.png')} style={{ width: '90%', height: '100%', objectFit: 'cover' }} />
            </View>
            <Button
                title=""
                onPress={() => navigation.navigate('Pokemon list')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        textAlign: "center",
        color: 'black',
        textTransform: 'uppercase',
        height: 50,
        display: 'flex',
        alignItems: 'center',
    },
});