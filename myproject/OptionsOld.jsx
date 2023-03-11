// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function OptionsOld({ selectedOption, setSelectedOption }) {
//   return (
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
//           style={[styles.optionButton, selectedOption === 'table' && styles.selectedOptionButton]}
//           onPress={() => setSelectedOption('table')}
//         >
//           <Text style={[styles.optionButtonText, selectedOption === 'table' && styles.selectedOptionButtonText]}>
//             Table
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
//   );
// }

// const styles = StyleSheet.create({
//   optionsContainer: {
//     marginTop: 20,
//   },
//   optionsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   options: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   optionButton: {
//     backgroundColor: '#000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   optionButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   selectedOptionButton: {
//     backgroundColor: '#fff',
//   },
//   selectedOptionButtonText: {
//     color: '#000',
//   },
// });
