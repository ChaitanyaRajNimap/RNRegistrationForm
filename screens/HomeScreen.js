import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}>Welcome User!!</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
