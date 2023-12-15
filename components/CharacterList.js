import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    Button,
    FlatList 
} from "react-native";
import axios from "axios";



export default function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const getCharacters = async () => {
          try {
            const response = await axios.get(
              "https://pokeapi.co/api/v2/pokemon"
            );
            setCharacters(response.data);
            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        };
    
        getCharacters();
    }, []);

    return (
        <View>
            <Text>Character List</Text>
            <FlatList
                data={characters}
                renderItem={ ({ item }) => 
                    <Text>
                        {item.count}
                    </Text>
                }
                keyExtractor={(item) => item.id.toString()} // Ensure key is a string
            />
        </View>
    );
}