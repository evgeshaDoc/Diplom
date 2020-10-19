import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../MainScreen/MainScreen';
import AppointmentScreen from '../AppointmentScreen/AppointmentScreen';

const Stack = createStackNavigator();

export default AppointmentsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{ headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};
