import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppointmentTime from './AppointmentTime';
import RoundedLetter from './RoundedLetter';

const AppointmentsList = ({ item }) => {
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => navigation.navigate('Appointment', { patient: item })}
    >
      <View style={{ flexDirection: 'row' }}>
        <RoundedLetter letter={item.surname} />
        <View style={styles.infoContainer}>
          <View style={styles.personalContainer}>
            <Text style={styles.personText}>{item.name}</Text>
            <Text style={styles.personText}> {item.surname}</Text>
          </View>
          {item.diag && <Text>{item.diag}</Text>}
        </View>
      </View>
      {/* {item.price && <Text>{formatPrice(item.price)}</Text>} */}
      <AppointmentTime time={item.time} />
    </TouchableOpacity>
  );
};

export default AppointmentsList;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  personalContainer: {
    flexDirection: 'row',
  },
  personText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
