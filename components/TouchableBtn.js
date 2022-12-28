import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function TouchableBtn({text, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default TouchableBtn;

const styles = StyleSheet.create({
  button: {
    width: 325,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#1e90ff',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
