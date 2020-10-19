import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const TableContent = ({ item }) => {
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  useEffect(() => {
    setCount(`${item.count}`);
    setPrice(`${item.price * item.count}`);
  }, []);

  useEffect(() => {
    setPrice(`${count * item.price}`);
  }, [count]);

  return (
    <View style={styles.tableItems}>
      <View style={[styles.itemContainer, { flex: 0.8 }]}>
        <Text>{item.name}</Text>
      </View>
      <View style={[styles.itemContainer, { alignItems: 'center', flex: 0.3 }]}>
        <TextInput
          value={count}
          onChangeText={(text) => setCount(text)}
          keyboardType="decimal-pad"
          defaultValue={`${item.count}`}
          textAlign={'center'}
          style={styles.inputStyle}
        />
      </View>
      <View style={[styles.itemContainer, { flex: 0.4, alignItems: 'center' }]}>
        <Text>{formatPrice(price)}</Text>
      </View>
    </View>
  );
};

export default TableContent;

const styles = StyleSheet.create({
  tableItems: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: '#000',
    justifyContent: 'center',
  },
  inputStyle: {
    width: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ebf1fa',
    alignItems: 'center',
  },
});
