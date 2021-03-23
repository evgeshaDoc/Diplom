import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../ProductsScreen/ProductsScreen';

const Stack = createStackNavigator();

const PatientsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={ProductsScreen}
        options={{
          title: 'Товары и услуги',
        }}
      />
    </Stack.Navigator>
  );
};

export default PatientsTab;
