import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Linking,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import Table from './components/Table';
import AppointmentContext from './AppointmentContext';
import { useHttp } from '../hooks/http.hook';
import { HOST_WITH_PORT } from '../../constants';
import { MainContext } from '../../App';

const AppointmentScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [appointment, setAppointment] = useState({
    cart: [],
    patient: {
      name: '',
      surname: '',
      patronymic: '',
      phoneNumber: '',
    },
    doctor: {},
  });
  const route = useRoute();
  const { id, time } = route.params;
  const { request, loading } = useHttp();
  const { token } = useContext(MainContext);

  const handleInitLoad = async () => {
    try {
      const data = await request(
        `${HOST_WITH_PORT}/api/appointments/${id}`,
        'get',
        null,
        { Authorization: `Bearer ${token}` }
      );
      console.log(data);
      if (data.message) return;

      setAppointment(data.appointment);
    } catch (e) {}
  };

  const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  const refreshPage = async () => {
    setRefreshing(true);
    await handleInitLoad();
    setRefreshing(false);
  };

  useEffect(() => {
    handleInitLoad();
    console.log(route.params);
  }, []);
  /* TODO
   * - Реализовать загрузку
   * - Поправить выводимый текст (текст вне тега)
   * - Починить контекст
   * - Добавить модальное окно с добавлением расходников
   */

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refreshPage} refreshing={refreshing} />
        }
      >
        <View style={styles.personalContainer}>
          <Text style={styles.personalText}>{appointment.patient.surname}</Text>
          <Text style={styles.personalText}>
            {' ' + appointment.patient.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}
        >
          <Text style={styles.personalText}>
            {appointment.patient.patronymic}
          </Text>
        </View>
        {appointment.patient.phoneNumber.length > 0 ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingBottom: 15,
            }}
            onPress={() => callNumber(appointment.patient.phoneNumber)}
          >
            <FontAwesome name='phone' size={22} color='#00b012' />
            <Text style={{ fontWeight: '600', fontSize: 18 }}>
              {' ' + appointment.patient.phoneNumber}
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
          <Text style={{ color: 'rgba(161,161,161, 1)' }}>{time}</Text>
        </View>
        <Table cart={appointment.cart} />
      </ScrollView>
    </View>
  );
};

export default React.memo(AppointmentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfe',
  },
  personalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  personalText: {
    fontSize: 28,
    fontWeight: '700',
  },
});
