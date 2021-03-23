import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

import MainScreen from '../MainScreen/MainScreen';
import AppointmentScreen from '../AppointmentScreen/AppointmentScreen';
import AppointmentNavigation from '../AppointmentScreen/AppointmentNavigation';
import { MainContext } from '../../App';

const Stack = createStackNavigator();

export default AppointmentsTab = () => {
  const { logout } = useContext(MainContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={MainScreen}
        options={{
          title: 'Приемы',
          headerRight: () => {
            return (
              <TouchableOpacity onPress={logout}>
                <AntDesign
                  name='logout'
                  size={18}
                  style={{ paddingRight: 15 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='Appointment'
        component={AppointmentNavigation}
        options={{ headerBackTitleVisible: false, title: 'Просмотр приема' }}
      />
    </Stack.Navigator>
  );
};
