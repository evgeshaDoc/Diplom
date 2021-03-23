import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const { height, width } = Dimensions.get('window');

const TopButtons = ({ changeDate }) => {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [localDate, setLocalDate] = useState(new Date());

  useEffect(() => {
    const newDate = new Date(localDate);
    console.log(newDate.toString());
  }, [localDate]);

  return (
    <View>
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
            value={search}
            placeholder={'Поиск'}
            onChangeText={(text) => setSearch(text)}
            autoCorrect={false}
            returnKeyType='search'
          />
        </View>
      </View>
      {show ? (
        <View>
          <Calendar
            current={localDate}
            markedDates={{
              [localDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'orange',
                selectedTextColor: 'red',
              },
            }}
            onDayPress={(day) => {
              setLocalDate(day.dateString);
              changeDate(day.dateString);
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default TopButtons;

const styles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 15,
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
});
