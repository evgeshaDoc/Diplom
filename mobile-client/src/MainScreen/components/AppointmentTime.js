import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentTime = ({ time }) => {
  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

export default AppointmentTime;

const styles = StyleSheet.create({
  timeContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#91b2ff',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
