import React from 'react';
import { Button } from 'react-native';

function MyTabBar({ navigation }) {
    return (
        <Button
            title="Go somewhere"
            onPress={() => {
                navigation.navigate('SomeScreen');
            }}
        />
    );
}