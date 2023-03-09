
// old working ugly verion
// import React, { useState } from 'react';
// import { View, Text, Image, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');

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

//   const submitImage = async () => {
//     if (selectedImage && selectedOption) {
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
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {selectedImage && (
//         <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       <View style={{ marginTop: 20 }}>
//         <Text>Select an option:</Text>
//         <Button title="Summarize this text" onPress={() => setSelectedOption('summarize')} />
//         <Button title="What does this mean" onPress={() => setSelectedOption('define')} />
//         <Button title="Translate this to Spanish" onPress={() => setSelectedOption('translate')} />
//       </View>
//       <Button title="Submit" onPress={submitImage} />
//     </View>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!', [{ text: 'OK' }]);
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
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
//       <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         ) : (
//           <View style={styles.imagePlaceholder}>
//             <Ionicons name="camera" size={48} color="#C4C4C4" />
//             <Text style={styles.imagePlaceholderText}>Select an Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//       <View style={styles.optionsContainer}>
//         <Text style={styles.optionsTitle}>Select an option:</Text>
//         <View style={styles.options}>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'summarize' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('summarize')}
//           >
//             <Text style={[styles.optionButtonText, selectedOption === 'summarize' && styles.selectedOptionButtonText]}>
//               Summarize this text
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'define' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('define')}
//           >
//             <Text style={[styles.optionButtonText, selectedOption === 'define' && styles.selectedOptionButtonText]}>
//               What does this mean
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'translate' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('translate')}
//             >
//             <Text style={[styles.optionButtonText, selectedOption === 'translate' && styles.selectedOptionButtonText]}>
//             Translate this text
//             </Text>
//             </TouchableOpacity>
//             </View>
//             </View>
//             <Button title="Submit" onPress={submitImage} disabled={!selectedImage || !selectedOption} />
//             {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//             </View>
//             );
//             }
            
//             const styles = StyleSheet.create({
//             container: {
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 20,
//             },
//             imagePickerContainer: {
//             width: '100%',
//             height: '50%',
//             borderColor: '#C4C4C4',
//             borderWidth: 1,
//             borderRadius: 10,
//             overflow: 'hidden',
//             marginBottom: 20,
//             },
//             image: {
//             width: '100%',
//             height: '100%',
//             },
//             imagePlaceholder: {
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             },
//             imagePlaceholderText: {
//             fontSize: 16,
//             marginTop: 10,
//             color: '#C4C4C4',
//             },
//             optionsContainer: {
//             width: '100%',
//             marginBottom: 20,
//             },
//             optionsTitle: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 10,
//             },
//             options: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             },
//             optionButton: {
//             backgroundColor: '#C4C4C4',
//             borderRadius: 10,
//             padding: 10,
//             flex: 1,
//             marginRight: 10,
//             },
//             selectedOptionButton: {
//             backgroundColor: '#0000ff',
//             },
//             optionButtonText: {
//             color: '#ffffff',
//             textAlign: 'center',
//             },
//             selectedOptionButtonText: {
//             fontWeight: 'bold',
//             },
//             });


// import React, { useState, useEffect, useRef } from 'react';

// import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// import axios from 'axios';
// import { Camera } from 'expo-camera';


// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const cameraRef = useRef(null);
  

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
//         if (status !== 'granted') {
//           Alert.alert('Permission denied', 'Sorry, we need camera roll and camera permissions to make this work!', [{ text: 'OK' }]);
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async (source) => {
//     let result = null;
//     if (source === 'library') {
//       result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//     } else if (source === 'camera') {
//       result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//     }

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const handleTakePicture = async () => {
//     if (cameraRef.current) {
//       const { uri } = await cameraRef.current.takePictureAsync();
//       setSelectedImage(uri);
//       setIsCameraOpen(false);
//     }
//   };
  
//   const handleBarcodeScan = ({ type, data }) => {
//     Alert.alert('Barcode Scanned', `Type: ${type}\nData: ${data}`, [{ text: 'OK' }]);
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
//       <TouchableOpacity style={styles.imagePickerContainer} onPress={() => pickImage('library')}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         ) : (
//           <View style={styles.imagePlaceholder}>
//             <Ionicons name="camera" size={48} color="#C4C4C4" />
//             <Text style={styles.imagePlaceholderText}>Select an Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//       <View style={styles.cameraContainer}>
//         <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraOpen(true)}>
//           <Ionicons name="camera-outline" size={32} color="#ffffff" />
//         </TouchableOpacity>
//         {isCameraOpen && (
//           <Camera style={styles.camera} type={Camera.Constants.Type.back} autoFocus={Camera.Constants.AutoFocus.on} onBarCodeScanned={handleBarcodeScan} ref={cameraRef}>
//             <TouchableOpacity style={styles.closeCameraButton} onPress={() => setIsCameraOpen(false)}>
//               <Ionicons name="close-outline" size={32} color="#ffffff" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.takePictureButton} onPress={handleTakePicture}>
//               <Ionicons name="camera" size={32} color="#ffffff" />
//             </TouchableOpacity>
//           </Camera>
//         )}
//       </View>
//       <View style={[styles.cameraContainer, isCameraOpen && styles.fullScreen]}>
//   {isCameraOpen && (
//     <Camera style={styles.camera} type={Camera.Constants.Type.back} autoFocus={Camera.Constants.AutoFocus.on} onBarCodeScanned={handleBarcodeScan} ref={cameraRef}>
//       <TouchableOpacity style={styles.exitCameraButton} onPress={() => setIsCameraOpen(false)}>
//         <Ionicons name="close-outline" size={32} color="#ffffff" />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakePicture}>
//         <Ionicons name="camera" size={32} color="#ffffff" />
//       </TouchableOpacity>
//     </Camera>
//   )}
// </View>

//       <View style={styles.optionsContainer}>
//         <Text style={styles.optionsTitle}>Select an option:</Text>
//         <View style={styles.options}>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'summarize' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('summarize')}
//           >
//             <Text style={[styles.optionButtonText, selectedOption === 'summarize' && styles.selectedOptionButtonText]}>
//               Summarize this text
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'define' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('define')}
//           >
//             <Text style={[styles.optionButtonText, selectedOption === 'define' && styles.selectedOptionButtonText]}>
//               What does this mean
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.optionButton, selectedOption === 'translate' && styles.selectedOptionButton]}
//             onPress={() => setSelectedOption('translate')}
//             >
//             <Text style={[styles.optionButtonText, selectedOption === 'translate' && styles.selectedOptionButtonText]}>
//             Translate this text
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Button title="Submit" onPress={submitImage} disabled={!selectedImage || !selectedOption} />
//       {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//   );
  
//             }
            
//             const styles = StyleSheet.create({
//             container: {
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 20,
//             },
//             imagePickerContainer: {
//             width: '100%',
//             height: '50%',
//             borderColor: '#C4C4C4',
//             borderWidth: 1,
//             borderRadius: 10,
//             overflow: 'hidden',
//             marginBottom: 20,
//             },
//             image: {
//             width: '100%',
//             height: '100%',
//             },
//             imagePlaceholder: {
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             },
//             imagePlaceholderText: {
//             fontSize: 16,
//             marginTop: 10,
//             color: '#C4C4C4',
//             },
//             optionsContainer: {
//             width: '100%',
//             marginBottom: 20,
//             },
//             optionsTitle: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 10,
//             },
//             options: {
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             },
//             optionButton: {
//             backgroundColor: '#C4C4C4',
//             borderRadius: 10,
//             padding: 10,
//             flex: 1,
//             marginRight: 10,
//             },
//             selectedOptionButton: {
//             backgroundColor: '#0000ff',
//             },
//             optionButtonText: {
//             color: '#ffffff',
//             textAlign: 'center',
//             },
//             selectedOptionButtonText: {
//             fontWeight: 'bold',
//             },
//             cameraContainer: {
//               position: 'absolute',
//               bottom: isCameraOpen ? 0 : 20, // add conditional styling to adjust the position of the container
//               right: 20,
//               zIndex: 1, // add zIndex to make sure the cameraContainer is on top of other components
//               flexDirection: 'row', // add flexDirection to align the camera controls horizontally
//               justifyContent: 'space-between', // add justifyContent to distribute the controls evenly
//               width: '100%',
//               paddingHorizontal: 20, // add paddingHorizontal to give some padding to the controls
//             },
            
//             cameraButton: {
//               backgroundColor: '#0000ff',
//               borderRadius: 50,
//               padding: 10,
//               width: 50,
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             camera: {
//               flex: 1,
//             },
//             takePictureButton: {
//               alignSelf: 'center',
//               backgroundColor: '#fff',
//               borderRadius: 50,
//               padding: 10,
//               marginVertical: 20,
//             },
//             closeCameraButton: {
//               position: 'absolute',
//               top: 20,
//               right: 20,
//             },
            
//             fullScreen: {
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//             },
//             exitCameraButton: {
//               position: 'absolute',
//               top: 20,
//               left: 20,
//             },
//             takePhotoButton: {
//               position: 'absolute',
//               bottom: 20,
//               alignSelf: 'center',
//             },
//             cameraButton: {
//               backgroundColor: '#0000ff',
//               borderRadius: 50,
//               padding: 10,
//               width: 50,
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             takePictureButton: {
//               backgroundColor: '#fff',
//               borderRadius: 50,
//               padding: 10,
//               width: 70,
//               height: 70,
//               alignSelf: 'center',
//               marginBottom: 20,
//             },
//             closeCameraButton: {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               borderRadius: 50,
//               padding: 10,
//               width: 50,
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             exitCameraButton: {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               borderRadius: 50,
//               padding: 10,
//               width: 50,
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//             fullScreen: {
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//             },
            
            
            
//             });





// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import Swiper from 'react-native-swiper';

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Sorry, we need camera permissions to make this work!', [{ text: 'OK' }]);
//       } else {
//         const result = await ImagePicker.launchCameraAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [4, 3],
//           quality: 1,
//         });
//         if (!result.cancelled) {
//           setSelectedImage(result.uri);
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission denied', 'Sorry, we need camera permissions to make this work!', [{ text: 'OK' }]);
//     } else {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         setSelectedImage(result.uri);
//       }
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

//   function SelectedImage({ selectedImage }) {
//     return (
//       <Swiper loop={false}>
//         <View style={styles.slide}>
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         </View>
//         <View style={styles.slide}>
//           <Text>Option 1</Text>
//         </View>
//         <View style={styles.slide}>
//         <Text>Option 2</Text>
//       </View>
//       <View style={styles.slide}>
//         <Text>Option 3</Text>
//       </View>
//     </Swiper>
//   );
// }

// return (
//   <View style={styles.container}>
//     <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
//       {selectedImage ? (
//         <Image source={{ uri: selectedImage }} style={styles.image} />
//       ) : (
//         <View style={styles.imagePlaceholder}>
//           <Ionicons name="camera" size={48} color="#C4C4C4" />
//           <Text style={styles.imagePlaceholderText}>Select an Image</Text>
//         </View>
//       )}
//     </TouchableOpacity>
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.bottomButton} onPress={viewSavedText}>
//         <Text style={styles.buttonText}>View Saved Text</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.bottomButton} onPress={takePhoto}>
//         <Ionicons name="camera-outline" size={24} color="white" />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.bottomButton} onPress={submitImage} disabled={!selectedImage || !selectedOption}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.optionsContainer}>
//       <Text style={styles.optionsTitle}>Select an option:</Text>
//       <View style={styles.options}>
//         <TouchableOpacity
//           style={[styles.optionButton, selectedOption === 'summarize' && styles.selectedOptionButton]}
//           onPress={() => setSelectedOption('summarize')}
//         >
//           <Text style={[styles.optionButtonText, selectedOption === 'summarize' && styles.selectedOptionButtonText]}>
//             Summarize this text
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.optionButton, selectedOption === 'define' && styles.selectedOptionButton]}
//           onPress={() => setSelectedOption('define')}
//         >
//           <Text style={[styles.optionButtonText, selectedOption === 'define' && styles.selectedOptionButtonText]}>
//             What does this mean
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.optionButton, selectedOption === 'translate' && styles.selectedOptionButton]}
//           onPress={() => setSelectedOption('translate')}
//         >
//           <Text style={[styles.optionButtonText, selectedOption === 'translate' && styles.selectedOptionButtonText]}>
//             Translate this text
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//     {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//     {selectedImage && <SelectedImage selectedImage={selectedImage} />}
//   </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: 20,
// },
// imagePickerContainer: {
//   width: '100%',
//   height: '50%',
//   borderColor: '#C4C4C4',
//   borderWidth: 1,
//   borderRadius: 10,
//   overflow: 'hidden',
//   marginBottom: 20,
// },
// image: {
//   width: '100%',
//   height: '100%',
// },
// imagePlaceholder: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// imagePlaceholderText: {
//   fontSize: 16,
//   marginTop: 10,
//   color: '#C4C4C4',
// },
// optionsContainer: {
//   width: '100%',
//   marginBottom: 20,
//   },
//   optionsTitle: {
//   fontSize: 18,
//   fontWeight: 'bold',
//   marginBottom: 10,
//   },
//   options: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   },
//   optionButton: {
//   backgroundColor: '#C4C4C4',
//   borderRadius: 5,
//   paddingHorizontal: 10,
//   paddingVertical: 5,
//   minWidth: '30%',
//   alignItems: 'center',
//   },
//   optionButtonText: {
//   color: 'white',
//   fontSize: 14,
//   },
//   selectedOptionButton: {
//   backgroundColor: '#2E86C1',
//   },
//   selectedOptionButtonText: {
//   fontWeight: 'bold',
//   },
//   buttonContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   width: '100%',
//   marginBottom: 20,
//   },
//   bottomButton: {
//   backgroundColor: '#2E86C1',
//   borderRadius: 5,
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   alignItems: 'center',
//   },
//   buttonText: {
//   color: 'white',
//   fontSize: 16,
//   },
//   slide: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   },
//   image: {
//   width: '100%',
//   height: '100%',
//   },
//   });


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