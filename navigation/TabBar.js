import React from 'react';
import { Button } from 'react-native';

function MyTabBar({ navigation }) {
    return (
      <Button
        title="Go somewhere"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('SomeScreen');
        }}
      />
    );
  }