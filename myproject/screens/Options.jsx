// import React from "react";
// import {StyleSheet,View,Text,Button,Image} from 'react-native'
// import Swiper from 'react-native-swiper';

// export default function Options({navigation, route}) {
    
//     const {selectedImage} = route.params;
//     const pressHandler = () => {
//         navigation.goBack()
//     }

//     return (
//         <View>
//             <Button title="go back" onPress={pressHandler}/>
//             <Image source={{ uri: selectedImage }} style={styles.image} />

//             {/* <Swiper loop={false}>
//                 <View style={styles.slide}>
//                 </View>
//                 <View style={styles.slide}>
//                     <Text>Summary</Text>
//                 </View>
//                  <View style={styles.slide}>
//                     <Text>Translate</Text>
//                 </View>
//                 <View style={styles.slide}>
//                     <Text>Whats this</Text>
//                 </View>
//             </Swiper> */}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '60%',
//     resizeMode: "contain",
//     zIndex: 99,
//   },
// });


import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Button, Image,TouchableOpacity, ActivityIndicator} from 'react-native'
import Swiper from 'react-native-swiper';
import axios from 'axios';

export default function App({navigation, route}) {

  const {selectedImage} = route.params;
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pressHandler = () => {
    navigation.goBack();
  }

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
  return (
    <View>
      <Button title="go back" onPress={pressHandler}/>
      <Image source={{ uri: selectedImage }} style={styles.image} />
      <Swiper loop={false}>

        <View style={styles.slide}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'summarize' && styles.selectedOptionButton]}
          onPress={() => setSelectedOption('summarize')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'summarize' && styles.selectedOptionButtonText]}>
            Summarize this text
          </Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.slide}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'table' && styles.selectedOptionButton]}
          onPress={() => setSelectedOption('table')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'table' && styles.selectedOptionButtonText]}>
            Table
          </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.slide}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'translate' && styles.selectedOptionButton]}
          onPress={() => setSelectedOption('translate')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'translate' && styles.selectedOptionButtonText]}>
            Translate this text
          </Text>
        </TouchableOpacity>
        </View>

      </Swiper>
      <TouchableOpacity style={styles.bottomButton} onPress={submitImage} disabled={!selectedImage || !selectedOption}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: "contain",
    zIndex: 99,
  },
});
