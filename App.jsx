
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { Camera } from 'expo-camera';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!', [{ text: 'OK' }]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // use requestCameraPermissionsAsync instead
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
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  

  const viewSavedText = () => {
    // TODO: Implement view saved text functionality
    Alert.alert('View saved text', 'This functionality has not been implemented yet.', [{ text: 'OK' }]);
  };

  const submitImage = async () => {
    if (selectedImage && selectedOption) {
      setIsLoading(true);
      // Convert the image to base64
      const base64Image = await fetch(selectedImage).then((response) =>
        response.blob().then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
      );

      // Send the image and selected option to the server
      try {
        const response = await axios.post('http://127.0.0.1:5000', {
          image: base64Image,
          option: selectedOption,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };


 
 function SelectedImage({ selectedImage }) {
  return (
  <Swiper loop={false}>
  <View style={styles.slide}>
  <Image source={{ uri: selectedImage }} style={styles.image} />
  </View>
  <View style={styles.slide}>
  <Text>Option 1</Text>
  </View>
  <View style={styles.slide}>
  <Text>Option 2</Text>
  </View>
  <View style={styles.slide}>
  <Text>Option 3</Text>
  </View>
  </Swiper>
  );
 }
  
  function CameraPreview({ cameraRef }) {
  return (
  <View style={styles.cameraContainer}>
  <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
  <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
  <Ionicons name="camera-outline" size={24} color="white" />
  </TouchableOpacity>
  </View>
  );
  }
  
  return (
  <View style={styles.container}>
  {hasCameraPermission ? (
  <CameraPreview cameraRef={cameraRef} />
  ) : (
  <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
  {selectedImage ? (
  <Image source={{ uri: selectedImage }} style={styles.image} />
  ) : (
  <View style={styles.imagePlaceholder}>
  <Ionicons name="camera" size={48} color="#C4C4C4" />
  <Text style={styles.imagePlaceholderText}>Select an Image</Text>
  </View>
  )}
  </TouchableOpacity>
  )}
  <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.bottomButton} onPress={viewSavedText}>
  <Text style={styles.buttonText}>View Saved Text</Text>
  </TouchableOpacity>
  {hasCameraPermission && (
  <TouchableOpacity style={styles.bottomButton} onPress={pickImage}>
  <Ionicons name="image-outline" size={24} color="white" />
  </TouchableOpacity>
  )}
  <TouchableOpacity style={styles.bottomButton} onPress={submitImage} disabled={!selectedImage || !selectedOption}>
  <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.optionsContainer}>
  <Text style={styles.optionsTitle}>Select an option:</Text>
  <View style={styles.options}>
  <TouchableOpacity
  style={[styles.optionButton, selectedOption === 'summarize' && styles.selectedOptionButton]}
  onPress={() => setSelectedOption('summarize')}
  >
  <Text style={[styles.optionButtonText, selectedOption === 'summarize' && styles.selectedOptionButtonText]}>
  Summarize this text
  </Text>
  </TouchableOpacity>
  <TouchableOpacity
  style={[styles.optionButton, selectedOption === 'define' && styles.selectedOptionButton]}
  onPress={() => setSelectedOption('define')}
  >
  <Text style={[styles.optionButtonText, selectedOption === 'define' && styles.selectedOptionButtonText]}>
  What does this mean
  </Text>
  </TouchableOpacity>
  <TouchableOpacity
  style={[styles.optionButton, selectedOption === 'translate' && styles.selectedOptionButton]}
  onPress={() => setSelectedOption('translate')}
  >
  <Text style={[styles.optionButtonText, selectedOption === 'translate' && styles.selectedOptionButtonText]}>
  Translate this text
  </Text>
  </TouchableOpacity>
  </View>
  </View>
  {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
  {selectedImage && <SelectedImage selectedImage={selectedImage} />}
  </View>
  );
  }

  
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    },
    cameraContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
    },
    camera: {
    width: '100%',
    height: '100%',
    },
    cameraButton: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    marginLeft: -24,
    backgroundColor: '#000',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    },
    imagePickerContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    },
    image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    },
    imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    },
    imagePlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C4C4C4',
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 50,
    },
    bottomButton: {
    backgroundColor: '#000',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    },
    optionsContainer: {
    width: '100%',
    paddingHorizontal: 50,
    },
    optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    },
    options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
    optionButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    width: '30%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    },
    selectedOptionButton: {
    backgroundColor: '#000',
    },
    optionButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    },
    selectedOptionButtonText: {
    color: '#fff',
    },
    slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    });
