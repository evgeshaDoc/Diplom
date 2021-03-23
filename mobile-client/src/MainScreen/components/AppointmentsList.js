import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppointmentTime from './AppointmentTime';
import RoundedLetter from './RoundedLetter';

const AppointmentsList = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        navigation.navigate('Appointment', {
          screen: 'Appointment',
          params: { id: item._id, time: item.time[0] },
        })
      }
    >
      <View style={{ flexDirection: 'row' }}>
        <RoundedLetter letter={item.patient.surname} />
        <View style={styles.infoContainer}>
          <View style={styles.personalContainer}>
            <Text style={styles.personText}>{item.patient.name}</Text>
            <Text style={styles.personText}> {item.patient.surname}</Text>
          </View>
          {item.diag && <Text>{item.diag}</Text>}
        </View>
      </View>
      <AppointmentTime time={item.time[0]} />
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
