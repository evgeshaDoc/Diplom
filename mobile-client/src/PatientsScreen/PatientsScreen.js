import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PatientsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PatientsScreen</Text>
    </View>
  )
}

export default PatientsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
