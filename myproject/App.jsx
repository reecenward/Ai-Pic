import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Camera } from 'expo-camera';

import Navigator from './routes/HomeStack'

import SelectedImage from './SelectedImage';
import CameraPreview from './CameraPreview';
import Options from './OptionsOld';


// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!', [{ text: 'OK' }]);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync(); // use requestCameraPermissionsAsync instead
//       setHasCameraPermission(status === 'granted');
//     })();
//   }, []);
  

//   const takePhoto = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 1, base64: true, skipProcessing: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       setSelectedImage(data.uri);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
  
//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };
  

//   const viewSavedText = () => {
//     // TODO: Implement view saved text functionality
//     Alert.alert('View saved text', 'This functionality has not been implemented yet.', [{ text: 'OK' }]);
//   };

//   const submitImage = async () => {
//     if (selectedImage && selectedOption) {
//       setIsLoading(true);
//       // Convert the image to base64
//       const base64Image = await fetch(selectedImage).then((response) =>
//         response.blob().then((blob) => {
//           return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//           });
//         })
//       );

//       // Send the image and selected option to the server
//       try {
//         const response = await axios.post('http://127.0.0.1:5000', {
//           image: base64Image,
//           option: selectedOption,
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };


 
//   return (
//     <View style={styles.container}>
//       {hasCameraPermission ? 
//       (
//         <CameraPreview cameraRef={cameraRef} takePhoto={takePhoto} />
//       ) : (
//         <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         </TouchableOpacity>
//           )
//       }
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.bottomButton} onPress={viewSavedText}>
//             <Text style={styles.buttonText}>View Saved Text</Text>
//           </TouchableOpacity>

//           {hasCameraPermission && 
//             (
//               <TouchableOpacity style={styles.bottomButton} onPress={pickImage}>
//                 <Ionicons name="image-outline" size={24} color="white" />
//               </TouchableOpacity>
//             )
//           }

//           <TouchableOpacity style={styles.bottomButton} onPress={submitImage} disabled={!selectedImage || !selectedOption}>
//             <Text style={styles.buttonText}>Submit</Text>
//           </TouchableOpacity>
//         </View>

//         <Options selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

//             {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//             {selectedImage && <SelectedImage selectedImage={selectedImage} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingTop: 50,
//   },
//   imagePickerContainer: {
//     width: '100%',
//     height: 400,
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: '#C4C4C4',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginTop: 20,
//     width: '100%',
//   },
//   bottomButton: {
//     backgroundColor: '#000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });


export default function App() {
  return (
    Navigator()
  );
}