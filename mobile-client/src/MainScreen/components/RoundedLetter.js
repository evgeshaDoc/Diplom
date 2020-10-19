import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const colors = [
  '#FED6BC',
  '#FFFADD',
  '#DEF7FE',
  '#E7ECFF',
  '#C3FBD8',
  '#FDEED9',
  '#F6FFF8',
  '#B5F2EA',
  '#C6D8FF',
];

const RoundedLetter = ({ letter }) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const number = Math.ceil(Math.random() * 8);
    setColor(number);
  }, []);

  return (
    <View style={{ ...styles.letterContainer, backgroundColor: colors[color] }}>
      <Text style={styles.letterText}>{letter.split('')[0]}</Text>
    </View>
  );
};

export default RoundedLetter;

const styles = StyleSheet.create({
  letterContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  letterText: {
    fontWeight: '700',
    fontSize: 24,
    color: '#bfbfbf',
  },
});
