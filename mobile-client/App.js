import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppointmentsTab from './src/Navigation/AppointmentsTab';
import PatientsTab from './src/Navigation/PatientsTab';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Appointments"
          component={AppointmentsTab}
          options={{
            tabBarLabel: 'Приемы',
          }}
        />
        <BottomTab.Screen
          name="Patients"
          component={PatientsTab}
          options={{
            tabBarLabel: 'Patients',
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
