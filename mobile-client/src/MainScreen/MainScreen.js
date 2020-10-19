import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TopButtons from './components/TopButtons';
import AppointmentsList from './components/AppointmentsList';

const { height, width } = Dimensions.get('window');

const data = [
  {
    id: 1,
    name: 'Петр',
    surname: 'Верзилов',
    diag: 'smth1',
    image:
      'https://images.pexels.com/photos/5332011/pexels-photo-5332011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '14:00',
    price: 3000,
    cart: [
      {
        id: 532,
        name: 'Ретрагель',
        count: 1,
        price: 453,
      },
      {
        id: 777,
        name: 'Citrix',
        count: 2,
        price: 1371,
      },
    ],
  },
  {
    id: 2,
    name: 'Николай',
    surname: 'Васильев',
    diag: 'smth2',
    image:
      'https://images.pexels.com/photos/5332002/pexels-photo-5332002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '20:00',
  },
  {
    id: 3,
    name: 'Андрей',
    surname: 'Курочкин',
    // diag: 'smth3',
    image:
      'https://images.pexels.com/photos/5332001/pexels-photo-5332001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '15:00',
  },
  {
    id: 4,
    name: 'Павел',
    surname: 'Сергеев',
    diag: 'smth4',
    image:
      'https://images.pexels.com/photos/5332011/pexels-photo-5332011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '13:00',
    price: 12000,
  },
  {
    id: 5,
    name: 'Евгений',
    surname: 'Веточкин',
    diag: 'smth5',
    image:
      'https://images.pexels.com/photos/5332002/pexels-photo-5332002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '13:30',
    price: 60000,
  },
  {
    id: 6,
    name: 'Сергей',
    surname: 'Мамутов',
    // diag: 'smth6',
    image:
      'https://images.pexels.com/photos/5332001/pexels-photo-5332001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    time: '15:30',
  },
];

const MainScreen = ({ navigation }) => {
  const [fetched, setFetched] = useState([]);

  // const fetchItems = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/posts&_limit=10')
  //   const data = response.json()
  //   setFetched(data)
  //   console.log(fetched)
  // }

  useEffect(() => {
    setFetched(data);
  }, []);

  return (
    <View style={styles.container}>
      <TopButtons />
      <FlatList
        data={data}
        keyExtractor={(item) => `appointment-${item.id}`}
        renderItem={({ item }) => <AppointmentsList item={item} />}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
