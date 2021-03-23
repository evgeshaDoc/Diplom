import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { ProductsContext } from '../ProductsContext';

const { width } = Dimensions.get('screen');

const orderBy = [
  {
    label: 'По имени (А-Я)',
    value: 'name',
  },
  {
    label: 'По имени (Я-А)',
    value: '-name',
  },
  {
    label: 'По цене (по возр.)',
    value: 'price',
  },
  {
    label: 'По цене (по убыв.)',
    value: '-price',
  },
];

const Filters = () => {
  const [show, setShow] = useState(false);
  const { filters, changeOrderBy, changePrice, changeSearch } = useContext(
    ProductsContext
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.filtersContainer}
          onPress={() => setShow(!show)}
        >
          <Text style={{ alignSelf: 'center' }}>Фильтры</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Ionicons
            name='md-search'
            size={18}
            style={{ position: 'relative', marginRight: 5 }}
            color='rgba(120,120,10, 1)'
          />
          <TextInput
            value={filters.search}
            placeholder={'Поиск'}
            onChangeText={(text) => changeSearch(text)}
            autoCorrect={false}
            returnKeyType='search'
          />
        </View>
      </View>
      {show ? (
        <View>
          <View style={styles.orderByContainer}>
            <Text style={{ ...styles.filtersText, marginRight: 10 }}>
              Соритровать по:
            </Text>
            <RNPickerSelect
              items={orderBy}
              value={filters.orderBy}
              onValueChange={(value) => changeOrderBy(value)}
            />
          </View>
          <View>
            <Text style={styles.filtersText}>Цена</Text>
            <View style={styles.priceContainer}>
              <TextInput
                value={filters.priceMin}
                placeholder='от'
                placeholderTextColor='#000'
                onChangeText={(text) => changePrice(text, 'min')}
                style={styles.priceInput}
                keyboardType='number-pad'
              />
              <Text style={styles.filtersText}> - </Text>
              <TextInput
                value={filters.priceMax}
                placeholder='до'
                placeholderTextColor='#000'
                onChangeText={(text) => changePrice(text, 'min')}
                style={styles.priceInput}
                keyboardType='number-pad'
              />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    height: 80,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filtersContainer: {
    width: (width - 40) / 3,
    height: 35,
    backgroundColor: 'rgba(159, 161, 159, .3)',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  orderByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  filtersText: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  priceInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: width / 4,
    paddingHorizontal: 5,
  },
});
