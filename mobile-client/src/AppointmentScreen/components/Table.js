import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import TableContent from './TableContent';
import AppointmentContext from '../AppointmentContext';

const Table = ({ patient }) => {
  return (
    <>
      <View style={styles.tableTitleContainer}>
        <Text style={styles.tableTitleText}>Оказанные услуги</Text>
      </View>
      <View style={styles.tableView}>
        <View style={styles.topLine}>
          <View style={[styles.tableTitle, { flex: 0.8 }]}>
            <Text>Наименование</Text>
          </View>
          <View style={[styles.tableTitle, { flex: 0.3 }]}>
            <Text>Кол-во</Text>
          </View>
          <View style={[styles.tableTitle, { flex: 0.4 }]}>
            <Text>Цена</Text>
          </View>
        </View>
        {patient.cart.map((item) => (
          <TableContent key={`content-${item.id}`} item={item} />
        ))}
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="plus-circle" size={32} color="#c3c8cf" />
        <Text></Text>
      </View>
    </>
  );
};

export default Table;

const styles = StyleSheet.create({
  tableTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  tableTitleText: {
    fontSize: 20,
    fontWeight: '500',
  },
  tableView: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#c3c8cf',
  },
  tableTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
});
