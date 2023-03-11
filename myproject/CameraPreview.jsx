// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera';
// import { Ionicons } from '@expo/vector-icons';

// export default function CameraPreview({ cameraRef, takePhoto }) {
//   return (
//     <View style={styles.cameraContainer}>
//       <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
//       <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
//         <Ionicons name="camera-outline" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cameraContainer: {
//     width: '100%',
//     height: '0%',
//     position: 'relative',
//   },
//   camera: {
//     width: '100%',
//     height: '100%',
//   },
//   cameraButton: {
//     position: 'absolute',
//     bottom: 25,
//     left: '50%',
//     marginLeft: -24,
//     backgroundColor: '#000',
//     borderRadius: 24,
//     width: 48,
//     height: 48,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
