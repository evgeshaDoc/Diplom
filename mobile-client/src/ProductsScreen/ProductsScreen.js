import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Filters from './components/Filters';
import { ProductsContext } from './ProductsContext';
import { useAuth } from '../hooks/auth.hook';
import Product from './components/Product';
import { useHttp } from '../hooks/http.hook';
import { HOST_WITH_PORT } from '../../constants';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    orderBy: 'name',
    search: '',
    category: '0',
    priceMax: '',
    priceMin: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const { request, loading } = useHttp();

  const changeSearch = (text) => {
    setFilters((prevState) => ({ ...prevState, search: text }));
  };

  const changePrice = (text, variant) => {
    if (variant === 'min')
      setFilters((prevState) => ({ ...prevState, priceMin: text }));
    else if (variant === 'max')
      setFilters((prevState) => ({ ...prevState, priceMax: text }));
  };

  const changeOrderBy = (value) => {
    setFilters((prevState) => ({ ...prevState, orderBy: value }));
  };

  const loadData = useCallback(async () => {
    try {
      const data = await request(
        `${HOST_WITH_PORT}/api/products/?orderBy=name`,
        'get',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (data.message) return;
      console.log(data.products);
      setProducts(data.products);
    } catch (e) {}
  }, [token, request]);

  const handleSearch = useCallback(async () => {
    try {
      const data = await request(
        `${HOST_WITH_PORT}/api/products/?search=${filters.search}&orderBy=${filters.orderBy}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}`,
        'get',
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (data.message) return;
      setProducts(data.products);
    } catch (e) {}
  }, [request, token, filters]);

  const refreshData = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    handleSearch();
  }, [filters.search, handleSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ProductsContext.Provider
      value={{ filters, changeSearch, changePrice, changeOrderBy }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Filters />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              height: 20,
              borderBottomColor: '#000',
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ width: 70, ...styles.headerText }}>{''}</Text>
            <Text style={{ width: 150, ...styles.headerText }}>
              наименование
            </Text>
            <Text style={{ width: 30, ...styles.headerText }}>отс.</Text>
            <Text style={{ width: 80, ...styles.headerText }}>цена</Text>
          </View>
          <FlatList
            data={products}
            keyExtractor={(item) => `product-${item._id}`}
            renderItem={({ item }) => <Product product={item} />}
            onRefresh={refreshData}
            refreshing={refreshing}
          />
        </View>
      </TouchableWithoutFeedback>
    </ProductsContext.Provider>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
