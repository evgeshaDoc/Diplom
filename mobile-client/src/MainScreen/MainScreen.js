import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Toast } from 'native-base';

import TopButtons from './components/TopButtons';
import AppointmentsList from './components/AppointmentsList';
import { useHttp } from '../hooks/http.hook';
import { HOST_WITH_PORT } from '../../constants';
import { MainContext } from '../../App';

const MainScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(() => {
    let date = new Date();
    date.setHours(0, 0, 0);
    return date.toString();
  });
  const { request, loading } = useHttp();
  const { token } = useContext(MainContext);

  const loadData = async () => {
    try {
      const data = await request(
        `${HOST_WITH_PORT}/api/appointments/?date=${date}`,
        'get',
        null,
        { Authorization: `Bearer ${token}` }
      );
      console.log(data);
      setAppointments(data.appointments);
    } catch (e) {}
  };

  const changeDate = (val) => {
    const newDate = new Date(val);
    newDate.setHours(0, 0, 0);
    setDate(newDate.toString());
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log(date);
    loadData();
  }, [date]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <TopButtons changeDate={changeDate} />
      {loading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => `appointment-${item._id}`}
          renderItem={({ item }) => <AppointmentsList item={item} />}
          onRefresh={refreshData}
          refreshing={refreshing}
        />
      )}
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
