import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const cameraStatus = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');
    
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(galleryStatus.status === 'granted');
            })();
        }, [])
    );

    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.takePictureAsync();
            setImage(data.uri);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function toggleCameraType() {
        setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)); // Modification ici
    }

    const deleteImage = () => {
        setImage(null);
    };

    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera or gallery</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.cameraPreview}
                    type={type}
                    ref={(ref) => {
                        cameraRef = ref;
                    }}
                >
                    <View style={styles.cameraButtonsContainer}>
                        <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
                            <Icon
                                name='camera-flip'
                                size={40}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                            <Icon name='camera' size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                            <Icon name='image' size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
            {image && 
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
                        <Icon name='delete' size={30} color="white" />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
    },
    cameraPreview: {
        // flex: 1,
        height: '100%',
        width: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cameraButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%',
    },
    cameraButton: {
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    imagePreview: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 5,
    },
});
