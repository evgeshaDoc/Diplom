import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import TableContent from './TableContent';
import AppointmentContext from '../AppointmentContext';

const Table = ({ cart }) => {
  if (!cart.length)
    return (
      <View style={styles.noGoodsContainer}>
        <Text style={styles.noGoodsText}>Расходников не добавлено</Text>
      </View>
    );
  return (
    <View>
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
        {cart.map((item) => (
          <TableContent key={`content-${item._id}`} item={item} />
        ))}
      </View>
    </View>
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
  noGoodsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  noGoodsText: {
    fontSize: 20,
    fontWeight: '600',
  },
  noGoodsButtonContainer: {
    backgroundColor: '#0a6aff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 100,
    height: 40,
  },
  noGoodsButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
