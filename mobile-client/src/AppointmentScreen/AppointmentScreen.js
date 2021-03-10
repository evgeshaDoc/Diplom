import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Table from './components/Table';
import AppointmentContext from './AppointmentContext';
import { useHttp } from '../hooks/http.hook';

const AppointmentScreen = ({ id }) => {
  const [appointment, setAppointment] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { request, loading } = useHttp();

  const handleInitLoad = async (id) => {
    try {
      const data = await request(`/api/appointment/${id}`, 'get');
      if (data.message) return;

      setAppointment(data.appointment);
    } catch (e) {}
  };

  const addToCart = (item) => {
    const candidate = appointment.cart.findIndex((val) => val._id === item._id);
    if (candidate > -1) {
      return 'Уже добавлено';
    }
    setAppointment((prevState) => {
      const newCart = [...prevState.cart, item];
      return {
        ...prevState,
        cart: newCart,
      };
    });
  };

  const removeFromCart = (itemId) => {
    setAppointment((prevState) => {
      const newCart = prevState.cart.map((val) => val._id !== itemId);

      return {
        ...prevState,
        cart: newCart,
      };
    });
  };

  useEffect(() => {
    handleInitLoad(id);
  });
  /* TODO
   * - Починить контекст
   * - Добавить модальное окно с добавлением расходников
   */
  return (
    // <AppointmentContext.Provider value={{ changeSum }}>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.personalContainer}>
          <Text style={styles.personalText}>{appointment.patient.surname}</Text>
          <Text style={styles.personalText}> {appointment.patient.name}</Text>
          {appointment.patient.patronymic && (
            <Text style={styles.personalText}>
              {' ' + appointment.patient.patronymic}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
          <Text style={{ color: 'rgba(161,161,161, 1)' }}>
            {appointment.time.length > 1
              ? `${appointment.time[0]} - ${
                  appointment.time[appointment.time.letgth - 1]
                }`
              : `${appointment.time[0]}`}
          </Text>
        </View>
        <Table patient={appointment} />
      </ScrollView>
    </View>
    // </AppointmentContext.Provider>
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
    paddingBottom: 15,
  },
  personalText: {
    fontSize: 28,
    fontWeight: '700',
  },
});
