import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentScreen from './AppointmentScreen';
import Modal from './Modal';

const Stack = createStackNavigator();

const AppointmentNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Appointment' component={AppointmentScreen} />
      <Stack.Screen name='Modal' component={Modal} />
    </Stack.Navigator>
  );
};

export default AppointmentNavigation;
