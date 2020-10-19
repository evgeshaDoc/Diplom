import { StyleSheet } from 'react-native'

import { height, width } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersContainer: {
    flex: 0.1,
    width: (width - 50) / 2,
    // backgroundColor: 'rgba(159, 161, 159, 1)',
    backgroundColor: '#f00',
    borderRadius: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: (width - 50) / 2,
  },
})
