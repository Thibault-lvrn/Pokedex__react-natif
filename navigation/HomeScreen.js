import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.text}>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
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