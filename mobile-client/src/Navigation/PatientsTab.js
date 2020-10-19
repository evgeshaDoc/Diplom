import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import PatientsScreen from '../PatientsScreen/PatientsScreen'

const Stack = createStackNavigator()

const PatientsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main"
        component={PatientsScreen} 
        options={{
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  )
}

export default PatientsTab

