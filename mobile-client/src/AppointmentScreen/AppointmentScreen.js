import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Table from './components/Table';
import AppointmentContext from './AppointmentContext';

const AppointmentScreen = () => {
  const [sum, setSum] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { patient } = route.params;

  const changeSum = (price) => setSum((prevState) => prevState + price);
  /* TODO
   * - Починить контекст
   * - Добавить модальное окно с добавлением расходников
   */
  return (
    <AppointmentContext.Provider value={{ changeSum }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.personalContainer}>
            <Text style={styles.personalText}>{patient.surname}</Text>
            <Text style={styles.personalText}> {patient.name}</Text>
            {patient.patronymic && (
              <Text style={styles.personalText}> {patient.patronymic}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <Text style={{ color: 'rgba(161,161,161, 1)' }}>
              {patient.time}
            </Text>
          </View>
          <Table patient={patient} />
        </ScrollView>
      </View>
    </AppointmentContext.Provider>
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
