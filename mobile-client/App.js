import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import AppointmentsTab from './src/Navigation/AppointmentsTab';
import PatientsTab from './src/Navigation/PatientsTab';
import { useAuth } from './src/hooks/auth.hook';
import LoginScreen from './src/LoginScreen/LoginScreen';

const BottomTab = createBottomTabNavigator();
export const MainContext = createContext({
  token: '',
  logout: function () {},
  login: function () {},
});

export default function App() {
  const { token, login, logout } = useAuth();

  if (!token)
    return (
      <MainContext.Provider value={{ login }}>
        <LoginScreen />
      </MainContext.Provider>
    );

  return (
    <MainContext.Provider value={{ logout, token }}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' />
        <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
          <BottomTab.Screen
            name='Appointments'
            component={AppointmentsTab}
            options={{
              tabBarIcon: ({ focused, color, size }) => {
                let customColor = focused ? '#147efb' : '#bfbfbf';
                return (
                  <FontAwesome5
                    name='clipboard-list'
                    size={28}
                    color={customColor}
                  />
                );
              },
            }}
          />
          <BottomTab.Screen
            name='Patients'
            component={PatientsTab}
            options={{
              tabBarIcon: ({ focused }) => {
                let customColor = focused ? '#147efb' : '#bfbfbf';
                return (
                  <FontAwesome5
                    name='briefcase-medical'
                    size={28}
                    color={customColor}
                  />
                );
              },
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
}
