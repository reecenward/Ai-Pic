import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CameraView({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setSelectedImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (result.canceled === false) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const pressHandler2 = () => {
    navigation.navigate('Options', { selectedImage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {hasCameraPermission && (
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
        )}
        {selectedImage && (
          <View style={styles.imageOverlay}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
        <View style={styles.buttonContainer}>
            {hasCameraPermission && (
              <TouchableOpacity style={styles.bottomButton} onPress={pickImage}>
                <Ionicons name="image-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          {hasCameraPermission && (
            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
            <TouchableOpacity style={styles.nextButton} onPress={pressHandler2}>
            <Ionicons name="arrow-forward-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cameraContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'black',
  },
  camera: {
    width: '100%',
    height: '90%',
  },

  imagePickerContainer: {
   
},
image: {
width: '100%',
height: '100%',
resizeMode: 'contain',
},

imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
},


//Button Bottom Bar
buttonContainer: {
flexDirection: 'row',
},
cameraButton: {
    position: 'relative',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    flex: 1,
  },
  bottomButton: {
    position: 'relative',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    flex: 1,
    },
    nextButton:{
        position: 'relative',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 24,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
        flex: 1,
    },

});