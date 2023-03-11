import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Camera from '../screens/Camera'
import Options from '../screens/Options'

const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Camera' >

      <Stack.Screen name='Camera' component={Camera} />

      <Stack.Screen name='Options' component={Options} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}