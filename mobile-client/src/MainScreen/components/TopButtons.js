import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window')

const TopButtons = () => {
  const [search, setSearch] = useState('')

  return (
    <View style={styles.topButtonsContainer}>
      <TouchableOpacity style={styles.filtersContainer}>
        <Text style={{ alignSelf: 'center' }}>Фильтры</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Ionicons
          name="md-search"
          size={18}
          style={{ position: 'relative', marginRight: 5 }}
          color="rgba(120,120,10, 1)"
        />
        <TextInput
          value={search}
          placeholder={'Поиск'}
          onChangeText={(text) => setSearch(text)}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>
    </View>
  )
}

export default TopButtons

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
})
