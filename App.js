import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import PokemonList from './components/PokemonList';

export default function App() {
  return (
    <View 
      style={styles.container}
    >
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
      <PokemonList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
