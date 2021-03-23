import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Product = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
    }).format(price);
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={{ uri: product.picture }}
        style={{ width: 70, height: 40 }}
      />
      <Text style={{ width: 150 }}>{product.name}</Text>
      <Text style={{ width: 30 }}>{product.remains}</Text>
      <Text style={{ width: 80 }}>{formatPrice(product.price)}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
});
